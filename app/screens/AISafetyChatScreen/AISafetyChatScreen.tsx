import { FC, useState, useRef, useCallback, useEffect } from "react"
import {
  View,
  ViewStyle,
  TextStyle,
  TouchableOpacity,
  FlatList,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Alert,
  ListRenderItemInfo,
  Text as RNText,
} from "react-native"
import { IconTrash, IconSend2 } from "@tabler/icons-react-native"

import { StackScreen } from "@/components/StackScreen"
import { Text } from "@/components/Text"
import { translate } from "@/i18n/translate"
import type { AppStackScreenProps } from "@/navigators/navigationTypes"
import { colors } from "@/theme/colors"
import { typography } from "@/theme/typography"

interface AISafetyChatScreenProps extends AppStackScreenProps<"AISafetyChat"> {}

type MessageRole = "user" | "ai"

interface Message {
  id: string
  role: MessageRole
  text: string
}

function getMockResponse(question: string): string {
  if (question.includes("일반 안전규정") || question.includes("안전규정")) {
    return `**건설 현장 일반 안전 규정**\n\n1. **개인보호장구 착용 의무화**\n   - 안전모, 안전화, 안전조끼를 반드시 착용해야 합니다.\n\n2. **작업 전 안전점검 실시**\n   - 매일 작업 시작 전 TBM(Tool Box Meeting)을 통해 당일 위험요인을 공유합니다.\n\n3. **안전 표지판 준수**\n   - 출입 금지 구역, 낙하물 위험 구역 등의 표지판을 반드시 따라야 합니다.\n\n4. **위험작업 허가제 운영**\n   - 고소작업, 밀폐공간 작업 등 위험작업은 사전 허가를 받아야 합니다.\n\n5. **안전통로 확보**\n   - 작업 통로는 항상 깨끗하게 유지하고 장애물을 제거합니다.`
  }
  if (question.includes("고소 작업") || question.includes("고소작업")) {
    return `**고소 작업 안전 수칙**\n\n1. **추락 방지 조치**\n   - 2m 이상 고소작업 시 안전대 착용 의무\n   - 안전난간 또는 안전망 설치\n\n2. **작업발판 설치 기준**\n   - 폭 40cm 이상의 발판 사용\n   - 발판 틈새 3cm 이내 유지\n\n3. **사다리 사용 기준**\n   - 75° 이하의 경사 유지\n   - 최상단 3개 발판에는 올라서지 않음\n\n4. **악천후 시 작업 중지**\n   - 풍속 10m/s 이상, 강우량 1mm/h 이상 시 중지\n\n5. **작업 전 점검**\n   - 발판, 안전대, 지지물의 이상 유무를 반드시 확인합니다.`
  }
  if (question.includes("화재") || question.includes("비상")) {
    return `**화재 발생 시 비상 대응 절차**\n\n**1단계: 발견 및 신고**\n- 화재를 발견하면 즉시 "불이야!"를 크게 외칩니다.\n- 119에 신고하고 현장 관리자에게 보고합니다.\n\n**2단계: 초기 진압 시도**\n- 소화기를 이용해 초기 진압을 시도합니다.\n- 불길이 크면 즉시 대피합니다.\n\n**3단계: 대피**\n- 비상구를 이용해 신속히 대피합니다.\n- 낮은 자세로 이동합니다.\n\n**4단계: 집결지 집합**\n- 지정된 비상집결지로 이동합니다.\n- 인원 점검 후 관리자에게 보고합니다.\n\n⚠️ **절대 금지**: 화재 현장에 재진입하지 마세요.`
  }
  return `안녕하세요! 건설 현장 안전에 관해 도움을 드리겠습니다.\n\n구체적인 질문을 입력해 주시면 상세히 안내해 드리겠습니다.`
}

function InlineLine({ text, baseStyle }: { text: string; baseStyle?: TextStyle }) {
  const parts = text.split(/(\*\*[^*]+\*\*)/)
  return (
    <RNText style={baseStyle}>
      {parts.map((part, i) => {
        const boldMatch = part.match(/^\*\*([^*]+)\*\*$/)
        if (boldMatch) {
          return (
            <RNText key={i} style={[$mdBold, baseStyle]}>
              {boldMatch[1]}
            </RNText>
          )
        }
        return <RNText key={i}>{part}</RNText>
      })}
    </RNText>
  )
}

