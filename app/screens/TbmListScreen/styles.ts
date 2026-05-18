import { ViewStyle, TextStyle } from "react-native"
import { colors } from "@/theme/colors"
import { typography } from "@/theme/typography"

const CARD_BG = "#FFFFFF"

// ── Tab Bar ──────────────────────────────────────────────────────────────────

export const $tabBar: ViewStyle = {
  flexDirection: "row",
  backgroundColor: CARD_BG,
  paddingHorizontal: 16,
  paddingVertical: 8,
  gap: 6,
}

export const $tab: ViewStyle = {
  flex: 1,
  alignItems: "center",
  justifyContent: "center",
  paddingVertical: 5,
  paddingHorizontal: 4,
  borderRadius: 20,
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

// ── List ─────────────────────────────────────────────────────────────────────

export const $listContent: ViewStyle = {
  flex: 1,
  backgroundColor: "#FFFFFF",
}

export const $flatListContent: ViewStyle = {
  padding: 16,
  paddingBottom: 100,
}

// ── Card ─────────────────────────────────────────────────────────────────────

export const $card: ViewStyle = {
  backgroundColor: "#FFFFFF",
  borderRadius: 12,
  padding: 16,
  marginBottom: 12,
  shadowColor: "#000000",
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.18,
  shadowRadius: 6,
  elevation: 4,
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
  width: 44,
  height: 20,
  borderRadius: 4,
  justifyContent: "center",
  alignItems: "center",
}

export const $badgeDrafting: ViewStyle = {
  ...$badge,
  backgroundColor: "#E5E6E9",
}

export const $badgeOngoing: ViewStyle = {
  ...$badge,
  backgroundColor: "#CFFFE1",
}

export const $badgeEnded: ViewStyle = {
  ...$badge,
  backgroundColor: "#000000",
}

export const $badgeDraftingText: TextStyle = {
  fontSize: 12,
  color: "#606679",
  fontFamily: typography.primary.semiBold,
}

export const $badgeOngoingText: TextStyle = {
  fontSize: 12,
  color: "#18A24A",
  fontFamily: typography.primary.semiBold,
}

export const $badgeEndedText: TextStyle = {
  fontSize: 12,
  color: "#FFFFFF",
  fontFamily: typography.primary.semiBold,
}

// ── Empty State ───────────────────────────────────────────────────────────────

export const $emptyContainer: ViewStyle = {
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
  paddingVertical: 80,
}

export const $emptyImage: ViewStyle = {
  marginBottom: 20,
}

export const $emptyText: TextStyle = {
  fontSize: 20,
  color: "#000000",
  fontFamily: typography.primary.semiBold,
}

// ── FAB ───────────────────────────────────────────────────────────────────────

export const $fab: ViewStyle = {
  width: 80,
  height: 80,
  borderRadius: 40,
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
  fontSize: 11,
  color: "#FFFFFF",
  fontFamily: typography.primary.bold,
  textAlign: "center",
}
