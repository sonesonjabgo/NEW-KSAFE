import en, { Translations } from "./en"
import { mergeLocale, type LocaleOverrides } from "./mergeLocale"

const viOverrides = {
  languageSettings: {
    languageTitle: "Ngôn ngữ",
    languageDescription: "Thay đổi ngôn ngữ ứng dụng ngay lập tức.",
    languageChangeSuccess: "Đã đổi ngôn ngữ sang {{language}}.",
    languageChangeRestart:
      "Đã đổi ngôn ngữ sang {{language}}.\nỨng dụng sẽ khởi động lại để áp dụng thay đổi.",
    languageChangeError: "Không thể thay đổi ngôn ngữ. Vui lòng thử lại.",
    languageNames: en.languageSettings.languageNames,
  },
}

const vi: Translations = mergeLocale(en, viOverrides as LocaleOverrides<Translations>)

export default vi
