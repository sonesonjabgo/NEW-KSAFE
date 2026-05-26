import { FC, useEffect, useState } from "react"
import { ActivityIndicator, FlatList, View } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { reloadAppAsync } from "expo"
import { IconAlertCircle } from "@tabler/icons-react-native"

import i18n from "i18next"

import { StackScreen } from "@/components/StackScreen"
import { Text } from "@/components/Text"
import { Toast } from "@/components/Toast"
import { useAuth } from "@/context/AuthContext"
import type { TxKeyPath } from "@/i18n"
import { persistChangeLanguage, toI18nKey } from "@/i18n"
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
  // i18n.language가 이미 MMKV 저장값 또는 "ko"로 초기화되어 있으므로 그대로 사용
  const initialLang = i18n.language ?? "ko"
  const [selectedId, setSelectedId] = useState(initialLang)
  const [prevSelectedId, setPrevSelectedId] = useState(initialLang)
  const [previewLang, setPreviewLang] = useState(initialLang)
  const [modalVisible, setModalVisible] = useState(false)
  const [currentLanguage, setCurrentLanguage] = useState(initialLang)
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
      // TODO: 현재 GET /api/v1/common/languages 및 GET /api/v1/common/users/profile 이
      // Authorization 헤더 미적용으로 401 Unauthorized를 반환 중.
      // 팀원의 공통 인증 인터셉터 연결 후 정상 동작 예정.
      // 401로 인해 langsResult.kind !== "ok" → FALLBACK_LANGUAGES 사용 (serverId: 0) →
      // handleSelect에서 PATCH가 스킵되는 현상은 이 401의 후속 증상임.
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
          // AuthContext가 이미 i18n + MMKV를 서버 값으로 초기화함
          // 여기서는 UI 선택 상태만 업데이트
          setSelectedId(code)
          setPreviewLang(code)
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

  const t = (key: TxKeyPath) => translate(key, { lng: toI18nKey(previewLang) })

  /* ── 언어 선택 → 모달 표시 + 즉시 PATCH → navigation reset ── */

  const handleSelect = async (code: string) => {
    if (code === selectedId) return
    const prev = selectedId
    setPrevSelectedId(prev)
    setSelectedId(code)
    setPreviewLang(code)

    const lang = languages.find((l) => l.code === code)

    // PATCH (fallback serverId===0 이면 스킵)
    if (lang && lang.serverId !== 0 && authToken) {
      // [LOG 1] PATCH 요청 body 확인
      console.log("[LangDebug] PATCH /preferred-language →", { languageId: lang.serverId, code })

      const result = await api.patchPreferredLanguage(authToken, lang.serverId)

      // [LOG 2] PATCH 응답 성공 여부
      console.log("[LangDebug] PATCH result →", result.kind)

      if (result.kind !== "ok") {
        setSelectedId(prev)
        setPreviewLang(prev)
        setErrorToast(true)
        return
      }

      // [LOG 3] PATCH 직후 GET /profile 로 서버 저장값 확인
      const verifyResult = await api.getUserProfile(authToken)
      if (verifyResult.kind === "ok") {
        console.log(
          "[LangDebug] GET /profile after PATCH → preferredLanguageCode:",
          verifyResult.profile.preferredLanguageCode,
        )
      } else {
        console.log("[LangDebug] GET /profile after PATCH failed →", verifyResult.kind)
      }
    } else {
      console.log("[LangDebug] PATCH skipped — serverId:", lang?.serverId, "code:", code)
    }

    // MMKV 저장 + i18n 변경 완료 후 모달 표시 (기존 프로젝트 순서 동일)
    // → 모달 확인 시 reloadAppAsync로 앱 재시작, 재시작 후 initI18n()이 MMKV 값을 읽어 언어 복원
    await persistChangeLanguage(code)
    setCurrentLanguage(code)

    // [LOG 5] 최종 i18n.language 확인
    console.log("[LangDebug] i18n.language after persistChangeLanguage →", i18n.language)

    setModalVisible(true)
  }

  /* ── 모달 계산값 (선택 직후 미리보기용) ── */

  const selectedLanguage = languages.find((l) => l.code === selectedId)
  const modalLangName = selectedLanguage?.nativeName ?? selectedId
  const modalTitle = t("languageSettings:languageTitle")
  const modalDesc = translate("languageSettings:languageChangeRestart", {
    lng: toI18nKey(previewLang),
    language: modalLangName,
  })
  const modalConfirm =
    CONFIRM_TEXT[previewLang] ?? translate("common:ok", { lng: toI18nKey(previewLang) })
  // previewLang: 선택 즉시(동기) 업데이트 → 헤더·아이템 모두 동일 시점에 반영
  // currentLanguage는 persistChangeLanguage 완료 후 업데이트(async)이므로 사용하지 않음
  const displayLang = toI18nKey(previewLang)

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
              extraData={displayLang}
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
        onConfirm={async () => {
          await reloadAppAsync("language-change")
        }}
      />

      <Toast
        visible={errorToast}
        message={translate("languageSettings:languageChangeError", {
          lng: toI18nKey(previewLang),
        })}
        icon={<IconAlertCircle size={14} color="#FFFFFF" />}
        iconCircleColor={colors.danger}
        onHide={() => setErrorToast(false)}
      />
    </>
  )
}
