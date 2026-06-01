import { FC } from "react"
import { ScrollView, TouchableOpacity, View } from "react-native"
import { IconDownload } from "@tabler/icons-react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"

import { StackScreen } from "@/components/StackScreen"
import { Text } from "@/components/Text"
import { translate } from "@/i18n/translate"
import { mockTbmReports } from "@/screens/TbmReportInquiryScreen/mockData"
import type { TbmReportStatus } from "@/screens/TbmReportInquiryScreen/types"
import { downloadTbmAttachment } from "@/utils/downloadTbmAttachment"

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

  if (!detail) return null

  const badgeStyles = getBadgeStyles(detail.status)
  const emptyLabel = "-"

  const processStatusKey = {
    requested: "processStatusRequested",
    generating: "processStatusGenerating",
    completed: "processStatusCompleted",
    failed: "processStatusFailed",
  } as const

  return (
    <>
      <StackScreen
        title={translate("tbmReportStatusScreen:title")}
        onBack={() => navigation.goBack()}
        squareTop
        contentBg="#FFFFFF"
      >
        <ScrollView contentContainerStyle={S.$scrollInner} showsVerticalScrollIndicator={false}>
          {/* ── 1. 보고서 정보 섹션 ── */}
          <View style={S.$sectionHeaderRow}>
            <Text
              text={translate("tbmReportStatusScreen:sectionReportInfo")}
              style={S.$sectionTitle}
            />
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

            <View style={S.$cardInfoRow}>
              <Text
                text={`${translate("tbmReportStatusScreen:processName")} :`}
                style={S.$cardInfoLabel}
              />
              <Text text={detail.processName ?? emptyLabel} style={S.$cardInfoValue} />
            </View>

            <View style={S.$cardInfoRow}>
              <Text
                text={`${translate("tbmReportStatusScreen:teamName")} :`}
                style={S.$cardInfoLabel}
              />
              <Text text={detail.teamName ?? emptyLabel} style={S.$cardInfoValue} />
            </View>
          </View>

          {/* ── 2. 처리 상태 섹션 ── */}
          <View style={S.$sectionHeaderRow}>
            <Text
              text={translate("tbmReportStatusScreen:sectionProcessStatus")}
              style={S.$sectionTitle}
            />
            <View style={S.$sectionHeaderLine} />
          </View>

          <View style={S.$processCard}>
            <Text
              text={translate(`tbmReportStatusScreen:${processStatusKey[detail.status]}`)}
              style={S.$processCardText}
            />
          </View>

          {/* ── 실패 사유 섹션 ── */}
          {detail.status === "failed" && detail.failureReason && (
            <>
              <View style={S.$sectionHeaderRow}>
                <Text
                  text={translate("tbmReportStatusScreen:sectionFailureReason")}
                  style={S.$sectionTitle}
                />
                <View style={S.$sectionHeaderLine} />
              </View>
              <View style={S.$failureReasonCard}>
                <Text text={detail.failureReason} style={S.$failureReasonText} />
              </View>
            </>
          )}

          {/* ── 3. 상태 이력 섹션 ── */}
          <View style={S.$sectionHeaderRow}>
            <Text
              text={translate("tbmReportStatusScreen:sectionStatusHistory")}
              style={S.$sectionTitle}
            />
            <View style={S.$sectionHeaderLine} />
          </View>

          <View style={S.$historyCard}>
            <View style={S.$historyRow}>
              <Text
                text={`${translate("tbmReportStatusScreen:historyRequestedAt")} :`}
                style={S.$historyLabel}
              />
              <Text
                text={detail.requestedAt ?? emptyLabel}
                style={detail.requestedAt ? S.$historyValue : S.$historyValueEmpty}
              />
            </View>

            <View style={S.$historyRow}>
              <Text
                text={`${translate("tbmReportStatusScreen:historyStartedAt")} :`}
                style={S.$historyLabel}
              />
              <Text
                text={detail.startedAt ?? emptyLabel}
                style={detail.startedAt ? S.$historyValue : S.$historyValueEmpty}
              />
            </View>

            <View style={S.$historyRow}>
              <Text
                text={`${translate("tbmReportStatusScreen:historyCompletedAt")} :`}
                style={S.$historyLabel}
              />
              <Text
                text={detail.completedAt ?? emptyLabel}
                style={detail.completedAt ? S.$historyValue : S.$historyValueEmpty}
              />
            </View>
          </View>
        </ScrollView>

        {/* ── 하단 버튼 영역 ── */}
        <View style={S.$bottomDivider} />
        <View style={[S.$bottomBar, { paddingBottom: (insets.bottom || 0) + 16 }]}>
          <TouchableOpacity
            style={S.$pdfButton}
            onPress={() => downloadTbmAttachment()}
            activeOpacity={0.8}
          >
            <IconDownload size={20} color="#FFFFFF" />
            <Text text={translate("tbmReportStatusScreen:downloadPdf")} style={S.$pdfButtonText} />
          </TouchableOpacity>
        </View>
      </StackScreen>
    </>
  )
}
