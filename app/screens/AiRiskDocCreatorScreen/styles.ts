import { TextStyle, ViewStyle } from "react-native"

import { colors } from "@/theme/colors"
import { typography } from "@/theme/typography"

// ── Scroll ────────────────────────────────────────────────────────────────────

export const $scroll: ViewStyle = {
  flex: 1,
}

export const $scrollContent: ViewStyle = {
  flexGrow: 1,
  paddingHorizontal: 30,
  paddingTop: 24,
  paddingBottom: 40,
}

// ── Page Count ────────────────────────────────────────────────────────────────

export const $pageCount: TextStyle = {
  fontSize: 16,
  fontFamily: typography.primary.semiBold,
  color: colors.navy,
  textAlign: "center",
  marginBottom: 20,
}

// ── Action Buttons ────────────────────────────────────────────────────────────

export const $actionBtn: ViewStyle = {
  height: 52,
  borderRadius: 12,
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
  gap: 8,
  marginBottom: 12,
}

export const $actionBtnActive: ViewStyle = {
  backgroundColor: colors.blue,
}

export const $actionBtnDisabled: ViewStyle = {
  backgroundColor: "#AAAAAA",
}

export const $actionBtnLabel: TextStyle = {
  fontSize: 16,
  fontFamily: typography.primary.bold,
  color: "#FFFFFF",
}

// ── Hazard Toggle Card ────────────────────────────────────────────────────────

export const $toggleCard: ViewStyle = {
  flexDirection: "row",
  alignItems: "flex-start",
  gap: 12,
  backgroundColor: "#FFFFFF",
  borderRadius: 12,
  borderWidth: 1,
  borderColor: "#E5E7EB",
  paddingVertical: 14,
  paddingHorizontal: 16,
  marginTop: 4,
  marginBottom: 28,
}

export const $checkbox: ViewStyle = {
  width: 22,
  height: 22,
  borderRadius: 4,
  borderWidth: 2,
  borderColor: colors.blue,
  alignItems: "center",
  justifyContent: "center",
  marginTop: 1,
  flexShrink: 0,
}

export const $checkboxChecked: ViewStyle = {
  backgroundColor: colors.blue,
}

export const $toggleTextBlock: ViewStyle = {
  flex: 1,
}

export const $toggleLabel: TextStyle = {
  fontSize: 15,
  fontFamily: typography.primary.semiBold,
  color: colors.navy,
}

export const $toggleDesc: TextStyle = {
  fontSize: 13,
  fontFamily: typography.primary.normal,
  color: "#888888",
  marginTop: 4,
  lineHeight: 19,
}

// ── Empty State ───────────────────────────────────────────────────────────────

export const $emptyContainer: ViewStyle = {
  flex: 1,
  alignItems: "center",
  justifyContent: "center",
  paddingTop: 20,
}

export const $emptyImageWrapper: ViewStyle = {
  marginBottom: 20,
}

export const $emptyTitle: TextStyle = {
  fontSize: 17,
  fontFamily: typography.primary.bold,
  color: colors.navy,
  textAlign: "center",
  marginBottom: 8,
}

export const $emptyDesc: TextStyle = {
  fontSize: 14,
  fontFamily: typography.primary.normal,
  color: "#888888",
  textAlign: "center",
  lineHeight: 21,
}
