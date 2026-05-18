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
  paddingHorizontal: 16,
  paddingTop: 20,
  paddingBottom: 32,
  gap: 24,
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
}

export const $sectionLabel: TextStyle = {
  fontSize: 15,
  fontFamily: typography.primary.semiBold,
  color: "#111111",
}

export const $helperText: TextStyle = {
  fontSize: 12,
  fontFamily: typography.primary.normal,
  color: "#999999",
}

// ── Card ─────────────────────────────────────────────────────────────────────

export const $card: ViewStyle = {
  backgroundColor: "#FFFFFF",
  borderRadius: 12,
  padding: 16,
  shadowColor: "#000000",
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.08,
  shadowRadius: 6,
  elevation: 2,
}

// ── Guide ─────────────────────────────────────────────────────────────────────

export const $guideRow: ViewStyle = {
  flexDirection: "row",
  gap: 12,
}

export const $guideTextBlock: ViewStyle = {
  flex: 1,
  gap: 4,
}

export const $guideTitle: TextStyle = {
  fontSize: 14,
  fontFamily: typography.primary.bold,
  color: "#333333",
}

export const $guideDesc: TextStyle = {
  fontSize: 13,
  fontFamily: typography.primary.normal,
  color: "#888888",
  lineHeight: 19,
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
  borderRadius: 10,
  borderWidth: 2,
  borderColor: "#CCCCCC",
  justifyContent: "center",
  alignItems: "center",
}

export const $checkboxActive: ViewStyle = {
  borderColor: colors.navy,
  backgroundColor: colors.navy,
}

export const $checkboxDot: ViewStyle = {
  width: 8,
  height: 8,
  borderRadius: 4,
  backgroundColor: "#FFFFFF",
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

export const $educationBadgeRow: ViewStyle = {
  flexDirection: "row",
  gap: 6,
}

export const $badgeStatus: ViewStyle = {
  paddingHorizontal: 10,
  paddingVertical: 4,
  borderRadius: 20,
  backgroundColor: "#E8EEF8",
}

export const $badgeStatusText: TextStyle = {
  fontSize: 12,
  fontFamily: typography.primary.semiBold,
  color: colors.navy,
}

export const $badgeMultiple: ViewStyle = {
  paddingHorizontal: 10,
  paddingVertical: 4,
  borderRadius: 20,
  backgroundColor: "#F0F0F0",
}

export const $badgeMultipleText: TextStyle = {
  fontSize: 12,
  fontFamily: typography.primary.normal,
  color: "#888888",
}

export const $educationCount: ViewStyle = {
  backgroundColor: "#FFFFFF",
  borderRadius: 8,
  borderWidth: 1,
  borderColor: DIVIDER,
  paddingVertical: 20,
  paddingHorizontal: 16,
  alignItems: "center",
  gap: 6,
}

export const $educationCountText: TextStyle = {
  fontSize: 14,
  fontFamily: typography.primary.semiBold,
  color: "#333333",
}

export const $educationCountHelper: TextStyle = {
  fontSize: 12,
  fontFamily: typography.primary.normal,
  color: "#999999",
  textAlign: "center",
}

export const $educationSelectBtn: ViewStyle = {
  height: 48,
  borderRadius: 8,
  borderWidth: 1,
  borderStyle: "dashed",
  borderColor: "#CCCCCC",
  backgroundColor: "#FFFFFF",
  justifyContent: "center",
  alignItems: "center",
}

export const $educationSelectBtnText: TextStyle = {
  fontSize: 14,
  fontFamily: typography.primary.semiBold,
  color: colors.navy,
}

// ── Submit bar ────────────────────────────────────────────────────────────────

export const $submitBar: ViewStyle = {
  paddingHorizontal: 16,
  paddingTop: 12,
  backgroundColor: "#F2F3F5",
}

export const $submitBtn: ViewStyle = {
  height: 52,
  borderRadius: 12,
  backgroundColor: colors.navy,
  justifyContent: "center",
  alignItems: "center",
}

export const $submitBtnDisabled: ViewStyle = {
  backgroundColor: "#CCCCCC",
}

export const $submitBtnText: TextStyle = {
  fontSize: 16,
  fontFamily: typography.primary.bold,
  color: "#FFFFFF",
}

// ── Workplace modal ───────────────────────────────────────────────────────────

export const $modalBackdrop: ViewStyle = {
  flex: 1,
  backgroundColor: "rgba(0, 0, 0, 0.4)",
  justifyContent: "flex-end",
}

export const $modalSheet: ViewStyle = {
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
