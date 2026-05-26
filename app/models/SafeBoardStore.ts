import { flow, Instance, SnapshotOut, types } from "mobx-state-tree"

import {
  fetchMyPosts,
  fetchMyPostDetail as apiFetchMyPostDetail,
  fetchCompanyPostDetail,
  fetchUserCompanyPosts,
  publishCompanyPost,
  deleteCompanyPost,
  createCompanyPost,
  updateCompanyPost,
  sendWorkplacePushNotification,
  AttachmentDto,
  CreateCompanyPostPayload,
  UpdateCompanyPostPayload,
  SendWorkplacePushNotificationPayload,
  MyPostDetailDto,
  MyCompanyPostListItemDto,
  UserCompanyPostListItemDto,
  UserCompanyPostDetailDto,
  UserCompanyPostListResponseDto,
} from "@/services/api/safeBoard"
import { logDevError } from "@/utils/logDevError"

import { withSetPropAction } from "./helpers/withSetPropAction"
import { withStatus } from "./helpers/withStatus"

const AttachmentModel = types.model("Attachment", {
  id: types.string,
  fileName: types.string,
  fileSize: types.maybeNull(types.number),
  fileUrl: types.maybeNull(types.string),
  mimeType: types.maybeNull(types.string),
})

const CompanyPostDetailModel = types.model("CompanyPostDetail", {
  id: types.identifier,
  title: types.string,
  scope: types.enumeration(["company_wide", "workplace"]),
  description: types.maybeNull(types.string),
  workplaceId: types.maybeNull(types.string),
  workplaceName: types.maybeNull(types.string),
  status: types.maybeNull(types.string),
  createdBy: types.maybeNull(types.string),
  createdByUserName: types.maybeNull(types.string),
  sendNotification: types.optional(types.boolean, false),
  createdAt: types.string,
  updatedAt: types.string,
  publishedAt: types.maybeNull(types.string),
  attachments: types.optional(types.array(AttachmentModel), []),
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

    fetchMyPosts: flow(function* loadMyPosts() {
      self.setStatus("pending")
      try {
        const items: MyCompanyPostListItemDto[] = yield fetchMyPosts()
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
            title: data.title,
            scope: data.scope ?? "company_wide",
            description: data.description,
            workplaceId: data.workplaceId,
            workplaceName: data.workplaceName,
            status: data.status,
            createdBy: data.createdBy,
            createdByUserName: data.createdByUserName,
            createdAt: data.createdAt,
            updatedAt: data.createdAt,
            publishedAt: null,
            attachments: (data.attachments ?? []).map((a: AttachmentDto) => ({
              id: a.id,
              fileName: a.fileName,
              fileSize: a.fileSize ?? null,
              fileUrl: a.fileUrl ?? null,
              mimeType: a.mimeType ?? null,
            })),
          }),
        )
        self.setStatus("success")
      } catch (error) {
        self.setStatus("error")
        logDevError("Failed to fetch post detail", error)
        throw error
      }
    }),

    fetchMyPostDetail: flow(function* fetchMyPostDetailAction(postId: string) {
      self.setStatus("pending")
      try {
        const data: MyPostDetailDto = yield apiFetchMyPostDetail(postId)
        self.setProp(
          "currentPost",
          CompanyPostDetailModel.create({
            id: data.id,
            title: data.title,
            scope: data.scope ?? "company_wide",
            description: data.description,
            workplaceId: data.workplaceId,
            workplaceName: data.workplaceName,
            status: data.status,
            createdBy: data.createdBy,
            createdByUserName: data.createdByUserName,
            sendNotification: data.sendNotification,
            createdAt: data.createdAt,
            updatedAt: data.updatedAt,
            publishedAt: data.publishedAt,
            attachments: (data.attachments ?? []).map((a: AttachmentDto) => ({
              id: a.id,
              fileName: a.fileName,
              fileSize: a.fileSize ?? null,
              fileUrl: a.fileUrl ?? null,
              mimeType: a.mimeType ?? null,
            })),
          }),
        )
        self.setStatus("success")
      } catch (error) {
        self.setStatus("error")
        logDevError("Failed to fetch my post detail", error)
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
        yield self.fetchMyPosts()
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
        yield self.fetchMyPosts()
        yield self.fetchMyPostDetail(postId)
        self.setStatus("success")
      } catch (error) {
        self.setStatus("error")
        logDevError("Failed to publish post", error)
        throw error
      }
    }),

    createPost: flow(function* createPostAction(payload: CreateCompanyPostPayload) {
      self.setStatus("pending")
      try {
        const result: { id: string } = yield createCompanyPost(payload)
        yield self.fetchMyPosts()
        self.setStatus("success")
        return result.id
      } catch (error) {
        self.setStatus("error")
        logDevError("Failed to create post", error)
        throw error
      }
    }),

    updatePost: flow(function* updatePostAction(postId: string, payload: UpdateCompanyPostPayload) {
      self.setStatus("pending")
      try {
        yield updateCompanyPost(postId, payload)
        yield self.fetchMyPosts()
        yield self.fetchMyPostDetail(postId)
        self.setStatus("success")
      } catch (error) {
        self.setStatus("error")
        logDevError("Failed to update post", error)
        throw error
      }
    }),

    sendPushNotificationAction: flow(function* sendPushNotificationAction(
      payload: SendWorkplacePushNotificationPayload,
    ) {
      self.setStatus("pending")
      try {
        yield sendWorkplacePushNotification(payload)
        self.setStatus("success")
      } catch (error) {
        self.setStatus("error")
        logDevError("Failed to send push notification", error)
        throw error
      }
    }),
  }))

export interface SafeBoardStore extends Instance<typeof SafeBoardStoreModel> {}
export interface SafeBoardStoreSnapshotOut extends SnapshotOut<typeof SafeBoardStoreModel> {}
export const createSafeBoardStoreDefaultModel = () => types.optional(SafeBoardStoreModel, {})
