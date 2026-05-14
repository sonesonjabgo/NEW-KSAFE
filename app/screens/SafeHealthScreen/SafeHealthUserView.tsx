import { FC, useMemo } from "react"
import { View } from "react-native"
import { SafeHealthMenuItemComponent } from "./components/SafeHealthMenuItem"
import { getMockWorkerMenus } from "./mock/mockSafeHealthMenuData"
import * as S from "./styles"

export const SafeHealthUserView: FC = () => {
  const mockWorkerMenus = useMemo(() => getMockWorkerMenus(), [])

  return (
    <View style={S.$contentContainer}>
      <View style={S.$menuCard}>
        {mockWorkerMenus.map((item, index) => (
          <SafeHealthMenuItemComponent
            key={item.id}
            item={item}
            showDivider={index < mockWorkerMenus.length - 1}
          />
        ))}
      </View>
    </View>
  )
}
