/* eslint-disable import/first */
/**
 * Welcome to the main entry point of the app. In this file, we'll
 * be kicking off our app.
 *
 * Most of this file is boilerplate and you shouldn't need to modify
 * it very often. But take some time to look through and understand
 * what is going on here.
 *
 * The app navigation resides in ./app/navigators, so head over there
 * if you're interested in adding screens and navigators.
 */
if (__DEV__) {
  // Load Reactotron in development only.
  // Note that you must be using metro's `inlineRequires` for this to work.
  // If you turn it off in metro.config.js, you'll have to manually import it.
  require("./devtools/ReactotronConfig.ts")
}
import "./utils/gestureHandler"

import { useEffect, useMemo, useState } from "react"
import { useFonts } from "expo-font"
import * as Linking from "expo-linking"
import { KeyboardProvider } from "react-native-keyboard-controller"
import { initialWindowMetrics, SafeAreaProvider } from "react-native-safe-area-context"

import { GluestackUIProvider } from "./components/ui/gluestack-ui-provider"
import { HAS_LAUNCHED_KEY } from "./constants/storageKeys"
import { AuthProvider } from "./context/AuthContext"
import { RoleProvider } from "./context/RoleContext"
import { initI18n } from "./i18n"
import { RootStoreProvider, useInitialRootStore } from "./models"
import { AppNavigator } from "./navigators/AppNavigator"
import { useNavigationPersistence } from "./navigators/navigationUtilities"
import { ThemeProvider } from "./theme/context"
import { customFontsToLoad } from "./theme/typography"
import { loadDateFnsLocale } from "./utils/formatDate"
import * as storage from "./utils/storage"

export const NAVIGATION_PERSISTENCE_KEY = "NAVIGATION_STATE"

// Web linking configuration
const prefix = Linking.createURL("/")
const config = {
  screens: {
    WelcomeIntro: {
      path: "",
    },
  },
}

/**
 * This is the root component of our app.
 * @param {AppProps} props - The props for the `App` component.
 * @returns {JSX.Element} The rendered `App` component.
 */
export function App() {
  const { onNavigationStateChange, isRestored: isNavigationStateRestored } =
    useNavigationPersistence(storage, NAVIGATION_PERSISTENCE_KEY)

  const [areFontsLoaded, fontLoadError] = useFonts(customFontsToLoad)
  const [isI18nInitialized, setIsI18nInitialized] = useState(false)
  const { rehydrated, rootStore } = useInitialRootStore()

  // MMKV는 동기 API — Navigator 렌더 전에 한 번만 읽어 초기 라우트 결정
  const initialRoute = useMemo(() => {
    const value = storage.loadString(HAS_LAUNCHED_KEY)
    console.log("[App] HAS_LAUNCHED_KEY →", JSON.stringify(value))
    return value === "true" ? ("Main" as const) : ("WelcomeIntro" as const)
  }, [])

  useEffect(() => {
    initI18n()
      .then(() => setIsI18nInitialized(true))
      .then(() => loadDateFnsLocale())
  }, [])

  if (
    !rehydrated ||
    !isNavigationStateRestored ||
    !isI18nInitialized ||
    (!areFontsLoaded && !fontLoadError)
  ) {
    return null
  }

  const linking = {
    prefixes: [prefix],
    config,
  }

  // otherwise, we're ready to render the app
  return (
    <RootStoreProvider value={rootStore}>
      <SafeAreaProvider initialMetrics={initialWindowMetrics}>
        <GluestackUIProvider mode="light">
          <KeyboardProvider>
            <AuthProvider>
              <RoleProvider>
                <ThemeProvider>
                  <AppNavigator
                    initialRouteName={initialRoute}
                    linking={linking}
                    onStateChange={onNavigationStateChange}
                  />
                </ThemeProvider>
              </RoleProvider>
            </AuthProvider>
          </KeyboardProvider>
        </GluestackUIProvider>
      </SafeAreaProvider>
    </RootStoreProvider>
  )
}
