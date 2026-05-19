import { ViewStyle, TextStyle } from "react-native"

import { colors } from "@/theme/colors"
import { typography } from "@/theme/typography"

export const $tabBar: ViewStyle = {
  flexDirection: "row",
  backgroundColor: "#FFFFFF",
  paddingHorizontal: 16,
  paddingVertical: 8,
  gap: 6,
}

export const $tab: ViewStyle = {
  flex: 1,
  alignItems: "center",
  justifyContent: "center",
  paddingVertical: 8,
  borderRadius: 20,
  backgroundColor: "#F9FAFE",
}

export const $activeTab: ViewStyle = {
  backgroundColor: colors.navy,
}

export const $tabText: TextStyle = {
  fontSize: 12,
  fontFamily: typography.primary.semiBold,
  color: "#999999",
}

export const $activeTabText: TextStyle = {
  color: "#FFFFFF",
}

export const $listContent: ViewStyle = {
  flex: 1,
  backgroundColor: "#FFFFFF",
}

export const $flatListContent: ViewStyle = {
  padding: 16,
}

export const $emptyContainer: ViewStyle = {
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
  paddingVertical: 120,
}

export const $emptyImage: ViewStyle = {
  marginBottom: 20,
}

export const $emptyText: TextStyle = {
  fontSize: 20,
  color: "#000000",
  fontFamily: typography.primary.semiBold,
}
