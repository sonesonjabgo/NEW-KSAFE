import { FC, useState } from "react"
import { ActivityIndicator, Linking, ScrollView, TouchableOpacity, View, TextStyle, ViewStyle } from "react-native"
import { CircleCheck, CircleAlert, X } from "lucide-react-native"

import { StackScreen } from "@/components/StackScreen"
import { Text } from "@/components/Text"
import { Toast } from "@/components/Toast"
import { UserAvatar } from "@/components/UserAvatar"
import { translate } from "@/i18n/translate"
import { colors } from "@/theme/colors"
import { typography } from "@/theme/typography"
import { Asset } from "expo-asset"

import type { PatrolDetailScreenProps } from "./types"

type PatrolStatus = "underReview" | "inProgress" | "approved"
type CheckStatus = "good" | "bad"

interface CheckItem {
  id: string
  name: string
  status: CheckStatus
  note: string
}

const BADGE_STYLES: Record<PatrolStatus, { bg: string; text: string }> = {
  underReview: { bg: "#FEECDF", text: "#FD9040" },
  inProgress: { bg: "#E5E6E9", text: "#606679" },
  approved: { bg: "#CFFFE0", text: "#18A24A" },
}

const MOCK_PATROL = {
  status: "approved" as PatrolStatus,
  date: "2025.05.20 09:30",
  title: "작업장 순회 점검",
  reviewer: "김소정",
  approver: "이민준",
  author: "박민준",
  location: "서울 한강 레지던스 RC공사 현장",
}

const MOCK_OVERALL_ACTION = "작업장 주변 안전 시설물 점검 및 정비 실시 바랍니다."

const MOCK_CHECK_ITEMS: CheckItem[] = [
  { id: "1", name: "안전모 착용 여부", status: "good", note: "" },
  {
    id: "2",
    name: "작업 통로 안전 확보",
    status: "bad",
    note: "작업 통로에 장애물이 있어 즉시 제거 필요합니다.",
  },
  { id: "3", name: "소화기 비치 상태", status: "good", note: "" },
]

const MOCK_TOTAL = 12
const MOCK_GOOD = 9
const MOCK_BAD = 3

