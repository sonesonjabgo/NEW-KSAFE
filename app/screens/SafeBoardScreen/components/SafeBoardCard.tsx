import { FC } from "react"
import { View, TouchableOpacity, TextStyle, ViewStyle } from "react-native"
import { PencilLine, MapPin } from "lucide-react-native"

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

function getStatusBadgeType(status: string | null): SafeBoardBadgeType | null {
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
  const statusBadgeType = showStatus ? getStatusBadgeType(item.status) : null

  return (
    <TouchableOpacity activeOpacity={0.7} onPress={onPress}>
      <View style={$cardContainer}>
        <View style={$contentWrapper}>
          <View style={$mainContent}>
            <View style={$scopeLabelRow}>
              <SafeBoardBadge type={item.scope} />
              {statusBadgeType && <SafeBoardBadge type={statusBadgeType} />}
            </View>
            <Text text={item.title} style={$titleText} numberOfLines={3} />
            {item.scope === "workplace" ? (
              <View style={$metaRow}>
                <MapPin size={12} color="#979797" strokeWidth={2.5} />
                <Text text={item.workplaceName ?? ""} style={$metaWorkplace} numberOfLines={1} />
                <Text text=" · " style={$metaText} />
                <Text text={item.createdAt} style={$metaText} />
              </View>
            ) : (
              <Text text={item.createdAt} style={$metaText} />
            )}
          </View>
          <View style={$iconContainer}>
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
  marginRight: 12,
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
