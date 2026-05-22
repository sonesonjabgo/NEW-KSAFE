import { FC, useState } from "react"
import { FlatList, View } from "react-native"
import { useNavigation } from "@react-navigation/native"

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
  nativeLabel: string
}

const LANGUAGES: Language[] = [
  { id: "ko", flag: "🇰🇷", locale: "ko", nativeLabel: "한국어" },
  { id: "en", flag: "🇺🇸", locale: "en", nativeLabel: "English (영어)" },
  { id: "zhHans", flag: "🇨🇳", locale: "zh-Hans", nativeLabel: "简体中文 (중국어(간체))" },
  { id: "zhHant", flag: "🇹🇼", locale: "zh-Hant", nativeLabel: "繁體中文 (중국어(번체))" },
  { id: "ru", flag: "🇷🇺", locale: "ru", nativeLabel: "Русский (러시아어)" },
  { id: "vi", flag: "🇻🇳", locale: "vi", nativeLabel: "Tiếng Việt (베트남어)" },
  { id: "id", flag: "🇮🇩", locale: "id", nativeLabel: "Bahasa Indonesia (인도네시아어)" },
  { id: "km", flag: "🇰🇭", locale: "km", nativeLabel: "ភាសាខ្មែរ (크메르어)" },
  { id: "th", flag: "🇹🇭", locale: "th", nativeLabel: "ไทย (태국어)" },
  { id: "ur", flag: "🇵🇰", locale: "ur", nativeLabel: "اردو (우르드어)" },
  { id: "ne", flag: "🇳🇵", locale: "ne", nativeLabel: "नेपाली (네팔어)" },
  { id: "lo", flag: "🇱🇦", locale: "lo", nativeLabel: "ພາສາລາວ (라오어)" },
]

export const LanguageSettingsScreen: FC = () => {
  const navigation = useNavigation()
  const [selectedId, setSelectedId] = useState("ko")
  const [previewLang, setPreviewLang] = useState("ko")
  const [modalVisible, setModalVisible] = useState(false)

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
  const modalLangName = selectedLanguage?.nativeLabel ?? selectedId
  const modalTitle = t("languageSettings:title")
  const modalDesc = translate("languageSettings:changedDescription", {
    lng: previewLang,
    language: modalLangName,
  })
  const modalConfirm = t("languageSettings:confirm")

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
      <StackScreen title={t("languageSettings:title")} onBack={() => navigation.goBack()}>
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
                {t("languageSettings:description")}
              </Text>
            }
            renderItem={({ item }) => (
              <LanguageOptionItem
                label={`${item.flag} ${item.nativeLabel}`}
                isSelected={selectedId === item.id}
                onPress={() => handleSelect(item.id, item.locale)}
                itemHeight={itemHeight}
                itemPaddingH={itemPaddingH}
                itemMarginBottom={itemMarginBottom}
                labelFontSize={itemLabelFontSize}
                checkIconSize={checkIconSize}
              />
            )}
          />
        </View>
      </StackScreen>

      <LanguageChangedModal
        isVisible={modalVisible}
        title={modalTitle}
        description={modalDesc}
        confirmText={modalConfirm}
        onConfirm={() => setModalVisible(false)}
      />
    </>
  )
}
