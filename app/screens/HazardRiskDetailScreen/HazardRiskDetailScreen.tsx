import { FC, useCallback, useRef, useState } from "react"
import {
  Animated,
  Image,
  ImageSourcePropType,
  Modal,
  PanResponder,
  Platform,
  StyleSheet,
  TextInput,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native"

import { KeyboardAwareScrollView } from "react-native-keyboard-controller"
import { Check, CircleAlert, Ellipsis, X } from "lucide-react-native"
import { IconCamera, IconPhoto } from "@tabler/icons-react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"

import Pic1 from "@assets/icons/pic1.svg"
import Pic2 from "@assets/icons/pic2.svg"

import { StackScreen } from "@/components/StackScreen"
import { Text } from "@/components/Text"
import { Toast } from "@/components/Toast"
import { UserAvatar } from "@/components/UserAvatar"
import { useRole } from "@/context/RoleContext"
import { translate } from "@/i18n/translate"
import type { HazardRiskDetailScreenProps } from "@/screens/HazardRiskScreen/types"
import type { HazardStatus } from "@/screens/HazardRiskScreen/types"
import { colors } from "@/theme/colors"
import { typography } from "@/theme/typography"

import { mockHazardDetails } from "./mockData"
import * as S from "./styles"

function formatDate(d: Date) {
  const pad = (n: number) => String(n).padStart(2, "0")
  return `${d.getFullYear()}.${pad(d.getMonth() + 1)}.${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}`
}

const STATUS_BADGE_STYLE: Record<HazardStatus, { bg: string; text: string }> = {
  pending: { bg: "#E5E6E9", text: "#606679" },
  ongoing: { bg: "#CFFFE1", text: "#18A24A" },
  completed: { bg: "#EEF3FC", text: "#214ACC" },
  impossible: { bg: "#FFE8E8", text: "#D84040" },
}

const ACTION_STATUSES: HazardStatus[] = ["ongoing", "completed", "impossible"]

const ACTION_BUTTON_ICON: Record<string, FC<{ size: number; color: string }>> = {
  ongoing: Ellipsis,
  completed: Check,
  impossible: X,
}

const ACTION_BUTTON_COLOR: Record<HazardStatus, { bg: string; border: string; text: string }> = {
  pending: { bg: "#E5E6E9", border: "#C5C7CF", text: "#606679" },
  ongoing: { bg: "#CFFFE1", border: "#18A24A", text: "#18A24A" },
  completed: { bg: "#EFF4FD", border: "#1062D8", text: "#1062D8" },
  impossible: { bg: "#FDF7F7", border: "#E03526", text: "#E03526" },
}

const PLACEHOLDER_I18N_KEY: Record<HazardStatus, string> = {
  pending: "hazardRiskDetailScreen:adminSection.placeholder.pending",
  ongoing: "hazardRiskDetailScreen:adminSection.placeholder.ongoing",
  completed: "hazardRiskDetailScreen:adminSection.placeholder.completed",
  impossible: "hazardRiskDetailScreen:adminSection.placeholder.impossible",
}

const HISTORY_ICON_BORDER: Partial<Record<HazardStatus, string>> = {
  completed: "#D2E4FF",
  impossible: "#FFD1CD",
}

const HISTORY_TITLE_KEY: Partial<Record<HazardStatus, string>> = {
  pending: "hazardRiskDetailScreen:statusHistory.titles.pending",
  completed: "hazardRiskDetailScreen:statusHistory.titles.completed",
  impossible: "hazardRiskDetailScreen:statusHistory.titles.impossible",
}

const StatusBadge: FC<{ status: HazardStatus }> = ({ status }) => {
  const style = STATUS_BADGE_STYLE[status]
  return (
    <View style={[S.$badge, { backgroundColor: style.bg }]}>
      <Text
        text={translate(`hazardRiskScreen:status.${status}` as any)}
        style={[S.$badgeText, { color: style.text }]}
      />
    </View>
  )
}

export const HazardRiskDetailScreen: FC<HazardRiskDetailScreenProps> = ({ navigation, route }) => {
  const insets = useSafeAreaInsets()
  const { id } = route.params
  const detail = mockHazardDetails[id] ?? mockHazardDetails[1]
  const { role } = useRole()
  const [status, setStatus] = useState<HazardStatus>(detail.status)
  const [pendingAction, setPendingAction] = useState<"completed" | "impossible" | null>(null)
  const [actionNote, setActionNote] = useState(
    detail.history?.find((h) => h.status === "completed" || h.status === "impossible")?.note ?? "",
  )
  const [localHistory, setLocalHistory] = useState(detail.history ?? [])
  const [actionPhotos, setActionPhotos] = useState<ImageSourcePropType[]>([])
  const [captureSheetVisible, setCaptureSheetVisible] = useState(false)
  const [toastVisible, setToastVisible] = useState(false)
  const [toastMessage, setToastMessage] = useState("")

  const isOngoing = status === "ongoing"
  const isDone = status === "completed" || status === "impossible"
  const isInputEditable = isOngoing && pendingAction !== null
  const showPhotoSection = isOngoing && pendingAction === "completed"

  const slideAnim = useRef(new Animated.Value(300)).current
  const fadeAnim = useRef(new Animated.Value(0)).current

  const openPhotoModal = useCallback(() => {
    setCaptureSheetVisible(true)
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 200, useNativeDriver: true }),
      Animated.timing(slideAnim, { toValue: 0, duration: 260, useNativeDriver: true }),
    ]).start()
  }, [fadeAnim, slideAnim])

  const closePhotoModal = useCallback(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 0, duration: 160, useNativeDriver: true }),
      Animated.timing(slideAnim, { toValue: 300, duration: 200, useNativeDriver: true }),
    ]).start(() => setCaptureSheetVisible(false))
  }, [fadeAnim, slideAnim])

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, gs) => gs.dy > 5 && gs.dy > Math.abs(gs.dx),
      onPanResponderMove: (_, gs) => { if (gs.dy > 0) slideAnim.setValue(gs.dy) },
      onPanResponderRelease: (_, gs) => {
        if (gs.dy > 80 || gs.vy > 0.5) {
          closePhotoModal()
        } else {
          Animated.spring(slideAnim, { toValue: 0, useNativeDriver: true }).start()
        }
      },
    }),
  ).current

  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const addSamplePhoto = useCallback(() => {
    closePhotoModal()
    setActionPhotos((prev) => [...prev, require("@assets/images/sampleImage.jpg")])
  }, [closePhotoModal])

  return (
    <>
    <StackScreen
      title={translate("hazardRiskDetailScreen:title")}
      onBack={() => navigation.goBack()}
      contentBg={colors.screenBg}
      squareTop
    >
      <KeyboardAwareScrollView
        style={S.$flex1}
        contentContainerStyle={[S.$scrollContent, role === "admin" && { paddingBottom: 80 }]}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        bottomOffset={Platform.OS === "ios" ? 120 : 100}
      >
        {/* 제보 정보 카드 */}
        <View style={S.$infoCard}>
          {/* 뱃지 + 날짜 */}
          <View style={S.$cardTopRow}>
            <StatusBadge status={status} />
            <Text text={detail.date} style={S.$cardDate} />
          </View>

          {/* 위치 */}
          <View style={S.$infoRow}>
            <Text
              text={translate("hazardRiskDetailScreen:infoCard.locationLabel")}
              style={S.$inlineLabel}
            />
            <Text text={detail.location} style={S.$inlineValue} />
          </View>

          {/* 위험요인 */}
          <View style={S.$infoRow}>
            <Text
              text={translate("hazardRiskDetailScreen:infoCard.hazardFactorLabel")}
              style={S.$inlineLabel}
            />
            <Text text={detail.description} style={S.$inlineValue} />
          </View>

          {/* 제보사진 */}
          <View style={S.$photosSection}>
            <Text
              text={translate("hazardRiskDetailScreen:infoCard.sitePhotosLabel")}
              style={S.$photosSectionLabel}
            />
            {detail.photos.length > 0 ? (
              <View style={S.$photoGrid}>
                {detail.photos.map((uri, index) => (
                  <Image key={index} source={{ uri }} style={S.$photoItem} />
                ))}
              </View>
            ) : (
              <Text
                text={translate("hazardRiskDetailScreen:infoCard.noPhotos")}
                style={S.$noPhotosText}
              />
            )}
          </View>

          {/* 관리자 프로필 */}
          <View style={S.$managerRow}>
            <UserAvatar
              initial={detail.managerInitial}
              size={40}
              bgColor="#E5EDF8"
              textColor="#1062D8"
            />
            <View style={S.$managerInfo}>
              <Text text={detail.managerName} style={S.$managerName} />
              <Text text={detail.managerAffiliation} style={S.$managerAffiliation} />
            </View>
          </View>
        </View>

        {/* 관리자 전용: 상태 변경 및 처리 */}
        {role === "admin" && (
          <View style={S.$adminSection}>
            {/* 섹션 제목 + 구분선 */}
            <View style={S.$sectionTitleRow}>
              <Text
                text={translate("hazardRiskDetailScreen:adminSection.title")}
                style={S.$sectionTitle}
              />
              <View style={S.$sectionDivider} />
            </View>

            {/* 카드 */}
            <View style={S.$adminCard}>
              {/* 상태 버튼 3개 — 항상 표시, 상태에 따라 인터랙션 제어 */}
              <View style={S.$statusButtonRow}>
                {ACTION_STATUSES.map((s) => {
                  const isSelected = isOngoing
                    ? pendingAction === null ? s === "ongoing" : pendingAction === s
                    : status === s
                  const isEnabled = isOngoing && (s === "completed" || s === "impossible")
                  const btnColor = ACTION_BUTTON_COLOR[s]
                  return (
                    <TouchableOpacity
                      key={s}
                      style={[
                        S.$statusButton,
                        isSelected && {
                          backgroundColor: btnColor.bg,
                          borderColor: btnColor.border,
                        },
                      ]}
                      onPress={
                        isEnabled
                          ? () => setPendingAction(s as "completed" | "impossible")
                          : undefined
                      }
                      activeOpacity={isEnabled ? 0.7 : 1}
                    >
                      {(() => {
                        const IconComponent = ACTION_BUTTON_ICON[s]
                        const iconColor = isSelected ? btnColor.text : "#AAAAAA"
                        return <IconComponent size={24} color={iconColor} />
                      })()}
                      <Text
                        text={translate(`hazardRiskScreen:status.${s}` as any)}
                        style={[S.$statusButtonText, isSelected && { color: btnColor.text }]}
                      />
                      {isSelected && (
                        <View style={[S.$selectedBadge, { backgroundColor: btnColor.border }]}>
                          <Check size={12} color="#FFFFFF" strokeWidth={3} />
                        </View>
                      )}
                    </TouchableOpacity>
                  )
                })}
              </View>

              {/* 조치 내용 입력 — 항상 표시 */}
              <View style={{ gap: 11 }}>
                <Text
                  text={translate("hazardRiskDetailScreen:adminSection.noteLabel")}
                  style={S.$noteLabel}
                />
                <View style={S.$dashedInputCard}>
                  <TextInput
                    style={S.$dashedInput}
                    placeholder={translate(
                      PLACEHOLDER_I18N_KEY[pendingAction ?? status] as any,
                    )}
                    placeholderTextColor="#BBBBBB"
                    multiline
                    editable={isInputEditable}
                    value={actionNote}
                    onChangeText={setActionNote}
                  />
                </View>
                <Text
                  text={translate("hazardRiskDetailScreen:adminSection.noteHint")}
                  style={S.$noteHint}
                />

                {/* 조치완료일 때 사진 업로드 섹션 */}
                {showPhotoSection && (
                  <>
                    <View style={S.$noteDivider} />

                    <View style={S.$photoLabelContainer}>
                      <Text
                        text={translate("hazardRiskDetailScreen:adminSection.sitePhotosLabel")}
                        style={S.$photoLabel}
                      />
                      <Text text=" *" style={[S.$photoLabel, S.$asterisk]} />
                    </View>

                    <View style={S.$photoHintContainer}>
                      <View style={S.$photoHintRow}>
                        <CircleAlert size={14} color="#747474" style={{ marginTop: 2 }} />
                        <Text
                          text={translate(
                            "hazardRiskDetailScreen:adminSection.sitePhotosHints.hint1",
                          )}
                          style={S.$photoHintText}
                        />
                      </View>
                      <View style={S.$photoHintRow}>
                        <CircleAlert size={14} color="#747474" style={{ marginTop: 2 }} />
                        <Text
                          text={translate(
                            "hazardRiskDetailScreen:adminSection.sitePhotosHints.hint2",
                          )}
                          style={S.$photoHintText}
                        />
                      </View>
                    </View>

                    <View style={S.$photoGuideCard}>
                      <Pic1 width={30} height={30} />
                      <Text
                        text={translate("hazardRiskCreateScreen:sitePhotos.guide")}
                        style={[S.$photoGuideLine, { flex: 1 }]}
                      />
                      {isOngoing && pendingAction === "completed" && (
                        <TouchableOpacity
                          style={S.$photoGuideAddBtn}
                          activeOpacity={0.7}
                          onPress={openPhotoModal}
                        >
                          <Text
                            text={translate("hazardRiskCreateScreen:sitePhotos.addButton")}
                            style={S.$photoGuideAddBtnText}
                          />
                        </TouchableOpacity>
                      )}
                    </View>

                    {actionPhotos.length > 0 ? (
                      <View style={[S.$photoGrid, { marginTop: 10 }]}>
                        {actionPhotos.map((src, i) => (
                          <Image key={i} source={src} style={S.$photoItem} />
                        ))}
                      </View>
                    ) : (
                      <View style={S.$photoPreviewCard}>
                        <Pic2 width={30} height={30} />
                        <Text
                          text={translate("hazardRiskCreateScreen:sitePhotos.preview")}
                          style={S.$photoPreviewText}
                        />
                      </View>
                    )}
                  </>
                )}
              </View>
            </View>
          </View>
        )}

        {/* 상태 변경 이력 섹션 */}
        <View style={S.$adminSection}>
          <View style={S.$sectionTitleRow}>
            <Text
              text={translate("hazardRiskDetailScreen:statusHistory.title")}
              style={S.$sectionTitle}
            />
            <View style={S.$sectionDivider} />
          </View>

          {/* 이력 목록 */}
          <View style={S.$historyList}>
            {localHistory
              .filter((item) => item.status !== "ongoing")
              .slice()
              .reverse()
              .map((item, index, arr) => {
                const isLast = index === arr.length - 1
                const btnColor = ACTION_BUTTON_COLOR[item.status]
                const titleKey = HISTORY_TITLE_KEY[item.status]

                return (
                  <View key={item.id} style={S.$historyItem}>
                    {/* 왼쪽: 아이콘 + 연결선 */}
                    <View style={S.$historyLeft}>
                      <View
                        style={[
                          S.$historyIconOuter,
                          { backgroundColor: btnColor.bg },
                          HISTORY_ICON_BORDER[item.status] !== undefined && {
                            borderWidth: 1.5,
                            borderColor: HISTORY_ICON_BORDER[item.status],
                          },
                        ]}
                      >
                        <View style={[S.$historyIconInner, { backgroundColor: btnColor.border }]} />
                      </View>
                      {!isLast && <View style={S.$historyLine} />}
                    </View>

                    {/* 오른쪽: 제목, 날짜, 내용 */}
                    <View style={S.$historyRight}>
                      <View style={S.$historyHeaderRow}>
                        <Text text={translate(titleKey as any)} style={S.$historyTitle} />
                        <Text text={item.date} style={S.$historyDate} />
                      </View>

                      {/* 내용 부분 */}
                      {item.status === "pending" ? (
                        <Text
                          text={translate("hazardRiskDetailScreen:statusHistory.contents.pending")}
                          style={S.$historyContent}
                        />
                      ) : (
                        <View
                          style={[
                            S.$historyCard,
                            {
                              backgroundColor: item.status === "completed" ? "#EFF4FD" : "#FDE8EB",
                            },
                          ]}
                        >
                          <Text style={S.$historyContent}>
                            {item.note
                              ? `${item.note} - 관리자(${detail.managerName})`
                              : translate(
                                  `hazardRiskDetailScreen:statusHistory.contents.${item.status}` as any,
                                ) +
                                translate(
                                  "hazardRiskDetailScreen:statusHistory.contents.adminSuffix",
                                  { name: detail.managerName },
                                )}
                          </Text>
                        </View>
                      )}
                    </View>
                  </View>
                )
              })}
          </View>
        </View>
      </KeyboardAwareScrollView>

      {/* 하단 버튼 */}
      {role === "admin" && (
        <View style={[$bottomBar, { paddingBottom: insets.bottom + 12 }]}>
          {isDone ? (
            <View style={[$bottomBtn, $bottomBtnDisabled]}>
              <Text
                text={translate("hazardRiskDetailScreen:bottomButton.alreadyProcessed")}
                style={$bottomBtnTextDisabled}
              />
            </View>
          ) : (
            <TouchableOpacity
              style={[$bottomBtn, $bottomBtnActive]}
              activeOpacity={0.8}
              onPress={() => {
                const now = formatDate(new Date())
                if (status === "pending") {
                  setStatus("ongoing")
                  setLocalHistory((prev) => [
                    ...prev,
                    { id: Date.now(), status: "ongoing" as HazardStatus, date: now },
                  ])
                } else if (isOngoing) {
                  if (!pendingAction) {
                    setToastMessage(translate("hazardRiskDetailScreen:toast.noAction"))
                    setToastVisible(true)
                    return
                  }
                  if (!actionNote.trim()) {
                    setToastMessage(translate("hazardRiskDetailScreen:toast.noNote"))
                    setToastVisible(true)
                    return
                  }
                  setStatus(pendingAction)
                  setLocalHistory((prev) => [
                    ...prev,
                    { id: Date.now(), status: pendingAction, date: now, note: actionNote.trim() },
                  ])
                  setPendingAction(null)
                }
              }}
            >
              <Text
                text={
                  status === "pending"
                    ? translate("hazardRiskDetailScreen:bottomButton.proceed")
                    : translate("hazardRiskDetailScreen:bottomButton.saveAction")
                }
                style={$bottomBtnTextActive}
              />
            </TouchableOpacity>
          )}
        </View>
      )}

    </StackScreen>
    <Toast
      visible={toastVisible}
      message={toastMessage}
      icon={<X size={14} color="#FFFFFF" strokeWidth={2.5} />}
      iconCircleColor={colors.danger}
      onHide={() => setToastVisible(false)}
    />

    {/* 사진 촬영 방법 선택 바텀시트 */}
    <Modal
      visible={captureSheetVisible}
      transparent
      animationType="none"
      onRequestClose={closePhotoModal}
    >
      <View style={StyleSheet.absoluteFill}>
        <Animated.View
          style={[StyleSheet.absoluteFill, $sheetBackdrop, { opacity: fadeAnim }]}
        />
        <TouchableOpacity
          style={StyleSheet.absoluteFill}
          onPress={closePhotoModal}
          activeOpacity={1}
        />
        <Animated.View
          style={[$sheet, { paddingBottom: insets.bottom + 16, transform: [{ translateY: slideAnim }] }]}
        >
          <View style={$sheetDragHandleArea} {...panResponder.panHandlers}>
            <View style={$sheetDragHandleBar} />
          </View>
          <View style={$sheetBtnRow}>
            <TouchableOpacity style={$sheetBtn} activeOpacity={0.7} onPress={addSamplePhoto}>
              <IconCamera size={20} color={colors.navy} strokeWidth={1.8} />
              <Text text={translate("aiRiskDocCreatorScreen:captureSheet.camera")} style={$sheetBtnLabel} />
            </TouchableOpacity>
            <TouchableOpacity style={$sheetBtn} activeOpacity={0.7} onPress={addSamplePhoto}>
              <IconPhoto size={20} color={colors.navy} strokeWidth={1.8} />
              <Text text={translate("aiRiskDocCreatorScreen:captureSheet.album")} style={$sheetBtnLabel} />
            </TouchableOpacity>
          </View>
        </Animated.View>
      </View>
    </Modal>
    </>
  )
}

