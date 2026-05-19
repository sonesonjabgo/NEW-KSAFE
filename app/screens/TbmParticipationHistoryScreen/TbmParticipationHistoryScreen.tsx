import { FC } from "react"
import { ScrollView, TouchableOpacity, View, ViewStyle, TextStyle } from "react-native"

import { StackScreen } from "@/components/StackScreen"
import { Text } from "@/components/Text"
import { translate } from "@/i18n/translate"
import { colors } from "@/theme/colors"
import { typography } from "@/theme/typography"
import type { AppStackScreenProps } from "@/navigators/navigationTypes"

const MOCK_TOTAL = 12
const MOCK_CAUTION = 3

interface TbmHistoryItem {
  id: number
  badge: string
  date: string
  title: string
  workplace: string
}

const mockHistoryData: TbmHistoryItem[] = [
  { id: 1, badge: "정상", date: "2026.02.19", title: "작업장 순회 점검", workplace: "광교 타워크레인 사업장" },
  { id: 2, badge: "정상", date: "2026.02.18", title: "전기설비 안전점검", workplace: "광교 타워크레인 사업장" },
  { id: 3, badge: "정상", date: "2026.02.17", title: "고소작업 안전교육", workplace: "광교 타워크레인 사업장" },
  { id: 4, badge: "정상", date: "2026.02.16", title: "화학물질 취급 안전점검", workplace: "광교 타워크레인 사업장" },
  { id: 5, badge: "정상", date: "2026.02.15", title: "비계 설치 작업 전 TBM", workplace: "광교 타워크레인 사업장" },
]

// ── StatCard ──────────────────────────────────────────────

interface StatCardProps {
  label: string
  count: number
  countColor?: string
}

const StatCard: FC<StatCardProps> = ({ label, count, countColor = "#252525" }) => (
  <View style={$statCard}>
    <Text text={label} style={$statLabel} />
    <View style={$countRow}>
      <Text text={String(count)} style={[$statCount, { color: countColor }]} />
      <Text text={translate("tbmParticipationHistoryScreen:unit")} style={$statUnit} />
    </View>
  </View>
)

// ── HistoryCard ───────────────────────────────────────────

interface HistoryCardProps {
  item: TbmHistoryItem
  onPress: () => void
}

const HistoryCard: FC<HistoryCardProps> = ({ item, onPress }) => (
  <TouchableOpacity style={$historyCard} activeOpacity={0.75} onPress={onPress}>
    <View style={$historyTop}>
      <View style={$badge}>
        <Text text={item.badge} style={$badgeText} />
      </View>
      <Text text={item.date} style={$historyDate} />
    </View>

    <Text text={item.title} style={$historyTitle} numberOfLines={2} />

    <View style={$historyDivider} />

    <View style={$historyBottom}>
      <Text text={translate("tbmParticipationHistoryScreen:workplaceLabel")} style={$workplaceLabel} />
      <Text text={item.workplace} style={$workplaceName} numberOfLines={1} />
    </View>
  </TouchableOpacity>
)

// ── Screen ────────────────────────────────────────────────

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
        <View style={$statRow}>
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
          {mockHistoryData.map((item) => (
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

// ── Styles ────────────────────────────────────────────────

const $scroll: ViewStyle = {
  flex: 1,
}

const $content: ViewStyle = {
  padding: 24,
}

const $statRow: ViewStyle = {
  flexDirection: "row",
  gap: 11,
}

const $statCard: ViewStyle = {
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

const $statLabel: TextStyle = {
  fontSize: 15,
  fontFamily: typography.primary.normal,
  color: "#574D4A",
}

const $countRow: ViewStyle = {
  flexDirection: "row",
  alignItems: "flex-end",
  gap: 4,
}

const $statCount: TextStyle = {
  fontSize: 26,
  lineHeight: 26,
  fontFamily: typography.primary.bold,
}

const $statUnit: TextStyle = {
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
  gap: 16,
}

const $historyTop: ViewStyle = {
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
}

const $badge: ViewStyle = {
  backgroundColor: "#CFFFE1",
  borderRadius: 4,
  paddingHorizontal: 8,
  paddingVertical: 2,
}

const $badgeText: TextStyle = {
  fontSize: 12,
  fontFamily: typography.primary.medium,
  color: "#18A24A",
}

const $historyDate: TextStyle = {
  fontSize: 12,
  fontFamily: typography.primary.normal,
  color: "#A9A9A9",
}

const $historyTitle: TextStyle = {
  fontSize: 16,
  fontFamily: typography.primary.bold,
  color: "#000000",
  flex: 1,
}

const $historyDivider: ViewStyle = {
  height: 1,
  backgroundColor: "#E9ECF0",
}

const $historyBottom: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
}

const $workplaceLabel: TextStyle = {
  fontSize: 12,
  fontFamily: typography.primary.medium,
  color: "#56524F",
}

const $workplaceName: TextStyle = {
  fontSize: 12,
  fontFamily: typography.primary.semiBold,
  color: "#2C2C2C",
}
