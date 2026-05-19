import { FC, useCallback, useMemo, useState } from "react"
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native"
import { IconChevronDown, IconX } from "@tabler/icons-react-native"
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
  const [includeFileName, setIncludeFileName] = useState(false)

  const isValid = useMemo(
    () => !!selectedFile && !!educationTitle.trim(),
    [selectedFile, educationTitle],
  )

  const handleSelectFile = useCallback(() => {
    setSelectedFile(MOCK_FILE)
    if (includeFileName) setEducationTitle(MOCK_FILE.name)
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

            {/* 업로드 박스 — 항상 표시 */}
            <TouchableOpacity style={S.$uploadBox} activeOpacity={0.7} onPress={handleSelectFile}>
              <EducationFrame width={22} height={22} color="#AAAAAA" />
              <Text
                text={translate("educationMaterialRegisterScreen:attachment.boxPlaceholder")}
                style={S.$uploadBoxText}
              />
              <IconChevronDown size={20} color="#AAAAAA" />
            </TouchableOpacity>

            {/* 설명글 — 항상 표시 */}
            <Text
              text={translate("educationMaterialRegisterScreen:attachment.helper")}
              style={S.$helperText}
            />

            {/* 업로드된 파일 칩 — 파일 선택 후 표시 */}
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
              text={translate("educationMaterialRegisterScreen:educationTitle.includeFileNameDesc")}
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
              style={[S.$helperText]}
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
