import { FC, useCallback, useMemo, useState } from "react"
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native"
import { Check } from "lucide-react-native"
import { useTranslation } from "react-i18next"
import { useSafeAreaInsets } from "react-native-safe-area-context"

import { useResponsive } from "@/theme/responsive"

import HeaderBell from "@assets/icons/nav/header_bell.svg"

import { StackScreen } from "@/components/StackScreen"
import { Text } from "@/components/Text"
import { Toast } from "@/components/Toast"
import { translate } from "@/i18n/translate"
import { AppStackScreenProps } from "@/navigators/navigationTypes"

import * as S from "./styles"

type SafeBoardNotifyScreenProps = AppStackScreenProps<"SafeBoardNotify">

const MOCK_WORKPLACES = [
  "서울 한강 레지던스 RC공사 현장",
  "부산 센텀 물류센터 현장",
  "대구 산업단지 신축 현장",
]

export const SafeBoardNotifyScreen: FC<SafeBoardNotifyScreenProps> = ({ navigation }) => {
  useTranslation()
  const insets = useSafeAreaInsets()
  const { isSmallPhone } = useResponsive()

  const [selectedWorkplaces, setSelectedWorkplaces] = useState<string[]>([])
  const [notifyTitle, setNotifyTitle] = useState("")
  const [content, setContent] = useState("")
  const [toastVisible, setToastVisible] = useState(false)

  const toggleWorkplace = useCallback((workplace: string) => {
    setSelectedWorkplaces((prev) =>
      prev.includes(workplace) ? prev.filter((w) => w !== workplace) : [...prev, workplace],
    )
  }, [])

  const isValid = useMemo(
    () => selectedWorkplaces.length > 0 && !!notifyTitle.trim() && !!content.trim(),
    [selectedWorkplaces, notifyTitle, content],
  )

  const handleSend = useCallback(() => {
    console.log(JSON.stringify({ workplaces: selectedWorkplaces, notifyTitle, content }, null, 2))
    setSelectedWorkplaces([])
    setNotifyTitle("")
    setContent("")
    setToastVisible(true)
  }, [selectedWorkplaces, notifyTitle, content])

  return (
    <>
      <StackScreen
        title={translate("safeBoardNotifyScreen:title")}
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
                <Text text={translate("safeBoardNotifyScreen:guide.title")} style={S.$guideTitle} />
                <Text
                  text={translate("safeBoardNotifyScreen:guide.description")}
                  style={[S.$guideDesc, isSmallPhone && { fontSize: 13 }]}
                />
              </View>
            </View>

            {/* 사업장 선택 */}
            <View style={S.$section}>
              <Text
                text={translate("safeBoardNotifyScreen:workplace.label")}
                style={S.$sectionLabel}
              />
              <View style={S.$workplaceCard}>
                {MOCK_WORKPLACES.map((workplace) => {
                  const isSelected = selectedWorkplaces.includes(workplace)
                  return (
                    <View key={workplace}>
                      <TouchableOpacity
                        style={[S.$workplaceRow, isSelected && S.$workplaceRowSelected]}
                        activeOpacity={0.7}
                        onPress={() => toggleWorkplace(workplace)}
                      >
                        <View style={[S.$checkbox, isSelected && S.$checkboxSelected]}>
                          {isSelected && <Check size={13} color="#FFFFFF" strokeWidth={3} />}
                        </View>
                        <Text
                          text={workplace}
                          style={[S.$workplaceItemText, isSelected && S.$workplaceItemTextSelected]}
                          numberOfLines={2}
                        />
                      </TouchableOpacity>
                    </View>
                  )
                })}
              </View>
              <Text
                text={translate("safeBoardNotifyScreen:workplace.helper", {
                  total: MOCK_WORKPLACES.length,
                  selected: selectedWorkplaces.length,
                })}
                style={S.$helperText}
              />
            </View>

            {/* 알림 제목 */}
            <View style={S.$section}>
              <View style={S.$sectionLabelRow}>
                <Text
                  text={translate("safeBoardNotifyScreen:notifyTitle.label")}
                  style={S.$sectionLabel}
                />
                <Text text=" *" style={S.$requiredMark} />
              </View>
              <View style={S.$inputRow}>
                <TextInput
                  style={S.$inputText}
                  value={notifyTitle}
                  onChangeText={(t) => setNotifyTitle(t.slice(0, 50))}
                  placeholder={translate("safeBoardNotifyScreen:notifyTitle.placeholder")}
                  placeholderTextColor="#BBBBBB"
                  maxLength={50}
                />
              </View>
              <Text
                text={translate("safeBoardNotifyScreen:notifyTitle.helper")}
                style={S.$helperText}
              />
            </View>

            {/* 알림 내용 */}
            <View style={[S.$section, { borderBottomWidth: 0 }]}>
              <View style={S.$sectionLabelRow}>
                <Text
                  text={translate("safeBoardNotifyScreen:content.label")}
                  style={S.$sectionLabel}
                />
                <Text text=" *" style={S.$requiredMark} />
              </View>
              <View style={S.$textarea}>
                <TextInput
                  style={S.$textareaInput}
                  value={content}
                  onChangeText={(t) => setContent(t.slice(0, 240))}
                  placeholder={translate("safeBoardNotifyScreen:content.placeholder")}
                  placeholderTextColor="#BBBBBB"
                  maxLength={240}
                  multiline
                  scrollEnabled={false}
                />
              </View>
              <Text
                text={translate("safeBoardNotifyScreen:content.helper")}
                style={S.$helperText}
              />
            </View>
          </ScrollView>

          {/* 알림 전송 버튼 */}
          <View style={[S.$submitBar, { paddingBottom: insets.bottom + 16 }]}>
            <TouchableOpacity
              style={[S.$submitBtn, !isValid && S.$submitBtnDisabled]}
              activeOpacity={0.8}
              onPress={handleSend}
              disabled={!isValid}
            >
              <Text text={translate("safeBoardNotifyScreen:send")} style={S.$submitBtnText} />
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </StackScreen>
      <Toast
        visible={toastVisible}
        message={translate("safeBoardNotifyScreen:sendSuccess")}
        icon={<Check size={14} color="#FFFFFF" strokeWidth={2.5} />}
        onHide={() => setToastVisible(false)}
      />
    </>
  )
}
