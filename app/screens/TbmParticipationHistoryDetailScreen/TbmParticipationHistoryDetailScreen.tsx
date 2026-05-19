import { FC } from "react"
import { ScrollView, TouchableOpacity, View, ViewStyle, TextStyle } from "react-native"
import { IconDownload } from "@tabler/icons-react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"

import EducationFrame from "@assets/icons/education_frame.svg"

import { StackScreen } from "@/components/StackScreen"
import { Text } from "@/components/Text"
import { translate } from "@/i18n/translate"
import { typography } from "@/theme/typography"
import type { AppStackScreenProps } from "@/navigators/navigationTypes"
import { mockTbmDetails } from "@/screens/TbmDetailScreen/mockData"
import * as S from "@/screens/TbmDetailScreen/styles"

interface HistoryDetail {
  participationDate: string
  workDate: string
  workplace: string
  managerName: string
}

const mockHistoryDetails: Record<number, HistoryDetail> = {
  1: { participationDate: "2026.02.19 08:30", workDate: "2026.02.19 09:00", workplace: "광교 타워크레인 사업장", managerName: "권 민수" },
  2: { participationDate: "2026.02.18 09:00", workDate: "2026.02.18 10:00", workplace: "광교 타워크레인 사업장", managerName: "권 민수" },
  3: { participationDate: "2026.02.17 07:45", workDate: "2026.02.17 08:30", workplace: "광교 타워크레인 사업장", managerName: "권 민수" },
  4: { participationDate: "2026.02.16 08:15", workDate: "2026.02.16 09:00", workplace: "광교 타워크레인 사업장", managerName: "권 민수" },
  5: { participationDate: "2026.02.15 09:30", workDate: "2026.02.15 10:00", workplace: "광교 타워크레인 사업장", managerName: "권 민수" },
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

  const tbm = mockTbmDetails[id]
  const history = mockHistoryDetails[id]

  if (!tbm || !history) return null

  return (
    <StackScreen
      title={translate("tbmDetailScreen:title")}
      onBack={() => navigation.goBack()}
      squareTop
      contentBg="#FFFFFF"
    >
      <ScrollView
        contentContainerStyle={[S.$scrollInner, { paddingBottom: (insets.bottom || 0) + 24 }]}
        showsVerticalScrollIndicator={false}
      >
        {/* ── 첫 번째 카드 ── */}
        <View style={S.$detailCard}>
          {/* 정보 카드 */}
          <View style={$infoCard}>
            <InfoRow
              label={translate("tbmParticipationHistoryDetailScreen:participationDate")}
              value={history.participationDate}
            />
            <InfoRow
              label={translate("tbmParticipationHistoryDetailScreen:workDate")}
              value={history.workDate}
            />
            <InfoRow
              label={translate("tbmParticipationHistoryDetailScreen:workplace")}
              value={history.workplace}
            />
          </View>

          {/* 진행 담당 프로필 */}
          <View style={$profileRow}>
            <View style={S.$cardAvatar} />
            <View style={$profileText}>
              <Text
                text={translate("tbmParticipationHistoryDetailScreen:manager")}
                style={$managerRole}
              />
              <Text text={history.managerName} style={$managerName} />
            </View>
          </View>
        </View>

        {/* ── 교육자료 섹션 ── */}
        <View style={S.$educationHeaderRow}>
          <Text
            text={translate("tbmDetailScreen:educationHeader", {
              count: tbm.educationMaterials.length,
            })}
            style={S.$educationSectionHeader}
          />
          <View style={S.$educationHeaderLine} />
        </View>
        {tbm.educationMaterials.map((item) => (
          <View key={item.id} style={S.$educationCard}>
            <View style={S.$educationIconCircle}>
              <EducationFrame width={18} height={18} color="#1062D8" />
            </View>
            <Text text={item.title} style={S.$educationCardTitle} numberOfLines={2} />
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => console.log("download:", item.id)}
            >
              <IconDownload size={20} color="#1062D8" />
            </TouchableOpacity>
          </View>
        ))}

        {/* ── 참여자 목록 섹션 ── */}
        <View style={S.$participantHeaderRow}>
          <Text
            text={translate("tbmDetailScreen:participantHeader", {
              count: tbm.participants.length,
            })}
            style={S.$participantSectionHeader}
          />
          <View style={S.$participantHeaderLine} />
        </View>
        {tbm.participants.length === 0 ? (
          <Text
            text={translate("tbmDetailScreen:participantEmpty")}
            style={S.$participantEmpty}
          />
        ) : (
          tbm.participants.map((p) => {
            const badge =
              p.badge === "정상"
                ? { bg: S.$participantBadgeNormal, text: S.$participantBadgeNormalText }
                : p.badge === "주의"
                  ? { bg: S.$participantBadgeCaution, text: S.$participantBadgeCautionText }
                  : { bg: S.$participantBadgeDanger, text: S.$participantBadgeDangerText }
            const key =
              p.badge === "정상"
                ? ("badgeNormal" as const)
                : p.badge === "주의"
                  ? ("badgeCaution" as const)
                  : ("badgeDanger" as const)
            return (
              <View key={p.id} style={S.$participantCard}>
                <Text text={p.name} style={S.$participantName} />
                <View style={badge.bg}>
                  <Text
                    text={translate(`tbmDetailScreen:${key}`)}
                    style={badge.text}
                  />
                </View>
                <Text text={p.time} style={S.$participantTime} />
              </View>
            )
          })
        )}
      </ScrollView>
    </StackScreen>
  )
}

// ── 첫 번째 카드 내부 전용 스타일 ──────────────────────────

const $infoCard: ViewStyle = {
  backgroundColor: "#F3F2F0",
  borderRadius: 10,
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
  gap: 12,
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
