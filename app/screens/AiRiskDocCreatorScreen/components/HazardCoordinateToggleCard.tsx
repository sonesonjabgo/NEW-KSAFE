import { FC } from "react"
import { TouchableOpacity, View } from "react-native"
import { IconCheck } from "@tabler/icons-react-native"

import { Text } from "@/components/Text"
import { translate } from "@/i18n/translate"

import * as S from "../styles"

interface HazardCoordinateToggleCardProps {
  checked: boolean
  onToggle: () => void
}

export const HazardCoordinateToggleCard: FC<HazardCoordinateToggleCardProps> = ({
  checked,
  onToggle,
}) => (
  <TouchableOpacity style={S.$toggleCard} activeOpacity={0.8} onPress={onToggle}>
    <View style={[S.$checkbox, checked && S.$checkboxChecked]}>
      {checked && <IconCheck size={14} color="#FFFFFF" strokeWidth={3} />}
    </View>
    <View style={S.$toggleTextBlock}>
      <Text text={translate("aiRiskDocCreatorScreen:hazardToggle.label")} style={S.$toggleLabel} />
      <Text
        text={translate("aiRiskDocCreatorScreen:hazardToggle.description")}
        style={S.$toggleDesc}
      />
    </View>
  </TouchableOpacity>
)
