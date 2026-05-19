import { TextStyle, ViewStyle } from "react-native"

import { colors } from "@/theme/colors"
import { typography } from "@/theme/typography"

export const $wrapper: ViewStyle = {
  flex: 1,
  backgroundColor: "#FFFFFF",
}

export const $container: ViewStyle = {
  flex: 1,
}

export const $scrollContent: ViewStyle = {
  paddingHorizontal: 16,
  paddingTop: 20,
  paddingBottom: 12,
}

// ── Info Card ─────────────────────────────────────────────────────────────────

export const $infoCard: ViewStyle = {
  height: 85,
  borderRadius: 18,
  backgroundColor: "#ECF4FE",
  flexDirection: "row",
  alignItems: "center",
  paddingHorizontal: 16,
  gap: 14,
  marginBottom: 47,
}

export const $iconCircle: ViewStyle = {
  width: 48,
  height: 48,
  borderRadius: 24,
  backgroundColor: "#1062D8",
  justifyContent: "center",
  alignItems: "center",
  flexShrink: 0,
}

export const $cardTexts: ViewStyle = {
  flex: 1,
  gap: 4,
}

export const $cardTitle: TextStyle = {
  fontSize: 19,
  fontFamily: typography.primary.bold,
  color: "#181818",
}

export const $cardSubtitle: TextStyle = {
  fontSize: 16,
  fontFamily: typography.primary.normal,
  color: "#A9A9A9",
}

// ── Title ─────────────────────────────────────────────────────────────────────

export const $title: TextStyle = {
  fontSize: 36,
  fontFamily: typography.primary.bold,
  color: "#000000",
  marginBottom: 47,
  lineHeight: 46,
}

// ── Attachments ───────────────────────────────────────────────────────────────

export const $attachHeading: TextStyle = {
  fontSize: 19,
  fontFamily: typography.primary.bold,
  color: "#000000",
  marginBottom: 12,
}

export const $attachCard: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
  gap: 12,
  borderRadius: 12,
  borderWidth: 1,
  borderColor: "#ECECEC",
  paddingHorizontal: 16,
  paddingVertical: 14,
}

export const $attachName: TextStyle = {
  flex: 1,
  fontSize: 15,
  fontFamily: typography.primary.medium,
  color: "#181818",
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
