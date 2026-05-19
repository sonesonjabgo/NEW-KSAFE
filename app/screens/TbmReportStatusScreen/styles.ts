import { ViewStyle, TextStyle } from "react-native"

import { colors } from "@/theme/colors"
import { typography } from "@/theme/typography"

export const $scrollInner: ViewStyle = {
  paddingHorizontal: 20,
  paddingTop: 25,
  gap: 20,
}

// ── Detail Card (보고서 정보) ──────────────────────────────────────────────────

export const $detailCard: ViewStyle = {
  backgroundColor: "#FFFFFF",
  borderRadius: 10,
  padding: 16,
  gap: 15,
  shadowColor: "#000000",
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.1,
  shadowRadius: 8,
  elevation: 4,
}

export const $cardTopRow: ViewStyle = {
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
}

export const $badge: ViewStyle = {
  paddingHorizontal: 10,
  paddingVertical: 4,
  borderRadius: 4,
  justifyContent: "center",
  alignItems: "center",
}

export const $badgeRequested: ViewStyle = {
  ...$badge,
  backgroundColor: "#E5E6E9",
}

export const $badgeGenerating: ViewStyle = {
  ...$badge,
  backgroundColor: "#FFF4E5",
}

export const $badgeCompleted: ViewStyle = {
  ...$badge,
  backgroundColor: "#CFFFE1",
}

export const $badgeFailed: ViewStyle = {
  ...$badge,
  backgroundColor: "#FFE5E5",
}

export const $badgeRequestedText: TextStyle = {
  fontSize: 12,
  fontFamily: typography.primary.semiBold,
  color: "#606679",
}

export const $badgeGeneratingText: TextStyle = {
  fontSize: 12,
  fontFamily: typography.primary.semiBold,
  color: "#D48208",
}

export const $badgeCompletedText: TextStyle = {
  fontSize: 12,
  fontFamily: typography.primary.semiBold,
  color: "#18A24A",
}

export const $badgeFailedText: TextStyle = {
  fontSize: 12,
  fontFamily: typography.primary.semiBold,
  color: "#D32F2F",
}

export const $cardDate: TextStyle = {
  fontSize: 13,
  fontFamily: typography.primary.normal,
  color: "#A9A9A9",
}

export const $cardTitle: TextStyle = {
  fontSize: 21,
  fontFamily: typography.primary.bold,
  color: "#000000",
}

export const $cardWorkDateRow: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
  gap: 6,
}

export const $cardWorkDate: TextStyle = {
  fontSize: 14,
  fontFamily: typography.primary.normal,
  color: "#333333",
}

export const $cardAuthorRow: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
  gap: 10,
}

export const $cardAvatar: ViewStyle = {
  width: 36,
  height: 36,
  borderRadius: 18,
  backgroundColor: "#E0E0E0",
  flexShrink: 0,
}

export const $cardAuthorName: TextStyle = {
  fontSize: 15,
  fontFamily: typography.primary.bold,
  color: "#111111",
}

export const $cardAuthorLocation: TextStyle = {
  fontSize: 15,
  fontFamily: typography.primary.normal,
  color: "#574D4A",
}

export const $cardDivider: ViewStyle = {
  height: 1,
  backgroundColor: "#EEEEEE",
}

export const $activityLabel: TextStyle = {
  fontSize: 14,
  fontFamily: typography.primary.semiBold,
  color: "#606060",
}

export const $activityContent: TextStyle = {
  fontSize: 14,
  fontFamily: typography.primary.normal,
  color: "#333333",
  lineHeight: 22,
}

// ── Section Header ────────────────────────────────────────────────────────────

export const $sectionHeaderRow: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
  gap: 10,
  marginTop: 10,
}

export const $sectionTitle: TextStyle = {
  fontSize: 16,
  fontFamily: typography.primary.semiBold,
  color: "#555555",
}

export const $sectionHeaderLine: ViewStyle = {
  flex: 1,
  height: 1,
  backgroundColor: "#E9ECF0",
}

// ── Process Status (처리 상태) ──────────────────────────────────────────────────

export const $processCard: ViewStyle = {
  backgroundColor: "#FFFFFF",
  borderRadius: 10,
  padding: 16,
  borderWidth: 1,
  borderColor: "#E9ECF0",
  alignItems: "center",
  justifyContent: "center",
  minHeight: 100,
}

export const $processStatusText: TextStyle = {
  fontSize: 18,
  fontFamily: typography.primary.bold,
  color: colors.navy,
}

// ── Status History (상태 이력) ──────────────────────────────────────────────────

export const $historyCard: ViewStyle = {
  backgroundColor: "#FFFFFF",
  borderRadius: 10,
  padding: 16,
  borderWidth: 1,
  borderColor: "#E9ECF0",
  gap: 16,
}

export const $historyItem: ViewStyle = {
  flexDirection: "row",
  gap: 12,
}

export const $historyTimeline: ViewStyle = {
  alignItems: "center",
}

export const $historyDot: ViewStyle = {
  width: 12,
  height: 12,
  borderRadius: 6,
  backgroundColor: colors.navy,
}

export const $historyLine: ViewStyle = {
  width: 2,
  flex: 1,
  backgroundColor: "#E9ECF0",
  marginTop: 4,
}

export const $historyContent: ViewStyle = {
  flex: 1,
  gap: 4,
  paddingBottom: 16,
}

export const $historyTop: ViewStyle = {
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
}

export const $historyStatus: TextStyle = {
  fontSize: 14,
  fontFamily: typography.primary.bold,
  color: "#111111",
}

export const $historyTime: TextStyle = {
  fontSize: 12,
  fontFamily: typography.primary.normal,
  color: "#A9A9A9",
}

export const $historyDesc: TextStyle = {
  fontSize: 13,
  fontFamily: typography.primary.normal,
  color: "#666666",
}
