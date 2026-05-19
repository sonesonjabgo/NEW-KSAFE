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

// ── List ──────────────────────────────────────────────────────────────────────

export const $listContent: ViewStyle = {
  flex: 1,
}

export const $flatListContent: ViewStyle = {
  paddingBottom: 12,
  gap: 22,
}

export const $card: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
  height: 102,
  backgroundColor: "#FFFFFF",
  borderRadius: 12,
  borderWidth: 1,
  borderColor: "#ECECEC",
  paddingHorizontal: 16,
  gap: 22,
  shadowColor: "#000000",
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.08,
  shadowRadius: 6,
  elevation: 3,
}

export const $cardSelected: ViewStyle = {
  borderColor: "#1062D8",
  backgroundColor: "#ECF4FE",
}

export const $checkbox: ViewStyle = {
  width: 24,
  height: 24,
  borderRadius: 12,
  borderWidth: 2,
  borderColor: "#D3D3D3",
  justifyContent: "center",
  alignItems: "center",
  flexShrink: 0,
}

export const $checkboxSelected: ViewStyle = {
  width: 24,
  height: 24,
  borderRadius: 12,
  backgroundColor: "#1062D8",
  justifyContent: "center",
  alignItems: "center",
  flexShrink: 0,
}

export const $cardContent: ViewStyle = {
  flex: 1,
  gap: 10,
}

export const $cardTitle: TextStyle = {
  fontSize: 15,
  fontFamily: typography.primary.semiBold,
  color: "#111111",
}

export const $cardMeta: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
  gap: 6,
}

export const $cardAvatar: ViewStyle = {
  width: 18,
  height: 18,
  borderRadius: 9,
  backgroundColor: "#E0E0E0",
  flexShrink: 0,
}

export const $cardAuthor: TextStyle = {
  fontSize: 13,
  fontFamily: typography.primary.normal,
  color: "#7B7B7B",
}

export const $cardDate: TextStyle = {
  fontSize: 13,
  fontFamily: typography.primary.normal,
  color: "#7B7B7B",
}

// ── No Selection Modal ────────────────────────────────────────────────────────

export const $noSelectionIconCircle: ViewStyle = {
  width: 38,
  height: 38,
  borderRadius: 19,
  backgroundColor: "#E3EDFB",
  justifyContent: "center",
  alignItems: "center",
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
