import { FC } from "react"
import { View } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"

import { Text } from "@/components/Text"
import { useRole } from "@/context/RoleContext"
import { translate } from "@/i18n/translate"

import { SafeHealthAdminView } from "./SafeHealthAdminView"
import { SafeHealthUserView } from "./SafeHealthUserView"
import * as S from "./styles"
import type { SafeHealthMainScreenProps } from "./types"

export const SafeHealthMainScreen: FC<SafeHealthMainScreenProps> = () => {
  const { role } = useRole()
  const isAdmin = role === "admin"
  const insets = useSafeAreaInsets()

  return (
    <View style={S.$screenContainer}>
      <View
        style={[S.$headerContainer, { paddingTop: insets.top + 10, paddingBottom: 14, minHeight: 100, justifyContent: "center" }]}
      >
        <Text text={translate("safeHealthScreen:title")} style={[S.$headerTitle, { fontSize: 20 }]} />
      </View>

      {isAdmin ? <SafeHealthAdminView /> : <SafeHealthUserView />}
    </View>
  )
}
