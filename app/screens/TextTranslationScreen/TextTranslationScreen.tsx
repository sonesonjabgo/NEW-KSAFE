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
  Modal,
  ListRenderItemInfo,
  useWindowDimensions,
} from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import {
  IconChevronLeft,
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
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  runOnJS,
} from "react-native-reanimated"

import { Text } from "@/components/Text"
import { translate } from "@/i18n/translate"
import type { AppStackScreenProps } from "@/navigators/navigationTypes"
import { typography } from "@/theme/typography"

interface TextTranslationScreenProps extends AppStackScreenProps<"TextTranslation"> {}

type LanguageKey =
  | "korean"
  | "english"
  | "chineseSimplified"
  | "chineseTraditional"
  | "russian"
  | "vietnamese"
  | "indonesian"
  | "khmer"
  | "thai"
  | "urdu"
  | "nepali"
  | "lao"
  | "japanese"
  | "french"
  | "spanish"

interface Language {
  key: LanguageKey
  flag: string
}

const LANGUAGES: Language[] = [
  { key: "korean", flag: "🇰🇷" },
  { key: "english", flag: "🇺🇸" },
  { key: "chineseSimplified", flag: "🇨🇳" },
  { key: "chineseTraditional", flag: "🇹🇼" },
  { key: "russian", flag: "🇷🇺" },
  { key: "vietnamese", flag: "🇻🇳" },
  { key: "indonesian", flag: "🇮🇩" },
  { key: "khmer", flag: "🇰🇭" },
  { key: "thai", flag: "🇹🇭" },
  { key: "urdu", flag: "🇵🇰" },
  { key: "nepali", flag: "🇳🇵" },
  { key: "lao", flag: "🇱🇦" },
  { key: "japanese", flag: "🇯🇵" },
  { key: "french", flag: "🇫🇷" },
  { key: "spanish", flag: "🇪🇸" },
]

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

const NAVY = "#0B3069"
const BLUE = "#1062D8"
const BG = "#F9FAFE"

