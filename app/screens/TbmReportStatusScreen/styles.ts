import { ViewStyle, TextStyle } from "react-native"

import { colors } from "@/theme/colors"
import { typography } from "@/theme/typography"

export const $scrollInner: ViewStyle = {
  paddingHorizontal: 20,
  paddingTop: 25,
  paddingBottom: 24,
  gap: 20,
}

// ── Detail Card (보고서 정보) ──────────────────────────────────────────────────

export const $detailCard: ViewStyle = {
  backgroundColor: "#FFFFFF",
  borderRadius: 10,
  padding: 16,
  gap: 12,
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

export const $cardInfoRow: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
  gap: 6,
}

export const $cardInfoLabel: TextStyle = {
  fontSize: 14,
  fontFamily: typography.primary.semiBold,
  color: "#555555",
  minWidth: 56,
}

export const $cardInfoValue: TextStyle = {
  fontSize: 14,
  fontFamily: typography.primary.normal,
  color: "#333333",
  flex: 1,
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
  minHeight: 80,
}

// ── Status History (상태 이력) ──────────────────────────────────────────────────

export const $historyCard: ViewStyle = {
  backgroundColor: "#FFFFFF",
  borderRadius: 10,
  padding: 16,
  borderWidth: 1,
  borderColor: "#E9ECF0",
  gap: 14,
}

export const $historyRow: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
}

export const $historyLabel: TextStyle = {
  fontSize: 14,
  fontFamily: typography.primary.semiBold,
  color: "#555555",
}

export const $historyValue: TextStyle = {
  fontSize: 14,
  fontFamily: typography.primary.normal,
  color: "#333333",
}

export const $historyValueEmpty: TextStyle = {
  fontSize: 14,
  fontFamily: typography.primary.normal,
  color: "#BBBBBB",
}

// ── Regenerate Section ────────────────────────────────────────────────────────

export const $regenContainer: ViewStyle = {
  gap: 30,
}

export const $regenInfoCard: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
  height: 66,
  backgroundColor: "#F4F8FD",
  borderRadius: 10,
  paddingHorizontal: 16,
  gap: 12,
}

export const $regenInfoIconCircle: ViewStyle = {
  width: 29,
  height: 29,
  borderRadius: 14.5,
  backgroundColor: "#1062D8",
  justifyContent: "center",
  alignItems: "center",
  flexShrink: 0,
}

export const $regenInfoIconText: TextStyle = {
  fontSize: 16,
  fontFamily: typography.primary.bold,
  color: "#FFFFFF",
}

export const $regenInfoText: TextStyle = {
  flex: 1,
  fontSize: 13,
  fontFamily: typography.primary.normal,
  color: "#564E4B",
  lineHeight: 19,
}

export const $regenSection: ViewStyle = {
  gap: 8,
  paddingBottom: 16,
  borderBottomWidth: 1,
  borderBottomColor: "#E9ECF0",
}

export const $regenSectionLabel: TextStyle = {
  fontSize: 19,
  fontFamily: typography.primary.bold,
  color: colors.navy,
}

export const $regenInputContainer: ViewStyle = {
  height: 48,
  borderWidth: 1,
  borderColor: "#ABABAB",
  borderRadius: 8,
  paddingHorizontal: 16,
  justifyContent: "center",
}

export const $regenInputText: TextStyle = {
  fontSize: 14,
  fontFamily: typography.primary.normal,
  color: "#111111",
  padding: 0,
}

export const $regenInputDescription: TextStyle = {
  fontSize: 13,
  fontFamily: typography.primary.medium,
  color: "#979797",
}

export const $regenCautionCard: ViewStyle = {
  backgroundColor: "#FFFBEA",
  borderRadius: 12,
  borderWidth: 1,
  borderColor: "#FBE1AC",
  paddingVertical: 18,
  paddingHorizontal: 23,
}

export const $regenCautionRow: ViewStyle = {
  flexDirection: "row",
  alignItems: "flex-start",
  gap: 10,
}

export const $regenCautionIconWrap: ViewStyle = {
  paddingVertical: 6,
}

export const $regenCautionDesc: TextStyle = {
  flex: 1,
  fontSize: 15,
  fontFamily: typography.primary.normal,
  color: "#564E4B",
  lineHeight: 24,
}

// ── Bottom Bar ────────────────────────────────────────────────────────────────

export const $bottomDivider: ViewStyle = {
  height: 1,
  backgroundColor: "#E9ECF0",
}

export const $bottomBar: ViewStyle = {
  paddingHorizontal: 20,
  paddingTop: 16,
}

export const $pdfButton: ViewStyle = {
  height: 50,
  borderRadius: 10,
  backgroundColor: colors.blue,
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
  gap: 8,
}

export const $pdfButtonText: TextStyle = {
  fontSize: 16,
  fontFamily: typography.primary.semiBold,
  color: "#FFFFFF",
}

export const $bottomNote: TextStyle = {
  fontSize: 15,
  fontFamily: typography.primary.medium,
  color: "#979797",
  textAlign: "center",
  marginBottom: 10,
}

// ── Toast ─────────────────────────────────────────────────────────────────────

export const $toast: ViewStyle = {
  position: "absolute",
  left: 20,
  right: 20,
  height: 45,
  backgroundColor: "#F2F5F6",
  borderRadius: 10,
  paddingHorizontal: 16,
  flexDirection: "row",
  alignItems: "center",
  gap: 12,
}

export const $toastIconCircle: ViewStyle = {
  width: 24,
  height: 24,
  borderRadius: 12,
  backgroundColor: "#1062D8",
  justifyContent: "center",
  alignItems: "center",
}

export const $toastText: TextStyle = {
  flex: 1,
  fontSize: 14,
  fontFamily: typography.primary.semiBold,
  color: "#333333",
}
