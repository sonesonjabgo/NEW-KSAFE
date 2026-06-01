import { TextStyle, ViewStyle } from "react-native"

import { colors } from "@/theme/colors"
import { typography } from "@/theme/typography"

export const $scroll: ViewStyle = {
  flex: 1,
}

export const $scrollContent: ViewStyle = {
  paddingHorizontal: 22,
  paddingTop: 16,
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
  justifyContent: "space-between",
}

export const $badge: ViewStyle = {
  height: 23,
  paddingHorizontal: 12,
  borderRadius: 20,
  justifyContent: "center",
  alignItems: "center",
}

export const $badgeText: TextStyle = {
  fontSize: 14,
  fontFamily: typography.primary.semiBold,
}

export const $categoryLabel: TextStyle = {
  fontSize: 14,
  fontFamily: typography.primary.semiBold,
  color: "#555555",
}

export const $title: TextStyle = {
  fontSize: 21,
  fontFamily: typography.primary.bold,
  color: "#000000",
  lineHeight: 28,
}

export const $authorBadge: ViewStyle = {
  alignSelf: "flex-start",
  backgroundColor: "#F3F2EF",
  borderRadius: 6,
  paddingHorizontal: 10,
  paddingVertical: 4,
}

export const $authorBadgeText: TextStyle = {
  fontSize: 14,
  fontFamily: typography.primary.medium,
  color: "#333333",
}

export const $dateRow: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
  gap: 6,
}

export const $dateText: TextStyle = {
  fontSize: 14,
  fontFamily: typography.primary.medium,
  color: "#555555",
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
  color: "#555555",
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

export const $publishBtn: ViewStyle = {
  height: 50,
  borderRadius: 10,
  backgroundColor: colors.blue,
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
  gap: 8,
}

export const $publishBtnText: TextStyle = {
  fontSize: 16,
  fontFamily: typography.primary.semiBold,
  color: "#FFFFFF",
}
