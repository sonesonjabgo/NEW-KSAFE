import { Dimensions, ImageStyle, TextStyle, ViewStyle } from "react-native"

import { colors } from "@/theme/colors"
import { typography } from "@/theme/typography"

export const SCREEN_WIDTH = Dimensions.get("window").width

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
  marginBottom: 45,
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

// ── Slide Area (헤더~버튼 사이 FlatList 컨테이너) ────────────────────────────

export const $slideArea: ViewStyle = {
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
}

export const $slideList: ViewStyle = {
  flex: 1,
  alignSelf: "stretch",
}

export const $slideListContent: ViewStyle = {
  flexGrow: 1,
}

// ── Slide (FlatList 각 아이템) ────────────────────────────────────────────────

export const $slide: ViewStyle = {
  width: SCREEN_WIDTH,
  height: "100%",
  alignItems: "center",
  justifyContent: "center",
  paddingHorizontal: 32,
}

export const $slideContent: ViewStyle = {
  alignItems: "center",
}

export const $imageContainer: ViewStyle = {
  width: SCREEN_WIDTH * 0.55,
  height: SCREEN_WIDTH * 0.55,
  alignItems: "center",
  justifyContent: "center",
  marginBottom: 28,
}

export const $slideImage: ImageStyle = {
  width: "100%",
  height: "100%",
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

export const $paginationRow: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
  gap: 6,
  marginTop: 28,
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
