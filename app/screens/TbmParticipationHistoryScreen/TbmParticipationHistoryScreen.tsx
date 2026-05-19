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
    <Text
      text={translate("tbmParticipationHistoryScreen:countUnit", { count })}
      style={[$cardCount, { color: countColor }]}
    />
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
  paddingHorizontal: 20,
  paddingTop: 20,
}

const $row: ViewStyle = {
  flexDirection: "row",
  gap: 12,
}

const $card: ViewStyle = {
  flex: 1,
  height: 88,
  backgroundColor: "#FFFFFF",
  borderRadius: 12,
  borderWidth: 1,
  borderColor: "#E9ECF0",
  padding: 15,
  alignItems: "center",
  justifyContent: "center",
  gap: 6,
}

const $cardLabel: TextStyle = {
  fontSize: 15,
  fontFamily: typography.primary.normal,
  color: "#574D4A",
  textAlign: "center",
}

const $cardCount: TextStyle = {
  fontSize: 26,
  fontFamily: typography.primary.bold,
  textAlign: "center",
}
