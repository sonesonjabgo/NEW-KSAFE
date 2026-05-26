import { supabase } from "./auth/supabase"

import { api } from "./index"

const COMPANY_POST_ENDPOINT = "/api/v1/user/company-posts"
const MY_COMPANY_POSTS_ENDPOINT = "/api/v1/user/me/company-posts"

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
  attachments: unknown[]
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
  attachments: unknown[]
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

  const response = await api.apisauce.delete(
    `${COMPANY_POST_ENDPOINT}/${id}`,
    undefined,
    {
      headers: { Authorization: `Bearer ${accessToken}`, accept: "application/json" },
    },
  )

  if (!response.ok) {
    throw new Error(
      `Failed to delete post (${response.status ?? "unknown"}): ${response.problem ?? "unknown"}`,
    )
  }
}

export interface CreateCompanyPostPayload {
  scope: "company_wide" | "workplace"
  workplaceId?: string | null
  title: string
  description: string
  sendNotification: boolean
}

export interface UpdateCompanyPostPayload {
  title?: string
  description?: string
  sendNotification?: boolean
}

export async function createCompanyPost(payload: CreateCompanyPostPayload): Promise<{ id: string }> {
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

  const response = await api.apisauce.post<{ id: string }>(
    COMPANY_POST_ENDPOINT,
    body,
    {
      headers: { Authorization: `Bearer ${accessToken}`, accept: "application/json" },
    },
  )

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

  const response = await api.apisauce.patch(
    `${COMPANY_POST_ENDPOINT}/${id}`,
    payload,
    {
      headers: { Authorization: `Bearer ${accessToken}`, accept: "application/json" },
    },
  )

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
