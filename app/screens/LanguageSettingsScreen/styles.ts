import { ViewStyle, TextStyle } from "react-native"

import { colors } from "@/theme/colors"

// 테마 토큰에 없는 디자인 전용 색상
const WHITE = "#FFFFFF"
const SELECTED_BG = "#E7F1FB"
const ITEM_BORDER = "#E5E7EB"
const MODAL_ICON_BG = "#EEF3FC"
const OVERLAY_BG = "rgba(0,0,0,0.4)"
const TEXT_DARK = "#1A2236"
const TEXT_GUIDE = "#374151"
const TEXT_DESC = "#6B7280"

/* ── 본문 ── */
export const $body: ViewStyle = {
  backgroundColor: colors.screenBg,
  flex: 1,
}

/* ── 안내 문구 — fontSize/paddingTop/paddingBottom 동적 적용 ── */
export const $guideText: TextStyle = {
  color: TEXT_GUIDE,
}

/* ── 언어 항목 — height/paddingHorizontal/marginBottom 동적 적용 ── */
export const $item: ViewStyle = {
  alignItems: "center",
  backgroundColor: WHITE,
  borderColor: ITEM_BORDER,
  borderRadius: 10,
  borderWidth: 1,
  flexDirection: "row",
  justifyContent: "space-between",
}

export const $itemSelected: ViewStyle = {
  backgroundColor: SELECTED_BG,
  borderColor: colors.navy,
}

export const $itemContent: ViewStyle = {
  alignItems: "center",
  flexDirection: "row",
  gap: 10,
}

/* fontSize 동적 적용 */
export const $itemLabel: TextStyle = {
  color: TEXT_DARK,
}

/* ── 모달 딤 오버레이 ── */
export const $modalOverlay: ViewStyle = {
  alignItems: "center",
  backgroundColor: OVERLAY_BG,
  flex: 1,
  justifyContent: "center",
}

/* ── 모달 카드 — marginHorizontal/padding 동적 적용 ── */
export const $modalCard: ViewStyle = {
  alignItems: "center",
  backgroundColor: WHITE,
  borderRadius: 18,
}

/* ── 모달 아이콘 원형 — width/height/borderRadius/marginBottom 동적 적용 ── */
export const $modalIconCircle: ViewStyle = {
  alignItems: "center",
  backgroundColor: MODAL_ICON_BG,
  justifyContent: "center",
}

/* fontSize/marginTop 동적 적용 */
export const $modalTitle: TextStyle = {
  color: TEXT_DARK,
  fontWeight: "700",
}

/* fontSize/marginTop 동적 적용 */
export const $modalDesc: TextStyle = {
  color: TEXT_DESC,
  lineHeight: 22,
  textAlign: "center",
}

/* ── 모달 확인 버튼 — marginTop/paddingVertical 동적 적용 ── */
export const $modalConfirmBtn: ViewStyle = {
  alignItems: "center",
  alignSelf: "stretch",
  backgroundColor: colors.blue,
  borderRadius: 12,
}

/* fontSize 동적 적용 */
export const $modalBtnText: TextStyle = {
  color: WHITE,
  fontWeight: "600",
}
