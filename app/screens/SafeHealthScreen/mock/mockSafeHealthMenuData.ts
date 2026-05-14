import { translate } from "@/i18n/translate"
import type { SafeHealthMenuItem } from "../types"

export const getMockAdminMenus = (): SafeHealthMenuItem[] => [
  {
    id: 1,
    title: translate("safeHealthScreen:menu.patrol.title"),
    description: translate("safeHealthScreen:menu.patrol.description"),
    icon: "Walk",
  },
  {
    id: 2,
    title: translate("safeHealthScreen:menu.educationMaterial.title"),
    description: translate("safeHealthScreen:menu.educationMaterial.description"),
    icon: "Book",
  },
  {
    id: 3,
    title: translate("safeHealthScreen:menu.tbmManage.title"),
    description: translate("safeHealthScreen:menu.tbmManage.description"),
    icon: "CalendarPlus",
  },
  {
    id: 4,
    title: translate("safeHealthScreen:menu.tbmReport.title"),
    description: translate("safeHealthScreen:menu.tbmReport.description"),
    icon: "Download",
  },
  {
    id: 5,
    title: translate("safeHealthScreen:menu.tbmJoin.title"),
    description: translate("safeHealthScreen:menu.tbmJoin.description"),
    icon: "Users",
  },
  {
    id: 6,
    title: translate("safeHealthScreen:menu.tbmHistory.title"),
    description: translate("safeHealthScreen:menu.tbmHistory.description"),
    icon: "History",
  },
]

export const getMockWorkerMenus = (): SafeHealthMenuItem[] => [
  {
    id: 1,
    title: translate("safeHealthScreen:menu.tbmJoinWorker.title"),
    description: translate("safeHealthScreen:menu.tbmJoinWorker.description"),
    icon: "Users",
  },
  {
    id: 2,
    title: translate("safeHealthScreen:menu.statusView.title"),
    description: translate("safeHealthScreen:menu.statusView.description"),
    icon: "LayoutList",
  },
]

// 레거시 호환성을 위한 상수 (추후 제거 가능)
export const mockAdminMenus = getMockAdminMenus()
export const mockWorkerMenus = getMockWorkerMenus()
