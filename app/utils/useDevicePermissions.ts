import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { AppState, AppStateStatus, Linking, Platform } from "react-native"
import type { NotificationOption, Permission, PermissionStatus } from "react-native-permissions"
import { logDevError } from "@/utils/logDevError"

export type DevicePermissionType = "camera" | "microphone" | "photos" | "notifications"
export type DevicePermissionCategory = "granted" | "limited" | "denied" | "blocked" | "unavailable"

type PermissionsModule = typeof import("react-native-permissions")

const FALLBACK_RESULTS = {
  UNAVAILABLE: "unavailable",
  DENIED: "denied",
  BLOCKED: "blocked",
  GRANTED: "granted",
  LIMITED: "limited",
} as const satisfies Record<string, PermissionStatus>

const DEFAULT_PERMISSION_TYPES: DevicePermissionType[] = [
  "camera",
  "microphone",
  "notifications",
  "photos",
]

// eslint-disable-next-line @typescript-eslint/no-var-requires
const permissionsModule: PermissionsModule | null =
  Platform.OS === "web" ? null : require("react-native-permissions")

const RESULTS = permissionsModule?.RESULTS ?? FALLBACK_RESULTS

const ANDROID_API_LEVEL =
  Platform.OS === "android"
    ? typeof Platform.Version === "number"
      ? Platform.Version
      : parseInt(`${Platform.Version}`, 10) || 0
    : 0

const isWeb = Platform.OS === "web"

type PermissionStateMap = Record<DevicePermissionType, DevicePermissionSnapshot>
export interface DevicePermissionSnapshot {
  type: DevicePermissionType
  status: PermissionStatus
  category: DevicePermissionCategory
  isGranted: boolean
}

const NOTIFICATION_OPTIONS: NotificationOption[] = ["alert", "sound", "badge"]

export interface UseDevicePermissionsResult {
  permissions: DevicePermissionSnapshot[]
  refreshAll: () => Promise<void>
  isRefreshing: boolean
  openSystemSettings: () => Promise<void>
  requestPermission: (type: DevicePermissionType) => Promise<void>
}

/**
 * 권한 상태를 UI에서 사용할 카테고리로 변환한다.
 * @param status 현재 권한 상태
 * @returns UI 표시용 카테고리
 */
const mapStatusToCategory = (status: PermissionStatus): DevicePermissionCategory => {
  switch (status) {
    case RESULTS.GRANTED:
      return "granted"
    case RESULTS.LIMITED:
      return "limited"
    case RESULTS.DENIED:
      return "denied"
    case RESULTS.BLOCKED:
      return "blocked"
    default:
      return "unavailable"
  }
}

/**
 * 제한 허용(Photos limited)까지 허용된 상태로 간주한다.
 * @param status 현재 권한 상태
 * @returns 허용 여부
 */
const isGrantedStatus = (status: PermissionStatus) =>
  status === RESULTS.GRANTED || status === RESULTS.LIMITED

/**
 * 모니터링 대상 권한에 대한 기본 상태를 생성한다.
 * @param monitoredTypes 관찰 중인 권한 목록
 * @returns 권한 상태 맵
 */
const createDefaultState = (monitoredTypes: DevicePermissionType[]): PermissionStateMap => {
  return monitoredTypes.reduce<PermissionStateMap>((acc, type) => {
    acc[type] = {
      type,
      status: isWeb ? RESULTS.GRANTED : RESULTS.UNAVAILABLE,
      category: isWeb ? "granted" : "unavailable",
      isGranted: isWeb,
    }
    return acc
  }, {} as PermissionStateMap)
}

/**
 * 플랫폼 별 권한 상수를 RN Permissions 모듈에서 찾아 반환한다.
 * @param type 조회할 기기 권한 종류
 * @returns 네이티브 권한 상수 또는 undefined
 */
