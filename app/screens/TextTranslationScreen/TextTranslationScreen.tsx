import { FC, useState, useRef, useCallback } from "react"
import {
  View,
  ViewStyle,
  TextStyle,
  TouchableOpacity,
  FlatList,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  ListRenderItemInfo,
} from "react-native"
import {
  IconChevronDown,
  IconArrowsExchange,
  IconVolume,
  IconMicrophone,
  IconKeyboard,
  IconCamera,
  IconX,
  IconArrowUp,
} from "@tabler/icons-react-native"
import { Square } from "lucide-react-native"

import { LanguagePickerModal } from "@/components/LanguagePickerModal"
import { StackScreen } from "@/components/StackScreen"
import { Text } from "@/components/Text"
import { LANGUAGES, LanguageKey } from "@/constants/languages"
import { translate } from "@/i18n/translate"
import type { AppStackScreenProps } from "@/navigators/navigationTypes"
import { colors } from "@/theme/colors"
import { typography } from "@/theme/typography"

interface TextTranslationScreenProps extends AppStackScreenProps<"TextTranslation"> {}

interface TranslationItem {
  id: string
  sourceText: string
  translatedText: string
}

const DUMMY_TRANSLATIONS: TranslationItem[] = [
  { id: "1", sourceText: "안녕하세요", translatedText: "こんにちは、" },
  { id: "2", sourceText: "반갑습니다", translatedText: "はじめまして" },
]

type InputMode = "voice" | "text"

