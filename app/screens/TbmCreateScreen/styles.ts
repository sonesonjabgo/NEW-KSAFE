import { ViewStyle, TextStyle } from "react-native"

import { colors } from "@/theme/colors"
import { typography } from "@/theme/typography"

const INPUT_BORDER = "#DDDDDD"
const DIVIDER = "#EEEEEE"

// ── Scroll ────────────────────────────────────────────────────────────────────

export const $scrollContent: ViewStyle = {
  flex: 1,
}

export const $scrollInner: ViewStyle = {
  paddingHorizontal: 20,
  paddingTop: 28,
  paddingBottom: 40,
  gap: 35,
}

// ── Reset button (header rightSlot) ──────────────────────────────────────────

export const $resetLabel: TextStyle = {
  fontSize: 14,
  fontFamily: typography.primary.normal,
  color: "#FFFFFF",
}

// ── Section ───────────────────────────────────────────────────────────────────

export const $section: ViewStyle = {
  gap: 8,
  paddingBottom: 16,
  borderBottomWidth: 1,
  borderBottomColor: "#E9ECF0",
}

export const $sectionLabel: TextStyle = {
  fontSize: 19,
  fontFamily: typography.primary.semiBold,
  color: colors.navy,
}

export const $helperText: TextStyle = {
  fontSize: 13,
  fontFamily: typography.primary.normal,
  color: "#979797",
}

// ── Card ─────────────────────────────────────────────────────────────────────

export const $card: ViewStyle = {
  backgroundColor: "#FFFFFF",
  borderRadius: 12,
  paddingVertical: 20,
  paddingHorizontal: 26,
  shadowColor: "#000000",
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.08,
  shadowRadius: 6,
  elevation: 2,
}

// ── Guide ─────────────────────────────────────────────────────────────────────

export const $guideRow: ViewStyle = {
  flexDirection: "row",
  gap: 17,
}

export const $guideIconWrap: ViewStyle = {
  width: 51,
  height: 51,
  justifyContent: "center",
  alignItems: "center",
}

export const $guideTextBlock: ViewStyle = {
  flex: 1,
  gap: 8,
}

export const $guideTitle: TextStyle = {
  fontSize: 19,
  fontFamily: typography.primary.bold,
  color: "#1062D8",
}

export const $guideDesc: TextStyle = {
  fontSize: 15,
  fontFamily: typography.primary.normal,
  color: "#564E4B",
  lineHeight: 22,
}

// ── Input row ─────────────────────────────────────────────────────────────────

export const $inputRow: ViewStyle = {
  height: 48,
  backgroundColor: "#FFFFFF",
  borderRadius: 8,
  borderWidth: 1,
  borderColor: INPUT_BORDER,
  paddingHorizontal: 16,
  flexDirection: "row",
  alignItems: "center",
}

export const $inputText: TextStyle = {
  flex: 1,
  fontSize: 14,
  fontFamily: typography.primary.normal,
  color: "#111111",
  padding: 0,
}

export const $inputPlaceholder: TextStyle = {
  color: "#BBBBBB",
}

// ── Checkbox ──────────────────────────────────────────────────────────────────

export const $checkboxRow: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
  gap: 8,
}

export const $checkbox: ViewStyle = {
  width: 20,
  height: 20,
  borderRadius: 4,
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
  width: 10,
  height: 6,
  borderLeftWidth: 2,
  borderBottomWidth: 2,
  borderColor: "#FFFFFF",
  transform: [{ rotate: "-45deg" }],
  marginTop: -2,
}

export const $checkboxLabel: TextStyle = {
  fontSize: 13,
  fontFamily: typography.primary.normal,
  color: "#666666",
}

// ── Textarea ──────────────────────────────────────────────────────────────────

export const $textarea: ViewStyle = {
  backgroundColor: "#FFFFFF",
  borderRadius: 12,
  borderWidth: 1,
  borderColor: INPUT_BORDER,
  padding: 16,
  minHeight: 120,
}

export const $textareaInput: TextStyle = {
  fontSize: 14,
  fontFamily: typography.primary.normal,
  color: "#111111",
  textAlignVertical: "top",
  padding: 0,
  minHeight: 88,
}

// ── Education ─────────────────────────────────────────────────────────────────

