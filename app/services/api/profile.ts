import { api } from "./index"

export interface MyProfileResponseDto {
  email: string
  username: string | null
  phone: string | null
  role: "workplace_admin" | "user" | null
  isActive: boolean
  isProfileCompleted: boolean
  isFcmTokenRegistered: boolean
  preferredLanguageCode: string
}

const USER_PROFILE_ENDPOINT = "/api/v1/common/users/profile"

export async function fetchMyProfile(accessToken: string): Promise<MyProfileResponseDto> {
  const response = await api.apisauce.get<MyProfileResponseDto>(USER_PROFILE_ENDPOINT, undefined, {
    headers: { Authorization: `Bearer ${accessToken}` },
  })

  if (!response.ok || !response.data) {
    throw new Error(
      `Failed to fetch profile (${response.status ?? "unknown"}): ${response.problem ?? "unknown"}`,
    )
  }

  return response.data
}
