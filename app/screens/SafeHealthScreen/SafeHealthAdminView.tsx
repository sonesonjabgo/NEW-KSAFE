import { FC, useMemo } from "react"
import { ScrollView, View } from "react-native"

import { useResponsive } from "@/theme/responsive"

import { SafeHealthMenuItemComponent } from "./components/SafeHealthMenuItem"
import { getMockAdminMenus } from "./mock/mockSafeHealthMenuData"
import * as S from "./styles"

export const SafeHealthAdminView: FC = () => {
  const mockAdminMenus = useMemo(() => getMockAdminMenus(), [])
  const { isSmallPhone } = useResponsive()

  return (
    <ScrollView
      style={{ flex: 1 }}
      contentContainerStyle={S.$contentContainer}
      showsVerticalScrollIndicator={false}
    >
      <View style={[S.$menuCard, isSmallPhone && { marginBottom: 16 }]}>
        {mockAdminMenus.map((item, index) => (
          <SafeHealthMenuItemComponent
            key={item.id}
            item={item}
            showDivider={index < mockAdminMenus.length - 1}
          />
        ))}
      </View>
    </ScrollView>
  )
}