export const PatrolDetailScreen: FC<PatrolDetailScreenProps> = ({ navigation }) => {
  const [status, setStatus] = useState<PatrolStatus>(MOCK_PATROL.status)
  const [isGeneratingReport, setIsGeneratingReport] = useState(false)
  const [toastVisible, setToastVisible] = useState(false)
  const [toastMessage, setToastMessage] = useState("")
  const [toastIsError, setToastIsError] = useState(false)
  const badge = BADGE_STYLES[status]

  const handlePrimaryAction = () => {
    if (status === "inProgress") setStatus("underReview")
    else if (status === "underReview") setStatus("approved")
    else if (status === "approved") setStatus("inProgress")
  }

  const showToast = (message: string, isError: boolean = false) => {
    setToastMessage(message)
    setToastIsError(isError)
    setToastVisible(true)
  }

  const handleReportPreview = async () => {
    if (isGeneratingReport) return
    setIsGeneratingReport(true)
    try {
      const [asset] = await Asset.loadAsync(
        // eslint-disable-next-line @typescript-eslint/no-require-imports
        require("@assets/SameplePatrolReport.pdf"),
      )
      await Linking.openURL(asset.localUri ?? asset.uri)
      showToast(translate("patrolDetailScreen:toast.reportSuccess"))
    } catch {
      showToast(translate("patrolDetailScreen:toast.reportFail"), true)
    } finally {
      setIsGeneratingReport(false)
    }
  }

  return (
    <>
    <StackScreen
      title={translate("patrolDetailScreen:title")}
      onBack={() => navigation.goBack()}
      squareTop
      contentBg="#FFFFFF"
      rightOffset={-4}
      rightSlot={
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() =>
            navigation.navigate("PatrolCreate", {
              editData: {
                approver: { id: "2", name: MOCK_PATROL.approver, subtitle: "KS산업안전협회" },
                reviewer: { id: "1", name: MOCK_PATROL.reviewer, subtitle: "KS산업안전협회" },
                requirements: MOCK_OVERALL_ACTION,
                items: [
                  {
                    id: "1",
                    name: MOCK_PATROL.title,
                    checkCards: MOCK_CHECK_ITEMS.map((item) => ({
                      id: item.id,
                      checkName: item.name,
                      status: item.status,
                      badNote: item.note,
                    })),
                  },
                ],
              },
            })
          }
        >
          <Text text={translate("patrolDetailScreen:editButton")} style={$editButton} />
        </TouchableOpacity>
      }
    >
      <ScrollView
        style={$scroll}
        contentContainerStyle={$content}
        showsVerticalScrollIndicator={false}
      >
        {/* 점검 요약 카드 */}
        <View style={$summaryCard}>
          <Text
            text={translate("patrolDetailScreen:summaryCard.title")}
            style={$summaryCardTitle}
          />
          <View style={$statsRow}>
            <View style={$statsCol}>
              <Text text={String(MOCK_TOTAL)} style={$statNumber} />
              <Text text={translate("patrolDetailScreen:summaryCard.total")} style={$statLabel} />
            </View>
            <View style={$statDivider} />
            <View style={$statsCol}>
              <Text text={String(MOCK_GOOD)} style={[$statNumber, $statNumberGood]} />
              <Text text={translate("patrolDetailScreen:summaryCard.good")} style={$statLabel} />
            </View>
            <View style={$statDivider} />
            <View style={$statsCol}>
              <Text text={String(MOCK_BAD)} style={[$statNumber, $statNumberBad]} />
              <Text text={translate("patrolDetailScreen:summaryCard.bad")} style={$statLabel} />
            </View>
          </View>
        </View>

        <View style={$gap16} />

        {/* 상세 내용 카드 */}
        <View style={$detailCard}>
          {/* 뱃지 + 날짜 */}
          <View style={[$cardTopRow, $rowGap]}>
            <View style={[$cardBadge, { backgroundColor: badge.bg }]}>
              <Text
                text={translate(`patrolScreen:badge.${status}`)}
                style={[$cardBadgeText, { color: badge.text }]}
              />
            </View>
            <Text text={MOCK_PATROL.date} style={$cardDate} />
          </View>

          {/* 제목 */}
          <Text text={MOCK_PATROL.title} style={[$cardTitle, $rowGap]} numberOfLines={1} />

          {/* 검토자 */}
          <View style={[$reviewRow, $rowGap]}>
            <Text text={translate("patrolScreen:card.reviewer")} style={$reviewLabel} />
            <Text text={MOCK_PATROL.reviewer} style={$reviewName} />
          </View>

          {/* 승인자 */}
          <View style={[$reviewRow, $rowGap]}>
            <Text text={translate("patrolScreen:card.approver")} style={$reviewLabel} />
            <Text text={MOCK_PATROL.approver} style={$reviewName} />
          </View>

          {/* 구분선 */}
          <View style={[$cardDivider, $rowGap]} />

          {/* 작성자 + 현장 */}
          <View style={[$metaRow, $metaRowGap]}>
            <UserAvatar initial={MOCK_PATROL.author.charAt(0)} size={24} />
            <Text text={MOCK_PATROL.author} style={$metaAuthor} numberOfLines={1} />
            <Text text={` · ${MOCK_PATROL.location}`} style={$metaLocation} numberOfLines={1} />
          </View>

          {/* 추가 구분선 */}
          <View style={[$cardDivider, $sectionDividerGap]} />

          {/* 종합 조치사항 */}
          <Text
            text={translate("patrolDetailScreen:detailCard.overallActions")}
            style={[$sectionTitle, $sectionTitleGap]}
          />
          <Text text={MOCK_OVERALL_ACTION} style={[$overallActionText, $overallActionGap]} />

          {/* 점검 항목 */}
          <Text
            text={translate("patrolDetailScreen:detailCard.inspectionItems")}
            style={[$sectionTitle, $inspectionTitleGap]}
          />
          <View style={$checkItemList}>
            {MOCK_CHECK_ITEMS.map((item) => (
              <View key={item.id}>
                <Text text={item.name} style={$checkItemName} />
                <View style={$gap8} />
                {item.status === "good" ? (
                  <View style={$goodCard}>
                    <CircleCheck size={16} color="#4B9A6F" strokeWidth={1.8} fill="none" />
                    <Text text={item.name} style={$checkCardText} numberOfLines={1} />
                    <View style={$goodBadge}>
                      <Text
                        text={translate("patrolDetailScreen:detailCard.checkItem.goodBadge")}
                        style={$goodBadgeText}
                      />
                    </View>
                  </View>
                ) : (
                  <View style={$badCard}>
                    <View style={$badCardTopRow}>
                      <CircleAlert size={16} color="#FF0004" strokeWidth={1.8} />
                      <Text text={item.name} style={$checkCardText} numberOfLines={1} />
                      <View style={$badBadge}>
                        <Text
                          text={translate("patrolDetailScreen:detailCard.checkItem.badBadge")}
                          style={$badBadgeText}
                        />
                      </View>
                    </View>
                    <View style={$gap8} />
                    <View style={$actionCard}>
                      <View style={$actionAccent} />
                      <View style={$actionContent}>
                        <Text
                          text={translate("patrolDetailScreen:detailCard.checkItem.actionLabel")}
                          style={$actionLabel}
                        />
                        <View style={$gap4} />
                        <Text text={item.note} style={$actionText} />
                      </View>
                    </View>
                  </View>
                )}
              </View>
            ))}
          </View>
        </View>
        {/* 하단 버튼 */}
        <View style={$buttonArea}>
          <TouchableOpacity style={$btnBlue} activeOpacity={0.8} onPress={handlePrimaryAction}>
            <Text
              text={
                status === "inProgress"
                  ? translate("patrolDetailScreen:buttons.submit")
                  : status === "underReview"
                    ? translate("patrolDetailScreen:buttons.reviewComplete")
                    : translate("patrolDetailScreen:buttons.approve")
              }
              style={$btnWhiteText}
            />
          </TouchableOpacity>
          {status === "inProgress" && (
            <TouchableOpacity style={$btnRed} activeOpacity={0.8}>
              <Text
                text={translate("patrolDetailScreen:buttons.delete")}
                style={$btnWhiteText}
              />
            </TouchableOpacity>
          )}
          <TouchableOpacity
            style={$btnOutline}
            activeOpacity={0.8}
            onPress={handleReportPreview}
            disabled={isGeneratingReport}
          >
            {isGeneratingReport ? (
              <ActivityIndicator size="small" color="#4C4C4C" />
            ) : (
              <Text
                text={translate("patrolDetailScreen:buttons.reportPreview")}
                style={$btnOutlineText}
              />
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </StackScreen>
    <Toast
      visible={toastVisible}
      message={toastMessage}
      icon={<X size={14} color="#FFFFFF" strokeWidth={2.5} />}
      iconCircleColor={toastIsError ? colors.danger : colors.blue}
      onHide={() => setToastVisible(false)}
    />
    </>
  )
}

const { bold, semiBold, medium, normal } = typography.primary

const $gap4: ViewStyle = { height: 4 }
const $gap8: ViewStyle = { height: 8 }
const $gap16: ViewStyle = { height: 16 }

const $editButton: TextStyle = {
  fontSize: 15,
  fontFamily: semiBold,
  color: "#FFFFFF",
}

const $scroll: ViewStyle = { flex: 1 }

const $content: ViewStyle = { paddingHorizontal: 22, paddingTop: 20, paddingBottom: 40 }

// ── 요약 카드 ──────────────────────────────────────────────────────────────────

const $summaryCard: ViewStyle = {
  borderWidth: 1,
  borderColor: "#ECECEC",
  borderRadius: 12,
  paddingHorizontal: 20,
  paddingTop: 20,
  paddingBottom: 20,
}

const $summaryCardTitle: TextStyle = {
  fontSize: 19,
  lineHeight: 26,
  fontFamily: bold,
  color: "#000000",
}

const $statsRow: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
  marginTop: 38,
}

