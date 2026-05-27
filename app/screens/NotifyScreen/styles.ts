import { ViewStyle, TextStyle } from "react-native"

import { isRTL } from "@/i18n"
import { colors } from "@/theme/colors"
import { typography } from "@/theme/typography"

// 테마 토큰에 없는 디자인 전용 색상
const BODY_BG = "#FFFFFF"
const CARD_TEXT = "#181818"
const CARD_TIME_COLOR = "#9A9A9A"
const CARD_UNREAD_BG = "#EDF3FD"
const CARD_UNREAD_BORDER = "#B6D4FF"
const CARD_READ_BG = "#FFFFFF"
const CARD_READ_BORDER = "#ECECEC"
const CIRCLE_BG = "#E5E7EB"
const EMPTY_DESC_COLOR = "#9CA3AF"
const EMPTY_TITLE_COLOR = "#1A2236"
const ICON_CIRCLE_READ_BG = "#E0EBFB"

/* ── 본문 ── */
export const $body: ViewStyle = {
  backgroundColor: BODY_BG,
  flex: 1,
}

/* ── 헤더 우측 버튼 ── */
export const $headerActions: ViewStyle = {
  flexDirection: isRTL ? "row-reverse" : "row",
  gap: 4,
}

export const $headerIconBtn: ViewStyle = {
  alignItems: "center",
  height: 36,
  justifyContent: "center",
  width: 36,
}

/* ── 알림 리스트 영역 — padding/gap 동적 적용 ── */
export const $listArea: ViewStyle = {}

export const $listAreaTablet: ViewStyle = {
  maxWidth: 700,
  alignSelf: "center",
  width: "100%",
}

/* ── 알림 카드 — padding 동적 적용 ── */
export const $card: ViewStyle = {
  alignItems: "center",
  backgroundColor: CARD_UNREAD_BG,
  borderColor: CARD_UNREAD_BORDER,
  borderRadius: 16,
  borderWidth: 1.5,
  flexDirection: isRTL ? "row-reverse" : "row",
  gap: 12,
}

export const $cardRead: ViewStyle = {
  backgroundColor: CARD_READ_BG,
  borderColor: CARD_READ_BORDER,
}

export const $cardContent: ViewStyle = {
  flex: 1,
  gap: 2,
}

/* fontSize 동적 적용 */
export const $cardTitle: TextStyle = {
  color: CARD_TEXT,
  fontFamily: typography.primary.bold,
  textAlign: isRTL ? "right" : "left",
}

export const $cardDesc: TextStyle = {
  color: CARD_TEXT,
  fontFamily: typography.primary.normal,
  textAlign: isRTL ? "right" : "left",
}

export const $cardTime: TextStyle = {
  color: CARD_TIME_COLOR,
  fontFamily: typography.primary.normal,
  textAlign: isRTL ? "right" : "left",
}

/* ── 아이콘 원형 — width/height/borderRadius 동적 적용 ── */
export const $cardIconCircle: ViewStyle = {
  alignItems: "center",
  backgroundColor: colors.blue,
  flexShrink: 0,
  justifyContent: "center",
}

export const $cardIconCircleRead: ViewStyle = {
  backgroundColor: ICON_CIRCLE_READ_BG,
}

/* ── 읽지 않음 dot ── */
export const $unreadDot: ViewStyle = {
  backgroundColor: colors.blue,
  borderRadius: 4,
  flexShrink: 0,
  height: 8,
  width: 8,
}

/* ── Empty State ── */
export const $emptyContainer: ViewStyle = {
  alignItems: "center",
  flex: 1,
  justifyContent: "center",
}

/* paddingHorizontal 동적 적용 */
export const $emptyState: ViewStyle = {
  alignItems: "center",
}

/* width/height/borderRadius/marginBottom 동적 적용 */
export const $emptyCircle: ViewStyle = {
  alignItems: "center",
  backgroundColor: CIRCLE_BG,
  justifyContent: "center",
}

/* fontSize/marginBottom 동적 적용 */
export const $emptyTitle: TextStyle = {
  color: EMPTY_TITLE_COLOR,
  fontFamily: typography.primary.bold,
  textAlign: "center",
}

/* fontSize 동적 적용 */
export const $emptyDesc: TextStyle = {
  color: EMPTY_DESC_COLOR,
  fontFamily: typography.primary.normal,
  lineHeight: 20,
  textAlign: "center",
}
