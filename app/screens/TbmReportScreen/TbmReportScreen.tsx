import { FC, useCallback, useEffect, useRef, useState } from "react"
import {
  Animated,
  Image,
  ImageSourcePropType,
  Keyboard,
  KeyboardAvoidingView,
  Modal,
  PanResponder,
  Platform,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native"
import { KeyboardAwareScrollView } from "react-native-keyboard-controller"
import { IconAlertTriangle, IconCalendar, IconCamera, IconPhoto } from "@tabler/icons-react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"

import Pic1 from "@assets/icons/pic1.svg"
import Pic2 from "@assets/icons/pic2.svg"

import { StackScreen } from "@/components/StackScreen"
import { Text } from "@/components/Text"
import { translate } from "@/i18n/translate"
import { colors } from "@/theme/colors"
import { mockTbmDetails } from "@/screens/TbmDetailScreen/mockData"

import * as S from "./styles"
import type { TbmReportScreenProps } from "./types"

export const TbmReportScreen: FC<TbmReportScreenProps> = ({ navigation, route }) => {
  const { id } = route.params
  const insets = useSafeAreaInsets()
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false)

  useEffect(() => {
    const showEvent = Platform.OS === "ios" ? "keyboardWillShow" : "keyboardDidShow"
    const hideEvent = Platform.OS === "ios" ? "keyboardWillHide" : "keyboardDidHide"
    const showSub = Keyboard.addListener(showEvent, () => setIsKeyboardVisible(true))
    const hideSub = Keyboard.addListener(hideEvent, () => setIsKeyboardVisible(false))
    return () => { showSub.remove(); hideSub.remove() }
  }, [])

  const detail = mockTbmDetails[id]

  const [processName, setProcessName] = useState("")
  const [teamName, setTeamName] = useState("")
  const [educationSummary, setEducationSummary] = useState("")
  const [specialNotes, setSpecialNotes] = useState("")
  const [photos, setPhotos] = useState<ImageSourcePropType[]>([])

  const [captureSheetVisible, setCaptureSheetVisible] = useState(false)
  const slideAnim = useRef(new Animated.Value(300)).current
  const fadeAnim = useRef(new Animated.Value(0)).current

  const openCaptureSheet = useCallback(() => {
    setCaptureSheetVisible(true)
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 200, useNativeDriver: true }),
      Animated.timing(slideAnim, { toValue: 0, duration: 260, useNativeDriver: true }),
    ]).start()
  }, [fadeAnim, slideAnim])

  const closeCaptureSheet = useCallback(() => {
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
          closeCaptureSheet()
        } else {
          Animated.spring(slideAnim, { toValue: 0, useNativeDriver: true }).start()
        }
      },
    }),
  ).current

  const addSamplePhoto = useCallback(() => {
    closeCaptureSheet()
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    setPhotos((prev) => [...prev, require("@assets/images/sampleImage.jpg")])
  }, [closeCaptureSheet])

  const handleTakePhoto = addSamplePhoto
  const handleSelectFromAlbum = addSamplePhoto

  if (!detail) return null

  return (
    <>
    <StackScreen
      title={translate("tbmReportScreen:title")}
      onBack={() => navigation.goBack()}
      squareTop
      contentBg="#FFFFFF"
    >
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={Platform.OS === "ios" ? Math.max(100, insets.top + 60) : 0}
      >
        <KeyboardAwareScrollView
          style={S.$scrollContent}
          contentContainerStyle={[S.$scrollInner, { paddingBottom: (insets.bottom || 0) + 40 }]}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          bottomOffset={Platform.OS === "ios" ? 170 : 80}
        >
          {/* ── 1+2. 주의사항 + 활동명 카드 (간격 20, 아래 섹션과 40) ── */}
          <View style={{ gap: 20, marginBottom: 5 }}>
            <View style={S.$noticeCard}>
              <View style={S.$noticeRow}>
                <View style={{ paddingVertical: 6 }}>
                  <IconAlertTriangle size={22} color="#F7A733" />
                </View>
                <Text
                  text={translate("tbmReportScreen:notice.description")}
                  style={S.$noticeDesc}
                />
              </View>
            </View>

            {/* ── 2. TBM 활동명 카드 ── */}
            <View style={S.$activityNameCard}>
              <View style={S.$activityNameInfo}>
                <Text
                  text={translate("tbmReportScreen:activityName.label")}
                  style={S.$activityNameLabel}
                />
                <Text text={detail.title} style={S.$activityNameText} />
              </View>
              <View style={S.$activityNameCircle}>
                <IconCalendar size={22} color="#1062D8" />
              </View>
            </View>
          </View>

          {/* ── 3. 공정명 ── */}
          <View style={S.$section}>
            <Text text={translate("tbmReportScreen:processName.label")} style={S.$sectionLabel} />
            <View style={S.$inputRow}>
              <TextInput
                style={S.$inputText}
                value={processName}
                onChangeText={setProcessName}
                placeholder={translate("tbmReportScreen:processName.placeholder")}
                placeholderTextColor="#666666"
                maxLength={50}
              />
            </View>
            <Text text={translate("tbmReportScreen:processName.helper")} style={S.$helperText} />
          </View>

          {/* ── 4. 팀/반명 ── */}
          <View style={S.$section}>
            <Text text={translate("tbmReportScreen:teamName.label")} style={S.$sectionLabel} />
            <View style={S.$inputRow}>
              <TextInput
                style={S.$inputText}
                value={teamName}
                onChangeText={setTeamName}
                placeholder={translate("tbmReportScreen:teamName.placeholder")}
                placeholderTextColor="#666666"
                maxLength={50}
              />
            </View>
            <Text text={translate("tbmReportScreen:teamName.helper")} style={S.$helperText} />
          </View>

          {/* ── 5. 교육 내용 요약 ── */}
          <View style={S.$section}>
            <Text
              text={translate("tbmReportScreen:educationSummary.label")}
              style={S.$sectionLabel}
            />
            <View style={S.$textarea}>
              <TextInput
                style={S.$textareaInput}
                value={educationSummary}
                onChangeText={setEducationSummary}
                placeholder={translate("tbmReportScreen:educationSummary.placeholder")}
                placeholderTextColor="#666666"
                multiline
                scrollEnabled={false}
                maxLength={1000}
              />
            </View>
            <Text
              text={translate("tbmReportScreen:educationSummary.helper")}
              style={S.$helperText}
            />
          </View>

          {/* ── 6. 특이사항 ── */}
          <View style={S.$section}>
            <Text text={translate("tbmReportScreen:specialNotes.label")} style={S.$sectionLabel} />
            <View style={S.$textarea}>
              <TextInput
                style={S.$textareaInput}
                value={specialNotes}
                onChangeText={setSpecialNotes}
                placeholder={translate("tbmReportScreen:specialNotes.placeholder")}
                placeholderTextColor="#666666"
                multiline
                scrollEnabled={false}
                maxLength={500}
              />
            </View>
            <Text text={translate("tbmReportScreen:specialNotes.helper")} style={S.$helperText} />
          </View>

          {/* ── 7. 현장 사진 ── */}
          <View style={[S.$section, { borderBottomWidth: 0 }]}>
            <Text text={translate("tbmReportScreen:sitePhotos.label")} style={S.$sectionLabel} />

            {/* 안내 카드 */}
            <View style={S.$photoGuideCard}>
              <Pic1 width={30} height={30} />
              <Text
                text={translate("tbmReportScreen:sitePhotos.guide")}
                style={[S.$photoGuideLine, { flex: 1 }]}
              />
              <TouchableOpacity
                style={S.$photoGuideAddBtn}
                activeOpacity={0.7}
                onPress={openCaptureSheet}
              >
                <Text
                  text={translate("tbmReportScreen:sitePhotos.addButton")}
                  style={S.$photoGuideAddBtnText}
                />
              </TouchableOpacity>
            </View>

            {/* 미리보기 카드 or 사진 그리드 */}
            {photos.length > 0 ? (
              <View style={S.$photoGrid}>
                {photos.map((src, i) => (
                  <Image key={i} source={src} style={S.$photoItem} />
                ))}
              </View>
            ) : (
              <View style={S.$photoPreviewCard}>
                <Pic2 width={30} height={30} />
                <Text
                  text={translate("tbmReportScreen:sitePhotos.preview")}
                  style={S.$photoPreviewText}
                />
              </View>
            )}
          </View>
        </KeyboardAwareScrollView>

        {/* ── 하단 생성 버튼 ── */}
        <View style={[S.$submitBar, { paddingBottom: isKeyboardVisible ? 16 : (insets.bottom || 0) + 16 }]}>
          <TouchableOpacity
            style={S.$submitBtn}
            activeOpacity={0.8}
            onPress={() => console.log("보고서 생성:", detail.id)}
          >
            <Text text={translate("tbmReportScreen:submit")} style={S.$submitBtnText} />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </StackScreen>

      {/* 사진 촬영 방법 선택 바텀시트 */}
      <Modal
        visible={captureSheetVisible}
        transparent
        animationType="none"
        onRequestClose={closeCaptureSheet}
      >
        <View style={StyleSheet.absoluteFill}>
          <Animated.View
            style={[StyleSheet.absoluteFill, S.$sheetBackdrop, { opacity: fadeAnim }]}
          />
          <TouchableOpacity
            style={StyleSheet.absoluteFill}
            onPress={closeCaptureSheet}
            activeOpacity={1}
          />
          <Animated.View
            style={[
              S.$sheet,
              { paddingBottom: insets.bottom + 16, transform: [{ translateY: slideAnim }] },
            ]}
          >
            <View style={S.$sheetDragHandleArea} {...panResponder.panHandlers}>
              <View style={S.$sheetDragHandleBar} />
            </View>
            <View style={S.$sheetBtnRow}>
              <TouchableOpacity style={S.$sheetBtn} activeOpacity={0.7} onPress={handleTakePhoto}>
                <IconCamera size={20} color={colors.navy} strokeWidth={1.8} />
                <Text text={translate("aiRiskDocCreatorScreen:captureSheet.camera")} style={S.$sheetBtnLabel} />
              </TouchableOpacity>
              <TouchableOpacity style={S.$sheetBtn} activeOpacity={0.7} onPress={handleSelectFromAlbum}>
                <IconPhoto size={20} color={colors.navy} strokeWidth={1.8} />
                <Text text={translate("aiRiskDocCreatorScreen:captureSheet.album")} style={S.$sheetBtnLabel} />
              </TouchableOpacity>
            </View>
          </Animated.View>
        </View>
      </Modal>
    </>
  )
}
