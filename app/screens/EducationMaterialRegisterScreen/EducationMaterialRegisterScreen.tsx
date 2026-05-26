import { FC, useCallback, useMemo, useState } from "react"
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native"
import { IconChevronDown, IconCircleCheck, IconCircleX, IconX } from "@tabler/icons-react-native"
import * as DocumentPicker from "expo-document-picker"
import { useSafeAreaInsets } from "react-native-safe-area-context"

import EducationFrame from "@assets/icons/education_frame.svg"
import HeaderBell from "@assets/icons/nav/header_bell.svg"

import { StackScreen } from "@/components/StackScreen"
import { Text } from "@/components/Text"
import { Toast } from "@/components/Toast"
import { translate } from "@/i18n/translate"
import { useStores } from "@/models"
import { AppStackScreenProps } from "@/navigators/navigationTypes"

import * as S from "./styles"

type EducationMaterialRegisterScreenProps = AppStackScreenProps<"EducationMaterialRegister">

export const EducationMaterialRegisterScreen: FC<EducationMaterialRegisterScreenProps> = function EducationMaterialRegisterScreen({
  navigation,
}) {
  const insets = useSafeAreaInsets()
  const { educationStore } = useStores()

  const [selectedFile, setSelectedFile] = useState<{
    name: string
    size: string
    uri: string
    mimeType: string
    fileSize: number
  } | null>(null)
  const [educationTitle, setEducationTitle] = useState("")
  const [content, setContent] = useState("")
  const [includeFileName, setIncludeFileName] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [toastVisible, setToastVisible] = useState(false)
  const [toastMessage, setToastMessage] = useState("")
  const [toastIsSuccess, setToastIsSuccess] = useState(false)

  const isValid = useMemo(
    () => !!selectedFile && !!educationTitle.trim(),
    [selectedFile, educationTitle],
  )

  const handleSelectFile = useCallback(async () => {
    const result = await DocumentPicker.getDocumentAsync({ type: "*/*", copyToCacheDirectory: true })
    if (result.canceled) return
    const asset = result.assets[0]
    const size = asset.size
      ? asset.size < 1024 * 1024
        ? `${(asset.size / 1024).toFixed(1)} KB`
        : `${(asset.size / (1024 * 1024)).toFixed(1)} MB`
      : ""
    setSelectedFile({
      name: asset.name,
      size,
      uri: asset.uri,
      mimeType: asset.mimeType ?? "application/octet-stream",
      fileSize: asset.size ?? 0,
    })
    if (includeFileName) setEducationTitle(asset.name)
  }, [includeFileName])

  const handleRemoveFile = useCallback(() => {
    if (includeFileName) {
      setEducationTitle("")
      setIncludeFileName(false)
    }
    setSelectedFile(null)
  }, [includeFileName])

  const handleIncludeFileNameToggle = useCallback(() => {
    const next = !includeFileName
    setIncludeFileName(next)
    if (next && selectedFile) {
      setEducationTitle(selectedFile.name)
    } else if (!next && selectedFile && educationTitle === selectedFile.name) {
      setEducationTitle("")
    }
  }, [includeFileName, selectedFile, educationTitle])

  const handleSubmit = useCallback(async () => {
    if (!selectedFile || !educationTitle.trim()) return
    setIsSubmitting(true)
    try {
      const { uploadId, signedUrl } = await educationStore.uploadFileUrl({
        fileName: selectedFile.name,
        contentType: selectedFile.mimeType,
        fileSize: selectedFile.fileSize,
      })

      const fileResponse = await fetch(selectedFile.uri)
      const blob = await fileResponse.blob()
      const uploadResponse = await fetch(signedUrl, {
        method: "PUT",
        body: blob,
        headers: { "Content-Type": selectedFile.mimeType },
      })
      if (!uploadResponse.ok) throw new Error("File upload failed")

      await educationStore.createMaterial({
        title: educationTitle.trim(),
        uploadId,
        description: content.trim() || undefined,
      })

      setToastMessage(translate("educationMaterialRegisterScreen:submitSuccess"))
      setToastIsSuccess(true)
      setToastVisible(true)
      setTimeout(() => navigation.goBack(), 1200)
    } catch {
      setToastMessage(translate("educationMaterialRegisterScreen:submitError"))
      setToastIsSuccess(false)
      setToastVisible(true)
    } finally {
      setIsSubmitting(false)
    }
  }, [selectedFile, educationTitle, content, educationStore, navigation])

  return (
    <>
      <StackScreen
        title={translate("educationMaterialRegisterScreen:title")}
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
                  text={translate("educationMaterialRegisterScreen:guide.title")}
                  style={S.$guideTitle}
                />
                <Text
                  text={translate("educationMaterialRegisterScreen:guide.description")}
                  style={S.$guideDesc}
                />
              </View>
            </View>

            {/* 첨부파일 */}
            <View style={S.$section}>
              <Text
                text={translate("educationMaterialRegisterScreen:attachment.label")}
                style={S.$sectionLabel}
              />

              <TouchableOpacity style={S.$uploadBox} activeOpacity={0.7} onPress={handleSelectFile}>
                <EducationFrame width={22} height={22} color="#AAAAAA" />
                <Text
                  text={translate("educationMaterialRegisterScreen:attachment.boxPlaceholder")}
                  style={S.$uploadBoxText}
                />
                <IconChevronDown size={20} color="#AAAAAA" />
              </TouchableOpacity>

              <Text
                text={translate("educationMaterialRegisterScreen:attachment.helper")}
                style={S.$helperText}
              />

              {selectedFile && (
                <View style={S.$fileChip}>
                  <View style={S.$fileIconBox}>
                    <EducationFrame width={24} height={24} color="#1062D8" />
                  </View>
                  <View style={S.$fileTextBlock}>
                    <Text text={selectedFile.name} style={S.$fileChipName} numberOfLines={1} />
                    <Text text={selectedFile.size} style={S.$fileChipSize} numberOfLines={1} />
                  </View>
                  <TouchableOpacity
                    onPress={handleRemoveFile}
                    hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                  >
                    <IconX size={16} color="#888888" />
                  </TouchableOpacity>
                </View>
              )}
            </View>

            {/* 교육 제목 */}
            <View style={S.$section}>
              <Text
                text={translate("educationMaterialRegisterScreen:educationTitle.label")}
                style={S.$sectionLabel}
              />
              <View style={S.$inputRow}>
                <TextInput
                  style={S.$inputText}
                  value={educationTitle}
                  onChangeText={(t) => setEducationTitle(t.slice(0, 200))}
                  placeholder={translate(
                    "educationMaterialRegisterScreen:educationTitle.placeholder",
                  )}
                  placeholderTextColor="#BBBBBB"
                  maxLength={200}
                />
              </View>
              <TouchableOpacity
                style={S.$checkboxRow}
                onPress={handleIncludeFileNameToggle}
                activeOpacity={0.7}
              >
                <View style={[S.$checkbox, includeFileName && S.$checkboxActive]}>
                  {includeFileName && <View style={S.$checkboxDot} />}
                </View>
                <Text
                  text={translate("educationMaterialRegisterScreen:educationTitle.includeFileName")}
                  style={S.$checkboxLabel}
                />
              </TouchableOpacity>
              <Text
                text={translate(
                  "educationMaterialRegisterScreen:educationTitle.includeFileNameDesc",
                )}
                style={S.$checkboxDesc}
              />
            </View>

            {/* 교육 내용 */}
            <View style={[S.$section, { borderBottomWidth: 0 }]}>
              <Text
                text={translate("educationMaterialRegisterScreen:content.label")}
                style={S.$sectionLabel}
              />
              <View style={S.$textarea}>
                <TextInput
                  style={S.$textareaInput}
                  value={content}
                  onChangeText={(t) => setContent(t.slice(0, 10000))}
                  placeholder={translate("educationMaterialRegisterScreen:content.placeholder")}
                  placeholderTextColor="#BBBBBB"
                  maxLength={10000}
                  multiline
                  scrollEnabled={false}
                />
              </View>
              <Text
                text={translate("educationMaterialRegisterScreen:content.helper")}
                style={S.$helperText}
              />
            </View>
          </ScrollView>

          {/* 하단 등록하기 버튼 */}
          <View style={[S.$submitBar, { paddingBottom: insets.bottom + 16 }]}>
            <TouchableOpacity
              style={[S.$submitBtn, (!isValid || isSubmitting) && S.$submitBtnDisabled]}
              activeOpacity={0.8}
              onPress={handleSubmit}
              disabled={!isValid || isSubmitting}
            >
              <Text
                text={translate("educationMaterialRegisterScreen:submit")}
                style={S.$submitBtnText}
              />
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </StackScreen>

      <Toast
        visible={toastVisible}
        message={toastMessage}
        icon={
          toastIsSuccess ? (
            <IconCircleCheck size={14} color="#FFFFFF" strokeWidth={2.5} />
          ) : (
            <IconCircleX size={14} color="#FFFFFF" strokeWidth={2.5} />
          )
        }
        iconCircleColor={toastIsSuccess ? "#1062D8" : "#E03526"}
        onHide={() => setToastVisible(false)}
      />
    </>
  )
}
