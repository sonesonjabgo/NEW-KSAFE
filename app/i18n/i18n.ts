import { I18nManager } from "react-native"
import * as Localization from "expo-localization"
import i18n from "i18next"
import { initReactI18next } from "react-i18next"
import "intl-pluralrules"

// if English isn't your default language, move Translations to the appropriate language file.
import ar from "./ar"
import en, { Translations } from "./en"
import es from "./es"
import fr from "./fr"
import hi from "./hi"
import id from "./id"
import ja from "./ja"
import km from "./km"
import ko from "./ko"
import lo from "./lo"
import my from "./my"
import ne from "./ne"
import ru from "./ru"
import th from "./th"
import ur from "./ur"
import vi from "./vi"
import zh from "./zh"
import zhHans from "./zhHans"
import zhHant from "./zhHant"
import { loadString, saveString } from "../utils/storage"

export const LANGUAGE_STORAGE_KEY = "i18n.lng"

const resources = {
  ar,
  en,
  ko,
  es,
  fr,
  hi,
  id,
  ja,
  km,
  lo,
  my,
  ne,
  ru,
  th,
  ur,
  vi,
  zh,
  zhHans,
  zhHant,
}
const supportedTags = Object.keys(resources)

const systemTagMatchesSupportedTags = (deviceTag: string) => {
  const primaryTag = deviceTag.split("-")[0]
  return supportedTags.includes(primaryTag)
}

const pickSupportedLocale: () => Localization.Locale | undefined = () => {
  return Localization.getLocales().find((locale) =>
    systemTagMatchesSupportedTags(locale.languageTag),
  )
}

// ── 코드 변환 헬퍼 ────────────────────────────────────────────────────────────

/**
 * BCP-47 코드 → i18n 리소스 키 변환.
 * resources 객체의 키가 camelCase(zhHans, zhHant)이므로 하이픈 코드를 변환해야 함.
 */
export const toI18nKey = (bcp47Code: string): string => {
  const map: Record<string, string> = { "zh-Hans": "zhHans", "zh-Hant": "zhHant" }
  return map[bcp47Code] ?? bcp47Code
}

/** i18n 리소스 키 → BCP-47 코드 역변환. selectedId/previewLang 초기화 시 사용. */
export const fromI18nKey = (i18nKey: string): string => {
  const map: Record<string, string> = { zhHans: "zh-Hans", zhHant: "zh-Hant" }
  return map[i18nKey] ?? i18nKey
}

// ── RTL ──────────────────────────────────────────────────────────────────────

const RTL_LANGUAGES = ["ur"]

/**
 * 앱 시작 시 RTL 결정.
 * 우선순위: MMKV 저장 언어 > 기기 locale
 * reloadAppAsync 후에도 저장된 언어 기준으로 RTL이 복원되어야 하므로
 * 기기 locale만 보던 기존 로직을 저장된 언어 우선으로 교체.
 */
const savedLangKey = loadString(LANGUAGE_STORAGE_KEY)
const savedBcp47 = savedLangKey ? fromI18nKey(savedLangKey) : null

export let isRTL: boolean

if (savedBcp47) {
  // 사용자가 명시적으로 선택한 언어 기준으로 RTL 결정
  isRTL = RTL_LANGUAGES.includes(savedBcp47)
} else {
  // 저장된 언어 없음 → 기기 locale 폴백
  const locale = pickSupportedLocale()
  isRTL = !!(locale?.languageTag && locale?.textDirection === "rtl")
}

// Need to set RTL ASAP to ensure the app is rendered correctly.
I18nManager.allowRTL(isRTL)
if (I18nManager.isRTL !== isRTL) {
  I18nManager.forceRTL(isRTL)
}

// ── 초기화 ───────────────────────────────────────────────────────────────────

export const initI18n = async () => {
  i18n.use(initReactI18next)

  // MMKV에 저장된 언어를 우선 사용하고, 없으면 ko 기본값 사용 (인증 연동 전 임시)
  // TODO: 인증 연동 후 서버 profile preferredLanguageCode를 source of truth로 복원
  await i18n.init({
    resources,
    lng: savedLangKey ?? "ko",
    fallbackLng: "ko",
    interpolation: {
      escapeValue: false,
    },
  })

  return i18n
}

// ── 언어 변경 ─────────────────────────────────────────────────────────────────

const applyRTL = (bcp47Code: string) => {
  const nextIsRTL = RTL_LANGUAGES.includes(bcp47Code)
  I18nManager.allowRTL(nextIsRTL)
  if (I18nManager.isRTL !== nextIsRTL) {
    I18nManager.forceRTL(nextIsRTL)
  }
}

/** 언어 변경 + MMKV 영구 저장. bcp47Code는 "ko", "zh-Hans" 등 BCP-47 코드를 받아 자동 변환. */
export const persistChangeLanguage = async (bcp47Code: string): Promise<void> => {
  const i18nCode = toI18nKey(bcp47Code)
  await i18n.changeLanguage(i18nCode)
  saveString(LANGUAGE_STORAGE_KEY, i18nCode)
  applyRTL(bcp47Code)
}

// ── 타입 ─────────────────────────────────────────────────────────────────────

/**
 * Builds up valid keypaths for translations.
 */
export type TxKeyPath = RecursiveKeyOf<Translations>

// via: https://stackoverflow.com/a/65333050
type RecursiveKeyOf<TObj extends object> = {
  [TKey in keyof TObj & (string | number)]: RecursiveKeyOfHandleValue<TObj[TKey], `${TKey}`, true>
}[keyof TObj & (string | number)]

type RecursiveKeyOfInner<TObj extends object> = {
  [TKey in keyof TObj & (string | number)]: RecursiveKeyOfHandleValue<TObj[TKey], `${TKey}`, false>
}[keyof TObj & (string | number)]

type RecursiveKeyOfHandleValue<
  TValue,
  Text extends string,
  IsFirstLevel extends boolean,
> = TValue extends any[]
  ? Text
  : TValue extends object
    ? IsFirstLevel extends true
      ? Text | `${Text}:${RecursiveKeyOfInner<TValue>}`
      : Text | `${Text}.${RecursiveKeyOfInner<TValue>}`
    : Text
