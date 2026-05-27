/**
 * The app navigator (formerly "AppNavigator" and "MainNavigator") is used for the primary
 * navigation flows of your app.
 * Generally speaking, it will contain an auth flow (registration, login, forgot password)
 * and a "main" flow which the user will use once logged in.
 */
import { useEffect } from "react"
import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"

import Config from "@/config"
import { useAuth } from "@/context/AuthContext"
import { useRole } from "@/context/RoleContext"
import { AiRiskDocCreatorScreen } from "@/screens/AiRiskDocCreatorScreen"
import { AISafetyChatScreen } from "@/screens/AISafetyChatScreen/AISafetyChatScreen"
import { EducationMaterialDetailScreen } from "@/screens/EducationMaterialDetailScreen/EducationMaterialDetailScreen"
import { EducationMaterialRegisterScreen } from "@/screens/EducationMaterialRegisterScreen/EducationMaterialRegisterScreen"
import { EducationMaterialScreen } from "@/screens/EducationMaterialScreen/EducationMaterialScreen"
import { EducationPresentationScreen } from "@/screens/EducationPresentationScreen/EducationPresentationScreen"
import { EducationSelectScreen } from "@/screens/EducationSelectScreen/EducationSelectScreen"
import { ErrorBoundary } from "@/screens/ErrorScreen/ErrorBoundary"
import { HazardRiskCreateScreen } from "@/screens/HazardRiskCreateScreen/HazardRiskCreateScreen"
import { HazardRiskDetailScreen } from "@/screens/HazardRiskDetailScreen/HazardRiskDetailScreen"
import { HazardRiskScreen } from "@/screens/HazardRiskScreen/HazardRiskScreen"
import { ImageTranslationScreen } from "@/screens/ImageTranslationScreen/ImageTranslationScreen"
import { ImprovementProposalCreateScreen } from "@/screens/ImprovementProposalCreateScreen/ImprovementProposalCreateScreen"
import { ImprovementProposalDetailScreen } from "@/screens/ImprovementProposalDetailScreen/ImprovementProposalDetailScreen"
import { ImprovementProposalListScreen } from "@/screens/ImprovementProposalListScreen/ImprovementProposalListScreen"
import { LanguageSettingsScreen } from "@/screens/LanguageSettingsScreen"
import { LoginScreen } from "@/screens/LoginScreen"
import { MyPageScreen } from "@/screens/MyPageScreen"
import { NotifyScreen } from "@/screens/NotifyScreen"
import { PatrolCreateScreen } from "@/screens/PatrolScreen/PatrolCreateScreen"
import { PatrolDetailScreen } from "@/screens/PatrolScreen/PatrolDetailScreen"
import { PatrolScreen } from "@/screens/PatrolScreen/PatrolScreen"
import { QrScannerScreen } from "@/screens/QrScannerScreen"
import { SafeBoardCreateScreen } from "@/screens/SafeBoardCreateScreen/SafeBoardCreateScreen"
import { SafeBoardDetailScreen } from "@/screens/SafeBoardDetailScreen/SafeBoardDetailScreen"
import { SafeBoardNotifyScreen } from "@/screens/SafeBoardNotifyScreen/SafeBoardNotifyScreen"
import { TbmCreateScreen } from "@/screens/TbmCreateScreen/TbmCreateScreen"
import { TbmDetailScreen } from "@/screens/TbmDetailScreen/TbmDetailScreen"
import { TbmJoinCompleteScreen } from "@/screens/TbmJoinCompleteScreen/TbmJoinCompleteScreen"
import { TbmJoinHealthScreen } from "@/screens/TbmJoinHealthScreen/TbmJoinHealthScreen"
import { TbmJoinInfoScreen } from "@/screens/TbmJoinInfoScreen/TbmJoinInfoScreen"
import { TbmJoinScreen } from "@/screens/TbmJoinScreen/TbmJoinScreen"
import { TbmJoinSignScreen } from "@/screens/TbmJoinSignScreen/TbmJoinSignScreen"
import { TbmListScreen } from "@/screens/TbmListScreen/TbmListScreen"
import { TbmParticipationHistoryDetailScreen } from "@/screens/TbmParticipationHistoryDetailScreen/TbmParticipationHistoryDetailScreen"
import { TbmParticipationHistoryScreen } from "@/screens/TbmParticipationHistoryScreen/TbmParticipationHistoryScreen"
import { TbmReportInquiryScreen } from "@/screens/TbmReportInquiryScreen/TbmReportInquiryScreen"
import { TbmReportScreen } from "@/screens/TbmReportScreen/TbmReportScreen"
import { TbmReportStatusScreen } from "@/screens/TbmReportStatusScreen/TbmReportStatusScreen"
import { TextTranslationScreen } from "@/screens/TextTranslationScreen/TextTranslationScreen"
import { VoiceTranslationScreen } from "@/screens/VoiceTranslationScreen"
import { WelcomeIntroScreen } from "@/screens/WelcomeIntroScreen"
import { useAppTheme } from "@/theme/context"

import { MainNavigator } from "./MainNavigator"
import type { AppStackParamList, NavigationProps } from "./navigationTypes"
import { navigationRef, useBackButtonHandler } from "./navigationUtilities"

