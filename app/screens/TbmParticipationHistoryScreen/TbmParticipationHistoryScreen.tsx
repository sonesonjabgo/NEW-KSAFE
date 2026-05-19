import { FC } from "react"
import { ScrollView, TouchableOpacity, View, ViewStyle, TextStyle } from "react-native"

import { StackScreen } from "@/components/StackScreen"
import { Text } from "@/components/Text"
import { translate } from "@/i18n/translate"
import { colors } from "@/theme/colors"
import { typography } from "@/theme/typography"
import type { AppStackScreenProps } from "@/navigators/navigationTypes"
import { mockTbmData } from "@/screens/TbmListScreen/mockData"
import type { TbmItem } from "@/screens/TbmListScreen/types"

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

interface HistoryCardProps {
  item: TbmItem
  onPress: () => void
}

const HistoryCard: FC<HistoryCardProps> = ({ item, onPress }) => (
  <TouchableOpacity style={$historyCard} activeOpacity={0.75} onPress={onPress}>
    <View style={$historyCardTop}>
      <Text text={item.date} style={$historyDate} />
      <Text
        text={translate("tbmListScreen:participants", { count: item.participants })}
        style={$historyParticipants}
      />
    </View>
    <Text text={item.title} style={$historyTitle} numberOfLines={2} />
    <View style={$historyDivider} />
    <Text text={item.location} style={$historyLocation} numberOfLines={1} />
  </TouchableOpacity>
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
      <ScrollView
        style={$scroll}
        contentContainerStyle={$content}
        showsVerticalScrollIndicator={false}
      >
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

        <View style={$historyList}>
          {mockTbmData.map((item) => (
            <HistoryCard
              key={item.id}
              item={item}
              onPress={() => navigation.navigate("TbmDetail", { id: item.id })}
            />
          ))}
        </View>
      </ScrollView>
    </StackScreen>
  )
}

const $scroll: ViewStyle = {
  flex: 1,
}

const $content: ViewStyle = {
  padding: 24,
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

const $historyList: ViewStyle = {
  marginTop: 25,
  gap: 12,
}

const $historyCard: ViewStyle = {
  height: 150,
  backgroundColor: "#FFFFFF",
  borderRadius: 12,
  borderWidth: 1,
  borderColor: "#ECECEC",
  padding: 16,
  justifyContent: "space-between",
}

const $historyCardTop: ViewStyle = {
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
}

const $historyDate: TextStyle = {
  fontSize: 13,
  fontFamily: typography.primary.normal,
  color: "#979797",
}

const $historyParticipants: TextStyle = {
  fontSize: 13,
  fontFamily: typography.primary.normal,
  color: "#979797",
}

const $historyTitle: TextStyle = {
  fontSize: 16,
  fontFamily: typography.primary.bold,
  color: "#252525",
  marginTop: 8,
}

const $historyDivider: ViewStyle = {
  height: 1,
  backgroundColor: "#ECECEC",
}

const $historyLocation: TextStyle = {
  fontSize: 13,
  fontFamily: typography.primary.normal,
  color: "#979797",
}
