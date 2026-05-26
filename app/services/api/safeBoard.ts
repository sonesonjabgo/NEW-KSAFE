import { supabase } from "./auth/supabase"

import { api } from "./index"

const COMPANY_POST_ENDPOINT = "/api/v1/user/company-posts"
const MY_COMPANY_POSTS_ENDPOINT = "/api/v1/user/me/company-posts"

export interface AttachmentDto {
  id: string
  fileName: string
  fileSize: number | null
  fileUrl: string | null
  mimeType: string | null
}

export interface UserCompanyPostDetailDto {
  id: string
  title: string
  scope: "company_wide" | "workplace"
  description: string
  workplaceId: string | null
  workplaceName: string | null
  isRequiredSignature: boolean
  createdBy: string
  createdByUserName: string
  createdAt: string
  status: "unread" | "pending_signature" | "completed"
  readAt: string | null
  attachments: AttachmentDto[]
}

export interface MyPostDetailDto {
  id: string
  title: string
  scope: "company_wide" | "workplace"
  description: string
  workplaceId: string | null
  workplaceName: string | null
  status: "draft" | "published" | "archived"
  isRequiredSignature: boolean
  sendNotification: boolean
  createdBy: string
  createdByUserName: string
  createdAt: string
  updatedAt: string
  publishedAt: string | null
  isPinned: boolean
  pinnedAt: string | null
  attachments: AttachmentDto[]
}

export interface UserCompanyPostListItemDto {
  id: string
  title: string
  scope: "company_wide" | "workplace"
  workplaceId: string | null
  workplaceName: string | null
  createdAt: string
  updatedAt: string
  status: string | null
  isPinned: boolean
  pinnedAt: string | null
}

export interface UserCompanyPostListResponseDto {
  items: UserCompanyPostListItemDto[]
  nextCursor: string | null
  hasNext: boolean
}

export interface MyCompanyPostListItemDto {
  id: string
  title: string
  scope: "company_wide" | "workplace"
  workplaceId: string | null
  workplaceName: string | null
  status: "draft" | "published" | "archived"
  createdAt: string
  updatedAt: string
  publishedAt: string | null
  isPinned: boolean
  pinnedAt: string | null
}

export async function fetchUserCompanyPosts(params?: {
  cursor?: string | null
  limit?: number
  workplaceId?: string | null
}): Promise<UserCompanyPostListResponseDto> {
  const {
    data: { session },
  } = await supabase.auth.getSession()

  const accessToken = session?.access_token
  if (!accessToken) {
    throw new Error("Missing authentication token for fetching board posts")
  }

  const query = {
    cursor: params?.cursor ?? undefined,
    limit: params?.limit ?? 100,
    statusFilter: "all",
    ...(params?.workplaceId ? { workplaceId: params.workplaceId } : {}),
  }

  const response = await api.apisauce.get<UserCompanyPostListResponseDto>(
    COMPANY_POST_ENDPOINT,
    query,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        accept: "application/json",
      },
    },
  )

  if (!response.ok) {
    throw new Error(
      `Failed to load board posts (${response.status ?? "unknown"}): ${response.problem ?? "unknown"}`,
    )
  }

  const data = response.data
  return {
    items: Array.isArray(data?.items) ? data.items : [],
    nextCursor: typeof data?.nextCursor === "string" ? data.nextCursor : null,
    hasNext: typeof data?.hasNext === "boolean" ? data.hasNext : false,
  }
}

export async function fetchCompanyPostDetail(id: string): Promise<UserCompanyPostDetailDto> {
  const {
    data: { session },
  } = await supabase.auth.getSession()

  const accessToken = session?.access_token
  if (!accessToken) {
    throw new Error("Missing authentication token for fetching post detail")
  }

  const response = await api.apisauce.get<UserCompanyPostDetailDto>(
    `${COMPANY_POST_ENDPOINT}/${id}`,
    undefined,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        accept: "application/json",
      },
    },
  )

  if (!response.ok) {
    throw new Error(
      `Failed to load post detail (${response.status ?? "unknown"}): ${response.problem ?? "unknown"}`,
    )
  }

  if (!response.data) {
    throw new Error("No data received for post detail")
  }

  return response.data
}

export async function fetchMyPostDetail(id: string): Promise<MyPostDetailDto> {
  const {
    data: { session },
  } = await supabase.auth.getSession()
  const accessToken = session?.access_token
  if (!accessToken) {
    throw new Error("Missing authentication token for fetching my post detail")
  }

  const response = await api.apisauce.get<MyPostDetailDto>(
    `${MY_COMPANY_POSTS_ENDPOINT}/${id}`,
    undefined,
    {
      headers: { Authorization: `Bearer ${accessToken}`, accept: "application/json" },
    },
  )

  if (!response.ok) {
    throw new Error(
      `Failed to load my post detail (${response.status ?? "unknown"}): ${response.problem ?? "unknown"}`,
    )
  }
  if (!response.data) throw new Error("No data received for my post detail")
  return response.data
}

export async function publishCompanyPost(id: string): Promise<void> {
  const {
    data: { session },
  } = await supabase.auth.getSession()
  const accessToken = session?.access_token
  if (!accessToken) {
    throw new Error("Missing authentication token for publishing post")
  }

  const response = await api.apisauce.patch(
    `${COMPANY_POST_ENDPOINT}/${id}/publish`,
    {},
    {
      headers: { Authorization: `Bearer ${accessToken}`, accept: "application/json" },
    },
  )

  if (!response.ok) {
    throw new Error(
      `Failed to publish post (${response.status ?? "unknown"}): ${response.problem ?? "unknown"}`,
    )
  }
}

