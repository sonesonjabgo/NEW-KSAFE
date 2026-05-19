import { FC, useCallback, useMemo, useState } from "react"
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native"
import { IconPaperclip, IconX } from "@tabler/icons-react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"

import EducationFrame from "@assets/icons/education_frame.svg"
import HeaderBell from "@assets/icons/nav/header_bell.svg"

import { StackScreen } from "@/components/StackScreen"
import { Text } from "@/components/Text"
import { translate } from "@/i18n/translate"
import { AppStackScreenProps } from "@/navigators/navigationTypes"

import * as S from "./styles"

type EducationMaterialRegisterScreenProps = AppStackScreenProps<"EducationMaterialRegister">

const MOCK_FILE = { name: "교육자료_샘플.pdf", size: "2.4 MB" }

export const EducationMaterialRegisterScreen: FC<EducationMaterialRegisterScreenProps> = ({
  navigation,
}) => {
  const insets = useSafeAreaInsets()

  const [selectedFile, setSelectedFile] = useState<{ name: string; size: string } | null>(null)
  const [educationTitle, setEducationTitle] = useState("")
  const [content, setContent] = useState("")

  const isValid = useMemo(
    () => !!selectedFile && !!educationTitle.trim(),
    [selectedFile, educationTitle],
  )

  const handleSelectFile = useCallback(() => {
    setSelectedFile(MOCK_FILE)
  }, [])

  const handleRemoveFile = useCallback(() => {
    setSelectedFile(null)
  }, [])

  const handleSubmit = useCallback(() => {
    console.log(JSON.stringify({ selectedFile, educationTitle, content }, null, 2))
  }, [selectedFile, educationTitle, content])

  return (
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

            {selectedFile ? (
              <View style={S.$fileChip}>
                <EducationFrame width={20} height={20} color="#1062D8" />
                <Text text={selectedFile.name} style={S.$fileChipName} numberOfLines={1} />
                <Text
                  text={selectedFile.size}
                  style={S.$fileChipSize}
                  numberOfLines={1}
                />
                <TouchableOpacity
                  onPress={handleRemoveFile}
                  hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                >
                  <IconX size={16} color="#888888" />
                </TouchableOpacity>
              </View>
            ) : (
              <TouchableOpacity
                style={S.$fileSelectBtn}
                activeOpacity={0.7}
                onPress={handleSelectFile}
              >
                <IconPaperclip size={16} color="#1062D8" />
                <Text
                  text={translate("educationMaterialRegisterScreen:attachment.selectButton")}
                  style={S.$fileSelectBtnText}
                />
              </TouchableOpacity>
            )}

            <Text
              text={translate("educationMaterialRegisterScreen:attachment.helper")}
              style={S.$helperText}
            />
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
            <Text
              text={translate("educationMaterialRegisterScreen:educationTitle.helper")}
              style={S.$helperText}
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
                onChangeText={(t) => setContent(t.slice(0, 2000))}
                placeholder={translate("educationMaterialRegisterScreen:content.placeholder")}
                placeholderTextColor="#BBBBBB"
                maxLength={2000}
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
            style={[S.$submitBtn, !isValid && S.$submitBtnDisabled]}
            activeOpacity={0.8}
            onPress={handleSubmit}
            disabled={!isValid}
          >
            <Text
              text={translate("educationMaterialRegisterScreen:submit")}
              style={S.$submitBtnText}
            />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </StackScreen>
  )
}
