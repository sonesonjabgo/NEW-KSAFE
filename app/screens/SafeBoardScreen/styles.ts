import { ViewStyle, TextStyle } from "react-native"

import { typography } from "@/theme/typography"

export const $screenContainer: ViewStyle = {
  flex: 1,
  backgroundColor: "#FFFFFF",
}

export const $scrollContent: ViewStyle = {
  flexGrow: 1,
}

export const $headerContainer: ViewStyle = {
  backgroundColor: "#0B3069",
  paddingTop: 20,
  paddingBottom: 20,
  paddingHorizontal: 20,

  alignItems: "center",
  justifyContent: "center",
}

export const $adminHeaderContainer: ViewStyle = {
  backgroundColor: "#0B3069",
  paddingTop: 22,
  paddingBottom: 22,
  paddingHorizontal: 20,
  position: "relative",
}

export const $adminHeaderContent: ViewStyle = {
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
}

export const $headerTitle: TextStyle = {
  color: "#FFFFFF",
  fontSize: 21,
  fontWeight: "600",
  fontFamily: typography.primary.semiBold,
}

export const $bellIconContainer: ViewStyle = {
  position: "absolute",
  right: 20,
  top: "50%",
  transform: [{ translateY: -12 }],
  flexDirection: "row",
  alignItems: "center",
  gap: 6,
}

export const $bellText: TextStyle = {
  color: "#FFFFFF",
  fontSize: 13,
  fontWeight: "600",
  fontFamily: typography.primary.semiBold,
}

export const $workplaceContainer: ViewStyle = {
  backgroundColor: "#FFFFFF",
  paddingVertical: 14,
  paddingHorizontal: 20,
  borderBottomWidth: 1,
  borderBottomColor: "#E9ECF0",
}

export const $workplaceLabel: TextStyle = {
  fontSize: 14,
  fontWeight: "500",
  color: "#979797",
  fontFamily: typography.primary.medium,
  marginBottom: 8,
}

export const $workplaceSelectorNew: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  paddingVertical: 0,
  paddingHorizontal: 0,
  backgroundColor: "transparent",
}

export const $workplaceSelectorTextNew: TextStyle = {
  fontSize: 21,
  fontWeight: "700",
  color: "#000000",
  fontFamily: typography.primary.bold,
  flex: 1,
}

export const $chevronContainer: ViewStyle = {
  width: 36,
  height: 36,
  justifyContent: "center",
  alignItems: "center",
  marginLeft: 8,
}

export const $tabContainer: ViewStyle = {
  flexDirection: "row",
  backgroundColor: "#FFFFFF",
  borderBottomWidth: 1,
  borderBottomColor: "#E9ECF0",
}

export const $tab: ViewStyle = {
  flex: 1,
  paddingVertical: 12,
  paddingHorizontal: 20,
  borderBottomWidth: 2,
  borderBottomColor: "transparent",
  alignItems: "center",
  justifyContent: "center",
}

export const $activeTab: ViewStyle = {
  borderBottomColor: "#0B3069",
}

export const $tabText: TextStyle = {
  fontSize: 14,
  fontWeight: "600",
  color: "#979797",
  fontFamily: typography.primary.semiBold,
}

export const $activeTabText: TextStyle = {
  color: "#0B3069",
  fontWeight: "700",
}

export const $contentContainer: ViewStyle = {
  flex: 1,
  backgroundColor: "#F9FAFE",
}

export const $listContainer: ViewStyle = {
  paddingHorizontal: 0,
  paddingBottom: 24,
}

export const $emptyContainer: ViewStyle = {
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
  paddingVertical: 60,
}

export const $emptyText: TextStyle = {
  fontSize: 15,
  color: "#999999",
  fontFamily: typography.primary.normal,
}

export const $floatingButton: ViewStyle = {
  position: "absolute",
  bottom: 24,
  right: 20,
  width: 80,
  height: 80,
  borderRadius: 40,
  backgroundColor: "#0B3069",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
  gap: 4,
  shadowColor: "#000000",
  shadowOffset: { width: 0, height: 4 },
  shadowOpacity: 0.25,
  shadowRadius: 10,
  elevation: 8,
}

export const $floatingButtonText: TextStyle = {
  fontSize: 11,
  fontWeight: "600",
  color: "#FFFFFF",
  fontFamily: typography.primary.semiBold,
}

export const $modalOverlay: ViewStyle = {
  flex: 1,
  backgroundColor: "rgba(0, 0, 0, 0.3)",
  justifyContent: "flex-end",
}

export const $modalTitle: TextStyle = {
  fontSize: 17,
  fontFamily: typography.primary.medium,
  color: "#000000",
  paddingHorizontal: 20,
  marginBottom: 12,
}

export const $modalContent: ViewStyle = {
  backgroundColor: "#FFFFFF",
  borderTopLeftRadius: 20,
  borderTopRightRadius: 20,
  paddingTop: 36,
  paddingBottom: 40,
}

export const $workplaceOption: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
  gap: 12,
  height: 66,
  paddingHorizontal: 20,
}

export const $workplaceOptionSelected: ViewStyle = {
  backgroundColor: "#E5F1FD",
}

export const $workplaceOptionText: TextStyle = {
  flex: 1,
  fontSize: 17,
  fontFamily: typography.primary.medium,
  color: "#000000",
}

export const $workplaceOptionTextSelected: TextStyle = {
  color: "#1062D8",
}
