import { ComponentProps } from "react"
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs"
import {
  CompositeScreenProps,
  NavigationContainer,
  NavigatorScreenParams,
} from "@react-navigation/native"
import { NativeStackScreenProps } from "@react-navigation/native-stack"

// Main Tab Navigator types
export type PendingLanguageModal = {
  title: string
  description: string
  confirmText: string
}

export type MainTabParamList = {
  Home: { pendingLanguageModal?: PendingLanguageModal } | undefined
  SafeBoard: { showToast?: boolean } | undefined
  SafeHealthMain: undefined
  WorkerParticipation: undefined
}

// App Stack Navigator types
export type AppStackParamList = {
  WelcomeIntro: undefined
  Login: undefined
  Main: NavigatorScreenParams<MainTabParamList>
  LanguageSettings: undefined
  MyPage: undefined
  Notify: undefined
  VoiceTranslation: undefined
  QrScanner: undefined
  AISafetyChat: undefined
  TextTranslation: undefined
  ImageTranslation: undefined
  EducationPresentation: undefined
  TbmList: undefined
  TbmCreate: undefined
  TbmDetail: { id: number }
  TbmReport: { id: number }
  TbmReportInquiry: undefined
  TbmReportStatus: { id: number }
  TbmJoin: undefined
  TbmJoinInfo: { id: number }
  TbmJoinHealth: { id: number }
  TbmJoinSign: { id: number }
  TbmJoinComplete: undefined
  EducationMaterial: undefined
  EducationMaterialDetail: { id: number }
  EducationMaterialRegister: undefined
  EducationSelect: { initialSelected: number[]; onConfirm: (ids: number[]) => void }
  Patrol: undefined
  PatrolCreate:
    | {
        editData?: {
          approver: { id: string; name: string; subtitle: string } | null
          reviewer: { id: string; name: string; subtitle: string } | null
          requirements: string
          items: Array<{
            id: string
            name: string
            checkCards: Array<{
              id: string
              checkName: string
              status: "good" | "bad"
              badNote: string
            }>
          }>
        }
      }
    | undefined
  PatrolDetail: { id: string }
  ImprovementProposalList: { deleted?: boolean } | undefined
  ImprovementProposalCreate: undefined
  ImprovementProposalDetail:
    | {
        id?: number
        proposal?: {
          id: string
          status: "pending" | "ongoing" | "reflected" | "rejected"
          date: string
          content: string
          authorName: string
          workplace: string
        }
      }
    | undefined
  TbmParticipationHistory: undefined
  TbmParticipationHistoryDetail: { id: number }
  AiRiskDocCreator: undefined
  HazardRiskList: undefined
  HazardRiskCreate: undefined
  HazardRiskDetail: { id: number }
  SafeBoardDetail: { id: number }
  SafeBoardCreate: undefined
  SafeBoardNotify: undefined
}

export type AppStackScreenProps<T extends keyof AppStackParamList> = NativeStackScreenProps<
  AppStackParamList,
  T
>

export type MainTabScreenProps<T extends keyof MainTabParamList> = CompositeScreenProps<
  BottomTabScreenProps<MainTabParamList, T>,
  AppStackScreenProps<keyof AppStackParamList>
>

export interface NavigationProps extends Partial<
  ComponentProps<typeof NavigationContainer<AppStackParamList>>
> {}
