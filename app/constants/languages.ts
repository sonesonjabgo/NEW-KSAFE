export type LanguageKey =
  | "korean"
  | "english"
  | "chineseSimplified"
  | "chineseTraditional"
  | "russian"
  | "vietnamese"
  | "indonesian"
  | "khmer"
  | "thai"
  | "urdu"
  | "nepali"
  | "lao"
  | "japanese"
  | "french"
  | "spanish"

export interface Language {
  key: LanguageKey
  flag: string
}

export const LANGUAGES: Language[] = [
  { key: "korean", flag: "🇰🇷" },
  { key: "english", flag: "🇺🇸" },
  { key: "chineseSimplified", flag: "🇨🇳" },
  { key: "chineseTraditional", flag: "🇹🇼" },
  { key: "russian", flag: "🇷🇺" },
  { key: "vietnamese", flag: "🇻🇳" },
  { key: "indonesian", flag: "🇮🇩" },
  { key: "khmer", flag: "🇰🇭" },
  { key: "thai", flag: "🇹🇭" },
  { key: "urdu", flag: "🇵🇰" },
  { key: "nepali", flag: "🇳🇵" },
  { key: "lao", flag: "🇱🇦" },
  { key: "japanese", flag: "🇯🇵" },
  { key: "french", flag: "🇫🇷" },
  { key: "spanish", flag: "🇪🇸" },
]
