import { FC, useCallback, useEffect, useState } from "react"
import { Linking, ScrollView, TextInput, TouchableOpacity, View, TextStyle } from "react-native"
import { IconAlertTriangle, IconCheck, IconDownload, IconRefresh } from "@tabler/icons-react-native"
import { format, parseISO } from "date-fns"
import { observer } from "mobx-react-lite"
import { useSafeAreaInsets } from "react-native-safe-area-context"

import { StackScreen } from "@/components/StackScreen"
import { Text } from "@/components/Text"
import { Toast } from "@/components/Toast"
import { translate } from "@/i18n/translate"
import { useStores } from "@/models"
import type { TbmReportStatus } from "@/screens/TbmReportInquiryScreen/types"
import { typography } from "@/theme/typography"

import * as S from "./styles"
import type { TbmReportStatusScreenProps } from "./types"

const API_STATUS_MAP: Record<"pending" | "processing" | "completed" | "failed", TbmReportStatus> = {
  pending: "requested",
  processing: "generating",
  completed: "completed",
  failed: "failed",
}

function getBadgeStyles(status: TbmReportStatus) {
  if (status === "requested") return { badge: S.$badgeRequested, text: S.$badgeRequestedText }
  if (status === "generating") return { badge: S.$badgeGenerating, text: S.$badgeGeneratingText }
  if (status === "completed") return { badge: S.$badgeCompleted, text: S.$badgeCompletedText }
  return { badge: S.$badgeFailed, text: S.$badgeFailedText }
}

function formatDateStr(isoString?: string | null): string {
  if (!isoString) return ""
  try {
    return format(parseISO(isoString), "yyyy.MM.dd HH:mm")
  } catch {
    return isoString
  }
}