function SimpleMarkdown({ text, style }: { text: string; style?: TextStyle }) {
  const lines = text.split("\n")
  return (
    <View>
      {lines.map((line, lineIdx) => {
        const numberedMatch = line.match(/^(\d+)\.\s+(.+)/)
        const indentedBulletMatch = line.match(/^\s{2,}[-*]\s+(.+)/)
        const bulletMatch = line.match(/^[-*•]\s+(.+)/)

        if (line.trim() === "") {
          return <View key={lineIdx} style={$mdSpacer} />
        }

        if (indentedBulletMatch) {
          return (
            <View key={lineIdx} style={$mdIndentRow}>
              <RNText style={[$mdBulletDot, style]}>{"•"}</RNText>
              <View style={$mdBulletContent}>
                <InlineLine text={indentedBulletMatch[1]} baseStyle={style} />
              </View>
            </View>
          )
        }

        if (numberedMatch) {
          return (
            <View key={lineIdx} style={$mdListRow}>
              <RNText style={[$mdListNum, style]}>{`${numberedMatch[1]}.`}</RNText>
              <View style={$mdBulletContent}>
                <InlineLine text={numberedMatch[2]} baseStyle={style} />
              </View>
            </View>
          )
        }

        if (bulletMatch) {
          return (
            <View key={lineIdx} style={$mdListRow}>
              <RNText style={[$mdBulletDot, style]}>{"•"}</RNText>
              <View style={$mdBulletContent}>
                <InlineLine text={bulletMatch[1]} baseStyle={style} />
              </View>
            </View>
          )
        }

        return (
          <View key={lineIdx} style={$mdParagraphRow}>
            <InlineLine text={line} baseStyle={style} />
          </View>
        )
      })}
    </View>
  )
}

function LoadingDots() {
  const [dotCount, setDotCount] = useState(1)

  useEffect(() => {
    const interval = setInterval(() => {
      setDotCount((prev) => (prev >= 3 ? 1 : prev + 1))
    }, 400)
    return () => clearInterval(interval)
  }, [])

  return (
    <View style={$loadingDotsRow}>
      <View style={[$dot, dotCount >= 1 && $dotActive]} />
      <View style={[$dot, dotCount >= 2 && $dotActive]} />
      <View style={[$dot, dotCount >= 3 && $dotActive]} />
    </View>
  )
}

