import { TextStyle, ViewStyle } from "react-native"

import { colors } from "@/theme/colors"
import { typography } from "@/theme/typography"

const INPUT_BORDER = "#DDDDDD"
const DIVIDER = "#E9ECF0"

export const $flex1: ViewStyle = { flex: 1 }

// ── Scroll ────────────────────────────────────────────────────────────────────

export const $scrollContent: ViewStyle = {
  flex: 1,
}

export const $scrollInner: ViewStyle = {
  paddingHorizontal: 22,
  paddingTop: 28,
  paddingBottom: 40,
  gap: 28,
}

// ── Guide Card ────────────────────────────────────────────────────────────────

export const $guideCard: ViewStyle = {
  backgroundColor: "#FFFFFF",
  borderRadius: 12,
  paddingVertical: 20,
  paddingHorizontal: 26,
  flexDirection: "row",
  gap: 17,
  shadowColor: "#000000",
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.08,
  shadowRadius: 6,
  elevation: 2,
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

// ── Section ───────────────────────────────────────────────────────────────────

export const $section: ViewStyle = {
  gap: 10,
  paddingBottom: 20,
  borderBottomWidth: 1,
  borderBottomColor: DIVIDER,
}

export const $sectionLast: ViewStyle = {
  gap: 10,
}

export const $sectionLabelRow: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
}

export const $sectionLabel: TextStyle = {
  fontSize: 19,
  lineHeight: 26,
  fontFamily: typography.primary.semiBold,
  color: colors.navy,
}

export const $required: TextStyle = {
  fontSize: 17,
  fontFamily: typography.primary.bold,
  color: "#E03C3C",
  marginLeft: 2,
}

export const $helperText: TextStyle = {
  fontSize: 13,
  fontFamily: typography.primary.normal,
  color: "#555555",
}

// ── Input Row (workplace selector) ────────────────────────────────────────────

export const $inputRow: ViewStyle = {
  height: 52,
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
  fontSize: 15,
  fontFamily: typography.primary.normal,
  color: "#111111",
  padding: 0,
}

export const $inputPlaceholder: TextStyle = {
  color: "#555555",
}

// ── Textarea ──────────────────────────────────────────────────────────────────

export const $textarea: ViewStyle = {
  backgroundColor: "#FFFFFF",
  borderRadius: 12,
  borderWidth: 1,
  borderColor: INPUT_BORDER,
  padding: 16,
  minHeight: 180,
}

export const $textareaFocused: ViewStyle = {
  borderColor: "#1062D8",
  borderWidth: 2,
  backgroundColor: "#ECF4FE",
}

export const $textareaError: ViewStyle = {
  borderColor: "#E03C3C",
  borderWidth: 1.5,
}

export const $errorRow: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
  gap: 4,
  marginTop: 2,
}

export const $errorText: TextStyle = {
  flex: 1,
  fontSize: 12,
  fontFamily: typography.primary.normal,
  color: "#E03C3C",
}

export const $textareaInput: TextStyle = {
  fontSize: 14,
  fontFamily: typography.primary.normal,
  color: "#111111",
  textAlignVertical: "top",
  padding: 0,
  minHeight: 140,
  lineHeight: 22,
  outlineWidth: 0,
}

// ── Submit bar ────────────────────────────────────────────────────────────────

export const $submitBar: ViewStyle = {
  paddingHorizontal: 16,
  paddingTop: 12,
  backgroundColor: "#FFFFFF",
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

export const $submitBtnTextDisabled: TextStyle = {
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
}

export const $modalDragHandleArea: ViewStyle = {
  alignItems: "center",
  paddingTop: 12,
  paddingBottom: 8,
}

export const $modalDragHandleBar: ViewStyle = {
  width: 46,
  height: 4,
  borderRadius: 2,
  backgroundColor: "#B0B0B0",
}

export const $modalTitle: TextStyle = {
  fontSize: 17,
  fontFamily: typography.primary.medium,
  color: "#1A1A1A",
  paddingHorizontal: 24,
  paddingTop: 16,
  paddingBottom: 8,
}

export const $modalItem: ViewStyle = {
  height: 66,
  flexDirection: "row",
  alignItems: "center",
  gap: 14,
  paddingHorizontal: 24,
}

export const $modalItemSelected: ViewStyle = {
  backgroundColor: "#E5F1FD",
}

export const $modalItemText: TextStyle = {
  flex: 1,
  fontSize: 15,
  fontFamily: typography.primary.normal,
  color: "#555555",
}

export const $modalItemTextSelected: TextStyle = {
  fontFamily: typography.primary.semiBold,
  color: "#1062D8",
}
