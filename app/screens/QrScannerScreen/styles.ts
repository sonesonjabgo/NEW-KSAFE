import { ViewStyle, TextStyle } from "react-native"

import { isRTL } from "@/i18n"
import { colors } from "@/theme/colors"
import { typography } from "@/theme/typography"

// 테마 토큰에 없는 디자인 전용 색상
const NAVY_LIGHT = "#2E5386"
const WHITE = "#FFFFFF"
const WHITE_85 = "rgba(255,255,255,0.85)"
const BORDER_LIGHT = "#E5E7EB"
const ACCENT_BLUE = "#2563EB"
const TEXT_GRAY = "#374151"
const OVERLAY_BG = "rgba(0,0,0,0.4)"
const GRAY_MEDIUM = "#D1D5DB"
const HANDLE_COLOR = "#B0B0B0"
const INACTIVE_BTN = "#E4E4E4"
const INACTIVE_TEXT = "#9CA3AF"
const REQUIRED_RED = "#EF4444"
const TEXT_DARK = "#1F2937"
const HELPER_COLOR = "#6B7280"

export const CORNER_THICKNESS = 4

/* ── 루트 ── */
export const $root: ViewStyle = {
  backgroundColor: colors.navy,
  flex: 1,
}

/* ── 헤더 (StackScreen 기준과 동일) ── */
export const $header: ViewStyle = {
  flexDirection: isRTL ? "row-reverse" : "row",
  alignItems: "center",
  paddingLeft: 17,
  paddingRight: 23,
  paddingBottom: 14,
  gap: 8,
  minHeight: 100,
}

export const $headerSide: ViewStyle = {
  width: 36,
  height: 36,
  justifyContent: "center",
  alignItems: "flex-start",
  flexShrink: 0,
}

export const $chevronRTL: ViewStyle = {
  transform: [{ scaleX: -1 }],
}

export const $headerTitleContainer: ViewStyle = {
  flex: 1,
  alignItems: "center",
}

export const $headerTitle: TextStyle = {
  color: WHITE,
  fontSize: 20,
  fontFamily: typography.primary.semiBold,
  textAlign: "center",
}

/* ── 키보드 버튼 (우측 슬롯) ── */
export const $keyboardBtn: ViewStyle = {
  alignItems: "center",
  backgroundColor: NAVY_LIGHT,
  borderRadius: 8,
  height: 36,
  justifyContent: "center",
  width: 36,
}

/* ── 헤더 설명 ── */
export const $headerDescContainer: ViewStyle = {
  alignItems: "center",
  paddingHorizontal: 24,
  // paddingBottom: 동적 적용
}

export const $headerDesc: TextStyle = {
  color: WHITE_85,
  textAlign: "center",
  // fontSize / lineHeight: 동적 적용
}

/* ── 하단 콘텐츠 영역 (ScrollView style) ── */
export const $contentArea: ViewStyle = {
  backgroundColor: colors.screenBg,
  borderTopLeftRadius: 26,
  borderTopRightRadius: 26,
  flex: 1,
  // paddingBottom은 contentContainerStyle($contentInner)에서 처리
}

/* ── 콘텐츠 내부 래퍼 (ScrollView contentContainerStyle) ── */
export const $contentInner: ViewStyle = {
  flexGrow: 1,
  gap: 14,
  paddingBottom: 32,
  // paddingHorizontal / paddingTop: 동적 적용
}

export const $contentInnerTablet: ViewStyle = {
  maxWidth: 520,
  alignSelf: "center",
  width: "100%",
}

/* ── QR 스캔 카드 ── */
export const $scanCard: ViewStyle = {
  alignItems: "center",
  backgroundColor: WHITE,
  borderColor: BORDER_LIGHT,
  borderRadius: 22,
  borderWidth: 1,
  gap: 16,
  // padding: 동적 적용
}

/* QR 프레임 — width/height 동적 적용 */
export const $qrFrameWrapper: ViewStyle = {
  alignItems: "center",
  justifyContent: "center",
  position: "relative",
}

