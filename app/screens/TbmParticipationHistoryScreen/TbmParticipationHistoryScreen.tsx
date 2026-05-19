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
}

const StatCard: FC<StatCardProps> = ({ label, count }) => (
  <View style={$card}>
    <Text text={label} style={$cardLabel} />
    <Text
      text={translate("tbmParticipationHistoryScreen:countUnit", { count })}
      style={$cardCount}
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
  backgroundColor: "#FFFFFF",
  borderRadius: 12,
  borderWidth: 1,
  borderColor: "#E9ECF0",
  paddingVertical: 20,
  paddingHorizontal: 16,
  alignItems: "center",
  gap: 8,
}

const $cardLabel: TextStyle = {
  fontSize: 14,
  fontFamily: typography.primary.medium,
  color: colors.navy,
  textAlign: "center",
}

const $cardCount: TextStyle = {
  fontSize: 28,
  fontFamily: typography.primary.bold,
  color: colors.navy,
  textAlign: "center",
}
