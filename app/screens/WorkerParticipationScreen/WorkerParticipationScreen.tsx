import { FC, useMemo } from "react"
import { View } from "react-native"

import { Text } from "@/components/Text"
import { translate } from "@/i18n/translate"

import { WorkerParticipationMenuItemComponent } from "./components/WorkerParticipationMenuItem"
import { getMockWorkerParticipationMenus } from "./mock/mockWorkerParticipationMenuData"
import * as S from "./styles"
import type { WorkerParticipationScreenProps } from "./types"

export const WorkerParticipationScreen: FC<WorkerParticipationScreenProps> = () => {
  const mockWorkerParticipationMenus = useMemo(() => getMockWorkerParticipationMenus(), [])

  return (
    <View style={S.$screenContainer}>
      <View style={S.$headerContainer}>
        <Text text={translate("workerParticipationScreen:title")} style={S.$headerTitle} />
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
