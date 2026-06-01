import { TextStyle, ViewStyle } from "react-native"

import { colors } from "@/theme/colors"
import { typography } from "@/theme/typography"

import type { ProposalStatus } from "./types"

export const $flex1: ViewStyle = { flex: 1 }

export const $fabWrapper: ViewStyle = {
  position: "absolute",
  right: 20,
  alignItems: "center",
}

// ── Tab Bar ───────────────────────────────────────────────────────────────────

export const $tabBarWrapper: ViewStyle = {
  flexShrink: 0,
}

export const $tabScrollView: ViewStyle = {
  flexGrow: 0,
}

export const $tabBarContent: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
  paddingHorizontal: 16,
  paddingVertical: 10,
  gap: 8,
}

export const $tab: ViewStyle = {
  height: 34,
  alignItems: "center",
  justifyContent: "center",
  paddingHorizontal: 28,
  borderRadius: 17,
  backgroundColor: "#F9FAFE",
}

export const $activeTab: ViewStyle = {
  backgroundColor: colors.navy,
}

export const $tabText: TextStyle = {
  fontSize: 13,
  fontFamily: typography.primary.semiBold,
  color: "#999999",
}

export const $activeTabText: TextStyle = {
  color: "#FFFFFF",
}

// ── Summary ───────────────────────────────────────────────────────────────────

export const $summarySection: ViewStyle = {
  flexDirection: "row",
  gap: 12,
  paddingBottom: 20,
}

export const $summaryCard: ViewStyle = {
  flex: 1,
  backgroundColor: "#FFFFFF",
  borderRadius: 10,
  borderWidth: 1,
  borderColor: "#E9ECF0",
  paddingHorizontal: 16,
  paddingVertical: 14,
}

export const $summaryLabel: TextStyle = {
  fontSize: 12,
  fontFamily: typography.primary.normal,
  color: "#666666",
  marginBottom: 8,
}

export const $summaryCountRow: ViewStyle = {
  flexDirection: "row",
  alignItems: "baseline",
  gap: 2,
}

export const $summaryCountNavy: TextStyle = {
  fontSize: 26,
  fontFamily: typography.primary.bold,
  color: colors.navy,
}

export const $summaryUnitNavy: TextStyle = {
  fontSize: 14,
  fontFamily: typography.primary.normal,
  color: "#666666",
}

export const $summaryCountBlue: TextStyle = {
  fontSize: 26,
  fontFamily: typography.primary.bold,
  color: colors.blue,
}

export const $summaryUnitBlue: TextStyle = {
  fontSize: 14,
  fontFamily: typography.primary.normal,
  color: "#666666",
}

// ── List ─────────────────────────────────────────────────────────────────────

export const $listContent: ViewStyle = {
  paddingHorizontal: 16,
  paddingTop: 16,
  paddingBottom: 120,
  backgroundColor: "#FFFFFF",
}

// ── Card ─────────────────────────────────────────────────────────────────────

export const $card: ViewStyle = {
  backgroundColor: "#FFFFFF",
  borderRadius: 12,
  borderWidth: 1,
  borderColor: "#E9ECF0",
  padding: 16,
  marginBottom: 12,
}

export const $cardTopRow: ViewStyle = {
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: 10,
}

export const $cardDate: TextStyle = {
  fontSize: 12,
  fontFamily: typography.primary.normal,
  color: "#A9A9A9",
}

export const $cardTitle: TextStyle = {
  fontSize: 16,
  fontFamily: typography.primary.semiBold,
  color: "#111111",
  marginBottom: 4,
}

export const $cardContent: TextStyle = {
  fontSize: 13,
  fontFamily: typography.primary.normal,
  color: "#979797",
  marginBottom: 12,
  lineHeight: 18,
}

export const $cardDivider: ViewStyle = {
  height: 1,
  backgroundColor: "#EEEEEE",
  marginBottom: 12,
}

export const $cardAuthorRow: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
  gap: 6,
}

export const $cardAuthorName: TextStyle = {
  fontSize: 12,
  fontFamily: typography.primary.semiBold,
  color: "#333333",
}

// ── Status Badge ──────────────────────────────────────────────────────────────

export const $badge: ViewStyle = {
  paddingVertical: 3,
  paddingHorizontal: 8,
  borderRadius: 4,
  justifyContent: "center",
  alignItems: "center",
}

export const $badgeText: TextStyle = {
  fontSize: 12,
  fontFamily: typography.primary.semiBold,
}

export const $statusBadgeStyle: Record<ProposalStatus, ViewStyle> = {
  pending: { backgroundColor: "#E5E6E9" },
  ongoing: { backgroundColor: "#CFFFE1" },
  reflected: { backgroundColor: "#EEF3FC" },
  rejected: { backgroundColor: "#FFE8E8" },
}

export const $statusBadgeTextStyle: Record<ProposalStatus, TextStyle> = {
  pending: { color: "#606679" },
  ongoing: { color: "#18A24A" },
  reflected: { color: "#214ACC" },
  rejected: { color: "#D84040" },
}

// ── Empty State ───────────────────────────────────────────────────────────────

export const $emptyContainer: ViewStyle = {
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
  paddingVertical: 80,
}

export const $emptyText: TextStyle = {
  fontSize: 15,
  fontFamily: typography.primary.semiBold,
  color: "#999999",
}

// ── FAB ───────────────────────────────────────────────────────────────────────

export const $fab: ViewStyle = {
  width: 96,
  height: 96,
  borderRadius: 48,
  backgroundColor: colors.navy,
  justifyContent: "center",
  alignItems: "center",
  shadowColor: "#000000",
  shadowOffset: { width: 0, height: 6 },
  shadowOpacity: 0.3,
  shadowRadius: 16,
  elevation: 8,
}

export const $fabLabel: TextStyle = {
  marginTop: 4,
  fontSize: 13,
  lineHeight: 16,
  color: "#FFFFFF",
  fontFamily: typography.primary.bold,
  textAlign: "center",
  includeFontPadding: false,
}
