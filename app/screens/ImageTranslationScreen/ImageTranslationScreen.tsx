import { FC, useState } from "react"
import {
  View,
  ViewStyle,
  TextStyle,
  TouchableOpacity,
  FlatList,
  Modal,
  useWindowDimensions,
} from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import {
  IconChevronLeft,
  IconChevronDown,
  IconCamera,
  IconPhoto,
} from "@tabler/icons-react-native"
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  runOnJS,
} from "react-native-reanimated"

import { Text } from "@/components/Text"
import { translate } from "@/i18n/translate"
import type { AppStackScreenProps } from "@/navigators/navigationTypes"
import { typography } from "@/theme/typography"

interface ImageTranslationScreenProps extends AppStackScreenProps<"ImageTranslation"> {}

type LanguageKey =
  | "korean"
  | "english"
  | "chineseSimplified"
  | "chineseTraditional"
  | "russian"
  | "vietnamese"
  | "indonesian"
  | "khmer"
  | "thai"
  | "urdu"
  | "nepali"
  | "lao"
  | "japanese"
  | "french"
  | "spanish"

interface Language {
  key: LanguageKey
  flag: string
}

const LANGUAGES: Language[] = [
  { key: "korean", flag: "🇰🇷" },
  { key: "english", flag: "🇺🇸" },
  { key: "chineseSimplified", flag: "🇨🇳" },
  { key: "chineseTraditional", flag: "🇹🇼" },
  { key: "russian", flag: "🇷🇺" },
  { key: "vietnamese", flag: "🇻🇳" },
  { key: "indonesian", flag: "🇮🇩" },
  { key: "khmer", flag: "🇰🇭" },
  { key: "thai", flag: "🇹🇭" },
  { key: "urdu", flag: "🇵🇰" },
  { key: "nepali", flag: "🇳🇵" },
  { key: "lao", flag: "🇱🇦" },
  { key: "japanese", flag: "🇯🇵" },
  { key: "french", flag: "🇫🇷" },
  { key: "spanish", flag: "🇪🇸" },
]

const NAVY = "#0B3069"
const BLUE = "#1062D8"