const $bottomBar: ViewStyle = {
  paddingHorizontal: 20,
  paddingTop: 12,
  backgroundColor: "#FFFFFF",
  borderTopWidth: 1,
  borderTopColor: "#F0F0F0",
}

const $bottomBtn: ViewStyle = {
  height: 50,
  borderRadius: 10,
  justifyContent: "center",
  alignItems: "center",
}

const $bottomBtnActive: ViewStyle = {
  backgroundColor: "#1062D8",
}

const $bottomBtnDisabled: ViewStyle = {
  backgroundColor: "#F3F2F0",
}

const $bottomBtnTextActive: TextStyle = {
  fontSize: 16,
  fontFamily: typography.primary.semiBold,
  color: "#FFFFFF",
}

const $bottomBtnTextDisabled: TextStyle = {
  fontSize: 16,
  fontFamily: typography.primary.semiBold,
  color: "#FFFFFF",
}

const $sheetBackdrop: ViewStyle = {
  backgroundColor: "rgba(0, 0, 0, 0.4)",
}

const $sheet: ViewStyle = {
  position: "absolute",
  bottom: 0,
  left: 0,
  right: 0,
  backgroundColor: "#FFFFFF",
  borderTopLeftRadius: 20,
  borderTopRightRadius: 20,
}

const $sheetDragHandleArea: ViewStyle = {
  alignItems: "center",
  paddingTop: 12,
  paddingBottom: 8,
}

const $sheetDragHandleBar: ViewStyle = {
  width: 46,
  height: 4,
  borderRadius: 2,
  backgroundColor: "#B0B0B0",
}

const $sheetBtnRow: ViewStyle = {
  flexDirection: "row",
  gap: 12,
  paddingHorizontal: 20,
  paddingTop: 12,
}

const $sheetBtn: ViewStyle = {
  flex: 1,
  height: 54,
  borderRadius: 14,
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
  gap: 8,
  backgroundColor: "#FFFFFF",
  borderWidth: 1,
  borderColor: "#ECECEC",
  shadowColor: "#000000",
  shadowOffset: { width: 0, height: 3 },
  shadowOpacity: 0.12,
  shadowRadius: 8,
  elevation: 5,
}

const $sheetBtnLabel: TextStyle = {
  fontSize: 15,
  fontFamily: typography.primary.semiBold,
  color: colors.navy,
}
