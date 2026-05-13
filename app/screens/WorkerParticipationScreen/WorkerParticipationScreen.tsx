import { FC } from "react"
import { View } from "react-native"
import { Text } from "@/components/Text"
import { WorkerParticipationMenuItemComponent } from "./components/WorkerParticipationMenuItem"
import { mockWorkerParticipationMenus } from "./mock/mockWorkerParticipationMenuData"
import * as S from "./styles"
import type { WorkerParticipationScreenProps } from "./types"

export const WorkerParticipationScreen: FC<WorkerParticipationScreenProps> = () => {
  return (
    <View style={S.$screenContainer}>
      <View style={S.$headerContainer}>
        <Text text="근로자 참여" style={S.$headerTitle} />
      </View>

      <View style={S.$contentContainer}>
        <View style={S.$menuCard}>
          {mockWorkerParticipationMenus.map((item, index) => (
            <WorkerParticipationMenuItemComponent
              key={item.id}
              item={item}
              showDivider={index < mockWorkerParticipationMenus.length - 1}
            />
          ))}
        </View>
      </View>
    </View>
  )
}
