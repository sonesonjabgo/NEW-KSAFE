import en, { Translations } from "./en"
import { mergeLocale, type LocaleOverrides } from "./mergeLocale"

const idOverrides = {
  languageSettings: {
    languageTitle: "Bahasa",
    languageDescription: "Ganti bahasa aplikasi secara instan.",
    languageChangeSuccess: "Bahasa telah diubah ke {{language}}.",
    languageChangeRestart:
      "Bahasa telah diubah ke {{language}}.\nAplikasi akan dimulai ulang untuk menerapkan perubahan.",
    languageChangeError: "Gagal mengubah bahasa. Silakan coba lagi.",
    languageNames: en.languageSettings.languageNames,
  },
}

const id: Translations = mergeLocale(en, idOverrides as LocaleOverrides<Translations>)

export default id
