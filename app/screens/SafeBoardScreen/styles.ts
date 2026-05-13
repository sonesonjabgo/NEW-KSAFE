import { ViewStyle, TextStyle } from "react-native"
import { colors } from "@/theme/colors"
import { typography } from "@/theme/typography"

export const $screenContainer: ViewStyle = {
  flex: 1,
  backgroundColor: colors.background,
}

export const $scrollContent: ViewStyle = {
  flexGrow: 1,
}

export const $headerContainer: ViewStyle = {
  backgroundColor: "#2E5984",
  paddingTop: 20,
  paddingBottom: 16,
  paddingHorizontal: 16,
}

export const $headerTitle: TextStyle = {
  color: "#FFFFFF",
  fontSize: 20,
  fontFamily: typography.primary.bold,
}

export const $contentContainer: ViewStyle = {
  flex: 1,
  backgroundColor: "#F9FABE",
  paddingHorizontal: 12,
  paddingTop: 16,
  paddingBottom: 20,
}

export const $listContainer: ViewStyle = {
  paddingHorizontal: 4,
}

export const $emptyContainer: ViewStyle = {
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
}

export const $emptyText: TextStyle = {
  fontSize: 14,
  color: "#7F848C",
  fontFamily: typography.primary.normal,
}
