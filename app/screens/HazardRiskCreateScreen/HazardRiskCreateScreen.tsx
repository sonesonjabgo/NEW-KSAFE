import { FC, useCallback, useEffect, useMemo, useRef, useState } from "react"
import {
  Animated,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native"
import { KeyboardAwareScrollView } from "react-native-keyboard-controller"
import { IconAlertCircle, IconChevronDown } from "@tabler/icons-react-native"
import { Building, Check, Trash2, X } from "lucide-react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"

import HeaderBell from "@assets/icons/nav/header_bell.svg"
import Pic1 from "@assets/icons/pic1.svg"
import Pic2 from "@assets/icons/pic2.svg"

import { ConfirmModal } from "@/components/ConfirmModal"
import { StackScreen } from "@/components/StackScreen"
import { Text } from "@/components/Text"
import { translate } from "@/i18n/translate"
import { AppStackScreenProps } from "@/navigators/navigationTypes"

import * as S from "./styles"

type HazardRiskCreateScreenProps = AppStackScreenProps<"HazardRiskCreate">

const MOCK_WORKPLACES = [
  "서울 영등포구 레미안스 비즈타워",
  "부산 해운대구 센텀시티",
  "경기 화성시 동탄산업단지 A동",
  "인천 연수구 송도동 건설현장",
]

export const HazardRiskCreateScreen: FC<HazardRiskCreateScreenProps> = ({ navigation }) => {
  const insets = useSafeAreaInsets()
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false)

  useEffect(() => {
    const showEvent = Platform.OS === "ios" ? "keyboardWillShow" : "keyboardDidShow"
    const hideEvent = Platform.OS === "ios" ? "keyboardWillHide" : "keyboardDidHide"
    const showSub = Keyboard.addListener(showEvent, () => setIsKeyboardVisible(true))
    const hideSub = Keyboard.addListener(hideEvent, () => setIsKeyboardVisible(false))
    return () => { showSub.remove(); hideSub.remove() }
  }, [])

  const [workplace, setWorkplace] = useState("")
  const [location, setLocation] = useState("")
  const [hazardFactor, setHazardFactor] = useState("")
  const [photos, setPhotos] = useState<string[]>([])
  const [workplaceModalVisible, setWorkplaceModalVisible] = useState(false)
  const [photoModalVisible, setPhotoModalVisible] = useState(false)
  const [locationFocused, setLocationFocused] = useState(false)
  const [hazardFocused, setHazardFocused] = useState(false)
  const [deletePhotoIndex, setDeletePhotoIndex] = useState<number | null>(null)
  const [successModalVisible, setSuccessModalVisible] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const hasLocationError = submitted && !location.trim()
  const hasHazardError = submitted && !hazardFactor.trim()
  const isLocationAtLimit = location.length >= 200
  const isHazardAtLimit = hazardFactor.length >= 1000

  const slideAnim = useRef(new Animated.Value(300)).current
  const photoSlideAnim = useRef(new Animated.Value(300)).current

  const openWorkplaceModal = useCallback(() => {
    setWorkplaceModalVisible(true)
    Animated.timing(slideAnim, { toValue: 0, duration: 250, useNativeDriver: true }).start()
  }, [slideAnim])

  const closeWorkplaceModal = useCallback(() => {
    Animated.timing(slideAnim, { toValue: 300, duration: 200, useNativeDriver: true }).start(() =>
      setWorkplaceModalVisible(false),
    )
  }, [slideAnim])

  const openPhotoModal = useCallback(() => {
    setPhotoModalVisible(true)
    Animated.timing(photoSlideAnim, { toValue: 0, duration: 250, useNativeDriver: true }).start()
  }, [photoSlideAnim])

  const closePhotoModal = useCallback(() => {
    Animated.timing(photoSlideAnim, { toValue: 300, duration: 200, useNativeDriver: true }).start(
      () => setPhotoModalVisible(false),
    )
  }, [photoSlideAnim])

  const handleSelectWorkplace = useCallback(
    (wp: string) => {
      setWorkplace(wp)
      closeWorkplaceModal()
    },
    [closeWorkplaceModal],
  )

  const isValid = useMemo(
    () => !!workplace && !!location.trim() && !!hazardFactor.trim(),
    [workplace, location, hazardFactor],
  )

  const handleSubmit = useCallback(() => {
    setSubmitted(true)
    if (!isValid) return
    setSuccessModalVisible(true)
  }, [isValid])

  return (
    <>
      <StackScreen
        title={translate("hazardRiskCreateScreen:title")}
        onBack={() => navigation.goBack()}
        contentBg="#FFFFFF"
        squareTop
      >
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === "ios" ? "padding" : undefined}
          keyboardVerticalOffset={Platform.OS === "ios" ? Math.max(100, insets.top + 60) : 0}
        >
          <KeyboardAwareScrollView
            style={S.$scrollContent}
            contentContainerStyle={S.$scrollInner}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
            bottomOffset={Platform.OS === "ios" ? 170 : 80}
          >
            {/* 작성 가이드 */}
            <View style={[S.$card, S.$guideRow]}>
              <View style={S.$guideIconWrap}>
                <HeaderBell width={25} height={25} color="#1062D8" />
              </View>
              <View style={S.$guideTextBlock}>
                <Text
                  text={translate("hazardRiskCreateScreen:guide.title")}
                  style={S.$guideTitle}
                />
                <Text
                  text={translate("hazardRiskCreateScreen:guide.description")}
                  style={S.$guideDesc}
                />
              </View>
            </View>

            {/* 사업장 */}
            <View style={S.$section}>
              <Text
                text={translate("hazardRiskCreateScreen:workplace.label")}
                style={S.$sectionLabel}
              />
              <TouchableOpacity
                style={S.$inputRow}
                activeOpacity={0.7}
                onPress={openWorkplaceModal}
              >
                <Text
                  text={workplace || translate("hazardRiskCreateScreen:workplace.placeholder")}
                  style={[S.$inputText, !workplace && S.$inputPlaceholder]}
                  numberOfLines={1}
                />
                <IconChevronDown size={18} color="#0B3069" />
              </TouchableOpacity>
              <Text
                text={translate("hazardRiskCreateScreen:workplace.helper")}
                style={S.$helperText}
              />
            </View>

            {/* 위치 */}
            <View style={S.$section}>
              <View style={S.$labelRow}>
                <Text
                  text={translate("hazardRiskCreateScreen:location.label")}
                  style={S.$sectionLabel}
                />
                <Text text=" *" style={S.$required} />
              </View>
              <View
                style={[
                  S.$inputRow,
                  locationFocused && !hasLocationError && !isLocationAtLimit && S.$inputRowFocused,
                  (hasLocationError || isLocationAtLimit) && S.$inputRowError,
                ]}
              >
                <TextInput
                  style={S.$inputText}
                  value={location}
                  onChangeText={(t) => setLocation(t.slice(0, 200))}
                  placeholder={translate("hazardRiskCreateScreen:location.placeholder")}
                  placeholderTextColor="#666666"
                  maxLength={200}
                  onFocus={() => setLocationFocused(true)}
                  onBlur={() => setLocationFocused(false)}
                />
              </View>
              <View style={S.$helperRow}>
                <Text
                  text={translate("hazardRiskCreateScreen:location.helper")}
                  style={[S.$helperText, { flex: 1 }]}
                />
                <Text
                  text={`${location.length} / 200`}
                  style={[S.$charCountText, isLocationAtLimit && S.$charCountTextError]}
                />
              </View>
              {isLocationAtLimit && (
                <View style={S.$errorRow}>
                  <IconAlertCircle size={14} color="#E03C3C" strokeWidth={2} />
                  <Text
                    text={translate("hazardRiskCreateScreen:location.errorMaxLength")}
                    style={S.$errorText}
                  />
                </View>
              )}
              {hasLocationError && (
                <View style={S.$errorRow}>
                  <IconAlertCircle size={14} color="#E03C3C" strokeWidth={2} />
                  <Text
                    text={translate("hazardRiskCreateScreen:location.errorRequired")}
                    style={S.$errorText}
                  />
                </View>
              )}
            </View>

            {/* 위험요인 */}
            <View style={S.$section}>
              <View style={S.$labelRow}>
                <Text
                  text={translate("hazardRiskCreateScreen:hazardFactor.label")}
                  style={S.$sectionLabel}
                />
                <Text text=" *" style={S.$required} />
              </View>
              <View
                style={[
                  S.$textarea,
                  hazardFocused && !hasHazardError && !isHazardAtLimit && S.$textareaFocused,
                  (hasHazardError || isHazardAtLimit) && S.$textareaError,
                ]}
              >
                <TextInput
                  style={S.$textareaInput}
                  value={hazardFactor}
                  onChangeText={(t) => setHazardFactor(t.slice(0, 1000))}
                  placeholder={translate("hazardRiskCreateScreen:hazardFactor.placeholder")}
                  placeholderTextColor="#666666"
                  maxLength={1000}
                  multiline
                  scrollEnabled={false}
                  onFocus={() => setHazardFocused(true)}
                  onBlur={() => setHazardFocused(false)}
                />
              </View>
              <View style={S.$helperRow}>
                <Text
                  text={translate("hazardRiskCreateScreen:hazardFactor.helper")}
                  style={[S.$helperText, { flex: 1 }]}
                />
                <Text
                  text={`${hazardFactor.length} / 1,000`}
                  style={[
                    S.$charCountText,
                    hazardFactor.length >= 1000 && S.$charCountTextError,
                  ]}
                />
              </View>
              {isHazardAtLimit && (
                <View style={S.$errorRow}>
                  <IconAlertCircle size={14} color="#E03C3C" strokeWidth={2} />
                  <Text
                    text={translate("hazardRiskCreateScreen:hazardFactor.errorMaxLength")}
                    style={S.$errorText}
                  />
                </View>
              )}
              {hasHazardError && (
                <View style={S.$errorRow}>
                  <IconAlertCircle size={14} color="#E03C3C" strokeWidth={2} />
                  <Text
                    text={translate("hazardRiskCreateScreen:hazardFactor.errorRequired")}
                    style={S.$errorText}
                  />
                </View>
              )}
            </View>

            {/* 현장 사진 */}
            <View style={[S.$section, { borderBottomWidth: 0 }]}>
              <View style={S.$labelRow}>
                <Text
                  text={translate("hazardRiskCreateScreen:sitePhotos.label")}
                  style={S.$sectionLabel}
                />
                <Text text=" *" style={S.$required} />
              </View>
              <View style={S.$photoHintRow}>
                <IconAlertCircle size={15} color="#747474" />
                <Text
                  text={translate("hazardRiskCreateScreen:sitePhotos.hint")}
                  style={S.$photoHintText}
                />
              </View>

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

              {photos.length > 0 ? (
                <View style={S.$photoGrid}>
                  {photos.map((uri, i) => (
                    <View key={i} style={S.$photoItemWrapper}>
                      <Image source={{ uri }} style={S.$photoItem} />
                      <TouchableOpacity
                        style={S.$photoRemoveBtn}
                        activeOpacity={0.8}
                        onPress={() => setDeletePhotoIndex(i)}
                      >
                        <X size={12} color="#FFFFFF" strokeWidth={2.5} />
                      </TouchableOpacity>
                    </View>
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
            </View>
          </KeyboardAwareScrollView>

          {/* 제출하기 버튼 */}
          <View style={[S.$submitBar, { paddingBottom: isKeyboardVisible ? 16 : insets.bottom + 16 }]}>
            <TouchableOpacity
              style={[S.$submitBtn, !isValid && S.$submitBtnDisabled]}
              activeOpacity={0.8}
              onPress={handleSubmit}
              disabled={!isValid}
            >
              <Text text={translate("hazardRiskCreateScreen:submit")} style={S.$submitBtnText} />
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </StackScreen>

      {/* 사업장 선택 모달 */}
      <Modal
        visible={workplaceModalVisible}
        transparent
        animationType="fade"
        onRequestClose={closeWorkplaceModal}
      >
        <Pressable style={S.$modalOverlay} onPress={closeWorkplaceModal}>
          <Animated.View
            style={[
              S.$modalContent,
              { paddingBottom: insets.bottom + 16, transform: [{ translateY: slideAnim }] },
            ]}
          >
            <Text
              text={translate("hazardRiskCreateScreen:workplace.modalTitle")}
              style={S.$modalTitle}
            />
            {MOCK_WORKPLACES.map((wp) => {
              const isSelected = workplace === wp
              return (
                <TouchableOpacity
                  key={wp}
                  style={[S.$workplaceOption, isSelected && S.$workplaceOptionSelected]}
                  activeOpacity={0.7}
                  onPress={() => handleSelectWorkplace(wp)}
                >
                  <Building
                    size={20}
                    color={isSelected ? "#1062D8" : "#979797"}
                    strokeWidth={1.8}
                  />
                  <Text
                    text={wp}
                    style={[S.$workplaceOptionText, isSelected && S.$workplaceOptionTextSelected]}
                    numberOfLines={2}
                  />
                </TouchableOpacity>
              )
            })}
          </Animated.View>
        </Pressable>
      </Modal>

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
                closePhotoModal()
                setPhotos((prev) => [
                  ...prev,
                  `https://picsum.photos/seed/camera${Date.now()}/400/300`,
                ])
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
                closePhotoModal()
                setPhotos((prev) => [
                  ...prev,
                  `https://picsum.photos/seed/album${Date.now()}/400/300`,
                ])
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

      <ConfirmModal
        visible={successModalVisible}
        icon={
          <View style={S.$successIconCircle}>
            <Check size={26} color="#1062D8" strokeWidth={2} />
          </View>
        }
        title={translate("hazardRiskCreateScreen:successModal.title")}
        message={translate("hazardRiskCreateScreen:successModal.message")}
        confirmLabel={translate("hazardRiskCreateScreen:successModal.confirm")}
        confirmBgColor="#1062D8"
        onConfirm={() => {
          setSuccessModalVisible(false)
          const now = new Date()
          const pad = (n: number) => n.toString().padStart(2, "0")
          const dateStr = `${now.getFullYear()}.${pad(now.getMonth() + 1)}.${pad(now.getDate())} ${pad(now.getHours())}:${pad(now.getMinutes())}`
          const newDetail = {
            id: Date.now(),
            status: "pending" as const,
            date: dateStr,
            location: location.trim(),
            description: hazardFactor.trim(),
            reporterName: "홍길동",
            reporterInitial: "홍",
            workplace,
            isMyReport: true,
            photos,
            managerName: "김영희",
            managerInitial: "김",
            managerAffiliation: "안전관리팀",
            history: [{ id: 1, status: "pending" as const, date: dateStr }],
          }
          navigation.replace("HazardRiskDetail", { newDetail })
        }}
      />

      <ConfirmModal
        visible={deletePhotoIndex !== null}
        icon={
          <View style={S.$deleteIconCircle}>
            <Trash2 size={26} color="#E42E2B" strokeWidth={2} />
          </View>
        }
        title={translate("hazardRiskCreateScreen:deletePhotoModal.title")}
        message={translate("hazardRiskCreateScreen:deletePhotoModal.message")}
        cancelLabel={translate("hazardRiskCreateScreen:deletePhotoModal.cancel")}
        confirmLabel={translate("hazardRiskCreateScreen:deletePhotoModal.confirm")}
        confirmBgColor="#E42E2B"
        onCancel={() => setDeletePhotoIndex(null)}
        onConfirm={() => {
          if (deletePhotoIndex !== null) {
            setPhotos((prev) => prev.filter((_, idx) => idx !== deletePhotoIndex))
          }
          setDeletePhotoIndex(null)
        }}
      />
    </>
  )
}
