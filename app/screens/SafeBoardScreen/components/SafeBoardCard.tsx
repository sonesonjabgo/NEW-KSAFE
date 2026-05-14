import { FC } from "react"
import { View, TouchableOpacity, TextStyle, ViewStyle } from "react-native"
import { Pin, PencilLine, MapPin } from "lucide-react-native"

import { Text } from "@/components/Text"
import { typography } from "@/theme/typography"

import type { SafeBoardItem, ScopeType, StatusType } from "../types"

interface SafeBoardCardProps {
  item: SafeBoardItem
  showStatus?: boolean
  showEditIcon?: boolean
  showDivider?: boolean
}

const getScopeLabel = (scope: ScopeType): string => {
  const scopeMap: Record<ScopeType, string> = {
    company_wide: "회사전체",
    workplace: "사업장",
  }
  return scopeMap[scope]
}

const getScopeStyle = (scope: ScopeType): { borderColor: string; textColor: string } => {
  return scope === "company_wide"
    ? { borderColor: "#99C1F7", textColor: "#1260CE" }
    : { borderColor: "#F88526", textColor: "#F67229" }
}

const getStatusStyle = (): { borderColor: string; textColor: string } => {
  return { borderColor: "#BCBCBC", textColor: "#A7A7A7" }
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

export const SafeBoardCard: FC<SafeBoardCardProps> = ({
  item,
  showStatus = false,
  showEditIcon = false,
  showDivider = true,
}) => {
  const scopeStyle = getScopeStyle(item.scope)
  const statusLabel = getStatusLabel(item.status)
  const statusStyle = getStatusStyle()

  return (
    <TouchableOpacity activeOpacity={0.7}>
      <View style={$cardContainer}>
        <View style={$contentWrapper}>
          <View style={$mainContent}>
            <View style={$scopeLabelRow}>
              <View style={{ ...$scopeLabel, borderColor: scopeStyle.borderColor }}>
                <Text
                  text={getScopeLabel(item.scope)}
                  style={{ ...$scopeLabelText, color: scopeStyle.textColor }}
                />
              </View>
              {showStatus && statusLabel && (
                <View style={{ ...$scopeLabel, borderColor: statusStyle.borderColor }}>
                  <Text
                    text={statusLabel}
                    style={{ ...$scopeLabelText, color: statusStyle.textColor }}
                  />
                </View>
              )}
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

const $scopeLabel: ViewStyle = {
  paddingVertical: 3,
  paddingHorizontal: 8,
  borderRadius: 10,
  borderWidth: 1,
  justifyContent: "center",
  alignItems: "center",
}

const $scopeLabelText: TextStyle = {
  fontSize: 11,
  fontWeight: "700",
  fontFamily: typography.primary.bold,
  lineHeight: 13,
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