export const $educationCount: ViewStyle = {
  backgroundColor: "#F0F4FB",
  borderRadius: 8,
  borderWidth: 1,
  borderColor: DIVIDER,
  overflow: "hidden",
}

export const $educationCountHeader: ViewStyle = {
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  paddingHorizontal: 18,
  paddingTop: 14,
  paddingBottom: 12,
}

export const $educationStatusBadgeText: TextStyle = {
  fontSize: 12,
  fontFamily: typography.primary.semiBold,
  color: "#1062D8",
}

export const $educationMultipleBadge: ViewStyle = {
  paddingHorizontal: 8,
  paddingVertical: 3,
  borderRadius: 20,
  backgroundColor: "#FFFFFF",
}

export const $educationMultipleBadgeText: TextStyle = {
  fontSize: 12,
  fontFamily: typography.primary.normal,
  color: "#1062D8",
}

export const $educationCountBody: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
  gap: 14,
  paddingHorizontal: 18,
  paddingBottom: 20,
}

export const $educationIconCircle: ViewStyle = {
  width: 55,
  height: 55,
  borderRadius: 27.5,
  backgroundColor: "#DEE7F9",
  justifyContent: "center",
  alignItems: "center",
}

export const $educationCountTextBlock: ViewStyle = {
  flex: 1,
  gap: 10,
}

export const $educationCountText: TextStyle = {
  fontSize: 19,
  fontFamily: typography.primary.bold,
  color: "#000000",
}

export const $educationCountHelper: TextStyle = {
  fontSize: 13,
  fontFamily: typography.primary.normal,
  color: "#564E4B",
}

export const $educationSelectBtn: ViewStyle = {
  height: 48,
  borderRadius: 8,
  borderWidth: 1,
  borderStyle: "dashed",
  borderColor: "#1062D8",
  backgroundColor: "#FFFFFF",
  justifyContent: "center",
  alignItems: "center",
}

export const $educationSelectBtnText: TextStyle = {
  fontSize: 14,
  fontFamily: typography.primary.semiBold,
  color: "#1062D8",
}

// ── Submit bar ────────────────────────────────────────────────────────────────

export const $submitBar: ViewStyle = {
  paddingHorizontal: 16,
  paddingTop: 12,
}

export const $submitBtn: ViewStyle = {
  height: 52,
  borderRadius: 12,
  backgroundColor: "#1062D8",
  justifyContent: "center",
  alignItems: "center",
}

export const $submitBtnDisabled: ViewStyle = {
  backgroundColor: "#F3F2F0",
}

export const $submitBtnText: TextStyle = {
  fontSize: 16,
  fontFamily: typography.primary.bold,
  color: "#FFFFFF",
}

// ── Workplace modal ───────────────────────────────────────────────────────────

export const $modalBackdrop: ViewStyle = {
  backgroundColor: "rgba(0, 0, 0, 0.4)",
}

export const $modalSheet: ViewStyle = {
  position: "absolute",
  bottom: 0,
  left: 0,
  right: 0,
  backgroundColor: "#FFFFFF",
  borderTopLeftRadius: 20,
  borderTopRightRadius: 20,
  paddingTop: 8,
}

export const $modalItem: ViewStyle = {
  paddingVertical: 16,
  paddingHorizontal: 20,
  borderBottomWidth: 1,
  borderBottomColor: DIVIDER,
}

export const $modalItemText: TextStyle = {
  fontSize: 15,
  fontFamily: typography.primary.normal,
  color: "#111111",
}

// ── Date Picker (iOS bottom sheet) ────────────────────────────────────────────

export const $datePickerBackdrop: ViewStyle = {
  flex: 1,
  backgroundColor: "rgba(0, 0, 0, 0.3)",
}

export const $datePickerSheet: ViewStyle = {
  backgroundColor: "#FFFFFF",
  borderTopLeftRadius: 20,
  borderTopRightRadius: 20,
  paddingTop: 4,
}

export const $datePickerConfirm: ViewStyle = {
  alignItems: "flex-end",
  paddingHorizontal: 20,
  paddingVertical: 12,
  borderBottomWidth: 1,
  borderBottomColor: "#EEEEEE",
}

export const $datePickerConfirmText: TextStyle = {
  fontSize: 16,
  fontFamily: typography.primary.semiBold,
  color: colors.navy,
}
