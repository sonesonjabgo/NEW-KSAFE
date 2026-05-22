import { FC, useEffect, useState } from "react"
import { ActivityIndicator, FlatList, View } from "react-native"
import { CommonActions, useNavigation } from "@react-navigation/native"
import { IconAlertCircle } from "@tabler/icons-react-native"

import i18n from "i18next"

import { StackScreen } from "@/components/StackScreen"
import { Text } from "@/components/Text"
import { Toast } from "@/components/Toast"
import { useAuth } from "@/context/AuthContext"
import type { TxKeyPath } from "@/i18n"
import { translate } from "@/i18n/translate"
import { api } from "@/services/api"
import { colors } from "@/theme/colors"
import { useResponsive } from "@/theme/responsive"

import { LanguageChangedModal } from "./components/LanguageChangedModal"
import { LanguageOptionItem } from "./components/LanguageOptionItem"
import * as S from "./styles"

/* ── 타입 ── */

type Language = {
  serverId: number // PATCH 바디에 사용
  code: string // BCP-47 코드 — i18n 키 및 선택 상태 기준
  flag: string
  nativeName: string
}

/* ── 국기 이모지 맵 (code 기준) ── */

const FLAG_BY_CODE: Record<string, string> = {
  "ko": "🇰🇷",
  "en": "🇺🇸",
  "zh-Hans": "🇨🇳",
  "zh-Hant": "🇹🇼",
  "zh": "🇨🇳",
  "ru": "🇷🇺",
  "vi": "🇻🇳",
  "id": "🇮🇩",
  "km": "🇰🇭",
  "th": "🇹🇭",
  "ur": "🇵🇰",
  "ne": "🇳🇵",
  "lo": "🇱🇦",
  "my": "🇲🇲",
  "ar": "🇸🇦",
  "es": "🇪🇸",
  "fr": "🇫🇷",
  "hi": "🇮🇳",
  "ja": "🇯🇵",
}

/* ── API 실패 시 fallback 언어 목록 ── */

const FALLBACK_LANGUAGES: Language[] = [
  { serverId: 0, code: "ko", flag: "🇰🇷", nativeName: "한국어" },
  { serverId: 0, code: "en", flag: "🇺🇸", nativeName: "English" },
  { serverId: 0, code: "zh-Hans", flag: "🇨🇳", nativeName: "简体中文" },
  { serverId: 0, code: "zh-Hant", flag: "🇹🇼", nativeName: "繁體中文" },
  { serverId: 0, code: "ru", flag: "🇷🇺", nativeName: "Русский" },
  { serverId: 0, code: "vi", flag: "🇻🇳", nativeName: "Tiếng Việt" },
  { serverId: 0, code: "id", flag: "🇮🇩", nativeName: "Bahasa Indonesia" },
  { serverId: 0, code: "km", flag: "🇰🇭", nativeName: "ភាសាខ្មែរ" },
  { serverId: 0, code: "th", flag: "🇹🇭", nativeName: "ไทย" },
  { serverId: 0, code: "ur", flag: "🇵🇰", nativeName: "اردو" },
  { serverId: 0, code: "ne", flag: "🇳🇵", nativeName: "नेपाली" },
  { serverId: 0, code: "lo", flag: "🇱🇦", nativeName: "ພາສາລາວ" },
]

/* ── 확인 버튼 텍스트 맵 ── */

const CONFIRM_TEXT: Record<string, string> = {
  "ko": "확인",
  "en": "OK",
  "zh-Hans": "确认",
  "zh-Hant": "確認",
  "zh": "确认",
  "ar": "تأكيد",
  "es": "Confirmar",
  "fr": "Confirmer",
  "hi": "पुष्टि करें",
  "ja": "確認",
  "id": "Konfirmasi",
  "vi": "Xác nhận",
  "th": "ยืนยัน",
  "ru": "Подтвердить",
  "km": "យល់ព្រម",
  "lo": "ຢືນຢັນ",
  "ne": "ठीक छ",
  "ur": "ٹھیک ہے",
  "my": "အတည်ပြုရန်",
}