export const AISafetyChatScreen: FC<AISafetyChatScreenProps> = ({ navigation }) => {
  const flatListRef = useRef<FlatList<Message>>(null)

  const [messages, setMessages] = useState<Message[]>([])
  const [inputText, setInputText] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [conversationStarted, setConversationStarted] = useState(false)

  const canSend = inputText.trim().length >= 2 && inputText.trim().length <= 1000 && !isLoading

  const scrollToBottom = useCallback(() => {
    setTimeout(() => {
      flatListRef.current?.scrollToEnd({ animated: true })
    }, 100)
  }, [])

  const sendMessage = useCallback(
    async (text: string) => {
      const trimmed = text.trim()
      if (trimmed.length < 2 || trimmed.length > 1000 || isLoading) return

      const userMsg: Message = {
        id: `user-${Date.now()}`,
        role: "user",
        text: trimmed,
      }

      setMessages((prev) => [...prev, userMsg])
      setInputText("")
      setIsLoading(true)
      setConversationStarted(true)
      scrollToBottom()

      await new Promise<void>((r) => setTimeout(r, 1500))

      const aiMsg: Message = {
        id: `ai-${Date.now()}`,
        role: "ai",
        text: getMockResponse(trimmed),
      }

      setMessages((prev) => [...prev, aiMsg])
      setIsLoading(false)
      scrollToBottom()
    },
    [isLoading, scrollToBottom],
  )

  const handleSend = () => sendMessage(inputText)

  const handleDeleteConversation = () => {
    Alert.alert(
      translate("aiSafetyChatScreen:deleteDialog.title"),
      translate("aiSafetyChatScreen:deleteDialog.message"),
      [
        { text: translate("aiSafetyChatScreen:deleteDialog.cancel"), style: "cancel" },
        {
          text: translate("aiSafetyChatScreen:deleteDialog.confirm"),
          style: "destructive",
          onPress: () => {
            setMessages([])
            setConversationStarted(false)
          },
        },
      ],
    )
  }

  const renderMessage = ({ item }: ListRenderItemInfo<Message>) => {
    if (item.role === "user") {
      return (
        <View style={$userMsgWrapper}>
          <View style={$userBubble}>
            <SimpleMarkdown text={item.text} style={$userMsgText} />
          </View>
        </View>
      )
    }
    return (
      <View style={$aiMsgWrapper}>
        <View style={$aiAvatar} />
        <View style={$aiMsgContent}>
          <Text text={translate("aiSafetyChatScreen:aiName")} style={$aiMsgName} />
          <View style={$aiBubble}>
            <SimpleMarkdown text={item.text} style={$aiMsgText} />
          </View>
        </View>
      </View>
    )
  }

  const renderLoadingIndicator = () => {
    if (!isLoading) return null
    return (
      <View style={$aiMsgWrapper}>
        <View style={$aiAvatar} />
        <View style={$aiMsgContent}>
          <Text text={translate("aiSafetyChatScreen:aiName")} style={$aiMsgName} />
          <View style={[$aiBubble, $loadingBubble]}>
            <LoadingDots />
          </View>
        </View>
      </View>
    )
  }

  const renderWelcomeContent = () => (
    <View style={$welcomeContainer}>
      <View style={$welcomeMsgRow}>
        <View style={$aiAvatar} />
        <View style={$aiMsgContent}>
          <Text text={translate("aiSafetyChatScreen:aiName")} style={$aiMsgName} />
          <View style={$aiBubble}>
            <SimpleMarkdown
              text={translate("aiSafetyChatScreen:welcomeMessage")}
              style={$aiMsgText}
            />
          </View>
        </View>
      </View>
    </View>
  )

  return (
    <StackScreen
      title={translate("aiSafetyChatScreen:title")}
      onBack={() => navigation.goBack()}
      rightSlot={
        <TouchableOpacity style={$trashButton} onPress={handleDeleteConversation}>
          <IconTrash size={22} color="#FFFFFF" />
        </TouchableOpacity>
      }
    >
      <KeyboardAvoidingView
        style={$keyboardView}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        {conversationStarted ? (
          <FlatList
            ref={flatListRef}
            data={messages}
            keyExtractor={(item) => item.id}
            renderItem={renderMessage}
            contentContainerStyle={$chatList}
            ListFooterComponent={renderLoadingIndicator}
            showsVerticalScrollIndicator={false}
          />
        ) : (
          <FlatList
            data={[] as Message[]}
            renderItem={null}
            ListHeaderComponent={renderWelcomeContent}
            contentContainerStyle={$chatList}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item) => item.id}
          />
        )}

        <View style={$inputContainer}>
          <View style={$inputRow}>
            <TextInput
              style={$textInput}
              placeholder={translate("aiSafetyChatScreen:inputPlaceholder")}
              placeholderTextColor="#ABABAB"
              value={inputText}
              onChangeText={setInputText}
              maxLength={1000}
              editable={!isLoading}
            />
            <TouchableOpacity
              style={[$sendButton, canSend ? $sendButtonActive : $sendButtonInactive]}
              onPress={handleSend}
              disabled={!canSend}
              activeOpacity={0.8}
            >
              <IconSend2 size={20} color={canSend ? "#FFFFFF" : "#ABABAB"} />
            </TouchableOpacity>
          </View>
          <Text text={translate("aiSafetyChatScreen:inputHint")} style={$inputHint} />
        </View>
      </KeyboardAvoidingView>
    </StackScreen>
  )
}

// ── Styles ──

const $trashButton: ViewStyle = {
  width: 36,
  height: 36,
  justifyContent: "center",
  alignItems: "flex-end",
}

const $keyboardView: ViewStyle = {
  flex: 1,
  backgroundColor: colors.screenBg,
}

const $chatList: {
  padding: number
  paddingBottom: number
  flexGrow: number
} = {
  padding: 16,
  paddingBottom: 8,
  flexGrow: 1,
}

const $welcomeContainer: ViewStyle = {
  flex: 1,
  paddingTop: 8,
}

const $welcomeMsgRow: ViewStyle = {
  flexDirection: "row",
  alignItems: "flex-start",
  gap: 10,
}

const $userMsgWrapper: ViewStyle = {
  alignItems: "flex-end",
  marginBottom: 16,
}

