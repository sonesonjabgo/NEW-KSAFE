import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { AppStackParamList } from "@/navigators/navigationTypes"
import { TbmStatus } from "@/screens/TbmListScreen/types"

export interface TbmEducationMaterial {
  id: number
  title: string
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
}

export type TbmDetailScreenProps = NativeStackScreenProps<AppStackParamList, "TbmDetail">
