import type { MainTabScreenProps } from "@/navigators/navigationTypes"

export type ScopeType = "company_wide" | "workplace"
export type StatusType =
  | "unread"
  | "pending_signature"
  | "completed"
  | "draft"
  | "published"
  | "archived"

export interface SafeBoardItem {
  id: string
  title: string
  scope: ScopeType
  isPinned: boolean
  workplaceId: string | null
  workplaceName: string | null
  status: string | null
  createdAt: string
  updatedAt: string
  authorName?: string
  authorAffiliation?: string
  content?: string
}

export interface SafeBoardScreenProps extends MainTabScreenProps<"SafeBoard"> {}
