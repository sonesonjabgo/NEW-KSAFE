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

export const $labelRow: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
}

export const $required: TextStyle = {
  fontSize: 19,
  fontFamily: typography.primary.semiBold,
  color: "#FF0000",
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

// ── Attachment ─────────────────────────────────────────────────────────────────

export const $attachCard: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
  gap: 12,
  borderWidth: 1,
  borderColor: "#B5CEF3",
  borderRadius: 12,
  backgroundColor: "#F4F8FD",
  height: 66,
  paddingHorizontal: 16,
}

export const $attachCardText: TextStyle = {
  flex: 1,
  fontSize: 13,
  fontFamily: typography.primary.normal,
  color: "#564E4B",
  lineHeight: 20,
}

export const $attachUploadBtn: ViewStyle = {
  borderWidth: 1,
  borderColor: "#B5CCEC",
  borderRadius: 6,
  backgroundColor: "#FFFFFF",
  paddingVertical: 6,
  paddingHorizontal: 10,
}

export const $attachUploadBtnText: TextStyle = {
  fontSize: 10,
  fontFamily: typography.primary.bold,
  color: "#1062D8",
}

export const $attachCard2Empty: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
  gap: 10,
  borderRadius: 12,
  backgroundColor: "#E9F7F0",
  height: 58,
  paddingHorizontal: 16,
}

export const $attachCard2EmptyText: TextStyle = {
  fontSize: 13,
  fontFamily: typography.primary.normal,
  color: "#564E4B",
}

export const $attachCard2FileList: ViewStyle = {
  gap: 8,
}

export const $attachCard2FileRow: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
  gap: 10,
  borderRadius: 12,
  backgroundColor: "#ECECEC",
  height: 58,
  paddingHorizontal: 16,
}

export const $attachCard2FileText: TextStyle = {
  flex: 1,
  fontSize: 13,
  fontFamily: typography.primary.normal,
  color: "#564E4B",
}

// ── Push notification toggle ──────────────────────────────────────────────────

export const $toggleRow: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  paddingVertical: 4,
}

export const $toggleLabel: TextStyle = {
  fontSize: 15,
  fontFamily: typography.primary.medium,
  color: "#111111",
  flex: 1,
  marginRight: 12,
}

export const $toggleTrack: ViewStyle = {
  width: 44,
  height: 26,
  borderRadius: 13,
  backgroundColor: "#DDDDDD",
  justifyContent: "center",
  paddingHorizontal: 3,
}

export const $toggleTrackActive: ViewStyle = {
  backgroundColor: "#1062D8",
}

export const $toggleThumb: ViewStyle = {
  width: 20,
  height: 20,
  borderRadius: 10,
  backgroundColor: "#FFFFFF",
  shadowColor: "#000000",
  shadowOffset: { width: 0, height: 1 },
  shadowOpacity: 0.15,
  shadowRadius: 2,
  elevation: 2,
}

export const $toggleThumbActive: ViewStyle = {
  alignSelf: "flex-end",
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
