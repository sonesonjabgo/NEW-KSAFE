import { ImageStyle, TextStyle, ViewStyle } from "react-native"

import { typography } from "@/theme/typography"

// ── Layout ────────────────────────────────────────────────────────────────────

export const $flex1: ViewStyle = { flex: 1 }

export const $scrollContent: ViewStyle = {
  paddingHorizontal: 22,
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
}

export const $cardTopRow: ViewStyle = {
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
}

export const $cardDate: TextStyle = {
  fontSize: 14,
  fontFamily: typography.primary.normal,
  color: "#555555",
}

// ── Status Badge ──────────────────────────────────────────────────────────────

export const $badge: ViewStyle = {
  paddingVertical: 2,
  paddingHorizontal: 8,
  borderRadius: 4,
  justifyContent: "center",
  alignItems: "center",
}

export const $badgeText: TextStyle = {
  fontSize: 14,
  lineHeight: 20,
  fontFamily: typography.primary.semiBold,
  includeFontPadding: false,
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
  color: "#555555",
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
  color: "#555555",
}

// ── Manager Profile ───────────────────────────────────────────────────────────

export const $managerRow: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
  gap: 12,
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
  fontSize: 14,
  fontFamily: typography.primary.normal,
  color: "#555555",
}

// ── Admin Section ─────────────────────────────────────────────────────────────

export const $adminSection: ViewStyle = {
  gap: 14,
}

// ── Result Card ───────────────────────────────────────────────────────────────

export const $resultCard: ViewStyle = {
  backgroundColor: "#FFFFFF",
  borderRadius: 12,
  borderWidth: 1,
  borderColor: "#E9ECF0",
  padding: 16,
  gap: 12,
}

export const $resultHeaderRow: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
  gap: 10,
}

export const $resultIconCircleCompleted: ViewStyle = {
  width: 36,
  height: 36,
  borderRadius: 18,
  backgroundColor: "#CFFFE1",
  justifyContent: "center",
  alignItems: "center",
}

export const $resultIconCircleImpossible: ViewStyle = {
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
  fontSize: 14,
  fontFamily: typography.primary.normal,
  color: "#555555",
}

export const $resultManagerRow: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
  gap: 6,
}

export const $resultManagerName: TextStyle = {
  fontSize: 14,
  fontFamily: typography.primary.normal,
  color: "#1A1A1A",
}

export const $sectionTitleRow: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
  gap: 10,
}

export const $sectionTitle: TextStyle = {
  fontSize: 16,
  fontFamily: typography.primary.semiBold,
  color: "#1A1A1A",
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
  padding: 16,
  gap: 16,
}

export const $statusButtonRow: ViewStyle = {
  flexDirection: "row",
  gap: 8,
}

export const $statusButton: ViewStyle = {
  flex: 1,
  height: 72,
  borderRadius: 8,
  borderWidth: 1.5,
  borderColor: "#ECECEC",
  backgroundColor: "#FBFBFB",
  alignItems: "center",
  justifyContent: "center",
  gap: 6,
}

export const $statusButtonText: TextStyle = {
  fontSize: 14,
  fontFamily: typography.primary.normal,
  color: "#555555",
}

