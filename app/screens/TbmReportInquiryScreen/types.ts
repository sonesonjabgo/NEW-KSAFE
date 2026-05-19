import { AppStackScreenProps } from "@/navigators/navigationTypes"

export type TbmReportStatus = "requested" | "generating" | "completed" | "failed"

export interface TbmReportItem {
  id: number
  title: string
  status: TbmReportStatus
  date: string
  participants: number
  author: string
  location: string
}

export type TbmReportInquiryScreenProps = AppStackScreenProps<"TbmReportInquiry">
