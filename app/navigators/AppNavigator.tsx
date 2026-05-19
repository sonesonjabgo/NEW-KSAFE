/**
 * The app navigator (formerly "AppNavigator" and "MainNavigator") is used for the primary
 * navigation flows of your app.
 * Generally speaking, it will contain an auth flow (registration, login, forgot password)
 * and a "main" flow which the user will use once logged in.
 */
import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"

import Config from "@/config"
import { AISafetyChatScreen } from "@/screens/AISafetyChatScreen/AISafetyChatScreen"
import { EducationPresentationScreen } from "@/screens/EducationPresentationScreen/EducationPresentationScreen"
import { EducationSelectScreen } from "@/screens/EducationSelectScreen/EducationSelectScreen"
import { ErrorBoundary } from "@/screens/ErrorScreen/ErrorBoundary"
import { ImageTranslationScreen } from "@/screens/ImageTranslationScreen/ImageTranslationScreen"
import { LanguageSettingsScreen } from "@/screens/LanguageSettingsScreen"
import { LoginScreen } from "@/screens/LoginScreen"
import { MyPageScreen } from "@/screens/MyPageScreen"
import { NotifyScreen } from "@/screens/NotifyScreen"
import { QrScannerScreen } from "@/screens/QrScannerScreen"
import { TbmCreateScreen } from "@/screens/TbmCreateScreen/TbmCreateScreen"
import { TbmDetailScreen } from "@/screens/TbmDetailScreen/TbmDetailScreen"
import { TbmJoinCompleteScreen } from "@/screens/TbmJoinCompleteScreen/TbmJoinCompleteScreen"
import { TbmJoinHealthScreen } from "@/screens/TbmJoinHealthScreen/TbmJoinHealthScreen"
import { TbmJoinInfoScreen } from "@/screens/TbmJoinInfoScreen/TbmJoinInfoScreen"
import { TbmJoinScreen } from "@/screens/TbmJoinScreen/TbmJoinScreen"
import { TbmJoinSignScreen } from "@/screens/TbmJoinSignScreen/TbmJoinSignScreen"
import { TbmListScreen } from "@/screens/TbmListScreen/TbmListScreen"
import { TbmReportInquiryScreen } from "@/screens/TbmReportInquiryScreen/TbmReportInquiryScreen"
import { TbmReportScreen } from "@/screens/TbmReportScreen/TbmReportScreen"
import { TextTranslationScreen } from "@/screens/TextTranslationScreen/TextTranslationScreen"
import { VoiceTranslationScreen } from "@/screens/VoiceTranslationScreen"
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

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        navigationBarColor: colors.background,
        contentStyle: {
          backgroundColor: colors.background,
        },
      }}
    >
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
      <Stack.Screen name="TbmJoin" component={TbmJoinScreen} />
      <Stack.Screen name="TbmJoinInfo" component={TbmJoinInfoScreen} />
      <Stack.Screen name="TbmJoinHealth" component={TbmJoinHealthScreen} />
      <Stack.Screen name="TbmJoinSign" component={TbmJoinSignScreen} />
      <Stack.Screen name="TbmJoinComplete" component={TbmJoinCompleteScreen} />
      <Stack.Screen name="EducationSelect" component={EducationSelectScreen} />
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
