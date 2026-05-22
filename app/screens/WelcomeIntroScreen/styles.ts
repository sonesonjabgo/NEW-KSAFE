import { TextStyle, ViewStyle } from "react-native"

import { colors } from "@/theme/colors"
import { typography } from "@/theme/typography"

// ── Screen ────────────────────────────────────────────────────────────────────

export const $screen: ViewStyle = {
  flex: 1,
  backgroundColor: "#FFFFFF",
}

// ── Header ────────────────────────────────────────────────────────────────────

export const $header: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  paddingHorizontal: 24,
  paddingTop: 14,
  paddingBottom: 8,
  marginBottom: 20,
}

export const $logoText: TextStyle = {
  fontSize: 21,
  fontFamily: typography.primary.bold,
  color: colors.introLogo,
  letterSpacing: -0.3,
}

export const $skipBtn: ViewStyle = {
  paddingVertical: 6,
  paddingHorizontal: 4,
}

export const $skipLabel: TextStyle = {
  fontSize: 15,
  fontFamily: typography.primary.medium,
  color: colors.introSkip,
}

// ── Slide Area (헤더~버튼 사이 영역) ──────────────────────────────────────────

// 헤더~버튼 사이 남은 공간 전체를 차지하며, slideGroup을 세로/가로 중앙 정렬
export const $slideArea: ViewStyle = {
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
}

// FlatList + paginationWrapper를 하나의 콘텐츠 묶음으로 감싸는 wrapper
// slideArea가 이 단일 블록을 중앙 정렬함
export const $slideGroup: ViewStyle = {
  width: "100%",
  alignItems: "center",
  justifyContent: "center",
}

export const $slideList: ViewStyle = {
  flexGrow: 0,
  width: "100%",
}

// ── Slide (FlatList 각 아이템) ────────────────────────────────────────────────

export const $slideContent: ViewStyle = {
  alignItems: "center",
}

// title + description을 감싸는 고정 높이 블록 — 슬라이드마다 pagination 위치가 흔들리지 않도록 함
export const $textBlock: ViewStyle = {
  width: "100%",
  alignItems: "center",
  justifyContent: "flex-start",
}

export const $stepBadge: ViewStyle = {
  width: 50,
  height: 50,
  borderRadius: 25,
  backgroundColor: colors.blue,
  alignItems: "center",
  justifyContent: "center",
  marginBottom: 22,
}

export const $stepText: TextStyle = {
  fontSize: 17,
  fontFamily: typography.primary.bold,
  color: "#FFFFFF",
}

export const $slideTitle: TextStyle = {
  fontSize: 22,
  fontFamily: typography.primary.bold,
  color: colors.introTitle,
  textAlign: "center",
  marginBottom: 18,
}

export const $slideDescription: TextStyle = {
  fontSize: 15,
  fontFamily: typography.primary.normal,
  color: colors.textDim,
  textAlign: "center",
  lineHeight: 23,
}

// ── Pagination ────────────────────────────────────────────────────────────────

// slideArea 안 FlatList 아래 고정 — (FlatList + pagination) 블록 전체가 slideArea 내 세로 중앙 배치됨
// marginTop: 상세 설명과의 간격 기준 (버튼과의 간격은 slideArea centering이 담당)
export const $paginationWrapper: ViewStyle = {
  width: "100%",
  marginTop: 24,
  alignItems: "center",
}

export const $paginationRow: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
  gap: 6,
}

export const $dot: ViewStyle = {
  width: 6,
  height: 6,
  borderRadius: 3,
  backgroundColor: "#D0D0D0",
}

export const $dotActive: ViewStyle = {
  width: 26,
  height: 6,
  borderRadius: 3,
  backgroundColor: colors.blue,
}

// ── Bottom ────────────────────────────────────────────────────────────────────

export const $bottomContainer: ViewStyle = {
  paddingHorizontal: 24,
}

export const $startBtn: ViewStyle = {
  height: 56,
  borderRadius: 14,
  backgroundColor: colors.blue,
  alignItems: "center",
  justifyContent: "center",
}

export const $startBtnLabel: TextStyle = {
  fontSize: 17,
  fontFamily: typography.primary.semiBold,
  color: "#FFFFFF",
}
