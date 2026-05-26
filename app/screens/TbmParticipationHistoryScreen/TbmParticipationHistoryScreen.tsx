import { FC, useCallback } from "react"
import { ScrollView, TouchableOpacity, View, ViewStyle, TextStyle } from "react-native"
import { useFocusEffect } from "@react-navigation/native"
import { format, parseISO } from "date-fns"
import { observer } from "mobx-react-lite"

import { StackScreen } from "@/components/StackScreen"
import { Text } from "@/components/Text"
import { translate } from "@/i18n/translate"
import { useStores } from "@/models"
import type { AppStackScreenProps } from "@/navigators/navigationTypes"
import { colors } from "@/theme/colors"
import { typography } from "@/theme/typography"

function formatDateTime(iso?: string | null): string {
  if (!iso) return "-"
  try {
    return format(parseISO(iso), "yyyy.MM.dd HH:mm")
  } catch {
    return iso
  }
}

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
  id: string
  badge: string
  badgeIsNormal: boolean
  date: string
  title: string
  workplace: string
  onPress: () => void
}

const HistoryCard: FC<HistoryCardProps> = ({ badge, badgeIsNormal, date, title, workplace, onPress }) => (
  <TouchableOpacity style={$historyCard} activeOpacity={0.75} onPress={onPress}>
    <View style={$historyTop}>
      <View style={[[$badge, !badgeIsNormal && $badgeCaution]]}>
        <Text text={badge} style={[$badgeText, !badgeIsNormal && $badgeCautionText]} />
      </View>
      <Text text={date} style={$historyDate} />
    </View>

    <Text text={title} style={$historyTitle} numberOfLines={2} />

    <View style={$historyDivider} />

    <View style={$historyBottom}>
      <Text
        text={translate("tbmParticipationHistoryScreen:workplaceLabel")}
        style={$workplaceLabel}
      />
      <Text text={workplace} style={$workplaceName} numberOfLines={1} />
    </View>
  </TouchableOpacity>
)

// ── Screen ────────────────────────────────────────────────

type TbmParticipationHistoryScreenProps = AppStackScreenProps<"TbmParticipationHistory">

export const TbmParticipationHistoryScreen: FC<TbmParticipationHistoryScreenProps> = observer(
  function TbmParticipationHistoryScreen({ navigation }) {
    const { tbmStore } = useStores()

    useFocusEffect(
      useCallback(() => {
        tbmStore.getParticipations()
      }, [tbmStore]),
    )

    const totalCount = tbmStore.participations.length
    const cautionCount = tbmStore.participations.filter((p) => p.healthStatus === "abnormal").length

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
              count={totalCount}
            />
            <StatCard
              label={translate("tbmParticipationHistoryScreen:cautionResponse")}
              count={cautionCount}
              countColor={colors.blue}
            />
          </View>

          <View style={$historyList}>
            {tbmStore.participations.map((item) => (
              <HistoryCard
                key={item.id}
                id={item.id}
                badge={
                  item.healthStatus === "normal"
                    ? translate("tbmParticipationHistoryScreen:statusNormal")
                    : translate("tbmParticipationHistoryScreen:statusAbnormal")
                }
                badgeIsNormal={item.healthStatus === "normal"}
                date={formatDateTime(item.participatedAt)}
                title={item.activityTitle}
                workplace={item.workplaceName}
                onPress={() =>
                  navigation.navigate("TbmParticipationHistoryDetail", { id: item.id })
                }
              />
            ))}
          </View>
        </ScrollView>
      </StackScreen>
    )
  },
)

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

const $badgeCaution: ViewStyle = {
  backgroundColor: "#FFF3CD",
}

const $badgeText: TextStyle = {
  fontSize: 12,
  fontFamily: typography.primary.medium,
  color: "#18A24A",
}

const $badgeCautionText: TextStyle = {
  color: "#F7A733",
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
