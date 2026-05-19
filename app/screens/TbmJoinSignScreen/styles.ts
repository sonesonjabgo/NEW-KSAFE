import { TextStyle, ViewStyle } from "react-native"

import { colors } from "@/theme/colors"
import { typography } from "@/theme/typography"

export const $wrapper: ViewStyle = {
  flex: 1,
  backgroundColor: "#FFFFFF",
}

export const $container: ViewStyle = {
  flex: 1,
  paddingHorizontal: 16,
  paddingVertical: 20,
}

export const $prompt: TextStyle = {
  fontSize: 21,
  fontFamily: typography.primary.bold,
  color: "#000000",
  marginBottom: 24,
}

export const $signatureBox: ViewStyle = {
  flex: 1,
  borderRadius: 12,
  borderWidth: 1.5,
  borderColor: "#D3D3D3",
  backgroundColor: "#FAFAFA",
  overflow: "hidden",
}

export const $svg: ViewStyle = {
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
}

export const $placeholderContainer: ViewStyle = {
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
}

export const $signaturePlaceholder: TextStyle = {
  fontSize: 15,
  fontFamily: typography.primary.normal,
  color: "#C0C0C0",
}

export const $clearBtn: ViewStyle = {
  alignSelf: "flex-end",
  marginTop: 10,
  paddingVertical: 6,
  paddingHorizontal: 14,
  borderRadius: 8,
  borderWidth: 1,
  borderColor: "#D3D3D3",
}

export const $clearBtnText: TextStyle = {
  fontSize: 13,
  fontFamily: typography.primary.medium,
  color: "#7B7B7B",
}

export const $iconCircle: ViewStyle = {
  width: 38,
  height: 38,
  borderRadius: 19,
  backgroundColor: "#E3EDFB",
  justifyContent: "center",
  alignItems: "center",
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
