import { ImageStyle, ViewStyle, TextStyle } from "react-native"

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

// ── Notice Card ───────────────────────────────────────────────────────────────

export const $noticeCard: ViewStyle = {
  backgroundColor: "#FFFBEA",
  borderRadius: 12,
  borderWidth: 1,
  borderColor: "#FBE1AC",
  paddingVertical: 18,
  paddingHorizontal: 23,
}

export const $noticeRow: ViewStyle = {
  flexDirection: "row",
  alignItems: "flex-start",
  gap: 10,
}

export const $noticeDesc: TextStyle = {
  flex: 1,
  fontSize: 15,
  fontFamily: typography.primary.normal,
  color: "#564E4B",
  lineHeight: 24,
}

// ── Activity Name Card ────────────────────────────────────────────────────────

export const $activityNameCard: ViewStyle = {
  backgroundColor: "#F8FBFD",
  borderRadius: 9,
  borderWidth: 1,
  borderColor: "#DEE8F6",
  paddingVertical: 16,
  paddingHorizontal: 20,
  flexDirection: "row",
  alignItems: "center",
  gap: 12,
}

export const $activityNameInfo: ViewStyle = {
  flex: 1,
  gap: 4,
}

export const $activityNameLabel: TextStyle = {
  fontSize: 13,
  fontFamily: typography.primary.normal,
  color: "#564E4B",
}

export const $activityNameText: TextStyle = {
  fontSize: 17,
  fontFamily: typography.primary.bold,
  color: "#000000",
}

export const $activityNameCircle: ViewStyle = {
  width: 44,
  height: 44,
  borderRadius: 22,
  backgroundColor: "#DEE8F6",
  justifyContent: "center",
  alignItems: "center",
  flexShrink: 0,
}

// ── Section ───────────────────────────────────────────────────────────────────

export const $section: ViewStyle = {
  gap: 10,
  paddingBottom: 20,
  borderBottomWidth: 1,
  borderBottomColor: "#E9ECF0",
}

export const $sectionLabel: TextStyle = {
  fontSize: 16,
  fontFamily: typography.primary.semiBold,
  color: colors.navy,
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

export const $textarea: ViewStyle = {
  backgroundColor: "#FFFFFF",
  borderRadius: 12,
  borderWidth: 1,
  borderColor: INPUT_BORDER,
  padding: 16,
  minHeight: 110,
}

export const $helperText: TextStyle = {
  fontSize: 12,
  fontFamily: typography.primary.normal,
  color: "#9AA0AB",
  marginTop: 4,
}

export const $textareaInput: TextStyle = {
  fontSize: 14,
  fontFamily: typography.primary.normal,
  color: "#111111",
  textAlignVertical: "top",
  padding: 0,
  minHeight: 78,
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

export const $photoGuideTextBlock: ViewStyle = {
  flex: 1,
  gap: 3,
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

export const $photoAddBtn: ViewStyle = {
  width: 90,
  height: 90,
  borderRadius: 10,
  borderWidth: 1,
  borderStyle: "dashed",
  borderColor: "#AAAAAA",
  backgroundColor: "#F8F9FA",
  justifyContent: "center",
  alignItems: "center",
  gap: 4,
}

export const $photoAddText: TextStyle = {
  fontSize: 11,
  fontFamily: typography.primary.normal,
  color: "#AAAAAA",
}

export const $photoItem: ImageStyle = {
  width: 90,
  height: 90,
  borderRadius: 10,
  backgroundColor: "#E0E0E0",
}

// ── Submit Bar ────────────────────────────────────────────────────────────────

export const $submitBar: ViewStyle = {
  paddingHorizontal: 20,
  paddingTop: 12,
}

export const $submitBtn: ViewStyle = {
  height: 52,
  borderRadius: 12,
  backgroundColor: "#1062D8",
  justifyContent: "center",
  alignItems: "center",
}

export const $submitBtnText: TextStyle = {
  fontSize: 16,
  fontFamily: typography.primary.bold,
  color: "#FFFFFF",
}

// ── Photo Capture Sheet ───────────────────────────────────────────────────────

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
  backgroundColor: "#FFFFFF",
  borderWidth: 1,
  borderColor: "#ECECEC",
  shadowColor: "#000000",
  shadowOffset: { width: 0, height: 3 },
  shadowOpacity: 0.12,
  shadowRadius: 8,
  elevation: 5,
}

export const $sheetBtnLabel: TextStyle = {
  fontSize: 15,
  fontFamily: typography.primary.semiBold,
  color: colors.navy,
}
