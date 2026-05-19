import { TextStyle, ViewStyle } from "react-native"

import { colors } from "@/theme/colors"
import { typography } from "@/theme/typography"

export const $wrapper: ViewStyle = {
  flex: 1,
  backgroundColor: "#FFFFFF",
}

export const $container: ViewStyle = {
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
  paddingHorizontal: 32,
  gap: 16,
}

export const $iconCircle: ViewStyle = {
  width: 96,
  height: 96,
  borderRadius: 48,
  backgroundColor: "#ECF4FE",
  justifyContent: "center",
  alignItems: "center",
  marginBottom: 8,
}

export const $heading: TextStyle = {
  fontSize: 22,
  fontFamily: typography.primary.bold,
  color: "#111111",
  textAlign: "center",
}

export const $subtitle: TextStyle = {
  fontSize: 15,
  fontFamily: typography.primary.normal,
  color: "#7B7B7B",
  textAlign: "center",
  lineHeight: 22,
}

export const $buttonDivider: ViewStyle = {
  height: 1,
  backgroundColor: "#E9ECF0",
}

export const $buttonRow: ViewStyle = {
  paddingTop: 28,
  paddingHorizontal: 16,
}

export const $homeBtn: ViewStyle = {
  height: 50,
  borderRadius: 10,
  backgroundColor: colors.blue,
  justifyContent: "center",
  alignItems: "center",
}

export const $homeBtnText: TextStyle = {
  fontSize: 16,
  fontFamily: typography.primary.semiBold,
  color: "#FFFFFF",
}
