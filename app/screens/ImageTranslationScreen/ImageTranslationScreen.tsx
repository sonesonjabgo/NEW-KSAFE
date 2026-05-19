import { FC, useState } from "react"
import { View, ViewStyle, TextStyle, TouchableOpacity } from "react-native"
import { IconChevronDown, IconCamera, IconPhoto } from "@tabler/icons-react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"

import { LanguagePickerModal } from "@/components/LanguagePickerModal"
import { StackScreen } from "@/components/StackScreen"
import { Text } from "@/components/Text"
import { LANGUAGES, LanguageKey } from "@/constants/languages"
import { translate } from "@/i18n/translate"
import type { AppStackScreenProps } from "@/navigators/navigationTypes"
import { colors } from "@/theme/colors"
import { typography } from "@/theme/typography"

interface ImageTranslationScreenProps extends AppStackScreenProps<"ImageTranslation"> {}

export const ImageTranslationScreen: FC<ImageTranslationScreenProps> = ({ navigation }) => {
  const { bottom } = useSafeAreaInsets()

  const [targetLanguage, setTargetLanguage] = useState<LanguageKey>("korean")
  const [langMenuVisible, setLangMenuVisible] = useState(false)

  const getLangLabel = (key: LanguageKey) =>
    translate(`imageTranslationScreen:languages.${key}` as any)

  const getLangSubtitle = (key: LanguageKey) =>
    translate(`imageTranslationScreen:languageSubtitles.${key}` as any)

  const getLangFlag = (key: LanguageKey): string => LANGUAGES.find((l) => l.key === key)?.flag ?? ""

  return (
    <>
      <StackScreen
        title={translate("imageTranslationScreen:title")}
        onBack={() => navigation.goBack()}
        contentBg="#FFFFFF"
      >
        {/* 중앙 콘텐츠: 이미지 입력 박스 */}
        <View style={$innerContent}>
          <TouchableOpacity style={$imageInputBox} activeOpacity={0.7}>
            <IconPhoto size={48} color="#9CA3AF" strokeWidth={1.5} />
          </TouchableOpacity>
          <Text text={translate("imageTranslationScreen:selectImage")} style={$selectImageTitle} />
          <Text
            text={translate("imageTranslationScreen:selectImageDesc")}
            style={$selectImageDesc}
          />
        </View>

        {/* 하단: 언어 선택 + 카메라 버튼 */}
        <View style={[$bottomArea, { paddingBottom: bottom + 16 }]}>
          <View style={$langRow}>
            <Text text={translate("imageTranslationScreen:languageLabel")} style={$langLabel} />
            <TouchableOpacity
              style={$langBtn}
              onPress={() => setLangMenuVisible(true)}
              activeOpacity={0.7}
            >
              <Text text={getLangFlag(targetLanguage)} style={$langFlag} />
              <Text text={getLangLabel(targetLanguage)} style={$langBtnText} numberOfLines={1} />
              <IconChevronDown size={14} color={colors.blue} strokeWidth={2.5} />
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={$cameraBtn} activeOpacity={0.8}>
            <IconCamera size={22} color="#FFFFFF" strokeWidth={1.8} />
            <Text text={translate("imageTranslationScreen:cameraButton")} style={$cameraBtnText} />
          </TouchableOpacity>
        </View>
      </StackScreen>

      <LanguagePickerModal
        isVisible={langMenuVisible}
        currentKey={targetLanguage}
        title={translate("imageTranslationScreen:languageMenu.title")}
        getLabel={getLangLabel}
        getSubtitle={getLangSubtitle}
        onSelect={(key) => setTargetLanguage(key)}
        onClose={() => setLangMenuVisible(false)}
      />
    </>
  )
}

// ── Styles ──

const $innerContent: ViewStyle = {
  flex: 1,
  alignItems: "center",
  justifyContent: "center",
  paddingHorizontal: 24,
  gap: 16,
}

const $imageInputBox: ViewStyle = {
  width: "100%",
  height: 180,
  backgroundColor: "#F2F5F6",
  borderRadius: 10,
  borderWidth: 1.5,
  borderStyle: "dashed",
  borderColor: "#D1D5D9",
  alignItems: "center",
  justifyContent: "center",
}

const $selectImageTitle: TextStyle = {
  fontSize: 16,
  fontFamily: typography.primary.bold,
  color: "#1A2236",
  textAlign: "center",
}

const $selectImageDesc: TextStyle = {
  fontSize: 13,
  fontFamily: typography.primary.normal,
  color: "#9CA3AF",
  textAlign: "center",
  lineHeight: 20,
}

const $bottomArea: ViewStyle = {
  backgroundColor: "#FFFFFF",
  borderTopWidth: 1,
  borderTopColor: "#E8EBF2",
  paddingHorizontal: 20,
  paddingTop: 16,
  gap: 16,
}

const $langRow: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
}

const $langLabel: TextStyle = {
  fontSize: 13,
  fontFamily: typography.primary.normal,
  color: "#6B7280",
}

const $langBtn: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
  gap: 6,
}

const $langFlag: TextStyle = {
  fontSize: 16,
}

const $langBtnText: TextStyle = {
  fontSize: 13,
  fontFamily: typography.primary.semiBold,
  color: colors.blue,
}

const $cameraBtn: ViewStyle = {
  backgroundColor: colors.navy,
  borderRadius: 12,
  paddingVertical: 16,
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
  gap: 8,
}

const $cameraBtnText: TextStyle = {
  fontSize: 16,
  fontFamily: typography.primary.semiBold,
  color: "#FFFFFF",
}
