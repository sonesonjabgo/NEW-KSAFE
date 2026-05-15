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
  ActivityIndicator,
  ListRenderItemInfo,
} from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import {
  IconChevronDown,
  IconKeyboard,
  IconMicrophone,
  IconArrowUp,
  IconInfoCircle,
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

// TODO: API 연동 시 navigation params로 roomId 수신
const MOCK_ROOM_ID = "76481574"

interface MessageItem {
  id: string
  sender: string
  text: string
}

const MOCK_MESSAGES: MessageItem[] = [
  { id: "1", sender: "관리자", text: "오늘 안전 교육을 시작합니다. 모두 집중해 주세요." },
  { id: "2", sender: "근로자", text: "네, 알겠습니다." },
]

type InputMode = "default" | "text"

interface EducationPresentationScreenProps extends AppStackScreenProps<"EducationPresentation"> {}

export const EducationPresentationScreen: FC<EducationPresentationScreenProps> = ({
  navigation,
}) => {
  const { bottom } = useSafeAreaInsets()
  const flatListRef = useRef<FlatList<MessageItem>>(null)

  const [inputLanguage, setInputLanguage] = useState<LanguageKey>("korean")
  const [langMenuVisible, setLangMenuVisible] = useState(false)
  const [micActive, setMicActive] = useState(false)
  const [inputMode, setInputMode] = useState<InputMode>("default")
  const [messages, setMessages] = useState<MessageItem[]>(MOCK_MESSAGES)
  const [inputText, setInputText] = useState("")
  const [inputHeight, setInputHeight] = useState(40)
  const [inputFocused, setInputFocused] = useState(false)
  const [showValidationError, setShowValidationError] = useState(false)

  const getLangLabel = (key: LanguageKey) =>
    translate(`educationPresentationScreen:languages.${key}` as any)
  const getLangSubtitle = (key: LanguageKey) =>
    translate(`educationPresentationScreen:languageSubtitles.${key}` as any)
  const getLangFlag = (key: LanguageKey) =>
    LANGUAGES.find((l) => l.key === key)?.flag ?? ""

  const handleSend = useCallback(() => {
    const trimmed = inputText.trim()
    if (!trimmed) {
      setShowValidationError(true)
      return
    }
    setMessages((prev) => [
      ...prev,
      { id: `m-${Date.now()}`, sender: "관리자", text: trimmed },
    ])
    setInputText("")
    setShowValidationError(false)
    setInputHeight(40)
    setInputMode("default")
    setTimeout(() => flatListRef.current?.scrollToEnd({ animated: true }), 100)
  }, [inputText])

  const handleEnterTextMode = () => {
    setMicActive(false)
    setInputMode("text")
  }

  const renderMessage = ({ item }: ListRenderItemInfo<MessageItem>) => (
    <View style={$msgWrapper}>
      <Text text={`[${item.sender}]`} style={$messageSender} />
      <View style={$messageBubble}>
        <Text text={item.text} style={$messageText} />
      </View>
    </View>
  )

  return (
    <>
      <StackScreen
        title={`${translate("educationPresentationScreen:title")}\n${MOCK_ROOM_ID}`}
        onBack={() => navigation.goBack()}
        rightSlot={
          <TouchableOpacity activeOpacity={0.7}>
            <Text
              text={translate("educationPresentationScreen:inviteButton")}
              style={$inviteText}
            />
          </TouchableOpacity>
        }
      >
        {/* 입력 언어 선택 영역 */}
        <View style={$langSelectorBar}>
          <Text
            text={translate("educationPresentationScreen:inputLanguageLabel")}
            style={$langSelectorLabel}
          />
          <TouchableOpacity
            style={$langBtn}
            onPress={() => setLangMenuVisible(true)}
            activeOpacity={0.7}
          >
            <Text text={getLangFlag(inputLanguage)} style={$langFlag} />
            <Text
              text={getLangLabel(inputLanguage)}
              style={$langBtnText}
              numberOfLines={1}
            />
            <IconChevronDown size={14} color={colors.blue} strokeWidth={2.5} />
          </TouchableOpacity>
        </View>

        <KeyboardAvoidingView
          style={$flex}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          {/* 채팅 영역 */}
          <FlatList
            ref={flatListRef}
            style={$flex}
            data={messages}
            keyExtractor={(item) => item.id}
            renderItem={renderMessage}
            contentContainerStyle={$chatContent}
            showsVerticalScrollIndicator={false}
          />

          {/* 음성 인식 중 표시 — 항상 고정 높이 확보, 비활성 시 빈 공간 유지 */}
          <View style={$recognizingRow}>
            {micActive && (
              <>
                <ActivityIndicator size="small" color={colors.blue} />
                <Text
                  text={translate("educationPresentationScreen:recognizing")}
                  style={$recognizingText}
                />
              </>
            )}
          </View>

          {inputMode === "default" ? (
            <>
              {/* 상태 안내 문구 */}
              <View style={$statusBar}>
                <View style={$statusIconCircle}>
                  <IconInfoCircle size={13} color="#FFFFFF" strokeWidth={2} />
                </View>
                <Text
                  text={translate(
                    micActive
                      ? "educationPresentationScreen:statusMicOn"
                      : "educationPresentationScreen:statusMicOff",
                  )}
                  style={$statusText}
                />
              </View>

              {/* 하단 컨트롤 바 */}
              <View style={[$controlBar, { paddingBottom: bottom + 16 }]}>
                <TouchableOpacity
                  style={$iconBtn}
                  onPress={handleEnterTextMode}
                  activeOpacity={0.7}
                >
                  <IconKeyboard size={24} color="#9CA3AF" strokeWidth={1.8} />
                </TouchableOpacity>

                <View style={$micControlRow}>
                  <Text
                    text={translate(
                      micActive
                        ? "educationPresentationScreen:micOnLabel"
                        : "educationPresentationScreen:micOffLabel",
                    )}
                    style={$micLabel}
                  />
                  <TouchableOpacity
                    style={micActive ? $micBtnActive : $micBtnInactive}
                    onPress={() => setMicActive((prev) => !prev)}
                    activeOpacity={0.8}
                  >
                    {micActive ? (
                      <Square size={18} color="#FFFFFF" fill="#FFFFFF" />
                    ) : (
                      <IconMicrophone size={22} color="#FFFFFF" strokeWidth={1.8} />
                    )}
                  </TouchableOpacity>
                </View>
              </View>
            </>
          ) : (
            /* 텍스트 입력 모드 — TextTranslationScreen의 입력 UI와 동일한 구조 */
            <View style={[$textInputArea, { paddingBottom: bottom + 16 }]}>
              <View style={$inputTopRow}>
                <Text
                  text={translate("educationPresentationScreen:inputHint")}
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
                  placeholder={translate("educationPresentationScreen:inputPlaceholder")}
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
                  onPress={handleSend}
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
                text={translate("educationPresentationScreen:validationError")}
                style={[$validationError, { opacity: showValidationError ? 1 : 0 }]}
              />
            </View>
          )}
        </KeyboardAvoidingView>
      </StackScreen>

      <LanguagePickerModal
        isVisible={langMenuVisible}
        currentKey={inputLanguage}
        title={translate("educationPresentationScreen:languageMenu.title")}
        getLabel={getLangLabel}
        getSubtitle={getLangSubtitle}
        onSelect={setInputLanguage}
        onClose={() => setLangMenuVisible(false)}
      />
    </>
  )
}

// ── Styles ──

const $flex: ViewStyle = { flex: 1 }

const $inviteText: TextStyle = {
  fontSize: 15,
  fontFamily: typography.primary.semiBold,
  color: "#FFFFFF",
}

// 언어 선택 영역
const $langSelectorBar: ViewStyle = {
  paddingHorizontal: 20,
  paddingTop: 14,
  paddingBottom: 12,
  gap: 8,
}

const $langSelectorLabel: TextStyle = {
  fontSize: 12,
  fontFamily: typography.primary.normal,
  color: "#6B7280",
}

const $langBtn: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
  alignSelf: "flex-start",
  gap: 6,
  paddingVertical: 4,
}

