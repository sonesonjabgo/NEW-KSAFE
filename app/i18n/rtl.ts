import { loadString } from "@/utils/storage"

/**
 * MMKV에 저장된 언어 코드를 직접 읽어 RTL 여부를 결정한다.
 * I18nManager.isRTL은 네이티브 리스타트 전까지 반영되지 않으므로,
 * reloadAppAsync 이후에도 정확한 값을 반환하려면 이 값을 사용한다.
 */
const RTL_LOCALES = ["ur"]
const savedLang = loadString("i18n.lng")
export const isRTL: boolean = savedLang ? RTL_LOCALES.includes(savedLang) : false
