import type { NativeStackScreenProps } from "@react-navigation/native-stack"

import type { AppStackParamList } from "@/navigators/navigationTypes"

export type PatrolScreenProps = NativeStackScreenProps<AppStackParamList, "Patrol">
export type PatrolCreateScreenProps = NativeStackScreenProps<AppStackParamList, "PatrolCreate">
export type PatrolDetailScreenProps = NativeStackScreenProps<AppStackParamList, "PatrolDetail">
