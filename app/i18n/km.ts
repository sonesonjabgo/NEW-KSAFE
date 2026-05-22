import en, { Translations } from "./en"
import { mergeLocale, type LocaleOverrides } from "./mergeLocale"

const kmOverrides = {
  languageSettings: {
    languageTitle: "ភាសា",
    languageDescription: "ប្តូរភាសាកម្មវិធីភ្លាមៗ។",
    languageChangeSuccess: "បានប្តូរភាសាទៅជា {{language}}។",
    languageChangeRestart:
      "បានប្តូរភាសាទៅជា {{language}}។\nកម្មវិធីនឹងចាប់ផ្តើមឡើងវិញដើម្បីអនុវត្តការផ្លាស់ប្តូរ។",
    languageChangeError: "មិនអាចប្តូរភាសាបានទេ។ សូមព្យាយាមម្តងទៀត។",
    languageNames: en.languageSettings.languageNames,
  },
}

const km: Translations = mergeLocale(en, kmOverrides as LocaleOverrides<Translations>)

export default km
