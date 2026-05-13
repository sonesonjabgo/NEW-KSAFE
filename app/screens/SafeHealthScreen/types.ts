import type { AppStackScreenProps } from "@/navigators/navigationTypes"

export interface SafeHealthMenuItem {
  id: number
  title: string
  description: string
  icon: string
}

export interface SafeHealthMainScreenProps extends AppStackScreenProps<"SafeHealthMain"> {}
