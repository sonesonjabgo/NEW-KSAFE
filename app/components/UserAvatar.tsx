import { FC } from "react"
import { View, ViewStyle, TextStyle } from "react-native"

import { Text } from "@/components/Text"
import { typography } from "@/theme/typography"

interface UserAvatarProps {
  initial: string
  size?: number
  bgColor?: string
  textColor?: string
  style?: ViewStyle
}

export const UserAvatar: FC<UserAvatarProps> = ({
  initial,
  size = 24,
  bgColor = "#F3F2F0",
  textColor = "#666666",
  style,
}) => {
  const $circle: ViewStyle = {
    width: size,
    height: size,
    borderRadius: size / 2,
    backgroundColor: bgColor,
    justifyContent: "center",
    alignItems: "center",
    flexShrink: 0,
  }

  const $text: TextStyle = {
    fontSize: size * 0.55,
    fontFamily: typography.primary.bold,
    color: textColor,
    lineHeight: size,
  }

  return (
    <View style={[$circle, style]}>
      <Text text={initial.charAt(0)} style={$text} />
    </View>
  )
}