const resolvePermissionConstants = (type: DevicePermissionType): Permission[] => {
  if (!permissionsModule) return []

  if (Platform.OS === "ios") {
    const iosPermissions = permissionsModule.PERMISSIONS?.IOS
    if (!iosPermissions) return []

    switch (type) {
      case "camera":
        return iosPermissions.CAMERA ? [iosPermissions.CAMERA] : []
      case "microphone":
        return iosPermissions.MICROPHONE ? [iosPermissions.MICROPHONE] : []
      case "photos": {
        const values = [iosPermissions.PHOTO_LIBRARY, iosPermissions.PHOTO_LIBRARY_ADD_ONLY]
        return values.filter(Boolean) as Permission[]
      }
      default:
        return []
    }
  }

  if (Platform.OS === "android") {
    const androidPermissions = permissionsModule.PERMISSIONS?.ANDROID
    if (!androidPermissions) return []

    switch (type) {
      case "camera":
        return androidPermissions.CAMERA ? [androidPermissions.CAMERA] : []
      case "microphone":
        return androidPermissions.RECORD_AUDIO ? [androidPermissions.RECORD_AUDIO] : []
      case "photos": {
        if (ANDROID_API_LEVEL >= 33 && androidPermissions.READ_MEDIA_IMAGES) {
          return [androidPermissions.READ_MEDIA_IMAGES]
        }
        const fallback =
          androidPermissions.READ_EXTERNAL_STORAGE ?? androidPermissions.READ_MEDIA_IMAGES
        return fallback ? [fallback] : []
      }
      default:
        return []
    }
  }

  return []
}

const loadNotificationStatus = async (): Promise<PermissionStatus> => {
  if (isWeb) return RESULTS.GRANTED
  if (!permissionsModule?.checkNotifications) return RESULTS.UNAVAILABLE

  try {
    const result = await permissionsModule.checkNotifications()
    return result?.status ?? RESULTS.UNAVAILABLE
  } catch (error) {
    logDevError("Failed to refresh notification permission", error)
    return RESULTS.UNAVAILABLE
  }
}

const STATUS_PRIORITY: Record<PermissionStatus, number> = {
  granted: 4,
  limited: 3,
  denied: 2,
  blocked: 1,
  unavailable: 0,
}

/**
 * 기기 권한 상태를 조회하고 앱 포그라운드 전환 시 자동으로 갱신한다.
 * @param monitoredTypes 감시할 권한 종류 목록, 기본은 모든 핵심 권한
 * @returns 권한 스냅샷 배열과 갱신/설정 이동 핸들러
 */
