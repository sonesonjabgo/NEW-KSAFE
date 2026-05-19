import { TextStyle, ViewStyle } from "react-native"

import { colors } from "@/theme/colors"
import { typography } from "@/theme/typography"

export const $wrapper: ViewStyle = {
  flex: 1,
  backgroundColor: "#FFFFFF",
}

export const $container: ViewStyle = {
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
}

export const $textBlock: ViewStyle = {
  alignItems: "center",
  marginTop: 32,
}

export const $heading: TextStyle = {
  fontSize: 20,
  fontFamily: typography.primary.semiBold,
  color: "#000000",
  textAlign: "center",
  marginBottom: 15,
}

export const $subtitle: TextStyle = {
  fontSize: 17,
  fontFamily: typography.primary.medium,
  color: "#7B7B7B",
  textAlign: "center",
}

export const $buttonDivider: ViewStyle = {
  height: 1,
  backgroundColor: "#E9ECF0",
}

export const $buttonRow: ViewStyle = {
  paddingTop: 28,
  paddingHorizontal: 16,
}

export const $homeBtn: ViewStyle = {
  height: 50,
  borderRadius: 10,
  backgroundColor: colors.blue,
  justifyContent: "center",
  alignItems: "center",
}

export const $homeBtnText: TextStyle = {
  fontSize: 16,
  fontFamily: typography.primary.semiBold,
  color: "#FFFFFF",
}
