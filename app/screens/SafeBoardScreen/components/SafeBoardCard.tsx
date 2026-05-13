import { FC } from "react"
import { View, TouchableOpacity, TextStyle, ViewStyle } from "react-native"
import { Text } from "@/components/Text"
import { typography } from "@/theme/typography"
import type { SafeBoardItem, ScopeType, StatusType } from "../types"

interface SafeBoardCardProps {
  item: SafeBoardItem
}

const getScopeLabel = (scope: ScopeType): string => {
  const scopeMap: Record<ScopeType, string> = {
    company_wide: "회사전체",
    workplace: "사업장",
  }
  return scopeMap[scope]
}

const getStatusLabel = (status: StatusType): string => {
  const statusMap: Record<StatusType, string> = {
    unread: "미읽음",
    pending_signature: "서명대기",
    completed: "완료",
    draft: "작성중",
    published: "공개",
    archived: "보관",
  }
  return statusMap[status]
}

export const SafeBoardCard: FC<SafeBoardCardProps> = ({ item }) => {
  return (
    <TouchableOpacity style={$cardContainer} activeOpacity={0.7}>
      <View style={$cardContent}>
        <View style={$headerRow}>
          {item.isPinned && <Text text="📌" style={$pinnedText} />}
          <Text text={item.workplaceName} style={$scopeText} />
        </View>
        <Text text={item.title} style={$titleText} numberOfLines={2} />
        <View style={$footerContainer}>
          <Text text={item.createdAt} style={$metaText} />
          <Text text={getScopeLabel(item.scope)} style={$metaText} />
          <Text text={getStatusLabel(item.status)} style={$metaText} />
        </View>
      </View>
    </TouchableOpacity>
  )
}

const $cardContainer: ViewStyle = {
  backgroundColor: "#FFFFFF",
  borderRadius: 8,
  marginBottom: 8,
  paddingVertical: 12,
  paddingHorizontal: 16,
  borderWidth: 1,
  borderColor: "#E9ECF0",
}

const $cardContent: ViewStyle = {}

const $headerRow: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
  marginBottom: 4,
}

const $pinnedText: TextStyle = {
  fontSize: 12,
  marginRight: 4,
}

const $scopeText: TextStyle = {
  fontSize: 11,
  color: "#1062D8",
  fontFamily: typography.primary.medium,
}

const $titleText: TextStyle = {
  fontSize: 14,
  fontFamily: typography.primary.semiBold,
  color: "#000000",
  marginBottom: 8,
}

const $footerContainer: ViewStyle = {
  flexDirection: "row",
  gap: 8,
}

const $metaText: TextStyle = {
  fontSize: 11,
  color: "#7F848C",
  fontFamily: typography.primary.normal,
}
