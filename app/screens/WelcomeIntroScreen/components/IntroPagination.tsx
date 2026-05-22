import { FC } from "react"
import { TouchableOpacity, View } from "react-native"

import * as S from "../styles"

interface IntroPaginationProps {
  total: number
  currentIndex: number
  onDotPress?: (index: number) => void
}

export const IntroPagination: FC<IntroPaginationProps> = ({ total, currentIndex, onDotPress }) => (
  <View style={S.$paginationRow}>
    {Array.from({ length: total }).map((_, i) => (
      <TouchableOpacity key={i} onPress={() => onDotPress?.(i)} activeOpacity={0.7} hitSlop={8}>
        <View style={i === currentIndex ? S.$dotActive : S.$dot} />
      </TouchableOpacity>
    ))}
  </View>
)
