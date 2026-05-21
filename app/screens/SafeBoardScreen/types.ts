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
  id: number
  title: string
  scope: ScopeType
  isPinned: boolean
  workplaceId: number
  workplaceName: string
  createdAt: string
  updatedAt: string
  status: StatusType
  authorName: string
  authorAffiliation: string
  content: string
}

export interface SafeBoardScreenProps extends MainTabScreenProps<"SafeBoard"> {}
