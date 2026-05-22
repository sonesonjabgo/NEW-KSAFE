import { FC, useState } from "react"
import { FlatList, View } from "react-native"
import { useNavigation } from "@react-navigation/native"

import i18n from "i18next"

import { StackScreen } from "@/components/StackScreen"
import { Text } from "@/components/Text"
import type { TxKeyPath } from "@/i18n"
import { translate } from "@/i18n/translate"
import { useResponsive } from "@/theme/responsive"

import { LanguageChangedModal } from "./components/LanguageChangedModal"
import { LanguageOptionItem } from "./components/LanguageOptionItem"
import * as S from "./styles"

type Language = {
  id: string
  flag: string
  locale: string
  nativeName: string // native script only — parenthetical translation is added dynamically
}

const LANGUAGES: Language[] = [
  { id: "ko", flag: "🇰🇷", locale: "ko", nativeName: "한국어" },
  { id: "en", flag: "🇺🇸", locale: "en", nativeName: "English" },
  { id: "zh-Hans", flag: "🇨🇳", locale: "zh-Hans", nativeName: "简体中文" },
  { id: "zh-Hant", flag: "🇹🇼", locale: "zh-Hant", nativeName: "繁體中文" },
  { id: "ru", flag: "🇷🇺", locale: "ru", nativeName: "Русский" },
  { id: "vi", flag: "🇻🇳", locale: "vi", nativeName: "Tiếng Việt" },
  { id: "id", flag: "🇮🇩", locale: "id", nativeName: "Bahasa Indonesia" },
  { id: "km", flag: "🇰🇭", locale: "km", nativeName: "ភាសាខ្មែរ" },
  { id: "th", flag: "🇹🇭", locale: "th", nativeName: "ไทย" },
  { id: "ur", flag: "🇵🇰", locale: "ur", nativeName: "اردو" },
  { id: "ne", flag: "🇳🇵", locale: "ne", nativeName: "नेपाली" },
  { id: "lo", flag: "🇱🇦", locale: "lo", nativeName: "ພາສາລາວ" },
]

const CONFIRM_TEXT: Record<string, string> = {
  ko: "확인",
  en: "OK",
  "zh-Hans": "确认",
  "zh-Hant": "確認",
  zh: "确认",
  ar: "تأكيد",
  es: "Confirmar",
  fr: "Confirmer",
  hi: "पुष्टि करें",
  ja: "確認",
  id: "Konfirmasi",
  vi: "Xác nhận",
  th: "ยืนยัน",
  ru: "Подтвердить",
  km: "យល់ព្រម",
  lo: "ຢືນຢັນ",
  ne: "ठीक छ",
  ur: "ٹھیک ہے",
  my: "အတည်ပြုရန်",
}

export const LanguageSettingsScreen: FC = () => {
  const navigation = useNavigation()
  const [selectedId, setSelectedId] = useState("ko")
  const [previewLang, setPreviewLang] = useState("ko")
  const [modalVisible, setModalVisible] = useState(false)
  const [currentLanguage, setCurrentLanguage] = useState(i18n.language ?? "ko")

  const {
    width,
    height,
    isSmallPhone,
    isBasePhone,
    isLargePhone,
    isTablet,
    isShortHeight,
    breakpoint,
  } = useResponsive()

  const t = (key: TxKeyPath) => translate(key, { lng: previewLang })

  const handleSelect = (id: string, locale: string) => {
    if (id === selectedId) return
    setSelectedId(id)
    setPreviewLang(locale)
    setModalVisible(true)
  }

  const selectedLanguage = LANGUAGES.find((l) => l.id === selectedId)
  const modalLangName = selectedLanguage?.nativeName ?? selectedId
  const modalTitle = t("languageSettings:languageTitle")
  const modalDesc = translate("languageSettings:languageChangeRestart", {
    lng: previewLang,
    language: modalLangName,
  })
  const modalConfirm =
    CONFIRM_TEXT[previewLang] ?? translate("common:ok", { lng: previewLang })
  const displayLang = currentLanguage.startsWith("ko") ? "ko" : "en"

  const handleConfirm = () => {
    i18n.changeLanguage(previewLang)
    setCurrentLanguage(previewLang)
    setModalVisible(false)
  }

  // 리스트 컨텐츠 패딩 — tablet은 화면 너비 기반으로 중앙 정렬
  const listPaddingH = isSmallPhone
    ? 16
    : isBasePhone
      ? 20
      : isLargePhone
        ? 22
        : Math.max(Math.floor((width - 560) / 2), 32)
  const listPaddingBottom = isShortHeight
    ? Math.min(Math.floor(height * 0.04), 24)
    : isSmallPhone
      ? 24
      : 32

  // 안내 문구
  const guideFontSize = breakpoint === "smallPhone" ? 13 : breakpoint === "tablet" ? 15 : 14
  const guidePaddingTop = isSmallPhone || isShortHeight ? 14 : 20
  const guidePaddingBottom = isSmallPhone || isShortHeight ? 12 : 16

  // 언어 항목
  const itemHeight = isSmallPhone ? 52 : isLargePhone || isTablet ? 64 : 59
  const itemPaddingH = isSmallPhone ? 12 : 16
  const itemMarginBottom = isSmallPhone ? 8 : 10
  const itemLabelFontSize = isSmallPhone ? 14 : isLargePhone || isTablet ? 16 : 15
  const checkIconSize = isSmallPhone ? 18 : 20

  return (
    <>
      <StackScreen title={t("languageSettings:languageTitle")} onBack={() => navigation.goBack()}>
        <View style={S.$body}>
          <FlatList
            data={LANGUAGES}
            keyExtractor={(item) => item.id}
            contentContainerStyle={{
              paddingHorizontal: listPaddingH,
              paddingBottom: listPaddingBottom,
            }}
            showsVerticalScrollIndicator={false}
            ListHeaderComponent={
              <Text
                style={[
                  S.$guideText,
                  {
                    fontSize: guideFontSize,
                    paddingTop: guidePaddingTop,
                    paddingBottom: guidePaddingBottom,
                  },
                ]}
              >
                {t("languageSettings:languageDescription")}
              </Text>
            }
            renderItem={({ item }) => {
              const translatedName = translate(
                `languageSettings:languageNames.${item.id}` as TxKeyPath,
                { lng: displayLang },
              )
              const label = `${item.flag} ${item.nativeName} (${translatedName})`
              return (
                <LanguageOptionItem
                  label={label}
                  isSelected={selectedId === item.id}
                  onPress={() => handleSelect(item.id, item.locale)}
                  itemHeight={itemHeight}
                  itemPaddingH={itemPaddingH}
                  itemMarginBottom={itemMarginBottom}
                  labelFontSize={itemLabelFontSize}
                  checkIconSize={checkIconSize}
                />
              )
            }}
          />
        </View>
      </StackScreen>

      <LanguageChangedModal
        isVisible={modalVisible}
        title={modalTitle}
        description={modalDesc}
        confirmText={modalConfirm}
        onConfirm={handleConfirm}
      />
    </>
  )
}
