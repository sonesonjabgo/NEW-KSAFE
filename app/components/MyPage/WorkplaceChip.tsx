import React from "react"
import { View, ViewStyle, TextStyle } from "react-native"
import { Text } from "../Text"
import { Building2 } from "lucide-react-native"

export interface WorkplaceChipProps {
  workplaceName: string
}

export const WorkplaceChip = ({ workplaceName }: WorkplaceChipProps) => {
  return (
    <View style={$container}>
      <Building2 size={16} color="#6B7280" style={$icon} />
      <Text text={workplaceName} style={$text} />
    </View>
  )
}

const $container: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
  backgroundColor: "#F3F4F6",
  paddingHorizontal: 12,
  paddingVertical: 8,
  borderRadius: 8,
  alignSelf: "flex-start",
  marginTop: 16,
}

const $icon: ViewStyle = {
  marginRight: 6,
}

const $text: TextStyle = {
  fontSize: 14,
  color: "#374151",
  fontWeight: "500",
}
