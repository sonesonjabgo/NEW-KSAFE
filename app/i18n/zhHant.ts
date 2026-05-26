import en, { Translations } from "./en"
import zh from "./zh"
import { mergeLocale, type LocaleOverrides } from "./mergeLocale"

const zhHantOverrides = {
  mainTab: {
    home: "首頁",
    safeBoard: "安全公告欄",
    safeHealth: "安全管理",
    workerParticipation: "勞工參與",
  },
  languageSettings: {
    languageTitle: "語言",
    languageDescription: "立即切換應用程式語言。",
    languageChangeSuccess: "語言已切換為 {{language}}。",
    languageChangeRestart: "語言已切換為 {{language}}。\n應用程式將重新啟動以套用變更。",
    languageChangeError: "無法切換語言。請再試一次。",
    languageNames: {
      "en": "英文",
      "ko": "韓文",
      "zh": "中文",
      "zh-Hans": "中文（簡體）",
      "zh-Hant": "中文（繁體）",
      "ja": "日文",
      "es": "西班牙文",
      "fr": "法文",
      "de": "德文",
      "it": "義大利文",
      "ru": "俄文",
      "ar": "阿拉伯文",
      "hi": "印地文",
      "th": "泰文",
      "vi": "越南文",
      "id": "印尼文",
      "km": "高棉文",
      "ur": "烏爾都文",
      "ne": "尼泊爾文",
      "lo": "寮文",
      "my": "緬甸文",
      "yue": "粵語",
      "pt": "葡萄牙文",
      "pt-BR": "葡萄牙文（巴西）",
      "ta": "泰米爾文",
      "te": "泰盧固文",
      "uk": "烏克蘭文",
    },
  },
}

const zhHantBase = mergeLocale(en, zh as LocaleOverrides<Translations>)
const zhHant: Translations = mergeLocale(zhHantBase, zhHantOverrides as LocaleOverrides<Translations>)

export default zhHant
