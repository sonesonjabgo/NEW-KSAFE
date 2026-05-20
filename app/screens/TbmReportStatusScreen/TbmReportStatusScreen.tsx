import { FC, useCallback, useRef, useState } from "react"
import { Animated, ScrollView, TextInput, TouchableOpacity, View, TextStyle } from "react-native"
import { IconAlertTriangle, IconCheck, IconDownload, IconRefresh } from "@tabler/icons-react-native"
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

  const [isRegenerateVisible, setIsRegenerateVisible] = useState(false)
  const [isRefreshMode, setIsRefreshMode] = useState(false)
  const [regenerateProcessName, setRegenerateProcessName] = useState("")
  const [regenerateTeamName, setRegenerateTeamName] = useState("")
  const [toastVisible, setToastVisible] = useState(false)
  const toastAnim = useRef(new Animated.Value(0)).current

  const detail = mockTbmReports.find((r) => r.id === id)

  const showToast = useCallback(() => {
    setToastVisible(true)
    Animated.sequence([
      Animated.timing(toastAnim, { toValue: 1, duration: 250, useNativeDriver: true }),
      Animated.delay(2000),
      Animated.timing(toastAnim, { toValue: 0, duration: 250, useNativeDriver: true }),
    ]).start(() => setToastVisible(false))
  }, [toastAnim])

  const handleRegenerate = () => {
    setIsRegenerateVisible((prev) => !prev)
  }

  const handleDownloadPdf = () => {
    console.log("PDF 다운로드:", id)
  }

  const handleRequestRegenerate = () => {
    console.log("재생성 요청:", id, { regenerateProcessName, regenerateTeamName })
    setIsRegenerateVisible(false)
    setIsRefreshMode(true)
    showToast()
  }

  const handleRefresh = () => {
    console.log("새로고침:", id)
  }

  if (!detail) return null

  const badgeStyles = getBadgeStyles(detail.status)
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
            <Text text={translate("tbmReportStatusScreen:regenerateNote")} style={S.$bottomNote} />
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

      {toastVisible && (
        <Animated.View
          style={[S.$toast, { opacity: toastAnim, top: Math.max(100, insets.top + 60) + 8 }]}
        >
          <View style={S.$toastIconCircle}>
            <IconCheck size={16} color="#FFFFFF" strokeWidth={2.5} />
          </View>
          <Text text={translate("tbmReportStatusScreen:toastRegenerate")} style={S.$toastText} />
        </Animated.View>
      )}
    </>
  )
}

const $regenerateText: TextStyle = {
  fontSize: 16,
  fontFamily: typography.primary.medium,
  color: "#FFFFFF",
}
