import en, { Translations } from "./en"
import { mergeLocale, type LocaleOverrides } from "./mergeLocale"

const zhOverrides = {
  languageSettings: {
    languageTitle: "语言",
    languageDescription: "立即切换应用语言。",
    languageChangeSuccess: "语言已切换为 {{language}}。",
    languageChangeRestart: "语言已切换为 {{language}}。\n应用将重新启动以应用更改。",
    languageChangeError: "无法切换语言。请重试。",
    languageNames: en.languageSettings.languageNames,
  },
}

const zh: Translations = mergeLocale(en, zhOverrides as LocaleOverrides<Translations>)

export default zh
