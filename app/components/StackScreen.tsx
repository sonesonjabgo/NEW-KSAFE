import { ReactNode } from "react"
import { TouchableOpacity, View, ViewStyle, TextStyle } from "react-native"
import { IconChevronLeft } from "@tabler/icons-react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"

import { Text } from "@/components/Text"
import { isRTL } from "@/i18n"
import { colors } from "@/theme/colors"
import { typography } from "@/theme/typography"

interface StackScreenProps {
  title: string
  onBack?: () => void
  /** 헤더 우측 슬롯. 없으면 레이아웃 균형용 빈 뷰 렌더링 */
  rightSlot?: ReactNode
  /** 콘텐츠 영역 배경색. 기본값: colors.screenBg */
  contentBg?: string
  /** true이면 콘텐츠 영역 상단 radius를 제거한다. 기본값: false */
  squareTop?: boolean
  /** 헤더 바로 아래, 콘텐츠 영역 위에 네이비 배경으로 노출되는 추가 영역 */
  headerExtra?: ReactNode
  /** 뒤로가기 버튼 추가 좌측 오프셋. 기본값: 0 */
  backOffset?: number
  /** 우측 슬롯 추가 우측 오프셋 (paddingRight 증가). 기본값: 0 */
  rightOffset?: number
  children: ReactNode
}

/**
 * 스택 네비게이션 화면의 공통 레이아웃.
 * 네이비 배경 루트 + SafeArea 처리 + 헤더(뒤로가기/제목/우측 슬롯) + 라운드 상단 콘텐츠 영역을 제공한다.
 *
 * 사용 예:
 * ```tsx
 * <StackScreen
 *   title={translate("myScreen:title")}
 *   onBack={() => navigation.goBack()}
 *   rightSlot={<TouchableOpacity onPress={handleAction}><IconTrash /></TouchableOpacity>}
 * >
 *   {content}
 * </StackScreen>
 * ```
 */
export function StackScreen({
  title,
  onBack,
  rightSlot,
  contentBg = colors.screenBg,
  squareTop = false,
  backOffset = 0,
  rightOffset = 0,
  headerExtra,
  children,
}: StackScreenProps) {
  const insets = useSafeAreaInsets()

  return (
    <View style={$root}>
      <View style={[$header, { paddingTop: insets.top + 10, paddingLeft: Math.max(0, 17 - backOffset), paddingRight: Math.max(0, 20 - rightOffset) }]}>
        <TouchableOpacity
          style={$headerSide}
          onPress={onBack}
          disabled={!onBack}
          activeOpacity={0.7}
        >
          {onBack && (
            <View style={isRTL ? $chevronRTL : undefined}>
              <IconChevronLeft size={24} color="#FFFFFF" />
            </View>
          )}
        </TouchableOpacity>

        <View
          style={[$headerTitleContainer, { top: insets.top + 10, bottom: 14 }]}
          pointerEvents="none"
        >
          <Text text={title} style={$headerTitle} />
        </View>

        <View style={[$headerSide, $headerSideRight]}>{rightSlot ?? null}</View>
      </View>

      {headerExtra && <View style={$headerExtra}>{headerExtra}</View>}

      <View style={[$content, squareTop && $contentSquareTop, { backgroundColor: contentBg }]}>
        {children}
      </View>
    </View>
  )
}

const $root: ViewStyle = {
  flex: 1,
  backgroundColor: colors.navy,
}

const $header: ViewStyle = {
  backgroundColor: colors.navy,
  flexDirection: isRTL ? "row-reverse" : "row",
  alignItems: "center",
  justifyContent: "space-between",
  paddingHorizontal: 20,
  paddingBottom: 14,
  minHeight: 100,
}

const $headerSide: ViewStyle = {
  width: 44,
  height: 36,
  justifyContent: "center",
  alignItems: "flex-start",
  transform: [{ translateY: 2 }],
}

const $headerSideRight: ViewStyle = {
  width: "auto",
  alignItems: isRTL ? "flex-start" : "flex-end",
  transform: [{ translateY: 1 }],
}

const $chevronRTL: ViewStyle = {
  transform: [{ scaleX: -1 }],
}

const $headerTitleContainer: ViewStyle = {
  position: "absolute",
  left: 0,
  right: 0,
  justifyContent: "center",
  alignItems: "center",
}

const $headerTitle: TextStyle = {
  fontSize: 20,
  lineHeight: 24,
  fontFamily: typography.primary.semiBold,
  color: "#FFFFFF",
  textAlign: "center",
  includeFontPadding: false,
  textAlignVertical: "center",
}

const $headerExtra: ViewStyle = {
  backgroundColor: colors.navy,
  alignItems: "center",
  marginTop: -12,
  paddingBottom: 16,
}

const $content: ViewStyle = {
  flex: 1,
  borderTopLeftRadius: 20,
  borderTopRightRadius: 20,
  overflow: "hidden",
}

const $contentSquareTop: ViewStyle = {
  borderTopLeftRadius: 0,
  borderTopRightRadius: 0,
}
