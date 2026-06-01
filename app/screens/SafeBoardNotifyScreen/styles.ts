import { ViewStyle, TextStyle } from "react-native"

import { colors } from "@/theme/colors"
import { typography } from "@/theme/typography"

const INPUT_BORDER = "#DDDDDD"

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

// ── Section ───────────────────────────────────────────────────────────────────

export const $section: ViewStyle = {
  gap: 8,
  paddingBottom: 16,
  borderBottomWidth: 1,
  borderBottomColor: "#E9ECF0",
}

export const $sectionLabelRow: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
}

export const $sectionLabel: TextStyle = {
  fontSize: 19,
  fontFamily: typography.primary.semiBold,
  color: colors.navy,
}

export const $requiredMark: TextStyle = {
  fontSize: 19,
  fontFamily: typography.primary.semiBold,
  color: "#E53E3E",
}

export const $helperText: TextStyle = {
  fontSize: 13,
  fontFamily: typography.primary.normal,
  color: "#555555",
}

// ── Guide card ────────────────────────────────────────────────────────────────

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

// ── Workplace checkbox list ───────────────────────────────────────────────────

export const $workplaceCard: ViewStyle = {
  borderWidth: 1,
  borderColor: INPUT_BORDER,
  borderRadius: 10,
  overflow: "hidden",
  backgroundColor: "#FFFFFF",
}

export const $workplaceRow: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
  gap: 12,
  paddingVertical: 14,
  paddingHorizontal: 16,
}

export const $workplaceRowSelected: ViewStyle = {
  backgroundColor: "#F0F5FF",
}

export const $workplaceDivider: ViewStyle = {
  height: 1,
  backgroundColor: INPUT_BORDER,
  marginHorizontal: 16,
}

export const $checkbox: ViewStyle = {
  width: 22,
  height: 22,
  borderRadius: 6,
  borderWidth: 1.5,
  borderColor: "#CCCCCC",
  justifyContent: "center",
  alignItems: "center",
}

export const $checkboxSelected: ViewStyle = {
  borderColor: "#1062D8",
  backgroundColor: "#1062D8",
}

export const $workplaceItemText: TextStyle = {
  flex: 1,
  fontSize: 14,
  fontFamily: typography.primary.normal,
  color: "#111111",
}

export const $workplaceItemTextSelected: TextStyle = {
  fontFamily: typography.primary.semiBold,
  color: "#1062D8",
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
  minHeight: 140,
}

export const $textareaInput: TextStyle = {
  fontSize: 14,
  fontFamily: typography.primary.normal,
  color: "#111111",
  textAlignVertical: "top",
  padding: 0,
  minHeight: 108,
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
