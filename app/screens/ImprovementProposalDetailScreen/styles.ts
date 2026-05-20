import { TextStyle, ViewStyle } from "react-native"

import { colors } from "@/theme/colors"
import { typography } from "@/theme/typography"

import type { ProposalStatus } from "./types"

const CARD_BORDER = "#E9ECF0"

// ── Scroll ────────────────────────────────────────────────────────────────────

export const $scrollView: ViewStyle = {
  flex: 1,
}

export const $scrollContent: ViewStyle = {
  paddingHorizontal: 20,
  paddingTop: 20,
  paddingBottom: 24,
}

// ── Info Card ─────────────────────────────────────────────────────────────────

export const $infoCard: ViewStyle = {
  backgroundColor: "#FFFFFF",
  borderRadius: 12,
  borderWidth: 1,
  borderColor: CARD_BORDER,
  padding: 16,
  marginBottom: 28,
}

export const $infoCardTopRow: ViewStyle = {
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: 16,
}

export const $infoDate: TextStyle = {
  fontSize: 12,
  fontFamily: typography.primary.normal,
  color: "#A9A9A9",
}

export const $infoContent: TextStyle = {
  fontSize: 16,
  fontFamily: typography.primary.normal,
  color: "#1A1A1A",
  lineHeight: 24,
  marginBottom: 24,
}

export const $infoDivider: ViewStyle = {
  height: 1,
  backgroundColor: "#F0F0F0",
  marginBottom: 14,
}

export const $authorRow: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
  gap: 12,
}

export const $authorAvatar: ViewStyle = {
  width: 36,
  height: 36,
  borderRadius: 18,
  backgroundColor: "#F3F2F0",
  justifyContent: "center",
  alignItems: "center",
  flexShrink: 0,
}

export const $authorAvatarText: TextStyle = {
  fontSize: 14,
  fontFamily: typography.primary.semiBold,
  color: "#666666",
}

export const $authorInfo: ViewStyle = {
  flex: 1,
}

export const $authorName: TextStyle = {
  fontSize: 15,
  fontFamily: typography.primary.semiBold,
  color: "#1A1A1A",
}

export const $authorWorkplace: TextStyle = {
  fontSize: 14,
  fontFamily: typography.primary.normal,
  color: "#979797",
  marginTop: 2,
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

// ── Section ───────────────────────────────────────────────────────────────────

export const $section: ViewStyle = {
  marginBottom: 28,
}

export const $sectionHeaderRow: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
  gap: 10,
  marginBottom: 14,
}

export const $sectionTitle: TextStyle = {
  fontSize: 15,
  fontFamily: typography.primary.semiBold,
  color: "#1A1A1A",
}

export const $sectionLine: ViewStyle = {
  flex: 1,
  height: 1,
  backgroundColor: "#E0E0E0",
}

// ── Status Change Card ────────────────────────────────────────────────────────

export const $statusChangeCard: ViewStyle = {
  backgroundColor: "#FFFFFF",
  borderRadius: 12,
  borderWidth: 1,
  borderColor: CARD_BORDER,
  padding: 16,
  gap: 16,
}

export const $statusBtnGroup: ViewStyle = {
  flexDirection: "row",
  gap: 8,
}

export const $statusBtn: ViewStyle = {
  flex: 1,
  height: 72,
  backgroundColor: "#FBFBFB",
  borderRadius: 8,
  borderWidth: 1.5,
  borderColor: "#ECECEC",
  justifyContent: "center",
  alignItems: "center",
  gap: 6,
}

export const $statusBtnText: TextStyle = {
  fontSize: 12,
  fontFamily: typography.primary.normal,
  color: "#C6C6C6",
}

export const $statusBtnSelectedOngoing: ViewStyle = {
  backgroundColor: "#CFFFE1",
  borderColor: "#18A24A",
  borderWidth: 2,
}

export const $statusBtnTextSelectedOngoing: TextStyle = {
  color: "#18A24A",
  fontFamily: typography.primary.semiBold,
}

export const $statusBtnSelectedReflected: ViewStyle = {
  backgroundColor: "#EFF4FD",
  borderColor: "#1062D8",
  borderWidth: 2,
}

export const $statusBtnTextSelectedReflected: TextStyle = {
  color: "#1062D8",
  fontFamily: typography.primary.semiBold,
}

export const $statusBtnSelectedRejected: ViewStyle = {
  backgroundColor: "#FDF7F7",
  borderColor: "#E03526",
  borderWidth: 2,
}

