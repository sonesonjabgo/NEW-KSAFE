import { FC } from "react"
import { TouchableOpacity, View } from "react-native"
import { IconCheck } from "@tabler/icons-react-native"

import { Text } from "@/components/Text"

import { styles } from "../styles"

interface Props {
  label: string
  isSelected: boolean
  onPress: () => void
}

export const LanguageOptionItem: FC<Props> = ({ label, isSelected, onPress }) => (
  <TouchableOpacity
    style={[styles.item, isSelected && styles.itemSelected]}
    activeOpacity={0.7}
    onPress={onPress}
  >
    <View style={styles.itemContent}>
      <Text style={styles.itemLabel}>{label}</Text>
    </View>
    {isSelected && <IconCheck size={20} color="#0B3069" strokeWidth={2.5} />}
  </TouchableOpacity>
)
