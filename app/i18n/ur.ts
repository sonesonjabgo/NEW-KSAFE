import en, { Translations } from "./en"
import { mergeLocale, type LocaleOverrides } from "./mergeLocale"

const urOverrides = {
  languageSettings: {
    languageTitle: "زبان",
    languageDescription: "ایپ کی زبان فوراً تبدیل کریں۔",
    languageChangeSuccess: "زبان {{language}} میں تبدیل کر دی گئی ہے۔",
    languageChangeRestart:
      "زبان {{language}}\nمیں تبدیل کر دی گئی ہے۔ تبدیلیاں لاگو کرنے کے لیے ایپ دوبارہ شروع ہوگی۔",
    languageChangeError: "زبان تبدیل نہیں کی جا سکی۔ دوبارہ کوشش کریں۔",
    languageNames: en.languageSettings.languageNames,
  },
}

const ur: Translations = mergeLocale(en, urOverrides as LocaleOverrides<Translations>)

export default ur