export const TextTranslationScreen: FC<TextTranslationScreenProps> = ({ navigation }) => {
  const flatListRef = useRef<FlatList<TranslationItem>>(null)

  const [sourceLanguage, setSourceLanguage] = useState<LanguageKey>("korean")
  const [targetLanguage, setTargetLanguage] = useState<LanguageKey>("japanese")
  const [translations, setTranslations] = useState<TranslationItem[]>(DUMMY_TRANSLATIONS)
  const [inputMode, setInputMode] = useState<InputMode>("voice")
  const [isListening, setIsListening] = useState(false)
  const [inputText, setInputText] = useState("")
  const [inputFocused, setInputFocused] = useState(false)
  const [showValidationError, setShowValidationError] = useState(false)
  const [inputHeight, setInputHeight] = useState(40)

  const [langMenuVisible, setLangMenuVisible] = useState(false)
  const [langMenuTarget, setLangMenuTarget] = useState<"source" | "target">("source")

  const currentLangKey = langMenuTarget === "source" ? sourceLanguage : targetLanguage

  const openLangMenu = (target: "source" | "target") => {
    setLangMenuTarget(target)
    setLangMenuVisible(true)
  }

  const handleSelectLanguage = (key: LanguageKey) => {
    if (langMenuTarget === "source") {
      setSourceLanguage(key)
    } else {
      setTargetLanguage(key)
    }
  }

  const swapLanguages = () => {
    setSourceLanguage(targetLanguage)
    setTargetLanguage(sourceLanguage)
  }

  const getLangLabel = (key: LanguageKey) =>
    translate(`textTranslationScreen:languages.${key}` as any)

  const getLangSubtitle = (key: LanguageKey) =>
    translate(`textTranslationScreen:languageSubtitles.${key}` as any)

  const getLangFlag = (key: LanguageKey): string =>
    LANGUAGES.find((l) => l.key === key)?.flag ?? ""

  const handleTranslate = useCallback(() => {
    const trimmed = inputText.trim()
    if (!trimmed) {
      setShowValidationError(true)
      return
    }
    const newItem: TranslationItem = {
      id: `t-${Date.now()}`,
      sourceText: trimmed,
      translatedText: "...",
    }
    setTranslations((prev) => [...prev, newItem])
    setInputText("")
    setShowValidationError(false)
    setInputHeight(40)
    setInputMode("voice")
    setTimeout(() => {
      flatListRef.current?.scrollToEnd({ animated: true })
    }, 100)
  }, [inputText])

  const handleExitTextMode = () => {
    setInputMode("voice")
    setInputText("")
    setShowValidationError(false)
    setInputHeight(40)
  }

  const renderTranslationItem = ({ item }: ListRenderItemInfo<TranslationItem>) => (
    <View style={$translationCard}>
      <View style={$cardRow}>
        <View style={$cardTexts}>
          <Text text={item.sourceText} style={$sourceText} />
          <Text text={item.translatedText} style={$translatedText} />
        </View>
        <TouchableOpacity style={$speakerBtn} activeOpacity={0.7}>
          <IconVolume size={18} color={colors.blue} />
        </TouchableOpacity>
      </View>
    </View>
  )

  return (
    <>
      <StackScreen
        title={translate("textTranslationScreen:title")}
        onBack={() => navigation.goBack()}
        contentBg="#FFFFFF"
        rightSlot={
          <TouchableOpacity style={$headerSideRight}>
            <Text text={translate("textTranslationScreen:fontSizeButton")} style={$fontSizeText} />
          </TouchableOpacity>
        }
      >
        {/* 언어 선택 바 */}
        <View style={$langBar}>
          <TouchableOpacity
            style={$langBtn}
            onPress={() => openLangMenu("source")}
            activeOpacity={0.7}
          >
            <Text text={getLangFlag(sourceLanguage)} style={$langFlag} />
            <Text text={getLangLabel(sourceLanguage)} style={$langBtnText} numberOfLines={1} />
            <IconChevronDown size={14} color={colors.blue} strokeWidth={2.5} />
          </TouchableOpacity>

          <TouchableOpacity style={$swapBtn} onPress={swapLanguages} activeOpacity={0.7}>
            <IconArrowsExchange size={20} color={colors.blue} strokeWidth={2} />
          </TouchableOpacity>

          <TouchableOpacity
            style={$langBtn}
            onPress={() => openLangMenu("target")}
            activeOpacity={0.7}
          >
            <Text text={getLangFlag(targetLanguage)} style={$langFlag} />
            <Text text={getLangLabel(targetLanguage)} style={$langBtnText} numberOfLines={1} />
            <IconChevronDown size={14} color={colors.blue} strokeWidth={2.5} />
          </TouchableOpacity>
        </View>

        <KeyboardAvoidingView
          style={$keyboardView}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <View style={$chatWrapBox}>
            <View style={[$chatInnerBox, isListening && $chatInnerBoxListening]}>
              <View style={$chatTopBanner}>
                <Text
                  text={translate("textTranslationScreen:listening")}
                  style={[$listeningText, { opacity: isListening ? 1 : 0 }]}
                />
              </View>

              <FlatList
                ref={flatListRef}
                style={$chatFlatList}
                data={translations}
                keyExtractor={(item) => item.id}
                renderItem={renderTranslationItem}
                contentContainerStyle={$chatList}
                showsVerticalScrollIndicator={false}
              />

              <TouchableOpacity
                style={$listeningCloseBtn}
                onPress={() => setTranslations([])}
                activeOpacity={0.7}
              >
                <IconX size={17} color="#D3D3D3" />
              </TouchableOpacity>
            </View>
          </View>

          {inputMode === "voice" ? (
            <View style={$voiceInputArea}>
              <TouchableOpacity
                style={$sideIconBtn}
                onPress={() => navigation.navigate("ImageTranslation")}
                activeOpacity={0.7}
              >
                <IconCamera size={26} color="#9CA3AF" strokeWidth={1.8} />
              </TouchableOpacity>

              <TouchableOpacity
                style={isListening ? $micBtnActive : $micBtnInactive}
                onPress={() => setIsListening((prev) => !prev)}
                activeOpacity={0.8}
              >
                {isListening ? (
                  <Square size={20} color="#FFFFFF" fill="#FFFFFF" />
                ) : (
                  <IconMicrophone size={28} color="#FFFFFF" strokeWidth={1.8} />
                )}
              </TouchableOpacity>

              <TouchableOpacity
                style={$sideIconBtn}
                onPress={() => setInputMode("text")}
                activeOpacity={0.7}
              >
                <IconKeyboard size={26} color="#9CA3AF" strokeWidth={1.8} />
              </TouchableOpacity>
            </View>
          ) : (
            <View style={$textInputArea}>
              <View style={$inputTopRow}>
                <Text
                  text={translate("textTranslationScreen:inputHint")}
                  style={$inputHintText}
                />
                <Text text={`${inputText.length}/1000`} style={$inputCountText} />
              </View>

              <View style={$textInputRow}>
                <TextInput
                  style={[
                    $textInput,
                    { height: Math.max(40, inputHeight) },
                    inputFocused && !showValidationError && $textInputFocused,
                    showValidationError && $textInputError,
                  ]}
                  placeholder={translate("textTranslationScreen:inputPlaceholder")}
                  placeholderTextColor="#ABABAB"
                  value={inputText}
                  onChangeText={(t) => {
                    setInputText(t.slice(0, 1000))
                    if (showValidationError) setShowValidationError(false)
                  }}
                  onContentSizeChange={(e) =>
                    setInputHeight(e.nativeEvent.contentSize.height)
                  }
                  onFocus={() => setInputFocused(true)}
                  onBlur={() => setInputFocused(false)}
                  maxLength={1000}
                  multiline
                  autoFocus
                />
                <TouchableOpacity
                  style={[$sendBtn, inputText.trim() ? $sendBtnActive : $sendBtnInactive]}
                  onPress={handleTranslate}
                  activeOpacity={0.8}
                >
                  <IconArrowUp
                    size={20}
                    color={inputText.trim() ? "#FFFFFF" : "#9CA3AF"}
                    strokeWidth={2.5}
                  />
                </TouchableOpacity>
              </View>

              <Text
                text={translate("textTranslationScreen:validationError")}
                style={[$validationError, { opacity: showValidationError ? 1 : 0 }]}
              />
            </View>
          )}
        </KeyboardAvoidingView>
      </StackScreen>

      <LanguagePickerModal
        isVisible={langMenuVisible}
        currentKey={currentLangKey}
        title={translate("textTranslationScreen:languageMenu.title")}
        getLabel={getLangLabel}
        getSubtitle={getLangSubtitle}
        onSelect={handleSelectLanguage}
        onClose={() => setLangMenuVisible(false)}
      />
    </>
  )
}

