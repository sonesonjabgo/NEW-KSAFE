import { FC } from "react"
import { Image, TouchableOpacity, View } from "react-native"

import { Text } from "@/components/Text"
import { translate } from "@/i18n/translate"

import type { IntroSlideData } from "../mockData"
import * as S from "../styles"

interface IntroSlideProps {
  slide: IntroSlideData
  currentIndex: number
  total: number
  onDotPress?: (index: number) => void
}

export const IntroSlide: FC<IntroSlideProps> = ({ slide, currentIndex, total, onDotPress }) => (
  <View style={S.$slide}>
    {/* 이미지~pagination을 하나의 View로 묶어 $slide의 justifyContent: center로 세로 중앙 정렬 */}
    <View style={S.$slideContent}>
      <View style={S.$imageContainer}>
        <Image source={slide.image} style={S.$slideImage} resizeMode="contain" />
      </View>

      <View style={S.$stepBadge}>
        <Text text={slide.step} style={S.$stepText} />
      </View>

      <Text text={translate(slide.titleTx)} style={S.$slideTitle} />
      <Text text={translate(slide.descriptionTx)} style={S.$slideDescription} />

      <InlinePagination total={total} currentIndex={currentIndex} onDotPress={onDotPress} />
    </View>
  </View>
)

interface InlinePaginationProps {
  total: number
  currentIndex: number
  onDotPress?: (index: number) => void
}

const InlinePagination: FC<InlinePaginationProps> = ({ total, currentIndex, onDotPress }) => (
  <View style={S.$paginationRow}>
    {Array.from({ length: total }).map((_, i) => (
      <TouchableOpacity key={i} onPress={() => onDotPress?.(i)} activeOpacity={0.7} hitSlop={8}>
        <View style={i === currentIndex ? S.$dotActive : S.$dot} />
      </TouchableOpacity>
    ))}
  </View>
)
