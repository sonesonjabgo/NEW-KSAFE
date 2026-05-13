import React from "react"
import { View, ViewStyle, TextStyle, TouchableOpacity } from "react-native"
import { Text } from "../Text"
import { Switch } from "../Toggle/Switch"

export interface PermissionItemProps {
  icon: React.FC<any>
  title: string
  description: string
  controlType: "button" | "toggle"
  value?: boolean
  onValueChange?: (value: boolean) => void
  onPressButton?: () => void
}

export const PermissionItem = ({
  icon: IconComponent,
  title,
  description,
  controlType,
  value,
  onValueChange,
  onPressButton,
}: PermissionItemProps) => {
  return (
    <View style={$container}>
      <View style={$iconContainer}>
        <IconComponent size={20} color="#374151" />
      </View>
      <View style={$textContainer}>
        <Text text={title} style={$titleText} />
        <Text text={description} style={$descriptionText} />
      </View>
      <View style={$controlContainer}>
        {controlType === "button" ? (
          <TouchableOpacity onPress={onPressButton} style={$allowButton} activeOpacity={0.7}>
            <Text text="허용" style={$allowButtonText} />
          </TouchableOpacity>
        ) : (
          <Switch value={value} onValueChange={onValueChange} />
        )}
      </View>
    </View>
  )
}

const $container: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
  paddingVertical: 12,
}

const $iconContainer: ViewStyle = {
  width: 40,
  height: 40,
  borderRadius: 12,
  backgroundColor: "#F9FAFB",
  justifyContent: "center",
  alignItems: "center",
  marginRight: 12,
}

const $textContainer: ViewStyle = {
  flex: 1,
}

const $titleText: TextStyle = {
  fontSize: 15,
  fontWeight: "600",
  color: "#111827",
}

const $descriptionText: TextStyle = {
  fontSize: 12,
  color: "#6B7280",
  marginTop: 2,
  lineHeight: 16,
}

const $controlContainer: ViewStyle = {
  marginLeft: 12,
}

const $allowButton: ViewStyle = {
  paddingHorizontal: 14,
  paddingVertical: 6,
  borderRadius: 8,
  backgroundColor: "#F3F4F6",
}

const $allowButtonText: TextStyle = {
  fontSize: 13,
  color: "#4B5563",
  fontWeight: "600",
}
