import { FC } from "react"
import { View } from "react-native"

import { SafeHealthMenuItemComponent } from "./components/SafeHealthMenuItem"
import { mockAdminMenus } from "./mock/mockSafeHealthMenuData"
import * as S from "./styles"

export const SafeHealthAdminView: FC = () => {
  return (
    <View style={S.$contentContainer}>
      <View style={S.$menuCard}>
        {mockAdminMenus.map((item, index) => (
          <SafeHealthMenuItemComponent
            key={item.id}
            item={item}
            showDivider={index < mockAdminMenus.length - 1}
          />
        ))}
      </View>
    </View>
  )
}
