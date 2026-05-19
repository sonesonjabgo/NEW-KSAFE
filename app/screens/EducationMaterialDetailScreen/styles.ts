import { TextStyle, ViewStyle } from "react-native"

import { typography } from "@/theme/typography"

export const $scroll: ViewStyle = {
  flex: 1,
}

export const $scrollContent: ViewStyle = {
  padding: 16,
  gap: 12,
  paddingBottom: 32,
}

// ── Card shared ────────────────────────────────────────────────────────────────

export const $card: ViewStyle = {
  backgroundColor: "#FFFFFF",
  borderRadius: 16,
  padding: 20,
  gap: 12,
  shadowColor: "#000000",
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.06,
  shadowRadius: 8,
  elevation: 3,
}

// ── Card 1 ─────────────────────────────────────────────────────────────────────

export const $badgesRow: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
  gap: 8,
}

export const $badge: ViewStyle = {
  paddingHorizontal: 10,
  paddingVertical: 4,
  borderRadius: 6,
}

export const $badgeText: TextStyle = {
  fontSize: 12,
  fontFamily: typography.primary.semiBold,
}

export const $categoryLabel: TextStyle = {
  fontSize: 14,
  fontFamily: typography.primary.semiBold,
  color: "#606060",
}

export const $title: TextStyle = {
  fontSize: 21,
  fontFamily: typography.primary.bold,
  color: "#000000",
  lineHeight: 28,
}

export const $dateRow: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
  gap: 6,
}

export const $dateText: TextStyle = {
  fontSize: 14,
  fontFamily: typography.primary.medium,
  color: "#606060",
}

// ── Card 2 ─────────────────────────────────────────────────────────────────────

export const $attachmentHeaderRow: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
  gap: 2,
}

export const $attachmentHeaderText: TextStyle = {
  fontSize: 16,
  fontFamily: typography.primary.bold,
  color: "#000000",
}

export const $fileMetaText: TextStyle = {
  fontSize: 14,
  fontFamily: typography.primary.normal,
  color: "#767676",
}

export const $fileChip: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
  backgroundColor: "#F2F7FD",
  borderRadius: 10,
  paddingHorizontal: 14,
  paddingVertical: 12,
  gap: 10,
}

export const $fileChipName: TextStyle = {
  flex: 1,
  fontSize: 16,
  fontFamily: typography.primary.semiBold,
  color: "#1062D8",
}
