import { useEffect } from "react"
import { FlatList, Modal, TouchableOpacity, View, ViewStyle, TextStyle, useWindowDimensions } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import Animated, { useSharedValue, useAnimatedStyle, withTiming, runOnJS } from "react-native-reanimated"

import { Text } from "@/components/Text"
import { LANGUAGES, LanguageKey } from "@/constants/languages"
import { colors } from "@/theme/colors"
import { typography } from "@/theme/typography"

interface LanguagePickerModalProps {
  isVisible: boolean
  currentKey: LanguageKey
  title: string
  /** 언어 키 → 표시 이름 변환 함수 */
  getLabel: (key: LanguageKey) => string
  /** 언어 키 → 서브타이틀 변환 함수. 빈 문자열이면 숨김 */
  getSubtitle?: (key: LanguageKey) => string
  onSelect: (key: LanguageKey) => void
  /** 모달 닫기 완료 콜백. 애니메이션이 끝난 뒤 호출됨 */
  onClose: () => void
}

/**
 * 번역 화면에서 공통으로 사용하는 언어 선택 바텀시트 모달.
 * 슬라이드 업/다운 애니메이션과 오버레이 페이드를 내부에서 처리한다.
 *
 * 사용 예:
 * ```tsx
 * <LanguagePickerModal
 *   isVisible={langMenuVisible}
 *   currentKey={sourceLanguage}
 *   title={translate("myScreen:languageMenu.title")}
 *   getLabel={(key) => translate(`myScreen:languages.${key}` as any)}
 *   getSubtitle={(key) => translate(`myScreen:languageSubtitles.${key}` as any)}
 *   onSelect={(key) => setSourceLanguage(key)}
 *   onClose={() => setLangMenuVisible(false)}
 * />
 * ```
 */
export function LanguagePickerModal({
  isVisible,
  currentKey,
  title,
  getLabel,
  getSubtitle,
  onSelect,
  onClose,
}: LanguagePickerModalProps) {
  const { height: screenHeight } = useWindowDimensions()
  const { bottom } = useSafeAreaInsets()

  const overlayOpacity = useSharedValue(0)
  const sheetTranslateY = useSharedValue(600)

  const overlayAnimStyle = useAnimatedStyle(() => ({ opacity: overlayOpacity.value }))
  const sheetAnimStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: sheetTranslateY.value }],
  }))

  useEffect(() => {
    if (isVisible) {
      overlayOpacity.value = withTiming(1, { duration: 250 })
      sheetTranslateY.value = withTiming(0, { duration: 320 })
    }
  }, [isVisible])

  const close = () => {
    overlayOpacity.value = withTiming(0, { duration: 220 })
    sheetTranslateY.value = withTiming(600, { duration: 300 }, (finished) => {
      if (finished) runOnJS(onClose)()
    })
  }

  const handleSelect = (key: LanguageKey) => {
    onSelect(key)
    close()
  }

  return (
    <Modal visible={isVisible} transparent animationType="none" onRequestClose={close}>
      <View style={$container}>
        <Animated.View style={[$overlay, overlayAnimStyle]}>
          <TouchableOpacity style={$overlayTouch} activeOpacity={1} onPress={close} />
        </Animated.View>

        <Animated.View
          style={[
            $sheet,
            sheetAnimStyle,
            { height: screenHeight * 0.65, paddingBottom: bottom + 16 },
          ]}
        >
          <View style={$handle} />
          <Text text={title} style={$title} />
          <FlatList
            data={LANGUAGES}
            keyExtractor={(item) => item.key}
            ItemSeparatorComponent={() => <View style={$separator} />}
            renderItem={({ item }) => {
              const isSelected = currentKey === item.key
              const label = getLabel(item.key)
              const subtitle = getSubtitle?.(item.key)
              return (
                <TouchableOpacity
                  style={[$item, isSelected && $itemSelected]}
                  onPress={() => handleSelect(item.key)}
                  activeOpacity={0.7}
                >
                  <Text text={item.flag} style={$itemFlag} />
                  <View style={$itemContent}>
                    <Text text={label} style={[$itemText, isSelected && $itemTextSelected]} />
                    {!!subtitle && <Text text={subtitle} style={$itemSubtitle} />}
                  </View>
                  {isSelected && <Text text="✓" style={$itemCheck} />}
                </TouchableOpacity>
              )
            }}
          />
        </Animated.View>
      </View>
    </Modal>
  )
}

const $container: ViewStyle = {
  flex: 1,
  justifyContent: "flex-end",
}

const $overlay: ViewStyle = {
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(0,0,0,0.4)",
}

const $overlayTouch: ViewStyle = {
  flex: 1,
}

const $sheet: ViewStyle = {
  backgroundColor: "#FFFFFF",
  borderTopLeftRadius: 20,
  borderTopRightRadius: 20,
  paddingTop: 12,
}

const $handle: ViewStyle = {
  width: 36,
  height: 4,
  borderRadius: 2,
  backgroundColor: "#D0D5DD",
  alignSelf: "center",
  marginBottom: 16,
}

const $title: TextStyle = {
  fontSize: 15,
  fontFamily: typography.primary.bold,
  color: "#1A2236",
  paddingHorizontal: 20,
  marginBottom: 8,
}

const $separator: ViewStyle = {
  height: 1,
  backgroundColor: "#F0F0F0",
  marginHorizontal: 20,
}

const $item: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
  paddingHorizontal: 20,
  paddingVertical: 14,
  gap: 12,
}

const $itemSelected: ViewStyle = {
  backgroundColor: "#F0F5FF",
}

const $itemContent: ViewStyle = {
  flex: 1,
  gap: 2,
}

const $itemFlag: TextStyle = {
  fontSize: 22,
}

const $itemText: TextStyle = {
  fontSize: 15,
  fontFamily: typography.primary.normal,
  color: "#1A2236",
  textAlign: "left",
  writingDirection: "ltr",
}

const $itemTextSelected: TextStyle = {
  fontFamily: typography.primary.semiBold,
  color: colors.blue,
}

const $itemSubtitle: TextStyle = {
  fontSize: 12,
  fontFamily: typography.primary.normal,
  color: "#9CA3AF",
}

const $itemCheck: TextStyle = {
  fontSize: 16,
  color: colors.blue,
  fontFamily: typography.primary.bold,
}
