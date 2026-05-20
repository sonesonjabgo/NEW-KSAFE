import { FC } from "react"
import { TouchableOpacity } from "react-native"

import { Text } from "@/components/Text"

import * as S from "../styles"

interface AiRiskActionButtonProps {
  label: string
  Icon: FC<{ size?: number; color?: string; strokeWidth?: number }>
  onPress: () => void
  disabled?: boolean
}

export const AiRiskActionButton: FC<AiRiskActionButtonProps> = ({
  label,
  Icon,
  onPress,
  disabled = false,
}) => (
  <TouchableOpacity
    style={[S.$actionBtn, disabled ? S.$actionBtnDisabled : S.$actionBtnActive]}
    onPress={onPress}
    disabled={disabled}
    activeOpacity={0.8}
  >
    <Icon size={20} color="#FFFFFF" strokeWidth={2} />
    <Text text={label} style={S.$actionBtnLabel} />
  </TouchableOpacity>
)
