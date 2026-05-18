import { FC, useCallback, useMemo, useState } from "react"
import {
  KeyboardAvoidingView,
  Modal,
  Platform,
  ScrollView,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { IconChevronDown, IconNotes } from "@tabler/icons-react-native"

import { StackScreen } from "@/components/StackScreen"
import { Text } from "@/components/Text"
import { translate } from "@/i18n/translate"
import { AppStackScreenProps } from "@/navigators/navigationTypes"

import * as S from "./styles"

type TbmCreateScreenProps = AppStackScreenProps<"TbmCreate">

const MOCK_WORKPLACES = [
  "서울 영등포구 레미안스 비즈타워",
  "부산 해운대구 센텀시티",
  "경기 화성시 동탄산업단지 A동",
  "인천 연수구 송도동 건설현장",
]

function getInitialDateTime(): string {
  const now = new Date()
  const yyyy = now.getFullYear()
  const mm = String(now.getMonth() + 1).padStart(2, "0")
  const dd = String(now.getDate()).padStart(2, "0")
  const hh = String(now.getHours()).padStart(2, "0")
  const min = String(now.getMinutes()).padStart(2, "0")
  return `${yyyy}.${mm}.${dd} ${hh}:${min}`
}

export const TbmCreateScreen: FC<TbmCreateScreenProps> = ({ navigation }) => {
  const insets = useSafeAreaInsets()

  const [workplace, setWorkplace] = useState("")
  const [dateTime, setDateTime] = useState(getInitialDateTime)
  const [includeDateInTitle, setIncludeDateInTitle] = useState(false)
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [workplaceModalVisible, setWorkplaceModalVisible] = useState(false)

  const isValid = useMemo(
    () => !!workplace && !!dateTime.trim() && !!title.trim(),
    [workplace, dateTime, title],
  )

  const handleReset = useCallback(() => {
    setWorkplace("")
    setDateTime(getInitialDateTime())
    setIncludeDateInTitle(false)
    setTitle("")
    setContent("")
  }, [])

  const handleIncludeDateToggle = useCallback(() => {
    const next = !includeDateInTitle
    setIncludeDateInTitle(next)
    const prefix = dateTime.split(" ")[0] + " "
    if (next) {
      setTitle((t) => prefix + t)
    } else {
      setTitle((t) => (t.startsWith(prefix) ? t.slice(prefix.length) : t))
    }
  }, [includeDateInTitle, dateTime])

  const handleSelectWorkplace = useCallback((wp: string) => {
    setWorkplace(wp)
    setWorkplaceModalVisible(false)
  }, [])

  const handleSubmit = useCallback(() => {
    console.log(JSON.stringify({ workplace, dateTime, title, content }, null, 2))
  }, [workplace, dateTime, title, content])

  const resetLabel = useMemo(() => translate("tbmCreateScreen:reset"), [])

  return (
    <>
      <StackScreen
        title={translate("tbmCreateScreen:title")}
        onBack={() => navigation.goBack()}
        contentBg="#F2F3F5"
        squareTop
        rightSlot={
          <TouchableOpacity
            onPress={handleReset}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          >
            <Text text={resetLabel} style={S.$resetLabel} />
          </TouchableOpacity>
        }
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
              <IconNotes size={20} color="#999999" style={{ marginTop: 2 }} />
              <View style={S.$guideTextBlock}>
                <Text
                  text={translate("tbmCreateScreen:guide.title")}
                  style={S.$guideTitle}
                />
                <Text
                  text={translate("tbmCreateScreen:guide.description")}
                  style={S.$guideDesc}
                />
              </View>
            </View>

            {/* 사업장 선택 */}
            <View style={S.$section}>
              <Text
                text={translate("tbmCreateScreen:workplace.label")}
                style={S.$sectionLabel}
              />
              <TouchableOpacity
                style={S.$inputRow}
                activeOpacity={0.7}
                onPress={() => setWorkplaceModalVisible(true)}
              >
                <Text
                  text={
                    workplace || translate("tbmCreateScreen:workplace.placeholder")
                  }
                  style={[S.$inputText, !workplace && S.$inputPlaceholder]}
                  numberOfLines={1}
                />
                <IconChevronDown size={18} color="#AAAAAA" />
              </TouchableOpacity>
              <Text
                text={translate("tbmCreateScreen:workplace.helper")}
                style={S.$helperText}
              />
            </View>

            {/* 작업 일시 */}
            <View style={S.$section}>
              <Text
                text={translate("tbmCreateScreen:dateTime.label")}
                style={S.$sectionLabel}
              />
              <View style={S.$inputRow}>
                <TextInput
                  style={S.$inputText}
                  value={dateTime}
                  onChangeText={setDateTime}
                  placeholderTextColor="#BBBBBB"
                />
              </View>
              <TouchableOpacity
                style={S.$checkboxRow}
                onPress={handleIncludeDateToggle}
                activeOpacity={0.7}
              >
                <View style={[S.$checkbox, includeDateInTitle && S.$checkboxActive]}>
                  {includeDateInTitle && <View style={S.$checkboxDot} />}
                </View>
                <Text
                  text={translate("tbmCreateScreen:dateTime.includeDateInTitle")}
                  style={S.$checkboxLabel}
                />
              </TouchableOpacity>
              <Text
                text={translate("tbmCreateScreen:dateTime.helper")}
                style={S.$helperText}
              />
            </View>

            {/* 활동 제목 */}
            <View style={S.$section}>
              <Text
                text={translate("tbmCreateScreen:activityTitle.label")}
                style={S.$sectionLabel}
              />
              <View style={S.$inputRow}>
                <TextInput
                  style={S.$inputText}
                  value={title}
                  onChangeText={(t) => setTitle(t.slice(0, 200))}
                  placeholder={translate("tbmCreateScreen:activityTitle.placeholder")}
                  placeholderTextColor="#BBBBBB"
                  maxLength={200}
                />
              </View>
              <Text
                text={translate("tbmCreateScreen:activityTitle.helper")}
                style={S.$helperText}
              />
            </View>

            {/* 활동 내용 */}
            <View style={S.$section}>
              <Text
                text={translate("tbmCreateScreen:content.label")}
                style={S.$sectionLabel}
              />
              <View style={S.$textarea}>
                <TextInput
                  style={S.$textareaInput}
                  value={content}
                  onChangeText={(t) => setContent(t.slice(0, 2000))}
                  placeholder={translate("tbmCreateScreen:content.placeholder")}
                  placeholderTextColor="#BBBBBB"
                  maxLength={2000}
                  multiline
                  scrollEnabled={false}
                />
              </View>
              <Text
                text={translate("tbmCreateScreen:content.helper")}
                style={S.$helperText}
              />
            </View>

            {/* 교육 자료 선택 */}
            <View style={S.$section}>
              <Text
                text={translate("tbmCreateScreen:education.label")}
                style={S.$sectionLabel}
              />
              <View style={S.$educationBadgeRow}>
                <View style={S.$badgeStatus}>
                  <Text
                    text={translate("tbmCreateScreen:education.statusBadge")}
                    style={S.$badgeStatusText}
                  />
                </View>
                <View style={S.$badgeMultiple}>
                  <Text
                    text={translate("tbmCreateScreen:education.multipleBadge")}
                    style={S.$badgeMultipleText}
                  />
                </View>
              </View>
              <View style={S.$educationCount}>
                <Text
                  text={translate("tbmCreateScreen:education.countText", { count: 0 })}
                  style={S.$educationCountText}
                />
                <Text
                  text={translate("tbmCreateScreen:education.countHelper")}
                  style={S.$educationCountHelper}
                />
              </View>
              <TouchableOpacity
                style={S.$educationSelectBtn}
                activeOpacity={0.7}
                onPress={() => console.log("교육자료 선택 모달 열기")}
              >
                <Text
                  text={translate("tbmCreateScreen:education.selectButton")}
                  style={S.$educationSelectBtnText}
                />
              </TouchableOpacity>
            </View>
          </ScrollView>

          {/* 하단 제출 버튼 */}
          <View style={[S.$submitBar, { paddingBottom: insets.bottom + 16 }]}>
            <TouchableOpacity
              style={[S.$submitBtn, !isValid && S.$submitBtnDisabled]}
              activeOpacity={0.8}
              onPress={handleSubmit}
              disabled={!isValid}
            >
              <Text
                text={translate("tbmCreateScreen:submit")}
                style={S.$submitBtnText}
              />
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </StackScreen>

      {/* 사업장 선택 모달 */}
      <Modal
        visible={workplaceModalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setWorkplaceModalVisible(false)}
      >
        <TouchableOpacity
          style={S.$modalBackdrop}
          onPress={() => setWorkplaceModalVisible(false)}
          activeOpacity={1}
        >
          <View style={[S.$modalSheet, { paddingBottom: insets.bottom + 16 }]}>
            {MOCK_WORKPLACES.map((wp) => (
              <TouchableOpacity
                key={wp}
                style={S.$modalItem}
                onPress={() => handleSelectWorkplace(wp)}
                activeOpacity={0.7}
              >
                <Text text={wp} style={S.$modalItemText} />
              </TouchableOpacity>
            ))}
          </View>
        </TouchableOpacity>
      </Modal>
    </>
  )
}
