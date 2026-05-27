import { FC, useMemo } from "react"
import { View } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"

import { Text } from "@/components/Text"
import { translate } from "@/i18n/translate"

import { WorkerParticipationMenuItemComponent } from "./components/WorkerParticipationMenuItem"
import { getMockWorkerParticipationMenus } from "./mock/mockWorkerParticipationMenuData"
import * as S from "./styles"
import type { WorkerParticipationScreenProps } from "./types"

export const WorkerParticipationScreen: FC<WorkerParticipationScreenProps> = ({ navigation }) => {
  const mockWorkerParticipationMenus = useMemo(() => getMockWorkerParticipationMenus(), [])
  const insets = useSafeAreaInsets()

  const handleMenuPress = (id: number) => {
    if (id === 1) {
      navigation.navigate("HazardRiskList")
    } else if (id === 2) {
      navigation.navigate("ImprovementProposalList")
    }
  }

  return (
    <View style={S.$screenContainer}>
      <View
        style={[S.$headerContainer, { paddingTop: insets.top + 10, paddingBottom: 14, minHeight: 100, justifyContent: "center" }]}
      >
        <Text text={translate("workerParticipationScreen:title")} style={[S.$headerTitle, { fontSize: 20 }]} />
      </View>

      <View style={S.$contentContainer}>
        <View style={S.$menuCard}>
          {mockWorkerParticipationMenus.map((item, index) => (
            <WorkerParticipationMenuItemComponent
              key={item.id}
              item={item}
              showDivider={index < mockWorkerParticipationMenus.length - 1}
              onPress={() => handleMenuPress(item.id)}
            />
          ))}
        </View>
      </View>
    </View>
  )
}
