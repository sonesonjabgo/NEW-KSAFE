import { ViewStyle, TextStyle } from "react-native"

import { colors } from "@/theme/colors"
import { typography } from "@/theme/typography"

export const $card: ViewStyle = {
  backgroundColor: "#FFFFFF",
  borderRadius: 12,
  paddingTop: 14,
  paddingHorizontal: 16,
  gap: 8,
  shadowColor: "#000000",
  shadowOffset: { width: 0, height: 4 },
  shadowOpacity: 0.1,
  shadowRadius: 12,
  elevation: 6,
}

export const $cardTopRow: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
}

export const $cardBadge: ViewStyle = {
  paddingHorizontal: 8,
  paddingVertical: 3,
  borderRadius: 4,
}

export const $cardBadgeText: TextStyle = {
  fontSize: 14,
  fontFamily: typography.primary.semiBold,
}

export const $cardDate: TextStyle = {
  fontSize: 14,
  fontFamily: typography.primary.medium,
  color: "#333333",
}

export const $cardTitle: TextStyle = {
  fontSize: 16,
  fontFamily: typography.primary.bold,
  color: "#111111",
  lineHeight: 22,
}

export const $cardFileName: TextStyle = {
  fontSize: 14,
  fontFamily: typography.primary.medium,
  color: "#555555",
}

export const $cardDivider: ViewStyle = {
  height: 1,
  backgroundColor: "#E9ECF0",
  marginTop: 4,
}

export const $cardBottomRow: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  paddingBottom: 14,
}

export const $cardAuthor: TextStyle = {
  fontSize: 14,
  fontFamily: typography.primary.normal,
  color: "#56524F",
}

export const $cardSource: TextStyle = {
  fontSize: 14,
  fontFamily: typography.primary.normal,
  color: "#555555",
}

// ── Register button ────────────────────────────────────────────────────────────

export const $registerBar: ViewStyle = {
  paddingHorizontal: 20,
  paddingTop: 14,
  backgroundColor: "#FFFFFF",
}

export const $registerBtn: ViewStyle = {
  height: 50,
  borderRadius: 10,
  backgroundColor: colors.blue,
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
  gap: 8,
}

export const $registerBtnText: TextStyle = {
  fontSize: 16,
  fontFamily: typography.primary.semiBold,
  color: "#FFFFFF",
}
