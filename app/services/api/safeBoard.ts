import { supabase } from "./auth/supabase"

import { api } from "./index"

const COMPANY_POST_ENDPOINT = "/api/v1/user/company-posts"
const MY_COMPANY_POSTS_ENDPOINT = "/api/v1/user/me/company-posts"

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
