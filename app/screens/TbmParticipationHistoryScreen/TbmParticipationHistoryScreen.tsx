import { FC } from "react"
import { View, ViewStyle, TextStyle } from "react-native"

import { StackScreen } from "@/components/StackScreen"
import { Text } from "@/components/Text"
import { translate } from "@/i18n/translate"
import { colors } from "@/theme/colors"
import { typography } from "@/theme/typography"
import type { AppStackScreenProps } from "@/navigators/navigationTypes"

const MOCK_TOTAL = 12
const MOCK_CAUTION = 3

interface StatCardProps {
  label: string
  count: number
  countColor?: string
}

const StatCard: FC<StatCardProps> = ({ label, count, countColor = "#252525" }) => (
  <View style={$card}>
    <Text text={label} style={$cardLabel} />
    <View style={$countRow}>
      <Text text={String(count)} style={[$cardCount, { color: countColor }]} />
      <Text text={translate("tbmParticipationHistoryScreen:unit")} style={$cardUnit} />
    </View>
  </View>
)

type TbmParticipationHistoryScreenProps = AppStackScreenProps<"TbmParticipationHistory">

export const TbmParticipationHistoryScreen: FC<TbmParticipationHistoryScreenProps> = ({
  navigation,
}) => {
  return (
    <StackScreen
      title={translate("tbmParticipationHistoryScreen:title")}
      onBack={() => navigation.goBack()}
      squareTop
      contentBg="#FFFFFF"
    >
      <View style={$content}>
        <View style={$row}>
          <StatCard
            label={translate("tbmParticipationHistoryScreen:totalParticipation")}
            count={MOCK_TOTAL}
          />
          <StatCard
            label={translate("tbmParticipationHistoryScreen:cautionResponse")}
            count={MOCK_CAUTION}
            countColor={colors.blue}
          />
        </View>
      </View>
    </StackScreen>
  )
}

const $content: ViewStyle = {
  flex: 1,
  padding: 16,
  paddingTop: 24,
}

const $row: ViewStyle = {
  flexDirection: "row",
  gap: 11,
}

const $card: ViewStyle = {
  flex: 1,
  height: 88,
  backgroundColor: "#FFFFFF",
  borderRadius: 12,
  borderWidth: 1,
  borderColor: "#ECECEC",
  padding: 15,
  alignItems: "flex-start",
  justifyContent: "center",
  gap: 6,
}

const $cardLabel: TextStyle = {
  fontSize: 15,
  fontFamily: typography.primary.normal,
  color: "#574D4A",
  textAlign: "left",
}

const $countRow: ViewStyle = {
  flexDirection: "row",
  alignItems: "flex-end",
  gap: 4,
}

const $cardCount: TextStyle = {
  fontSize: 26,
  lineHeight: 26,
  fontFamily: typography.primary.bold,
  textAlign: "left",
}

const $cardUnit: TextStyle = {
  fontSize: 15,
  lineHeight: 15,
  fontFamily: typography.primary.normal,
  color: "#574D4A",
}
