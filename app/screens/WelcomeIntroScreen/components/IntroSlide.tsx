import { FC } from "react"
import { TextStyle, View, ViewStyle } from "react-native"

import { Text } from "@/components/Text"
import { translate } from "@/i18n/translate"

import type { IntroSlideData } from "../mockData"
import * as S from "../styles"

interface IntroSlideProps {
  slide: IntroSlideData
  screenWidth: number
  isSmallPhone: boolean
  isTablet: boolean
  isShortHeight: boolean
}

export const IntroSlide: FC<IntroSlideProps> = ({
  slide,
  screenWidth,
  isSmallPhone,
  isTablet,
  isShortHeight,
}) => {
  // isShortHeight가 세로 공간 부족을 우선 처리, isSmallPhone은 가로 기준
  const imageSize = isTablet
    ? Math.min(screenWidth * 0.4, 280)
    : isShortHeight
      ? screenWidth * 0.4
      : isSmallPhone
        ? screenWidth * 0.5
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
    marginBottom: isShortHeight ? 14 : isSmallPhone ? 18 : 28,
  }

  const $contentStyle: ViewStyle = isTablet
    ? { ...S.$slideContent, maxWidth: 560, width: "100%", alignSelf: "center" }
    : S.$slideContent

  // breakpoint + isShortHeight별 textBlock minHeight (numberOfLines=3 기준)
  //   isShortHeight+small — title 2줄(25×2=50) + mb 10 + desc 2줄(21×2=42) → 102 → 104
  //   isShortHeight       — title 2줄(29×2=58) + mb 10 + desc 2줄(22×2=44) → 112 → 116
  //   smallPhone          — title 2줄(25×2=50) + mb 12 + desc 3줄(21×3=63) → 125 → 128
  //   base/large          — title 2줄(29×2=58) + mb 18 + desc 3줄(23×3=69) → 145 → 148
  //   tablet              — maxWidth 560 내 base 폰트, 여유 포함 → 160
  const textBlockMinHeight = isShortHeight
    ? isSmallPhone
      ? 104
      : 116
    : isSmallPhone
      ? 128
      : isTablet
        ? 160
        : 148

  const $textBlockStyle: ViewStyle = {
    ...S.$textBlock,
    minHeight: textBlockMinHeight,
  }

  const badgeSize = isSmallPhone || isShortHeight ? 44 : 50

  // JSX 인라인 스타일 객체 금지(react-native/no-inline-styles) 준수를 위해 pre-computed 변수로 선언
  const $badgeStyle: ViewStyle = {
    ...S.$stepBadge,
    width: badgeSize,
    height: badgeSize,
    borderRadius: badgeSize / 2,
    // isShortHeight: badge-title 간격 확보
    marginBottom: isShortHeight ? 14 : isSmallPhone ? 16 : 22,
  }

  const $stepTextStyle: TextStyle =
    isSmallPhone || isShortHeight ? { ...S.$stepText, fontSize: 15 } : S.$stepText

  const $titleStyle: TextStyle = isShortHeight
    ? { ...S.$slideTitle, fontSize: 20, marginBottom: 10 }
    : isSmallPhone
      ? { ...S.$slideTitle, fontSize: 19, marginBottom: 12 }
      : S.$slideTitle

  const $descStyle: TextStyle = isShortHeight
    ? { ...S.$slideDescription, fontSize: 14, lineHeight: 22 }
    : isSmallPhone
      ? { ...S.$slideDescription, fontSize: 14, lineHeight: 21 }
      : S.$slideDescription

  return (
    <View style={$slideStyle}>
      <View style={$contentStyle}>
        <View style={$imageContainerStyle}>
          <slide.SlideImage width="100%" height="100%" />
        </View>

        <View style={$badgeStyle}>
          <Text text={slide.step} style={$stepTextStyle} />
        </View>

        <View style={$textBlockStyle}>
          <Text text={translate(slide.titleTx)} style={$titleStyle} />
          <Text text={translate(slide.descriptionTx)} style={$descStyle} numberOfLines={3} />
        </View>
      </View>
    </View>
  )
}
