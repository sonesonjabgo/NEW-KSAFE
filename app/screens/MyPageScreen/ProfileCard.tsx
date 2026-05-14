import { TextStyle, View, ViewStyle } from "react-native"
import { User } from "lucide-react-native"

import { Text } from "@/components/Text"
import { useAppTheme } from "@/theme/context"
import type { ThemedStyle } from "@/theme/types"

interface ProfileCardProps {
  company: string
  name: string
  email: string
}

export function ProfileCard({ company, name, email }: ProfileCardProps) {
  const {
    theme: { colors },
    themed,
  } = useAppTheme()

  return (
    <View style={themed($container)}>
      <View style={themed($avatarContainer)}>
        <User width={48} height={48} color={colors.palette.neutral100} />
      </View>

      <View style={themed($textContainer)}>
        <Text size="xs" weight="medium" text={company} style={themed($companyText)} />
        <Text size="lg" weight="bold" text={name} style={themed($nameText)} />
        <Text size="xs" weight="normal" text={email} style={themed($emailText)} />
      </View>
    </View>
  )
}

const $container: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flexDirection: "row",
  alignItems: "center",
  backgroundColor: "#1B2559",
  borderRadius: 12,
  padding: spacing.lg,
  marginHorizontal: spacing.md,
  marginVertical: spacing.md,
})

const $avatarContainer: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  width: 60,
  height: 60,
  borderRadius: 30,
  backgroundColor: "rgba(255, 255, 255, 0.15)",
  justifyContent: "center",
  alignItems: "center",
  marginRight: spacing.md,
})

const $textContainer: ViewStyle = {
  flex: 1,
  justifyContent: "center",
}

const $companyText: TextStyle = {
  color: "rgba(255, 255, 255, 0.6)",
  marginBottom: 4,
}

const $nameText: TextStyle = {
  color: "#FFFFFF",
  marginBottom: 4,
}

const $emailText: TextStyle = {
  color: "rgba(255, 255, 255, 0.5)",
}
