import type { AppStackScreenProps } from "@/navigators/navigationTypes"

export interface WorkerParticipationMenuItem {
  id: number
  title: string
  description: string
  icon: string
}

export interface WorkerParticipationScreenProps extends AppStackScreenProps<"WorkerParticipation"> {}
