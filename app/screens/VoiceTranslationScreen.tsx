import { FC, useEffect, useMemo, useRef, useState } from "react"
import {
  Animated,
  Easing,
  ScrollView,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native"
import { ChevronDown, Mic, Volume2 } from "lucide-react-native"

import RotateIcon from "@assets/icons/voice/rotate.svg"

import { LanguagePickerModal } from "@/components/LanguagePickerModal"
import { StackScreen } from "@/components/StackScreen"
import { Text } from "@/components/Text"
import { LanguageKey, LANGUAGES } from "@/constants/languages"
import { translate } from "@/i18n/translate"
import type { AppStackScreenProps } from "@/navigators/navigationTypes"
import { colors } from "@/theme/colors"
import { typography } from "@/theme/typography"

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

export const VoiceTranslationScreen: FC<AppStackScreenProps<"VoiceTranslation">> = ({
  navigation,
}) => {
  const [topLanguage, setTopLanguage] = useState<LanguageKey>("english")
  const [bottomLanguage, setBottomLanguage] = useState<LanguageKey>("korean")
  const [topMessages] = useState<MessageItem[]>(MOCK_TOP_MESSAGES)
  const [bottomMessages] = useState<MessageItem[]>(MOCK_BOTTOM_MESSAGES)
  const [topMicOn, setTopMicOn] = useState(false)
  const [bottomMicOn, setBottomMicOn] = useState(false)
  const [langMenuVisible, setLangMenuVisible] = useState(false)
  const [langMenuTarget, setLangMenuTarget] = useState<"top" | "bottom">("top")

  const listeningPulse = useRef(new Animated.Value(0)).current
  const listeningLoopRef = useRef<Animated.CompositeAnimation | null>(null)
  const flipAnim = useRef(new Animated.Value(0)).current
  const isFlippedRef = useRef(false)

  const activePanel = topMicOn ? "top" : bottomMicOn ? "bottom" : null

  useEffect(() => {
    if (activePanel) {
      const animation = Animated.loop(
        Animated.sequence([
          Animated.timing(listeningPulse, {
            toValue: 1,
            duration: 900,
            easing: Easing.out(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(listeningPulse, {
            toValue: 0,
            duration: 900,
            easing: Easing.in(Easing.ease),
            useNativeDriver: true,
          }),
        ]),
      )
      listeningLoopRef.current = animation
      animation.start()
      return () => animation.stop()
    }
    listeningLoopRef.current?.stop()
    listeningLoopRef.current = null
    listeningPulse.stopAnimation(() => listeningPulse.setValue(0))
    return undefined
  }, [activePanel, listeningPulse])

  const activeMicDotStyle = useMemo(
    () => ({
      opacity: listeningPulse.interpolate({
        inputRange: [0, 0.45, 1],
        outputRange: [0.45, 0.9, 0.62],
      }),
      transform: [
        {
          scale: listeningPulse.interpolate({
            inputRange: [0, 0.5, 1],
            outputRange: [0.85, 1.5, 1.08],
          }),
        },
      ],
    }),
    [listeningPulse],
  )

  const activeMicHaloStyle = useMemo(
    () => ({
      opacity: listeningPulse.interpolate({
        inputRange: [0, 0.5, 1],
        outputRange: [0.08, 0.38, 0.16],
      }),
      transform: [
        {
          scale: listeningPulse.interpolate({
            inputRange: [0, 1],
            outputRange: [0.82, 1.9],
          }),
        },
      ],
    }),
    [listeningPulse],
  )

  const activeMicIconStyle = useMemo(
    () => ({
      transform: [
        {
          scale: listeningPulse.interpolate({
            inputRange: [0, 0.45, 1],
            outputRange: [1, 1.14, 1.04],
          }),
        },
      ],
    }),
    [listeningPulse],
  )

  const activePanelGlowStyle = useMemo(
    () => ({
      opacity: listeningPulse.interpolate({
        inputRange: [0, 0.5, 1],
        outputRange: [0.28, 0.72, 0.32],
      }),
      transform: [
        {
          scale: listeningPulse.interpolate({
            inputRange: [0, 1],
            outputRange: [0.97, 1.04],
          }),
        },
      ],
    }),
    [listeningPulse],
  )

  const listeningWaveBarStyles = useMemo(
    () =>
      [
        [0.34, 1.35, 0.72],
        [0.48, 1.95, 1],
        [0.38, 1.55, 0.82],
      ].map(([restScale, peakScale, peakOpacity]) => ({
        opacity: listeningPulse.interpolate({
          inputRange: [0, 0.5, 1],
          outputRange: [0.42, peakOpacity, 0.56],
        }),
        transform: [
          {
            scaleY: listeningPulse.interpolate({
              inputRange: [0, 0.5, 1],
              outputRange: [restScale, peakScale, restScale],
            }),
          },
        ],
      })),
    [listeningPulse],
  )

  const topPanelRotation = useMemo(
    () => flipAnim.interpolate({ inputRange: [0, 1], outputRange: ["0deg", "180deg"] }),
    [flipAnim],
  )

  const flipIconRotation = useMemo(
    () => flipAnim.interpolate({ inputRange: [0, 1], outputRange: ["0deg", "180deg"] }),
    [flipAnim],
  )

  const handleFlip = () => {
    isFlippedRef.current = !isFlippedRef.current
    Animated.spring(flipAnim, {
      toValue: isFlippedRef.current ? 1 : 0,
      useNativeDriver: true,
      friction: 6,
      tension: 45,
    }).start()
  }

  const openLangMenu = (target: "top" | "bottom") => {
    setLangMenuTarget(target)
    setLangMenuVisible(true)
  }

  const handleSelectLanguage = (key: LanguageKey) => {
    if (langMenuTarget === "top") setTopLanguage(key)
    else setBottomLanguage(key)
  }

  const handleToggleMic = (panel: "top" | "bottom") => {
    if (panel === "top") {
      setTopMicOn((prev) => !prev)
      setBottomMicOn(false)
    } else {
      setBottomMicOn((prev) => !prev)
      setTopMicOn(false)
    }
  }

  const getLabel = (key: LanguageKey) => translate(`voiceTranslationScreen:languages.${key}` as any)
  const getSubtitle = (key: LanguageKey) =>
    translate(`voiceTranslationScreen:languageSubtitles.${key}` as any)
  const getFlag = (key: LanguageKey) => LANGUAGES.find((l) => l.key === key)?.flag ?? ""

  const currentLangKey = langMenuTarget === "top" ? topLanguage : bottomLanguage

  const renderPanel = (panel: "top" | "bottom") => {
    const isListening = panel === "top" ? topMicOn : bottomMicOn
    const language = panel === "top" ? topLanguage : bottomLanguage
    const messages = panel === "top" ? topMessages : bottomMessages
    const isTop = panel === "top"

    return (
      <Animated.View
        style={[$panelWrapper, isTop ? { transform: [{ rotate: topPanelRotation }] } : undefined]}
      >
        {isListening ? (
          <Animated.View pointerEvents="none" style={[$panelGlow, activePanelGlowStyle]} />
        ) : null}
        <View style={[$box, isListening ? $activeBox : null]}>
        <TouchableOpacity style={$langDropdown} onPress={() => openLangMenu(panel)}>
          <Text text={getFlag(language)} style={$langFlagText} />
          <Text text={getLabel(language)} style={$langDropdownText} />
          <ChevronDown size={14} color={colors.blue} strokeWidth={2.5} />
        </TouchableOpacity>

        <ScrollView style={$messageArea} showsVerticalScrollIndicator={false}>
          {messages.map((msg) => (
            <View key={msg.id} style={$messageRow}>
              <Text text={msg.text} style={$messageText} />
              <TouchableOpacity style={$speakerBtn}>
                <Volume2 size={16} color="#7F848C" strokeWidth={2} />
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>

        <View style={$micArea}>
          <View style={$micStatusRow}>
            {isListening ? (
              <View style={$micStatusPill}>
                <Animated.View style={[$micPulseDot, $activeMicPulseDot, activeMicDotStyle]} />
                <Text
                  text={translate("voiceTranslationScreen:listening")}
                  style={$listeningText}
                />
              </View>
            ) : (
              <Text
                text={translate("voiceTranslationScreen:tapToSpeak")}
                style={$tapToSpeakText}
              />
            )}
          </View>

          <View style={$micIconStack}>
            {isListening ? (
              <>
                <Animated.View pointerEvents="none" style={[$activeMicHalo, activeMicHaloStyle]} />
                <View pointerEvents="none" style={$listeningWaveBars}>
                  {listeningWaveBarStyles.map((waveStyle, index) => (
                    <Animated.View
                      key={`wave-${panel}-${index}`}
                      style={[$listeningWaveBar, waveStyle]}
                    />
                  ))}
                </View>
              </>
            ) : null}
            <TouchableOpacity onPress={() => handleToggleMic(panel)} activeOpacity={0.85}>
              <Animated.View
                style={[
                  $micIconShell,
                  isListening ? $activeMicIconShell : null,
                  isListening ? activeMicIconStyle : null,
                ]}
              >
                <Mic size={18} color={isListening ? "#FFFFFF" : colors.blue} strokeWidth={2} />
              </Animated.View>
            </TouchableOpacity>
          </View>
        </View>
        </View>
      </Animated.View>
    )
  }

  return (
    <>
      <StackScreen
        title={translate("voiceTranslationScreen:title")}
        onBack={() => navigation.goBack()}
        contentBg={colors.screenBg}
        rightSlot={
          <TouchableOpacity style={$flipButton} onPress={handleFlip}>
            <Animated.View style={{ transform: [{ rotate: flipIconRotation }] }}>
              <RotateIcon />
            </Animated.View>
          </TouchableOpacity>
        }
      >
        <View style={$content}>
          {renderPanel("top")}
          {renderPanel("bottom")}
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

const $panelWrapper: ViewStyle = {
  flex: 1,
  position: "relative",
}

const $panelGlow: ViewStyle = {
  position: "absolute",
  top: -4,
  left: -4,
  right: -4,
  bottom: -4,
  backgroundColor: colors.blue,
  borderRadius: 20,
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

const $activeBox: ViewStyle = {
  borderColor: colors.blue,
  borderWidth: 1,
  elevation: 8,
  shadowColor: colors.blue,
  shadowOffset: { width: 0, height: 8 },
  shadowOpacity: 0.2,
  shadowRadius: 18,
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

const $langFlagText: TextStyle = {
  fontSize: 16,
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
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  marginTop: 4,
}

const $micStatusRow: ViewStyle = {
  flex: 1,
}

const $micStatusPill: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
  gap: 6,
}

const $micPulseDot: ViewStyle = {
  width: 8,
  height: 8,
  borderRadius: 4,
  backgroundColor: "#BBBBBB",
}

const $activeMicPulseDot: ViewStyle = {
  backgroundColor: colors.blue,
}

const $listeningText: TextStyle = {
  fontSize: 12,
  fontFamily: typography.primary.semiBold,
  color: colors.blue,
}

const $tapToSpeakText: TextStyle = {
  fontSize: 12,
  fontFamily: typography.primary.normal,
  color: "#9AA0AD",
}

const $micIconStack: ViewStyle = {
  width: 58,
  height: 58,
  alignItems: "center",
  justifyContent: "center",
  position: "relative",
}

const $activeMicHalo: ViewStyle = {
  position: "absolute",
  width: 48,
  height: 48,
  borderRadius: 999,
  backgroundColor: colors.blue,
}

const $listeningWaveBars: ViewStyle = {
  position: "absolute",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
  gap: 3,
}

const $listeningWaveBar: ViewStyle = {
  width: 3,
  height: 14,
  borderRadius: 999,
  backgroundColor: "#FFFFFF",
}

const $micIconShell: ViewStyle = {
  width: 40,
  height: 40,
  borderRadius: 999,
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "#FFFFFF",
  borderWidth: 2,
  borderColor: colors.blue,
}

const $activeMicIconShell: ViewStyle = {
  backgroundColor: colors.blue,
  borderColor: colors.blue,
  elevation: 6,
  shadowColor: colors.blue,
  shadowOffset: { width: 0, height: 4 },
  shadowOpacity: 0.28,
  shadowRadius: 10,
}
