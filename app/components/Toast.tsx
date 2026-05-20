import { FC, ReactNode, useEffect, useMemo, useRef } from "react"
import { Animated, TextStyle, View, ViewStyle } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"

import { typography } from "@/theme/typography"

import { Text } from "./Text"

interface ToastProps {
  /** Toast 표시 여부 — true로 바뀌면 애니메이션 시작 */
  visible: boolean
  /** 표시할 메시지 문자열 */
  message: string
  /** 좌측 원형 아이콘 영역 안에 들어갈 ReactNode */
  icon: ReactNode
  /** 아이콘 원 배경색 (기본: #1062D8) */
  iconCircleColor?: string
  /** Toast 배경색 (기본: #F2F5F6) */
  backgroundColor?: string
  /** 텍스트 색상 (기본: #333333) */
  textColor?: string
  /** 표시 유지 시간 ms (기본: 2000) */
  duration?: number
  /** fade-out 완료 후 호출 — 부모에서 visible=false 처리 */
  onHide?: () => void
}

export const Toast: FC<ToastProps> = ({
  visible,
  message,
  icon,
  iconCircleColor = "#1062D8",
  backgroundColor = "#F2F5F6",
  textColor = "#333333",
  duration = 2000,
  onHide,
}) => {
  const insets = useSafeAreaInsets()
  const anim = useRef(new Animated.Value(0)).current

  // onHide를 ref에 유지해서 stale closure 방지
  const onHideRef = useRef(onHide)
  useEffect(() => {
    onHideRef.current = onHide
  }, [onHide])

  useEffect(() => {
    if (!visible) return
    anim.setValue(0)
    Animated.sequence([
      Animated.timing(anim, { toValue: 1, duration: 250, useNativeDriver: true }),
      Animated.delay(duration),
      Animated.timing(anim, { toValue: 0, duration: 250, useNativeDriver: true }),
    ]).start(() => onHideRef.current?.())
  }, [visible, duration, anim])

  const $containerStyle = useMemo<ViewStyle>(
    () => ({ ...$toastBase, backgroundColor }),
    [backgroundColor],
  )

  const $circleStyle = useMemo<ViewStyle>(
    () => ({ ...$iconCircleBase, backgroundColor: iconCircleColor }),
    [iconCircleColor],
  )

  const $textStyle = useMemo<TextStyle>(
    () => ({ ...$toastTextBase, color: textColor }),
    [textColor],
  )

  if (!visible) return null

  const top = Math.max(100, insets.top + 60) + 8

  return (
    <Animated.View style={[$containerStyle, { opacity: anim, top }]}>
      <View style={$circleStyle}>{icon}</View>
      <Text text={message} style={$textStyle} />
    </Animated.View>
  )
}

// ── Styles ────────────────────────────────────────────────────────────────────

const $toastBase: ViewStyle = {
  position: "absolute",
  left: 20,
  right: 20,
  height: 45,
  borderRadius: 10,
  paddingHorizontal: 16,
  flexDirection: "row",
  alignItems: "center",
  gap: 12,
  zIndex: 9999,
  elevation: 20,
}

const $iconCircleBase: ViewStyle = {
  width: 24,
  height: 24,
  borderRadius: 12,
  justifyContent: "center",
  alignItems: "center",
}

const $toastTextBase: TextStyle = {
  flex: 1,
  fontSize: 14,
  fontFamily: typography.primary.semiBold,
}
