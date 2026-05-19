import { NativeStackScreenProps } from "@react-navigation/native-stack"

import { AppStackParamList } from "@/navigators/navigationTypes"
import { TbmStatus } from "@/screens/TbmListScreen/types"

export interface TbmEducationMaterial {
  id: number
  title: string
}

export type TbmParticipantBadge = "정상" | "주의" | "위험"

export interface TbmParticipant {
  id: number
  name: string
  badge: TbmParticipantBadge
  time: string
}

export interface TbmDetail {
  id: number
  title: string
  status: TbmStatus
  date: string
  workDate: string
  author: string
  location: string
  activityContent: string
  educationMaterials: TbmEducationMaterial[]
  participants: TbmParticipant[]
}

export type TbmDetailScreenProps = NativeStackScreenProps<AppStackParamList, "TbmDetail">
