import { TextStyle, ViewStyle } from "react-native"

import { colors } from "@/theme/colors"
import { typography } from "@/theme/typography"

const INPUT_BORDER = "#DDDDDD"

export const $scrollContent: ViewStyle = {
  flex: 1,
}

export const $scrollInner: ViewStyle = {
  paddingHorizontal: 22,
  paddingTop: 28,
  paddingBottom: 40,
  gap: 35,
}

// ── Card (guide) ──────────────────────────────────────────────────────────────

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
  fontFamily: typography.primary.medium,
  color: "#555555",
  paddingHorizontal: 12,
}

// ── Upload box ────────────────────────────────────────────────────────────────

export const $uploadBox: ViewStyle = {
  height: 60,
  borderRadius: 8,
  borderWidth: 1,
  borderColor: INPUT_BORDER,
  backgroundColor: "#FFFFFF",
  flexDirection: "row",
  alignItems: "center",
  paddingHorizontal: 16,
  gap: 10,
}

export const $uploadBoxText: TextStyle = {
  flex: 1,
  fontSize: 14,
  fontFamily: typography.primary.normal,
  color: "#555555",
}

// ── File chip (after upload) ──────────────────────────────────────────────────

export const $fileChip: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
  backgroundColor: "#F8FBFD",
  borderRadius: 10,
  borderWidth: 1,
  borderColor: "#DEE8F6",
  padding: 12,
  gap: 12,
}

export const $fileIconBox: ViewStyle = {
  width: 44,
  height: 44,
  borderRadius: 8,
  backgroundColor: "#DEE7F9",
  justifyContent: "center",
  alignItems: "center",
}

export const $fileTextBlock: ViewStyle = {
  flex: 1,
  gap: 4,
}

export const $fileChipName: TextStyle = {
  fontSize: 14,
  fontFamily: typography.primary.semiBold,
  color: "#111111",
}

export const $fileChipSize: TextStyle = {
  fontSize: 13,
  fontFamily: typography.primary.normal,
  color: "#555555",
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
  fontSize: 15,
  fontFamily: typography.primary.medium,
  color: "#564E4B",
}

export const $checkboxDesc: TextStyle = {
  fontSize: 13,
  fontFamily: typography.primary.medium,
  color: "#555555",
  paddingLeft: 28,
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

// ── Submit bar ────────────────────────────────────────────────────────────────

export const $submitBar: ViewStyle = {
  paddingHorizontal: 16,
  paddingTop: 12,
}

export const $submitBtn: ViewStyle = {
  height: 52,
  borderRadius: 12,
  backgroundColor: colors.blue,
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
