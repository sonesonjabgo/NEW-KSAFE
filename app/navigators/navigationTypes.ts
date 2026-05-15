import { ComponentProps } from "react"
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs"
import {
  CompositeScreenProps,
  NavigationContainer,
  NavigatorScreenParams,
} from "@react-navigation/native"
import { NativeStackScreenProps } from "@react-navigation/native-stack"

// Main Tab Navigator types
export type MainTabParamList = {
  Home: undefined
  SafeBoard: undefined
  SafeHealthMain: undefined
  WorkerParticipation: undefined
}

// App Stack Navigator types
export type AppStackParamList = {
  Login: undefined
  Main: NavigatorScreenParams<MainTabParamList>
  LanguageSettings: undefined
  MyPage: undefined
  Notify: undefined
  VoiceTranslation: undefined
  QrScanner: undefined
  AISafetyChat: undefined
  TextTranslation: undefined
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
