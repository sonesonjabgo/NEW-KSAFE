import { Alert } from "react-native"
import { ApiResponse, ApisauceInstance, create } from "apisauce"
import type { AxiosError, AxiosHeaders, AxiosRequestConfig, AxiosResponse } from "axios"

import Config from "@/config"

import { GeneralApiProblem, getGeneralApiProblem } from "./apiProblem"
import { triggerRegisteredSignOut } from "./auth/authSignOutBridge"
import { supabase } from "./auth/supabase"
import type { ApiConfig, LanguageItem, LanguagesResponse, UserProfile } from "./types"

export const DEFAULT_API_CONFIG: ApiConfig = {
  url: Config.API_URL,
  timeout: 100000,
}

type RetryableRequestConfig = AxiosRequestConfig & { _retry?: boolean }

type ApiErrorResponseData = {
  errorCode?: string
  code?: string
  message?: string
}

type AuthFailureKind =
  | "user-deactivated"
  | "token-validation-error"
  | "token-refresh-failed"
  | "unauthorized"
  | "insufficient-permissions"
  | "unknown"

type AuthFailureInfo = {
  kind: AuthFailureKind
  message: string
  status?: number
  errorCode?: string
}

type RefreshFailureLikeError = {
  status?: number
  code?: string
  name?: string
  message?: string
}

interface PendingRequest {
  resolve: (value: AxiosResponse) => void
  reject: (reason?: unknown) => void
  config: RetryableRequestConfig
}

export class Api {
  apisauce: ApisauceInstance
  config: ApiConfig
  isRefreshing: boolean = false
  private pendingRequests: PendingRequest[]
  private refreshPromise: Promise<void> | null
  private requestsBlocked: boolean
  private blockedRequestError: Error | null
  private blockedRequestCode: string | null

  constructor(config: ApiConfig = DEFAULT_API_CONFIG) {
    this.config = config
    this.apisauce = create({
      baseURL: this.config.url,
      timeout: this.config.timeout,
      headers: {
        Accept: "application/json",
      },
    })
    this.pendingRequests = []
    this.refreshPromise = null
    this.requestsBlocked = false
    this.blockedRequestError = null
    this.blockedRequestCode = null

    this.apisauce.axiosInstance.interceptors.request.use((request) => {
      this.assertRequestAllowed(request)
      this.logRequestEndpoint(request)
      return request
    })

    this.apisauce.axiosInstance.interceptors.response.use(
      (response) => response,
      (error: AxiosError) => this.handleResponseError(error),
    )
  }

  resetRequestBlock() {
    this.requestsBlocked = false
    this.blockedRequestError = null
    this.blockedRequestCode = null
  }

  blockAllRequests(error?: unknown, fallbackMessage?: string, code?: string) {
    const isSameBlockedCode = this.requestsBlocked && this.blockedRequestCode === (code ?? null)

    this.requestsBlocked = true
    this.blockedRequestError = this.createBlockedRequestError(error, fallbackMessage)
    this.blockedRequestCode = code ?? null

    return !isSameBlockedCode
  }

  isRequestBlocked() {
    return this.requestsBlocked
  }

  getBlockedRequestError(fallbackMessage?: string) {
    return this.blockedRequestError ?? new Error(fallbackMessage ?? "전역 요청 차단 상태입니다.")
  }

  getBlockedRequestCode() {
    return this.blockedRequestCode
  }

  handleAuthFailureResponse(
    response: Pick<ApiResponse<unknown>, "status" | "problem" | "data">,
    fallbackMessage?: string,
  ) {
    const authFailure = this.resolveAuthFailure(response.status, response.data, fallbackMessage)

    if (authFailure.kind === "unknown") {
      return false
    }

    if (authFailure.kind === "insufficient-permissions") {
      return false
    }

    if (authFailure.kind === "user-deactivated") {
      this.handleUserDeactivated(new Error(authFailure.message))
      return true
    }

    if (authFailure.kind === "token-validation-error") {
      this.handleTokenValidationError(new Error(authFailure.message))
      return true
    }

    if (authFailure.kind === "unauthorized") {
      this.handleUnauthorized(new Error(authFailure.message))
      return true
    }

    return true
  }

