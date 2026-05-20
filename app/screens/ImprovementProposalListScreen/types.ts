import type { AppStackScreenProps } from "@/navigators/navigationTypes"

export type ProposalStatus = "pending" | "ongoing" | "reflected" | "rejected"

export interface ProposalItem {
  id: number
  status: ProposalStatus
  date: string
  title: string
  content: string
  authorInitial: string
  authorName: string
  isMyProposal: boolean
}

export interface ImprovementProposalListScreenProps extends AppStackScreenProps<"ImprovementProposalList"> {}
