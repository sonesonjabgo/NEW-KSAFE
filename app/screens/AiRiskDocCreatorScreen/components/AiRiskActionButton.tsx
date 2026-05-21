import { FC } from "react"
import { TouchableOpacity } from "react-native"

import { Text } from "@/components/Text"

import * as S from "../styles"

interface AiRiskActionButtonProps {
  label: string
  Icon: FC<{ size?: number; color?: string; strokeWidth?: number }>
  onPress: () => void
  disabled?: boolean
  variant?: "primary" | "secondary"
}

export const AiRiskActionButton: FC<AiRiskActionButtonProps> = ({
  label,
  Icon,
  onPress,
  disabled = false,
  variant = "primary",
}) => {
  const btnStyle =
    variant === "secondary"
      ? S.$actionBtnSecondary
      : disabled
        ? S.$actionBtnDisabled
        : S.$actionBtnActive

  return (
    <TouchableOpacity
      style={[S.$actionBtn, btnStyle]}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.8}
    >
      <Icon size={20} color="#FFFFFF" strokeWidth={2} />
      <Text text={label} style={S.$actionBtnLabel} />
    </TouchableOpacity>
  )
}
