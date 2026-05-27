import { FC } from "react"
import { View, TouchableOpacity, TextStyle, ViewStyle } from "react-native"
import { PencilLine, MapPin } from "lucide-react-native"
import { useTranslation } from "react-i18next"

import BoardPin from "@assets/icons/board/board_pin.svg"

import { Text } from "@/components/Text"
import { typography } from "@/theme/typography"

import type { SafeBoardItem, StatusType } from "../types"
import { SafeBoardBadge, SafeBoardBadgeType } from "./SafeBoardBadge"

interface SafeBoardCardProps {
  item: SafeBoardItem
  showStatus?: boolean
  showEditIcon?: boolean
  showDivider?: boolean
  onPress?: () => void
}

function getStatusBadgeType(status: StatusType): SafeBoardBadgeType | null {
  if (status === "draft") return "draft"
  if (status === "archived") return "archived"
  return null
}

export const SafeBoardCard: FC<SafeBoardCardProps> = ({
  item,
  showStatus = false,
  showEditIcon = false,
  showDivider = true,
  onPress,
}) => {
  const { i18n } = useTranslation()
  const isRTL = i18n.language === "ur"
  const statusBadgeType = showStatus ? getStatusBadgeType(item.status) : null

  return (
    <TouchableOpacity activeOpacity={0.7} onPress={onPress}>
      <View style={$cardContainer}>
        <View style={[$contentWrapper, isRTL && { flexDirection: "row-reverse" }]}>
          <View style={$mainContent}>
            <View style={[$scopeLabelRow, isRTL && { flexDirection: "row-reverse" }]}>
              <SafeBoardBadge type={item.scope} />
              {statusBadgeType && <SafeBoardBadge type={statusBadgeType} />}
            </View>
            <Text text={item.title} style={$titleText} numberOfLines={3} />
            {item.scope === "workplace" ? (
              <View style={[$metaRow, isRTL && { flexDirection: "row-reverse" }]}>
                <MapPin size={12} color="#979797" strokeWidth={2.5} />
                <Text text={item.workplaceName} style={$metaWorkplace} numberOfLines={1} />
                <Text text=" · " style={$metaText} />
                <Text text={item.createdAt} style={$metaText} />
              </View>
            ) : (
              <Text text={item.createdAt} style={$metaText} />
            )}
          </View>
          <View style={[$iconContainer, isRTL && { flexDirection: "row-reverse" }]}>
            {item.isPinned && <BoardPin width={23} height={23} />}
            {showEditIcon && <PencilLine size={16} color="#979797" strokeWidth={2.5} />}
          </View>
        </View>
      </View>
      {showDivider && <View style={$divider} />}
    </TouchableOpacity>
  )
}

const $cardContainer: ViewStyle = {
  paddingVertical: 16,
  paddingHorizontal: 20,
  backgroundColor: "#FFFFFF",
}

const $contentWrapper: ViewStyle = {
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "flex-start",
}

const $mainContent: ViewStyle = {
  flex: 1,
  marginEnd: 12,
}

const $scopeLabelRow: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
  marginBottom: 10,
  gap: 6,
  flexWrap: "wrap",
}

const $titleText: TextStyle = {
  fontSize: 17,
  fontWeight: "700",
  fontFamily: typography.primary.bold,
  color: "#1A1A1A",
  marginBottom: 8,
  lineHeight: 22,
}

const $metaRow: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
  gap: 5,
}

const $metaText: TextStyle = {
  fontSize: 12,
  color: "#979797",
  fontFamily: typography.primary.normal,
  lineHeight: 16,
}

const $metaWorkplace: TextStyle = {
  fontSize: 12,
  color: "#979797",
  fontFamily: typography.primary.normal,
  lineHeight: 16,
}

const $iconContainer: ViewStyle = {
  flexDirection: "row",
  gap: 10,
  justifyContent: "flex-end",
  paddingTop: 1,
}

const $divider: ViewStyle = {
  height: 1,
  backgroundColor: "#E9ECF0",
  width: "100%",
}
