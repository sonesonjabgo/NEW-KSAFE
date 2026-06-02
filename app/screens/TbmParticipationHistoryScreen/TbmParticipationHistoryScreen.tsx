import { FC } from "react"
import { ScrollView, TouchableOpacity, View, ViewStyle, TextStyle } from "react-native"

import { StackScreen } from "@/components/StackScreen"
import { Text } from "@/components/Text"
import { translate } from "@/i18n/translate"
import type { AppStackScreenProps } from "@/navigators/navigationTypes"
import { colors } from "@/theme/colors"
import { typography } from "@/theme/typography"


interface TbmHistoryItem {
  id: number
  badge: string
  date: string
  title: string
  workplace: string
}

const mockHistoryData: TbmHistoryItem[] = [
  {
    id: 1,
    badge: "정상",
    date: "2026.02.19 08:30",
    title: "작업장 순회 점검",
    workplace: "광교 타워크레인 사업장",
  },
  {
    id: 2,
    badge: "정상",
    date: "2026.02.18 09:00",
    title: "전기설비 안전점검",
    workplace: "광교 타워크레인 사업장",
  },
  {
    id: 3,
    badge: "주의",
    date: "2026.02.17 07:45",
    title: "고소작업 안전교육",
    workplace: "광교 타워크레인 사업장",
  },
  {
    id: 4,
    badge: "정상",
    date: "2026.02.16 08:15",
    title: "화학물질 취급 안전점검",
    workplace: "광교 타워크레인 사업장",
  },
  {
    id: 5,
    badge: "정상",
    date: "2026.02.15 09:30",
    title: "비계 설치 작업 전 TBM",
    workplace: "광교 타워크레인 사업장",
  },
  {
    id: 6,
    badge: "주의",
    date: "2026.02.13 08:00",
    title: "중장비 운행 안전수칙 교육",
    workplace: "광교 타워크레인 사업장",
  },
  {
    id: 7,
    badge: "정상",
    date: "2026.02.12 09:15",
    title: "용접 작업 화재 예방 TBM",
    workplace: "서울 한강 레지던스 RC공사 현장",
  },
  {
    id: 8,
    badge: "정상",
    date: "2026.02.11 08:45",
    title: "굴착 작업 안전점검",
    workplace: "서울 한강 레지던스 RC공사 현장",
  },
  {
    id: 9,
    badge: "주의",
    date: "2026.02.10 07:30",
    title: "추락 방지 안전교육",
    workplace: "서울 한강 레지던스 RC공사 현장",
  },
  {
    id: 10,
    badge: "정상",
    date: "2026.02.07 09:00",
    title: "밀폐공간 작업 전 TBM",
    workplace: "부산 센텀 물류센터 현장",
  },
  {
    id: 11,
    badge: "정상",
    date: "2026.02.05 08:30",
    title: "지게차 운행 안전수칙",
    workplace: "부산 센텀 물류센터 현장",
  },
  {
    id: 12,
    badge: "정상",
    date: "2026.02.03 08:00",
    title: "작업 전 안전장비 점검 TBM",
    workplace: "부산 센텀 물류센터 현장",
  },
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

const BADGE_STYLE: Record<string, { bg: string; text: string }> = {
  정상: { bg: "#CFFFE1", text: "#18A24A" },
  주의: { bg: "#FFF6E6", text: "#D97706" },
}

const HistoryCard: FC<HistoryCardProps> = ({ item, onPress }) => {
  const badgeColor = BADGE_STYLE[item.badge] ?? BADGE_STYLE["정상"]
  return (
  <TouchableOpacity style={$historyCard} activeOpacity={0.75} onPress={onPress}>
    <View style={$historyTop}>
      <View style={[$badge, { backgroundColor: badgeColor.bg }]}>
        <Text text={item.badge} style={[$badgeText, { color: badgeColor.text }]} />
      </View>
      <Text text={item.date} style={$historyDate} />
    </View>

    <Text text={item.title} style={$historyTitle} numberOfLines={2} />

    <View style={$historyDivider} />

    <View style={$historyBottom}>
      <Text
        text={translate("tbmParticipationHistoryScreen:workplaceLabel")}
        style={$workplaceLabel}
      />
      <Text text={item.workplace} style={$workplaceName} numberOfLines={1} />
    </View>
  </TouchableOpacity>
  )
}

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
            count={mockHistoryData.length}
          />
          <StatCard
            label={translate("tbmParticipationHistoryScreen:cautionResponse")}
            count={mockHistoryData.filter((i) => i.badge === "주의").length}
            countColor={colors.blue}
          />
        </View>

        <View style={$historyList}>
          {mockHistoryData.map((item) => (
            <HistoryCard
              key={item.id}
              item={item}
              onPress={() => navigation.navigate("TbmParticipationHistoryDetail", { id: item.id })}
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
  alignItems: "baseline",
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
  backgroundColor: "#FFFFFF",
  borderRadius: 12,
  borderWidth: 1,
  borderColor: "#ECECEC",
  padding: 16,
  gap: 12,
}

const $historyTop: ViewStyle = {
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
}

const $badge: ViewStyle = {
  borderRadius: 4,
  paddingHorizontal: 8,
  paddingVertical: 2,
}

const $badgeText: TextStyle = {
  fontSize: 12,
  fontFamily: typography.primary.medium,
}

const $historyDate: TextStyle = {
  fontSize: 12,
  fontFamily: typography.primary.normal,
  color: "#A9A9A9",
}

const $historyTitle: TextStyle = {
  fontSize: 16,
  lineHeight: 22,
  fontFamily: typography.primary.bold,
  color: "#000000",
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
