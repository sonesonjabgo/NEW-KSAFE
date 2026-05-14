import type { MainTabScreenProps } from "@/navigators/navigationTypes"

export interface WorkerParticipationMenuItem {
  id: number
  title: string
  description: string
  icon: string
}

export interface WorkerParticipationScreenProps extends MainTabScreenProps<"MyPage"> {}
