import { FC, useCallback, useMemo, useRef, useState } from "react"
import {
  Animated,
  KeyboardAvoidingView,
  Modal,
  PanResponder,
  Platform,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native"
import { IconAlertCircle, IconBuilding, IconChevronDown } from "@tabler/icons-react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"

import HeaderBell from "@assets/icons/nav/header_bell.svg"

import { StackScreen } from "@/components/StackScreen"
import { Text } from "@/components/Text"
import { translate } from "@/i18n/translate"

import * as S from "./styles"
import type { ImprovementProposalCreateScreenProps } from "./types"

const MOCK_WORKPLACES = [
  "서울 영등포구 레미안스 비즈타워",
  "부산 해운대구 센텀시티",
  "경기 화성시 동탄산업단지 A동",
  "인천 연수구 송도동 건설현장",
]

export const ImprovementProposalCreateScreen: FC<ImprovementProposalCreateScreenProps> = ({
  navigation,
}) => {
  const insets = useSafeAreaInsets()
  const [workplace, setWorkplace] = useState("")
  const [content, setContent] = useState("")
  const [workplaceModalVisible, setWorkplaceModalVisible] = useState(false)
  const [contentFocused, setContentFocused] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
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

  const handlePanResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, gs) => gs.dy > 5 && gs.dy > Math.abs(gs.dx),
      onPanResponderMove: (_, gs) => {
        if (gs.dy > 0) slideAnim.setValue(gs.dy)
      },
      onPanResponderRelease: (_, gs) => {
        if (gs.dy > 80 || gs.vy > 0.5) {
          closeWorkplaceModal()
        } else {
          Animated.spring(slideAnim, { toValue: 0, useNativeDriver: true }).start()
        }
      },
    }),
  ).current

  const handleSelectWorkplace = useCallback(
    (wp: string) => {
      setWorkplace(wp)
      closeWorkplaceModal()
    },
    [closeWorkplaceModal],
  )

  const hasContentError = content.length > 2000
  const isValid = useMemo(
    () => !!workplace && content.trim().length > 0 && content.length <= 2000 && !isSubmitting,
    [workplace, content, isSubmitting],
  )

  const handleSubmit = useCallback(() => {
    if (!workplace || !isValid) return
    setIsSubmitting(true)
    setTimeout(() => {
      const now = new Date()
      const pad = (n: number) => n.toString().padStart(2, "0")
      const dateStr = `${now.getFullYear()}.${pad(now.getMonth() + 1)}.${pad(now.getDate())} ${pad(now.getHours())}:${pad(now.getMinutes())}`
      const proposal = {
        id: `temp-${Date.now()}`,
        status: "pending" as const,
        date: dateStr,
        content: content.trim(),
        authorName: "홍길동", // TODO: 추후 로그인 사용자 정보 연동 시 실제 작성자명으로 교체
        workplace, // TODO: 추후 API 연동 시 실제 사업장 정보로 교체
      }
      navigation.navigate("ImprovementProposalDetail", { proposal })
      setIsSubmitting(false)
    }, 900)
  }, [workplace, content, isValid, navigation])

  return (
    <>
      <StackScreen
        title={translate("improvementProposalCreateScreen:title")}
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
            <View style={S.$guideCard}>
              <View style={S.$guideIconWrap}>
                <HeaderBell width={26} height={26} color="#1062D8" />
              </View>
              <View style={S.$guideTextBlock}>
                <Text
                  text={translate("improvementProposalCreateScreen:guide.title")}
                  style={S.$guideTitle}
                />
                <Text
                  text={translate("improvementProposalCreateScreen:guide.description")}
                  style={S.$guideDesc}
                />
              </View>
            </View>

            {/* 사업장 선택 */}
            <View style={S.$section}>
              <Text
                text={translate("improvementProposalCreateScreen:workplace.label")}
                style={S.$sectionLabel}
              />
              <TouchableOpacity style={S.$inputRow} activeOpacity={0.7} onPress={openWorkplaceModal}>
                <Text
                  text={
                    workplace || translate("improvementProposalCreateScreen:workplace.placeholder")
                  }
                  style={[S.$inputText, !workplace && S.$inputPlaceholder]}
                  numberOfLines={1}
                />
                <IconChevronDown size={18} color="#AAAAAA" />
              </TouchableOpacity>
              <Text
                text={translate("improvementProposalCreateScreen:workplace.helper")}
                style={S.$helperText}
              />
            </View>

            {/* 상세 내용 */}
            <View style={S.$sectionLast}>
              <View style={S.$sectionLabelRow}>
                <Text
                  text={translate("improvementProposalCreateScreen:detail.label")}
                  style={S.$sectionLabel}
                />
                <Text
                  text={translate("improvementProposalCreateScreen:detail.required")}
                  style={S.$required}
                />
              </View>
              <View
                style={[
                  S.$textarea,
                  contentFocused && !hasContentError && S.$textareaFocused,
                  hasContentError && S.$textareaError,
                ]}
              >
                <TextInput
                  style={S.$textareaInput}
                  value={content}
                  onChangeText={setContent}
                  placeholder={translate("improvementProposalCreateScreen:detail.placeholder")}
                  placeholderTextColor="#BBBBBB"
                  multiline
                  scrollEnabled={false}
                  underlineColorAndroid="transparent"
                  onFocus={() => setContentFocused(true)}
                  onBlur={() => setContentFocused(false)}
                />
              </View>
              <Text
                text={translate("improvementProposalCreateScreen:detail.helper")}
                style={S.$helperText}
              />
              {hasContentError && (
                <View style={S.$errorRow}>
                  <IconAlertCircle size={14} color="#E03C3C" strokeWidth={2} />
                  <Text
                    text={translate("improvementProposalCreateScreen:detail.errorMaxLength")}
                    style={S.$errorText}
                  />
                </View>
              )}
            </View>
          </ScrollView>

          {/* 하단 제출 버튼 */}
          <View style={[S.$submitBar, { paddingBottom: insets.bottom + 16 }]}>
            <TouchableOpacity
              style={[S.$submitBtn, (!isValid || isSubmitting) && S.$submitBtnDisabled]}
              activeOpacity={0.8}
              onPress={handleSubmit}
              disabled={!isValid || isSubmitting}
            >
              <Text
                text={
                  isSubmitting
                    ? translate("improvementProposalCreateScreen:submitting")
                    : translate("improvementProposalCreateScreen:submit")
                }
                style={[S.$submitBtnText, (!isValid || isSubmitting) && S.$submitBtnTextDisabled]}
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
            {/* 드래그 핸들 */}
            <View style={S.$modalDragHandleArea} {...handlePanResponder.panHandlers}>
              <View style={S.$modalDragHandleBar} />
            </View>

            {/* 모달 제목 */}
            <Text
              text={translate("improvementProposalCreateScreen:workplace.placeholder")}
              style={S.$modalTitle}
            />

            {/* 사업장 목록 */}
            {MOCK_WORKPLACES.map((wp) => (
              <TouchableOpacity
                key={wp}
                style={[S.$modalItem, workplace === wp && S.$modalItemSelected]}
                onPress={() => handleSelectWorkplace(wp)}
                activeOpacity={0.7}
              >
                <IconBuilding
                  size={20}
                  color={workplace === wp ? "#1062D8" : "#AAAAAA"}
                  strokeWidth={1.5}
                />
                <Text
                  text={wp}
                  style={[S.$modalItemText, workplace === wp && S.$modalItemTextSelected]}
                  numberOfLines={1}
                />
              </TouchableOpacity>
            ))}
          </Animated.View>
        </View>
      </Modal>
    </>
  )
}
