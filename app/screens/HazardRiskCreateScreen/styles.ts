import { ImageStyle, TextStyle, ViewStyle } from "react-native"

import { colors } from "@/theme/colors"
import { typography } from "@/theme/typography"

const INPUT_BORDER = "#DDDDDD"

// ── Scroll ────────────────────────────────────────────────────────────────────

export const $scrollContent: ViewStyle = {
  flex: 1,
}

export const $scrollInner: ViewStyle = {
  paddingHorizontal: 22,
  paddingTop: 28,
  paddingBottom: 40,
  gap: 35,
}

// ── Guide Card ────────────────────────────────────────────────────────────────

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
  lineHeight: 26,
  fontFamily: typography.primary.semiBold,
  color: colors.navy,
}

export const $helperText: TextStyle = {
  fontSize: 13,
  fontFamily: typography.primary.normal,
  color: "#979797",
  paddingHorizontal: 16,
}

// ── Input ─────────────────────────────────────────────────────────────────────

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

// ── Photo Hint ────────────────────────────────────────────────────────────────

export const $photoHintRow: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
  gap: 5,
}

export const $photoHintText: TextStyle = {
  flex: 1,
  fontSize: 12,
  fontFamily: typography.primary.medium,
  color: "#747474",
}

// ── Site Photos ───────────────────────────────────────────────────────────────

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
}

export const $photoGuideLine: TextStyle = {
  fontSize: 11,
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
  fontSize: 11,
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
}

export const $photoPreviewText: TextStyle = {
  flex: 1,
  fontSize: 14,
  fontFamily: typography.primary.normal,
  color: "#3E7853",
}

export const $photoGrid: ViewStyle = {
  flexDirection: "row",
  flexWrap: "wrap",
  gap: 10,
}

export const $photoItem: ImageStyle = {
  width: 90,
  height: 90,
  borderRadius: 10,
  backgroundColor: "#E0E0E0",
}

// ── Submit Bar ────────────────────────────────────────────────────────────────

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

// ── Workplace Modal ───────────────────────────────────────────────────────────

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

export const $modalTitle: TextStyle = {
  fontSize: 17,
  fontFamily: typography.primary.medium,
  color: "#000000",
  paddingHorizontal: 20,
  marginBottom: 12,
}

export const $workplaceOption: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
  gap: 12,
  height: 66,
  paddingHorizontal: 20,
}

export const $workplaceOptionSelected: ViewStyle = {
  backgroundColor: "#E5F1FD",
}

export const $workplaceOptionText: TextStyle = {
  flex: 1,
  fontSize: 17,
  fontFamily: typography.primary.medium,
  color: "#000000",
}

export const $workplaceOptionTextSelected: TextStyle = {
  color: "#1062D8",
}
