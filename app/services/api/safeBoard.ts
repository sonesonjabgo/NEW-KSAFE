import { supabase } from "./auth/supabase"

import { api } from "./index"

const COMPANY_POST_ENDPOINT = "/api/v1/user/company-posts"
const MY_COMPANY_POSTS_ENDPOINT = "/api/v1/user/me/company-posts"

export interface UserCompanyPostDetailDto {
  id: string
  title: string
  scope: "company_wide" | "workplace"
  isPinned?: boolean
  workplaceId?: string | null
  workplaceName?: string | null
  status?: string | null
  content?: string | null
  description?: string | null
  authorName?: string | null
  authorAffiliation?: string | null
  createdBy?: string | null
  createdAt: string
  updatedAt: string
}

export interface AdminMyPostDetailDto {
  id: string
  title: string
  scope: "company_wide" | "workplace"
  workplaceId?: string | null
  workplaceName?: string | null
  status: "draft" | "published" | "archived"
  createdBy: string
  authorName?: string | null
  authorAffiliation?: string | null
  content?: string | null
  description?: string | null
  sendNotification?: boolean
  createdAt: string
  updatedAt: string
  publishedAt?: string | null
}

export interface UserCompanyPostListItemDto {
  id: string
  title: string
  scope: "company_wide" | "workplace"
  isPinned?: boolean
  workplaceId?: string | null
  workplaceName?: string | null
  createdAt: string
  updatedAt: string
  status?: string | null
}

export interface UserCompanyPostListResponseDto {
  items: UserCompanyPostListItemDto[]
  nextCursor?: string | null
  hasNext?: boolean
}

export interface MyCompanyPostListItemDto {
  id: string
  title: string
  scope: "company_wide" | "workplace"
  isPinned?: boolean
  workplaceId?: string | null
  workplaceName?: string | null
  status: "draft" | "published" | "archived"
  createdAt: string
  updatedAt: string
  publishedAt?: string | null
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

export async function fetchAdminMyPostDetail(id: string): Promise<AdminMyPostDetailDto> {
  const {
    data: { session },
  } = await supabase.auth.getSession()
  const accessToken = session?.access_token
  if (!accessToken) {
    throw new Error("Missing authentication token for fetching admin post detail")
  }

  const response = await api.apisauce.get<AdminMyPostDetailDto>(
    `${MY_COMPANY_POSTS_ENDPOINT}/${id}`,
    undefined,
    {
      headers: { Authorization: `Bearer ${accessToken}`, accept: "application/json" },
    },
  )

  if (!response.ok) {
    throw new Error(
      `Failed to load admin post detail (${response.status ?? "unknown"}): ${response.problem ?? "unknown"}`,
    )
  }
  if (!response.data) throw new Error("No data received for admin post detail")
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

export async function fetchAdminMyPosts(): Promise<MyCompanyPostListItemDto[]> {
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
