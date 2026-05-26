import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import {
  ActivityIndicator,
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
import { XCircle } from "lucide-react-native"
import { observer } from "mobx-react-lite"
import { useSafeAreaInsets } from "react-native-safe-area-context"

import HeaderBell from "@assets/icons/nav/header_bell.svg"

import { StackScreen } from "@/components/StackScreen"
import { Text } from "@/components/Text"
import { Toast } from "@/components/Toast"
import { translate } from "@/i18n/translate"
import { useStores } from "@/models"
import { AppStackScreenProps } from "@/navigators/navigationTypes"
import { fetchAdminWorkplaces } from "@/services/api/workplace"

import * as S from "./styles"

type SafeBoardCreateScreenProps = AppStackScreenProps<"SafeBoardCreate">

interface SelectedWorkplace {
  id: string
  name: string
}

export const SafeBoardCreateScreen = observer(function SafeBoardCreateScreen({
  navigation,
  route,
}: SafeBoardCreateScreenProps) {
  const insets = useSafeAreaInsets()
  const { safeBoardStore } = useStores()

  const editId = route.params?.id
  const isEditMode = !!editId

  const [workplaces, setWorkplaces] = useState<SelectedWorkplace[]>([])
  const [selectedWorkplace, setSelectedWorkplace] = useState<SelectedWorkplace | null>(null)
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [sendPush, setSendPush] = useState(false)
  const [workplaceModalVisible, setWorkplaceModalVisible] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [toastVisible, setToastVisible] = useState(false)
  const [toastMessage, setToastMessage] = useState("")

  const slideAnim = useRef(new Animated.Value(400)).current
  const fadeAnim = useRef(new Animated.Value(0)).current

  // 수정 모드: currentPost에서 기존 데이터 pre-fill
  useEffect(() => {
    if (!isEditMode) return
    const post = safeBoardStore.currentPost
    if (!post) return
    setTitle(post.title)
    setContent(post.description ?? "")
    setSendPush(post.sendNotification ?? false)
    if (post.workplaceId && post.workplaceName) {
      setSelectedWorkplace({ id: post.workplaceId, name: post.workplaceName })
    }
  }, [isEditMode, safeBoardStore.currentPost])

  // 사업장 목록 로드 (admin 전용 엔드포인트)
  useEffect(() => {
    fetchAdminWorkplaces()
      .then((items) => setWorkplaces(items.map((w) => ({ id: w.id, name: w.workplaceName }))))
      .catch(() => {})
  }, [])

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
    (wp: SelectedWorkplace) => {
      setSelectedWorkplace(wp)
      closeWorkplaceModal()
    },
    [closeWorkplaceModal],
  )

  const isValid = useMemo(
    () => !!selectedWorkplace && !!title.trim() && !!content.trim(),
    [selectedWorkplace, title, content],
  )

  const handleSave = useCallback(async () => {
    if (!selectedWorkplace || isSaving) return
    setIsSaving(true)
    try {
      if (isEditMode && editId) {
        await safeBoardStore.updatePost(editId, {
          title: title.trim(),
          description: content.trim(),
          sendNotification: sendPush,
        })
        navigation.goBack()
      } else {
        const scope = selectedWorkplace.id ? "workplace" : "company_wide"
        await safeBoardStore.createPost({
          scope,
          workplaceId: selectedWorkplace.id || undefined,
          title: title.trim(),
          description: content.trim(),
          sendNotification: sendPush,
        })
        navigation.navigate("Main", { screen: "SafeBoard", params: { showToast: true } })
      }
    } catch {
      setToastMessage(translate("safeBoardCreateScreen:saveError"))
      setToastVisible(true)
    } finally {
      setIsSaving(false)
    }
  }, [selectedWorkplace, title, content, sendPush, isSaving, isEditMode, editId, safeBoardStore, navigation])

  return (
    <>
      <StackScreen
        title={isEditMode ? translate("safeBoardCreateScreen:titleEdit") : translate("safeBoardCreateScreen:title")}
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
                  text={translate("safeBoardCreateScreen:guide.title")}
                  style={S.$guideTitle}
                />
                <Text
                  text={translate("safeBoardCreateScreen:guide.description")}
                  style={S.$guideDesc}
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
                  text={selectedWorkplace?.name || translate("safeBoardCreateScreen:workplace.placeholder")}
                  style={[S.$inputText, !selectedWorkplace && S.$inputPlaceholder]}
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

            {/* 푸시 알림 함께 보내기 */}
            <View style={[S.$section, { borderBottomWidth: 0, gap: 20 }]}>
              <Text
                text={translate("safeBoardCreateScreen:pushNotification.label")}
                style={S.$sectionLabel}
              />
              <View style={S.$attachCard}>
                <HeaderBell width={30} height={30} color="#1062D8" />
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
              style={[S.$submitBtn, (!isValid || isSaving) && S.$submitBtnDisabled]}
              activeOpacity={0.8}
              onPress={handleSave}
              disabled={!isValid || isSaving}
            >
              {isSaving ? (
                <ActivityIndicator size="small" color="#FFFFFF" />
              ) : (
                <Text
                  text={translate("safeBoardCreateScreen:save")}
                  style={S.$submitBtnText}
                />
              )}
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </StackScreen>

      <Toast
        visible={toastVisible}
        message={toastMessage}
        icon={<XCircle size={14} color="#FFFFFF" strokeWidth={2.5} />}
        iconCircleColor="#E03526"
        onHide={() => setToastVisible(false)}
      />

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
            {workplaces.map((wp) => (
              <TouchableOpacity
                key={wp.id}
                style={S.$modalItem}
                onPress={() => handleSelectWorkplace(wp)}
                activeOpacity={0.7}
              >
                <Text text={wp.name} style={S.$modalItemText} />
              </TouchableOpacity>
            ))}
          </Animated.View>
        </View>
      </Modal>
    </>
  )
})