// ── Styles ──

const $headerSideRight: ViewStyle = {
  alignItems: "flex-end",
  justifyContent: "center",
  height: 36,
}

const $fontSizeText: TextStyle = {
  fontSize: 16,
  fontFamily: typography.primary.bold,
  color: "#FFFFFF",
}

const $langBar: ViewStyle = {
  backgroundColor: "#FFFFFF",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  paddingHorizontal: 16,
  paddingVertical: 10,
}

const $langBtn: ViewStyle = {
  flex: 1,
  flexDirection: "row",
  alignItems: "center",
  gap: 6,
  paddingHorizontal: 8,
  paddingVertical: 6,
}

const $langFlag: TextStyle = {
  fontSize: 16,
}

const $langBtnText: TextStyle = {
  flex: 1,
  fontSize: 13,
  fontFamily: typography.primary.semiBold,
  color: colors.blue,
}

const $swapBtn: ViewStyle = {
  width: 40,
  height: 40,
  alignItems: "center",
  justifyContent: "center",
  marginHorizontal: 8,
  borderRadius: 20,
  backgroundColor: "#EEF4FF",
}

const $keyboardView: ViewStyle = {
  flex: 1,
  backgroundColor: "#FFFFFF",
}

const $chatWrapBox: ViewStyle = {
  flex: 1,
  marginHorizontal: 12,
  marginTop: 8,
}

const $chatInnerBox: ViewStyle = {
  flex: 1,
  borderRadius: 12,
  borderWidth: 1.5,
  borderColor: "transparent",
  backgroundColor: "#FFFFFF",
  overflow: "hidden",
}

const $chatInnerBoxListening: ViewStyle = {
  borderColor: colors.blue,
}

const $chatTopBanner: ViewStyle = {
  height: 28,
  alignItems: "center",
  justifyContent: "center",
}

