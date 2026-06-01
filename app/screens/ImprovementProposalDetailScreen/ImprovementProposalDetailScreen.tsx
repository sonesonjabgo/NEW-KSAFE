import { FC, useCallback, useMemo, useState } from "react"
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  // eslint-disable-next-line no-restricted-imports
  TextInput,
  TouchableOpacity,
  View,
} from "react-native"
import { CommonActions } from "@react-navigation/native"
import {
  IconAlertCircle,
  IconCalendar,
  IconCheck,
  IconDots,
  IconLock,
  IconTrash,
  IconX,
} from "@tabler/icons-react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"

import { ConfirmModal } from "@/components/ConfirmModal"
import { StackScreen } from "@/components/StackScreen"
import { Text } from "@/components/Text"
import { Toast } from "@/components/Toast"
import { UserAvatar } from "@/components/UserAvatar"
import { useRole } from "@/context/RoleContext"
import { translate } from "@/i18n/translate"
import { useResponsive } from "@/theme/responsive"

import { mockProposalDetails } from "./mockData"
import * as S from "./styles"
import type {
  ImprovementProposalDetailScreenProps,
  ProposalStatus,
  StatusHistoryType,
} from "./types"

const STATUS_KEY: Record<ProposalStatus, "pending" | "ongoing" | "reflected" | "rejected"> = {
  pending: "pending",
  ongoing: "ongoing",
  reflected: "reflected",
  rejected: "rejected",
}

// ── Local Components ──────────────────────────────────────────────────────────

const StatusBadge: FC<{ status: ProposalStatus }> = ({ status }) => (
  <View style={[S.$badge, S.$statusBadgeStyle[status]]}>
    <Text
      text={translate(`improvementProposalDetailScreen:status.${STATUS_KEY[status]}` as any)}
      style={[S.$badgeText, S.$statusBadgeTextStyle[status]]}
    />
  </View>
)

const SectionHeader: FC<{ title: string }> = ({ title }) => (
  <View style={S.$sectionHeaderRow}>
    <Text text={title} style={S.$sectionTitle} />
    <View style={S.$sectionLine} />
  </View>
)

// ── Screen ────────────────────────────────────────────────────────────────────

