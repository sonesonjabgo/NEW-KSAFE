import { translate } from "@/i18n/translate"
import type { WorkerParticipationMenuItem } from "../types"

export const getMockWorkerParticipationMenus = (): WorkerParticipationMenuItem[] => [
  {
    id: 1,
    title: translate("workerParticipationScreen:menu.hazard.title"),
    description: translate("workerParticipationScreen:menu.hazard.description"),
    icon: "AlertTriangle",
  },
  {
    id: 2,
    title: translate("workerParticipationScreen:menu.suggestion.title"),
    description: translate("workerParticipationScreen:menu.suggestion.description"),
    icon: "Bulb",
  },
]

// 레거시 호환성을 위한 상수 (추후 제거 가능)
export const mockWorkerParticipationMenus = getMockWorkerParticipationMenus()
