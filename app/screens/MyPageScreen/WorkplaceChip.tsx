import { TextStyle, TouchableOpacity, ViewStyle } from "react-native"
import { Building } from "lucide-react-native"

import { Text } from "@/components/Text"
import { useAppTheme } from "@/theme/context"
import type { ThemedStyle } from "@/theme/types"

interface WorkplaceChipProps {
  workplaceName: string
  onPress?: () => void
}

export function WorkplaceChip({ workplaceName, onPress }: WorkplaceChipProps) {
  const {
    theme: { colors, spacing },
    themed,
  } = useAppTheme()

  return (
    <TouchableOpacity
      style={themed($container)}
      onPress={onPress}
      activeOpacity={0.7}
      disabled={!onPress}
    >
      <Building width={20} height={20} color={colors.palette.neutral600} />
      <Text size="sm" weight="medium" text={workplaceName} style={themed($workplaceText)} />
    </TouchableOpacity>
  )
}

const $container: ThemedStyle<ViewStyle> = ({ colors, spacing }) => ({
  flexDirection: "row",
  alignItems: "center",
  backgroundColor: colors.palette.neutral200,
  borderRadius: 8,
  paddingVertical: spacing.sm,
  paddingHorizontal: spacing.md,
  marginHorizontal: spacing.md,
  marginVertical: spacing.sm,
})

const $workplaceText: ThemedStyle<TextStyle> = ({ spacing }) => ({
  marginStart: spacing.xs,
})