export const TextTranslationScreen: FC<TextTranslationScreenProps> = ({ navigation }) => {
  const insets = useSafeAreaInsets()
  const { height: screenHeight } = useWindowDimensions()
  const flatListRef = useRef<FlatList<TranslationItem>>(null)

  const [sourceLanguage, setSourceLanguage] = useState<LanguageKey>("korean")
  const [targetLanguage, setTargetLanguage] = useState<LanguageKey>("japanese")
  const [translations, setTranslations] = useState<TranslationItem[]>(DUMMY_TRANSLATIONS)
  const [inputMode, setInputMode] = useState<InputMode>("voice")
  const [isListening, setIsListening] = useState(false)
  const [inputText, setInputText] = useState("")
  const [inputFocused, setInputFocused] = useState(false)
  const [showValidationError, setShowValidationError] = useState(false)

  const [langMenuVisible, setLangMenuVisible] = useState(false)
  const [langMenuTarget, setLangMenuTarget] = useState<"source" | "target">("source")

  const overlayOpacity = useSharedValue(0)
  const sheetTranslateY = useSharedValue(600)

  const overlayAnimStyle = useAnimatedStyle(() => ({ opacity: overlayOpacity.value }))
  const sheetAnimStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: sheetTranslateY.value }],
  }))

  const openLangMenu = (target: "source" | "target") => {
    setLangMenuTarget(target)
    setLangMenuVisible(true)
    overlayOpacity.value = withTiming(1, { duration: 250 })
    sheetTranslateY.value = withTiming(0, { duration: 320 })
  }

  const closeLangMenu = () => {
    overlayOpacity.value = withTiming(0, { duration: 220 })
    sheetTranslateY.value = withTiming(600, { duration: 300 }, (finished) => {
      if (finished) runOnJS(setLangMenuVisible)(false)
    })
  }

  const selectLanguage = (key: LanguageKey) => {
    if (langMenuTarget === "source") {
      setSourceLanguage(key)
    } else {
      setTargetLanguage(key)
    }
    closeLangMenu()
  }

  const swapLanguages = () => {
    setSourceLanguage(targetLanguage)
    setTargetLanguage(sourceLanguage)
  }

  const getLangLabel = (key: LanguageKey) =>
    translate(`textTranslationScreen:languages.${key}` as any)

  const getLangFlag = (key: LanguageKey): string => LANGUAGES.find((l) => l.key === key)?.flag ?? ""

  const currentLangKey = langMenuTarget === "source" ? sourceLanguage : targetLanguage

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
    setInputMode("voice")
    setTimeout(() => {
      flatListRef.current?.scrollToEnd({ animated: true })
    }, 100)
  }, [inputText])

  const handleExitTextMode = () => {
    setInputMode("voice")
    setInputText("")
    setShowValidationError(false)
  }

  const renderTranslationItem = ({ item }: ListRenderItemInfo<TranslationItem>) => (
    <View style={$translationCard}>
      <View style={$cardRow}>
        <Text text={item.sourceText} style={$sourceText} />
        <TouchableOpacity style={$speakerBtn} activeOpacity={0.7}>
          <IconVolume size={18} color="#7F848C" />
        </TouchableOpacity>
      </View>
      <View style={$cardDivider} />
      <View style={$cardRow}>
        <Text text={item.translatedText} style={$translatedText} />
        <TouchableOpacity style={$speakerBtn} activeOpacity={0.7}>
          <IconVolume size={18} color={BLUE} />
        </TouchableOpacity>
      </View>
    </View>
  )

  return (
    <View style={[$root, { paddingTop: insets.top }]}>
      {/* ── Header ── */}
      <View style={$header}>
        <TouchableOpacity style={$headerSide} onPress={() => navigation.goBack()}>
          <IconChevronLeft size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text text={translate("textTranslationScreen:title")} style={$headerTitle} />
        <TouchableOpacity style={[$headerSide, $headerSideRight]}>
          <Text text={translate("textTranslationScreen:fontSizeButton")} style={$fontSizeText} />
        </TouchableOpacity>
      </View>

      {/* ── Main Container (rounded top) ── */}
      <View style={$chatContainer}>
        {/* ── Language Selector Bar ── */}
        <View style={$langBar}>
          <TouchableOpacity
            style={$langBtn}
            onPress={() => openLangMenu("source")}
            activeOpacity={0.7}
          >
            <Text text={getLangFlag(sourceLanguage)} style={$langFlag} />
            <Text text={getLangLabel(sourceLanguage)} style={$langBtnText} numberOfLines={1} />
            <IconChevronDown size={14} color={BLUE} strokeWidth={2.5} />
          </TouchableOpacity>

          <TouchableOpacity style={$swapBtn} onPress={swapLanguages} activeOpacity={0.7}>
            <IconArrowsExchange size={20} color={BLUE} strokeWidth={2} />
          </TouchableOpacity>

          <TouchableOpacity
            style={$langBtn}
            onPress={() => openLangMenu("target")}
            activeOpacity={0.7}
          >
            <Text text={getLangFlag(targetLanguage)} style={$langFlag} />
            <Text text={getLangLabel(targetLanguage)} style={$langBtnText} numberOfLines={1} />
            <IconChevronDown size={14} color={BLUE} strokeWidth={2.5} />
          </TouchableOpacity>
        </View>

        {/* ── Conversation + Input ── */}
        <KeyboardAvoidingView
          style={$keyboardView}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={insets.top}
        >
          {/* ── Chat wrapper box — border changes color on listening ── */}
          <View style={[$chatWrapBox, isListening && $chatWrapBoxListening]}>
            {/* Fixed-height top space — always rendered; opacity controls visibility */}
            <View style={$chatTopBanner}>
              <Text
                text={translate("textTranslationScreen:listening")}
                style={[$listeningText, { opacity: isListening ? 1 : 0 }]}
              />
            </View>

            {/* Translation list */}
            <FlatList
              ref={flatListRef}
              style={$chatFlatList}
              data={translations}
              keyExtractor={(item) => item.id}
              renderItem={renderTranslationItem}
              contentContainerStyle={$chatList}
              showsVerticalScrollIndicator={false}
            />

            {/* X close button at bottom of chat box — visible only when listening */}
            {inputMode === "voice" && isListening && (
              <TouchableOpacity
                style={$listeningCloseBtn}
                onPress={() => setIsListening(false)}
                activeOpacity={0.7}
              >
                <IconX size={17} color="#D3D3D3" />
              </TouchableOpacity>
            )}
          </View>

          {/* ── Bottom Input Area ── */}
          {inputMode === "voice" ? (
            <View style={[$voiceInputArea, { paddingBottom: insets.bottom + 8 }]}>
              <TouchableOpacity style={$sideIconBtn} activeOpacity={0.7}>
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
            <View style={[$textInputArea, { paddingBottom: insets.bottom + 8 }]}>
              <View style={$textInputRow}>
                <TouchableOpacity
                  style={$voiceModeBtn}
                  onPress={handleExitTextMode}
                  activeOpacity={0.7}
                >
                  <IconMicrophone size={22} color="#9CA3AF" strokeWidth={1.8} />
                </TouchableOpacity>
                <TextInput
                  style={[$textInput, inputFocused && $textInputFocused]}
                  placeholder={translate("textTranslationScreen:inputPlaceholder")}
                  placeholderTextColor="#ABABAB"
                  value={inputText}
                  onChangeText={(t) => {
                    setInputText(t.slice(0, 1000))
                    if (showValidationError) setShowValidationError(false)
                  }}
                  onFocus={() => setInputFocused(true)}
                  onBlur={() => setInputFocused(false)}
                  maxLength={1000}
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
              {showValidationError && (
                <Text
                  text={translate("textTranslationScreen:validationError")}
                  style={$validationError}
                />
              )}
            </View>
          )}
        </KeyboardAvoidingView>
      </View>

      {/* ── Language Selection Modal ── */}
      <Modal
        visible={langMenuVisible}
        transparent
        animationType="none"
        onRequestClose={closeLangMenu}
      >
        <View style={$modalContainer}>
          <Animated.View style={[$modalOverlay, overlayAnimStyle]}>
            <TouchableOpacity
              style={$modalOverlayTouch}
              activeOpacity={1}
              onPress={closeLangMenu}
            />
          </Animated.View>

          <Animated.View
            style={[
              $modalSheet,
              sheetAnimStyle,
              { height: screenHeight * 0.65, paddingBottom: insets.bottom + 16 },
            ]}
          >
            <View style={$modalHandle} />
            <Text
              text={translate("textTranslationScreen:languageMenu.title")}
              style={$modalTitle}
            />
            <FlatList
              data={LANGUAGES}
              keyExtractor={(item) => item.key}
              ItemSeparatorComponent={() => <View style={$langSeparator} />}
              renderItem={({ item }) => {
                const isSelected = currentLangKey === item.key
                const nativeName = translate(`textTranslationScreen:languages.${item.key}` as any)
                const subtitle = translate(
                  `textTranslationScreen:languageSubtitles.${item.key}` as any,
                )
                return (
                  <TouchableOpacity
                    style={[$langItem, isSelected && $langItemSelected]}
                    onPress={() => selectLanguage(item.key)}
                    activeOpacity={0.7}
                  >
                    <Text text={item.flag} style={$langItemFlag} />
                    <View style={$langItemContent}>
                      <Text
                        text={nativeName}
                        style={[$langItemText, isSelected && $langItemTextSelected]}
                      />
                      {!!subtitle && <Text text={subtitle} style={$langItemSubtitle} />}
                    </View>
                    {isSelected && <Text text="✓" style={$langItemCheck} />}
                  </TouchableOpacity>
                )
              }}
            />
          </Animated.View>
        </View>
      </Modal>
    </View>
  )
}

