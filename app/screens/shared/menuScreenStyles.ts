/**
 * SafeHealthScreen, WorkerParticipationScreen 등 메뉴 목록 구조 화면의 공유 스타일.
 * 새 메뉴 화면 추가 시 이 파일을 import * as S from "@/screens/shared/menuScreenStyles" 로 사용한다.
 */
import { ViewStyle, TextStyle } from "react-native"

import { colors } from "@/theme/colors"
import { typography } from "@/theme/typography"

export const $screenContainer: ViewStyle = {
  flex: 1,
  backgroundColor: colors.screenBg,
}

export const $headerContainer: ViewStyle = {
  backgroundColor: colors.navy,
  paddingTop: 20,
  paddingBottom: 20,
  paddingHorizontal: 20,
}

export const $headerTitle: TextStyle = {
  color: "#FFFFFF",
  fontSize: 21,
  fontFamily: typography.primary.semiBold,
  textAlign: "center",
}

export const $contentContainer: ViewStyle = {
  flex: 1,
  paddingHorizontal: 20,
  paddingTop: 16,
  paddingBottom: 20,
}

export const $menuCard: ViewStyle = {
  backgroundColor: "#FFFFFF",
  borderRadius: 8,
  borderWidth: 1,
  borderColor: "#E9ECF0",
  overflow: "hidden",
}

export const $menuItemContainer: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
  paddingHorizontal: 16,
  paddingVertical: 16,
  gap: 12,
}

export const $menuIconContainer: ViewStyle = {
  width: 44,
  height: 44,
  justifyContent: "center",
  alignItems: "center",
}

export const $menuContentContainer: ViewStyle = {
  flex: 1,
}

export const $menuTitle: TextStyle = {
  fontSize: 17,
  color: "#000000",
  fontFamily: typography.primary.bold,
  marginBottom: 4,
}

export const $menuDescription: TextStyle = {
  fontSize: 12,
  color: "#979797",
  fontFamily: typography.primary.normal,
  lineHeight: 16,
}

export const $menuChevron: ViewStyle = {
  width: 24,
  height: 24,
  justifyContent: "center",
  alignItems: "center",
}

export const $menuDivider: ViewStyle = {
  height: 1,
  backgroundColor: "#E9ECF0",
  marginHorizontal: 16,
}

export const $emptyContainer: ViewStyle = {
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
  paddingVertical: 60,
}

export const $emptyText: TextStyle = {
  fontSize: 15,
  color: "#999999",
  fontFamily: typography.primary.normal,
}
