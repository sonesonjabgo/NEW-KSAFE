import { FC } from "react"
import { ViewStyle, TextStyle, TouchableOpacity } from "react-native"
import { IconBuilding } from "@tabler/icons-react-native"

import { Text } from "@/components/Text"
import { typography } from "@/theme/typography"

interface WorkplaceChipProps {
  name: string
  onPress?: () => void
}

export const WorkplaceChip: FC<WorkplaceChipProps> = ({ name, onPress }) => {
  return (
    <TouchableOpacity style={$chip} onPress={onPress} activeOpacity={0.7}>
      <IconBuilding size={18} color="#4A6CF7" />
      <Text text={name} style={$chipText} />
    </TouchableOpacity>
  )
}

const $chip: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
  gap: 8,
  backgroundColor: "#EEF0F8",
  borderRadius: 20,
  paddingHorizontal: 16,
  paddingVertical: 10,
  alignSelf: "flex-start",
  marginHorizontal: 20,
  marginTop: 12,
}

const $chipText: TextStyle = {
  fontSize: 14,
  color: "#333333",
  fontFamily: typography.primary.medium,
}
