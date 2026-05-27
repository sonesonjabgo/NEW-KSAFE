import { I18nManager } from "react-native"

/**
 * 네이티브 RTL 상태를 반환한다.
 * I18nManager.forceRTL(true) 후 reloadAppAsync로 앱이 재시작되면
 * I18nManager.isRTL이 true로 반영된다.
 */
export const isRTL: boolean = I18nManager.isRTL
