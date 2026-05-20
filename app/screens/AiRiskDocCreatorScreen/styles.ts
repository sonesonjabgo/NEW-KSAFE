import { TextStyle, ViewStyle } from "react-native"

import { colors } from "@/theme/colors"
import { typography } from "@/theme/typography"

// ── Scroll ────────────────────────────────────────────────────────────────────

export const $scroll: ViewStyle = {
  flex: 1,
}

export const $scrollContent: ViewStyle = {
  flexGrow: 1,
  paddingHorizontal: 30,
  paddingTop: 24,
  paddingBottom: 40,
}

// ── Page Count ────────────────────────────────────────────────────────────────

export const $pageCount: TextStyle = {
  fontSize: 16,
  fontFamily: typography.primary.semiBold,
  color: colors.navy,
  textAlign: "center",
  marginBottom: 20,
}

// ── Action Buttons ────────────────────────────────────────────────────────────

export const $actionBtn: ViewStyle = {
  height: 52,
  borderRadius: 12,
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
  gap: 8,
  marginBottom: 12,
}

export const $actionBtnActive: ViewStyle = {
  backgroundColor: colors.blue,
}

export const $actionBtnDisabled: ViewStyle = {
  backgroundColor: "#AAAAAA",
}

export const $actionBtnLabel: TextStyle = {
  fontSize: 16,
  fontFamily: typography.primary.bold,
  color: "#FFFFFF",
}

// ── Hazard Toggle Card ────────────────────────────────────────────────────────

export const $toggleCard: ViewStyle = {
  flexDirection: "row",
  alignItems: "flex-start",
  gap: 12,
  backgroundColor: "#FFFFFF",
  borderRadius: 12,
  borderWidth: 1,
  borderColor: "#E5E7EB",
  paddingVertical: 14,
  paddingHorizontal: 16,
  marginTop: 4,
  marginBottom: 28,
}

export const $checkbox: ViewStyle = {
  width: 22,
  height: 22,
  borderRadius: 4,
  borderWidth: 2,
  borderColor: colors.blue,
  alignItems: "center",
  justifyContent: "center",
  marginTop: 1,
  flexShrink: 0,
}

export const $checkboxChecked: ViewStyle = {
  backgroundColor: colors.blue,
}

export const $toggleTextBlock: ViewStyle = {
  flex: 1,
}

export const $toggleLabel: TextStyle = {
  fontSize: 15,
  fontFamily: typography.primary.semiBold,
  color: colors.navy,
}

export const $toggleDesc: TextStyle = {
  fontSize: 13,
  fontFamily: typography.primary.normal,
  color: "#888888",
  marginTop: 4,
  lineHeight: 19,
}

// ── Reset Button ─────────────────────────────────────────────────────────────

export const $resetBtn: ViewStyle = {
  height: 51,
  borderRadius: 10,
  borderWidth: 1.5,
  borderColor: "#E03526",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
  gap: 8,
  marginBottom: 12,
}

export const $resetBtnLabel: TextStyle = {
  fontSize: 15,
  fontFamily: typography.primary.semiBold,
  color: "#E03526",
}

// ── Page Card ─────────────────────────────────────────────────────────────────

export const $pageCard: ViewStyle = {
  borderRadius: 13,
  borderWidth: 1,
  borderColor: "#ECECEC",
  paddingHorizontal: 20,
  paddingVertical: 25,
  marginBottom: 16,
  backgroundColor: "#FFFFFF",
}

export const $pageCardHeader: ViewStyle = {
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: 14,
}

export const $pageCardTitle: TextStyle = {
  fontSize: 15,
  fontFamily: typography.primary.semiBold,
  color: colors.navy,
}

export const $imageRow: ViewStyle = {
  flexDirection: "row",
  gap: 12,
  marginBottom: 14,
}

export const $imageCol: ViewStyle = {
  flex: 1,
}

export const $imageLabel: TextStyle = {
  fontSize: 13,
  fontFamily: typography.primary.normal,
  color: "#888888",
  marginBottom: 6,
}

