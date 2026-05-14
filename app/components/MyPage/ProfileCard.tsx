import { FC } from "react"
import { View, ViewStyle, TextStyle } from "react-native"
import { IconUser } from "@tabler/icons-react-native"

import { Text } from "@/components/Text"
import { typography } from "@/theme/typography"

interface ProfileCardProps {
  orgName: string
  userName: string
  email: string
}

export const ProfileCard: FC<ProfileCardProps> = ({ orgName, userName, email }) => {
  return (
    <View style={$card}>
      <View style={$avatar}>
        <IconUser size={36} color="#FFFFFF" />
      </View>
      <View style={$textArea}>
        <Text text={orgName} style={$orgName} />
        <Text text={userName} style={$userName} />
        <Text text={email} style={$email} />
      </View>
    </View>
  )
}

const $card: ViewStyle = {
  backgroundColor: "#26416E",
  borderRadius: 16,
  padding: 20,
  flexDirection: "row",
  alignItems: "center",
  gap: 16,
  width: "100%",
  height: 110,
  marginTop: 35,
}

const $avatar: ViewStyle = {
  width: 64,
  height: 64,
  borderRadius: 32,
  backgroundColor: "rgba(255,255,255,0.15)",
  justifyContent: "center",
  alignItems: "center",
}

const $textArea: ViewStyle = {
  flex: 1,
}

const $orgName: TextStyle = {
  fontSize: 12,
  color: "rgba(255,255,255,0.65)",
  fontFamily: typography.primary.normal,
}

const $userName: TextStyle = {
  fontSize: 20,
  color: "#FFFFFF",
  fontFamily: typography.primary.bold,
}

const $email: TextStyle = {
  fontSize: 12,
  color: "rgba(255,255,255,0.55)",
  fontFamily: typography.primary.normal,
}
