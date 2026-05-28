import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react"

import i18n from "i18next"

import { persistChangeLanguage, toI18nKey } from "@/i18n"
import { translate } from "@/i18n/translate"
import { registerSignOutHandler } from "@/services/api/auth/authSignOutBridge"
import { supabase } from "@/services/api/auth/supabase"
import type { Session } from "@/services/api/auth/supabase"
import { api } from "@/services/api/index"
import { fetchMyProfile, MyProfileResponseDto } from "@/services/api/profile"
import { logDevError } from "@/utils/logDevError"
import { remove } from "@/utils/storage"

const NOTIFICATION_PROMPT_KEY = "notification-permission:lastPromptedAt"
import { resolvePrimaryRole, UserRole } from "@/utils/roles"

type AuthUser = {
  id: string
  email?: string
  name?: string
  role: UserRole
}

type AuthContextType = {
  isAuthenticated: boolean
  token?: string
  user?: AuthUser
  profile: MyProfileResponseDto | null
  /** 세션 복원 또는 로그인 처리 중 true */
  authLocked: boolean
  error: string | null
  signIn: (email: string, password: string) => Promise<{ error?: string }>
  signOut: () => Promise<void>
  refreshProfile: () => Promise<void>
}

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  token: undefined,
  user: undefined,
  profile: null,
  authLocked: false,
  error: null,
  signIn: () => Promise.resolve({}),
  signOut: () => Promise.resolve(),
  refreshProfile: () => Promise.resolve(),
})

export { MyProfileResponseDto }

