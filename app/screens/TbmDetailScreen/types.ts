import { NativeStackScreenProps } from "@react-navigation/native-stack"

import { AppStackParamList } from "@/navigators/navigationTypes"
import { TbmStatus } from "@/screens/TbmListScreen/types"

export type TbmParticipantBadge = "정상" | "주의" | "위험"

export type TbmDetailScreenProps = NativeStackScreenProps<AppStackParamList, "TbmDetail">
