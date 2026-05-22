import en, { Translations } from "./en"
import { mergeLocale, type LocaleOverrides } from "./mergeLocale"

const thOverrides = {
  languageSettings: {
    languageTitle: "ภาษา",
    languageDescription: "เปลี่ยนภาษาของแอปได้ทันที",
    languageChangeSuccess: "เปลี่ยนภาษาเป็น {{language}} แล้ว",
    languageChangeRestart:
      "เปลี่ยนภาษาเป็น {{language}}\nแล้ว แอปจะเริ่มต้นใหม่เพื่อใช้การเปลี่ยนแปลง",
    languageChangeError: "ไม่สามารถเปลี่ยนภาษาได้ กรุณาลองอีกครั้ง",
    languageNames: en.languageSettings.languageNames,
  },
}

const th: Translations = mergeLocale(en, thOverrides as LocaleOverrides<Translations>)

export default th