const $langFlag: TextStyle = {
  fontSize: 16,
}

const $langBtnText: TextStyle = {
  fontSize: 14,
  fontFamily: typography.primary.semiBold,
  color: colors.blue,
}

// 채팅 영역
const $chatContent: { padding: number; paddingBottom: number; flexGrow: number } = {
  padding: 16,
  paddingBottom: 8,
  flexGrow: 1,
}

const $msgWrapper: ViewStyle = {
  marginBottom: 16,
  gap: 4,
}

const $messageBubble: ViewStyle = {
  backgroundColor: "#1062D8",
  borderRadius: 16,
  borderTopLeftRadius: 4,
  paddingHorizontal: 14,
  paddingVertical: 10,
  alignSelf: "flex-start",
  shadowColor: "#1062D8",
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.2,
  shadowRadius: 6,
  elevation: 2,
}

const $messageSender: TextStyle = {
  fontSize: 11,
  fontFamily: typography.primary.semiBold,
  color: "#6B7280",
}

const $messageText: TextStyle = {
  fontSize: 14,
  fontFamily: typography.primary.normal,
  color: "#FFFFFF",
  lineHeight: 20,
}

// 음성 인식 중 — 고정 높이로 레이아웃 시프트 방지
const $recognizingRow: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
  gap: 8,
  paddingHorizontal: 16,
  height: 44,
}

