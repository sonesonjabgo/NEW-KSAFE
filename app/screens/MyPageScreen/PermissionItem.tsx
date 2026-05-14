import { TextStyle, TouchableOpacity, View, ViewStyle } from "react-native"

import { Text } from "@/components/Text"
import { Switch } from "@/components/Toggle/Switch"
import { useAppTheme } from "@/theme/context"
import type { ThemedStyle } from "@/theme/types"

interface PermissionItemProps {
  icon: React.ComponentType<{ width: number; height: number; color: string }>
  title: string
  description: string
  rightType: "button" | "toggle"
  buttonText?: string
  toggleValue?: boolean
  onButtonPress?: () => void
  onToggleChange?: (value: boolean) => void
  bottomSeparator?: boolean
}

export function PermissionItem({
  icon: Icon,
  title,
  description,
  rightType,
  buttonText = "Allow",
  toggleValue = false,
  onButtonPress,
  onToggleChange,
  bottomSeparator = false,
}: PermissionItemProps) {
  const {
    theme: { colors },
    themed,
  } = useAppTheme()

  return (
    <View style={[themed($container), bottomSeparator && themed($bottomSeparator)]}>
      <View style={themed($leftContent)}>
        <View style={themed($iconContainer)}>
          <Icon width={24} height={24} color={colors.tint} />
        </View>

        <View style={themed($textContainer)}>
          <Text size="sm" weight="medium" text={title} style={themed($titleText)} />
          <Text size="xs" weight="normal" text={description} style={themed($descriptionText)} />
        </View>
      </View>

      <View style={themed($rightContent)}>
        {rightType === "button" && (
          <TouchableOpacity
            style={themed($allowButton)}
            onPress={onButtonPress}
            activeOpacity={0.7}
            disabled={!onButtonPress}
          >
            <Text size="xs" weight="medium" text={buttonText} style={themed($allowButtonText)} />
          </TouchableOpacity>
        )}

        {rightType === "toggle" && (
          <Switch value={toggleValue} onValueChange={onToggleChange} accessibilityRole="switch" />
        )}
      </View>
    </View>
  )
}

const $container: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  paddingVertical: spacing.md,
  paddingHorizontal: spacing.md,
})

const $bottomSeparator: ThemedStyle<ViewStyle> = ({ colors }) => ({
  borderBottomWidth: 1,
  borderBottomColor: colors.separator,
})

const $leftContent: ViewStyle = {
  flex: 1,
  flexDirection: "row",
  alignItems: "center",
}

const $iconContainer: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  width: 48,
  height: 48,
  borderRadius: 8,
  backgroundColor: "rgba(199, 101, 66, 0.1)",
  justifyContent: "center",
  alignItems: "center",
  marginRight: spacing.md,
})

const $textContainer: ViewStyle = {
  flex: 1,
}

const $titleText: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.text,
  marginBottom: 4,
})

const $descriptionText: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.textDim,
})

const $rightContent: ViewStyle = {
  marginStart: 8,
}

const $allowButton: ThemedStyle<ViewStyle> = ({ colors, spacing }) => ({
  paddingVertical: spacing.xs,
  paddingHorizontal: spacing.sm,
  borderRadius: 4,
  backgroundColor: colors.palette.neutral100,
})

const $allowButtonText: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.tint,
})