export const ImprovementProposalDetailScreen: FC<ImprovementProposalDetailScreenProps> = ({
  navigation,
  route,
}) => {
  const { role } = useRole()
  const insets = useSafeAreaInsets()
  const { isSmallPhone } = useResponsive()
  const isAdmin = role === "admin"

  // TODO: 추후 로그인 사용자 정보 연동 시 실제 사용자 이름으로 교체
  const MOCK_CURRENT_USER = "홍길동"
  // TODO: 추후 실제 처리자 정보 연동 시 교체
  const MOCK_MANAGER_NAME = "관리자(김영희)"
  // TODO: 추후 API 연동 시 실제 처리 결과 데이터로 교체
  const MOCK_RESULT_CONTENT = "설비팀 검토 결과 배치 완료함"
  const MOCK_RESULT_DATE = "2026.05.19 10:07"
  const MOCK_RESULT_MANAGER = "김영희"
  const MOCK_RESULT_MANAGER_INITIAL = "김"
  // TODO: 추후 API 연동 시 실제 반영불가 사유로 교체
  const MOCK_REJECTED_CONTENT = "검토 결과 반영이 어렵습니다."

  const routeProposal = route.params?.proposal
  const fallback = mockProposalDetails[route.params?.id ?? 1] ?? mockProposalDetails[1]
  const detail = routeProposal
    ? {
        ...fallback,
        id: routeProposal.id,
        status: routeProposal.status,
        date: routeProposal.date,
        content: routeProposal.content,
        authorName: routeProposal.authorName,
        authorInitial: routeProposal.authorName.charAt(0),
        workplace: routeProposal.workplace,
        statusHistory: [{ id: 1, type: "registered" as const, date: routeProposal.date }],
      }
    : fallback

  const isOwnProposal = detail.authorName === MOCK_CURRENT_USER

  // ── Edit Mode State ─────────────────────────────────────────────────────────
  const [editMode, setEditMode] = useState(false)
  const [editContent, setEditContent] = useState("")
  const [contentFocused, setContentFocused] = useState(false)
  const [toastVisible, setToastVisible] = useState(false)
  const [deleteModalVisible, setDeleteModalVisible] = useState(false)
  const hideToast = useCallback(() => setToastVisible(false), [])

  // ── Proceed State ────────────────────────────────────────────────────────────
  const [localStatus, setLocalStatus] = useState<ProposalStatus>(detail.status)
  const [localHistory, setLocalHistory] = useState(detail.statusHistory)
  const [isProceedStarted, setIsProceedStarted] = useState(false)
  const [proceedToastVisible, setProceedToastVisible] = useState(false)
  const hideProceedToast = useCallback(() => setProceedToastVisible(false), [])

  // selectedCard: 상태 변경 카드 선택 상태 (localStatus와 분리)
  const [selectedCard, setSelectedCard] = useState<"ongoing" | "reflected" | "rejected" | null>(
    detail.status === "pending"
      ? null
      : detail.status === "ongoing"
        ? "ongoing"
        : detail.status === "reflected"
          ? "reflected"
          : detail.status === "rejected"
            ? "rejected"
            : null,
  )

  // ── Processing Input State ───────────────────────────────────────────────────
  const [processingContent, setProcessingContent] = useState("")
  const [processingFocused, setProcessingFocused] = useState(false)

  // savedResult: 처리 내용 저장 후 결과 (null이면 미저장)
  const [savedResult, setSavedResult] = useState<{
    status: "reflected" | "rejected"
    content: string
    date: string
  } | null>(null)
  const [saveProcessingToastVisible, setSaveProcessingToastVisible] = useState(false)
  const hideSaveProcessingToast = useCallback(() => setSaveProcessingToastVisible(false), [])

  const handleSaveProcessed = useCallback(() => {
    // TODO: 추후 API 연동 시 실제 저장 처리
    if (selectedCard !== "reflected" && selectedCard !== "rejected") return
    const now = new Date()
    const pad = (n: number) => n.toString().padStart(2, "0")
    const dateStr = `${now.getFullYear()}.${pad(now.getMonth() + 1)}.${pad(now.getDate())} ${pad(now.getHours())}:${pad(now.getMinutes())}`
    const fallback =
      selectedCard === "reflected" ? "설비팀 검토 결과 배치 완료함" : "검토 결과 반영이 어렵습니다."
    const content = processingContent.trim() || fallback
    setSavedResult({ status: selectedCard, content, date: dateStr })
    setLocalStatus(selectedCard)
    setLocalHistory((prev) => [
      { id: prev.length + 1, type: selectedCard as StatusHistoryType, date: dateStr },
      ...prev,
    ])
    setSaveProcessingToastVisible(true)
  }, [selectedCard, processingContent])

  const handleCardSelect = useCallback(
    (key: "ongoing" | "reflected" | "rejected") => {
      if (localStatus !== "ongoing") return
      setSelectedCard(key)
    },
    [localStatus],
  )

  const handleProceed = useCallback(() => {
    const now = new Date()
    const pad = (n: number) => n.toString().padStart(2, "0")
    const dateStr = `${now.getFullYear()}.${pad(now.getMonth() + 1)}.${pad(now.getDate())} ${pad(now.getHours())}:${pad(now.getMinutes())}`
    setLocalStatus("ongoing")
    setSelectedCard("ongoing")
    setLocalHistory((prev) => [
      { id: prev.length + 1, type: "ongoing" as const, date: dateStr },
      ...prev,
    ])
    setIsProceedStarted(true)
    setProceedToastVisible(true)
  }, [])

  const hasContentError = editContent.length > 2000
  const isEditValid = useMemo(
    () => editContent.trim().length > 0 && editContent.length <= 2000,
    [editContent],
  )

  const enterEditMode = useCallback(() => {
    setEditContent(detail.content)
    setEditMode(true)
  }, [detail.content])

  const cancelEdit = useCallback(() => {
    setEditMode(false)
  }, [])

  const saveEdit = useCallback(() => {
    console.log("저장:", editContent)
    setToastVisible(true)
    setEditMode(false)
  }, [editContent])

  // ── Memos ───────────────────────────────────────────────────────────────────

  const STATUS_BUTTONS = useMemo(
    () => [
      {
        key: "ongoing" as const,
        Icon: IconDots,
        label: translate("improvementProposalDetailScreen:statusChange.ongoingBtn"),
        selectedBtnStyle: S.$statusBtnSelectedOngoing,
        selectedTextStyle: S.$statusBtnTextSelectedOngoing,
        selectedIconColor: "#18A24A",
        badgeColor: "#18A24A",
      },
      {
        key: "reflected" as const,
        Icon: IconCheck,
        label: translate("improvementProposalDetailScreen:statusChange.reflectedBtn"),
        selectedBtnStyle: S.$statusBtnSelectedReflected,
        selectedTextStyle: S.$statusBtnTextSelectedReflected,
        selectedIconColor: "#1062D8",
        badgeColor: "#1062D8",
      },
      {
        key: "rejected" as const,
        Icon: IconX,
        label: translate("improvementProposalDetailScreen:statusChange.rejectedBtn"),
        selectedBtnStyle: S.$statusBtnSelectedRejected,
        selectedTextStyle: S.$statusBtnTextSelectedRejected,
        selectedIconColor: "#E03526",
        badgeColor: "#E03526",
      },
    ],
    [],
  )

  const HISTORY_TITLE: Record<StatusHistoryType, string> = useMemo(
    () => ({
      registered: translate("improvementProposalDetailScreen:history.registeredTitle"),
      ongoing: translate("improvementProposalDetailScreen:history.ongoingTitle"),
      reflected: translate("improvementProposalDetailScreen:history.reflectedTitle"),
      rejected: translate("improvementProposalDetailScreen:history.rejectedTitle"),
    }),
    [],
  )

  const HISTORY_DESC: Record<StatusHistoryType, string> = useMemo(
    () => ({
      registered: translate("improvementProposalDetailScreen:history.registeredDesc"),
      ongoing: translate("improvementProposalDetailScreen:history.ongoingDesc"),
      reflected: translate("improvementProposalDetailScreen:history.reflectedDesc"),
      rejected: translate("improvementProposalDetailScreen:history.rejectedDesc"),
    }),
    [],
  )

  // ── Display History 계산 ─────────────────────────────────────────────────────
  // 상태별로 이력 표시 순서와 라벨·노트 버블을 결정한다.

  type DisplayHistoryItem = {
    id: number
    type: StatusHistoryType
    date: string
    title: string
    note?: string
    noteColor?: "ongoing" | "reflected" | "rejected"
    isHighlight: boolean
    highlightVariant?: "ongoing" | "reflected" | "rejected"
  }

  const displayHistory = useMemo((): DisplayHistoryItem[] => {
    // 처리 내용 저장 완료 후: localHistory를 최신순으로 정렬해 반영
    if (savedResult !== null) {
      const isReflected = savedResult.status === "reflected"
      const variant = isReflected ? ("reflected" as const) : ("rejected" as const)
      const orderedHistory = [...localHistory].sort((a, b) => b.id - a.id)
      return orderedHistory.map((item, index) => {
        if (index === 0) {
          return {
            ...item,
            title: translate(
              isReflected
                ? "improvementProposalDetailScreen:history.reflectedChangeTitle"
                : "improvementProposalDetailScreen:history.rejectedChangeTitle",
            ),
            note: `${translate(
              isReflected
                ? "improvementProposalDetailScreen:history.reflectedNote"
                : "improvementProposalDetailScreen:history.rejectedNote",
            )} ${MOCK_MANAGER_NAME}`,
            noteColor: variant,
            isHighlight: true,
            highlightVariant: variant,
          }
        }
        if (item.type === "ongoing") {
          return {
            ...item,
            title: translate("improvementProposalDetailScreen:history.ongoingChangeTitle"),
            note: `${translate("improvementProposalDetailScreen:history.proceedNote")} ${MOCK_MANAGER_NAME}`,
            noteColor: undefined,
            isHighlight: false,
          }
        }
        return {
          ...item,
          title: HISTORY_TITLE[item.type],
          note: undefined,
          noteColor: undefined,
          isHighlight: false,
        }
      })
    }

    // 관리자가 이 화면에서 진행하기를 클릭한 경우
    if (isProceedStarted) {
      return localHistory.map((item, index) => ({
        ...item,
        title:
          index === 0
            ? translate("improvementProposalDetailScreen:history.ongoingChangeTitle")
            : HISTORY_TITLE[item.type],
        note:
          index === 0
            ? `${translate("improvementProposalDetailScreen:history.proceedNote")} ${MOCK_MANAGER_NAME}`
            : undefined,
        noteColor: index === 0 ? ("ongoing" as const) : undefined,
        isHighlight: index === 0,
        highlightVariant: index === 0 ? ("ongoing" as const) : undefined,
      }))
    }

    // 진행중으로 이미 들어온 화면: 진행중 변경 + 제안 등록 (역순)
    if (detail.status === "ongoing") {
      return [...detail.statusHistory].reverse().map((item, index) => {
        if (index === 0 && item.type === "ongoing") {
          return {
            ...item,
            title: translate("improvementProposalDetailScreen:history.ongoingChangeTitle"),
            note: `${translate("improvementProposalDetailScreen:history.proceedNote")} ${MOCK_MANAGER_NAME}`,
            noteColor: "ongoing" as const,
            isHighlight: true,
            highlightVariant: "ongoing" as const,
          }
        }
        return {
          ...item,
          title: HISTORY_TITLE[item.type],
          note: undefined,
          noteColor: undefined,
          isHighlight: false,
        }
      })
    }

    // 반영완료 / 반영불가: 역순으로 표시, 최신 항목에 상태별 버블
    if (detail.status === "reflected" || detail.status === "rejected") {
      const isReflected = detail.status === "reflected"
      return [...detail.statusHistory].reverse().map((item, index) => {
        if (index === 0) {
          return {
            ...item,
            title: translate(
              isReflected
                ? "improvementProposalDetailScreen:history.reflectedChangeTitle"
                : "improvementProposalDetailScreen:history.rejectedChangeTitle",
            ),
            note: `${translate(
              isReflected
                ? "improvementProposalDetailScreen:history.reflectedNote"
                : "improvementProposalDetailScreen:history.rejectedNote",
            )} ${MOCK_MANAGER_NAME}`,
            noteColor: isReflected ? ("reflected" as const) : ("rejected" as const),
            isHighlight: true,
            highlightVariant: isReflected ? ("reflected" as const) : ("rejected" as const),
          }
        }
        if (item.type === "ongoing") {
          return {
            ...item,
            title: translate("improvementProposalDetailScreen:history.ongoingChangeTitle"),
            note: `${translate("improvementProposalDetailScreen:history.proceedNote")} ${MOCK_MANAGER_NAME}`,
            noteColor: undefined,
            isHighlight: false,
          }
        }
        return {
          ...item,
          title: HISTORY_TITLE[item.type],
          note: undefined,
          noteColor: undefined,
          isHighlight: false,
        }
      })
    }

    // pending 또는 그 외: 그대로 표시
    return detail.statusHistory.map((item) => ({
      ...item,
      title: HISTORY_TITLE[item.type],
      note: undefined,
      isHighlight: false,
    }))
  }, [
    savedResult,
    isProceedStarted,
    localHistory,
    detail.status,
    detail.statusHistory,
    HISTORY_TITLE,
    MOCK_MANAGER_NAME,
  ])

  // ── Render ──────────────────────────────────────────────────────────────────

  return (
    <>
      <StackScreen
        title={translate("improvementProposalDetailScreen:title")}
        onBack={() => navigation.goBack()}
        contentBg="#FFFFFF"
        squareTop
      >
        <KeyboardAvoidingView
          style={S.$flex1}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <ScrollView
            style={S.$scrollView}
            contentContainerStyle={S.$scrollContent}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          >
            {editMode ? (
              /* ── 수정 모드: 상세 내용 입력 ── */
              <View style={S.$editSection}>
                <View style={S.$editLabelRow}>
                  <Text
                    text={translate("improvementProposalDetailScreen:editForm.label")}
                    style={S.$editLabel}
                  />
                  <Text
                    text={translate("improvementProposalDetailScreen:editForm.required")}
                    style={S.$editRequired}
                  />
                </View>
                <View
                  style={[
                    S.$editTextarea,
                    contentFocused && !hasContentError && S.$editTextareaFocused,
                    hasContentError && S.$editTextareaError,
                  ]}
                >
                  <TextInput
                    style={S.$editTextareaInput}
                    value={editContent}
                    onChangeText={setEditContent}
                    multiline
                    scrollEnabled={false}
                    underlineColorAndroid="transparent"
                    onFocus={() => setContentFocused(true)}
                    onBlur={() => setContentFocused(false)}
                  />
                </View>
                <Text
                  text={translate("improvementProposalDetailScreen:editForm.helper")}
                  style={S.$editHelperText}
                />
                {hasContentError && (
                  <View style={S.$editErrorRow}>
                    <IconAlertCircle size={14} color="#E03C3C" strokeWidth={2} />
                    <Text
                      text={translate("improvementProposalDetailScreen:editForm.errorMaxLength")}
                      style={S.$editErrorText}
                    />
                  </View>
                )}
              </View>
            ) : (
              /* ── 상세 보기 모드: 제안 정보 카드 ── */
              <View style={S.$infoCard}>
                <View style={S.$infoCardTopRow}>
                  <StatusBadge status={localStatus} />
                  <Text text={detail.date} style={S.$infoDate} />
                </View>
                <Text text={detail.content} style={S.$infoContent} />
                <View style={S.$authorRow}>
                  <UserAvatar initial={detail.authorInitial} size={36} />
                  <View style={S.$authorInfo}>
                    <Text text={detail.authorName} style={S.$authorName} />
                    <Text text={detail.workplace} style={S.$authorWorkplace} />
                  </View>
                </View>
              </View>
            )}

            {/* 처리 결과 (reflected/rejected 상태 — 원본 또는 저장 후) */}
            {(localStatus === "reflected" || localStatus === "rejected") && (
              <View style={S.$section}>
                <SectionHeader
                  title={translate("improvementProposalDetailScreen:result.sectionTitle")}
                />
                <View style={S.$resultCard}>
                  <View style={S.$resultHeaderRow}>
                    {localStatus === "reflected" ? (
                      <View style={S.$resultIconCircle}>
                        <IconCheck size={20} color="#18A24A" strokeWidth={2.5} />
                      </View>
                    ) : (
                      <View style={S.$resultIconCircleRejected}>
                        <IconX size={20} color="#E03526" strokeWidth={2.5} />
                      </View>
                    )}
                    <Text
                      text={translate(
                        localStatus === "reflected"
                          ? "improvementProposalDetailScreen:result.reflected"
                          : "improvementProposalDetailScreen:result.rejected",
                      )}
                      style={S.$resultTitle}
                    />
                  </View>
                  <Text
                    text={
                      savedResult?.content ||
                      (localStatus === "reflected" ? MOCK_RESULT_CONTENT : MOCK_REJECTED_CONTENT)
                    }
                    style={S.$resultContent}
                  />
                  <View style={S.$resultDivider} />
                  <View style={S.$resultFooterRow}>
                    <View style={S.$resultDateRow}>
                      <IconCalendar size={14} color="#888888" />
                      <Text
                        text={`${translate("improvementProposalDetailScreen:result.dateLabel")} ${MOCK_RESULT_DATE}`}
                        style={S.$resultDateText}
                      />
                    </View>
                    <View style={S.$resultManagerRow}>
                      <UserAvatar initial={MOCK_RESULT_MANAGER_INITIAL} size={22} />
                      <Text text={MOCK_RESULT_MANAGER} style={S.$resultManagerName} />
                    </View>
                  </View>
                </View>
              </View>
            )}

            {/* 상태 변경 및 처리 (관리자 전용, 본인 작성 진행중 / 저장 완료 제외) */}
            {isAdmin && (!isOwnProposal || detail.status !== "ongoing") && savedResult === null && (
              <View style={S.$section}>
                <SectionHeader
                  title={translate("improvementProposalDetailScreen:statusChange.sectionTitle")}
                />
                <View style={S.$statusChangeCard}>
                  <View style={S.$statusBtnGroup}>
                    {STATUS_BUTTONS.map((btn) => {
                      const isSelected = selectedCard === btn.key
                      return (
                        <TouchableOpacity
                          key={btn.key}
                          style={[S.$statusBtn, isSelected && btn.selectedBtnStyle]}
                          activeOpacity={localStatus === "ongoing" ? 0.7 : 1}
                          onPress={() => handleCardSelect(btn.key)}
                        >
                          {isSelected && (
                            <View style={[S.$statusBtnBadge, { backgroundColor: btn.badgeColor }]}>
                              <IconCheck size={10} color="#FFFFFF" strokeWidth={3} />
                            </View>
                          )}
                          <btn.Icon
                            size={20}
                            color={isSelected ? btn.selectedIconColor : "#C6C6C6"}
                            strokeWidth={1.5}
                          />
                          <Text
                            text={btn.label}
                            style={[S.$statusBtnText, isSelected && btn.selectedTextStyle]}
                          />
                        </TouchableOpacity>
                      )
                    })}
                  </View>

                  <View style={S.$inputLabelRow}>
                    <Text
                      text={translate(
                        localStatus === "rejected"
                          ? "improvementProposalDetailScreen:statusChange.rejectedInputLabel"
                          : "improvementProposalDetailScreen:statusChange.inputLabel",
                      )}
                      style={S.$inputLabel}
                    />
                    {(selectedCard === "reflected" || selectedCard === "rejected") &&
                      localStatus !== "reflected" &&
                      localStatus !== "rejected" && (
                        <Text
                          text={translate("improvementProposalDetailScreen:editForm.required")}
                          style={
                            selectedCard === "reflected"
                              ? S.$inputLabelRequiredBlue
                              : S.$inputLabelRequired
                          }
                        />
                      )}
                  </View>

                  {localStatus === "reflected" ? (
                    /* 반영완료 처리된 상태: 읽기 전용 박스 (파란 배경) */
                    <View style={S.$processingReadBox}>
                      <Text text={MOCK_RESULT_CONTENT} style={S.$processingReadText} />
                      <View style={S.$lockRow}>
                        <IconLock size={18} color="#BBBBBB" />
                      </View>
                    </View>
                  ) : localStatus === "rejected" ? (
                    /* 반영불가 처리된 상태: 읽기 전용 박스 (빨간 배경) */
                    <View style={S.$processingReadBoxRejected}>
                      <Text text={MOCK_REJECTED_CONTENT} style={S.$processingReadText} />
                      <View style={S.$lockRow}>
                        <IconLock size={18} color="#BBBBBB" />
                      </View>
                    </View>
                  ) : selectedCard === "reflected" || selectedCard === "rejected" ? (
                    /* 반영완료/반영불가 선택 시: 처리 내용 입력 활성화 */
                    <View>
                      <View
                        style={[
                          S.$processingTextarea,
                          processingFocused &&
                            (selectedCard === "rejected"
                              ? S.$processingTextareaFocusedRejected
                              : S.$processingTextareaFocused),
                        ]}
                      >
                        <TextInput
                          style={S.$processingTextareaInput}
                          value={processingContent}
                          onChangeText={setProcessingContent}
                          placeholder={translate(
                            selectedCard === "rejected"
                              ? "improvementProposalDetailScreen:statusChange.rejectedProcessingPlaceholder"
                              : "improvementProposalDetailScreen:statusChange.processingPlaceholder",
                          )}
                          placeholderTextColor="#BBBBBB"
                          multiline
                          scrollEnabled={false}
                          underlineColorAndroid="transparent"
                          onFocus={() => setProcessingFocused(true)}
                          onBlur={() => setProcessingFocused(false)}
                        />
                      </View>
                      <Text
                        text={translate("improvementProposalDetailScreen:editForm.helper")}
                        style={S.$processingHelperText}
                      />
                    </View>
                  ) : (
                    /* 진행중 또는 대기중 상태: 안내 메시지 */
                    <View style={S.$pendingMessageBox}>
                      <Text
                        text={translate(
                          localStatus === "ongoing"
                            ? "improvementProposalDetailScreen:statusChange.ongoingMessage"
                            : "improvementProposalDetailScreen:statusChange.pendingMessage",
                        )}
                        style={S.$pendingMessageText}
                      />
                    </View>
                  )}
                </View>
              </View>
            )}

            {/* 상태 변경 이력 */}
            <View style={S.$section}>
              <SectionHeader
                title={translate("improvementProposalDetailScreen:history.sectionTitle")}
              />
              {displayHistory.map((item, index) => {
                const isLast = index === displayHistory.length - 1
                const dotStyle =
                  item.isHighlight && item.highlightVariant === "reflected"
                    ? S.$timelineDotActiveReflected
                    : item.isHighlight && item.highlightVariant === "rejected"
                      ? S.$timelineDotActiveRejected
                      : item.isHighlight
                        ? S.$timelineDotActive
                        : undefined
                const dotInnerStyle =
                  item.isHighlight && item.highlightVariant === "reflected"
                    ? S.$timelineDotInnerActiveReflected
                    : item.isHighlight && item.highlightVariant === "rejected"
                      ? S.$timelineDotInnerActiveRejected
                      : item.isHighlight
                        ? S.$timelineDotInnerActive
                        : undefined
                const bubbleStyle =
                  item.noteColor === "reflected"
                    ? S.$historyNoteBubbleReflected
                    : item.noteColor === "rejected"
                      ? S.$historyNoteBubbleRejected
                      : S.$historyNoteBubble
                const bubbleTextStyle =
                  item.noteColor === "reflected"
                    ? S.$historyNoteBubbleReflectedText
                    : item.noteColor === "rejected"
                      ? S.$historyNoteBubbleRejectedText
                      : S.$historyNoteBubbleText
                return (
                  <View key={item.id} style={S.$timelineItem}>
                    <View style={S.$timelineDotColumn}>
                      <View style={[S.$timelineDot, dotStyle]}>
                        <View style={[S.$timelineDotInner, dotInnerStyle]} />
                      </View>
                      {!isLast && <View style={S.$timelineConnector} />}
                    </View>
                    <View style={S.$timelineContent}>
                      <View style={S.$timelineRow}>
                        <Text text={item.title} style={S.$timelineTitle} />
                        <Text text={item.date} style={S.$timelineDate} />
                      </View>
                      {item.note != null ? (
                        item.noteColor != null ? (
                          <View style={bubbleStyle}>
                            <Text text={item.note} style={bubbleTextStyle} />
                          </View>
                        ) : (
                          <Text text={item.note} style={S.$timelineDesc} />
                        )
                      ) : (
                        <Text text={HISTORY_DESC[item.type]} style={S.$timelineDesc} />
                      )}
                    </View>
                  </View>
                )
              })}
            </View>
          </ScrollView>

          {/* 하단 버튼 — 역할/작성자 조건 분기 */}
          {(isOwnProposal || isAdmin) && (
            <View style={[S.$bottomBar, { paddingBottom: insets.bottom + 16 }]}>
              {editMode ? (
                /* 수정 모드: 취소 / 저장 */
                <>
                  <TouchableOpacity style={S.$editBtn} activeOpacity={0.7} onPress={cancelEdit}>
                    <Text
                      text={translate("improvementProposalDetailScreen:cancel")}
                      style={S.$editBtnText}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[S.$deleteBtn, !isEditValid && S.$saveBtnDisabled]}
                    activeOpacity={0.8}
                    onPress={saveEdit}
                    disabled={!isEditValid}
                  >
                    <Text
                      text={translate("improvementProposalDetailScreen:save")}
                      style={S.$deleteBtnText}
                    />
                  </TouchableOpacity>
                </>
              ) : isOwnProposal &&
                detail.status !== "pending" &&
                (detail.status === "ongoing" || !isAdmin) ? (
                /* 본인 제안 + 진행중(역할 무관) / 처리됨(근로자): 안내 텍스트 */
                <Text
                  text={translate("improvementProposalDetailScreen:workerNoEditMessage")}
                  style={S.$workerInfoText}
                />
              ) : detail.status === "reflected" ||
                detail.status === "rejected" ||
                savedResult !== null ? (
                /* 관리자: 이미 처리 완료된 제안 비활성 버튼 */
                <View style={S.$proceedBtnDisabled}>
                  <Text
                    text={translate("improvementProposalDetailScreen:alreadyProcessed")}
                    style={S.$proceedBtnTextDisabled}
                  />
                </View>
              ) : isOwnProposal ? (
                /* 본인 제안 + 대기중: 수정하기 / 삭제하기 */
                <>
                  <TouchableOpacity style={S.$editBtn} activeOpacity={0.7} onPress={enterEditMode}>
                    <Text
                      text={translate("improvementProposalDetailScreen:edit")}
                      style={S.$editBtnText}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={S.$deleteBtn}
                    activeOpacity={0.8}
                    onPress={() => setDeleteModalVisible(true)}
                  >
                    <Text
                      text={translate("improvementProposalDetailScreen:delete")}
                      style={S.$deleteBtnText}
                    />
                  </TouchableOpacity>
                </>
              ) : (
                /* 관리자 + 타인 제안: 진행하기 → 처리 내용 저장 */
                <TouchableOpacity
                  style={S.$proceedBtn}
                  activeOpacity={0.8}
                  onPress={localStatus === "ongoing" ? handleSaveProcessed : handleProceed}
                >
                  <Text
                    text={translate(
                      localStatus === "ongoing"
                        ? "improvementProposalDetailScreen:saveProceeded"
                        : "improvementProposalDetailScreen:proceed",
                    )}
                    style={S.$proceedBtnText}
                  />
                </TouchableOpacity>
              )}
            </View>
          )}
        </KeyboardAvoidingView>
      </StackScreen>

      <Toast
        visible={toastVisible}
        message={translate("improvementProposalDetailScreen:savedMessage")}
        icon={<IconCheck size={16} color="#FFFFFF" strokeWidth={2.5} />}
        onHide={hideToast}
      />

      <Toast
        visible={saveProcessingToastVisible}
        message={translate("improvementProposalDetailScreen:saveProcessingMessage")}
        icon={<IconCheck size={16} color="#FFFFFF" strokeWidth={2.5} />}
        onHide={hideSaveProcessingToast}
      />

      <Toast
        visible={proceedToastVisible}
        message={translate("improvementProposalDetailScreen:proceedStartedMessage")}
        icon={<IconCheck size={16} color="#FFFFFF" strokeWidth={2.5} />}
        onHide={hideProceedToast}
      />

      <ConfirmModal
        visible={deleteModalVisible}
        cardStyle={{ width: isSmallPhone ? 290 : 330 }}
        icon={
          <View style={S.$modalDeleteIconCircle}>
            <IconTrash size={26} color="#E03526" />
          </View>
        }
        title={translate("improvementProposalDetailScreen:deleteModal.title")}
        message={translate("improvementProposalDetailScreen:deleteModal.message")}
        cancelLabel={translate("improvementProposalDetailScreen:deleteModal.cancel")}
        confirmLabel={translate("improvementProposalDetailScreen:deleteModal.confirm")}
        confirmBgColor="#E03526"
        onCancel={() => setDeleteModalVisible(false)}
        onConfirm={() => {
          setDeleteModalVisible(false)
          navigation.dispatch((state) => {
            const routes = state.routes
              .filter((r) => r.name !== "ImprovementProposalDetail")
              .map((r) =>
                r.name === "ImprovementProposalList" ? { ...r, params: { deleted: true } } : r,
              )
            const listIndex = routes.findIndex((r) => r.name === "ImprovementProposalList")
            return CommonActions.reset({
              ...state,
              routes,
              index: listIndex >= 0 ? listIndex : routes.length - 1,
            })
          })
        }}
      />
    </>
  )
}
