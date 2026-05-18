import { ViewStyle, TextStyle } from "react-native"
import { colors } from "@/theme/colors"
import { typography } from "@/theme/typography"

// ── Source tab bar ─────────────────────────────────────────────────────────────

export const $sourceTabBar: ViewStyle = {
  flexDirection: "row",
  backgroundColor: "#FFFFFF",
  paddingHorizontal: 20,
  gap: 10,
  marginTop: 10,
}

export const $sourceTab: ViewStyle = {
  flex: 1,
  paddingVertical: 14,
  alignItems: "center",
  borderBottomWidth: 2,
  borderBottomColor: "transparent",
}

export const $sourceTabActive: ViewStyle = {
  borderBottomColor: colors.navy,
}

export const $sourceTabText: TextStyle = {
  fontSize: 15,
  fontFamily: typography.primary.bold,
  color: "#AAAAAA",
}

export const $sourceTabTextActive: TextStyle = {
  color: colors.navy,
}

// ── Search ─────────────────────────────────────────────────────────────────────

export const $searchSection: ViewStyle = {
  backgroundColor: "#FFFFFF",
  paddingHorizontal: 20,
  paddingVertical: 14,
}

export const $searchRow: ViewStyle = {
  height: 60,
  backgroundColor: "#F2F3F5",
  borderRadius: 10,
  borderWidth: 1,
  borderColor: "#E8E9ED",
  flexDirection: "row",
  alignItems: "center",
  paddingHorizontal: 20,
  gap: 8,
}

export const $searchInput: TextStyle = {
  flex: 1,
  fontSize: 16,
  fontFamily: typography.primary.normal,
  color: "#111111",
  padding: 0,
}

// ── Category chips ─────────────────────────────────────────────────────────────

export const $categoryRow: ViewStyle = {
  flexDirection: "row",
  backgroundColor: "#FFFFFF",
  paddingHorizontal: 20,
  paddingVertical: 12,
  gap: 8,
}

export const $categoryChip: ViewStyle = {
  flexGrow: 1,
  paddingVertical: 7,
  borderRadius: 20,
  backgroundColor: "#F9FAFE",
  alignItems: "center",
}

export const $categoryChipActive: ViewStyle = {
  backgroundColor: "#0B3069",
}

export const $categoryChipText: TextStyle = {
  fontSize: 13,
  fontFamily: typography.primary.bold,
  color: "#606679",
}

export const $categoryChipTextActive: TextStyle = {
  color: "#FFFFFF",
}

// ── List ───────────────────────────────────────────────────────────────────────

export const $listContent: ViewStyle = {
  paddingHorizontal: 20,
  paddingTop: 16,
  paddingBottom: 40,
  gap: 16,
}

// ── Card ───────────────────────────────────────────────────────────────────────

export const $card: ViewStyle = {
  backgroundColor: "#FFFFFF",
  borderRadius: 12,
  height: 100,
  paddingVertical: 14,
  paddingHorizontal: 16,
  gap: 10,
  borderWidth: 1.5,
  borderColor: "transparent",
  shadowColor: "#000000",
  shadowOffset: { width: 0, height: 4 },
  shadowOpacity: 0.1,
  shadowRadius: 12,
  elevation: 6,
}

export const $cardSelected: ViewStyle = {
  borderColor: "#1062D8",
}

export const $cardTopRow: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
}

export const $cardDate: TextStyle = {
  fontSize: 13,
  fontFamily: typography.primary.medium,
  color: "#606679",
}

export const $cardTopRight: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
  gap: 8,
}

export const $cardBadge: ViewStyle = {
  paddingHorizontal: 8,
  paddingVertical: 3,
  borderRadius: 4,
}

export const $cardBadgeText: TextStyle = {
  fontSize: 11,
  fontFamily: typography.primary.semiBold,
}

export const $cardTitle: TextStyle = {
  fontSize: 16,
  fontFamily: typography.primary.bold,
  color: "#111111",
  lineHeight: 22,
}

// ── Checkbox ───────────────────────────────────────────────────────────────────

export const $checkbox: ViewStyle = {
  width: 22,
  height: 22,
  borderRadius: 5,
  borderWidth: 2,
  borderColor: "#CCCCCC",
  justifyContent: "center",
  alignItems: "center",
}

export const $checkboxActive: ViewStyle = {
  borderColor: "#1062D8",
  backgroundColor: "#1062D8",
}

export const $checkboxDot: ViewStyle = {
  width: 11,
  height: 7,
  borderLeftWidth: 2,
  borderBottomWidth: 2,
  borderColor: "#FFFFFF",
  transform: [{ rotate: "-45deg" }],
  marginTop: -2,
}

// ── Empty ──────────────────────────────────────────────────────────────────────

export const $emptyContainer: ViewStyle = {
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
  gap: 24,
  paddingBottom: 80,
}

export const $emptyIconCircle: ViewStyle = {
  width: 64,
  height: 64,
  borderRadius: 32,
  backgroundColor: "#F0F4FB",
  justifyContent: "center",
  alignItems: "center",
}

export const $emptyText: TextStyle = {
  fontSize: 20,
  fontFamily: typography.primary.semiBold,
  color: "#000000",
}

// ── Bottom bar ─────────────────────────────────────────────────────────────────

export const $bottomBar: ViewStyle = {
  paddingHorizontal: 20,
  paddingTop: 14,
  backgroundColor: "#FFFFFF",
}

export const $confirmBtn: ViewStyle = {
  height: 52,
  borderRadius: 12,
  backgroundColor: "#1062D8",
  justifyContent: "center",
  alignItems: "center",
}

export const $confirmBtnDisabled: ViewStyle = {
  backgroundColor: "#F3F2F0",
}

export const $confirmBtnText: TextStyle = {
  fontSize: 16,
  fontFamily: typography.primary.bold,
  color: "#FFFFFF",
}