// ── Styles ──

const $root: ViewStyle = {
  flex: 1,
  backgroundColor: NAVY,
}

const $header: ViewStyle = {
  backgroundColor: NAVY,
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  paddingHorizontal: 20,
  paddingVertical: 22,
}

const $headerSide: ViewStyle = {
  width: 44,
  height: 36,
  justifyContent: "center",
  alignItems: "flex-start",
}

const $headerSideRight: ViewStyle = {
  alignItems: "flex-end",
}

const $headerTitle: TextStyle = {
  flex: 1,
  fontSize: 21,
  fontFamily: typography.primary.semiBold,
  color: "#FFFFFF",
  textAlign: "center",
}

const $fontSizeText: TextStyle = {
  fontSize: 16,
  fontFamily: typography.primary.bold,
  color: "#FFFFFF",
}

const $chatContainer: ViewStyle = {
  flex: 1,
  borderTopLeftRadius: 20,
  borderTopRightRadius: 20,
  overflow: "hidden",
  backgroundColor: "#FFFFFF",
}

const $langBar: ViewStyle = {
  backgroundColor: "#FFFFFF",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  paddingHorizontal: 16,
  paddingVertical: 10,
  borderBottomWidth: 1,
  borderBottomColor: "#E8EBF2",
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
  color: BLUE,
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
  backgroundColor: BG,
}

// Chat inner wrapper — border color changes when listening
const $chatWrapBox: ViewStyle = {
  flex: 1,
  marginHorizontal: 12,
  marginTop: 8,
  borderRadius: 12,
  borderWidth: 1,
  borderColor: "#E0E5F0",
  backgroundColor: "#FFFFFF",
  overflow: "hidden",
}

