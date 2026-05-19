import { FC } from "react"
import { ScrollView, View, ViewStyle, TextStyle } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"

import { StackScreen } from "@/components/StackScreen"
import { Text } from "@/components/Text"
import { translate } from "@/i18n/translate"
import { typography } from "@/theme/typography"
import type { AppStackScreenProps } from "@/navigators/navigationTypes"

interface TbmParticipationHistoryDetail {
  id: number
  participationDate: string
  workDate: string
  workplace: string
  title: string
  managerName: string
}

const mockDetails: Record<number, TbmParticipationHistoryDetail> = {
  1: { id: 1, participationDate: "2026.02.19 08:30", workDate: "2026.02.19 09:00", workplace: "광교 타워크레인 사업장", title: "작업장 순회 점검", managerName: "권 민수" },
  2: { id: 2, participationDate: "2026.02.18 09:00", workDate: "2026.02.18 10:00", workplace: "광교 타워크레인 사업장", title: "전기설비 안전점검", managerName: "권 민수" },
  3: { id: 3, participationDate: "2026.02.17 07:45", workDate: "2026.02.17 08:30", workplace: "광교 타워크레인 사업장", title: "고소작업 안전교육", managerName: "권 민수" },
  4: { id: 4, participationDate: "2026.02.16 08:15", workDate: "2026.02.16 09:00", workplace: "광교 타워크레인 사업장", title: "화학물질 취급 안전점검", managerName: "권 민수" },
  5: { id: 5, participationDate: "2026.02.15 09:30", workDate: "2026.02.15 10:00", workplace: "광교 타워크레인 사업장", title: "비계 설치 작업 전 TBM", managerName: "권 민수" },
}

interface InfoRowProps {
  label: string
  value: string
}

const InfoRow: FC<InfoRowProps> = ({ label, value }) => (
  <View style={$infoRow}>
    <Text text={label} style={$infoLabel} />
    <Text text={value} style={$infoValue} numberOfLines={1} />
  </View>
)

type Props = AppStackScreenProps<"TbmParticipationHistoryDetail">

export const TbmParticipationHistoryDetailScreen: FC<Props> = ({ navigation, route }) => {
  const { id } = route.params
  const insets = useSafeAreaInsets()
  const detail = mockDetails[id]

  if (!detail) return null

  return (
    <StackScreen
      title={translate("tbmDetailScreen:title")}
      onBack={() => navigation.goBack()}
      squareTop
      contentBg="#FFFFFF"
    >
      <ScrollView
        contentContainerStyle={[$scroll, { paddingBottom: (insets.bottom || 0) + 24 }]}
        showsVerticalScrollIndicator={false}
      >
        {/* ── 정보 카드 ── */}
        <View style={$infoCard}>
          <InfoRow
            label={translate("tbmParticipationHistoryDetailScreen:participationDate")}
            value={detail.participationDate}
          />
          <InfoRow
            label={translate("tbmParticipationHistoryDetailScreen:workDate")}
            value={detail.workDate}
          />
          <InfoRow
            label={translate("tbmParticipationHistoryDetailScreen:workplace")}
            value={detail.workplace}
          />
        </View>

        {/* ── 진행 담당 ── */}
        <View style={$profileRow}>
          <View style={$avatar} />
          <View style={$profileText}>
            <Text
              text={translate("tbmParticipationHistoryDetailScreen:manager")}
              style={$managerRole}
            />
            <Text text={detail.managerName} style={$managerName} />
          </View>
        </View>
      </ScrollView>
    </StackScreen>
  )
}

const $scroll: ViewStyle = {
  padding: 20,
}

const $infoCard: ViewStyle = {
  backgroundColor: "#F3F2F0",
  borderRadius: 12,
  paddingHorizontal: 26,
  paddingVertical: 30,
  gap: 16,
}

const $infoRow: ViewStyle = {
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
}

const $infoLabel: TextStyle = {
  fontSize: 14,
  fontFamily: typography.primary.normal,
  color: "#606060",
}

const $infoValue: TextStyle = {
  fontSize: 14,
  fontFamily: typography.primary.medium,
  color: "#191015",
  flexShrink: 1,
  textAlign: "right",
  marginLeft: 12,
}

const $profileRow: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
  marginTop: 20,
  gap: 12,
}

const $avatar: ViewStyle = {
  width: 44,
  height: 44,
  borderRadius: 22,
  backgroundColor: "#D9D9D9",
}

const $profileText: ViewStyle = {
  gap: 2,
}

const $managerRole: TextStyle = {
  fontSize: 15,
  fontFamily: typography.primary.normal,
  color: "#574D4A",
}

const $managerName: TextStyle = {
  fontSize: 15,
  fontFamily: typography.primary.bold,
  color: "#252525",
}
