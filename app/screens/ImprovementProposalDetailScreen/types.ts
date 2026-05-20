import type { AppStackScreenProps } from "@/navigators/navigationTypes"

export type ProposalStatus = "pending" | "ongoing" | "reflected" | "rejected"
export type StatusHistoryType = "registered" | "ongoing" | "reflected" | "rejected"

export interface StatusHistoryItem {
  id: number
  type: StatusHistoryType
  date: string
}

export interface ImprovementProposalDetail {
  id: number
  status: ProposalStatus
  date: string
  content: string
  authorInitial: string
  authorName: string
  workplace: string
  statusHistory: StatusHistoryItem[]
}

export interface ImprovementProposalDetailScreenProps extends AppStackScreenProps<"ImprovementProposalDetail"> {}
