import { flow, Instance, SnapshotOut, types } from "mobx-state-tree"

import {
  fetchUserCompanyPosts,
  UserCompanyPostListItemDto,
  UserCompanyPostListResponseDto,
} from "@/services/api/safeBoard"
import { logDevError } from "@/utils/logDevError"

import { withSetPropAction } from "./helpers/withSetPropAction"
import { withStatus } from "./helpers/withStatus"

const CompanyPostModel = types.model("CompanyPost", {
  id: types.identifier,
  title: types.string,
  scope: types.enumeration(["company_wide", "workplace"]),
  isPinned: types.optional(types.boolean, false),
  workplaceId: types.maybeNull(types.string),
  workplaceName: types.maybeNull(types.string),
  status: types.maybeNull(types.string),
  createdAt: types.string,
  updatedAt: types.string,
  publishedAt: types.maybeNull(types.string),
})

export const SafeBoardStoreModel = types
  .model("SafeBoardStore")
  .props({
    boards: types.optional(types.array(CompanyPostModel), []),
    boardError: types.maybeNull(types.string),
  })
  .actions(withSetPropAction)
  .extend(withStatus)
  .actions((self) => ({
    fetchBoardPosts: flow(function* loadBoardPosts() {
      self.setStatus("pending")
      self.boardError = null

      try {
        const items: UserCompanyPostListItemDto[] = []
        let cursor: string | null = null
        let hasNext = true

        while (hasNext) {
          const response: UserCompanyPostListResponseDto = yield fetchUserCompanyPosts({
            cursor,
            limit: 100,
          })

          items.push(...(response.items ?? []))
          cursor = response.nextCursor ?? null
          hasNext = Boolean(response.hasNext && cursor)
        }

        const posts = items.map((post) =>
          CompanyPostModel.create({
            ...post,
            isPinned: post.isPinned ?? false,
            workplaceId: post.workplaceId ?? null,
            workplaceName: post.workplaceName ?? null,
            publishedAt: null,
          }),
        )

        self.boards.replace(posts)
        self.setStatus("success")
      } catch (error) {
        self.setStatus("error")
        self.boardError = "게시글을 불러오지 못했습니다."
        logDevError("Failed to load board posts", error)
      }
    }),

    resetBoardCache() {
      self.boards.clear()
      self.boardError = null
      self.resetStatus()
    },
  }))

export interface SafeBoardStore extends Instance<typeof SafeBoardStoreModel> {}
export interface SafeBoardStoreSnapshotOut extends SnapshotOut<typeof SafeBoardStoreModel> {}
export const createSafeBoardStoreDefaultModel = () => types.optional(SafeBoardStoreModel, {})
