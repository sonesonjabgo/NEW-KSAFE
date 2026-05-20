import { ImageStyle, TextStyle, ViewStyle } from "react-native"

import { typography } from "@/theme/typography"

// ── Layout ────────────────────────────────────────────────────────────────────

export const $flex1: ViewStyle = { flex: 1 }

export const $scrollContent: ViewStyle = {
  paddingHorizontal: 20,
  paddingTop: 20,
  paddingBottom: 48,
  gap: 16,
}

// ── Info Card ─────────────────────────────────────────────────────────────────

export const $infoCard: ViewStyle = {
  backgroundColor: "#FFFFFF",
  borderRadius: 12,
  borderWidth: 1,
  borderColor: "#E9ECF0",
  paddingHorizontal: 20,
  paddingVertical: 18,
  gap: 15,
  shadowColor: "#000000",
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.06,
  shadowRadius: 6,
  elevation: 2,
}

export const $cardTopRow: ViewStyle = {
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
}

export const $cardDate: TextStyle = {
  fontSize: 13,
  fontFamily: typography.primary.normal,
  color: "#A9A9A9",
}

// ── Status Badge ──────────────────────────────────────────────────────────────

export const $badge: ViewStyle = {
  paddingVertical: 4,
  paddingHorizontal: 10,
  borderRadius: 6,
  justifyContent: "center",
  alignItems: "center",
}

export const $badgeText: TextStyle = {
  fontSize: 13,
  fontFamily: typography.primary.semiBold,
}

// ── Inline Info Row (위치 / 위험요인) ─────────────────────────────────────────

export const $infoRow: ViewStyle = {
  flexDirection: "row",
  gap: 12,
  alignItems: "flex-start",
  paddingLeft: 8,
}

export const $inlineLabel: TextStyle = {
  width: 60,
  fontSize: 14,
  fontFamily: typography.primary.semiBold,
  color: "#979797",
  flexShrink: 0,
}

export const $inlineValue: TextStyle = {
  flex: 1,
  fontSize: 14,
  fontFamily: typography.primary.normal,
  color: "#000000",
  lineHeight: 20,
}

// ── Photos Section ────────────────────────────────────────────────────────────

export const $photosSection: ViewStyle = {
  gap: 10,
}

export const $photosSectionLabel: TextStyle = {
  fontSize: 16,
  fontFamily: typography.primary.semiBold,
  color: "#555555",
}

export const $photoGrid: ViewStyle = {
  flexDirection: "row",
  flexWrap: "wrap",
  gap: 8,
}

export const $photoItem: ImageStyle = {
  width: 88,
  height: 88,
  borderRadius: 8,
  backgroundColor: "#E0E0E0",
}

export const $noPhotosText: TextStyle = {
  fontSize: 14,
  fontFamily: typography.primary.normal,
  color: "#BBBBBB",
}

// ── Manager Profile ───────────────────────────────────────────────────────────

export const $managerRow: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
  gap: 12,
}

export const $managerAvatar: ViewStyle = {
  width: 40,
  height: 40,
  borderRadius: 20,
  backgroundColor: "#E5EDF8",
  justifyContent: "center",
  alignItems: "center",
  flexShrink: 0,
}

export const $managerAvatarText: TextStyle = {
  fontSize: 16,
  fontFamily: typography.primary.semiBold,
  color: "#1062D8",
}

export const $managerInfo: ViewStyle = {
  flex: 1,
  gap: 2,
}

export const $managerName: TextStyle = {
  fontSize: 15,
  fontFamily: typography.primary.semiBold,
  color: "#111111",
}

export const $managerAffiliation: TextStyle = {
  fontSize: 13,
  fontFamily: typography.primary.normal,
  color: "#9EA3AF",
}

// ── Admin Section ─────────────────────────────────────────────────────────────

export const $adminSection: ViewStyle = {
  gap: 14,
}

export const $sectionTitleRow: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
  gap: 10,
}

export const $sectionTitle: TextStyle = {
  fontSize: 16,
  fontFamily: typography.primary.semiBold,
  color: "#555555",
  flexShrink: 0,
}

export const $sectionDivider: ViewStyle = {
  flex: 1,
  height: 1,
  backgroundColor: "#E0E0E0",
}

export const $adminCard: ViewStyle = {
  backgroundColor: "#FFFFFF",
  borderRadius: 12,
  borderWidth: 1,
  borderColor: "#E9ECF0",
  paddingHorizontal: 20,
  paddingVertical: 25,
  gap: 22,
  shadowColor: "#000000",
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.06,
  shadowRadius: 6,
  elevation: 2,
}

export const $statusButtonRow: ViewStyle = {
  flexDirection: "row",
  gap: 9,
}

export const $statusButton: ViewStyle = {
  flex: 1,
  height: 83,
  borderRadius: 13,
  borderWidth: 2,
  borderColor: "#E0E0E0",
  backgroundColor: "#F5F5F5",
  alignItems: "center",
  justifyContent: "center",
  gap: 6,
}

export const $statusButtonText: TextStyle = {
  fontSize: 13,
  fontFamily: typography.primary.semiBold,
  color: "#AAAAAA",
}

export const $selectedBadge: ViewStyle = {
  position: "absolute",
  top: -9,
  right: -9,
  width: 20,
  height: 20,
  borderRadius: 10,
  alignItems: "center",
  justifyContent: "center",
}

export const $noteLabel: TextStyle = {
  fontSize: 15,
  fontFamily: typography.primary.semiBold,
  color: "#555555",
}

export const $dashedInputCard: ViewStyle = {
  height: 110,
  borderRadius: 8,
  borderWidth: 1,
  borderStyle: "dashed",
  borderColor: "#ECECEC",
  backgroundColor: "#FBFBFB",
  padding: 12,
}

export const $dashedInput: TextStyle = {
  flex: 1,
  fontSize: 13,
  fontFamily: typography.primary.normal,
  color: "#222222",
  textAlignVertical: "top",
}

export const $noteHint: TextStyle = {
  fontSize: 12,
  fontFamily: typography.primary.medium,
  color: "#979797",
}