export const useAuth = () => {
  const value = useContext(AuthContext)
  if (!value) throw new Error("useAuth must be used within an AuthProvider")
  return value
}

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [token, setToken] = useState<string | undefined>()
  const [user, setUser] = useState<AuthUser | undefined>()
  const [profile, setProfile] = useState<MyProfileResponseDto | null>(null)
  const [isInitialized, setIsInitialized] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [authLocked, setAuthLocked] = useState(false)

  const authLockedRef = useRef(false)
  const signOutInFlightRef = useRef(false)

  const updateAuthLock = useCallback((locked: boolean) => {
    authLockedRef.current = locked
    setAuthLocked(locked)
  }, [])

  const deriveUser = useCallback(
    (
      sessionUser?: Session["user"] | null,
      candidateToken?: string | null,
    ): AuthUser | undefined => {
      if (!sessionUser) return undefined
      const metadata = sessionUser.user_metadata ?? {}
      return {
        id: sessionUser.id,
        email: sessionUser.email,
        name:
          (metadata.name as string | undefined) ??
          (metadata.fullName as string | undefined) ??
          (metadata.displayName as string | undefined) ??
          (metadata.username as string | undefined) ??
          undefined,
        role: resolvePrimaryRole(candidateToken ?? token),
      }
    },
    [token],
  )

  const loadProfile = useCallback(
    async (
      accessToken: string,
    ): Promise<{ ok: true; data: MyProfileResponseDto } | { ok: false }> => {
      try {
        const data = await fetchMyProfile(accessToken)
        setProfile(data)

        // 서버 preferredLanguageCode와 로컬 i18n 언어 동기화
        // 앱 시작·로그인 시 다른 기기에서 변경된 언어값을 UI에 반영하기 위해 처리
        const serverCode = data.preferredLanguageCode
        if (serverCode) {
          const serverLangKey = toI18nKey(serverCode)
          if (serverLangKey !== i18n.language) {
            await persistChangeLanguage(serverCode)
          }
        }

        return { ok: true, data }
      } catch (err) {
        logDevError("Failed to fetch profile", err)
        return { ok: false }
      }
    },
    [],
  )

  const refreshProfile = useCallback(async () => {
    if (!token) return
    await loadProfile(token)
  }, [loadProfile, token])

  const getAuthErrorMessage = useCallback((message?: string) => {
    if (message === "Invalid login credentials") {
      return translate("loginScreen:alert.invalidCredentials")
    }
    if (message) return message
    return translate("loginScreen:alert.signInFailed")
  }, [])

  const signOut = useCallback(async () => {
    if (signOutInFlightRef.current) return
    signOutInFlightRef.current = true
    updateAuthLock(true)
    setToken(undefined)
    setUser(undefined)
    setProfile(null)
    setError(null)
    api.resetRequestBlock()
    remove(NOTIFICATION_PROMPT_KEY)
    try {
      await supabase.auth.signOut({ scope: "local" })
    } catch (err) {
      logDevError("SignOut error", err)
    } finally {
      signOutInFlightRef.current = false
      updateAuthLock(false)
    }
  }, [updateAuthLock])

  const signIn = useCallback(
    async (email: string, password: string): Promise<{ error?: string }> => {
      try {
        setError(null)
        updateAuthLock(true)

        const result = await supabase.auth.signInWithPassword({ email, password })

        if (result.error) {
          const message = getAuthErrorMessage(result.error.message)
          setError(message)
          return { error: message }
        }

        const nextToken = result.data?.session?.access_token
        if (nextToken) {
          // ① 프로필 로드 — 실패 시 로그인 차단
          const profileResult = await loadProfile(nextToken)
          if (!profileResult.ok) {
            await supabase.auth.signOut({ scope: "local" })
            const message = translate("loginScreen:alert.profileLoadFailed")
            setError(message)
            return { error: message }
          }

          // ② 비활성화 계정 검사
          if (!profileResult.data.isActive) {
            await supabase.auth.signOut({ scope: "local" })
            const message = translate("loginScreen:alert.deactivatedAccount")
            setError(message)
            return { error: message }
          }

          setToken(nextToken)
          const nextUser = deriveUser(result.data?.user, nextToken)
          if (nextUser) setUser(nextUser)
        }

        return {}
      } catch (err) {
        const message = err instanceof Error ? err.message : undefined
        const errorMessage = getAuthErrorMessage(message)
        setError(errorMessage)
        return { error: errorMessage }
      } finally {
        updateAuthLock(false)
      }
    },
    [deriveUser, getAuthErrorMessage, loadProfile, updateAuthLock],
  )

  // api.ts 전역 차단 → AuthContext.signOut 연결
  useEffect(() => {
    registerSignOutHandler(signOut)
    return () => registerSignOutHandler(null)
  }, [signOut])

  // 앱 시작 시 저장된 세션 복원
  useEffect(() => {
    supabase.auth
      .getSession()
      .then(async ({ data: { session }, error: sessionError }) => {
        if (sessionError) {
          logDevError("Session error:", sessionError)
          setIsInitialized(true)
          return
        }
        if (session?.access_token) {
          const profileResult = await loadProfile(session.access_token)
          if (profileResult.ok && !profileResult.data.isActive) {
            // 비활성화 계정 — 세션 파기 후 로그인 화면으로
            await supabase.auth.signOut({ scope: "local" })
          } else {
            setToken(session.access_token)
            const nextUser = deriveUser(session.user, session.access_token)
            if (nextUser) setUser(nextUser)
          }
        }
        setIsInitialized(true)
      })
      .catch((err) => {
        logDevError("Failed to get session:", err)
        setIsInitialized(true)
      })
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  // 인증 상태 변경 감지 (토큰 갱신, 로그아웃 등)
  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (signOutInFlightRef.current) return

      if (event === "SIGNED_OUT") {
        setToken(undefined)
        setUser(undefined)
        setProfile(null)
        updateAuthLock(false)
        return
      }

      if (session?.access_token) {
        if (authLockedRef.current) return
        setToken(session.access_token)
        const nextUser = deriveUser(session.user, session.access_token)
        if (nextUser) setUser(nextUser)
      } else {
        setToken(undefined)
        setUser(undefined)
        setProfile(null)
        updateAuthLock(false)
      }
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [deriveUser, updateAuthLock])

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: !authLocked && !!token && isInitialized,
        token,
        user,
        profile,
        authLocked,
        error,
        signIn,
        signOut,
        refreshProfile,
      }}
    >
      {isInitialized ? children : null}
    </AuthContext.Provider>
  )
}
