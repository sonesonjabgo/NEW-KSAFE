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
  gap: 28,
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
  gap: 8,
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

export const $textareaInput: TextStyle = {
  fontSize: 14,
  fontFamily: typography.primary.normal,
  color: "#111111",
  textAlignVertical: "top",
  padding: 0,
  minHeight: 78,
}

// ── Site Photos ───────────────────────────────────────────────────────────────

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