export const $selectedBadge: ViewStyle = {
  position: "absolute",
  top: -8,
  right: -8,
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

export const $dashedInputCardEnabled: ViewStyle = {
  borderStyle: "solid",
  borderColor: "#DDDDDD",
}

export const $dashedInputCardFocusedCompleted: ViewStyle = {
  borderColor: "#1062D8",
  borderWidth: 2,
  borderStyle: "solid",
}

export const $dashedInputCardFocusedImpossible: ViewStyle = {
  borderColor: "#E03526",
  borderWidth: 2,
  borderStyle: "solid",
}

export const $dashedInput: TextStyle = {
  flex: 1,
  fontSize: 14,
  fontFamily: typography.primary.normal,
  color: "#222222",
  textAlignVertical: "top",
}

export const $noteHint: TextStyle = {
  fontSize: 14,
  fontFamily: typography.primary.medium,
  color: "#555555",
}

export const $noteDivider: ViewStyle = {
  height: 1,
  backgroundColor: "#E9ECF0",
  marginTop: 15,
}

export const $photoLabelContainer: ViewStyle = {
  marginTop: 17,
  flexDirection: "row",
  alignItems: "center",
}

export const $photoLabel: TextStyle = {
  fontSize: 15,
  fontFamily: typography.primary.semiBold,
  color: "#0B3069",
}

export const $asterisk: TextStyle = {
  color: "#FF0000",
}

export const $photoHintContainer: ViewStyle = {
  marginTop: 6,
  gap: 5,
}

export const $photoHintRow: ViewStyle = {
  flexDirection: "row",
  alignItems: "flex-start",
  gap: 6,
}

export const $photoHintText: TextStyle = {
  fontSize: 14,
  fontFamily: typography.primary.medium,
  color: "#555555",
  lineHeight: 20,
  flex: 1,
}

export const $photoGuideCard: ViewStyle = {
  height: 83,
  backgroundColor: "#F4F8FD",
  borderRadius: 9,
  borderWidth: 1,
  borderStyle: "dashed",
  borderColor: "#B5CEF3",
  paddingHorizontal: 12,
  paddingVertical: 15,
  flexDirection: "row",
  alignItems: "center",
  gap: 10,
  marginTop: 15,
}

export const $photoGuideLine: TextStyle = {
  fontSize: 14,
  fontFamily: typography.primary.normal,
  color: "#564E4B",
  lineHeight: 16,
}

export const $photoGuideAddBtn: ViewStyle = {
  width: 60,
  height: 27,
  borderRadius: 4,
  borderWidth: 1,
  borderColor: "#B5CCEC",
  backgroundColor: "#FFFFFF",
  justifyContent: "center",
  alignItems: "center",
  flexShrink: 0,
}

export const $photoGuideAddBtnText: TextStyle = {
  fontSize: 14,
  fontFamily: typography.primary.semiBold,
  color: "#1062D8",
}

export const $photoPreviewCard: ViewStyle = {
  backgroundColor: "#E9F7F0",
  borderRadius: 9,
  paddingHorizontal: 12,
  paddingVertical: 15,
  flexDirection: "row",
  alignItems: "center",
  gap: 10,
  marginTop: 10,
}

export const $photoPreviewText: TextStyle = {
  flex: 1,
  fontSize: 14,
  fontFamily: typography.primary.normal,
  color: "#3E7853",
}

// ── Bottom Bar ────────────────────────────────────────────────────────────────

export const $bottomBar: ViewStyle = {
  paddingHorizontal: 16,
  paddingTop: 12,
  backgroundColor: "#FFFFFF",
  borderTopWidth: 1,
  borderTopColor: "#F0F0F0",
}

export const $workerInfoText: TextStyle = {
  fontSize: 14,
  fontFamily: typography.primary.normal,
  color: "#555555",
  textAlign: "center",
  lineHeight: 20,
}

// ── Status History ────────────────────────────────────────────────────────────

export const $historyList: ViewStyle = {
}

export const $historyItem: ViewStyle = {
  flexDirection: "row",
  gap: 12,
  paddingBottom: 16,
}

export const $historyLeft: ViewStyle = {
  alignItems: "center",
  flexShrink: 0,
}

export const $historyLine: ViewStyle = {
  width: 2,
  backgroundColor: "#D5D5D5",
  flex: 1,
  marginTop: 4,
  minHeight: 12,
}

export const $historyIconOuter: ViewStyle = {
  width: 20,
  height: 20,
  borderRadius: 10,
  backgroundColor: "#EBE8E6",
  justifyContent: "center",
  alignItems: "center",
  marginTop: 4,
  zIndex: 1,
}

export const $historyIconInner: ViewStyle = {
  width: 10,
  height: 10,
  borderRadius: 5,
  backgroundColor: "#BAB9BE",
  borderWidth: 1,
  borderColor: "#E3E2E0",
}

export const $historyRight: ViewStyle = {
  flex: 1,
}

export const $historyHeaderRow: ViewStyle = {
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: 4,
}

export const $historyTitle: TextStyle = {
  fontSize: 19,
  lineHeight: 26,
  fontFamily: typography.primary.bold,
  color: "#252525",
}

export const $historyDate: TextStyle = {
  fontSize: 14,
  fontFamily: typography.primary.normal,
  color: "#555555",
}

export const $historyContent: TextStyle = {
  fontSize: 15,
  fontFamily: typography.primary.normal,
  color: "#555555",
  lineHeight: 22,
}

export const $historyCard: ViewStyle = {
  borderRadius: 6,
  paddingHorizontal: 14,
  paddingVertical: 10,
  marginTop: 6,
}

export const $historyNoteBubbleCompleted: ViewStyle = {
  backgroundColor: "#EFF4FD",
  borderRadius: 6,
  paddingHorizontal: 14,
  paddingVertical: 10,
  marginTop: 6,
  alignSelf: "flex-start",
}

export const $historyNoteBubbleCompletedText: TextStyle = {
  fontSize: 14,
  fontFamily: typography.primary.normal,
  color: "#1062D8",
  lineHeight: 18,
}

export const $historyNoteBubbleImpossible: ViewStyle = {
  backgroundColor: "#FDE8EB",
  borderRadius: 6,
  paddingHorizontal: 14,
  paddingVertical: 10,
  marginTop: 6,
  alignSelf: "flex-start",
}

export const $historyNoteBubbleImpossibleText: TextStyle = {
  fontSize: 14,
  fontFamily: typography.primary.normal,
  color: "#E03526",
  lineHeight: 18,
}

// ── Modal ─────────────────────────────────────────────────────────────────────

export const $modalOverlay: ViewStyle = {
  flex: 1,
  backgroundColor: "rgba(0, 0, 0, 0.3)",
  justifyContent: "flex-end",
}

export const $modalContent: ViewStyle = {
  backgroundColor: "#FFFFFF",
  borderTopLeftRadius: 20,
  borderTopRightRadius: 20,
  paddingTop: 36,
}

export const $workplaceOption: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
  gap: 12,
  height: 66,
  paddingHorizontal: 20,
}

export const $workplaceOptionText: TextStyle = {
  flex: 1,
  fontSize: 17,
  fontFamily: typography.primary.medium,
  color: "#000000",
}
