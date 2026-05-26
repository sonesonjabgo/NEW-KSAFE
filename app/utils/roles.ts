import { getRolesFromAccessToken } from "./jwt"

export const ROLE_PRIORITY = ["workplace_admin", "user"] as const

type RolePriority = typeof ROLE_PRIORITY
export type UserRole = RolePriority[number]

export const resolvePrimaryRole = (token?: string | null): UserRole => {
  const roles = getRolesFromAccessToken(token)
  return ROLE_PRIORITY.find((role) => roles.includes(role)) ?? "user"
}