const $statsCol: ViewStyle = {
  flex: 1,
  alignItems: "center",
  gap: 6,
}

const $statNumber: TextStyle = {
  fontSize: 28,
  lineHeight: 36,
  fontFamily: bold,
  color: "#000000",
}

const $statNumberGood: TextStyle = { color: "#1062D8" }

const $statNumberBad: TextStyle = { color: "#FF0000" }

const $statLabel: TextStyle = {
  fontSize: 14,
  lineHeight: 20,
  fontFamily: semiBold,
  color: "#555555",
}

const $statDivider: ViewStyle = {
  width: 1,
  height: 50,
  backgroundColor: "#E9ECF0",
}

// ── 상세 카드 ──────────────────────────────────────────────────────────────────

const $detailCard: ViewStyle = {
  backgroundColor: "#FFFFFF",
  borderRadius: 12,
  borderWidth: 1,
  borderColor: "#ECECEC",
  paddingHorizontal: 16,
  paddingVertical: 16,
}

const $rowGap: ViewStyle = { marginBottom: 15 }
const $metaRowGap: ViewStyle = { marginBottom: 20 }
const $sectionDividerGap: ViewStyle = { marginBottom: 20 }
const $sectionTitleGap: ViewStyle = { marginBottom: 10 }
const $overallActionGap: ViewStyle = { marginBottom: 20 }
const $inspectionTitleGap: ViewStyle = { marginBottom: 16 }

const $cardTopRow: ViewStyle = {
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
}

const $cardBadge: ViewStyle = {
  width: 44,
  height: 20,
  borderRadius: 4,
  justifyContent: "center",
  alignItems: "center",
}

const $cardBadgeText: TextStyle = {
  fontSize: 10,
  fontFamily: semiBold,
}

const $cardDate: TextStyle = {
  fontSize: 12,
  fontFamily: normal,
  color: "#555555",
}