export const ImageTranslationScreen: FC<ImageTranslationScreenProps> = ({ navigation }) => {
  const insets = useSafeAreaInsets()
  const { height: screenHeight } = useWindowDimensions()

  const [targetLanguage, setTargetLanguage] = useState<LanguageKey>("korean")
  const [langMenuVisible, setLangMenuVisible] = useState(false)

  const overlayOpacity = useSharedValue(0)
  const sheetTranslateY = useSharedValue(600)

  const overlayAnimStyle = useAnimatedStyle(() => ({ opacity: overlayOpacity.value }))
  const sheetAnimStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: sheetTranslateY.value }],
  }))

  const openLangMenu = () => {
    setLangMenuVisible(true)
    overlayOpacity.value = withTiming(1, { duration: 250 })
    sheetTranslateY.value = withTiming(0, { duration: 320 })
  }

  const closeLangMenu = () => {
    overlayOpacity.value = withTiming(0, { duration: 220 })
    sheetTranslateY.value = withTiming(600, { duration: 300 }, (finished) => {
      if (finished) runOnJS(setLangMenuVisible)(false)
    })
  }

  const selectLanguage = (key: LanguageKey) => {
    setTargetLanguage(key)
    closeLangMenu()
  }

  const getLangLabel = (key: LanguageKey) =>
    translate(`imageTranslationScreen:languages.${key}` as any)

  const getLangFlag = (key: LanguageKey): string =>
    LANGUAGES.find((l) => l.key === key)?.flag ?? ""

  return (
    <View style={[$root, { paddingTop: insets.top }]}>
      {/* Header */}
      <View style={$header}>
        <TouchableOpacity style={$headerBack} onPress={() => navigation.goBack()} activeOpacity={0.7}>
          <IconChevronLeft size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text text={translate("imageTranslationScreen:title")} style={$headerTitle} />
        <View style={$headerRight} />
      </View>

      {/* White rounded-top container */}
      <View style={$whiteContainer}>
        {/* Main content: image input box + texts, vertically centered */}
        <View style={$innerContent}>
          <TouchableOpacity style={$imageInputBox} activeOpacity={0.7}>
            <IconPhoto size={48} color="#9CA3AF" strokeWidth={1.5} />
          </TouchableOpacity>
          <Text text={translate("imageTranslationScreen:selectImage")} style={$selectImageTitle} />
          <Text
            text={translate("imageTranslationScreen:selectImageDesc")}
            style={$selectImageDesc}
          />
        </View>

        {/* Bottom: language selector + camera button */}
        <View style={[$bottomArea, { paddingBottom: insets.bottom + 16 }]}>
          <View style={$langRow}>
            <Text text={translate("imageTranslationScreen:languageLabel")} style={$langLabel} />
            <TouchableOpacity style={$langBtn} onPress={openLangMenu} activeOpacity={0.7}>
              <Text text={getLangFlag(targetLanguage)} style={$langFlag} />
              <Text text={getLangLabel(targetLanguage)} style={$langBtnText} numberOfLines={1} />
              <IconChevronDown size={14} color={BLUE} strokeWidth={2.5} />
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={$cameraBtn} activeOpacity={0.8}>
            <IconCamera size={22} color="#FFFFFF" strokeWidth={1.8} />
            <Text text={translate("imageTranslationScreen:cameraButton")} style={$cameraBtnText} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Language selection modal */}
      <Modal
        visible={langMenuVisible}
        transparent
        animationType="none"
        onRequestClose={closeLangMenu}
      >
        <View style={$modalContainer}>
          <Animated.View style={[$modalOverlay, overlayAnimStyle]}>
            <TouchableOpacity
              style={$modalOverlayTouch}
              activeOpacity={1}
              onPress={closeLangMenu}
            />
          </Animated.View>

          <Animated.View
            style={[
              $modalSheet,
              sheetAnimStyle,
              { height: screenHeight * 0.65, paddingBottom: insets.bottom + 16 },
            ]}
          >
            <View style={$modalHandle} />
            <Text
              text={translate("imageTranslationScreen:languageMenu.title")}
              style={$modalTitle}
            />
            <FlatList
              data={LANGUAGES}
              keyExtractor={(item) => item.key}
              ItemSeparatorComponent={() => <View style={$langSeparator} />}
              renderItem={({ item }) => {
                const isSelected = targetLanguage === item.key
                const nativeName = translate(
                  `imageTranslationScreen:languages.${item.key}` as any,
                )
                const subtitle = translate(
                  `imageTranslationScreen:languageSubtitles.${item.key}` as any,
                )
                return (
                  <TouchableOpacity
                    style={[$langItem, isSelected && $langItemSelected]}
                    onPress={() => selectLanguage(item.key)}
                    activeOpacity={0.7}
                  >
                    <Text text={item.flag} style={$langItemFlag} />
                    <View style={$langItemContent}>
                      <Text
                        text={nativeName}
                        style={[$langItemText, isSelected && $langItemTextSelected]}
                      />
                      {!!subtitle && <Text text={subtitle} style={$langItemSubtitle} />}
                    </View>
                    {isSelected && <Text text="✓" style={$langItemCheck} />}
                  </TouchableOpacity>
                )
              }}
            />
          </Animated.View>
        </View>
      </Modal>
    </View>
  )
}

// ── Styles ──

const $root: ViewStyle = {
  flex: 1,
  backgroundColor: NAVY,
}

const $header: ViewStyle = {
  backgroundColor: NAVY,
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  paddingHorizontal: 20,
  paddingVertical: 22,
}

const $headerBack: ViewStyle = {
  width: 44,
  height: 36,
  justifyContent: "center",
  alignItems: "flex-start",
}

const $headerTitle: TextStyle = {
  flex: 1,
  fontSize: 21,
  fontFamily: typography.primary.semiBold,
  color: "#FFFFFF",
  textAlign: "center",
}

const $headerRight: ViewStyle = {
  width: 44,
}

