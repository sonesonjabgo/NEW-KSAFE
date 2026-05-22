import en, { Translations } from "./en"
import { mergeLocale, type LocaleOverrides } from "./mergeLocale"

const ruOverrides = {
  languageSettings: {
    languageTitle: "Язык",
    languageDescription: "Мгновенно переключайте язык приложения.",
    languageChangeSuccess: "Язык изменён на {{language}}.",
    languageChangeRestart:
      "Язык изменён на {{language}}.\nПриложение будет перезапущено для применения изменений.",
    languageChangeError: "Не удалось изменить язык. Пожалуйста, попробуйте снова.",
    languageNames: en.languageSettings.languageNames,
  },
}

const ru: Translations = mergeLocale(en, ruOverrides as LocaleOverrides<Translations>)

export default ru
