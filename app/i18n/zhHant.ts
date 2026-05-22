import en, { Translations } from "./en"
import { mergeLocale, type LocaleOverrides } from "./mergeLocale"

const zhHantOverrides = {
  languageSettings: {
    languageTitle: "語言",
    languageDescription: "立即切換應用程式語言。",
    languageChangeSuccess: "語言已切換為 {{language}}。",
    languageChangeRestart:
      "語言已切換為 {{language}}。\n應用程式將重新啟動以套用變更。",
    languageChangeError: "無法切換語言。請再試一次。",
    languageNames: en.languageSettings.languageNames,
  },
}

const zhHant: Translations = mergeLocale(
  en,
  zhHantOverrides as LocaleOverrides<Translations>,
)

export default zhHant