const $listeningText: TextStyle = {
  fontSize: 13,
  fontFamily: typography.primary.medium,
  color: colors.blue,
}

const $chatFlatList: ViewStyle = {
  flex: 1,
}

const $chatList: {
  padding: number
  paddingBottom: number
  flexGrow: number
} = {
  padding: 12,
  paddingBottom: 8,
  flexGrow: 1,
}

const $listeningCloseBtn: ViewStyle = {
  position: "absolute",
  bottom: 8,
  right: 8,
  padding: 6,
}

const $translationCard: ViewStyle = {
  marginBottom: 16,
}

const $cardRow: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
  gap: 8,
}

const $cardTexts: ViewStyle = {
  flex: 1,
  gap: 4,
}

const $sourceText: TextStyle = {
  flex: 1,
  fontSize: 14,
  fontFamily: typography.primary.normal,
  color: "#6B7280",
  lineHeight: 20,
}

const $translatedText: TextStyle = {
  flex: 1,
  fontSize: 17,
  fontFamily: typography.primary.bold,
  color: "#1A2236",
  lineHeight: 24,
}

const $speakerBtn: ViewStyle = {
  paddingTop: 2,
  paddingLeft: 4,
}

const $voiceInputArea: ViewStyle = {
  backgroundColor: "#FFFFFF",
  borderTopWidth: 1,
  borderTopColor: "#E8EBF2",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-around",
  paddingTop: 16,
  paddingBottom: 32,
  paddingHorizontal: 32,
}

const $sideIconBtn: ViewStyle = {
  width: 48,
  height: 48,
  alignItems: "center",
  justifyContent: "center",
}

const $micBtnInactive: ViewStyle = {
  width: 64,
  height: 64,
  borderRadius: 32,
  backgroundColor: colors.blue,
  alignItems: "center",
  justifyContent: "center",
  shadowColor: colors.blue,
  shadowOffset: { width: 0, height: 4 },
  shadowOpacity: 0.35,
  shadowRadius: 8,
  elevation: 4,
}

const $micBtnActive: ViewStyle = {
  width: 64,
  height: 64,
  borderRadius: 32,
  backgroundColor: colors.blue,
  alignItems: "center",
  justifyContent: "center",
  shadowColor: colors.blue,
  shadowOffset: { width: 0, height: 4 },
  shadowOpacity: 0.35,
  shadowRadius: 8,
  elevation: 4,
}

const $textInputArea: ViewStyle = {
  backgroundColor: "#FFFFFF",
  borderTopWidth: 1,
  borderTopColor: "#E8EBF2",
  paddingHorizontal: 12,
  paddingTop: 8,
  paddingBottom: 32,
  gap: 4,
}

const $textInputRow: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
  gap: 8,
}

const $inputTopRow: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  paddingHorizontal: 4,
}

const $inputHintText: TextStyle = {
  fontSize: 12,
  fontFamily: typography.primary.normal,
  color: "#9CA3AF",
}

const $inputCountText: TextStyle = {
  fontSize: 12,
  fontFamily: typography.primary.normal,
  color: "#9CA3AF",
}

const $textInput: TextStyle = {
  flex: 1,
  borderRadius: 20,
  borderWidth: 1,
  borderColor: "#E0E5F0",
  paddingHorizontal: 14,
  paddingVertical: 10,
  fontSize: 14,
  fontFamily: typography.primary.normal,
  color: "#1A2236",
  backgroundColor: "#FFFFFF",
  textAlignVertical: "center",
}

const $textInputFocused: TextStyle = {
  borderColor: colors.blue,
}

const $textInputError: TextStyle = {
  borderColor: "#EF4444",
}

const $sendBtn: ViewStyle = {
  width: 40,
  height: 40,
  borderRadius: 20,
  alignItems: "center",
  justifyContent: "center",
}

const $sendBtnActive: ViewStyle = {
  backgroundColor: colors.blue,
}

const $sendBtnInactive: ViewStyle = {
  backgroundColor: "#D1D5DB",
}

const $validationError: TextStyle = {
  fontSize: 12,
  fontFamily: typography.primary.normal,
  color: "#EF4444",
}
