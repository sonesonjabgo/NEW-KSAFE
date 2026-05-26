import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import {
  ActivityIndicator,
  Animated,
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native"
import * as DocumentPicker from "expo-document-picker"
import { IconChevronDown } from "@tabler/icons-react-native"
import { Building, FileText, Paperclip, X, XCircle } from "lucide-react-native"
import { observer } from "mobx-react-lite"
import { useSafeAreaInsets } from "react-native-safe-area-context"

import HeaderBell from "@assets/icons/nav/header_bell.svg"

import { StackScreen } from "@/components/StackScreen"
import { Text } from "@/components/Text"
import { Toast } from "@/components/Toast"
import { translate } from "@/i18n/translate"
import { useStores } from "@/models"
import { AppStackScreenProps } from "@/navigators/navigationTypes"
import { initiateCompanyPostUpload } from "@/services/api/safeBoard"

import * as S from "./styles"

type SafeBoardCreateScreenProps = AppStackScreenProps<"SafeBoardCreate">

interface SelectedWorkplace {
  id: string
  name: string
}

interface AttachedFile {
  uri: string
  name: string
  mimeType: string
  size: number | null
  uploadId: string
}

export const SafeBoardCreateScreen = observer(function SafeBoardCreateScreen({
  navigation,
  route,
}: SafeBoardCreateScreenProps) {
  const insets = useSafeAreaInsets()
  const { workplaceStore, safeBoardStore } = useStores()

  const editId = route.params?.id
  const isEditMode = !!editId

  const [selectedWorkplace, setSelectedWorkplace] = useState<SelectedWorkplace | null>(null)
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [sendPush, setSendPush] = useState(false)
  const [attachedFiles, setAttachedFiles] = useState<AttachedFile[]>([])
  const [isUploading, setIsUploading] = useState(false)
  const [workplaceModalVisible, setWorkplaceModalVisible] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [toastVisible, setToastVisible] = useState(false)
  const [toastMessage, setToastMessage] = useState("")

  const slideAnim = useRef(new Animated.Value(300)).current

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

  const openWorkplaceModal = useCallback(() => {
    setWorkplaceModalVisible(true)
    Animated.timing(slideAnim, { toValue: 0, duration: 250, useNativeDriver: true }).start()
  }, [slideAnim])

  const closeWorkplaceModal = useCallback(() => {
    Animated.timing(slideAnim, { toValue: 300, duration: 200, useNativeDriver: true }).start(() =>
      setWorkplaceModalVisible(false),
    )
  }, [slideAnim])

  const handleSelectWorkplace = useCallback(
    (wp: SelectedWorkplace) => {
      setSelectedWorkplace(wp)
      closeWorkplaceModal()
    },
    [closeWorkplaceModal],
  )

  const handlePickFile = useCallback(async () => {
    if (isUploading) return
    try {
      const result = await DocumentPicker.getDocumentAsync({
        copyToCacheDirectory: true,
        multiple: false,
      })
      if (result.canceled) return

      const asset = result.assets[0]
      const mimeType = asset.mimeType ?? "application/octet-stream"
      setIsUploading(true)

      const { uploadId, signedUrl } = await initiateCompanyPostUpload({
        fileName: asset.name,
        contentType: mimeType,
        fileSize: asset.size ?? undefined,
      })

      const fileResponse = await fetch(asset.uri)
      const blob = await fileResponse.blob()
      const uploadResponse = await fetch(signedUrl, {
        method: "PUT",
        headers: { "Content-Type": mimeType },
        body: blob,
      })

      if (!uploadResponse.ok) {
        throw new Error(`File upload failed: ${uploadResponse.status}`)
      }

      setAttachedFiles((prev) => [
        ...prev,
        {
          uri: asset.uri,
          name: asset.name,
          mimeType,
          size: asset.size ?? null,
          uploadId,
        },
      ])
    } catch {
      setToastMessage(translate("safeBoardCreateScreen:attachment.uploadError"))
      setToastVisible(true)
    } finally {
      setIsUploading(false)
    }
  }, [isUploading])

  const handleRemoveFile = useCallback((uploadId: string) => {
    setAttachedFiles((prev) => prev.filter((f) => f.uploadId !== uploadId))
  }, [])

  const availableWorkplaces = workplaceStore.workplaces

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
          uploadIds: attachedFiles.map((f) => f.uploadId),
        })
        navigation.navigate("Main", { screen: "SafeBoard", params: { showToast: true } })
      }
    } catch {
      setToastMessage(translate("safeBoardCreateScreen:saveError"))
      setToastVisible(true)
    } finally {
      setIsSaving(false)
    }
  }, [selectedWorkplace, title, content, sendPush, attachedFiles, isSaving, isEditMode, editId, safeBoardStore, navigation])

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

            {/* 첨부파일 (작성 모드만) */}
            {!isEditMode && (
              <View style={[S.$section, { gap: 20 }]}>
                <Text
                  text={translate("safeBoardCreateScreen:attachment.label")}
                  style={S.$sectionLabel}
                />
                <View style={S.$attachCard}>
                  <Paperclip size={28} color="#1062D8" strokeWidth={1.8} />
                  <Text
                    text={translate("safeBoardCreateScreen:attachment.card1Text")}
                    style={S.$attachCardText}
                  />
                  <TouchableOpacity
                    style={S.$attachUploadBtn}
                    activeOpacity={0.7}
                    onPress={handlePickFile}
                    disabled={isUploading}
                  >
                    {isUploading ? (
                      <ActivityIndicator size="small" color="#1062D8" />
                    ) : (
                      <Text
                        text={translate("safeBoardCreateScreen:attachment.uploadButton")}
                        style={S.$attachUploadBtnText}
                      />
                    )}
                  </TouchableOpacity>
                </View>

                {attachedFiles.length === 0 ? (
                  <View style={S.$attachCard2Empty}>
                    <FileText size={18} color="#979797" strokeWidth={1.8} />
                    <Text
                      text={translate("safeBoardCreateScreen:attachment.noFile")}
                      style={S.$attachCard2EmptyText}
                    />
                  </View>
                ) : (
                  <View style={S.$attachCard2FileList}>
                    {attachedFiles.map((file) => (
                      <View key={file.uploadId} style={S.$attachCard2FileRow}>
                        <FileText size={18} color="#1062D8" strokeWidth={1.8} />
                        <Text
                          text={file.name}
                          style={S.$attachCard2FileText}
                          numberOfLines={1}
                        />
                        <TouchableOpacity
                          activeOpacity={0.7}
                          onPress={() => handleRemoveFile(file.uploadId)}
                        >
                          <X size={18} color="#979797" strokeWidth={2} />
                        </TouchableOpacity>
                      </View>
                    ))}
                  </View>
                )}
              </View>
            )}

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
              style={[S.$submitBtn, (!isValid || isSaving || isUploading) && S.$submitBtnDisabled]}
              activeOpacity={0.8}
              onPress={handleSave}
              disabled={!isValid || isSaving || isUploading}
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
              text={translate("safeBoardCreateScreen:workplace.label")}
              style={S.$modalTitle}
            />
            {availableWorkplaces.map((wp) => {
              const isSelected = selectedWorkplace?.id === wp.id
              return (
                <TouchableOpacity
                  key={wp.id}
                  style={[S.$workplaceOption, isSelected && S.$workplaceOptionSelected]}
                  activeOpacity={0.7}
                  onPress={() => handleSelectWorkplace({ id: wp.id, name: wp.workplaceName })}
                >
                  <Building
                    size={20}
                    color={isSelected ? "#1062D8" : "#979797"}
                    strokeWidth={1.8}
                  />
                  <Text
                    text={wp.workplaceName}
                    style={[S.$workplaceOptionText, isSelected && S.$workplaceOptionTextSelected]}
                    numberOfLines={2}
                  />
                </TouchableOpacity>
              )
            })}
          </Animated.View>
        </Pressable>
      </Modal>
    </>
  )
})
