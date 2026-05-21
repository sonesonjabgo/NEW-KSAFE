import { FC, useCallback, useMemo, useRef, useState } from "react"
import {
  Animated,
  Image,
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native"
import { IconAlertCircle, IconChevronDown } from "@tabler/icons-react-native"
import { Building } from "lucide-react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"

import Pic1 from "@assets/icons/pic1.svg"
import Pic2 from "@assets/icons/pic2.svg"
import HeaderBell from "@assets/icons/nav/header_bell.svg"

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

  const [workplace, setWorkplace] = useState("")
  const [location, setLocation] = useState("")
  const [hazardFactor, setHazardFactor] = useState("")
  const [photos, setPhotos] = useState<string[]>([])
  const [workplaceModalVisible, setWorkplaceModalVisible] = useState(false)
  const [photoModalVisible, setPhotoModalVisible] = useState(false)

  const slideAnim = useRef(new Animated.Value(300)).current
  const photoSlideAnim = useRef(new Animated.Value(300)).current

  const openWorkplaceModal = useCallback(() => {
    setWorkplaceModalVisible(true)
    Animated.timing(slideAnim, { toValue: 0, duration: 250, useNativeDriver: true }).start()
  }, [slideAnim])

  const closeWorkplaceModal = useCallback(() => {
    Animated.timing(slideAnim, { toValue: 300, duration: 200, useNativeDriver: true }).start(
      () => setWorkplaceModalVisible(false),
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
    console.log(JSON.stringify({ workplace, location, hazardFactor, photos }, null, 2))
  }, [workplace, location, hazardFactor, photos])

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
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <ScrollView
            style={S.$scrollContent}
            contentContainerStyle={S.$scrollInner}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
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
              <TouchableOpacity style={S.$inputRow} activeOpacity={0.7} onPress={openWorkplaceModal}>
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
              <Text
                text={translate("hazardRiskCreateScreen:location.label")}
                style={S.$sectionLabel}
              />
              <View style={S.$inputRow}>
                <TextInput
                  style={S.$inputText}
                  value={location}
                  onChangeText={(t) => setLocation(t.slice(0, 200))}
                  placeholder={translate("hazardRiskCreateScreen:location.placeholder")}
                  placeholderTextColor="#BBBBBB"
                  maxLength={200}
                />
              </View>
              <Text
                text={translate("hazardRiskCreateScreen:location.helper")}
                style={S.$helperText}
              />
            </View>

            {/* 위험요인 */}
            <View style={S.$section}>
              <Text
                text={translate("hazardRiskCreateScreen:hazardFactor.label")}
                style={S.$sectionLabel}
              />
              <View style={S.$textarea}>
                <TextInput
                  style={S.$textareaInput}
                  value={hazardFactor}
                  onChangeText={(t) => setHazardFactor(t.slice(0, 1000))}
                  placeholder={translate("hazardRiskCreateScreen:hazardFactor.placeholder")}
                  placeholderTextColor="#BBBBBB"
                  maxLength={1000}
                  multiline
                  scrollEnabled={false}
                />
              </View>
              <Text
                text={translate("hazardRiskCreateScreen:hazardFactor.helper")}
                style={S.$helperText}
              />
            </View>

            {/* 현장 사진 */}
            <View style={[S.$section, { borderBottomWidth: 0 }]}>
              <Text
                text={translate("hazardRiskCreateScreen:sitePhotos.label")}
                style={S.$sectionLabel}
              />
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
            </View>
          </ScrollView>

          {/* 제출하기 버튼 */}
          <View style={[S.$submitBar, { paddingBottom: insets.bottom + 16 }]}>
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
                  <Building size={20} color={isSelected ? "#1062D8" : "#979797"} strokeWidth={1.8} />
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
              onPress={() => { console.log("카메라"); closePhotoModal() }}
            >
              <Text
                text={translate("hazardRiskCreateScreen:sitePhotos.camera")}
                style={S.$workplaceOptionText}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={S.$workplaceOption}
              activeOpacity={0.7}
              onPress={() => { console.log("앨범"); closePhotoModal() }}
            >
              <Text
                text={translate("hazardRiskCreateScreen:sitePhotos.album")}
                style={S.$workplaceOptionText}
              />
            </TouchableOpacity>
          </Animated.View>
        </Pressable>
      </Modal>
    </>
  )
}
