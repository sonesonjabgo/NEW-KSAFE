/**
 * These types indicate the shape of the data you expect to receive from your
 * API endpoint, assuming it's a JSON object like we have.
 */
export interface EpisodeItem {
  title: string
  pubDate: string
  link: string
  guid: string
  author: string
  thumbnail: string
  description: string
  content: string
  enclosure: {
    link: string
    type: string
    length: number
    duration: number
    rating: { scheme: string; value: string }
  }
  categories: string[]
}

export interface ApiFeedResponse {
  status: string
  feed: {
    url: string
    title: string
    link: string
    author: string
    description: string
    image: string
  }
  items: EpisodeItem[]
}

/* ── 언어 설정 API ── */

export interface LanguageItem {
  id: number
  code: string
  name: string
  displayName: string
  nativeName: string
  sortOrder: number
}

export interface LanguagesResponse {
  items: LanguageItem[]
}

export interface UserProfile {
  email: string
  username: string
  phone: string
  role: string
  isActive: boolean
  isProfileCompleted: boolean
  isFcmTokenRegistered: boolean
  preferredLanguageCode: string
}

/* ── API 설정 ── */

/**
 * The options used to configure apisauce.
 */
export interface ApiConfig {
  /**
   * The URL of the api.
   */
  url: string

  /**
   * Milliseconds before we timeout the request.
   */
  timeout: number
}
