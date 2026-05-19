import { TextStyle, ViewStyle } from "react-native"

import { colors } from "@/theme/colors"
import { typography } from "@/theme/typography"

export const $wrapper: ViewStyle = {
  flex: 1,
  backgroundColor: "#FFFFFF",
}

export const $container: ViewStyle = {
  flex: 1,
}

export const $scrollContent: ViewStyle = {
  paddingHorizontal: 16,
  paddingVertical: 20,
  gap: 24,
}

export const $section: ViewStyle = {
  gap: 12,
}

export const $sectionHeading: TextStyle = {
  fontSize: 15,
  fontFamily: typography.primary.semiBold,
  color: "#1062D8",
}

export const $infoCard: ViewStyle = {
  backgroundColor: "#FFFFFF",
  borderRadius: 12,
  borderWidth: 1,
  borderColor: "#ECECEC",
  paddingHorizontal: 16,
  shadowColor: "#000000",
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.06,
  shadowRadius: 6,
  elevation: 2,
}

export const $infoRow: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
  paddingVertical: 14,
  gap: 12,
}

export const $infoRowDivider: ViewStyle = {
  height: 1,
  backgroundColor: "#F2F2F2",
}

export const $infoLabel: TextStyle = {
  fontSize: 14,
  fontFamily: typography.primary.medium,
  color: "#7B7B7B",
  width: 60,
  flexShrink: 0,
}

export const $infoValue: TextStyle = {
  flex: 1,
  fontSize: 15,
  fontFamily: typography.primary.semiBold,
  color: "#111111",
}

export const $emptyAttachments: ViewStyle = {
  height: 80,
  borderRadius: 12,
  borderWidth: 1,
  borderColor: "#ECECEC",
  borderStyle: "dashed",
  justifyContent: "center",
  alignItems: "center",
}

export const $emptyAttachmentsText: TextStyle = {
  fontSize: 14,
  fontFamily: typography.primary.normal,
  color: "#B0B0B0",
}

export const $buttonDivider: ViewStyle = {
  height: 1,
  backgroundColor: "#E9ECF0",
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
