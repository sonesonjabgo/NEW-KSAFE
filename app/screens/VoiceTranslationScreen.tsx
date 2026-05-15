import { FC, useState } from "react"
import {
  View,
  ViewStyle,
  TextStyle,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from "react-native"
import { ChevronDown, Volume2, Mic, Square } from "lucide-react-native"
import RotateIcon from "@assets/icons/voice/rotate.svg"
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  runOnJS,
} from "react-native-reanimated"

import { LanguagePickerModal } from "@/components/LanguagePickerModal"
import { StackScreen } from "@/components/StackScreen"
import { Text } from "@/components/Text"
import { LANGUAGES, LanguageKey } from "@/constants/languages"
import { translate } from "@/i18n/translate"
import type { AppStackScreenProps } from "@/navigators/navigationTypes"
import { colors } from "@/theme/colors"
import { typography } from "@/theme/typography"

interface VoiceTranslationScreenProps extends AppStackScreenProps<"VoiceTranslation"> {}

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
  const [topLanguage, setTopLanguage] = useState<LanguageKey>("english")
  const [bottomLanguage, setBottomLanguage] = useState<LanguageKey>("korean")
  const [topMessages] = useState<MessageItem[]>(MOCK_TOP_MESSAGES)
  const [bottomMessages] = useState<MessageItem[]>(MOCK_BOTTOM_MESSAGES)
  const [topMicOn, setTopMicOn] = useState(false)
  const [bottomMicOn, setBottomMicOn] = useState(false)
  const [isFlipped, setIsFlipped] = useState(false)
  const [langMenuVisible, setLangMenuVisible] = useState(false)
  const [langMenuTarget, setLangMenuTarget] = useState<"top" | "bottom">("top")

  const openLangMenu = (target: "top" | "bottom") => {
    setLangMenuTarget(target)
    setLangMenuVisible(true)
  }

  const handleSelectLanguage = (key: LanguageKey) => {
    if (langMenuTarget === "top") {
      setTopLanguage(key)
    } else {
      setBottomLanguage(key)
    }
  }

  const getLabel = (key: LanguageKey) =>
    translate(`voiceTranslationScreen:languages.${key}` as any)

  const getSubtitle = (key: LanguageKey) =>
    translate(`voiceTranslationScreen:languageSubtitles.${key}` as any)

  const currentLangKey = langMenuTarget === "top" ? topLanguage : bottomLanguage

  return (
    <>
      <StackScreen
        title={translate("voiceTranslationScreen:title")}
        onBack={() => navigation.goBack()}
        contentBg={colors.screenBg}
        rightSlot={
          <TouchableOpacity
            style={$flipButton}
            onPress={() => setIsFlipped((prev) => !prev)}
          >
            <RotateIcon style={{ transform: [{ scaleY: isFlipped ? -1 : 1 }] }} />
          </TouchableOpacity>
        }
      >
        <View style={$content}>
          {/* 상단 박스 (상대방 언어) */}
          <View style={[$box, { transform: [{ rotateZ: isFlipped ? "180deg" : "0deg" }] }]}>
            <TouchableOpacity style={$langDropdown} onPress={() => openLangMenu("top")}>
              <Text text={getLabel(topLanguage)} style={$langDropdownText} />
              <ChevronDown size={14} color={colors.blue} strokeWidth={2.5} />
            </TouchableOpacity>

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

            <View style={$micArea}>
              {topMicOn ? (
                <View style={$micActiveRow}>
                  <ActivityIndicator size="small" color={colors.blue} />
                  <Text
                    text={translate("voiceTranslationScreen:listening")}
                    style={$listeningText}
                  />
                  <TouchableOpacity style={$stopBtn} onPress={() => setTopMicOn(false)}>
                    <Square size={14} color="#FFFFFF" fill="#FFFFFF" />
                  </TouchableOpacity>
                </View>
              ) : (
                <TouchableOpacity style={$micBtn} onPress={() => setTopMicOn(true)}>
                  <Mic size={22} color={colors.blue} strokeWidth={2} />
                </TouchableOpacity>
              )}
            </View>
          </View>

          {/* 하단 박스 (내 언어) */}
          <View style={$box}>
            <TouchableOpacity style={$langDropdown} onPress={() => openLangMenu("bottom")}>
              <Text text={getLabel(bottomLanguage)} style={$langDropdownText} />
              <ChevronDown size={14} color={colors.blue} strokeWidth={2.5} />
            </TouchableOpacity>

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

            <View style={$micArea}>
              {bottomMicOn ? (
                <View style={$micActiveRow}>
                  <ActivityIndicator size="small" color={colors.blue} />
                  <Text
                    text={translate("voiceTranslationScreen:listening")}
                    style={$listeningText}
                  />
                  <TouchableOpacity style={$stopBtn} onPress={() => setBottomMicOn(false)}>
                    <Square size={14} color="#FFFFFF" fill="#FFFFFF" />
                  </TouchableOpacity>
                </View>
              ) : (
                <TouchableOpacity style={$micBtn} onPress={() => setBottomMicOn(true)}>
                  <Mic size={22} color={colors.blue} strokeWidth={2} />
                </TouchableOpacity>
              )}
            </View>
          </View>
        </View>
      </StackScreen>

      <LanguagePickerModal
        isVisible={langMenuVisible}
        currentKey={currentLangKey}
        title={translate("voiceTranslationScreen:languageMenu.title")}
        getLabel={getLabel}
        getSubtitle={getSubtitle}
        onSelect={handleSelectLanguage}
        onClose={() => setLangMenuVisible(false)}
      />
    </>
  )
}

const $flipButton: ViewStyle = {
  width: 36,
  height: 36,
  justifyContent: "center",
  alignItems: "flex-end",
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
  color: colors.blue,
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
  borderColor: colors.blue,
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "#FFFFFF",
}

const $micActiveRow: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
  gap: 8,
}

const $listeningText: TextStyle = {
  fontSize: 13,
  fontFamily: typography.primary.medium,
  color: colors.blue,
}

const $stopBtn: ViewStyle = {
  width: 28,
  height: 28,
  borderRadius: 14,
  backgroundColor: colors.blue,
  alignItems: "center",
  justifyContent: "center",
}
