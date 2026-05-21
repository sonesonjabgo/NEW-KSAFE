import { FC } from "react"
import { Image, View } from "react-native"

import { Text } from "@/components/Text"
import { translate } from "@/i18n/translate"

import type { IntroSlideData } from "../mockData"
import * as S from "../styles"

interface IntroSlideProps {
  slide: IntroSlideData
  currentIndex: number
  total: number
}

export const IntroSlide: FC<IntroSlideProps> = ({ slide, currentIndex, total }) => (
  <View style={S.$slide}>
    <View style={S.$imageContainer}>
      <Image source={slide.image} style={S.$slideImage} resizeMode="contain" />
    </View>

    <View style={S.$stepBadge}>
      <Text text={slide.step} style={S.$stepText} />
    </View>

    <Text text={translate(slide.titleTx)} style={S.$slideTitle} />
    <Text text={translate(slide.descriptionTx)} style={S.$slideDescription} />

    <InlinePagination total={total} currentIndex={currentIndex} />
  </View>
)

// Pagination is co-located here to keep slide layout self-contained
const InlinePagination: FC<{ total: number; currentIndex: number }> = ({ total, currentIndex }) => (
  <View style={S.$paginationRow}>
    {Array.from({ length: total }).map((_, i) => (
      <View key={i} style={i === currentIndex ? S.$dotActive : S.$dot} />
    ))}
  </View>
)
