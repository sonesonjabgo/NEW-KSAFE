import { useCallback, useEffect, useMemo, useState } from "react"
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native"
import { Check } from "lucide-react-native"
import { observer } from "mobx-react-lite"
import { useSafeAreaInsets } from "react-native-safe-area-context"

import HeaderBell from "@assets/icons/nav/header_bell.svg"

import { StackScreen } from "@/components/StackScreen"
import { Text } from "@/components/Text"
import { Toast } from "@/components/Toast"
import { translate } from "@/i18n/translate"
import { useStores } from "@/models"
import { AppStackScreenProps } from "@/navigators/navigationTypes"

import * as S from "./styles"

type SafeBoardNotifyScreenProps = AppStackScreenProps<"SafeBoardNotify">

export const SafeBoardNotifyScreen = observer(function SafeBoardNotifyScreen({
  navigation,
}: SafeBoardNotifyScreenProps) {
  const insets = useSafeAreaInsets()
  const { workplaceStore, safeBoardStore } = useStores()

  const [selectedWorkplaces, setSelectedWorkplaces] = useState<string[]>([])
  const [notifyTitle, setNotifyTitle] = useState("")
  const [content, setContent] = useState("")
  const [toastVisible, setToastVisible] = useState(false)
  const [isSending, setIsSending] = useState(false)

  // 컴포넌트 진입 시 사업장 목록이 없으면 로드
  useEffect(() => {
    if (workplaceStore.workplaces.length === 0) {
      workplaceStore.fetchWorkplaces()
    }
  }, [workplaceStore])

  const toggleWorkplace = useCallback((workplaceId: string) => {
    setSelectedWorkplaces((prev) =>
      prev.includes(workplaceId) ? prev.filter((w) => w !== workplaceId) : [...prev, workplaceId],
    )
  }, [])

  const handleSelectAll = useCallback(() => {
    if (selectedWorkplaces.length === workplaceStore.workplaces.length) {
      setSelectedWorkplaces([])
    } else {
      setSelectedWorkplaces(workplaceStore.workplaces.map((wp) => wp.id))
    }
  }, [selectedWorkplaces.length, workplaceStore.workplaces])

  const isAllSelected = useMemo(
    () =>
      workplaceStore.workplaces.length > 0 &&
      selectedWorkplaces.length === workplaceStore.workplaces.length,
    [selectedWorkplaces.length, workplaceStore.workplaces.length],
  )

  const isValid = useMemo(
    () =>
      selectedWorkplaces.length > 0 &&
      !!notifyTitle.trim() &&
      !!content.trim() &&
      !isSending &&
      workplaceStore.status !== "pending",
    [selectedWorkplaces, notifyTitle, content, isSending, workplaceStore.status],
  )

  const handleSend = useCallback(async () => {
    if (!isValid) return

    setIsSending(true)
    try {
      await safeBoardStore.sendPushNotificationAction({
        workplaceIds: selectedWorkplaces,
        title: notifyTitle.trim(),
        body: content.trim(),
      })

      setToastVisible(true)
      // 토스트 표시 후 잠시 뒤에 이동
      setTimeout(() => {
        navigation.goBack()
      }, 1500)
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "알림 전송에 실패했습니다."
      Alert.alert("전송 실패", errorMessage)
    } finally {
      setIsSending(false)
    }
  }, [isValid, selectedWorkplaces, notifyTitle, content, safeBoardStore, navigation])

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
                  style={S.$guideDesc}
                />
              </View>
            </View>

            {/* 사업장 선택 */}
            <View style={S.$section}>
              <View style={S.$sectionLabelRow}>
                <Text
                  text={translate("safeBoardNotifyScreen:workplace.label")}
                  style={S.$sectionLabel}
                />
                {workplaceStore.workplaces.length > 0 && (
                  <TouchableOpacity
                    style={S.$selectAllBtn}
                    onPress={handleSelectAll}
                    activeOpacity={0.7}
                  >
                    <View style={[S.$checkbox, isAllSelected && S.$checkboxSelected]}>
                      {isAllSelected && <Check size={13} color="#FFFFFF" strokeWidth={3} />}
                    </View>
                    <Text
                      text={translate(
                        isAllSelected ? "common:deselectAll" : "common:selectAll" as any,
                        { defaultValue: isAllSelected ? "전체 해제" : "전체 선택" },
                      )}
                      style={S.$selectAllText}
                    />
                  </TouchableOpacity>
                )}
              </View>

              <View style={S.$workplaceCard}>
                {workplaceStore.status === "pending" && workplaceStore.workplaces.length === 0 ? (
                  <View style={{ padding: 20 }}>
                    <ActivityIndicator color="#1062D8" />
                  </View>
                ) : workplaceStore.workplaces.length === 0 ? (
                  <View style={{ padding: 20 }}>
                    <Text text="관리 중인 사업장이 없습니다." style={S.$helperText} />
                  </View>
                ) : (
                  workplaceStore.workplaces.map((wp, index) => {
                    const isSelected = selectedWorkplaces.includes(wp.id)
                    const isLast = index === workplaceStore.workplaces.length - 1
                    return (
                      <View key={wp.id}>
                        <TouchableOpacity
                          style={[S.$workplaceRow, isSelected && S.$workplaceRowSelected]}
                          activeOpacity={0.7}
                          onPress={() => toggleWorkplace(wp.id)}
                        >
                          <View style={[S.$checkbox, isSelected && S.$checkboxSelected]}>
                            {isSelected && <Check size={13} color="#FFFFFF" strokeWidth={3} />}
                          </View>
                          <Text
                            text={wp.workplaceName}
                            style={[S.$workplaceItemText, isSelected && S.$workplaceItemTextSelected]}
                            numberOfLines={2}
                          />
                        </TouchableOpacity>
                        {!isLast && <View style={S.$workplaceDivider} />}
                      </View>
                    )
                  })
                )}
              </View>
              <Text
                text={translate("safeBoardNotifyScreen:workplace.helper", {
                  total: workplaceStore.workplaces.length,
                  selected: selectedWorkplaces.length,
                })}
                style={S.$helperText}
              />
            </View>

            {/* 알림 제목 */}
            <View style={S.$section}>
              <View style={[S.$sectionLabelRow, { justifyContent: "flex-start" }]}>
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
                  editable={!isSending}
                />
              </View>
              <Text
                text={translate("safeBoardNotifyScreen:notifyTitle.helper")}
                style={S.$helperText}
              />
            </View>

            {/* 알림 내용 */}
            <View style={[S.$section, { borderBottomWidth: 0 }]}>
              <View style={[S.$sectionLabelRow, { justifyContent: "flex-start" }]}>
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
                  editable={!isSending}
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
              {isSending ? (
                <ActivityIndicator color="#FFFFFF" />
              ) : (
                <Text text={translate("safeBoardNotifyScreen:send")} style={S.$submitBtnText} />
              )}
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
})
