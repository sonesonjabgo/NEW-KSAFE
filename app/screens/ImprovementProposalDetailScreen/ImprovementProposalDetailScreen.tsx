import { FC, useCallback, useMemo, useState } from "react"
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native"
import { IconAlertCircle, IconCheck, IconDots, IconTrash, IconX } from "@tabler/icons-react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"

import { ConfirmModal } from "@/components/ConfirmModal"
import { StackScreen } from "@/components/StackScreen"
import { Text } from "@/components/Text"
import { Toast } from "@/components/Toast"
import { useRole } from "@/context/RoleContext"
import { translate } from "@/i18n/translate"

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
  const isAdmin = role === "admin"

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

  // ── Edit Mode State ─────────────────────────────────────────────────────────
  const [editMode, setEditMode] = useState(false)
  const [editContent, setEditContent] = useState("")
  const [contentFocused, setContentFocused] = useState(false)
  const [toastVisible, setToastVisible] = useState(false)
  const [deleteModalVisible, setDeleteModalVisible] = useState(false)
  const hideToast = useCallback(() => setToastVisible(false), [])

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
        key: "ongoing",
        Icon: IconDots,
        label: translate("improvementProposalDetailScreen:statusChange.ongoingBtn"),
      },
      {
        key: "reflected",
        Icon: IconCheck,
        label: translate("improvementProposalDetailScreen:statusChange.reflectedBtn"),
      },
      {
        key: "rejected",
        Icon: IconX,
        label: translate("improvementProposalDetailScreen:statusChange.rejectedBtn"),
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
        style={{ flex: 1 }}
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
                    text={translate(
                      "improvementProposalDetailScreen:editForm.errorMaxLength",
                    )}
                    style={S.$editErrorText}
                  />
                </View>
              )}
            </View>
          ) : (
            /* ── 상세 보기 모드: 제안 정보 카드 ── */
            <View style={S.$infoCard}>
              <View style={S.$infoCardTopRow}>
                <StatusBadge status={detail.status} />
                <Text text={detail.date} style={S.$infoDate} />
              </View>
              <Text text={detail.content} style={S.$infoContent} />
              <View style={S.$authorRow}>
                <View style={S.$authorAvatar}>
                  <Text text={detail.authorInitial} style={S.$authorAvatarText} />
                </View>
                <View style={S.$authorInfo}>
                  <Text text={detail.authorName} style={S.$authorName} />
                  <Text text={detail.workplace} style={S.$authorWorkplace} />
                </View>
              </View>
            </View>
          )}

          {/* 상태 변경 및 처리 (관리자 전용) */}
          {isAdmin && (
            <View style={S.$section}>
              <SectionHeader
                title={translate(
                  "improvementProposalDetailScreen:statusChange.sectionTitle",
                )}
              />
              <View style={S.$statusChangeCard}>
                <View style={S.$statusBtnGroup}>
                  {STATUS_BUTTONS.map((btn) => (
                    <View key={btn.key} style={S.$statusBtn}>
                      <btn.Icon size={20} color="#BBBBBB" strokeWidth={1.5} />
                      <Text text={btn.label} style={S.$statusBtnText} />
                    </View>
                  ))}
                </View>

                <Text
                  text={translate(
                    "improvementProposalDetailScreen:statusChange.inputLabel",
                  )}
                  style={S.$inputLabel}
                />
                {detail.status === "pending" && (
                  <View style={S.$pendingMessageBox}>
                    <Text
                      text={translate(
                        "improvementProposalDetailScreen:statusChange.pendingMessage",
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
            {detail.statusHistory.map((item) => (
              <View key={item.id} style={S.$timelineItem}>
                <View style={S.$timelineDot}>
                  <View style={S.$timelineDotInner} />
                </View>
                <View style={S.$timelineContent}>
                  <View style={S.$timelineRow}>
                    <Text text={HISTORY_TITLE[item.type]} style={S.$timelineTitle} />
                    <Text text={item.date} style={S.$timelineDate} />
                  </View>
                  <Text text={HISTORY_DESC[item.type]} style={S.$timelineDesc} />
                </View>
              </View>
            ))}
          </View>
        </ScrollView>

        {/* 하단 버튼 */}
        <View style={[S.$bottomBar, { paddingBottom: insets.bottom + 16 }]}>
          {editMode ? (
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
          ) : (
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
          )}
        </View>
      </KeyboardAvoidingView>
    </StackScreen>

    <Toast
      visible={toastVisible}
      message={translate("improvementProposalDetailScreen:savedMessage")}
      icon={<IconCheck size={16} color="#FFFFFF" strokeWidth={2.5} />}
      onHide={hideToast}
    />

    <ConfirmModal
      visible={deleteModalVisible}
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
        navigation.goBack()
      }}
    />
    </>
  )
}
