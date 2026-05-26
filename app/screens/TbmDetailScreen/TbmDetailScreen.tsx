import { FC, useCallback, useMemo, useState } from "react"
import { ScrollView, TouchableOpacity, View } from "react-native"
import { useFocusEffect } from "@react-navigation/native"
import {
  IconCalendar,
  IconCheck,
  IconDownload,
  IconEdit,
  IconPlayerPlayFilled,
  IconTrash,
} from "@tabler/icons-react-native"
import { observer } from "mobx-react-lite"
import { useSafeAreaInsets } from "react-native-safe-area-context"

import EducationFrame from "@assets/icons/education_frame.svg"

import { ConfirmModal } from "@/components/ConfirmModal"
import { StackScreen } from "@/components/StackScreen"
import { Text } from "@/components/Text"
import { Toast } from "@/components/Toast"
import { translate } from "@/i18n/translate"
import { useStores } from "@/models"
import type { TbmStatus } from "@/screens/TbmListScreen/types"

import * as S from "./styles"
import type { TbmDetailScreenProps } from "./types"

function getBadgeStyles(status: TbmStatus) {
  if (status === "작성중") return { badge: S.$badgeDrafting, text: S.$badgeDraftingText }
  if (status === "진행중") return { badge: S.$badgeOngoing, text: S.$badgeOngoingText }
  return { badge: S.$badgeEnded, text: S.$badgeEndedText }
}

function getParticipantBadgeStyles(healthStatus: "normal" | "abnormal") {
  if (healthStatus === "normal")
    return { bg: S.$participantBadgeNormal, text: S.$participantBadgeNormalText }
  return { bg: S.$participantBadgeCaution, text: S.$participantBadgeCautionText }
}

const API_STATUS_MAP: Record<"draft" | "active" | "ended", TbmStatus> = {
  draft: "작성중",
  active: "진행중",
  ended: "종료됨",
}

const STATUS_LABEL: Record<TbmStatus, "drafting" | "ongoing" | "ended"> = {
  작성중: "drafting",
  진행중: "ongoing",
  종료됨: "ended",
}

