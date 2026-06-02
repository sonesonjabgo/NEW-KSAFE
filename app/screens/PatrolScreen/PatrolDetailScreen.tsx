import { FC, useState } from "react"
import { ActivityIndicator, Linking, ScrollView, TouchableOpacity, View, TextStyle, ViewStyle } from "react-native"
import { CircleCheck, CircleAlert, Trash2, X } from "lucide-react-native"

import { ConfirmModal } from "@/components/ConfirmModal"
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

interface PatrolDetailData {
  status: PatrolStatus
  date: string
  title: string
  reviewer: string
  approver: string
  author: string
  location: string
  overallAction: string
  checkItems: CheckItem[]
  total: number
  good: number
  bad: number
}

const BADGE_STYLES: Record<PatrolStatus, { bg: string; text: string }> = {
  underReview: { bg: "#FEECDF", text: "#FD9040" },
  inProgress: { bg: "#E5E6E9", text: "#606679" },
  approved: { bg: "#CFFFE0", text: "#18A24A" },
}

const MOCK_PATROL_DETAILS: Record<string, PatrolDetailData> = {
  "1": {
    status: "underReview",
    date: "2025.05.20 09:30",
    title: "작업장 순회 점검",
    reviewer: "김철수",
    approver: "이부장",
    author: "박민준",
    location: "서울 한강 레지던스 RC공사 현장",
    overallAction: "작업장 주변 안전 시설물 점검 및 정비 실시 바랍니다.",
    checkItems: [
      { id: "1", name: "안전모 착용 여부", status: "good", note: "" },
      { id: "2", name: "작업 통로 안전 확보", status: "bad", note: "작업 통로에 장애물이 있어 즉시 제거 필요합니다." },
      { id: "3", name: "소화기 비치 상태", status: "good", note: "" },
    ],
    total: 12, good: 9, bad: 3,
  },
  "2": {
    status: "inProgress",
    date: "2025.05.19 14:15",
    title: "작업장 순회 점검",
    reviewer: "최영호",
    approver: "정과장",
    author: "홍길동",
    location: "서울 한강 레지던스 RC공사 현장",
    overallAction: "전기 설비 주변 안전 거리 확보 및 표지판 부착 요망.",
    checkItems: [
      { id: "1", name: "전기 설비 안전 거리", status: "bad", note: "설비 주변 1m 이내 장애물 제거 필요합니다." },
      { id: "2", name: "안전모 착용 여부", status: "good", note: "" },
      { id: "3", name: "비상구 확보 상태", status: "good", note: "" },
    ],
    total: 10, good: 7, bad: 3,
  },
  "3": {
    status: "approved",
    date: "2025.05.18 11:00",
    title: "작업장 순회 점검",
    reviewer: "이영수",
    approver: "김부장",
    author: "이민호",
    location: "서울 한강 레지던스 RC공사 현장",
    overallAction: "전반적으로 양호한 상태이며 정기 점검 유지 권고.",
    checkItems: [
      { id: "1", name: "안전모 착용 여부", status: "good", note: "" },
      { id: "2", name: "소화기 비치 상태", status: "good", note: "" },
      { id: "3", name: "작업 통로 안전 확보", status: "good", note: "" },
    ],
    total: 15, good: 15, bad: 0,
  },
  "4": {
    status: "underReview",
    date: "2025.05.17 16:45",
    title: "작업장 순회 점검",
    reviewer: "강현우",
    approver: "박팀장",
    author: "조성현",
    location: "서울 한강 레지던스 RC공사 현장",
    overallAction: "고소 작업 구간 안전망 재설치 및 추락 방지 조치 필요.",
    checkItems: [
      { id: "1", name: "안전망 설치 상태", status: "bad", note: "고소 작업 구간 안전망 훼손 확인, 즉시 교체 필요." },
      { id: "2", name: "안전모 착용 여부", status: "good", note: "" },
      { id: "3", name: "추락 방지 시설", status: "bad", note: "난간 고정 볼트 2개 누락 상태." },
    ],
    total: 11, good: 7, bad: 4,
  },
  "5": {
    status: "approved",
    date: "2025.05.16 08:20",
    title: "작업장 순회 점검",
    reviewer: "손민재",
    approver: "윤부장",
    author: "임준혁",
    location: "서울 한강 레지던스 RC공사 현장",
    overallAction: "점검 결과 이상 없음. 현 상태 유지 권고.",
    checkItems: [
      { id: "1", name: "안전모 착용 여부", status: "good", note: "" },
      { id: "2", name: "소화기 비치 상태", status: "good", note: "" },
      { id: "3", name: "비상구 확보 상태", status: "good", note: "" },
    ],
    total: 13, good: 13, bad: 0,
  },
  "6": {
    status: "inProgress",
    date: "2025.05.15 13:50",
    title: "작업장 순회 점검",
    reviewer: "오세훈",
    approver: "강부장",
    author: "유재석",
    location: "서울 한강 레지던스 RC공사 현장",
    overallAction: "중장비 운행 구간 유도원 배치 및 안전선 재도색 요망.",
    checkItems: [
      { id: "1", name: "중장비 운행 안전선", status: "bad", note: "안전선 색상 바래 식별 불가, 재도색 요청." },
      { id: "2", name: "유도원 배치 여부", status: "bad", note: "오전 시간대 유도원 미배치 확인." },
      { id: "3", name: "안전모 착용 여부", status: "good", note: "" },
    ],
    total: 9, good: 5, bad: 4,
  },
  "7": {
    status: "underReview",
    date: "2025.05.14 10:05",
    title: "작업장 순회 점검",
    reviewer: "김영일",
    approver: "이대리",
    author: "최준",
    location: "서울 한강 레지던스 RC공사 현장",
    overallAction: "용접 작업 구간 화재 예방 조치 및 소화 장비 추가 비치 요망.",
    checkItems: [
      { id: "1", name: "소화기 비치 상태", status: "bad", note: "용접 구간 인근 소화기 미비치 확인." },
      { id: "2", name: "안전모 착용 여부", status: "good", note: "" },
      { id: "3", name: "작업 통로 안전 확보", status: "good", note: "" },
    ],
    total: 10, good: 8, bad: 2,
  },
}

