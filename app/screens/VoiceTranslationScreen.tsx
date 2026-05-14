import { FC, useState, useRef } from "react"
import {
  View,
  ViewStyle,
  TextStyle,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Modal,
  FlatList,
} from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { ChevronDown, ArrowLeft, RotateCcw, Volume2, Mic, Square } from "lucide-react-native"
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated"

import { Text } from "@/components/Text"
import { translate } from "@/i18n/translate"
import type { AppStackScreenProps } from "@/navigators/navigationTypes"
import { typography } from "@/theme/typography"

interface VoiceTranslationScreenProps extends AppStackScreenProps<"VoiceTranslation"> {}

type LanguageKey =
  | "korean"
  | "english"
  | "chineseSimplified"
  | "chineseTraditional"
  | "russian"
  | "vietnamese"
  | "indonesian"
  | "khmer"

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
]

interface MessageItem {
  id: string
  text: string
}

const MOCK_TOP_MESSAGES: MessageItem[] = [
  { id: "1", text: "Hello, how are you doing today?" },
  { id: "2", text: "I need help with safety equipment." },
]

const MOCK_BOTTOM_MESSAGES: MessageItem[] = [
  { id: "1", text: "안녕하세요, 오늘 어떻게 지내세요?" },
  { id: "2", text: "안전 장비에 대해 도움이 필요합니다." },
]

