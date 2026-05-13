import React from "react"
import { View, ViewStyle, TextStyle, ImageStyle } from "react-native"
import { Text } from "../Text"
import { User } from "lucide-react-native"

export interface ProfileCardProps {
  company: string
  name: string
  email: string
}

export const ProfileCard = ({ company, name, email }: ProfileCardProps) => {
  return (
    <View style={$container}>
      <View style={$avatarContainer}>
        <User size={32} color="#FFFFFF" />
      </View>
      <View style={$infoContainer}>
        <Text text={company} style={$companyText} />
        <Text text={name} style={$nameText} />
        <Text text={email} style={$emailText} />
      </View>
    </View>
  )
}

const $container: ViewStyle = {
  backgroundColor: "#1B2559",
  borderRadius: 16,
  padding: 20,
  flexDirection: "row",
  alignItems: "center",
}

const $avatarContainer: ViewStyle = {
  width: 60,
  height: 60,
  borderRadius: 30,
  backgroundColor: "rgba(255, 255, 255, 0.2)",
  justifyContent: "center",
  alignItems: "center",
  marginRight: 16,
}

const $infoContainer: ViewStyle = {
  flex: 1,
}

const $companyText: TextStyle = {
  fontSize: 12,
  color: "rgba(255, 255, 255, 0.7)",
  marginBottom: 2,
}

const $nameText: TextStyle = {
  fontSize: 18,
  fontWeight: "bold",
  color: "#FFFFFF",
  marginBottom: 2,
}

const $emailText: TextStyle = {
  fontSize: 13,
  color: "rgba(255, 255, 255, 0.5)",
}