export const PatrolDetailScreen: FC<PatrolDetailScreenProps> = ({ navigation, route }) => {
  const detail = MOCK_PATROL_DETAILS[route.params.id] ?? MOCK_PATROL_DETAILS["1"]
  const [status, setStatus] = useState<PatrolStatus>(detail.status)
  const [isGeneratingReport, setIsGeneratingReport] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
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
      await Linking.openURL(asset.uri)
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
        status === "inProgress" ? (
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() =>
              navigation.navigate("PatrolCreate", {
                editData: {
                  approver: { id: "2", name: detail.approver, subtitle: "KS산업안전협회" },
                  reviewer: { id: "1", name: detail.reviewer, subtitle: "KS산업안전협회" },
                  requirements: detail.overallAction,
                  items: [
                    {
                      id: "1",
                      name: detail.title,
                      checkCards: detail.checkItems.map((item) => ({
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
        ) : undefined
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
              <Text text={String(detail.total)} style={$statNumber} />
              <Text text={translate("patrolDetailScreen:summaryCard.total")} style={$statLabel} />
            </View>
            <View style={$statDivider} />
            <View style={$statsCol}>
              <Text text={String(detail.good)} style={[$statNumber, $statNumberGood]} />
              <Text text={translate("patrolDetailScreen:summaryCard.good")} style={$statLabel} />
            </View>
            <View style={$statDivider} />
            <View style={$statsCol}>
              <Text text={String(detail.bad)} style={[$statNumber, $statNumberBad]} />
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
            <Text text={detail.date} style={$cardDate} />
          </View>

          {/* 제목 */}
          <Text text={detail.title} style={[$cardTitle, $rowGap]} numberOfLines={1} />

          {/* 검토자 */}
          <View style={[$reviewRow, $rowGap]}>
            <Text text={translate("patrolScreen:card.reviewer")} style={$reviewLabel} />
            <Text text={detail.reviewer} style={$reviewName} />
          </View>

          {/* 승인자 */}
          <View style={[$reviewRow, $rowGap]}>
            <Text text={translate("patrolScreen:card.approver")} style={$reviewLabel} />
            <Text text={detail.approver} style={$reviewName} />
          </View>

          {/* 구분선 */}
          <View style={[$cardDivider, $rowGap]} />

          {/* 작성자 + 현장 */}
          <View style={[$metaRow, $metaRowGap]}>
            <UserAvatar initial={detail.author.charAt(0)} size={24} />
            <Text text={detail.author} style={$metaAuthor} numberOfLines={1} />
            <Text text={` · ${detail.location}`} style={$metaLocation} numberOfLines={1} />
          </View>

          {/* 추가 구분선 */}
          <View style={[$cardDivider, $sectionDividerGap]} />

          {/* 종합 조치사항 */}
          <Text
            text={translate("patrolDetailScreen:detailCard.overallActions")}
            style={[$sectionTitle, $sectionTitleGap]}
          />
          <Text text={detail.overallAction} style={[$overallActionText, $overallActionGap]} />

          {/* 점검 항목 */}
          <Text
            text={translate("patrolDetailScreen:detailCard.inspectionItems")}
            style={[$sectionTitle, $inspectionTitleGap]}
          />
          <View style={$checkItemList}>
            {detail.checkItems.map((item) => (
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
            <TouchableOpacity style={$btnRed} activeOpacity={0.8} onPress={() => setShowDeleteModal(true)}>
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
    <ConfirmModal
      visible={showDeleteModal}
      icon={<Trash2 size={28} color={colors.danger} strokeWidth={1.8} />}
      title={translate("patrolDetailScreen:deleteModal.title")}
      message={translate("patrolDetailScreen:deleteModal.message")}
      cancelLabel={translate("patrolDetailScreen:deleteModal.cancel")}
      confirmLabel={translate("patrolDetailScreen:deleteModal.confirm")}
      confirmBgColor={colors.danger}
      onCancel={() => setShowDeleteModal(false)}
      onConfirm={() => {
        setShowDeleteModal(false)
        navigation.goBack()
      }}
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
  paddingHorizontal: 8,
  paddingVertical: 2,
  borderRadius: 4,
  justifyContent: "center",
  alignItems: "center",
}

const $cardBadgeText: TextStyle = {
  fontSize: 14,
  lineHeight: 20,
  fontFamily: semiBold,
  includeFontPadding: false,
}

const $cardDate: TextStyle = {
  fontSize: 14,
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
  fontSize: 14,
  fontFamily: semiBold,
  color: "#555555",
}

const $reviewName: TextStyle = {
  fontSize: 14,
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
  fontSize: 14,
  fontFamily: semiBold,
  color: "#333333",
  flexShrink: 1,
  marginRight: 5,
}

const $metaLocation: TextStyle = {
  fontSize: 14,
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
  paddingHorizontal: 8,
  paddingVertical: 2,
  borderRadius: 4,
  backgroundColor: "#DFF6E7",
  justifyContent: "center",
  alignItems: "center",
  flexShrink: 0,
}

const $goodBadgeText: TextStyle = {
  fontSize: 14,
  lineHeight: 20,
  fontFamily: semiBold,
  color: "#24804B",
  includeFontPadding: false,
}

const $badBadge: ViewStyle = {
  paddingHorizontal: 8,
  paddingVertical: 2,
  borderRadius: 4,
  backgroundColor: "#FDE8EB",
  justifyContent: "center",
  alignItems: "center",
  flexShrink: 0,
}

const $badBadgeText: TextStyle = {
  fontSize: 14,
  lineHeight: 20,
  fontFamily: semiBold,
  color: "#FF0004",
  includeFontPadding: false,
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
  fontSize: 14,
  fontFamily: bold,
  color: "#E24D16",
}

const $actionText: TextStyle = {
  fontSize: 14,
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
