import { Buffer } from "buffer"

import { logDevError } from "@/utils/logDevError"

export interface AccessTokenUserMetadata {
  role?: string | string[]
  roles?: string[]
  permissions?: string | string[]
  [key: string]: unknown
}

export interface AccessTokenPayload {
  role?: string | string[]
  user_metadata?: AccessTokenUserMetadata
  permissions?: string | string[]
  [key: string]: unknown
}

const normalizeBase64Segment = (segment: string): string => {
  const replaced = segment.replace(/-/g, "+").replace(/_/g, "/")
  const remainder = replaced.length % 4
  if (remainder === 0) return replaced
  return replaced.concat("=".repeat(4 - remainder))
}

const decodeBase64Url = (segment: string): string | null => {
  try {
    const normalized = normalizeBase64Segment(segment)
    return Buffer.from(normalized, "base64").toString("utf-8")
  } catch (error) {
    logDevError("Failed to decode base64url segment", error)
    return null
  }
}

export const decodeJwtPayload = <T = AccessTokenPayload>(token?: string | null): T | null => {
  if (!token) return null
  const [, payloadSegment] = token.split(".")
  if (!payloadSegment) return null

  const json = decodeBase64Url(payloadSegment)
  if (!json) return null

  try {
    return JSON.parse(json) as T
  } catch (error) {
    logDevError("Failed to parse JWT payload", error)
    return null
  }
}

const extractStringValues = (value: unknown): string[] => {
  if (!value) return []
  if (Array.isArray(value)) {
    return value
      .map((item) => (typeof item === "string" ? item.trim() : ""))
      .filter((item): item is string => item.length > 0)
  }
  if (typeof value === "string") {
    const trimmed = value.trim()
    return trimmed.length > 0 ? [trimmed] : []
  }
  return []
}

export const getRolesFromAccessToken = (token?: string | null): string[] => {
  const payload = decodeJwtPayload<AccessTokenPayload>(token)
  if (!payload) return []

  const roleSet = new Set<string>()
  const metadata = payload.user_metadata

  if (metadata) {
    extractStringValues(metadata.role).forEach((role) => roleSet.add(role))
    extractStringValues(metadata.roles).forEach((role) => roleSet.add(role))
  }

  if (roleSet.size === 0) {
    extractStringValues(payload.role).forEach((role) => roleSet.add(role))
  }

  return Array.from(roleSet)
}
