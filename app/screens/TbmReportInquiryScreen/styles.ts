import { ViewStyle, TextStyle } from "react-native"

import { colors } from "@/theme/colors"
import { typography } from "@/theme/typography"

export const $tabBar: ViewStyle = {
  flexDirection: "row",
  backgroundColor: "#FFFFFF",
  paddingHorizontal: 16,
  paddingVertical: 8,
  gap: 6,
}

export const $tab: ViewStyle = {
  flex: 1,
  alignItems: "center",
  justifyContent: "center",
  paddingVertical: 8,
  borderRadius: 20,
  backgroundColor: "#F9FAFE",
}

export const $activeTab: ViewStyle = {
  backgroundColor: colors.navy,
}

export const $tabText: TextStyle = {
  fontSize: 12,
  fontFamily: typography.primary.semiBold,
  color: "#999999",
}

export const $activeTabText: TextStyle = {
  color: "#FFFFFF",
}

export const $listContent: ViewStyle = {
  flex: 1,
  backgroundColor: "#FFFFFF",
}

export const $flatListContent: ViewStyle = {
  padding: 16,
  paddingBottom: 40,
}

// ── Card ─────────────────────────────────────────────────────────────────────

export const $card: ViewStyle = {
  backgroundColor: "#FFFFFF",
  borderRadius: 12,
  padding: 16,
  marginBottom: 12,
  shadowColor: "#000000",
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.1,
  shadowRadius: 6,
  elevation: 3,
}

export const $cardTopRow: ViewStyle = {
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: 8,
}

export const $cardDate: TextStyle = {
  fontSize: 12,
  color: "#A9A9A9",
  fontFamily: typography.primary.normal,
}

export const $cardTitle: TextStyle = {
  fontSize: 16,
  color: "#111111",
  fontFamily: typography.primary.semiBold,
  marginBottom: 2,
}

export const $cardParticipants: TextStyle = {
  fontSize: 13,
  color: "#999999",
  fontFamily: typography.primary.normal,
  marginTop: 2,
}

export const $cardDivider: ViewStyle = {
  height: 1,
  backgroundColor: "#EEEEEE",
  marginVertical: 10,
}

export const $cardMetaRow: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
}

export const $cardAvatar: ViewStyle = {
  width: 24,
  height: 24,
  borderRadius: 12,
  backgroundColor: "#F3F2F0",
  marginRight: 6,
  flexShrink: 0,
}

export const $cardMetaAuthor: TextStyle = {
  fontSize: 12,
  color: "#333333",
  fontFamily: typography.primary.semiBold,
  flexShrink: 1,
  marginRight: 5,
}

export const $cardMetaLocation: TextStyle = {
  fontSize: 12,
  color: "#A9A9A9",
  fontFamily: typography.primary.normal,
  flexShrink: 1,
}

// ── Badge ─────────────────────────────────────────────────────────────────────

export const $badge: ViewStyle = {
  paddingHorizontal: 8,
  paddingVertical: 2,
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
  fontSize: 11,
  color: "#606679",
  fontFamily: typography.primary.semiBold,
}

export const $badgeGeneratingText: TextStyle = {
  fontSize: 11,
  color: "#D48208",
  fontFamily: typography.primary.semiBold,
}

export const $badgeCompletedText: TextStyle = {
  fontSize: 11,
  color: "#18A24A",
  fontFamily: typography.primary.semiBold,
}

export const $badgeFailedText: TextStyle = {
  fontSize: 11,
  color: "#D32F2F",
  fontFamily: typography.primary.semiBold,
}

// ── Empty State ───────────────────────────────────────────────────────────────

export const $emptyContainer: ViewStyle = {
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
  paddingVertical: 120,
}

export const $emptyImage: ViewStyle = {
  marginBottom: 20,
}

export const $emptyText: TextStyle = {
  fontSize: 20,
  color: "#000000",
  fontFamily: typography.primary.semiBold,
}
