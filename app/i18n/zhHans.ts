import en, { Translations } from "./en"
import { mergeLocale, type LocaleOverrides } from "./mergeLocale"
import zh from "./zh"

const zhHans: Translations = mergeLocale(
  en,
  zh as LocaleOverrides<Translations>,
)

export default zhHans
