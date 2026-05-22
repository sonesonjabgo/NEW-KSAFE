import { flow, Instance, SnapshotOut, types } from "mobx-state-tree"

import {
  fetchAdminMyPosts,
  fetchAdminMyPostDetail as apiFetchAdminMyPostDetail,
  fetchCompanyPostDetail,
  fetchUserCompanyPosts,
  publishCompanyPost,
  deleteCompanyPost,
  AdminMyPostDetailDto,
  MyCompanyPostListItemDto,
  UserCompanyPostListItemDto,
  UserCompanyPostDetailDto,
  UserCompanyPostListResponseDto,
} from "@/services/api/safeBoard"
import { logDevError } from "@/utils/logDevError"

import { withSetPropAction } from "./helpers/withSetPropAction"
import { withStatus } from "./helpers/withStatus"

const CompanyPostDetailModel = types.model("CompanyPostDetail", {
  id: types.identifier,
  title: types.string,
  scope: types.enumeration(["company_wide", "workplace"]),
  content: types.maybeNull(types.string),
  workplaceId: types.maybeNull(types.string),
  workplaceName: types.maybeNull(types.string),
  status: types.maybeNull(types.string),
  createdBy: types.maybeNull(types.string),
  authorName: types.maybeNull(types.string),
  authorAffiliation: types.maybeNull(types.string),
  sendNotification: types.optional(types.boolean, false),
  createdAt: types.string,
  updatedAt: types.string,
  publishedAt: types.maybeNull(types.string),
})

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
    myPosts: types.optional(types.array(CompanyPostModel), []),
    currentPost: types.maybeNull(CompanyPostDetailModel),
    boardError: types.maybeNull(types.string),
    activeTab: types.optional(types.enumeration(["all", "my"]), "all"),
  })
  .actions(withSetPropAction)
  .extend(withStatus)
  .actions((self) => ({
    fetchBoardPosts: flow(function* loadBoardPosts(workplaceId?: string) {
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
            workplaceId: workplaceId ?? null,
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

    fetchAdminMyPosts: flow(function* loadMyPosts() {
      self.setStatus("pending")
      try {
        const items: MyCompanyPostListItemDto[] = yield fetchAdminMyPosts()
        const posts = items.map((post) =>
          CompanyPostModel.create({
            ...post,
            isPinned: post.isPinned ?? false,
            workplaceId: post.workplaceId ?? null,
            workplaceName: post.workplaceName ?? null,
            publishedAt: post.publishedAt ?? null,
          }),
        )
        self.myPosts.replace(posts)
        self.setStatus("success")
      } catch (error) {
        self.setStatus("error")
        logDevError("Failed to load my posts", error)
      }
    }),

    setActiveTab(tab: "all" | "my") {
      self.activeTab = tab
    },

    clearCurrentPost() {
      self.setProp("currentPost", null)
    },

    fetchPostDetail: flow(function* fetchPostDetailAction(postId: string) {
      self.setStatus("pending")
      try {
        const data: UserCompanyPostDetailDto = yield fetchCompanyPostDetail(postId)
        self.setProp(
          "currentPost",
          CompanyPostDetailModel.create({
            id: data.id,
            title: data.title ?? "",
            scope: data.scope ?? "company_wide",
            content: data.content ?? data.description ?? null,
            workplaceId: data.workplaceId ?? null,
            workplaceName: data.workplaceName ?? null,
            status: data.status ?? null,
            createdBy: data.createdBy ?? null,
            authorName: data.authorName ?? null,
            authorAffiliation: data.authorAffiliation ?? null,
            createdAt: data.createdAt ?? "",
            updatedAt: data.updatedAt ?? data.createdAt ?? "",
            publishedAt: null,
          }),
        )
        self.setStatus("success")
      } catch (error) {
        self.setStatus("error")
        logDevError("Failed to fetch post detail", error)
        throw error
      }
    }),

    fetchAdminMyPostDetail: flow(function* fetchAdminMyPostDetailAction(postId: string) {
      self.setStatus("pending")
      try {
        const data: AdminMyPostDetailDto = yield apiFetchAdminMyPostDetail(postId)
        self.setProp(
          "currentPost",
          CompanyPostDetailModel.create({
            id: data.id,
            title: data.title ?? "",
            scope: data.scope ?? "company_wide",
            content: data.content ?? data.description ?? null,
            workplaceId: data.workplaceId ?? null,
            workplaceName: data.workplaceName ?? null,
            status: data.status ?? null,
            createdBy: data.createdBy ?? null,
            authorName: data.authorName ?? null,
            authorAffiliation: data.authorAffiliation ?? null,
            sendNotification: data.sendNotification ?? false,
            createdAt: data.createdAt ?? "",
            updatedAt: data.updatedAt ?? data.createdAt ?? "",
            publishedAt: data.publishedAt ?? null,
          }),
        )
        self.setStatus("success")
      } catch (error) {
        self.setStatus("error")
        logDevError("Failed to fetch admin post detail", error)
        throw error
      }
    }),

    resetBoardCache() {
      self.boards.clear()
      self.myPosts.clear()
      self.setProp("currentPost", null)
      self.boardError = null
      self.activeTab = "all"
      self.resetStatus()
    },
  }))
  .actions((self) => ({
    deletePost: flow(function* deletePostAction(postId: string) {
      self.setStatus("pending")
      try {
        yield deleteCompanyPost(postId)
        self.setProp("currentPost", null)
        yield self.fetchBoardPosts()
        yield self.fetchAdminMyPosts()
        self.setStatus("success")
      } catch (error) {
        self.setStatus("error")
        logDevError("Failed to delete post", error)
        throw error
      }
    }),

    publishPost: flow(function* publishPostAction(postId: string) {
      self.setStatus("pending")
      try {
        yield publishCompanyPost(postId)
        yield self.fetchBoardPosts()
        yield self.fetchAdminMyPosts()
        yield self.fetchAdminMyPostDetail(postId)
        self.setStatus("success")
      } catch (error) {
        self.setStatus("error")
        logDevError("Failed to publish post", error)
        throw error
      }
    }),
  }))

export interface SafeBoardStore extends Instance<typeof SafeBoardStoreModel> {}
export interface SafeBoardStoreSnapshotOut extends SnapshotOut<typeof SafeBoardStoreModel> {}
export const createSafeBoardStoreDefaultModel = () => types.optional(SafeBoardStoreModel, {})