const $whiteContainer: ViewStyle = {
  flex: 1,
  borderTopLeftRadius: 20,
  borderTopRightRadius: 20,
  overflow: "hidden",
  backgroundColor: "#FFFFFF",
}

const $innerContent: ViewStyle = {
  flex: 1,
  alignItems: "center",
  justifyContent: "center",
  paddingHorizontal: 24,
  gap: 16,
}

const $imageInputBox: ViewStyle = {
  width: "100%",
  height: 180,
  backgroundColor: "#F2F5F6",
  borderRadius: 10,
  borderWidth: 1.5,
  borderStyle: "dashed",
  borderColor: "#D1D5D9",
  alignItems: "center",
  justifyContent: "center",
}

const $selectImageTitle: TextStyle = {
  fontSize: 16,
  fontFamily: typography.primary.bold,
  color: "#1A2236",
  textAlign: "center",
}

const $selectImageDesc: TextStyle = {
  fontSize: 13,
  fontFamily: typography.primary.normal,
  color: "#9CA3AF",
  textAlign: "center",
  lineHeight: 20,
}

const $bottomArea: ViewStyle = {
  backgroundColor: "#FFFFFF",
  borderTopWidth: 1,
  borderTopColor: "#E8EBF2",
  paddingHorizontal: 20,
  paddingTop: 16,
  gap: 16,
}

const $langRow: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
}

const $langLabel: TextStyle = {
  fontSize: 13,
  fontFamily: typography.primary.normal,
  color: "#6B7280",
}

const $langBtn: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
  gap: 6,
}

const $langFlag: TextStyle = {
  fontSize: 16,
}

const $langBtnText: TextStyle = {
  fontSize: 13,
  fontFamily: typography.primary.semiBold,
  color: BLUE,
}

const $cameraBtn: ViewStyle = {
  backgroundColor: NAVY,
  borderRadius: 12,
  paddingVertical: 16,
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
  gap: 8,
}

const $cameraBtnText: TextStyle = {
  fontSize: 16,
  fontFamily: typography.primary.semiBold,
  color: "#FFFFFF",
}

// Modal styles
const $modalContainer: ViewStyle = {
  flex: 1,
  justifyContent: "flex-end",
}

const $modalOverlay: ViewStyle = {
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(0,0,0,0.4)",
}

const $modalOverlayTouch: ViewStyle = {
  flex: 1,
}

const $modalSheet: ViewStyle = {
  backgroundColor: "#FFFFFF",
  borderTopLeftRadius: 20,
  borderTopRightRadius: 20,
  paddingTop: 12,
}

const $modalHandle: ViewStyle = {
  width: 36,
  height: 4,
  borderRadius: 2,
  backgroundColor: "#D0D5DD",
  alignSelf: "center",
  marginBottom: 16,
}

const $modalTitle: TextStyle = {
  fontSize: 15,
  fontFamily: typography.primary.bold,
  color: "#1A2236",
  paddingHorizontal: 20,
  marginBottom: 8,
}

const $langSeparator: ViewStyle = {
  height: 1,
  backgroundColor: "#F0F0F0",
  marginHorizontal: 20,
}

const $langItem: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
  paddingHorizontal: 20,
  paddingVertical: 14,
  gap: 12,
}

const $langItemSelected: ViewStyle = {
  backgroundColor: "#F0F5FF",
}

const $langItemContent: ViewStyle = {
  flex: 1,
  gap: 2,
}

const $langItemFlag: TextStyle = {
  fontSize: 22,
}

const $langItemText: TextStyle = {
  fontSize: 15,
  fontFamily: typography.primary.normal,
  color: "#1A2236",
}

const $langItemTextSelected: TextStyle = {
  fontFamily: typography.primary.semiBold,
  color: BLUE,
}

const $langItemSubtitle: TextStyle = {
  fontSize: 12,
  fontFamily: typography.primary.normal,
  color: "#9CA3AF",
}

const $langItemCheck: TextStyle = {
  fontSize: 16,
  color: BLUE,
  fontFamily: typography.primary.bold,
}