export const $statusBtnTextSelectedRejected: TextStyle = {
  color: "#E03526",
  fontFamily: typography.primary.semiBold,
}

export const $statusBtnBadge: ViewStyle = {
  position: "absolute",
  top: -8,
  right: -8,
  width: 20,
  height: 20,
  borderRadius: 10,
  justifyContent: "center",
  alignItems: "center",
  borderWidth: 2,
  borderColor: "#FFFFFF",
}

export const $inputLabel: TextStyle = {
  fontSize: 14,
  fontFamily: typography.primary.semiBold,
  color: "#333333",
}

export const $pendingMessageBox: ViewStyle = {
  borderWidth: 1,
  borderStyle: "dashed",
  borderColor: "#CCCCCC",
  borderRadius: 8,
  backgroundColor: "#FAFAFA",
  padding: 20,
  minHeight: 90,
  justifyContent: "center",
  alignItems: "center",
}

export const $pendingMessageText: TextStyle = {
  fontSize: 14,
  fontFamily: typography.primary.normal,
  color: "#AAAAAA",
  textAlign: "center",
  lineHeight: 22,
}

// ── Status History (Timeline) ─────────────────────────────────────────────────

export const $timelineItem: ViewStyle = {
  flexDirection: "row",
  gap: 12,
  paddingBottom: 16,
}

export const $timelineDotColumn: ViewStyle = {
  alignItems: "center",
  flexShrink: 0,
}

export const $timelineConnector: ViewStyle = {
  width: 2,
  flex: 1,
  backgroundColor: "#D5D5D5",
  marginTop: 4,
  minHeight: 12,
}

export const $timelineDot: ViewStyle = {
  width: 20,
  height: 20,
  borderRadius: 10,
  backgroundColor: "#EBE8E6",
  justifyContent: "center",
  alignItems: "center",
  marginTop: 1,
  flexShrink: 0,
}

export const $timelineDotInner: ViewStyle = {
  width: 10,
  height: 10,
  borderRadius: 5,
  backgroundColor: "#BAB9BE",
  borderWidth: 1,
  borderColor: "#E3E2E0",
}

export const $timelineContent: ViewStyle = {
  flex: 1,
}

export const $timelineRow: ViewStyle = {
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: 4,
}

export const $timelineTitle: TextStyle = {
  fontSize: 15,
  fontFamily: typography.primary.semiBold,
  color: "#1A1A1A",
}

export const $timelineDate: TextStyle = {
  fontSize: 12,
  fontFamily: typography.primary.normal,
  color: "#A9A9A9",
}

export const $timelineDesc: TextStyle = {
  fontSize: 13,
  fontFamily: typography.primary.normal,
  color: "#979797",
}

export const $timelineDotActive: ViewStyle = {
  backgroundColor: "#D4F5E2",
}

export const $timelineDotInnerActive: ViewStyle = {
  backgroundColor: "#18A24A",
  borderColor: "#18A24A",
}

export const $historyNoteBubble: ViewStyle = {
  backgroundColor: "#CFFFE1",
  borderRadius: 6,
  paddingHorizontal: 14,
  paddingVertical: 10,
  marginTop: 6,
  alignSelf: "flex-start",
}

export const $historyNoteBubbleText: TextStyle = {
  fontSize: 13,
  fontFamily: typography.primary.normal,
  color: "#18A24A",
  lineHeight: 18,
}

// ── Bottom Bar ────────────────────────────────────────────────────────────────

export const $bottomBar: ViewStyle = {
  flexDirection: "row",
  gap: 12,
  paddingHorizontal: 16,
  paddingTop: 12,
  backgroundColor: "#FFFFFF",
  borderTopWidth: 1,
  borderTopColor: "#F0F0F0",
}

export const $editBtn: ViewStyle = {
  flex: 1,
  height: 52,
  borderRadius: 12,
  borderWidth: 1,
  borderColor: "#DDDDDD",
  backgroundColor: "#FFFFFF",
  justifyContent: "center",
  alignItems: "center",
}

export const $editBtnText: TextStyle = {
  fontSize: 16,
  fontFamily: typography.primary.semiBold,
  color: "#333333",
}

export const $deleteBtn: ViewStyle = {
  flex: 1,
  height: 52,
  borderRadius: 12,
  backgroundColor: colors.blue,
  justifyContent: "center",
  alignItems: "center",
}

export const $deleteBtnText: TextStyle = {
  fontSize: 16,
  fontFamily: typography.primary.bold,
  color: "#FFFFFF",
}