export const $beforeImageBox: ViewStyle = {
  width: "100%",
  height: 106,
  borderRadius: 12,
  backgroundColor: "#5B8C5A",
  alignItems: "center",
  justifyContent: "center",
  overflow: "hidden",
}

export const $afterImagePlaceholder: ViewStyle = {
  width: "100%",
  height: 106,
  borderRadius: 12,
  borderWidth: 1.5,
  borderColor: "#ECECEC",
  borderStyle: "dashed",
  alignItems: "center",
  justifyContent: "center",
  gap: 4,
}

export const $afterImagePlaceholderText: TextStyle = {
  fontSize: 12,
  fontFamily: typography.primary.normal,
  color: "#AAAAAA",
}

export const $analyzeBtn: ViewStyle = {
  height: 51,
  borderRadius: 10,
  backgroundColor: colors.blue,
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
  gap: 8,
  marginBottom: 16,
}

export const $analyzeBtnLabel: TextStyle = {
  fontSize: 15,
  fontFamily: typography.primary.semiBold,
  color: "#FFFFFF",
}

export const $hazardTitle: TextStyle = {
  fontSize: 14,
  fontFamily: typography.primary.semiBold,
  color: colors.navy,
  marginBottom: 4,
}

export const $hazardEmpty: TextStyle = {
  fontSize: 13,
  fontFamily: typography.primary.normal,
  color: "#AAAAAA",
  marginBottom: 10,
}

export const $analysisBox: ViewStyle = {
  height: 114,
  borderWidth: 1,
  borderColor: "#ECECEC",
  borderRadius: 9,
  padding: 16,
  justifyContent: "space-between",
}

export const $analysisPlaceholder: TextStyle = {
  fontSize: 13,
  fontFamily: typography.primary.normal,
  color: "#BBBBBB",
}

export const $analysisCopyRow: ViewStyle = {
  alignItems: "flex-end",
}

// ── Capture Sheet (바텀시트) ───────────────────────────────────────────────────

export const $sheetBackdrop: ViewStyle = {
  backgroundColor: "rgba(0, 0, 0, 0.4)",
}

export const $sheet: ViewStyle = {
  position: "absolute",
  bottom: 0,
  left: 0,
  right: 0,
  backgroundColor: "#FFFFFF",
  borderTopLeftRadius: 20,
  borderTopRightRadius: 20,
}

export const $sheetDragHandleArea: ViewStyle = {
  alignItems: "center",
  paddingTop: 12,
  paddingBottom: 8,
}

export const $sheetDragHandleBar: ViewStyle = {
  width: 46,
  height: 4,
  borderRadius: 2,
  backgroundColor: "#B0B0B0",
}

export const $sheetBtnRow: ViewStyle = {
  flexDirection: "row",
  gap: 12,
  paddingHorizontal: 20,
  paddingTop: 12,
}

export const $sheetBtn: ViewStyle = {
  flex: 1,
  height: 54,
  borderRadius: 14,
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
  gap: 8,
  backgroundColor: "#F4F6FA",
  borderWidth: 1,
  borderColor: "#E5E7EB",
}

export const $sheetBtnLabel: TextStyle = {
  fontSize: 15,
  fontFamily: typography.primary.semiBold,
  color: colors.navy,
}

// ── Empty State ───────────────────────────────────────────────────────────────

export const $emptyContainer: ViewStyle = {
  flex: 1,
  alignItems: "center",
  justifyContent: "center",
  paddingTop: 20,
}

export const $emptyImageWrapper: ViewStyle = {
  marginBottom: 20,
}

export const $emptyTitle: TextStyle = {
  fontSize: 17,
  fontFamily: typography.primary.bold,
  color: colors.navy,
  textAlign: "center",
  marginBottom: 8,
}

export const $emptyDesc: TextStyle = {
  fontSize: 14,
  fontFamily: typography.primary.normal,
  color: "#888888",
  textAlign: "center",
  lineHeight: 21,
}
