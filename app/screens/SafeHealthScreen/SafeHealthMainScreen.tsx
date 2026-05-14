import { FC } from "react"
import { View } from "react-native"
import { translate } from "@/i18n/translate"

import { Text } from "@/components/Text"

import { SafeHealthAdminView } from "./SafeHealthAdminView"
import { SafeHealthUserView } from "./SafeHealthUserView"
import * as S from "./styles"
import type { SafeHealthMainScreenProps } from "./types"

type Role = "admin" | "worker"

const mockRole: Role = "admin"

export const SafeHealthMainScreen: FC<SafeHealthMainScreenProps> = () => {
  const isAdmin = mockRole === "admin"

  return (
    <View style={S.$screenContainer}>
      <View style={S.$headerContainer}>
        <Text text={translate("safeHealthScreen:title")} style={S.$headerTitle} />
      </View>

      {isAdmin ? <SafeHealthAdminView /> : <SafeHealthUserView />}
    </View>
  )
}