const $userBubble: ViewStyle = {
  backgroundColor: colors.blue,
  borderRadius: 16,
  borderTopRightRadius: 4,
  paddingHorizontal: 14,
  paddingVertical: 10,
  maxWidth: "80%",
}

const $userMsgText: TextStyle = {
  fontSize: 14,
  fontFamily: typography.primary.normal,
  color: "#FFFFFF",
  lineHeight: 20,
}

const $aiMsgWrapper: ViewStyle = {
  flexDirection: "row",
  alignItems: "flex-start",
  marginBottom: 16,
  gap: 10,
}

const $aiAvatar: ViewStyle = {
  width: 38,
  height: 38,
  borderRadius: 19,
  backgroundColor: "#EEF4FF",
  borderWidth: 1,
  borderColor: "#C8D8F5",
}

const $aiMsgContent: ViewStyle = {
  flex: 1,
  gap: 4,
}

const $aiMsgName: TextStyle = {
  fontSize: 12,
  fontFamily: typography.primary.semiBold,
  color: "#555F7C",
}

const $aiBubble: ViewStyle = {
  backgroundColor: "#FFFFFF",
  borderRadius: 16,
  borderTopLeftRadius: 4,
  paddingHorizontal: 14,
  paddingVertical: 10,
  shadowColor: "#000",
  shadowOffset: { width: 0, height: 1 },
  shadowOpacity: 0.06,
  shadowRadius: 4,
  elevation: 2,
}

const $aiMsgText: TextStyle = {
  fontSize: 14,
  fontFamily: typography.primary.normal,
  color: "#1A2236",
  lineHeight: 20,
}

const $loadingBubble: ViewStyle = {
  alignSelf: "flex-start",
  paddingVertical: 14,
  paddingHorizontal: 18,
}

const $loadingDotsRow: ViewStyle = {
  flexDirection: "row",
  gap: 6,
  alignItems: "center",
}

const $dot: ViewStyle = {
  width: 8,
  height: 8,
  borderRadius: 4,
  backgroundColor: "#D0D5E0",
}

const $dotActive: ViewStyle = {
  backgroundColor: colors.blue,
}

const $mdParagraphRow: ViewStyle = {
  flexDirection: "row",
  flexWrap: "wrap",
}

const $mdListRow: ViewStyle = {
  flexDirection: "row",
  alignItems: "flex-start",
  gap: 6,
  marginBottom: 2,
}

const $mdIndentRow: ViewStyle = {
  flexDirection: "row",
  alignItems: "flex-start",
  gap: 6,
  marginBottom: 2,
  paddingLeft: 16,
}

const $mdBulletContent: ViewStyle = {
  flex: 1,
}

const $mdBulletDot: TextStyle = {
  fontSize: 14,
  lineHeight: 20,
}

const $mdListNum: TextStyle = {
  fontSize: 14,
  lineHeight: 20,
  minWidth: 20,
}

const $mdSpacer: ViewStyle = {
  height: 6,
}

const $mdBold: TextStyle = {
  fontFamily: typography.primary.bold,
}

const $inputContainer: ViewStyle = {
  backgroundColor: "#FFFFFF",
  borderTopWidth: 1,
  borderTopColor: "#E8EBF2",
  paddingHorizontal: 16,
  paddingTop: 12,
  paddingBottom: 20,
  gap: 6,
}

const $inputRow: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
  height: 50,
  backgroundColor: "#F4F6FB",
  borderRadius: 46.5,
  borderWidth: 1,
  borderColor: "#E0E5F0",
  paddingLeft: 14,
  paddingRight: 4,
}

const $textInput: TextStyle = {
  flex: 1,
  fontSize: 14,
  fontFamily: typography.primary.normal,
  color: "#1A2236",
}

const $sendButton: ViewStyle = {
  width: 42,
  height: 42,
  borderRadius: 21,
  alignItems: "center",
  justifyContent: "center",
}

const $sendButtonActive: ViewStyle = {
  backgroundColor: colors.blue,
}

const $sendButtonInactive: ViewStyle = {
  backgroundColor: "#EDEEF2",
}

const $inputHint: TextStyle = {
  fontSize: 11,
  fontFamily: typography.primary.normal,
  color: "#9CA3AF",
  textAlign: "center",
}
