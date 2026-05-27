import { api } from "./index"
import { GeneralApiProblem, getGeneralApiProblem } from "./apiProblem"
import type { MyProfileResponseDto } from "./profile"

// ── 엔드포인트 ─────────────────────────────────────────────────────────────────

const LANGUAGES_ENDPOINT = "/api/v1/common/languages"
const USER_PROFILE_ENDPOINT = "/api/v1/common/users/profile"
const PREFERRED_LANGUAGE_ENDPOINT = "/api/v1/common/users/preferred-language"

// ── 타입 ──────────────────────────────────────────────────────────────────────

export interface LanguageItemDto {
  id: number
  code: string
  sortOrder: number
  nativeName: string
}

export type GetLanguagesResult = { kind: "ok"; items: LanguageItemDto[] } | GeneralApiProblem
export type GetUserProfileResult = { kind: "ok"; profile: MyProfileResponseDto } | GeneralApiProblem
export type PatchPreferredLanguageResult = { kind: "ok" } | GeneralApiProblem

// ── API 함수 ──────────────────────────────────────────────────────────────────

/**
 * 서버에서 지원하는 언어 목록을 조회합니다.
 * GET /api/v1/common/languages
 * 응답이 배열 또는 { items: [...] } 객체 형태 모두 처리합니다.
 */
export async function getLanguages(authToken: string): Promise<GetLanguagesResult> {
  const response = await api.apisauce.get<LanguageItemDto[] | { items?: LanguageItemDto[] }>(
    LANGUAGES_ENDPOINT,
    undefined,
    { headers: { Authorization: `Bearer ${authToken}`, accept: "application/json" } },
  )

  if (!response.ok) {
    return getGeneralApiProblem(response) ?? { kind: "unknown", temporary: true }
  }

  const data = response.data
  const items: LanguageItemDto[] = Array.isArray(data)
    ? (data as LanguageItemDto[])
    : Array.isArray((data as { items?: LanguageItemDto[] })?.items)
      ? (data as { items: LanguageItemDto[] }).items
      : []

  return { kind: "ok", items }
}

/**
 * 내 프로필(preferredLanguageCode 포함)을 조회합니다.
 * GET /api/v1/common/users/profile
 * Note: profile.ts의 fetchMyProfile(throw 방식)과 동일 엔드포인트이나,
 * LanguageSettingsScreen의 kind 체크 패턴에 맞게 별도 구현합니다.
 */
export async function getUserProfile(authToken: string): Promise<GetUserProfileResult> {
  const response = await api.apisauce.get<MyProfileResponseDto>(
    USER_PROFILE_ENDPOINT,
    undefined,
    { headers: { Authorization: `Bearer ${authToken}`, accept: "application/json" } },
  )

  if (!response.ok || !response.data) {
    return getGeneralApiProblem(response) ?? { kind: "unknown", temporary: true }
  }

  return { kind: "ok", profile: response.data }
}

/**
 * 서버에 선호 언어를 저장합니다.
 * PATCH /api/v1/common/users/preferred-language
 * body: { languageId: number }
 */
export async function patchPreferredLanguage(
  authToken: string,
  languageId: number,
): Promise<PatchPreferredLanguageResult> {
  const response = await api.apisauce.patch(
    PREFERRED_LANGUAGE_ENDPOINT,
    { languageId },
    { headers: { Authorization: `Bearer ${authToken}`, accept: "application/json" } },
  )

  if (!response.ok) {
    return getGeneralApiProblem(response) ?? { kind: "unknown", temporary: true }
  }

  return { kind: "ok" }
}
