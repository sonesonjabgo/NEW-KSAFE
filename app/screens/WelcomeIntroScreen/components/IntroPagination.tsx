import { FC } from "react"
import { View } from "react-native"

import * as S from "../styles"

interface IntroPaginationProps {
  total: number
  currentIndex: number
}

export const IntroPagination: FC<IntroPaginationProps> = ({ total, currentIndex }) => (
  <View style={S.$paginationRow}>
    {Array.from({ length: total }).map((_, i) => (
      <View key={i} style={i === currentIndex ? S.$dotActive : S.$dot} />
    ))}
  </View>
)