const $chatWrapBoxListening: ViewStyle = {
  borderColor: BLUE,
}

// Fixed height top space — always present; text shown/hidden via opacity
const $chatTopBanner: ViewStyle = {
  height: 28,
  alignItems: "center",
  justifyContent: "center",
}

const $listeningText: TextStyle = {
  fontSize: 13,
  fontFamily: typography.primary.medium,
  color: BLUE,
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
  alignSelf: "center",
  paddingVertical: 6,
  paddingHorizontal: 12,
}

const $translationCard: ViewStyle = {
  marginBottom: 16,
}

const $cardRow: ViewStyle = {
  flexDirection: "row",
  alignItems: "flex-start",
  justifyContent: "space-between",
  paddingVertical: 6,
  gap: 8,
}

const $cardDivider: ViewStyle = {
  height: 1,
  backgroundColor: "#E8EBF2",
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
  backgroundColor: BLUE,
  alignItems: "center",
  justifyContent: "center",
  shadowColor: BLUE,
  shadowOffset: { width: 0, height: 4 },
  shadowOpacity: 0.35,
  shadowRadius: 8,
  elevation: 4,
}

const $micBtnActive: ViewStyle = {
  width: 64,
  height: 64,
  borderRadius: 16,
  backgroundColor: BLUE,
  alignItems: "center",
  justifyContent: "center",
  shadowColor: BLUE,
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
  paddingTop: 12,
  gap: 6,
}

const $textInputRow: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
  gap: 8,
}

const $voiceModeBtn: ViewStyle = {
  width: 36,
  height: 40,
  alignItems: "center",
  justifyContent: "center",
}

const $textInput: TextStyle = {
  flex: 1,
  height: 40,
  borderRadius: 20,
  borderWidth: 1,
  borderColor: "#E0E5F0",
  paddingHorizontal: 14,
  fontSize: 14,
  fontFamily: typography.primary.normal,
  color: "#1A2236",
  backgroundColor: "#FFFFFF",
}

const $textInputFocused: TextStyle = {
  borderColor: BLUE,
}

// Circular send button
const $sendBtn: ViewStyle = {
  width: 40,
  height: 40,
  borderRadius: 20,
  alignItems: "center",
  justifyContent: "center",
}

const $sendBtnActive: ViewStyle = {
  backgroundColor: BLUE,
}

const $sendBtnInactive: ViewStyle = {
  backgroundColor: "#D1D5DB",
}

const $validationError: TextStyle = {
  fontSize: 12,
  fontFamily: typography.primary.normal,
  color: "#EF4444",
}

// Modal styles
const $modalContainer: ViewStyle = {
  flex: 1,
  justifyContent: "flex-end",
}

const $modalOverlay: ViewStyle = {
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(0,0,0,0.4)",
}

const $modalOverlayTouch: ViewStyle = {
  flex: 1,
}

const $modalSheet: ViewStyle = {
  backgroundColor: "#FFFFFF",
  borderTopLeftRadius: 20,
  borderTopRightRadius: 20,
  paddingTop: 12,
}

const $modalHandle: ViewStyle = {
  width: 36,
  height: 4,
  borderRadius: 2,
  backgroundColor: "#D0D5DD",
  alignSelf: "center",
  marginBottom: 16,
}

const $modalTitle: TextStyle = {
  fontSize: 15,
  fontFamily: typography.primary.bold,
  color: "#1A2236",
  paddingHorizontal: 20,
  marginBottom: 8,
}

const $langSeparator: ViewStyle = {
  height: 1,
  backgroundColor: "#F0F0F0",
  marginHorizontal: 20,
}

const $langItem: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
  paddingHorizontal: 20,
  paddingVertical: 14,
  gap: 12,
}

const $langItemSelected: ViewStyle = {
  backgroundColor: "#F0F5FF",
}

const $langItemContent: ViewStyle = {
  flex: 1,
  gap: 2,
}

const $langItemFlag: TextStyle = {
  fontSize: 22,
}

const $langItemText: TextStyle = {
  fontSize: 15,
  fontFamily: typography.primary.normal,
  color: "#1A2236",
}

const $langItemTextSelected: TextStyle = {
  fontFamily: typography.primary.semiBold,
  color: BLUE,
}

const $langItemSubtitle: TextStyle = {
  fontSize: 12,
  fontFamily: typography.primary.normal,
  color: "#9CA3AF",
}

const $langItemCheck: TextStyle = {
  fontSize: 16,
  color: BLUE,
  fontFamily: typography.primary.bold,
}
