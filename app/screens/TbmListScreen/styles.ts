import { ViewStyle, TextStyle } from "react-native"
import { typography } from "@/theme/typography"

const HEADER_BG = "#1E2A4A"
const CARD_BG = "#FFFFFF"
const PILL_ACTIVE_BG = "#0B3069"

// ── Tab Bar ──────────────────────────────────────────────────────────────────

export const $tabBar: ViewStyle = {
  flexDirection: "row",
  backgroundColor: CARD_BG,
  paddingHorizontal: 16,
  paddingVertical: 8,
}

export const $tab: ViewStyle = {
  flex: 1,
  alignItems: "center",
  justifyContent: "center",
  paddingVertical: 5,
  paddingHorizontal: 4,
  borderRadius: 20,
}

export const $activeTab: ViewStyle = {
  backgroundColor: PILL_ACTIVE_BG,
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
  color: "#999999",
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
  marginBottom: 4,
}

export const $cardMetaText: TextStyle = {
  fontSize: 13,
  color: "#777777",
  fontFamily: typography.primary.normal,
  marginLeft: 6,
  flex: 1,
}

// ── Badge ─────────────────────────────────────────────────────────────────────

export const $badge: ViewStyle = {
  borderRadius: 12,
  paddingVertical: 4,
  paddingHorizontal: 12,
}

export const $badgeDrafting: ViewStyle = {
  ...$badge,
  borderWidth: 1,
  borderColor: "#3B82F6",
  backgroundColor: "transparent",
}

export const $badgeOngoing: ViewStyle = {
  ...$badge,
  borderWidth: 1,
  borderColor: "#22C55E",
  backgroundColor: "transparent",
}

export const $badgeEnded: ViewStyle = {
  ...$badge,
  backgroundColor: "#9CA3AF",
}

export const $badgeDraftingText: TextStyle = {
  fontSize: 12,
  color: "#3B82F6",
  fontFamily: typography.primary.semiBold,
}

export const $badgeOngoingText: TextStyle = {
  fontSize: 12,
  color: "#22C55E",
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

export const $emptyIconCircle: ViewStyle = {
  width: 80,
  height: 80,
  borderRadius: 40,
  backgroundColor: "#EEF2F7",
  justifyContent: "center",
  alignItems: "center",
  marginBottom: 16,
}

export const $emptyText: TextStyle = {
  fontSize: 14,
  color: "#999999",
  fontFamily: typography.primary.normal,
}

// ── FAB ───────────────────────────────────────────────────────────────────────

export const $fab: ViewStyle = {
  width: 58,
  height: 58,
  borderRadius: 29,
  backgroundColor: HEADER_BG,
  justifyContent: "center",
  alignItems: "center",
  shadowColor: "#000000",
  shadowOffset: { width: 0, height: 4 },
  shadowOpacity: 0.25,
  shadowRadius: 12,
  elevation: 6,
}

export const $fabLabel: TextStyle = {
  marginTop: 4,
  fontSize: 12,
  color: HEADER_BG,
  fontFamily: typography.primary.bold,
  textAlign: "center",
}
