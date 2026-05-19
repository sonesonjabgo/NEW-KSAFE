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
  paddingTop: 20,
}

export const $heading: TextStyle = {
  fontSize: 26,
  fontFamily: typography.primary.semiBold,
  color: "#000000",
  marginBottom: 17,
}

export const $prompt: TextStyle = {
  fontSize: 17,
  fontFamily: typography.primary.normal,
  color: "#181818",
  lineHeight: 26,
  marginBottom: 47,
}

// ── Cards ─────────────────────────────────────────────────────────────────────

export const $cardRow: ViewStyle = {
  flexDirection: "row",
  gap: 14,
}

export const $card: ViewStyle = {
  flex: 1,
  height: 214,
  borderRadius: 16,
  borderWidth: 1.5,
  borderColor: "#ECECEC",
  backgroundColor: "#FFFFFF",
  justifyContent: "center",
  alignItems: "center",
  gap: 40,
}

export const $cardSelected: ViewStyle = {
  borderColor: "#1062D8",
  backgroundColor: "#ECF4FE",
}

export const $emoji: TextStyle = {
  fontSize: 72,
}

export const $cardLabel: TextStyle = {
  fontSize: 17,
  fontFamily: typography.primary.semiBold,
  color: "#333333",
}

export const $cardLabelSelected: TextStyle = {
  color: "#1062D8",
}

// ── Toast ─────────────────────────────────────────────────────────────────────

export const $toast: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
  height: 45,
  marginHorizontal: 16,
  marginBottom: 8,
  paddingHorizontal: 14,
  backgroundColor: "#FDF1F1",
  borderRadius: 10,
  gap: 8,
}

export const $toastText: TextStyle = {
  flex: 1,
  fontSize: 14,
  fontFamily: typography.primary.semiBold,
  color: "#F26160",
}

// ── Buttons ───────────────────────────────────────────────────────────────────

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
