import { FC } from "react"
import { View, TouchableOpacity, TextStyle, ViewStyle } from "react-native"
import { Pin, PencilLine, MapPin } from "lucide-react-native"

import BoardType1 from "@assets/icons/board/board_type1.svg"
import BoardType2 from "@assets/icons/board/board_type2.svg"
import BoardType3 from "@assets/icons/board/board_type3.svg"
import BoardType4 from "@assets/icons/board/board_type4.svg"

import { Text } from "@/components/Text"
import { typography } from "@/theme/typography"

import type { SafeBoardItem, ScopeType, StatusType } from "../types"

interface SafeBoardCardProps {
  item: SafeBoardItem
  showStatus?: boolean
  showEditIcon?: boolean
  showDivider?: boolean
}

const getStatusLabel = (status: StatusType): string => {
  const statusMap: Record<string, string> = {
    draft: "임시저장",
    published: "",
    archived: "보관됨",
    unread: "",
    pending_signature: "",
    completed: "",
  }
  return statusMap[status] || ""
}

function ScopeBadge({ scope }: { scope: ScopeType }) {
  return scope === "workplace" ? (
    <BoardType1 width={44} height={21} />
  ) : (
    <BoardType2 width={54} height={21} />
  )
}

function StatusBadge({ status }: { status: StatusType }) {
  const label = getStatusLabel(status)
  if (!label) return null
  return label === "임시저장" ? (
    <BoardType3 width={54} height={21} />
  ) : (
    <BoardType4 width={44} height={21} />
  )
}

export const SafeBoardCard: FC<SafeBoardCardProps> = ({
  item,
  showStatus = false,
  showEditIcon = false,
  showDivider = true,
}) => {
  return (
    <TouchableOpacity activeOpacity={0.7}>
      <View style={$cardContainer}>
        <View style={$contentWrapper}>
          <View style={$mainContent}>
            <View style={$scopeLabelRow}>
              <ScopeBadge scope={item.scope} />
              {showStatus && <StatusBadge status={item.status} />}
            </View>
            <Text text={item.title} style={$titleText} numberOfLines={3} />
            {item.scope === "workplace" ? (
              <View style={$metaRow}>
                <MapPin size={12} color="#979797" strokeWidth={2.5} />
                <Text text={item.workplaceName} style={$metaWorkplace} numberOfLines={1} />
                <Text text=" · " style={$metaText} />
                <Text text={item.createdAt} style={$metaText} />
              </View>
            ) : (
              <Text text={item.createdAt} style={$metaText} />
            )}
          </View>
          <View style={$iconContainer}>
            {item.isPinned && <Pin size={16} color="#0B3069" strokeWidth={2.5} />}
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
