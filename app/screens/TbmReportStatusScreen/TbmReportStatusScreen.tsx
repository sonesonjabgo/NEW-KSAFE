import { FC } from "react"
import { ScrollView, TouchableOpacity, View, TextStyle } from "react-native"
import { IconCalendar } from "@tabler/icons-react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"

import { StackScreen } from "@/components/StackScreen"
import { Text } from "@/components/Text"
import { translate } from "@/i18n/translate"
import { mockTbmReports } from "@/screens/TbmReportInquiryScreen/mockData"
import type { TbmReportStatus } from "@/screens/TbmReportInquiryScreen/types"
import { typography } from "@/theme/typography"

import * as S from "./styles"
import type { TbmReportStatusScreenProps } from "./types"

function getBadgeStyles(status: TbmReportStatus) {
  if (status === "requested") return { badge: S.$badgeRequested, text: S.$badgeRequestedText }
  if (status === "generating") return { badge: S.$badgeGenerating, text: S.$badgeGeneratingText }
  if (status === "completed") return { badge: S.$badgeCompleted, text: S.$badgeCompletedText }
  return { badge: S.$badgeFailed, text: S.$badgeFailedText }
}

export const TbmReportStatusScreen: FC<TbmReportStatusScreenProps> = ({ navigation, route }) => {
  const { id } = route.params
  const insets = useSafeAreaInsets()

  const detail = mockTbmReports.find((r) => r.id === id)

  const handleRegenerate = () => {
    console.log("보고서 재생성 요청:", id)
  }

  if (!detail) return null

  const badgeStyles = getBadgeStyles(detail.status)

  return (
    <StackScreen
      title={translate("tbmReportStatusScreen:title")}
      onBack={() => navigation.goBack()}
      squareTop
      contentBg="#FFFFFF"
      rightSlot={
        <TouchableOpacity onPress={handleRegenerate} activeOpacity={0.7}>
          <Text text={translate("tbmReportStatusScreen:regenerate")} style={$regenerateText} />
        </TouchableOpacity>
      }
    >
      <ScrollView
        contentContainerStyle={[S.$scrollInner, { paddingBottom: (insets.bottom || 0) + 24 }]}
        showsVerticalScrollIndicator={false}
      >
        {/* ── 1. 보고서 정보 섹션 ── */}
        <View style={S.$sectionHeaderRow}>
          <Text text={translate("tbmReportStatusScreen:sectionReportInfo")} style={S.$sectionTitle} />
          <View style={S.$sectionHeaderLine} />
        </View>

        <View style={S.$detailCard}>
          <View style={S.$cardTopRow}>
            <View style={badgeStyles.badge}>
              <Text
                text={translate(`tbmReportInquiryScreen:tabs.${detail.status}`)}
                style={badgeStyles.text}
              />
            </View>
            <Text text={detail.date} style={S.$cardDate} />
          </View>

          <Text text={detail.title} style={S.$cardTitle} />

          {detail.workDate && (
            <View style={S.$cardWorkDateRow}>
              <IconCalendar size={20} color="#6B7281" />
              <Text
                text={translate("tbmDetailScreen:workDate", { date: detail.workDate })}
                style={S.$cardWorkDate}
              />
            </View>
          )}

          <View style={S.$cardAuthorRow}>
            <View style={S.$cardAvatar} />
            <View>
              <Text text={detail.author} style={S.$cardAuthorName} />
              <Text text={detail.location} style={S.$cardAuthorLocation} />
            </View>
          </View>

          <View style={S.$cardDivider} />

          <Text text={translate("tbmDetailScreen:activityLabel")} style={S.$activityLabel} />
          <Text text={detail.activityContent} style={S.$activityContent} />
        </View>

        {/* ── 2. 처리 상태 섹션 ── */}
        <View style={S.$sectionHeaderRow}>
          <Text text={translate("tbmReportStatusScreen:sectionProcessStatus")} style={S.$sectionTitle} />
          <View style={S.$sectionHeaderLine} />
        </View>

        <View style={S.$processCard}>
          <Text
            text={translate(`tbmReportInquiryScreen:tabs.${detail.status}`)}
            style={S.$processStatusText}
          />
        </View>

        {/* ── 3. 상태 이력 섹션 ── */}
        <View style={S.$sectionHeaderRow}>
          <Text text={translate("tbmReportStatusScreen:sectionStatusHistory")} style={S.$sectionTitle} />
          <View style={S.$sectionHeaderLine} />
        </View>

        <View style={S.$historyCard}>
          {detail.history?.map((h, i) => (
            <View key={i} style={S.$historyItem}>
              <View style={S.$historyTimeline}>
                <View style={S.$historyDot} />
                {i < (detail.history?.length || 0) - 1 && <View style={S.$historyLine} />}
              </View>
              <View style={S.$historyContent}>
                <View style={S.$historyTop}>
                  <Text
                    text={translate(`tbmReportInquiryScreen:tabs.${h.status}`)}
                    style={S.$historyStatus}
                  />
                  <Text text={h.time} style={S.$historyTime} />
                </View>
                {h.description && <Text text={h.description} style={S.$historyDesc} />}
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </StackScreen>
  )
}

const $regenerateText: TextStyle = {
  fontSize: 16,
  fontFamily: typography.primary.medium,
  color: "#FFFFFF",
}
