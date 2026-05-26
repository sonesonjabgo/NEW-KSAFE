import { FC } from "react"
import { TouchableOpacity, View } from "react-native"
import { IconCheck } from "@tabler/icons-react-native"

import { Text } from "@/components/Text"
import { colors } from "@/theme/colors"

import * as S from "../styles"

interface Props {
  label: string
  isSelected: boolean
  onPress: () => void
  itemHeight: number
  itemPaddingH: number
  itemMarginBottom: number
  labelFontSize: number
  checkIconSize: number
}

export const LanguageOptionItem: FC<Props> = ({
  label,
  isSelected,
  onPress,
  itemHeight,
  itemPaddingH,
  itemMarginBottom,
  labelFontSize,
  checkIconSize,
}) => (
  <TouchableOpacity
    style={[
      S.$item,
      isSelected ? S.$itemSelected : undefined,
      { height: itemHeight, paddingHorizontal: itemPaddingH, marginBottom: itemMarginBottom },
    ]}
    activeOpacity={0.7}
    onPress={onPress}
  >
    <View style={S.$itemContent}>
      <Text
        style={[S.$itemLabel, { fontSize: labelFontSize }]}
        numberOfLines={1}
        ellipsizeMode="tail"
      >
        {label}
      </Text>
    </View>
    {isSelected && <IconCheck size={checkIconSize} color={colors.navy} strokeWidth={2.5} />}
  </TouchableOpacity>
)