const $recognizingText: TextStyle = {
  fontSize: 13,
  fontFamily: typography.primary.medium,
  color: colors.blue,
}

// 상태 안내 박스
const $statusBar: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
  gap: 10,
  marginHorizontal: 16,
  marginBottom: 8,
  paddingHorizontal: 12,
  paddingVertical: 10,
  borderRadius: 10,
}

const $statusIconCircle: ViewStyle = {
  width: 22,
  height: 22,
  borderRadius: 11,
  backgroundColor: "#1062D8",
  alignItems: "center",
  justifyContent: "center",
}

const $statusText: TextStyle = {
  flex: 1,
  fontSize: 12,
  fontFamily: typography.primary.normal,
  color: "#6B7280",
  lineHeight: 16,
}

// 컨트롤 바
const $controlBar: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  paddingHorizontal: 20,
  paddingTop: 14,
}

const $iconBtn: ViewStyle = {
  width: 48,
  height: 48,
  alignItems: "center",
  justifyContent: "center",
}

const $micControlRow: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
  gap: 10,
}

const $micLabel: TextStyle = {
  fontSize: 13,
  fontFamily: typography.primary.medium,
  color: "#374151",
}

const $micBtnInactive: ViewStyle = {
  width: 52,
  height: 52,
  borderRadius: 26,
  backgroundColor: colors.blue,
  alignItems: "center",
  justifyContent: "center",
  shadowColor: colors.blue,
  shadowOffset: { width: 0, height: 4 },
  shadowOpacity: 0.3,
  shadowRadius: 8,
  elevation: 4,
}

const $micBtnActive: ViewStyle = {
  width: 52,
  height: 52,
  borderRadius: 26,
  backgroundColor: "#EF4444",
  alignItems: "center",
  justifyContent: "center",
  shadowColor: "#EF4444",
  shadowOffset: { width: 0, height: 4 },
  shadowOpacity: 0.3,
  shadowRadius: 8,
  elevation: 4,
}

// 텍스트 입력 영역 (TextTranslationScreen과 동일한 구조)
const $textInputArea: ViewStyle = {
  borderTopWidth: 1,
  borderTopColor: "#E8EBF2",
  paddingHorizontal: 12,
  paddingTop: 8,
  gap: 4,
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

const $textInputRow: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
  gap: 8,
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
