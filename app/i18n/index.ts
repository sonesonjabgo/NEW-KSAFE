import { I18nManager } from "react-native"
import * as Localization from "expo-localization"
import i18n from "i18next"
import { initReactI18next } from "react-i18next"
import "intl-pluralrules"

import { loadString, saveString } from "../utils/storage"

export const LANGUAGE_STORAGE_KEY = "i18n.lng"

// if English isn't your default language, move Translations to the appropriate language file.
import ar from "./ar"
import en, { Translations } from "./en"
import es from "./es"
import fr from "./fr"
import hi from "./hi"
import id from "./id"
import ja from "./ja"
import km from "./km"
import lo from "./lo"
import ne from "./ne"
import ru from "./ru"
import th from "./th"
import ur from "./ur"
import vi from "./vi"
import zh from "./zh"
import zhHans from "./zhHans"
import zhHant from "./zhHant"
import ko from "./ko"
import my from "./my"

const fallbackLocale = "en-US"

const systemLocales = Localization.getLocales()

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

// Checks to see if the device locale matches any of the supported locales
// Device locale may be more specific and still match (e.g., en-US matches en)
const systemTagMatchesSupportedTags = (deviceTag: string) => {
  const primaryTag = deviceTag.split("-")[0]
  return supportedTags.includes(primaryTag)
}

const pickSupportedLocale: () => Localization.Locale | undefined = () => {
  return systemLocales.find((locale) => systemTagMatchesSupportedTags(locale.languageTag))
}

const locale = pickSupportedLocale()

export let isRTL = false

// Need to set RTL ASAP to ensure the app is rendered correctly. Waiting for i18n to init is too late.
if (locale?.languageTag && locale?.textDirection === "rtl") {
  I18nManager.allowRTL(true)
  isRTL = true
} else {
  I18nManager.allowRTL(false)
}

export const initI18n = async () => {
  i18n.use(initReactI18next)

  // MMKV에 저장된 언어를 우선 사용하고, 없으면 ko 기본값 사용 (인증 연동 전 임시)
  // TODO: 인증 연동 후 서버 profile preferredLanguageCode를 source of truth로 복원
  const savedLang = loadString(LANGUAGE_STORAGE_KEY)

  await i18n.init({
    resources,
    lng: savedLang ?? "ko",
    fallbackLng: "ko",
    interpolation: {
      escapeValue: false,
    },
  })

  return i18n
}

/**
 * BCP-47 코드 → i18n 리소스 키 변환.
 * resources 객체의 키가 camelCase(zhHans, zhHant)이므로 하이픈 코드를 변환해야 함.
 */
export const toI18nKey = (bcp47Code: string): string => {
  const map: Record<string, string> = { "zh-Hans": "zhHans", "zh-Hant": "zhHant" }
  return map[bcp47Code] ?? bcp47Code
}

/** 언어 변경 + MMKV 영구 저장. bcp47Code는 "ko", "zh-Hans" 등 BCP-47 코드를 받아 자동 변환. */
export const persistChangeLanguage = async (bcp47Code: string): Promise<void> => {
  const i18nCode = toI18nKey(bcp47Code)
  await i18n.changeLanguage(i18nCode)
  saveString(LANGUAGE_STORAGE_KEY, i18nCode)
}

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
