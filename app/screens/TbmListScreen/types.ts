import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { AppStackParamList } from "@/navigators/navigationTypes"

export type TbmStatus = "작성중" | "진행중" | "종료됨"

export interface TbmItem {
  id: number
  title: string
  status: TbmStatus
  date: string
  participants: number
  author: string
  location: string
}

export type TbmListScreenProps = NativeStackScreenProps<AppStackParamList, "TbmList">