/**
 * This is a list of all the route names that will exit the app if the back button
 * is pressed while in that screen. Only affects Android.
 */
const exitRoutes = Config.exitRoutes

// Documentation: https://reactnavigation.org/docs/stack-navigator/
const Stack = createNativeStackNavigator<AppStackParamList>()

const AppStack = () => {
  const {
    theme: { colors },
  } = useAppTheme()
  const { isAuthenticated, user } = useAuth()
  const { setRole } = useRole()

  useEffect(() => {
    if (user?.role === "workplace_admin") {
      setRole("admin")
    } else {
      setRole("worker")
    }
  }, [user?.role, setRole])

  return (
    <Stack.Navigator
      initialRouteName={isAuthenticated ? "Main" : "WelcomeIntro"}
      screenOptions={{
        headerShown: false,
        navigationBarColor: colors.background,
        contentStyle: {
          backgroundColor: colors.background,
        },
      }}
    >
      <Stack.Screen name="WelcomeIntro" component={WelcomeIntroScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Main" component={MainNavigator} />
      <Stack.Screen name="LanguageSettings" component={LanguageSettingsScreen} />
      <Stack.Screen name="MyPage" component={MyPageScreen} />
      <Stack.Screen name="Notify" component={NotifyScreen} />
      <Stack.Screen name="VoiceTranslation" component={VoiceTranslationScreen} />
      <Stack.Screen name="QrScanner" component={QrScannerScreen} />
      <Stack.Screen name="AISafetyChat" component={AISafetyChatScreen} />
      <Stack.Screen name="TextTranslation" component={TextTranslationScreen} />
      <Stack.Screen name="ImageTranslation" component={ImageTranslationScreen} />
      <Stack.Screen name="EducationPresentation" component={EducationPresentationScreen} />
      <Stack.Screen name="TbmList" component={TbmListScreen} />
      <Stack.Screen name="TbmCreate" component={TbmCreateScreen} />
      <Stack.Screen name="TbmDetail" component={TbmDetailScreen} />
      <Stack.Screen name="TbmReport" component={TbmReportScreen} />
      <Stack.Screen name="TbmReportInquiry" component={TbmReportInquiryScreen} />
      <Stack.Screen name="TbmReportStatus" component={TbmReportStatusScreen} />
      <Stack.Screen name="TbmJoin" component={TbmJoinScreen} />
      <Stack.Screen name="TbmJoinInfo" component={TbmJoinInfoScreen} />
      <Stack.Screen name="TbmJoinHealth" component={TbmJoinHealthScreen} />
      <Stack.Screen name="TbmJoinSign" component={TbmJoinSignScreen} />
      <Stack.Screen name="TbmJoinComplete" component={TbmJoinCompleteScreen} />
      <Stack.Screen name="EducationMaterial" component={EducationMaterialScreen} />
      <Stack.Screen name="EducationMaterialDetail" component={EducationMaterialDetailScreen} />
      <Stack.Screen name="EducationMaterialRegister" component={EducationMaterialRegisterScreen} />
      <Stack.Screen name="EducationSelect" component={EducationSelectScreen} />
      <Stack.Screen name="Patrol" component={PatrolScreen} />
      <Stack.Screen name="PatrolCreate" component={PatrolCreateScreen} />
      <Stack.Screen name="PatrolDetail" component={PatrolDetailScreen} />
      <Stack.Screen name="ImprovementProposalList" component={ImprovementProposalListScreen} />
      <Stack.Screen name="ImprovementProposalCreate" component={ImprovementProposalCreateScreen} />
      <Stack.Screen name="ImprovementProposalDetail" component={ImprovementProposalDetailScreen} />
      <Stack.Screen name="TbmParticipationHistory" component={TbmParticipationHistoryScreen} />
      <Stack.Screen
        name="TbmParticipationHistoryDetail"
        component={TbmParticipationHistoryDetailScreen}
      />
      <Stack.Screen name="AiRiskDocCreator" component={AiRiskDocCreatorScreen} />
      <Stack.Screen name="HazardRiskList" component={HazardRiskScreen} />
      <Stack.Screen name="HazardRiskCreate" component={HazardRiskCreateScreen} />
      <Stack.Screen name="HazardRiskDetail" component={HazardRiskDetailScreen} />
      <Stack.Screen name="SafeBoardDetail" component={SafeBoardDetailScreen} />
      <Stack.Screen name="SafeBoardCreate" component={SafeBoardCreateScreen} />
      <Stack.Screen name="SafeBoardNotify" component={SafeBoardNotifyScreen} />
    </Stack.Navigator>
  )
}

export const AppNavigator = (props: NavigationProps) => {
  const { navigationTheme } = useAppTheme()

  useBackButtonHandler((routeName) => exitRoutes.includes(routeName))

  return (
    <NavigationContainer ref={navigationRef} theme={navigationTheme} {...props}>
      <ErrorBoundary catchErrors={Config.catchErrors}>
        <AppStack />
      </ErrorBoundary>
    </NavigationContainer>
  )
}