export const $proceedBtn: ViewStyle = {
  flex: 1,
  height: 52,
  borderRadius: 12,
  backgroundColor: colors.blue,
  justifyContent: "center",
  alignItems: "center",
}

export const $proceedBtnText: TextStyle = {
  fontSize: 16,
  fontFamily: typography.primary.bold,
  color: "#FFFFFF",
}

// ── Edit Form (수정 모드) ──────────────────────────────────────────────────────

export const $editSection: ViewStyle = {
  marginBottom: 28,
}

export const $editLabelRow: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
  marginBottom: 10,
}

export const $editLabel: TextStyle = {
  fontSize: 19,
  fontFamily: typography.primary.semiBold,
  color: colors.navy,
}

export const $editRequired: TextStyle = {
  fontSize: 17,
  fontFamily: typography.primary.bold,
  color: "#E03C3C",
  marginLeft: 2,
}

export const $editTextarea: ViewStyle = {
  backgroundColor: "#FFFFFF",
  borderRadius: 12,
  borderWidth: 1,
  borderColor: "#DDDDDD",
  padding: 16,
  minHeight: 180,
}

export const $editTextareaFocused: ViewStyle = {
  borderColor: "#1062D8",
  borderWidth: 2,
  backgroundColor: "#ECF4FE",
}

export const $editTextareaError: ViewStyle = {
  borderColor: "#E03C3C",
  borderWidth: 1.5,
}

export const $editTextareaInput: TextStyle = {
  fontSize: 14,
  fontFamily: typography.primary.normal,
  color: "#111111",
  textAlignVertical: "top",
  padding: 0,
  minHeight: 140,
  lineHeight: 22,
  outlineWidth: 0,
}

export const $editHelperText: TextStyle = {
  fontSize: 13,
  fontFamily: typography.primary.normal,
  color: "#979797",
  marginTop: 6,
}

export const $editErrorRow: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
  gap: 4,
  marginTop: 4,
}

export const $editErrorText: TextStyle = {
  flex: 1,
  fontSize: 12,
  fontFamily: typography.primary.normal,
  color: "#E03C3C",
}

export const $saveBtnDisabled: ViewStyle = {
  backgroundColor: "#F3F2F0",
}

// ── Result Card (처리 결과) ────────────────────────────────────────────────────

export const $resultCard: ViewStyle = {
  backgroundColor: "#FFFFFF",
  borderRadius: 12,
  borderWidth: 1,
  borderColor: CARD_BORDER,
  padding: 16,
  gap: 12,
}

export const $resultHeaderRow: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
  gap: 10,
}

export const $resultIconCircle: ViewStyle = {
  width: 36,
  height: 36,
  borderRadius: 18,
  backgroundColor: "#CFFFE1",
  justifyContent: "center",
  alignItems: "center",
}

export const $resultIconCircleRejected: ViewStyle = {
  width: 36,
  height: 36,
  borderRadius: 18,
  backgroundColor: "#FDE8EB",
  justifyContent: "center",
  alignItems: "center",
}

export const $resultTitle: TextStyle = {
  fontSize: 16,
  fontFamily: typography.primary.bold,
  color: "#1A1A1A",
}

export const $resultContent: TextStyle = {
  fontSize: 14,
  fontFamily: typography.primary.normal,
  color: "#555555",
  lineHeight: 22,
}

export const $resultDivider: ViewStyle = {
  height: 1,
  backgroundColor: "#F0F0F0",
}

export const $resultFooterRow: ViewStyle = {
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
}

export const $resultDateRow: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
  gap: 5,
}

export const $resultDateText: TextStyle = {
  fontSize: 13,
  fontFamily: typography.primary.normal,
  color: "#888888",
}

export const $resultManagerRow: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
  gap: 6,
}

export const $resultManagerAvatar: ViewStyle = {
  width: 22,
  height: 22,
  borderRadius: 11,
  backgroundColor: "#F3F2F0",
  justifyContent: "center",
  alignItems: "center",
}

export const $resultManagerAvatarText: TextStyle = {
  fontSize: 10,
  fontFamily: typography.primary.semiBold,
  color: "#666666",
}

export const $resultManagerName: TextStyle = {
  fontSize: 13,
  fontFamily: typography.primary.normal,
  color: "#1A1A1A",
}

// ── Processing Input Area ─────────────────────────────────────────────────────

export const $inputLabelRow: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
}