const $cardTitle: TextStyle = {
  fontSize: 17,
  fontFamily: bold,
  color: "#000000",
}

const $reviewRow: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
  gap: 21,
}

const $reviewLabel: TextStyle = {
  fontSize: 12,
  fontFamily: semiBold,
  color: "#555555",
}

const $reviewName: TextStyle = {
  fontSize: 12,
  fontFamily: semiBold,
  color: "#000000",
}

const $cardDivider: ViewStyle = {
  height: 1,
  backgroundColor: "#E9ECF0",
}

const $metaRow: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
  gap: 6,
}

const $metaAuthor: TextStyle = {
  fontSize: 12,
  fontFamily: semiBold,
  color: "#333333",
  flexShrink: 1,
  marginRight: 5,
}

const $metaLocation: TextStyle = {
  fontSize: 12,
  fontFamily: normal,
  color: "#555555",
  flexShrink: 1,
}

const $sectionTitle: TextStyle = {
  fontSize: 17,
  fontFamily: bold,
  color: "#000000",
}

const $overallActionText: TextStyle = {
  fontSize: 17,
  fontFamily: normal,
  color: "#56524F",
}

// ── 점검 항목 ──────────────────────────────────────────────────────────────────

const $checkItemList: ViewStyle = { gap: 20 }

const $checkItemName: TextStyle = {
  fontSize: 22,
  fontFamily: bold,
  color: "#000000",
}

const $goodCard: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
  gap: 8,
  backgroundColor: "#F5FBF7",
  borderWidth: 1,
  borderColor: "#D8EFDF",
  borderRadius: 8,
  paddingHorizontal: 12,
  paddingVertical: 12,
}

const $badCard: ViewStyle = {
  backgroundColor: "#FDF7F7",
  borderWidth: 1,
  borderColor: "#FBECED",
  borderRadius: 8,
  paddingHorizontal: 12,
  paddingTop: 12,
  paddingBottom: 12,
}

const $badCardTopRow: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
  gap: 8,
}

const $checkCardText: TextStyle = {
  flex: 1,
  fontSize: 15,
  fontFamily: medium,
  color: "#4C4C4C",
}

const $goodBadge: ViewStyle = {
  width: 34,
  height: 20,
  borderRadius: 4,
  backgroundColor: "#DFF6E7",
  justifyContent: "center",
  alignItems: "center",
  flexShrink: 0,
}

const $goodBadgeText: TextStyle = {
  fontSize: 10,
  fontFamily: semiBold,
  color: "#24804B",
}

const $badBadge: ViewStyle = {
  width: 34,
  height: 20,
  borderRadius: 4,
  backgroundColor: "#FDE8EB",
  justifyContent: "center",
  alignItems: "center",
  flexShrink: 0,
}

const $badBadgeText: TextStyle = {
  fontSize: 10,
  fontFamily: semiBold,
  color: "#FF0004",
}

const $actionCard: ViewStyle = {
  flexDirection: "row",
  gap: 10,
  backgroundColor: "#FFFFFF",
  borderRadius: 8,
  borderWidth: 1,
  borderColor: "#F3F0EE",
  paddingHorizontal: 12,
  paddingVertical: 10,
}

const $actionAccent: ViewStyle = {
  width: 3,
  borderRadius: 2,
  backgroundColor: "#E24D16",
  alignSelf: "stretch",
  flexShrink: 0,
}

const $actionContent: ViewStyle = {
  flex: 1,
}

const $actionLabel: TextStyle = {
  fontSize: 13,
  fontFamily: bold,
  color: "#E24D16",
}

const $actionText: TextStyle = {
  fontSize: 13,
  fontFamily: medium,
  color: "#4C4C4C",
}

// ── 하단 버튼 ──────────────────────────────────────────────────────────────────

const $buttonArea: ViewStyle = {
  paddingTop: 12,
  gap: 10,
}

const $btnBase: ViewStyle = {
  height: 50,
  borderRadius: 8,
  justifyContent: "center",
  alignItems: "center",
}

const $btnBlue: ViewStyle = {
  ...$btnBase,
  backgroundColor: "#1062D8",
}

const $btnRed: ViewStyle = {
  ...$btnBase,
  backgroundColor: colors.danger,
}

const $btnOutline: ViewStyle = {
  ...$btnBase,
  borderWidth: 1,
  borderColor: "#ECECEC",
}

const $btnWhiteText: TextStyle = {
  fontSize: 16,
  fontFamily: semiBold,
  color: "#FFFFFF",
}


const $btnOutlineText: TextStyle = {
  fontSize: 16,
  fontFamily: semiBold,
  color: "#4C4C4C",
}