export const VoiceTranslationScreen: FC<VoiceTranslationScreenProps> = ({ navigation }) => {
  const insets = useSafeAreaInsets()

  const [topLanguage, setTopLanguage] = useState<LanguageKey>("english")
  const [bottomLanguage, setBottomLanguage] = useState<LanguageKey>("korean")
  const [topMessages] = useState<MessageItem[]>(MOCK_TOP_MESSAGES)
  const [bottomMessages] = useState<MessageItem[]>(MOCK_BOTTOM_MESSAGES)
  const [topMicOn, setTopMicOn] = useState(false)
  const [bottomMicOn, setBottomMicOn] = useState(false)
  const [isFlipped, setIsFlipped] = useState(false)
  const [langMenuVisible, setLangMenuVisible] = useState(false)
  const [langMenuTarget, setLangMenuTarget] = useState<"top" | "bottom">("top")

  const flipRotation = useSharedValue(0)

  const topBoxAnimStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${flipRotation.value}deg` }],
  }))

  const handleFlip = () => {
    const next = isFlipped ? 0 : 180
    flipRotation.value = withTiming(next, { duration: 400 })
    setIsFlipped(!isFlipped)
  }

  const openLangMenu = (target: "top" | "bottom") => {
    setLangMenuTarget(target)
    setLangMenuVisible(true)
  }

  const selectLanguage = (key: LanguageKey) => {
    if (langMenuTarget === "top") {
      setTopLanguage(key)
    } else {
      setBottomLanguage(key)
    }
    setLangMenuVisible(false)
  }

  const currentLangKey = langMenuTarget === "top" ? topLanguage : bottomLanguage

  const getLangLabel = (key: LanguageKey) => {
    const name = translate(`voiceTranslationScreen:languages.${key}` as any)
    const sub = translate(`voiceTranslationScreen:languageSubtitles.${key}` as any)
    return sub ? `${name} ${sub}` : name
  }

  const getDropdownLabel = (key: LanguageKey) => {
    return translate(`voiceTranslationScreen:languages.${key}` as any)
  }

  return (
    <View style={[$root, { paddingTop: insets.top }]}>
      {/* ── Header ── */}
      <View style={$header}>
        <TouchableOpacity style={$headerBtn} onPress={() => navigation.goBack()}>
          <ArrowLeft size={22} color="#FFFFFF" strokeWidth={2} />
        </TouchableOpacity>
        <Text
          text={translate("voiceTranslationScreen:title")}
          style={$headerTitle}
        />
        <TouchableOpacity style={$headerBtn} onPress={handleFlip}>
          <RotateCcw size={20} color="#FFFFFF" strokeWidth={2} />
          <Text text={translate("voiceTranslationScreen:flipScreen")} style={$headerBtnLabel} />
        </TouchableOpacity>
      </View>

      {/* ── Content ── */}
      <View style={$content}>
        {/* ── 상단 박스 (상대방 언어) ── */}
        <Animated.View style={[topBoxAnimStyle]}>
          <View style={$box}>
            {/* 언어 드롭다운 */}
            <TouchableOpacity style={$langDropdown} onPress={() => openLangMenu("top")}>
              <Text text={getDropdownLabel(topLanguage)} style={$langDropdownText} />
              <ChevronDown size={14} color="#1062D8" strokeWidth={2.5} />
            </TouchableOpacity>

            {/* 대화 텍스트 영역 */}
            <ScrollView style={$messageArea} showsVerticalScrollIndicator={false}>
              {topMessages.map((msg) => (
                <View key={msg.id} style={$messageRow}>
                  <Text text={msg.text} style={$messageText} />
                  <TouchableOpacity style={$speakerBtn}>
                    <Volume2 size={16} color="#7F848C" strokeWidth={2} />
                  </TouchableOpacity>
                </View>
              ))}
            </ScrollView>

            {/* 마이크 버튼 */}
            <View style={$micArea}>
              {topMicOn ? (
                <View style={$micActiveRow}>
                  <View style={$recordingDot} />
                  <ActivityIndicator size="small" color="#1062D8" />
                  <Text
                    text={translate("voiceTranslationScreen:listening")}
                    style={$listeningText}
                  />
                  <TouchableOpacity style={$stopBtn} onPress={() => setTopMicOn(false)}>
                    <Square size={14} color="#FFFFFF" fill="#FFFFFF" />
                  </TouchableOpacity>
                </View>
              ) : (
                <View style={$micOffRow}>
                  <Text
                    text={translate("voiceTranslationScreen:speakNow")}
                    style={$speakNowText}
                  />
                  <TouchableOpacity style={$micBtn} onPress={() => setTopMicOn(true)}>
                    <Mic size={22} color="#1B2A4A" strokeWidth={2} />
                  </TouchableOpacity>
                </View>
              )}
            </View>
          </View>
        </Animated.View>

        {/* ── 하단 박스 (내 언어) ── */}
        <View style={$box}>
          {/* 언어 드롭다운 */}
          <TouchableOpacity style={$langDropdown} onPress={() => openLangMenu("bottom")}>
            <Text text={getDropdownLabel(bottomLanguage)} style={$langDropdownText} />
            <ChevronDown size={14} color="#1062D8" strokeWidth={2.5} />
          </TouchableOpacity>

          {/* 대화 텍스트 영역 */}
          <ScrollView style={$messageArea} showsVerticalScrollIndicator={false}>
            {bottomMessages.map((msg) => (
              <View key={msg.id} style={$messageRow}>
                <Text text={msg.text} style={$messageText} />
                <TouchableOpacity style={$speakerBtn}>
                  <Volume2 size={16} color="#7F848C" strokeWidth={2} />
                </TouchableOpacity>
              </View>
            ))}
          </ScrollView>

          {/* 마이크 버튼 */}
          <View style={$micArea}>
            {bottomMicOn ? (
              <View style={$micActiveRow}>
                <View style={$recordingDot} />
                <ActivityIndicator size="small" color="#1062D8" />
                <Text
                  text={translate("voiceTranslationScreen:listening")}
                  style={$listeningText}
                />
                <TouchableOpacity style={$stopBtn} onPress={() => setBottomMicOn(false)}>
                  <Square size={14} color="#FFFFFF" fill="#FFFFFF" />
                </TouchableOpacity>
              </View>
            ) : (
              <View style={$micOffRow}>
                <Text
                  text={translate("voiceTranslationScreen:speakNow")}
                  style={$speakNowText}
                />
                <TouchableOpacity style={$micBtn} onPress={() => setBottomMicOn(true)}>
                  <Mic size={22} color="#1B2A4A" strokeWidth={2} />
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>
      </View>

      {/* ── 언어 선택 Modal ── */}
      <Modal
        visible={langMenuVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setLangMenuVisible(false)}
      >
        <TouchableOpacity
          style={$modalOverlay}
          activeOpacity={1}
          onPress={() => setLangMenuVisible(false)}
        />
        <View style={[$modalSheet, { paddingBottom: insets.bottom + 16 }]}>
          <View style={$modalHandle} />
          <Text
            text={translate("voiceTranslationScreen:languageMenu.title")}
            style={$modalTitle}
          />
          <FlatList
            data={LANGUAGES}
            keyExtractor={(item) => item.key}
            ItemSeparatorComponent={() => <View style={$langSeparator} />}
            renderItem={({ item }) => {
              const isSelected = currentLangKey === item.key
              const nativeName = translate(`voiceTranslationScreen:languages.${item.key}` as any)
              const subtitle = translate(`voiceTranslationScreen:languageSubtitles.${item.key}` as any)
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
                    {!!subtitle && (
                      <Text text={subtitle} style={$langItemSubtitle} />
                    )}
                  </View>
                  {isSelected && (
                    <Text text="✓" style={$langItemCheck} />
                  )}
                </TouchableOpacity>
              )
            }}
          />
        </View>
      </Modal>
    </View>
  )
}

const NAVY = "#1B2A4A"
const BLUE = "#1062D8"

const $root: ViewStyle = {
  flex: 1,
  backgroundColor: "#F5F5F5",
}

const $header: ViewStyle = {
  backgroundColor: NAVY,
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  paddingHorizontal: 16,
  paddingVertical: 12,
}

const $headerBtn: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
  gap: 4,
  minWidth: 60,
}

const $headerBtnLabel: TextStyle = {
  fontSize: 12,
  fontFamily: typography.primary.medium,
  color: "#FFFFFF",
}

const $headerTitle: TextStyle = {
  fontSize: 16,
  fontFamily: typography.primary.bold,
  color: "#FFFFFF",
}

const $content: ViewStyle = {
  flex: 1,
  padding: 16,
  gap: 14,
}

const $box: ViewStyle = {
  flex: 1,
  backgroundColor: "#FFFFFF",
  borderRadius: 16,
  shadowColor: "#000",
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.08,
  shadowRadius: 8,
  elevation: 3,
  padding: 14,
}

const $langDropdown: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
  gap: 4,
  alignSelf: "flex-start",
  paddingVertical: 4,
  paddingHorizontal: 8,
  borderWidth: 1,
  borderColor: "#C8D8F5",
  borderRadius: 8,
  backgroundColor: "#F0F5FF",
}

const $langDropdownText: TextStyle = {
  fontSize: 14,
  fontFamily: typography.primary.semiBold,
  color: BLUE,
}

const $messageArea: ViewStyle = {
  flex: 1,
  marginTop: 10,
  marginBottom: 10,
}

const $messageRow: ViewStyle = {
  flexDirection: "row",
  alignItems: "flex-start",
  paddingVertical: 8,
  borderBottomWidth: 1,
  borderBottomColor: "#F0F0F0",
  gap: 8,
}

const $messageText: TextStyle = {
  flex: 1,
  fontSize: 14,
  fontFamily: typography.primary.normal,
  color: "#1A2236",
  lineHeight: 20,
}

const $speakerBtn: ViewStyle = {
  paddingTop: 2,
}

const $micArea: ViewStyle = {
  alignItems: "flex-end",
  marginTop: 4,
}

const $micBtn: ViewStyle = {
  width: 48,
  height: 48,
  borderRadius: 24,
  borderWidth: 2,
  borderColor: NAVY,
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "#FFFFFF",
}

const $micOffRow: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "flex-end",
  gap: 10,
}

const $speakNowText: TextStyle = {
  fontSize: 12,
  fontFamily: typography.primary.normal,
  color: "#ABABAB",
}

const $recordingDot: ViewStyle = {
  width: 8,
  height: 8,
  borderRadius: 4,
  backgroundColor: "#E53935",
}

const $micActiveRow: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
  gap: 8,
  backgroundColor: "#EEF3FC",
  borderRadius: 24,
  paddingHorizontal: 14,
  paddingVertical: 10,
}

const $listeningText: TextStyle = {
  fontSize: 13,
  fontFamily: typography.primary.medium,
  color: BLUE,
}

const $stopBtn: ViewStyle = {
  width: 28,
  height: 28,
  borderRadius: 14,
  backgroundColor: "#E53935",
  alignItems: "center",
  justifyContent: "center",
}

const $modalOverlay: ViewStyle = {
  flex: 1,
  backgroundColor: "rgba(0,0,0,0.4)",
}

const $modalSheet: ViewStyle = {
  backgroundColor: "#FFFFFF",
  borderTopLeftRadius: 20,
  borderTopRightRadius: 20,
  paddingTop: 12,
  paddingHorizontal: 0,
  maxHeight: "65%",
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

const $langItemContent: ViewStyle = {
  flex: 1,
  gap: 2,
}

const $langItemSelected: ViewStyle = {
  backgroundColor: "#F0F5FF",
}

const $langItemFlag: TextStyle = {
  fontSize: 22,
}

const $langItemText: TextStyle = {
  flex: 1,
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
