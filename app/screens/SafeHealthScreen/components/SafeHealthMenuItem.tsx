import { FC } from "react"
import { TouchableOpacity, View } from "react-native"
import { useNavigation } from "@react-navigation/native"
import {
  IconWalk,
  IconBook,
  IconCalendarPlus,
  IconDownload,
  IconUsers,
  IconHistory,
  IconLayoutList,
} from "@tabler/icons-react-native"
import { ChevronRight } from "lucide-react-native"

import { Text } from "@/components/Text"

import * as S from "../styles"
import type { SafeHealthMenuItem } from "../types"

interface SafeHealthMenuItemComponentProps {
  item: SafeHealthMenuItem
  showDivider?: boolean
}

const getIcon = (iconName: string) => {
  const iconMap: Record<string, any> = {
    Walk: IconWalk,
    Book: IconBook,
    CalendarPlus: IconCalendarPlus,
    Download: IconDownload,
    Users: IconUsers,
    History: IconHistory,
    LayoutList: IconLayoutList,
  }
  return iconMap[iconName] || ChevronRight
}

export const SafeHealthMenuItemComponent: FC<SafeHealthMenuItemComponentProps> = ({
  item,
  showDivider = true,
}) => {
  const navigation = useNavigation<any>()
  const IconComponent = getIcon(item.icon)

  const handlePress = () => {
    if (item.id === 3) {
      navigation.navigate("TbmList")
    } else if (item.id === 4) {
      navigation.navigate("TbmReportInquiry")
    } else if (item.id === 5) {
      navigation.navigate("TbmJoin")
    } else {
      console.log(`${item.title} 클릭`)
    }
  }

  return (
    <>
      <TouchableOpacity style={S.$menuItemContainer} activeOpacity={0.7} onPress={handlePress}>
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
