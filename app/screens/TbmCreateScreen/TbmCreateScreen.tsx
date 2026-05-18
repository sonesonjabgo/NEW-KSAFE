import { FC, useCallback, useMemo, useRef, useState } from "react"
import {
  Animated,
  KeyboardAvoidingView,
  Modal,
  Platform,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native"
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { IconChevronDown } from "@tabler/icons-react-native"
import HeaderBell from "@assets/icons/nav2/header_bell.svg"
import EducationFrame from "@assets/icons/education_frame.svg"

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

function formatDate(d: Date): string {
  const yyyy = d.getFullYear()
  const mm = String(d.getMonth() + 1).padStart(2, "0")
  const dd = String(d.getDate()).padStart(2, "0")
  const hh = String(d.getHours()).padStart(2, "0")
  const min = String(d.getMinutes()).padStart(2, "0")
  return `${yyyy}.${mm}.${dd} ${hh}:${min}`
}

export const TbmCreateScreen: FC<TbmCreateScreenProps> = ({ navigation }) => {
  const insets = useSafeAreaInsets()

  const [selectedEducationIds, setSelectedEducationIds] = useState<number[]>([])
  const [workplace, setWorkplace] = useState("")
  const [selectedDate, setSelectedDate] = useState(() => new Date())
  const [dateTime, setDateTime] = useState(() => formatDate(new Date()))
  const [includeDateInTitle, setIncludeDateInTitle] = useState(false)
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [workplaceModalVisible, setWorkplaceModalVisible] = useState(false)
  const [datePickerVisible, setDatePickerVisible] = useState(false)
  const [datePickerMode, setDatePickerMode] = useState<"date" | "time">("date")
  const slideAnim = useRef(new Animated.Value(400)).current
  const fadeAnim = useRef(new Animated.Value(0)).current

  const openWorkplaceModal = useCallback(() => {
    setWorkplaceModalVisible(true)
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 200, useNativeDriver: true }),
      Animated.timing(slideAnim, { toValue: 0, duration: 260, useNativeDriver: true }),
    ]).start()
  }, [fadeAnim, slideAnim])

  const closeWorkplaceModal = useCallback(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 0, duration: 160, useNativeDriver: true }),
      Animated.timing(slideAnim, { toValue: 400, duration: 200, useNativeDriver: true }),
    ]).start(() => setWorkplaceModalVisible(false))
  }, [fadeAnim, slideAnim])

  const isValid = useMemo(
    () => !!workplace && !!dateTime.trim() && !!title.trim(),
    [workplace, dateTime, title],
  )

  const handleReset = useCallback(() => {
    const now = new Date()
    setWorkplace("")
    setSelectedDate(now)
    setDateTime(formatDate(now))
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

  const openDatePicker = useCallback(() => {
    if (Platform.OS === "ios") {
      setDatePickerVisible(true)
    } else {
      setDatePickerMode("date")
      setDatePickerVisible(true)
    }
  }, [])

  const handleDateChange = useCallback(
    (event: DateTimePickerEvent, picked?: Date) => {
      if (Platform.OS === "android") {
        setDatePickerVisible(false)
        if (event.type === "dismissed" || !picked) return
        if (datePickerMode === "date") {
          // 날짜 선택 후 시간 선택으로 이동
          const merged = new Date(picked)
          merged.setHours(selectedDate.getHours(), selectedDate.getMinutes())
          setSelectedDate(merged)
          setDatePickerMode("time")
          setDatePickerVisible(true)
        } else {
          const merged = new Date(selectedDate)
          merged.setHours(picked.getHours(), picked.getMinutes())
          setSelectedDate(merged)
          const formatted = formatDate(merged)
          setDateTime(formatted)
          setDatePickerMode("date")
        }
      } else {
        if (picked) {
          setSelectedDate(picked)
          setDateTime(formatDate(picked))
        }
      }
    },
    [datePickerMode, selectedDate],
  )

  const confirmIOSPicker = useCallback(() => {
    setDatePickerVisible(false)
  }, [])

  const handleSelectWorkplace = useCallback((wp: string) => {
    setWorkplace(wp)
    closeWorkplaceModal()
  }, [closeWorkplaceModal])

  const handleOpenEducationSelect = useCallback(() => {
    navigation.navigate("EducationSelect", {
      initialSelected: selectedEducationIds,
      onConfirm: (ids) => setSelectedEducationIds(ids),
    })
  }, [navigation, selectedEducationIds])

  const handleSubmit = useCallback(() => {
    console.log(JSON.stringify({ workplace, dateTime, title, content, selectedEducationIds }, null, 2))
  }, [workplace, dateTime, title, content, selectedEducationIds])

  const resetLabel = useMemo(() => translate("tbmCreateScreen:reset"), [])

  return (
    <>
      <StackScreen
        title={translate("tbmCreateScreen:title")}
        onBack={() => navigation.goBack()}
        contentBg="#FFFFFF"
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
              <View style={S.$guideIconWrap}>
                <HeaderBell width={25} height={25} color="#1062D8" />
              </View>
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
                onPress={openWorkplaceModal}
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
              <TouchableOpacity
                style={S.$inputRow}
                activeOpacity={0.7}
                onPress={openDatePicker}
              >
                <Text text={dateTime} style={S.$inputText} />
                <IconChevronDown size={18} color="#AAAAAA" />
              </TouchableOpacity>
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
            <View style={[S.$section, { borderBottomWidth: 0 }]}>
              <Text
                text={translate("tbmCreateScreen:education.label")}
                style={S.$sectionLabel}
              />
              <View style={S.$educationCount}>
                {/* 상단 배지 행 */}
                <View style={S.$educationCountHeader}>
                  <Text
                    text={translate("tbmCreateScreen:education.statusBadge")}
                    style={S.$educationStatusBadgeText}
                  />
                  <View style={S.$educationMultipleBadge}>
                    <Text
                      text={translate("tbmCreateScreen:education.multipleBadge")}
                      style={S.$educationMultipleBadgeText}
                    />
                  </View>
                </View>
                {/* 콘텐츠 행: 아이콘 + 텍스트 */}
                <View style={S.$educationCountBody}>
                  <View style={S.$educationIconCircle}>
                    <EducationFrame width={28} height={28} />
                  </View>
                  <View style={S.$educationCountTextBlock}>
                    <Text
                      text={translate("tbmCreateScreen:education.countText", { count: selectedEducationIds.length })}
                      style={S.$educationCountText}
                    />
                    <Text
                      text={translate("tbmCreateScreen:education.countHelper")}
                      style={S.$educationCountHelper}
                    />
                  </View>
                </View>
              </View>
              <TouchableOpacity
                style={S.$educationSelectBtn}
                activeOpacity={0.7}
                onPress={handleOpenEducationSelect}
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
        animationType="none"
        onRequestClose={closeWorkplaceModal}
      >
        <View style={StyleSheet.absoluteFill}>
          <Animated.View
            style={[StyleSheet.absoluteFill, S.$modalBackdrop, { opacity: fadeAnim }]}
          />
          <TouchableOpacity
            style={StyleSheet.absoluteFill}
            onPress={closeWorkplaceModal}
            activeOpacity={1}
          />
          <Animated.View
            style={[
              S.$modalSheet,
              { paddingBottom: insets.bottom + 16, transform: [{ translateY: slideAnim }] },
            ]}
          >
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
          </Animated.View>
        </View>
      </Modal>

      {/* 날짜/시간 피커 — Android: 네이티브 다이얼로그 */}
      {Platform.OS === "android" && datePickerVisible && (
        <DateTimePicker
          value={selectedDate}
          mode={datePickerMode}
          display="default"
          onChange={handleDateChange}
        />
      )}

      {/* 날짜/시간 피커 — iOS: 바텀시트 */}
      {Platform.OS === "ios" && (
        <Modal
          visible={datePickerVisible}
          transparent
          animationType="slide"
          onRequestClose={confirmIOSPicker}
        >
          <TouchableOpacity
            style={S.$datePickerBackdrop}
            onPress={confirmIOSPicker}
            activeOpacity={1}
          />
          <View style={[S.$datePickerSheet, { paddingBottom: insets.bottom + 8 }]}>
            <TouchableOpacity style={S.$datePickerConfirm} onPress={confirmIOSPicker}>
              <Text text={translate("tbmCreateScreen:dateTime.confirm")} style={S.$datePickerConfirmText} />
            </TouchableOpacity>
            <DateTimePicker
              value={selectedDate}
              mode="datetime"
              display="spinner"
              onChange={handleDateChange}
              locale="ko-KR"
              style={{ width: "100%" }}
            />
          </View>
        </Modal>
      )}
    </>
  )
}
