/**
 * This Api class lets you define an API endpoint and methods to request
 * data and process it.
 *
 * See the [Backend API Integration](https://docs.infinite.red/ignite-cli/boilerplate/app/services/#backend-api-integration)
 * documentation for more details.
 */
import { ApiResponse, ApisauceInstance, create } from "apisauce"

import Config from "@/config"
import type { EpisodeItem, LanguageItem, UserProfile } from "@/services/api/types"

import { GeneralApiProblem, getGeneralApiProblem } from "./apiProblem"
import type { ApiConfig, ApiFeedResponse, LanguagesResponse } from "./types"

/**
 * Configuring the apisauce instance.
 */
export const DEFAULT_API_CONFIG: ApiConfig = {
  url: Config.API_URL,
  timeout: 10000,
}

/**
 * Manages all requests to the API. You can use this class to build out
 * various requests that you need to call from your backend API.
 */
export class Api {
  apisauce: ApisauceInstance
  config: ApiConfig

  /**
   * Set up our API instance. Keep this lightweight!
   */
  constructor(config: ApiConfig = DEFAULT_API_CONFIG) {
    this.config = config
    this.apisauce = create({
      baseURL: this.config.url,
      timeout: this.config.timeout,
      headers: {
        Accept: "application/json",
      },
    })
  }

  /**
   * Gets a list of recent React Native Radio episodes.
   */
  async getEpisodes(): Promise<{ kind: "ok"; episodes: EpisodeItem[] } | GeneralApiProblem> {
    // make the api call
    const response: ApiResponse<ApiFeedResponse> = await this.apisauce.get(
      `api.json?rss_url=https%3A%2F%2Ffeeds.simplecast.com%2FhEI_f9Dx`,
    )

    // the typical ways to die when calling an api
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }

    // transform the data into the format we are expecting
    try {
      const rawData = response.data

      // This is where we transform the data into the shape we expect for our model.
      const episodes: EpisodeItem[] =
        rawData?.items.map((raw) => ({
          ...raw,
        })) ?? []

      return { kind: "ok", episodes }
    } catch (e) {
      if (__DEV__ && e instanceof Error) {
        console.error(`Bad data: ${e.message}\n${response.data}`, e.stack)
      }
      return { kind: "bad-data" }
    }
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
}

// Singleton instance of the API for convenience
export const api = new Api()