/* QR 프레임 모서리 — width/height 동적 적용 */
export const $cornerTL: ViewStyle = {
  borderColor: colors.navy,
  borderLeftWidth: CORNER_THICKNESS,
  borderTopLeftRadius: 4,
  borderTopWidth: CORNER_THICKNESS,
  left: 0,
  position: "absolute",
  top: 0,
}

export const $cornerTR: ViewStyle = {
  borderColor: colors.navy,
  borderRightWidth: CORNER_THICKNESS,
  borderTopRightRadius: 4,
  borderTopWidth: CORNER_THICKNESS,
  position: "absolute",
  right: 0,
  top: 0,
}

export const $cornerBL: ViewStyle = {
  borderBottomLeftRadius: 4,
  borderBottomWidth: CORNER_THICKNESS,
  borderColor: colors.navy,
  borderLeftWidth: CORNER_THICKNESS,
  bottom: 0,
  left: 0,
  position: "absolute",
}

export const $cornerBR: ViewStyle = {
  borderBottomRightRadius: 4,
  borderBottomWidth: CORNER_THICKNESS,
  borderColor: colors.navy,
  borderRightWidth: CORNER_THICKNESS,
  bottom: 0,
  position: "absolute",
  right: 0,
}

/* ── 언어 카드 ── */
export const $languageCard: ViewStyle = {
  alignItems: "center",
  backgroundColor: WHITE,
  borderColor: BORDER_LIGHT,
  borderRadius: 14,
  borderWidth: 1,
  flexDirection: isRTL ? "row-reverse" : "row",
  gap: 10,
  paddingHorizontal: 16,
  // paddingVertical: 동적 적용
}

export const $languageText: TextStyle = {
  color: TEXT_GRAY,
  // fontSize: 동적 적용
}

export const $languageHighlight: TextStyle = {
  color: ACCENT_BLUE,
  fontWeight: "500",
}

/* ── 딤 오버레이 ── */
export const $overlay: ViewStyle = {
  flex: 1,
  justifyContent: "flex-end",
}

export const $overlayBg: ViewStyle = {
  backgroundColor: OVERLAY_BG,
  bottom: 0,
  left: 0,
  position: "absolute",
  right: 0,
  top: 0,
}

export const $overlayDismiss: ViewStyle = {
  flex: 1,
}

/* ── 바텀시트 ── */
export const $sheet: ViewStyle = {
  backgroundColor: WHITE,
  borderTopLeftRadius: 20,
  borderTopRightRadius: 20,
  paddingBottom: 32,
  paddingHorizontal: 20,
  paddingTop: 12,
}

export const $handle: ViewStyle = {
  alignSelf: "center",
  backgroundColor: HANDLE_COLOR,
  borderRadius: 4,
  height: 4,
  marginBottom: 20,
  width: 46,
}

export const $sheetDesc: TextStyle = {
  color: TEXT_DARK,
  fontSize: 15,
  lineHeight: 22,
  marginBottom: 16,
}

/* ── 코드 입력 필드 ── */
export const $codeInput: TextStyle = {
  borderColor: GRAY_MEDIUM,
  borderRadius: 10,
  borderWidth: 1,
  color: TEXT_DARK,
  fontSize: 15,
  marginBottom: 8,
  paddingHorizontal: 14,
  paddingVertical: 14,
}

/* ── 도움말 텍스트 ── */
export const $helperText: TextStyle = {
  color: HELPER_COLOR,
  fontSize: 13,
  lineHeight: 20,
  marginBottom: 24,
}

/* ── 회의 참여 버튼 ── */
export const $joinBtn: ViewStyle = {
  alignItems: "center",
  borderRadius: 12,
  paddingVertical: 16,
}

export const $joinBtnActive: ViewStyle = {
  backgroundColor: colors.navy,
}

export const $joinBtnInactive: ViewStyle = {
  backgroundColor: INACTIVE_BTN,
}

export const $joinBtnText: TextStyle = {
  fontSize: 16,
  fontWeight: "600",
}

export const $joinBtnTextActive: TextStyle = {
  color: WHITE,
}

export const $joinBtnTextInactive: TextStyle = {
  color: INACTIVE_TEXT,
}

/* ── 필수 표시 ── */
export const $required: TextStyle = {
  color: REQUIRED_RED,
  fontSize: 15,
}
