import { TextStyle, ViewStyle } from "react-native"

import { colors } from "@/theme/colors"
import { typography } from "@/theme/typography"

export const $wrapper: ViewStyle = {
  flex: 1,
  backgroundColor: "#FFFFFF",
}

export const $container: ViewStyle = {
  flex: 1,
  paddingHorizontal: 16,
  paddingVertical: 20,
}

export const $prompt: TextStyle = {
  fontSize: 21,
  fontFamily: typography.primary.bold,
  color: "#000000",
  marginBottom: 24,
}

export const $checklistContainer: ViewStyle = {
  gap: 12,
}

export const $checkItem: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
  gap: 14,
  paddingHorizontal: 16,
  paddingVertical: 18,
  borderRadius: 12,
  borderWidth: 1,
  borderColor: "#ECECEC",
  backgroundColor: "#FFFFFF",
}

export const $checkItemSelected: ViewStyle = {
  borderColor: "#1062D8",
  backgroundColor: "#ECF4FE",
}

export const $checkbox: ViewStyle = {
  width: 24,
  height: 24,
  borderRadius: 12,
  borderWidth: 2,
  borderColor: "#D3D3D3",
  justifyContent: "center",
  alignItems: "center",
  flexShrink: 0,
}

export const $checkboxSelected: ViewStyle = {
  width: 24,
  height: 24,
  borderRadius: 12,
  backgroundColor: "#1062D8",
  justifyContent: "center",
  alignItems: "center",
  flexShrink: 0,
}

export const $checkItemText: TextStyle = {
  flex: 1,
  fontSize: 16,
  fontFamily: typography.primary.medium,
  color: "#333333",
  lineHeight: 22,
}

export const $checkItemTextSelected: TextStyle = {
  color: "#1062D8",
  fontFamily: typography.primary.semiBold,
}

export const $iconCircle: ViewStyle = {
  width: 38,
  height: 38,
  borderRadius: 19,
  backgroundColor: "#E3EDFB",
  justifyContent: "center",
  alignItems: "center",
}

export const $buttonDivider: ViewStyle = {
  height: 1,
  backgroundColor: "#E9ECF0",
}

export const $buttonRow: ViewStyle = {
  flexDirection: "row",
  gap: 36,
  paddingTop: 28,
  paddingHorizontal: 16,
}

export const $prevBtn: ViewStyle = {
  flex: 1,
  height: 50,
  borderRadius: 10,
  borderWidth: 1,
  borderColor: "#D3D3D3",
  backgroundColor: "#FFFFFF",
  justifyContent: "center",
  alignItems: "center",
}

export const $prevBtnText: TextStyle = {
  fontSize: 16,
  fontFamily: typography.primary.semiBold,
  color: "#4C4C4C",
}

export const $nextBtn: ViewStyle = {
  flex: 1,
  height: 50,
  borderRadius: 10,
  backgroundColor: colors.blue,
  justifyContent: "center",
  alignItems: "center",
}

export const $nextBtnText: TextStyle = {
  fontSize: 16,
  fontFamily: typography.primary.semiBold,
  color: "#FFFFFF",
}
