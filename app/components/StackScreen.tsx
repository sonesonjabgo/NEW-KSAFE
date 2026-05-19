import { ReactNode } from "react"
import { TouchableOpacity, View, ViewStyle, TextStyle } from "react-native"
import { IconChevronLeft } from "@tabler/icons-react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"

import { Text } from "@/components/Text"
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
  children,
}: StackScreenProps) {
  const insets = useSafeAreaInsets()

  return (
    <View style={$root}>
      <View style={[$header, { paddingTop: insets.top + 10 }]}>
        <TouchableOpacity
          style={$headerSide}
          onPress={onBack}
          disabled={!onBack}
          activeOpacity={0.7}
        >
          {onBack && <IconChevronLeft size={24} color="#FFFFFF" />}
        </TouchableOpacity>

        <Text text={title} style={$headerTitle} />

        <View style={[$headerSide, $headerSideRight]}>{rightSlot ?? null}</View>
      </View>

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
  flexDirection: "row",
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
}

const $headerSideRight: ViewStyle = {
  alignItems: "flex-end",
}

const $headerTitle: TextStyle = {
  flex: 1,
  fontSize: 20,
  fontFamily: typography.primary.semiBold,
  color: "#FFFFFF",
  textAlign: "center",
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
