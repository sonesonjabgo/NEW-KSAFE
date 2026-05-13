import { FC } from "react"
import { TouchableOpacity, View } from "react-native"
import { Text } from "@/components/Text"
import { ChevronRight } from "lucide-react-native"
import { IconAlertTriangle, IconBulb } from "@tabler/icons-react-native"
import * as S from "../styles"
import type { WorkerParticipationMenuItem } from "../types"

interface WorkerParticipationMenuItemComponentProps {
  item: WorkerParticipationMenuItem
  showDivider?: boolean
}

const getIcon = (iconName: string) => {
  const iconMap: Record<string, any> = {
    AlertTriangle: IconAlertTriangle,
    Bulb: IconBulb,
  }
  return iconMap[iconName] || ChevronRight
}

export const WorkerParticipationMenuItemComponent: FC<WorkerParticipationMenuItemComponentProps> = ({
  item,
  showDivider = true,
}) => {
  const IconComponent = getIcon(item.icon)

  return (
    <>
      <TouchableOpacity
        style={S.$menuItemContainer}
        activeOpacity={0.7}
        onPress={() => {
          console.log(`${item.title} 클릭`)
        }}
      >
        <View style={S.$menuIconContainer}>
          <IconComponent size={24} color="#0B3069" strokeWidth={1.5} />
        </View>

        <View style={S.$menuContentContainer}>
          <Text text={item.title} style={S.$menuTitle} />
          <Text text={item.description} style={S.$menuDescription} numberOfLines={2} />
        </View>

        <View style={S.$menuChevron}>
          <ChevronRight size={20} color="#0B3069" strokeWidth={2} />
        </View>
      </TouchableOpacity>

      {showDivider && <View style={S.$menuDivider} />}
    </>
  )
}
