import { ViewStyle, TextStyle } from "react-native"
import { typography } from "@/theme/typography"

// ── Scroll ────────────────────────────────────────────────────────────────────

export const $scrollInner: ViewStyle = {
  paddingHorizontal: 20,
  paddingTop: 25,
  gap: 14,
}

// ── Detail Card ───────────────────────────────────────────────────────────────

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
  fontFamily: typography.primary.semiBold,
  color: "#606679",
}

export const $badgeOngoingText: TextStyle = {
  fontSize: 12,
  fontFamily: typography.primary.semiBold,
  color: "#18A24A",
}

export const $badgeEndedText: TextStyle = {
  fontSize: 12,
  fontFamily: typography.primary.semiBold,
  color: "#FFFFFF",
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

// ── Education Section ─────────────────────────────────────────────────────────

export const $educationHeaderRow: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
  gap: 10,
}

export const $educationSectionHeader: TextStyle = {
  fontSize: 16,
  fontFamily: typography.primary.semiBold,
  color: "#555555",
}

export const $educationHeaderLine: ViewStyle = {
  flex: 1,
  height: 1,
  backgroundColor: "#E9ECF0",
}

export const $educationCard: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
  gap: 12,
  backgroundColor: "#FFFFFF",
  borderRadius: 10,
  height: 75,
  paddingHorizontal: 16,
  borderWidth: 1,
  borderColor: "#E9ECF0",
}

export const $educationIconCircle: ViewStyle = {
  width: 36,
  height: 36,
  borderRadius: 18,
  backgroundColor: "#DEE7F9",
  justifyContent: "center",
  alignItems: "center",
  flexShrink: 0,
}

export const $educationCardTitle: TextStyle = {
  flex: 1,
  fontSize: 14,
  fontFamily: typography.primary.semiBold,
  color: "#555555",
  lineHeight: 20,
}

// ── Bottom Action Bar ─────────────────────────────────────────────────────────

export const $bottomBar: ViewStyle = {
  backgroundColor: "#FFFFFF",
  paddingTop: 14,
}

export const $startBtn: ViewStyle = {
  height: 52,
  borderRadius: 12,
  backgroundColor: "#1062D8",
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
  gap: 8,
}

export const $startBtnText: TextStyle = {
  fontSize: 17,
  fontFamily: typography.primary.bold,
  color: "#FFFFFF",
}

export const $actionRow: ViewStyle = {
  flexDirection: "row",
  gap: 12,
  marginTop: 10,
}

export const $editBtn: ViewStyle = {
  flex: 1,
  height: 48,
  borderRadius: 10,
  borderWidth: 1,
  borderColor: "#D3D3D3",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
  gap: 6,
}

export const $editBtnText: TextStyle = {
  fontSize: 14,
  fontFamily: typography.primary.semiBold,
  color: "#4C4C4C",
}

export const $deleteBtn: ViewStyle = {
  flex: 1,
  height: 48,
  borderRadius: 10,
  backgroundColor: "#FEEEED",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
  gap: 6,
}

export const $deleteBtnText: TextStyle = {
  fontSize: 14,
  fontFamily: typography.primary.semiBold,
  color: "#F87165",
}