export const TbmReportStatusScreen: FC<TbmReportStatusScreenProps> = observer(
  function TbmReportStatusScreen({ navigation, route }) {
    const { id } = route.params
    const insets = useSafeAreaInsets()
    const { tbmAdminStore } = useStores()

    const [isRegenerateVisible, setIsRegenerateVisible] = useState(false)
    const [isRefreshMode, setIsRefreshMode] = useState(false)
    const [regenerateProcessName, setRegenerateProcessName] = useState("")
    const [regenerateTeamName, setRegenerateTeamName] = useState("")
    const [toastVisible, setToastVisible] = useState(false)

    useEffect(() => {
      tbmAdminStore.fetchReportJobStatus(id)
      return () => {
        tbmAdminStore.clearCurrentReportJob()
      }
    }, [id, tbmAdminStore])

    const job = tbmAdminStore.currentReportJob
    const uiStatus = job ? (API_STATUS_MAP[job.status as keyof typeof API_STATUS_MAP] ?? "requested") : "requested"

    const handleRegenerate = () => {
      setIsRegenerateVisible((prev) => !prev)
    }

    const handleDownloadPdf = useCallback(async () => {
      const url = job?.resultFileUrl
      if (url) {
        try {
          await Linking.openURL(url)
        } catch {
          // handle error silently
        }
      }
    }, [job])

    const handleRequestRegenerate = useCallback(async () => {
      try {
        await tbmAdminStore.regenerateReportJob(id, {
          processName: regenerateProcessName || undefined,
          teamName: regenerateTeamName || undefined,
        })
        setIsRegenerateVisible(false)
        setIsRefreshMode(true)
        setToastVisible(true)
      } catch {
        // error handled in store
      }
    }, [id, regenerateProcessName, regenerateTeamName, tbmAdminStore])

    const handleRefresh = useCallback(() => {
      tbmAdminStore.fetchReportJobStatus(id)
    }, [id, tbmAdminStore])

    if (!job) return null

    const badgeStyles = getBadgeStyles(uiStatus)
    const emptyLabel = "-"

    return (
      <>
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
                    text={translate(`tbmReportInquiryScreen:tabs.${uiStatus}`)}
                    style={badgeStyles.text}
                  />
                </View>
                <Text text={formatDateStr(job.createdAt)} style={S.$cardDate} />
              </View>

              <View style={S.$cardInfoRow}>
                <Text
                  text={`${translate("tbmReportStatusScreen:processName")} :`}
                  style={S.$cardInfoLabel}
                />
                <Text text={job.processName ?? emptyLabel} style={S.$cardInfoValue} />
              </View>

              <View style={S.$cardInfoRow}>
                <Text
                  text={`${translate("tbmReportStatusScreen:teamName")} :`}
                  style={S.$cardInfoLabel}
                />
                <Text text={job.teamName ?? emptyLabel} style={S.$cardInfoValue} />
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

            <View style={S.$processCard} />

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
                  text={formatDateStr(job.createdAt) || emptyLabel}
                  style={job.createdAt ? S.$historyValue : S.$historyValueEmpty}
                />
              </View>

              <View style={S.$historyRow}>
                <Text
                  text={`${translate("tbmReportStatusScreen:historyStartedAt")} :`}
                  style={S.$historyLabel}
                />
                <Text
                  text={formatDateStr(job.startedAt) || emptyLabel}
                  style={job.startedAt ? S.$historyValue : S.$historyValueEmpty}
                />
              </View>

              <View style={S.$historyRow}>
                <Text
                  text={`${translate("tbmReportStatusScreen:historyCompletedAt")} :`}
                  style={S.$historyLabel}
                />
                <Text
                  text={formatDateStr(job.completedAt) || emptyLabel}
                  style={job.completedAt ? S.$historyValue : S.$historyValueEmpty}
                />
              </View>
            </View>

            {/* ── 4. 보고서 재생성 섹션 ── */}
            {isRegenerateVisible && (
              <>
                <View style={S.$sectionHeaderRow}>
                  <Text
                    text={translate("tbmReportStatusScreen:sectionRegenerate")}
                    style={S.$sectionTitle}
                  />
                  <View style={S.$sectionHeaderLine} />
                </View>

                <View style={S.$regenContainer}>
                  {/* 정보 카드 */}
                  <View style={S.$regenInfoCard}>
                    <View style={S.$regenInfoIconCircle}>
                      <Text text="!" style={S.$regenInfoIconText} />
                    </View>
                    <Text
                      text={translate("tbmReportStatusScreen:regenerateInfoText")}
                      style={S.$regenInfoText}
                    />
                  </View>

                  {/* 섹션 1 – 공정명 */}
                  <View style={S.$regenSection}>
                    <Text
                      text={translate("tbmReportStatusScreen:processNameLabel")}
                      style={S.$regenSectionLabel}
                    />
                    <View style={S.$regenInputContainer}>
                      <TextInput
                        style={S.$regenInputText}
                        value={regenerateProcessName}
                        onChangeText={(t) => setRegenerateProcessName(t.slice(0, 50))}
                        placeholder={translate("tbmReportStatusScreen:processNamePlaceholder")}
                        placeholderTextColor="#979797"
                        maxLength={50}
                      />
                    </View>
                    <Text
                      text={translate("tbmReportStatusScreen:inputDescription")}
                      style={S.$regenInputDescription}
                    />
                  </View>

                  {/* 섹션 2 – 팀/반명 */}
                  <View style={S.$regenSection}>
                    <Text
                      text={translate("tbmReportStatusScreen:teamNameLabel")}
                      style={S.$regenSectionLabel}
                    />
                    <View style={S.$regenInputContainer}>
                      <TextInput
                        style={S.$regenInputText}
                        value={regenerateTeamName}
                        onChangeText={(t) => setRegenerateTeamName(t.slice(0, 50))}
                        placeholder={translate("tbmReportStatusScreen:teamNamePlaceholder")}
                        placeholderTextColor="#979797"
                        maxLength={50}
                      />
                    </View>
                    <Text
                      text={translate("tbmReportStatusScreen:inputDescription")}
                      style={S.$regenInputDescription}
                    />
                  </View>

                  {/* 주의사항 카드 */}
                  <View style={S.$regenCautionCard}>
                    <View style={S.$regenCautionRow}>
                      <View style={S.$regenCautionIconWrap}>
                        <IconAlertTriangle size={22} color="#F7A733" />
                      </View>
                      <Text
                        text={[
                          `· ${translate("tbmReportStatusScreen:cautionItem1")}`,
                          `· ${translate("tbmReportStatusScreen:cautionItem2")}`,
                          `· ${translate("tbmReportStatusScreen:cautionItem3")}`,
                        ].join("\n")}
                        style={S.$regenCautionDesc}
                      />
                    </View>
                  </View>
                </View>
              </>
            )}
          </ScrollView>

          {/* ── 하단 버튼 영역 ── */}
          <View style={S.$bottomDivider} />
          <View style={[S.$bottomBar, { paddingBottom: (insets.bottom || 0) + 16 }]}>
            {isRegenerateVisible && (
              <Text
                text={translate("tbmReportStatusScreen:regenerateNote")}
                style={S.$bottomNote}
              />
            )}
            <TouchableOpacity
              style={S.$pdfButton}
              onPress={
                isRegenerateVisible
                  ? handleRequestRegenerate
                  : isRefreshMode
                    ? handleRefresh
                    : handleDownloadPdf
              }
              activeOpacity={0.8}
            >
              {isRefreshMode && !isRegenerateVisible ? (
                <IconRefresh size={20} color="#FFFFFF" />
              ) : !isRegenerateVisible ? (
                <IconDownload size={20} color="#FFFFFF" />
              ) : null}
              <Text
                text={
                  isRegenerateVisible
                    ? translate("tbmReportStatusScreen:requestRegenerate")
                    : isRefreshMode
                      ? translate("tbmReportStatusScreen:refresh")
                      : translate("tbmReportStatusScreen:downloadPdf")
                }
                style={S.$pdfButtonText}
              />
            </TouchableOpacity>
          </View>
        </StackScreen>

        <Toast
          visible={toastVisible}
          message={translate("tbmReportStatusScreen:toastRegenerate")}
          icon={<IconCheck size={14} color="#FFFFFF" strokeWidth={2.5} />}
          onHide={() => setToastVisible(false)}
        />
      </>
    )
  },
)

const $regenerateText: TextStyle = {
  fontSize: 16,
  fontFamily: typography.primary.medium,
  color: "#FFFFFF",
}
