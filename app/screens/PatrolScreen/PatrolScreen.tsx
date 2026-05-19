import { FC } from "react"
import { View } from "react-native"

import { StackScreen } from "@/components/StackScreen"
import { translate } from "@/i18n/translate"

import type { PatrolScreenProps } from "./types"

export const PatrolScreen: FC<PatrolScreenProps> = ({ navigation }) => {
  return (
    <StackScreen title={translate("patrolScreen:title")} onBack={() => navigation.goBack()}>
      <View />
    </StackScreen>
  )
}
