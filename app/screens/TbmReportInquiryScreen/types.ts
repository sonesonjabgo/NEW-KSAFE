import { AppStackScreenProps } from "@/navigators/navigationTypes"

export type TbmReportStatus = "requested" | "generating" | "completed" | "failed"

export interface TbmReportHistory {
  status: TbmReportStatus
  time: string
  description?: string
}

export interface TbmReportItem {
  id: number
  title: string
  status: TbmReportStatus
  date: string
  participants: number
  author: string
  location: string
  workDate?: string
  activityContent?: string
  history?: TbmReportHistory[]
}

export type TbmReportInquiryScreenProps = AppStackScreenProps<"TbmReportInquiry">
