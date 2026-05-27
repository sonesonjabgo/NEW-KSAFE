import { FC, useCallback, useMemo, useRef, useState } from "react"
import {
  Animated,
  KeyboardAvoidingView,
  Modal,
  Platform,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native"
import { IconChevronDown } from "@tabler/icons-react-native"
import { X } from "lucide-react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"

import BoardClip from "@assets/icons/board/board_clip.svg"
import HeaderBell from "@assets/icons/nav/header_bell.svg"

import { useResponsive } from "@/theme/responsive"

import { StackScreen } from "@/components/StackScreen"
import { Text } from "@/components/Text"
import { translate } from "@/i18n/translate"
import { AppStackScreenProps } from "@/navigators/navigationTypes"

import * as S from "./styles"

type SafeBoardCreateScreenProps = AppStackScreenProps<"SafeBoardCreate">

const MOCK_WORKPLACES = [
  "서울 한강 레지던스 RC공사 현장",
  "부산 센텀 물류센터 현장",
  "대구 산업단지 신축 현장",
]

export const SafeBoardCreateScreen: FC<SafeBoardCreateScreenProps> = ({ navigation }) => {
  const insets = useSafeAreaInsets()
  const { isSmallPhone } = useResponsive()

  const [workplace, setWorkplace] = useState("")
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [sendPush, setSendPush] = useState(true)
  const [attachedFiles, setAttachedFiles] = useState<string[]>([])
  const [workplaceModalVisible, setWorkplaceModalVisible] = useState(false)

  const slideAnim = useRef(new Animated.Value(400)).current
  const fadeAnim = useRef(new Animated.Value(0)).current

  const openWorkplaceModal = useCallback(() => {
    setWorkplaceModalVisible(true)
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 200, useNativeDriver: true }),
      Animated.timing(slideAnim, { toValue: 0, duration: 260, useNativeDriver: true }),
    ]).start()
  }, [fadeAnim, slideAnim])

  const closeWorkplaceModal = useCallback(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 0, duration: 160, useNativeDriver: true }),
      Animated.timing(slideAnim, { toValue: 400, duration: 200, useNativeDriver: true }),
    ]).start(() => setWorkplaceModalVisible(false))
  }, [fadeAnim, slideAnim])

  const handleSelectWorkplace = useCallback(
    (wp: string) => {
      setWorkplace(wp)
      closeWorkplaceModal()
    },
    [closeWorkplaceModal],
  )

  const isValid = useMemo(
    () => !!workplace && !!title.trim() && !!content.trim(),
    [workplace, title, content],
  )

  const handleAddFile = useCallback(() => {
    const mockName = `첨부파일_${attachedFiles.length + 1}.pdf`
    setAttachedFiles((prev) => [...prev, mockName])
  }, [attachedFiles.length])

  const handleRemoveFile = useCallback((idx: number) => {
    setAttachedFiles((prev) => prev.filter((_, i) => i !== idx))
  }, [])

  const handleSave = useCallback(() => {
    console.log(JSON.stringify({ workplace, title, content, sendPush, attachedFiles }, null, 2))
    navigation.navigate("Main", { screen: "SafeBoard", params: { showToast: true } })
  }, [workplace, title, content, sendPush, attachedFiles, navigation])

  return (
    <>
      <StackScreen
        title={translate("safeBoardCreateScreen:title")}
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
                <Text text={translate("safeBoardCreateScreen:guide.title")} style={S.$guideTitle} />
                <Text
                  text={translate("safeBoardCreateScreen:guide.description")}
                  style={[S.$guideDesc, isSmallPhone && { fontSize: 14 }]}
                />
              </View>
            </View>

            {/* 사업장 선택 */}
            <View style={S.$section}>
              <Text
                text={translate("safeBoardCreateScreen:workplace.label")}
                style={S.$sectionLabel}
              />
              <TouchableOpacity
                style={S.$inputRow}
                activeOpacity={0.7}
                onPress={openWorkplaceModal}
              >
                <Text
                  text={workplace || translate("safeBoardCreateScreen:workplace.placeholder")}
                  style={[S.$inputText, !workplace && S.$inputPlaceholder]}
                  numberOfLines={1}
                />
                <IconChevronDown size={18} color="#AAAAAA" />
              </TouchableOpacity>
              <Text
                text={translate("safeBoardCreateScreen:workplace.helper")}
                style={S.$helperText}
              />
            </View>

            {/* 게시글 제목 */}
            <View style={S.$section}>
              <View style={S.$labelRow}>
                <Text
                  text={translate("safeBoardCreateScreen:postTitle.label")}
                  style={S.$sectionLabel}
                />
                <Text text=" *" style={S.$required} />
              </View>
              <View style={S.$inputRow}>
                <TextInput
                  style={S.$inputText}
                  value={title}
                  onChangeText={(t) => setTitle(t.slice(0, 200))}
                  placeholder={translate("safeBoardCreateScreen:postTitle.placeholder")}
                  placeholderTextColor="#BBBBBB"
                  maxLength={200}
                />
              </View>
              <Text
                text={translate("safeBoardCreateScreen:postTitle.helper")}
                style={S.$helperText}
              />
            </View>

            {/* 게시글 내용 */}
            <View style={S.$section}>
              <View style={S.$labelRow}>
                <Text
                  text={translate("safeBoardCreateScreen:content.label")}
                  style={S.$sectionLabel}
                />
                <Text text=" *" style={S.$required} />
              </View>
              <View style={S.$textarea}>
                <TextInput
                  style={S.$textareaInput}
                  value={content}
                  onChangeText={(t) => setContent(t.slice(0, 2000))}
                  placeholder={translate("safeBoardCreateScreen:content.placeholder")}
                  placeholderTextColor="#BBBBBB"
                  maxLength={2000}
                  multiline
                  scrollEnabled={false}
                />
              </View>
              <Text
                text={translate("safeBoardCreateScreen:content.helper")}
                style={S.$helperText}
              />
            </View>

            {/* 첨부파일 */}
            <View style={[S.$section, { gap: 20 }]}>
              <Text
                text={translate("safeBoardCreateScreen:attachment.label")}
                style={S.$sectionLabel}
              />
              {/* 카드1 */}
              <View style={S.$attachCard}>
                <BoardClip width={isSmallPhone ? 22 : 30} height={isSmallPhone ? 22 : 30} color="#1062D8" />
                <Text
                  text={translate("safeBoardCreateScreen:attachment.card1Text")}
                  style={[S.$attachCardText, isSmallPhone && { fontSize: 12 }]}
                />
                <TouchableOpacity
                  style={S.$attachUploadBtn}
                  activeOpacity={0.7}
                  onPress={handleAddFile}
                >
                  <Text
                    text={translate("safeBoardCreateScreen:attachment.uploadButton")}
                    style={S.$attachUploadBtnText}
                  />
                </TouchableOpacity>
              </View>

              {/* 카드2 */}
              {attachedFiles.length === 0 ? (
                <View style={S.$attachCard2Empty}>
                  <BoardClip width={20} height={20} color="#48B568" />
                  <Text
                    text={translate("safeBoardCreateScreen:attachment.noFile")}
                    style={S.$attachCard2EmptyText}
                  />
                </View>
              ) : (
                <View style={S.$attachCard2FileList}>
                  {attachedFiles.map((file, idx) => (
                    <View key={idx} style={S.$attachCard2FileRow}>
                      <BoardClip width={20} height={20} color="#525252" />
                      <Text text={file} style={S.$attachCard2FileText} numberOfLines={1} />
                      <TouchableOpacity
                        onPress={() => handleRemoveFile(idx)}
                        hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                      >
                        <X size={25} color="#525252" strokeWidth={2} />
                      </TouchableOpacity>
                    </View>
                  ))}
                </View>
              )}
            </View>

            {/* 푸시 알림 함께 보내기 */}
            <View
              style={[
                S.$section,
                { borderBottomWidth: 0, gap: 20 },
                isSmallPhone && { paddingTop: 12, paddingBottom: 28 },
              ]}
            >
              <Text
                text={translate("safeBoardCreateScreen:pushNotification.label")}
                style={S.$sectionLabel}
              />
              <View style={[S.$attachCard, isSmallPhone && { paddingTop: 18, paddingBottom: 18 }]}>
                <HeaderBell
                  width={isSmallPhone ? 24 : 30}
                  height={isSmallPhone ? 24 : 30}
                  color="#1062D8"
                />
                <Text
                  text={translate("safeBoardCreateScreen:pushNotification.cardText")}
                  style={S.$attachCardText}
                />
                <TouchableOpacity activeOpacity={0.8} onPress={() => setSendPush((v) => !v)}>
                  <View style={[S.$toggleTrack, sendPush && S.$toggleTrackActive]}>
                    <View style={[S.$toggleThumb, sendPush && S.$toggleThumbActive]} />
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>

          {/* 저장 버튼 */}
          <View style={[S.$submitBar, { paddingBottom: insets.bottom + 16 }]}>
            <TouchableOpacity
              style={[S.$submitBtn, !isValid && S.$submitBtnDisabled]}
              activeOpacity={0.8}
              onPress={handleSave}
              disabled={!isValid}
            >
              <Text text={translate("safeBoardCreateScreen:save")} style={S.$submitBtnText} />
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </StackScreen>

      {/* 사업장 선택 모달 */}
      <Modal
        visible={workplaceModalVisible}
        transparent
        animationType="none"
        onRequestClose={closeWorkplaceModal}
      >
        <View style={StyleSheet.absoluteFill}>
          <Animated.View
            style={[StyleSheet.absoluteFill, S.$modalBackdrop, { opacity: fadeAnim }]}
          />
          <TouchableOpacity
            style={StyleSheet.absoluteFill}
            onPress={closeWorkplaceModal}
            activeOpacity={1}
          />
          <Animated.View
            style={[
              S.$modalSheet,
              { paddingBottom: insets.bottom + 16, transform: [{ translateY: slideAnim }] },
            ]}
          >
            {MOCK_WORKPLACES.map((wp) => (
              <TouchableOpacity
                key={wp}
                style={S.$modalItem}
                onPress={() => handleSelectWorkplace(wp)}
                activeOpacity={0.7}
              >
                <Text text={wp} style={S.$modalItemText} />
              </TouchableOpacity>
            ))}
          </Animated.View>
        </View>
      </Modal>
    </>
  )
}