export const TbmDetailScreen: FC<TbmDetailScreenProps> = observer(function TbmDetailScreen({
  navigation,
  route,
}) {
  const { id } = route.params
  const insets = useSafeAreaInsets()
  const { tbmAdminStore } = useStores()

  const [startModalVisible, setStartModalVisible] = useState(false)
  const [deleteModalVisible, setDeleteModalVisible] = useState(false)
  const [toastVisible, setToastVisible] = useState(false)
  const [isActivating, setIsActivating] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  useFocusEffect(
    useCallback(() => {
      tbmAdminStore.fetchSessionDetail(id)
      return () => {
        tbmAdminStore.clearSessionDetail()
      }
    }, [id, tbmAdminStore]),
  )

  const detail = tbmAdminStore.currentSessionDetail

  const uiStatus = useMemo(
    () => (detail ? API_STATUS_MAP[detail.status as "draft" | "active" | "ended"] : null),
    [detail],
  )

  const isStarted = uiStatus === "진행중" || uiStatus === "종료됨"
  const badgeStyles = uiStatus ? getBadgeStyles(uiStatus) : null

  const handleActivate = useCallback(async () => {
    setStartModalVisible(false)
    setIsActivating(true)
    try {
      await tbmAdminStore.activateSession(id)
      setToastVisible(true)
    } catch {
      // error handled in store
    } finally {
      setIsActivating(false)
    }
  }, [id, tbmAdminStore])

  const handleDelete = useCallback(async () => {
    setDeleteModalVisible(false)
    setIsDeleting(true)
    try {
      await tbmAdminStore.deleteSession(id)
      navigation.goBack()
    } catch {
      setIsDeleting(false)
    }
  }, [id, tbmAdminStore, navigation])

  if (!detail || !uiStatus || !badgeStyles) return null

  return (
    <>
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
          {/* ── 상세 카드 ── */}
          <View style={S.$detailCard}>
            <View style={S.$cardTopRow}>
              <View style={badgeStyles.badge}>
                <Text
                  text={translate(`tbmListScreen:status.${STATUS_LABEL[uiStatus]}`)}
                  style={badgeStyles.text}
                />
              </View>
              <Text text={detail.workDate} style={S.$cardDate} />
            </View>

            <Text text={detail.title} style={S.$cardTitle} />

            <View style={S.$cardWorkDateRow}>
              <IconCalendar size={20} color="#6B7281" />
              <Text
                text={translate("tbmDetailScreen:workDate", { date: detail.workDate })}
                style={S.$cardWorkDate}
              />
            </View>

            <View style={S.$cardAuthorRow}>
              <View style={S.$cardAvatar} />
              <View>
                <Text text={detail.createdByName} style={S.$cardAuthorName} />
                <Text text={detail.workplaceName ?? ""} style={S.$cardAuthorLocation} />
              </View>
            </View>

            <View style={S.$cardDivider} />

            <Text text={translate("tbmDetailScreen:activityLabel")} style={S.$activityLabel} />
            <Text text={detail.content} style={S.$activityContent} />
          </View>

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
          {detail.materials.map((item) => (
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

          {/* ── 참여자 목록 섹션 (활동 시작 후) ── */}
          {isStarted && (
            <>
              <View style={S.$participantHeaderRow}>
                <Text
                  text={translate("tbmDetailScreen:participantHeader", {
                    count: detail.participants.length,
                  })}
                  style={S.$participantSectionHeader}
                />
                <View style={S.$participantHeaderLine} />
              </View>
              {detail.participants.length === 0 ? (
                <Text
                  text={translate("tbmDetailScreen:participantEmpty")}
                  style={S.$participantEmpty}
                />
              ) : (
                detail.participants.map((p) => {
                  const pBadge = getParticipantBadgeStyles(p.healthStatus as "normal" | "abnormal")
                  return (
                    <View key={p.id} style={S.$participantCard}>
                      <Text text={p.workerName} style={S.$participantName} />
                      <View style={pBadge.bg}>
                        <Text
                          text={translate(
                            p.healthStatus === "normal"
                              ? "tbmDetailScreen:badgeNormal"
                              : "tbmDetailScreen:badgeCaution",
                          )}
                          style={pBadge.text}
                        />
                      </View>
                      <Text text={p.participatedAt} style={S.$participantTime} />
                    </View>
                  )
                })
              )}
            </>
          )}

          {/* ── 하단 액션 바 ── */}
          <View style={S.$bottomBar}>
            <TouchableOpacity
              style={S.$startBtn}
              activeOpacity={0.8}
              disabled={isActivating || uiStatus === "종료됨"}
              onPress={() =>
                isStarted
                  ? navigation.navigate("TbmReport", { id })
                  : setStartModalVisible(true)
              }
            >
              {isStarted ? (
                <EducationFrame width={22} height={22} color="#FFFFFF" />
              ) : (
                <IconPlayerPlayFilled size={24} color="#FFFFFF" />
              )}
              <Text
                text={translate(
                  isStarted ? "tbmDetailScreen:endActivity" : "tbmDetailScreen:startActivity",
                )}
                style={S.$startBtnText}
              />
            </TouchableOpacity>

            {!isStarted && (
              <View style={S.$actionRow}>
                <TouchableOpacity
                  style={S.$editBtn}
                  activeOpacity={0.75}
                  onPress={() => console.log("수정:", id)}
                >
                  <IconEdit size={16} color="#4C4C4C" />
                  <Text text={translate("tbmDetailScreen:edit")} style={S.$editBtnText} />
                </TouchableOpacity>
                <TouchableOpacity
                  style={S.$deleteBtn}
                  activeOpacity={0.75}
                  disabled={isDeleting}
                  onPress={() => setDeleteModalVisible(true)}
                >
                  <IconTrash size={16} color="#F87165" />
                  <Text text={translate("tbmDetailScreen:delete")} style={S.$deleteBtnText} />
                </TouchableOpacity>
              </View>
            )}
          </View>
        </ScrollView>
      </StackScreen>

      <ConfirmModal
        visible={deleteModalVisible}
        icon={
          <View style={S.$modalDeleteIconCircle}>
            <IconTrash size={26} color="#E03526" />
          </View>
        }
        title={translate("tbmDetailScreen:deleteModal.title")}
        message={translate("tbmDetailScreen:deleteModal.message")}
        cancelLabel={translate("tbmDetailScreen:deleteModal.cancel")}
        confirmLabel={translate("tbmDetailScreen:deleteModal.confirm")}
        confirmBgColor="#E03526"
        onCancel={() => setDeleteModalVisible(false)}
        onConfirm={handleDelete}
      />

      <ConfirmModal
        visible={startModalVisible}
        icon={
          <View style={S.$modalStartIconCircle}>
            <EducationFrame width={26} height={26} color="#1062D8" />
          </View>
        }
        title={translate("tbmDetailScreen:startModal.title")}
        message={translate("tbmDetailScreen:startModal.message")}
        cancelLabel={translate("tbmDetailScreen:startModal.cancel")}
        confirmLabel={translate("tbmDetailScreen:startModal.confirm")}
        confirmBgColor="#1062D8"
        onCancel={() => setStartModalVisible(false)}
        onConfirm={handleActivate}
      />

      <Toast
        visible={toastVisible}
        message={translate("tbmDetailScreen:toastStarted")}
        icon={<IconCheck size={14} color="#FFFFFF" strokeWidth={2.5} />}
        onHide={() => setToastVisible(false)}
      />
    </>
  )
})
