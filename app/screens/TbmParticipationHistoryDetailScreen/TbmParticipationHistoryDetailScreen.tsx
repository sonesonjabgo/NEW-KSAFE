import { FC, useEffect } from "react"
import { Linking, ScrollView, TouchableOpacity, View, ViewStyle, TextStyle } from "react-native"
import { IconDownload } from "@tabler/icons-react-native"
import { format, parseISO } from "date-fns"
import { observer } from "mobx-react-lite"
import { useSafeAreaInsets } from "react-native-safe-area-context"

import EducationFrame from "@assets/icons/education_frame.svg"

import { StackScreen } from "@/components/StackScreen"
import { Text } from "@/components/Text"
import { translate } from "@/i18n/translate"
import { useStores } from "@/models"
import type { AppStackScreenProps } from "@/navigators/navigationTypes"
import * as S from "@/screens/TbmDetailScreen/styles"
import { typography } from "@/theme/typography"

function formatDateTime(iso?: string | null): string {
  if (!iso) return "-"
  try {
    return format(parseISO(iso), "yyyy.MM.dd HH:mm")
  } catch {
    return iso
  }
}

function formatDate(iso?: string | null): string {
  if (!iso) return "-"
  try {
    return format(parseISO(iso), "yyyy.MM.dd")
  } catch {
    return iso
  }
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

export const TbmParticipationHistoryDetailScreen: FC<Props> = observer(
  function TbmParticipationHistoryDetailScreen({ navigation, route }) {
    const { id } = route.params
    const insets = useSafeAreaInsets()
    const scrollPaddingBottom: ViewStyle = { paddingBottom: (insets.bottom || 0) + 24 }
    const { tbmStore } = useStores()

    useEffect(() => {
      tbmStore.fetchParticipationDetail(id)
      return () => {
        tbmStore.clearParticipationDetail()
      }
    }, [id, tbmStore])

    const detail = tbmStore.currentParticipationDetail

    if (!detail) return null

    const isNormal = detail.healthStatus === "normal"
    const badgeStyle = isNormal ? S.$badgeOngoing : S.$badgeDrafting
    const badgeTextStyle = isNormal ? S.$badgeOngoingText : S.$badgeDraftingText
    const badgeLabel = isNormal
      ? translate("tbmParticipationHistoryScreen:statusNormal")
      : translate("tbmParticipationHistoryScreen:statusAbnormal")

    return (
      <StackScreen
        title={translate("tbmDetailScreen:title")}
        onBack={() => navigation.goBack()}
        squareTop
        contentBg="#FFFFFF"
      >
        <ScrollView
          contentContainerStyle={[S.$scrollInner, $scrollGap, scrollPaddingBottom]}
          showsVerticalScrollIndicator={false}
        >
          {/* ── 첫 번째 카드 ── */}
          <View style={S.$detailCard}>
            {/* 뱃지 + 날짜 */}
            <View style={S.$cardTopRow}>
              <View style={badgeStyle}>
                <Text text={badgeLabel} style={badgeTextStyle} />
              </View>
              <Text text={formatDate(detail.participatedAt)} style={S.$cardDate} />
            </View>

            {/* 제목 */}
            <Text text={detail.activityTitle} style={S.$cardTitle} />

            {/* 정보 카드 */}
            <View style={$infoCard}>
              <InfoRow
                label={translate("tbmParticipationHistoryDetailScreen:participationDate")}
                value={formatDateTime(detail.participatedAt)}
              />
              <InfoRow
                label={translate("tbmParticipationHistoryDetailScreen:workDate")}
                value={formatDate(detail.workDate)}
              />
              <InfoRow
                label={translate("tbmParticipationHistoryDetailScreen:workplace")}
                value={detail.workplaceName}
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
                <Text text={detail.createdByName} style={$managerName} />
              </View>
            </View>
          </View>

          {/* ── 활동 내용 섹션 ── */}
          <View style={S.$educationHeaderRow}>
            <Text
              text={translate("tbmParticipationHistoryDetailScreen:activityContent")}
              style={S.$educationSectionHeader}
            />
            <View style={S.$educationHeaderLine} />
          </View>
          <View style={S.$educationCard} />

          {/* ── 교육자료 섹션 ── */}
          <View style={S.$educationHeaderRow}>
            <Text
              text={translate("tbmDetailScreen:educationHeader", {
                count: detail.materials.length,
              })}
              style={S.$educationSectionHeader}
            />
            <View style={S.$educationHeaderLine} />
          </View>
          <View style={$educationList}>
            {detail.materials.map((mat) => (
              <View key={mat.id} style={S.$educationCard}>
                <View style={S.$educationIconCircle}>
                  <EducationFrame width={18} height={18} color="#1062D8" />
                </View>
                <Text text={mat.title} style={S.$educationCardTitle} numberOfLines={2} />
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() => Linking.openURL(mat.fileUrl).catch(() => {})}
                >
                  <IconDownload size={20} color="#1062D8" />
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </ScrollView>
      </StackScreen>
    )
  },
)

// ── 첫 번째 카드 내부 전용 스타일 ──────────────────────────

const $educationList: ViewStyle = {
  gap: 15,
}

const $infoCard: ViewStyle = {
  backgroundColor: "#F3F2F0",
  borderRadius: 10,
  paddingHorizontal: 26,
  paddingVertical: 30,
  gap: 16,
}

const $infoRow: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
  gap: 16,
}

const $infoLabel: TextStyle = {
  fontSize: 14,
  fontFamily: typography.primary.normal,
  color: "#606060",
  width: 64,
}

const $infoValue: TextStyle = {
  fontSize: 14,
  fontFamily: typography.primary.medium,
  color: "#191015",
  flex: 1,
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

const $scrollGap: ViewStyle = { gap: 25 }