export const $inputLabelRequired: TextStyle = {
  fontSize: 14,
  fontFamily: typography.primary.bold,
  color: "#E03C3C",
}

export const $processingReadBox: ViewStyle = {
  borderRadius: 8,
  borderWidth: 1,
  borderColor: "#ECECEC",
  backgroundColor: "#F4F8FD",
  padding: 14,
  minHeight: 90,
  justifyContent: "space-between",
}

export const $processingReadText: TextStyle = {
  fontSize: 14,
  fontFamily: typography.primary.normal,
  color: "#555555",
  lineHeight: 22,
}

export const $processingTextarea: ViewStyle = {
  backgroundColor: "#FBFBFB",
  borderRadius: 8,
  borderWidth: 1,
  borderColor: "#DDDDDD",
  padding: 14,
  minHeight: 120,
}

export const $processingTextareaFocused: ViewStyle = {
  borderColor: "#1062D8",
  borderWidth: 2,
  backgroundColor: "#FBFBFB",
}

export const $processingTextareaFocusedRejected: ViewStyle = {
  borderColor: "#E03526",
  borderWidth: 2,
  backgroundColor: "#FBFBFB",
}

export const $inputLabelRequiredBlue: TextStyle = {
  fontSize: 14,
  fontFamily: typography.primary.bold,
  color: "#1062D8",
}

export const $processingTextareaInput: TextStyle = {
  fontSize: 14,
  fontFamily: typography.primary.normal,
  color: "#111111",
  textAlignVertical: "top",
  padding: 0,
  minHeight: 80,
  lineHeight: 22,
  outlineWidth: 0,
}

export const $processingHelperText: TextStyle = {
  fontSize: 13,
  fontFamily: typography.primary.normal,
  color: "#979797",
  marginTop: 6,
}

// ── Reflected Timeline ────────────────────────────────────────────────────────

export const $timelineDotActiveReflected: ViewStyle = {
  backgroundColor: "#EFF4FD",
}

export const $timelineDotInnerActiveReflected: ViewStyle = {
  backgroundColor: "#1062D8",
  borderColor: "#D2E4FF",
}

export const $historyNoteBubbleReflected: ViewStyle = {
  backgroundColor: "#EFF4FD",
  borderRadius: 6,
  paddingHorizontal: 14,
  paddingVertical: 10,
  marginTop: 6,
  alignSelf: "flex-start",
}

export const $historyNoteBubbleReflectedText: TextStyle = {
  fontSize: 13,
  fontFamily: typography.primary.normal,
  color: "#1062D8",
  lineHeight: 18,
}

export const $timelineDotActiveRejected: ViewStyle = {
  backgroundColor: "#FDE8EB",
}

export const $timelineDotInnerActiveRejected: ViewStyle = {
  backgroundColor: "#FF0000",
  borderColor: "#FFD1CD",
}

export const $historyNoteBubbleRejected: ViewStyle = {
  backgroundColor: "#FDE8EB",
  borderRadius: 6,
  paddingHorizontal: 14,
  paddingVertical: 10,
  marginTop: 6,
  alignSelf: "flex-start",
}

export const $historyNoteBubbleRejectedText: TextStyle = {
  fontSize: 13,
  fontFamily: typography.primary.normal,
  color: "#E03526",
  lineHeight: 18,
}

export const $processingReadBoxRejected: ViewStyle = {
  borderRadius: 8,
  borderWidth: 1,
  borderColor: "#ECECEC",
  backgroundColor: "#FDF7F7",
  padding: 14,
  minHeight: 90,
  justifyContent: "space-between",
}

// ── Disabled Proceed Button ───────────────────────────────────────────────────

export const $workerInfoText: TextStyle = {
  flex: 1,
  fontSize: 13,
  fontFamily: typography.primary.normal,
  color: "#888888",
  textAlign: "center",
  lineHeight: 20,
}

export const $proceedBtnDisabled: ViewStyle = {
  flex: 1,
  height: 52,
  borderRadius: 12,
  backgroundColor: "#F3F2F0",
  justifyContent: "center",
  alignItems: "center",
}

export const $proceedBtnTextDisabled: TextStyle = {
  fontSize: 16,
  fontFamily: typography.primary.bold,
  color: "#FFFFFF",
}

// ── Delete Modal ──────────────────────────────────────────────────────────────

export const $modalDeleteIconCircle: ViewStyle = {
  width: 52,
  height: 52,
  borderRadius: 26,
  backgroundColor: "#FEEEED",
  justifyContent: "center",
  alignItems: "center",
}
