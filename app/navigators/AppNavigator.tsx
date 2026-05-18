/**
 * The app navigator (formerly "AppNavigator" and "MainNavigator") is used for the primary
 * navigation flows of your app.
 * Generally speaking, it will contain an auth flow (registration, login, forgot password)
 * and a "main" flow which the user will use once logged in.
 */
import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"

import Config from "@/config"
import { useAuth } from "@/context/AuthContext"
import { ErrorBoundary } from "@/screens/ErrorScreen/ErrorBoundary"
import { AISafetyChatScreen } from "@/screens/AISafetyChatScreen/AISafetyChatScreen"
import { LanguageSettingsScreen } from "@/screens/LanguageSettingsScreen"
import { LoginScreen } from "@/screens/LoginScreen"
import { MyPageScreen } from "@/screens/MyPageScreen"
import { NotifyScreen } from "@/screens/NotifyScreen"
import { QrScannerScreen } from "@/screens/QrScannerScreen"
import { EducationPresentationScreen } from "@/screens/EducationPresentationScreen/EducationPresentationScreen"
import { TbmListScreen } from "@/screens/TbmListScreen/TbmListScreen"
import { TbmCreateScreen } from "@/screens/TbmCreateScreen/TbmCreateScreen"
import { EducationSelectScreen } from "@/screens/EducationSelectScreen/EducationSelectScreen"
import { ImageTranslationScreen } from "@/screens/ImageTranslationScreen/ImageTranslationScreen"
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
  const { isAuthenticated } = useAuth()

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