export const LanguageSettingsScreen: FC = () => {
  const navigation = useNavigation()
  const { authToken } = useAuth()

  /* ── 상태 ── */
  const [languages, setLanguages] = useState<Language[]>(FALLBACK_LANGUAGES)
  const [isLoading, setIsLoading] = useState(true)
  const [selectedId, setSelectedId] = useState("ko") // 선택된 언어 code
  const [prevSelectedId, setPrevSelectedId] = useState("ko") // PATCH 실패 시 복원용
  const [previewLang, setPreviewLang] = useState("ko") // 모달 미리보기 언어
  const [modalVisible, setModalVisible] = useState(false)
  const [currentLanguage, setCurrentLanguage] = useState(i18n.language ?? "ko")
  const [errorToast, setErrorToast] = useState(false)

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

  /* ── 언어 목록 + 프로필 초기 로드 ── */

  const loadLanguagesAndProfile = async () => {
    if (!authToken) {
      setIsLoading(false)
      return
    }
    setIsLoading(true)
    try {
      const [langsResult, profileResult] = await Promise.all([
        api.getLanguages(authToken),
        api.getUserProfile(authToken),
      ])

      if (langsResult.kind === "ok" && langsResult.items.length > 0) {
        const sorted = [...langsResult.items].sort((a, b) => a.sortOrder - b.sortOrder)
        setLanguages(
          sorted.map((item) => ({
            serverId: item.id,
            code: item.code,
            flag: FLAG_BY_CODE[item.code] ?? "🌐",
            nativeName: item.nativeName,
          })),
        )
      }

      if (profileResult.kind === "ok") {
        const code = profileResult.profile.preferredLanguageCode
        if (code) {
          setSelectedId(code)
          setPreviewLang(code)
          i18n.changeLanguage(code)
          setCurrentLanguage(code)
        }
      }
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    loadLanguagesAndProfile()
  }, [authToken]) // eslint-disable-line react-hooks/exhaustive-deps

  /* ── i18n 헬퍼 ── */

  const t = (key: TxKeyPath) => translate(key, { lng: previewLang })

  /* ── 언어 선택 → 모달 표시 + 즉시 PATCH → navigation reset ── */

  const handleSelect = async (code: string) => {
    if (code === selectedId) return
    const prev = selectedId
    setPrevSelectedId(prev)
    setSelectedId(code)
    setPreviewLang(code)
    setModalVisible(true)

    const lang = languages.find((l) => l.code === code)

    // PATCH (fallback serverId===0 이면 스킵)
    if (lang && lang.serverId !== 0 && authToken) {
      const result = await api.patchPreferredLanguage(authToken, lang.serverId)
      if (result.kind !== "ok") {
        setModalVisible(false)
        setSelectedId(prev)
        setPreviewLang(prev)
        setErrorToast(true)
        return
      }
    }

    // i18n 변경 후 새 언어 기준으로 모달 문구 생성
    const nativeName = lang?.nativeName ?? code
    i18n.changeLanguage(code)

    const newTitle = translate("languageSettings:languageTitle")
    const newDesc = translate("languageSettings:languageChangeRestart", { language: nativeName })
    const newConfirm = CONFIRM_TEXT[code] ?? "OK"

    // HomeScreen으로 reset — 모달 데이터 params로 전달
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [
          {
            name: "Main",
            params: {
              screen: "Home",
              params: {
                pendingLanguageModal: {
                  title: newTitle,
                  description: newDesc,
                  confirmText: newConfirm,
                },
              },
            },
          },
        ],
      }),
    )
  }

  /* ── 모달 계산값 (선택 직후 미리보기용) ── */

  const selectedLanguage = languages.find((l) => l.code === selectedId)
  const modalLangName = selectedLanguage?.nativeName ?? selectedId
  const modalTitle = t("languageSettings:languageTitle")
  const modalDesc = translate("languageSettings:languageChangeRestart", {
    lng: previewLang,
    language: modalLangName,
  })
  const modalConfirm = CONFIRM_TEXT[previewLang] ?? translate("common:ok", { lng: previewLang })
  const displayLang = currentLanguage.startsWith("ko") ? "ko" : "en"

  /* ── 반응형 값 ── */

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

  const guideFontSize = breakpoint === "smallPhone" ? 13 : breakpoint === "tablet" ? 15 : 14
  const guidePaddingTop = isSmallPhone || isShortHeight ? 14 : 20
  const guidePaddingBottom = isSmallPhone || isShortHeight ? 12 : 16

  const itemHeight = isSmallPhone ? 52 : isLargePhone || isTablet ? 64 : 59
  const itemPaddingH = isSmallPhone ? 12 : 16
  const itemMarginBottom = isSmallPhone ? 8 : 10
  const itemLabelFontSize = isSmallPhone ? 14 : isLargePhone || isTablet ? 16 : 15
  const checkIconSize = isSmallPhone ? 18 : 20

  return (
    <>
      <StackScreen title={t("languageSettings:languageTitle")} onBack={() => navigation.goBack()}>
        <View style={S.$body}>
          {isLoading ? (
            <View style={S.$loadingContainer}>
              <ActivityIndicator size="large" color={colors.blue} />
            </View>
          ) : (
            <FlatList
              data={languages}
              keyExtractor={(item) => item.code}
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
                  `languageSettings:languageNames.${item.code}` as TxKeyPath,
                  { lng: displayLang },
                )
                const label = `${item.flag} ${item.nativeName} (${translatedName})`
                return (
                  <LanguageOptionItem
                    label={label}
                    isSelected={selectedId === item.code}
                    onPress={() => handleSelect(item.code)}
                    itemHeight={itemHeight}
                    itemPaddingH={itemPaddingH}
                    itemMarginBottom={itemMarginBottom}
                    labelFontSize={itemLabelFontSize}
                    checkIconSize={checkIconSize}
                  />
                )
              }}
            />
          )}
        </View>
      </StackScreen>

      <LanguageChangedModal
        isVisible={modalVisible}
        title={modalTitle}
        description={modalDesc}
        confirmText={modalConfirm}
        onConfirm={() => setModalVisible(false)}
      />

      <Toast
        visible={errorToast}
        message={translate("languageSettings:languageChangeError", { lng: currentLanguage })}
        icon={<IconAlertCircle size={14} color="#FFFFFF" />}
        iconCircleColor={colors.danger}
        onHide={() => setErrorToast(false)}
      />
    </>
  )
}