export async function deleteCompanyPost(id: string): Promise<void> {
  const {
    data: { session },
  } = await supabase.auth.getSession()
  const accessToken = session?.access_token
  if (!accessToken) {
    throw new Error("Missing authentication token for deleting post")
  }

  const response = await api.apisauce.delete(`${COMPANY_POST_ENDPOINT}/${id}`, undefined, {
    headers: { Authorization: `Bearer ${accessToken}`, accept: "application/json" },
  })

  if (!response.ok) {
    throw new Error(
      `Failed to delete post (${response.status ?? "unknown"}): ${response.problem ?? "unknown"}`,
    )
  }
}

export interface UploadUrlRequestDto {
  fileName: string
  contentType: string
  fileSize?: number
}

export interface UploadUrlResponseDto {
  uploadId: string
  signedUrl: string
}

export interface CreateCompanyPostPayload {
  scope: "company_wide" | "workplace"
  workplaceId?: string | null
  title: string
  description: string
  sendNotification: boolean
  uploadIds?: string[]
}

export interface UpdateCompanyPostPayload {
  title?: string
  description?: string
  sendNotification?: boolean
  newUploadIds?: string[]
  deleteAttachmentIds?: string[]
}

export interface SendWorkplacePushNotificationPayload {
  workplaceIds: string[]
  title: string
  body: string
}

export async function createCompanyPost(
  payload: CreateCompanyPostPayload,
): Promise<{ id: string }> {
  const {
    data: { session },
  } = await supabase.auth.getSession()
  const accessToken = session?.access_token
  if (!accessToken) {
    throw new Error("Missing authentication token for creating post")
  }

  const body: Record<string, unknown> = {
    title: payload.title,
    description: payload.description,
    sendNotification: payload.sendNotification,
  }
  if (payload.workplaceId) body.workplaceId = payload.workplaceId
  if (payload.uploadIds?.length) body.uploadIds = payload.uploadIds

  const response = await api.apisauce.post<{ id: string }>(COMPANY_POST_ENDPOINT, body, {
    headers: { Authorization: `Bearer ${accessToken}`, accept: "application/json" },
  })

  if (!response.ok || !response.data?.id) {
    throw new Error(
      `Failed to create post (${response.status ?? "unknown"}): ${response.problem ?? "unknown"}`,
    )
  }
  return { id: response.data.id }
}

export async function updateCompanyPost(
  id: string,
  payload: UpdateCompanyPostPayload,
): Promise<void> {
  const {
    data: { session },
  } = await supabase.auth.getSession()
  const accessToken = session?.access_token
  if (!accessToken) {
    throw new Error("Missing authentication token for updating post")
  }

  const body: Record<string, any> = {}
  if (payload.title !== undefined) body.title = payload.title
  if (payload.description !== undefined) body.description = payload.description
  if (payload.sendNotification !== undefined) body.sendNotification = payload.sendNotification
  if (payload.newUploadIds !== undefined) body.newUploadIds = payload.newUploadIds
  if (payload.deleteAttachmentIds !== undefined)
    body.deleteAttachmentIds = payload.deleteAttachmentIds

  const response = await api.apisauce.patch(`${COMPANY_POST_ENDPOINT}/${id}`, body, {
    headers: { Authorization: `Bearer ${accessToken}`, accept: "application/json" },
  })

  if (!response.ok) {
    throw new Error(
      `Failed to update post (${response.status ?? "unknown"}): ${response.problem ?? "unknown"}`,
    )
  }
}

export async function fetchMyPosts(): Promise<MyCompanyPostListItemDto[]> {
  const {
    data: { session },
  } = await supabase.auth.getSession()

  const accessToken = session?.access_token
  if (!accessToken) {
    throw new Error("Missing authentication token for fetching my posts")
  }

  const response = await api.apisauce.get<{ items: MyCompanyPostListItemDto[] }>(
    MY_COMPANY_POSTS_ENDPOINT,
    undefined,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        accept: "application/json",
      },
    },
  )

  if (!response.ok) {
    throw new Error(
      `Failed to load my posts (${response.status ?? "unknown"}): ${response.problem ?? "unknown"}`,
    )
  }

  const data = response.data
  return Array.isArray(data?.items) ? data.items : []
}

export async function initiateCompanyPostUpload(
  dto: UploadUrlRequestDto,
): Promise<UploadUrlResponseDto> {
  const {
    data: { session },
  } = await supabase.auth.getSession()
  const accessToken = session?.access_token
  if (!accessToken) {
    throw new Error("Missing authentication token for uploading file")
  }

  const response = await api.apisauce.post<UploadUrlResponseDto>(
    `${COMPANY_POST_ENDPOINT}/upload-url`,
    dto,
    {
      headers: { Authorization: `Bearer ${accessToken}`, accept: "application/json" },
    },
  )

  if (!response.ok || !response.data?.uploadId) {
    throw new Error(
      `Failed to get upload URL (${response.status ?? "unknown"}): ${response.problem ?? "unknown"}`,
    )
  }
  return response.data
}

export async function sendWorkplacePushNotification(
  payload: SendWorkplacePushNotificationPayload,
): Promise<void> {
  const {
    data: { session },
  } = await supabase.auth.getSession()
  const accessToken = session?.access_token
  if (!accessToken) {
    throw new Error("Missing authentication token for workplace push notification")
  }

  const response = await api.apisauce.post("/api/v1/common/push-notifications/workplace", payload, {
    headers: {
      "Authorization": `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  })

  if (!response.ok) {
    const status = response.status ?? "unknown"
    const problem = response.problem ?? "Unknown error"
    throw new Error(`Failed to send push notification (status ${status}): ${problem}`)
  }
}
