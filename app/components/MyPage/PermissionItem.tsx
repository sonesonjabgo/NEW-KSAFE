import { FC, ReactNode } from "react"
import { View, ViewStyle, TextStyle, TouchableOpacity } from "react-native"

import { Text } from "@/components/Text"
import { Switch } from "@/components/Toggle/Switch"
import { typography } from "@/theme/typography"

interface PermissionItemProps {
  icon: ReactNode
  title: string
  description: string
  type: "button" | "switch"
  buttonLabel?: string
  switchValue?: boolean
  onSwitchChange?: (value: boolean) => void
  onButtonPress?: () => void
  showDivider?: boolean
}

export const PermissionItem: FC<PermissionItemProps> = ({
  icon,
  title,
  description,
  type,
  buttonLabel = "허용",
  switchValue,
  onSwitchChange,
  onButtonPress,
  showDivider,
}) => {
  return (
    <>
      <View style={$container}>
        <View style={$iconContainer}>{icon}</View>
        <View style={$content}>
          <Text text={title} style={$title} />
          <Text text={description} style={$description} />
        </View>
        <View style={$control}>
          {type === "button" ? (
            <TouchableOpacity onPress={onButtonPress} activeOpacity={0.7}>
              <Text text={buttonLabel} style={$allowButton} />
            </TouchableOpacity>
          ) : (
            <Switch value={switchValue} onValueChange={onSwitchChange} />
          )}
        </View>
      </View>
      {showDivider && <View style={$divider} />}
    </>
  )
}

const $container: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
  paddingHorizontal: 16,
  paddingVertical: 14,
  gap: 12,
}

const $iconContainer: ViewStyle = {
  width: 44,
  height: 44,
  borderRadius: 12,
  backgroundColor: "#F0F3FF",
  justifyContent: "center",
  alignItems: "center",
}

const $content: ViewStyle = {
  flex: 1,
}

const $title: TextStyle = {
  fontSize: 15,
  fontFamily: typography.primary.semiBold,
  color: "#1A1A2E",
  marginBottom: 3,
}

const $description: TextStyle = {
  fontSize: 11,
  fontFamily: typography.primary.normal,
  color: "#9AA0AD",
  lineHeight: 16,
}

const $control: ViewStyle = {
  alignItems: "center",
  justifyContent: "center",
}

const $allowButton: TextStyle = {
  fontSize: 13,
  fontFamily: typography.primary.semiBold,
  color: "#4A6CF7",
}

const $divider: ViewStyle = {
  height: 1,
  backgroundColor: "#F0F2F8",
  marginHorizontal: 16,
}
