import type { AppStackScreenProps } from "@/navigators/navigationTypes"

export type HazardStatus = "pending" | "ongoing" | "completed" | "impossible"

export interface HazardItem {
  id: number
  status: HazardStatus
  date: string
  location: string
  description: string
  reporterName: string
  reporterInitial: string
  workplace: string
  isMyReport: boolean
}

export interface HazardRiskScreenProps extends AppStackScreenProps<"HazardRiskList"> {}
