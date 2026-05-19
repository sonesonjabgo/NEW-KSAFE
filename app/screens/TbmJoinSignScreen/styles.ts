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
  paddingTop: 20,
}

export const $heading: TextStyle = {
  fontSize: 26,
  fontFamily: typography.primary.semiBold,
  color: "#000000",
  marginBottom: 17,
}

export const $description: TextStyle = {
  fontSize: 17,
  fontFamily: typography.primary.normal,
  color: "#181818",
  marginBottom: 24,
}

// ── Signature canvas ──────────────────────────────────────────────────────────

export const $signatureBox: ViewStyle = {
  height: 320,
  borderRadius: 12,
  borderWidth: 1,
  borderColor: "#ECECEC",
  backgroundColor: "#FFFFFF",
  overflow: "hidden",
  marginBottom: 14,
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

// ── Reset button ──────────────────────────────────────────────────────────────

export const $clearBtn: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
  height: 50,
  borderRadius: 10,
  borderWidth: 1,
  borderColor: "#1062D8",
  gap: 8,
}

export const $clearBtnText: TextStyle = {
  fontSize: 16,
  fontFamily: typography.primary.semiBold,
  color: "#1062D8",
}

// ── Modal icon ────────────────────────────────────────────────────────────────

export const $iconCircle: ViewStyle = {
  width: 38,
  height: 38,
  borderRadius: 19,
  backgroundColor: "#E3EDFB",
  justifyContent: "center",
  alignItems: "center",
}

// ── Buttons ───────────────────────────────────────────────────────────────────

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