  ensureRequestsAllowed() {
    if (!this.requestsBlocked) {
      return
    }

    throw this.getBlockedRequestError()
  }

  /** 지원 언어 목록 조회 */
  async getLanguages(
    token: string,
  ): Promise<{ kind: "ok"; items: LanguageItem[] } | GeneralApiProblem> {
    const response = await this.apisauce.get<LanguagesResponse>(
      "/api/v1/common/languages",
      {},
      { headers: { Authorization: `Bearer ${token}` } },
    )
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }
    try {
      return { kind: "ok", items: response.data?.items ?? [] }
    } catch {
      return { kind: "bad-data" }
    }
  }

  /** 사용자 프로필 조회 */
  async getUserProfile(
    token: string,
  ): Promise<{ kind: "ok"; profile: UserProfile } | GeneralApiProblem> {
    const response = await this.apisauce.get<UserProfile>(
      "/api/v1/common/users/profile",
      {},
      { headers: { Authorization: `Bearer ${token}` } },
    )
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }
    try {
      return { kind: "ok", profile: response.data as UserProfile }
    } catch {
      return { kind: "bad-data" }
    }
  }

  /** 선호 언어 변경 */
  async patchPreferredLanguage(
    token: string,
    languageId: number,
  ): Promise<{ kind: "ok" } | GeneralApiProblem> {
    const response = await this.apisauce.patch(
      "/api/v1/common/users/preferred-language",
      { languageId },
      { headers: { Authorization: `Bearer ${token}` } },
    )
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }
    return { kind: "ok" }
  }

  private logRequestEndpoint(request: AxiosRequestConfig) {
    if (!__DEV__) {
      return
    }

    const endpoint = this.extractEndpoint(request.baseURL ?? this.config.url, request.url)

    if (!endpoint) {
      return
    }

    console.log("Request Endpoint: " + endpoint)
  }

  private extractEndpoint(baseUrl?: string, requestUrl?: string): string {
    if (!requestUrl) {
      return ""
    }

    try {
      if (/^https?:\/\//i.test(requestUrl)) {
        const absoluteRequestUrl = new URL(requestUrl)
        return `${absoluteRequestUrl.pathname}${absoluteRequestUrl.search}`
      }

      if (!baseUrl) {
        return requestUrl
      }

      const resolvedUrl = new URL(requestUrl, baseUrl)
      const resolvedBaseUrl = new URL(baseUrl)
      const endpointPath = resolvedUrl.pathname.replace(resolvedBaseUrl.pathname, "") || "/"

      return `${endpointPath}${resolvedUrl.search}`
    } catch {
      return requestUrl
    }
  }

  private handleResponseError(error: AxiosError): Promise<AxiosResponse> {
    const status = error.response?.status
    const originalRequest = error.config as RetryableRequestConfig | undefined
    const authFailure = this.resolveAuthFailure(status, error.response?.data)

    if (authFailure.kind === "user-deactivated") {
      this.handleUserDeactivated(error)
      return Promise.reject(error)
    }

    if (authFailure.kind === "token-validation-error") {
      this.handleTokenValidationError(error)
      return Promise.reject(error)
    }

    if (authFailure.kind === "insufficient-permissions") {
      return Promise.reject(error)
    }

    if (status !== 401 || !originalRequest) {
      return Promise.reject(error)
    }

    if (!this.hasAuthorizationHeader(originalRequest.headers)) {
      return Promise.reject(error)
    }

    if (originalRequest._retry) {
      return Promise.reject(error)
    }

    if (authFailure.errorCode && authFailure.kind !== "unauthorized") {
      return Promise.reject(error)
    }

    originalRequest._retry = true
    const queuedPromise = this.enqueueRequest(originalRequest)
    this.ensureSingleRefresh()
    return queuedPromise
  }

  private handleUserDeactivated(error: AxiosError | Error) {
    const shouldHandleSideEffect = this.blockAllRequests(
      error,
      "비활성화된 계정으로 인해 모든 API 요청이 차단되었습니다.",
      "USER_DEACTIVATED",
    )

    this.processQueue(error)

    if (!shouldHandleSideEffect) {
      return
    }

    Alert.alert("", "비활성화된 계정입니다. 다시 로그인해주세요.")
    void triggerRegisteredSignOut()
  }

  private handleTokenValidationError(error: AxiosError | Error) {
    const shouldHandleSideEffect = this.blockAllRequests(
      error,
      "토큰 검증 오류로 인해 모든 API 요청이 차단되었습니다.",
      "TOKEN_VALIDATION_ERROR",
    )

    this.processQueue(error)

    if (!shouldHandleSideEffect) {
      return
    }

    Alert.alert("", "토큰 검증 오류가 발생했습니다. 다시 로그인해주세요.")
    void triggerRegisteredSignOut()
  }

  private handleUnauthorized(error: AxiosError | Error) {
    const shouldHandleSideEffect = this.blockAllRequests(
      error,
      "인증이 만료되었습니다. 다시 로그인해주세요.",
      "UNAUTHORIZED",
    )

    this.processQueue(error)

    if (!shouldHandleSideEffect) {
      return
    }

    Alert.alert("", "인증이 만료되었습니다. 다시 로그인해주세요.")
    void triggerRegisteredSignOut()
  }

  private handleTokenRefreshFailure(error: unknown) {
    const authFailure = this.resolveRefreshFailure(error)

    if (authFailure.kind === "user-deactivated") {
      this.handleUserDeactivated(error instanceof Error ? error : new Error(authFailure.message))
      return
    }

    if (authFailure.kind === "token-validation-error") {
      this.handleTokenValidationError(
        error instanceof Error ? error : new Error(authFailure.message),
      )
      return
    }

    const normalizedError = error instanceof Error ? error : new Error(authFailure.message)
    const shouldHandleSideEffect = this.blockAllRequests(
      normalizedError,
      authFailure.message,
      "TOKEN_REFRESH_FAILED",
    )

    this.processQueue(normalizedError)

    if (!shouldHandleSideEffect) {
      return
    }

    Alert.alert("", authFailure.message)
    void triggerRegisteredSignOut()
  }

  private enqueueRequest(config: RetryableRequestConfig): Promise<AxiosResponse> {
    return new Promise((resolve, reject) => {
      this.pendingRequests.push({ resolve, reject, config })
    })
  }

  private ensureSingleRefresh() {
    if (this.refreshPromise) return

    this.isRefreshing = true
    this.refreshPromise = this.refreshAccessToken()
      .then((token) => {
        this.processQueue(undefined, token)
      })
      .catch((refreshError) => {
        this.handleTokenRefreshFailure(refreshError)
      })
      .finally(() => {
        this.isRefreshing = false
        this.refreshPromise = null
      })
  }

  private async refreshAccessToken(): Promise<string> {
    const { data: sessionData } = await supabase.auth.getSession()

    if (!sessionData.session?.refresh_token) {
      throw new Error("활성화된 세션이 없어 토큰을 갱신할 수 없습니다.")
    }

    const { data, error } = await supabase.auth.refreshSession()

    if (error) {
      throw error
    }

    const nextToken = data.session?.access_token

    if (!nextToken) {
      throw new Error("새로운 액세스 토큰을 가져오지 못했습니다.")
    }

    return nextToken
  }

  private resolveAuthFailure(
    status?: number,
    data?: unknown,
    fallbackMessage?: string,
  ): AuthFailureInfo {
    const responseData = this.extractApiErrorResponseData(data)
    const errorCode = responseData?.errorCode ?? responseData?.code
    const message = responseData?.message ?? fallbackMessage

    if (errorCode === "USER_DEACTIVATED") {
      return {
        kind: "user-deactivated",
        message: message ?? "비활성화된 계정입니다. 다시 로그인해주세요.",
        status,
        errorCode,
      }
    }

    if (errorCode === "TOKEN_VALIDATION_ERROR") {
      return {
        kind: "token-validation-error",
        message: message ?? "토큰 검증 오류가 발생했습니다. 다시 로그인해주세요.",
        status,
        errorCode,
      }
    }

    if (errorCode === "INSUFFICIENT_PERMISSIONS") {
      return {
        kind: "insufficient-permissions",
        message: message ?? "권한이 없습니다.",
        status,
        errorCode,
      }
    }

    if (status === 401) {
      return {
        kind: "unauthorized",
        message: message ?? "인증이 만료되었습니다. 다시 로그인해주세요.",
        status,
        errorCode,
      }
    }

    return {
      kind: "unknown",
      message: message ?? "알 수 없는 인증 오류가 발생했습니다.",
      status,
      errorCode,
    }
  }

  private resolveRefreshFailure(error: unknown): AuthFailureInfo {
    const refreshError = this.extractRefreshFailureLikeError(error)
    const errorCode = refreshError?.code
    const message = refreshError?.message

    if (errorCode === "USER_DEACTIVATED") {
      return {
        kind: "user-deactivated",
        message: message ?? "비활성화된 계정입니다. 다시 로그인해주세요.",
        status: refreshError?.status,
        errorCode,
      }
    }

    if (errorCode === "TOKEN_VALIDATION_ERROR") {
      return {
        kind: "token-validation-error",
        message: message ?? "토큰 검증 오류가 발생했습니다. 다시 로그인해주세요.",
        status: refreshError?.status,
        errorCode,
      }
    }

    return {
      kind: "token-refresh-failed",
      message: message ?? "세션 갱신에 실패했습니다. 다시 로그인해주세요.",
      status: refreshError?.status,
      errorCode,
    }
  }

  private extractApiErrorResponseData(data?: unknown): ApiErrorResponseData | undefined {
    if (!data || typeof data !== "object") {
      return undefined
    }

    return data as ApiErrorResponseData
  }

  private extractRefreshFailureLikeError(error: unknown): RefreshFailureLikeError | undefined {
    if (!error || typeof error !== "object") {
      return undefined
    }

    return error as RefreshFailureLikeError
  }

  private processQueue(error?: unknown, token?: string) {
    const queued = [...this.pendingRequests]
    this.pendingRequests = []

    queued.forEach(({ resolve, reject, config }) => {
      if (!token || error) {
        reject(error ?? new Error("토큰 갱신이 실패했습니다."))
        return
      }

      this.applyAuthorizationHeader(config, token)
      this.apisauce.axiosInstance.request(config).then(resolve).catch(reject)
    })
  }

  private assertRequestAllowed(_request: AxiosRequestConfig) {
    if (!this.requestsBlocked) {
      return
    }

    throw this.getBlockedRequestError()
  }

  private createBlockedRequestError(error?: unknown, fallbackMessage?: string) {
    if (error instanceof Error) {
      return error
    }

    return new Error(fallbackMessage ?? "전역 요청 차단 상태입니다.")
  }

  private applyAuthorizationHeader(config: RetryableRequestConfig, token: string) {
    if (!config.headers) {
      config.headers = {}
    }

    const axiosHeaders = config.headers as AxiosHeaders

    if (typeof axiosHeaders.set === "function") {
      axiosHeaders.set("Authorization", `Bearer ${token}`)
      return
    }

    const recordHeaders = config.headers as Record<string, unknown>
    recordHeaders.Authorization = `Bearer ${token}`
  }

  // Ignite boilerplate — 미사용, 추후 제거 예정
  async getEpisodes(): Promise<{ kind: "ok" } | GeneralApiProblem> {
    const response = await this.apisauce.get("")
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }
    return { kind: "ok" }
  }

  private hasAuthorizationHeader(headers?: RetryableRequestConfig["headers"]): boolean {
    if (!headers) return false

    const axiosHeaders = headers as AxiosHeaders

    if (typeof axiosHeaders.get === "function") {
      const value = axiosHeaders.get("Authorization")
      return typeof value === "string" && value.length > 0
    }

    if (typeof headers !== "object") {
      return false
    }

    const recordHeaders = headers as Record<string, unknown>
    const key = Object.keys(recordHeaders).find((name) => name.toLowerCase() === "authorization")

    if (!key) return false

    const value = recordHeaders[key]
    return typeof value === "string" && value.length > 0
  }
}

export const api = new Api()
