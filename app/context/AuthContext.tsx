import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react"

import { translate } from "@/i18n/translate"
import { supabase } from "@/services/api/auth/supabase"
import type { Session } from "@/services/api/auth/supabase"
import { logDevError } from "@/utils/logDevError"
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
  /** 세션 복원 또는 로그인 처리 중 true */
  authLocked: boolean
  error: string | null
  signIn: (email: string, password: string) => Promise<{ error?: string }>
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  token: undefined,
  user: undefined,
  authLocked: false,
  error: null,
  signIn: () => Promise.resolve({}),
  signOut: () => Promise.resolve(),
})

export const useAuth = () => {
  const value = useContext(AuthContext)
  if (!value) throw new Error("useAuth must be used within an AuthProvider")
  return value
}

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [token, setToken] = useState<string | undefined>()
  const [user, setUser] = useState<AuthUser | undefined>()
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
    (sessionUser?: Session["user"] | null, candidateToken?: string | null): AuthUser | undefined => {
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
    setError(null)
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
    [deriveUser, getAuthErrorMessage, updateAuthLock],
  )

  // 앱 시작 시 저장된 세션 복원
  useEffect(() => {
    supabase.auth
      .getSession()
      .then(({ data: { session }, error: sessionError }) => {
        if (sessionError) {
          logDevError("Session error:", sessionError)
          setIsInitialized(true)
          return
        }
        if (session?.access_token) {
          setToken(session.access_token)
          const nextUser = deriveUser(session.user, session.access_token)
          if (nextUser) setUser(nextUser)
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
        authLocked,
        error,
        signIn,
        signOut,
      }}
    >
      {isInitialized ? children : null}
    </AuthContext.Provider>
  )
}
