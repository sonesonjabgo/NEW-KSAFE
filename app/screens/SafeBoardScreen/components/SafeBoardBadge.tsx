import { FC } from "react"
import { View, ViewStyle, TextStyle } from "react-native"

import { Text } from "@/components/Text"
import { translate } from "@/i18n/translate"
import { typography } from "@/theme/typography"

export type SafeBoardBadgeType = "company_wide" | "workplace" | "draft" | "archived"

interface BadgeConfig {
  bgColor: string
  textColor: string
}

const BADGE_CONFIG: Record<SafeBoardBadgeType, BadgeConfig> = {
  company_wide: { bgColor: "#E3F2FD", textColor: "#1447E6" },
  workplace: { bgColor: "#F4F2F1", textColor: "#564E4A" },
  draft: { bgColor: "#F4F2F1", textColor: "#564E4A" },
  archived: { bgColor: "#F4F2F1", textColor: "#564E4A" },
}

const BADGE_LABEL_KEYS: Record<SafeBoardBadgeType, string> = {
  company_wide: "safeBoardScreen:badge.companyWide",
  workplace: "safeBoardScreen:badge.workplace",
  draft: "safeBoardScreen:badge.draft",
  archived: "safeBoardScreen:badge.archived",
}

interface SafeBoardBadgeProps {
  type: SafeBoardBadgeType
}

export const SafeBoardBadge: FC<SafeBoardBadgeProps> = ({ type }) => {
  const config = BADGE_CONFIG[type]
  return (
    <View style={[$badge, { backgroundColor: config.bgColor }]}>
      <Text
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        text={translate(BADGE_LABEL_KEYS[type] as any)}
        style={[$badgeText, { color: config.textColor }]}
        numberOfLines={1}
      />
    </View>
  )
}

const $badge: ViewStyle = {
  height: 22,
  borderRadius: 11,
  justifyContent: "center",
  alignItems: "center",
  paddingHorizontal: 8,
  paddingVertical: 0,
  maxWidth: "100%",
  overflow: "hidden",
}

const $badgeText: TextStyle = {
  fontSize: 12,
  lineHeight: 16,
  fontFamily: typography.primary.bold,
  includeFontPadding: false,
  textAlignVertical: "center",
  transform: [{ translateY: 0 }],
}
