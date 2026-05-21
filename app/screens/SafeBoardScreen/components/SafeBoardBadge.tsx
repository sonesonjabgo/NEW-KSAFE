import { FC } from "react"
import { View, ViewStyle, TextStyle } from "react-native"

import { Text } from "@/components/Text"
import { translate } from "@/i18n/translate"
import { typography } from "@/theme/typography"

export type SafeBoardBadgeType = "company_wide" | "workplace" | "draft" | "archived"

interface BadgeConfig {
  borderColor: string
  textColor: string
}

const BADGE_CONFIG: Record<SafeBoardBadgeType, BadgeConfig> = {
  company_wide: { borderColor: "#99C1F7", textColor: "#1260CE" },
  workplace: { borderColor: "#F88526", textColor: "#F67229" },
  draft: { borderColor: "#BCBCBC", textColor: "#A7A7A7" },
  archived: { borderColor: "#BCBCBC", textColor: "#A7A7A7" },
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
    <View style={[$badge, { borderColor: config.borderColor }]}>
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
  height: 20,
  borderWidth: 1,
  borderRadius: 10,
  justifyContent: "center",
  alignItems: "center",
  paddingHorizontal: 8,
}

const $badgeText: TextStyle = {
  fontSize: 11,
  fontFamily: typography.primary.bold,
  lineHeight: 14,
  includeFontPadding: false,
}
