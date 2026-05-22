import en, { Translations } from "./en"
import { mergeLocale, type LocaleOverrides } from "./mergeLocale"

const myOverrides = {
  languageSettings: {
    languageTitle: "ဘာသာစကား",
    languageDescription: "အက်ပ်ဘာသာစကားကို ချက်ချင်းပြောင်းနိုင်ပါသည်။",
    languageChangeSuccess: "ဘာသာစကားကို {{language}} သို့ ပြောင်းပြီးပါပြီ။",
    languageChangeRestart:
      "ဘာသာစကားကို {{language}}\nသို့ ပြောင်းပြီးပါပြီ။ ပြောင်းလဲမှုကို အသုံးချရန် အပ်ကို ပြန်လည်စတင်ပါမည်။",
    languageChangeError: "ဘာသာစကား ပြောင်းလဲ၍မရပါ။ ထပ်စမ်းကြည့်ပါ။",
    languageNames: en.languageSettings.languageNames,
  },
}

const my: Translations = mergeLocale(en, myOverrides as LocaleOverrides<Translations>)

export default my
