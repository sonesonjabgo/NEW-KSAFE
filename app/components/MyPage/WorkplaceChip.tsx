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
      <IconBuilding size={18} color="#FFFFFF" />
      <Text text={name} style={$chipText} />
    </TouchableOpacity>
  )
}

const $chip: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
  gap: 8,
  backgroundColor: "#26416E",
  borderRadius: 12,
  paddingHorizontal: 16,
  width: "100%",
  height: 57,
  marginTop: 17,
}

const $chipText: TextStyle = {
  fontSize: 14,
  color: "#FFFFFF",
  fontFamily: typography.primary.medium,
}