export function useDevicePermissions(
  monitoredTypes: DevicePermissionType[] = DEFAULT_PERMISSION_TYPES,
): UseDevicePermissionsResult {
  const uniqueTypes = useMemo(
    () => Array.from(new Set(monitoredTypes)) as DevicePermissionType[],
    [monitoredTypes],
  )
  const [permissionMap, setPermissionMap] = useState<PermissionStateMap>(() =>
    createDefaultState(uniqueTypes),
  )
  const [isRefreshing, setIsRefreshing] = useState(false)
  const appState = useRef<AppStateStatus>(AppState.currentState)

  const refreshAll = useCallback(async () => {
    if (isWeb || !permissionsModule?.checkMultiple) {
      setPermissionMap(createDefaultState(uniqueTypes))
      return
    }

    setIsRefreshing(true)
    try {
      const includeNotifications = uniqueTypes.includes("notifications")
      const permissionEntries = uniqueTypes
        .filter((type) => type !== "notifications")
        .map((type) => ({
          type,
          natives: resolvePermissionConstants(type),
        }))
      const nativePermissions = Array.from(
        new Set(
          permissionEntries
            .flatMap((entry) => entry.natives)
            .filter((permission): permission is Permission => Boolean(permission)),
        ),
      )

      const results: Partial<Record<Permission, PermissionStatus>> = nativePermissions.length
        ? await permissionsModule.checkMultiple(nativePermissions)
        : {}

      const notificationStatus = includeNotifications ? await loadNotificationStatus() : null

      setPermissionMap((prev) => {
        const next = { ...prev }
        permissionEntries.forEach(({ type, natives }) => {
          const statuses = natives
            .map((permission) => results[permission])
            .filter((status): status is PermissionStatus => Boolean(status))

          const status = (() => {
            if (!natives.length) {
              return isWeb ? RESULTS.GRANTED : RESULTS.UNAVAILABLE
            }
            if (!statuses.length) {
              return RESULTS.UNAVAILABLE
            }
            return statuses.sort((a, b) => STATUS_PRIORITY[b] - STATUS_PRIORITY[a])[0]
          })()

          next[type] = {
            type,
            status,
            category: mapStatusToCategory(status),
            isGranted: isGrantedStatus(status),
          }
        })

        if (includeNotifications) {
          const status = notificationStatus ?? (isWeb ? RESULTS.GRANTED : RESULTS.UNAVAILABLE)
          next.notifications = {
            type: "notifications",
            status,
            category: mapStatusToCategory(status),
            isGranted: isGrantedStatus(status),
          }
        }

        return next
      })
    } catch (error) {
      logDevError("Failed to refresh device permissions", error)
      setPermissionMap((prev) => {
        const next = { ...prev }
        uniqueTypes.forEach((type) => {
          next[type] = {
            type,
            status: RESULTS.UNAVAILABLE,
            category: "unavailable",
            isGranted: isWeb,
          }
        })
        return next
      })
    } finally {
      setIsRefreshing(false)
    }
  }, [uniqueTypes])

  useEffect(() => {
    setPermissionMap((prev) => {
      const next = { ...prev }
      uniqueTypes.forEach((type) => {
        if (!next[type]) {
          next[type] = {
            type,
            status: isWeb ? RESULTS.GRANTED : RESULTS.UNAVAILABLE,
            category: isWeb ? "granted" : "unavailable",
            isGranted: isWeb,
          }
        }
      })
      return next
    })
  }, [uniqueTypes])

  useEffect(() => {
    void refreshAll()
  }, [refreshAll])

  useEffect(() => {
    if (isWeb) return

    const handleAppStateChange = (nextAppState: AppStateStatus) => {
      if (appState.current.match(/inactive|background/) && nextAppState === "active") {
        void refreshAll()
      }
      appState.current = nextAppState
    }

    const subscription = AppState.addEventListener("change", handleAppStateChange)
    return () => subscription.remove()
  }, [refreshAll])

  const openSystemSettings = useCallback(async () => {
    if (isWeb) return
    try {
      await Linking.openSettings()
    } catch (error) {
      logDevError("Failed to open system settings", error)
    }
  }, [])

  /**
   * 사용자가 차단하지 않은 권한에 대해 OS 권한 요청 다이얼로그를 호출한다.
   * @param type 재요청할 권한 종류
   * @returns 권한 재요청 Promise
   */
  const requestPermission = useCallback(
    async (type: DevicePermissionType) => {
      if (isWeb || !permissionsModule) return

      if (type === "notifications") {
        if (!permissionsModule.requestNotifications) return
        try {
          const result = await permissionsModule.requestNotifications(NOTIFICATION_OPTIONS)
          const status = result?.status ?? RESULTS.UNAVAILABLE
          setPermissionMap((prev) => ({
            ...prev,
            notifications: {
              type: "notifications",
              status,
              category: mapStatusToCategory(status),
              isGranted: isGrantedStatus(status),
            },
          }))
        } catch (error) {
          logDevError("Failed to request notification permission", error)
        } finally {
          await refreshAll()
        }
        return
      }

      const natives = resolvePermissionConstants(type)
      if (!natives.length) return

      try {
        let statuses: PermissionStatus[] = []

        if (natives.length > 1 && permissionsModule.requestMultiple) {
          const results = await permissionsModule.requestMultiple(natives)
          statuses = natives
            .map((permission) => results[permission])
            .filter((status): status is PermissionStatus => Boolean(status))
        } else {
          const singleResults = await Promise.all(
            natives.map((permission) => permissionsModule.request(permission)),
          )
          statuses = singleResults
        }

        const status =
          statuses.sort((a, b) => STATUS_PRIORITY[b] - STATUS_PRIORITY[a])[0] ?? RESULTS.UNAVAILABLE

        setPermissionMap((prev) => ({
          ...prev,
          [type]: {
            type,
            status,
            category: mapStatusToCategory(status),
            isGranted: isGrantedStatus(status),
          },
        }))
      } catch (error) {
        logDevError(`Failed to request ${type} permission`, error)
      } finally {
        await refreshAll()
      }
    },
    [refreshAll],
  )

  const permissions = useMemo(() => {
    return uniqueTypes.map(
      (type) =>
        permissionMap[type] ?? {
          type,
          status: isWeb ? RESULTS.GRANTED : RESULTS.UNAVAILABLE,
          category: isWeb ? "granted" : "unavailable",
          isGranted: isWeb,
        },
    )
  }, [permissionMap, uniqueTypes])

  return {
    permissions,
    refreshAll,
    isRefreshing,
    openSystemSettings,
    requestPermission,
  }
}
