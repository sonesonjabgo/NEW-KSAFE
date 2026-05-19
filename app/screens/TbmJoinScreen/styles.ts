import { TextStyle, ViewStyle } from "react-native"

import { colors } from "@/theme/colors"
import { typography } from "@/theme/typography"

export const $wrapper: ViewStyle = {
  flex: 1,
  backgroundColor: "#FFFFFF",
}

export const $buttonDivider: ViewStyle = {
  height: 1,
  backgroundColor: "#E9ECF0",
}

export const $container: ViewStyle = {
  flex: 1,
  paddingHorizontal: 16,
  paddingVertical: 20,
}

export const $selectPrompt: TextStyle = {
  fontSize: 21,
  fontFamily: typography.primary.bold,
  color: "#000000",
  marginBottom: 16,
}

export const $emptyContainer: ViewStyle = {
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
}

export const $emptyTitle: TextStyle = {
  fontSize: 20,
  fontFamily: typography.primary.semiBold,
  color: "#000000",
  marginTop: 24,
}

export const $emptySubtitle: TextStyle = {
  fontSize: 17,
  fontFamily: typography.primary.medium,
  color: "#7B7B7B",
  textAlign: "center",
  marginTop: 15,
}

export const $buttonRow: ViewStyle = {
  flexDirection: "row",
  gap: 36,
  paddingTop: 28,
  paddingHorizontal: 16,
}

export const $prevBtn: ViewStyle = {
  flex: 1,
  height: 50,
  borderRadius: 10,
  borderWidth: 1,
  borderColor: "#D3D3D3",
  backgroundColor: "#FFFFFF",
  justifyContent: "center",
  alignItems: "center",
}

export const $prevBtnText: TextStyle = {
  fontSize: 16,
  fontFamily: typography.primary.semiBold,
  color: "#4C4C4C",
}

export const $nextBtn: ViewStyle = {
  flex: 1,
  height: 50,
  borderRadius: 10,
  backgroundColor: colors.blue,
  justifyContent: "center",
  alignItems: "center",
}

export const $nextBtnText: TextStyle = {
  fontSize: 16,
  fontFamily: typography.primary.semiBold,
  color: "#FFFFFF",
}

// ── Info Modal ────────────────────────────────────────────────────────────────

export const $modalWrap: ViewStyle = {
  flex: 1,
  justifyContent: "flex-end",
}

export const $modalOverlay: ViewStyle = {
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(0, 0, 0, 0.4)",
}

export const $modalOverlayTouch: ViewStyle = {
  flex: 1,
}

export const $modalContainer: ViewStyle = {
  backgroundColor: "#FFFFFF",
  borderTopLeftRadius: 20,
  borderTopRightRadius: 20,
  paddingHorizontal: 24,
  paddingTop: 28,
  maxHeight: "85%",
}

export const $modalSection: ViewStyle = {
  paddingBottom: 25,
  borderBottomWidth: 1,
  borderBottomColor: "#E9ECF0",
}

export const $sectionGap: ViewStyle = {
  height: 25,
}

export const $modalHeaderRow: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
  gap: 10,
}

export const $modalTitleText: TextStyle = {
  fontSize: 23,
  fontFamily: typography.primary.semiBold,
  color: "#000000",
}

export const $sectionHeading: TextStyle = {
  fontSize: 17,
  fontFamily: typography.primary.semiBold,
  color: "#1062D8",
  marginBottom: 11,
}

export const $sectionBody: TextStyle = {
  fontSize: 17,
  fontFamily: typography.primary.normal,
  color: "#000000",
  lineHeight: 26,
}

export const $procedureStep: TextStyle = {
  fontSize: 17,
  fontFamily: typography.primary.normal,
  color: "#000000",
  lineHeight: 26,
}

export const $modalCloseBtn: ViewStyle = {
  height: 50,
  borderRadius: 10,
  backgroundColor: colors.blue,
  justifyContent: "center",
  alignItems: "center",
  marginTop: 20,
}

export const $modalCloseBtnText: TextStyle = {
  fontSize: 16,
  fontFamily: typography.primary.semiBold,
  color: "#FFFFFF",
}
