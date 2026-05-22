import en, { Translations } from "./en"
import { mergeLocale, type LocaleOverrides } from "./mergeLocale"

const neOverrides = {
  languageSettings: {
    languageTitle: "भाषा",
    languageDescription: "एपको भाषा तुरुन्त परिवर्तन गर्नुहोस्।",
    languageChangeSuccess: "भाषा {{language}} मा परिवर्तन गरिएको छ।",
    languageChangeRestart:
      "भाषा {{language}}\nमा परिवर्तन गरिएको छ। परिवर्तन लागू गर्न एप पुनः सुरु हुनेछ।",
    languageChangeError: "भाषा परिवर्तन गर्न सकिएन। कृपया फेरि प्रयास गर्नुहोस्।",
    languageNames: en.languageSettings.languageNames,
  },
}

const ne: Translations = mergeLocale(en, neOverrides as LocaleOverrides<Translations>)

export default ne
