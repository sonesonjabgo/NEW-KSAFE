import { FC, useCallback, useRef, useState } from "react"
import {
  Animated,
  Image,
  Modal,
  Platform,
  Pressable,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native"
import { KeyboardAwareScrollView } from "react-native-keyboard-controller"
import { Check, CircleAlert, Ellipsis, X } from "lucide-react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"

import Pic1 from "@assets/icons/pic1.svg"
import Pic2 from "@assets/icons/pic2.svg"

import { StackScreen } from "@/components/StackScreen"
import { Text } from "@/components/Text"
import { UserAvatar } from "@/components/UserAvatar"
import { useRole } from "@/context/RoleContext"
import { translate } from "@/i18n/translate"
import type { HazardRiskDetailScreenProps } from "@/screens/HazardRiskScreen/types"
import type { HazardStatus } from "@/screens/HazardRiskScreen/types"
import { colors } from "@/theme/colors"

import { mockHazardDetails } from "./mockData"
import * as S from "./styles"

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
  const [selectedStatus, setSelectedStatus] = useState<HazardStatus>(detail.status)
  const [actionNote, setActionNote] = useState("")
  const [actionPhotos, setActionPhotos] = useState<string[]>([])
  const [photoModalVisible, setPhotoModalVisible] = useState(false)

  const photoSlideAnim = useRef(new Animated.Value(300)).current

  const openPhotoModal = useCallback(() => {
    setPhotoModalVisible(true)
    Animated.timing(photoSlideAnim, { toValue: 0, duration: 250, useNativeDriver: true }).start()
  }, [photoSlideAnim])

  const closePhotoModal = useCallback(() => {
    Animated.timing(photoSlideAnim, { toValue: 300, duration: 200, useNativeDriver: true }).start(
      () => setPhotoModalVisible(false),
    )
  }, [photoSlideAnim])

  const isInputEnabled = selectedStatus === "completed" || selectedStatus === "impossible"

  return (
    <StackScreen
      title={translate("hazardRiskDetailScreen:title")}
      onBack={() => navigation.goBack()}
      contentBg={colors.screenBg}
      squareTop
    >
      <KeyboardAwareScrollView
        style={S.$flex1}
        contentContainerStyle={S.$scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        bottomOffset={Platform.OS === "ios" ? 120 : 100}
      >
        {/* 제보 정보 카드 */}
        <View style={S.$infoCard}>
          {/* 뱃지 + 날짜 */}
          <View style={S.$cardTopRow}>
            <StatusBadge status={detail.status} />
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
              {/* 상태 변경 버튼 3개 */}
              <View style={S.$statusButtonRow}>
                {ACTION_STATUSES.map((status) => {
                  const isSelected = selectedStatus === status
                  const btnColor = ACTION_BUTTON_COLOR[status]
                  return (
                    <TouchableOpacity
                      key={status}
                      style={[
                        S.$statusButton,
                        isSelected && {
                          backgroundColor: btnColor.bg,
                          borderColor: btnColor.border,
                        },
                      ]}
                      onPress={() => setSelectedStatus(status)}
                      activeOpacity={0.7}
                    >
                      {(() => {
                        const IconComponent = ACTION_BUTTON_ICON[status]
                        const iconColor = isSelected ? btnColor.text : "#AAAAAA"
                        return <IconComponent size={24} color={iconColor} />
                      })()}
                      <Text
                        text={translate(`hazardRiskScreen:status.${status}` as any)}
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

              {/* 조치 내용 입력 + 점선 입력 카드 */}
              <View style={{ gap: 11 }}>
                <Text
                  text={translate("hazardRiskDetailScreen:adminSection.noteLabel")}
                  style={S.$noteLabel}
                />
                <View style={S.$dashedInputCard}>
                  <TextInput
                    style={S.$dashedInput}
                    placeholder={translate(PLACEHOLDER_I18N_KEY[selectedStatus] as any)}
                    placeholderTextColor="#BBBBBB"
                    multiline
                    editable={isInputEnabled}
                    value={actionNote}
                    onChangeText={setActionNote}
                  />
                </View>
                <Text
                  text={translate("hazardRiskDetailScreen:adminSection.noteHint")}
                  style={S.$noteHint}
                />

                {/* 조치완료 상태일 때만 표시 */}
                {selectedStatus === "completed" && (
                  <>
                    <View style={S.$noteDivider} />

                    {/* 현장 사진* */}
                    <View style={S.$photoLabelContainer}>
                      <Text
                        text={translate("hazardRiskDetailScreen:adminSection.sitePhotosLabel")}
                        style={S.$photoLabel}
                      />
                      <Text text=" *" style={[S.$photoLabel, S.$asterisk]} />
                    </View>

                    {/* 안내 문구 */}
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

                    {/* 사진 등록 카드 */}
                    <View style={S.$photoGuideCard}>
                      <Pic1 width={30} height={30} />
                      <Text
                        text={translate("hazardRiskCreateScreen:sitePhotos.guide")}
                        style={[S.$photoGuideLine, { flex: 1 }]}
                      />
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
                    </View>

                    {actionPhotos.length > 0 ? (
                      <View style={[S.$photoGrid, { marginTop: 10 }]}>
                        {actionPhotos.map((uri, i) => (
                          <Image key={i} source={{ uri }} style={S.$photoItem} />
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
            {detail.history
              ?.filter((item) => item.status !== "ongoing")
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
                            {translate(
                              `hazardRiskDetailScreen:statusHistory.contents.${item.status}` as any,
                            )}
                            {translate(
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

      {/* 사진 추가 모달 */}
      <Modal
        visible={photoModalVisible}
        transparent
        animationType="fade"
        onRequestClose={closePhotoModal}
      >
        <Pressable style={S.$modalOverlay} onPress={closePhotoModal}>
          <Animated.View
            style={[
              S.$modalContent,
              { paddingBottom: insets.bottom + 16, transform: [{ translateY: photoSlideAnim }] },
            ]}
          >
            <TouchableOpacity
              style={S.$workplaceOption}
              activeOpacity={0.7}
              onPress={() => {
                console.log("카메라")
                closePhotoModal()
              }}
            >
              <Text
                text={translate("hazardRiskCreateScreen:sitePhotos.camera")}
                style={S.$workplaceOptionText}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={S.$workplaceOption}
              activeOpacity={0.7}
              onPress={() => {
                console.log("앨범")
                closePhotoModal()
              }}
            >
              <Text
                text={translate("hazardRiskCreateScreen:sitePhotos.album")}
                style={S.$workplaceOptionText}
              />
            </TouchableOpacity>
          </Animated.View>
        </Pressable>
      </Modal>
    </StackScreen>
  )
}
