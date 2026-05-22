import { FC } from "react"
import { TouchableOpacity, View, ViewStyle } from "react-native"

import { Text } from "@/components/Text"
import { translate } from "@/i18n/translate"

import type { IntroSlideData } from "../mockData"
import * as S from "../styles"

interface IntroSlideProps {
  slide: IntroSlideData
  currentIndex: number
  total: number
  onDotPress?: (index: number) => void
  screenWidth: number
  isSmallPhone: boolean
  isTablet: boolean
}

export const IntroSlide: FC<IntroSlideProps> = ({
  slide,
  currentIndex,
  total,
  onDotPress,
  screenWidth,
  isSmallPhone,
  isTablet,
}) => {
  const imageSize = isTablet
    ? Math.min(screenWidth * 0.40, 280)
    : isSmallPhone
    ? screenWidth * 0.50
    : screenWidth * 0.55

  const $slideStyle: ViewStyle = {
    width: screenWidth,
    alignItems: "center",
    paddingHorizontal: 32,
  }

  const $imageContainerStyle: ViewStyle = {
    width: imageSize,
    height: imageSize,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: isSmallPhone ? 18 : 28,
  }

  const $contentStyle: ViewStyle = isTablet
    ? { ...S.$slideContent, maxWidth: 560, width: "100%", alignSelf: "center" }
    : S.$slideContent

  // breakpoint별 textBlock minHeight:
  //   smallPhone — title 2줄(25×2=50) + marginBottom 12 + description 3줄(21×3=63) → 128
  //   base/large — title 2줄(29×2=58) + marginBottom 18 + description 4줄(23×4=92) → 170
  //   tablet    — maxWidth 560 내에서 base와 같은 폰트, 줄 수 여유 추가 → 180
  const textBlockMinHeight = isSmallPhone ? 128 : isTablet ? 180 : 170

  const $textBlockStyle: ViewStyle = {
    ...S.$textBlock,
    minHeight: textBlockMinHeight,
  }

  return (
    <View style={$slideStyle}>
      <View style={$contentStyle}>
        <View style={$imageContainerStyle}>
          <slide.SlideImage width="100%" height="100%" />
        </View>

        <View
          style={[
            S.$stepBadge,
            isSmallPhone && { width: 44, height: 44, borderRadius: 22, marginBottom: 16 },
          ]}
        >
          <Text
            text={slide.step}
            style={[S.$stepText, isSmallPhone && { fontSize: 15 }]}
          />
        </View>

        {/* title + description을 고정 높이 블록으로 감싸 pagination 위치 고정 */}
        <View style={$textBlockStyle}>
          <Text
            text={translate(slide.titleTx)}
            style={[S.$slideTitle, isSmallPhone && { fontSize: 19, marginBottom: 12 }]}
          />
          <Text
            text={translate(slide.descriptionTx)}
            style={[S.$slideDescription, isSmallPhone && { fontSize: 14, lineHeight: 21 }]}
            numberOfLines={isSmallPhone ? 3 : 4}
          />
        </View>

        <InlinePagination
          total={total}
          currentIndex={currentIndex}
          onDotPress={onDotPress}
          isSmallPhone={isSmallPhone}
        />
      </View>
    </View>
  )
}

interface InlinePaginationProps {
  total: number
  currentIndex: number
  onDotPress?: (index: number) => void
  isSmallPhone: boolean
}

const InlinePagination: FC<InlinePaginationProps> = ({ total, currentIndex, onDotPress, isSmallPhone }) => (
  <View style={[S.$paginationRow, isSmallPhone && { marginTop: 20 }]}>
    {Array.from({ length: total }).map((_, i) => (
      <TouchableOpacity key={i} onPress={() => onDotPress?.(i)} activeOpacity={0.7} hitSlop={8}>
        <View style={i === currentIndex ? S.$dotActive : S.$dot} />
      </TouchableOpacity>
    ))}
  </View>
)
