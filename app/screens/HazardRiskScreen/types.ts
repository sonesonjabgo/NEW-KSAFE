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
}

export interface HazardHistoryItem {
  id: number
  status: HazardStatus
  date: string
  note?: string
}

export interface HazardDetail extends HazardItem {
  photos: string[]
  managerName: string
  managerInitial: string
  managerAffiliation: string
  history?: HazardHistoryItem[]
}

export interface HazardRiskScreenProps extends AppStackScreenProps<"HazardRiskList"> {}
export interface HazardRiskDetailScreenProps extends AppStackScreenProps<"HazardRiskDetail"> {}
