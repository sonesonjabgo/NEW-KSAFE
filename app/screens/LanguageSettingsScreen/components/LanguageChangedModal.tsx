import { FC } from "react"
import { Modal, TouchableOpacity, View } from "react-native"
import { IconWorld } from "@tabler/icons-react-native"

import { Text } from "@/components/Text"
import { colors } from "@/theme/colors"
import { useResponsive } from "@/theme/responsive"

import * as S from "../styles"

interface Props {
  isVisible: boolean
  title: string
  description: string
  confirmText: string
  onConfirm: () => void
}

export const LanguageChangedModal: FC<Props> = ({
  isVisible,
  title,
  description,
  confirmText,
  onConfirm,
}) => {
  const { width, isSmallPhone, isTablet } = useResponsive()

  // 카드 여백 — tablet은 화면 너비 기반으로 최소 너비 보장
  const cardMarginH = isSmallPhone
    ? 24
    : isTablet
    ? Math.max(Math.floor(width * 0.15), 60)
    : 32
  const cardPaddingH = isSmallPhone ? 20 : 24
  const cardPaddingTop = isSmallPhone ? 24 : 32
  const cardPaddingBottom = isSmallPhone ? 20 : 24

  // 아이콘 원형
  const iconCircleSize = isSmallPhone ? 60 : isTablet ? 80 : 72
  const iconCircleMarginBottom = isSmallPhone ? 12 : 16
  const iconSize = isSmallPhone ? 28 : isTablet ? 44 : 36

  // 텍스트
  const titleFontSize = isSmallPhone ? 16 : isTablet ? 20 : 18
  const descFontSize = isSmallPhone ? 13 : 14

  // 버튼
  const btnMarginTop = isSmallPhone ? 16 : 20
  const btnPaddingV = isSmallPhone ? 12 : 15
  const btnFontSize = isSmallPhone ? 15 : 16

  return (
    <Modal visible={isVisible} transparent animationType="fade" onRequestClose={onConfirm}>
      <View style={S.$modalOverlay}>
        <View
          style={[
            S.$modalCard,
            {
              marginHorizontal: cardMarginH,
              paddingHorizontal: cardPaddingH,
              paddingTop: cardPaddingTop,
              paddingBottom: cardPaddingBottom,
            },
          ]}
        >
          <View
            style={[
              S.$modalIconCircle,
              {
                width: iconCircleSize,
                height: iconCircleSize,
                borderRadius: iconCircleSize / 2,
                marginBottom: iconCircleMarginBottom,
              },
            ]}
          >
            <IconWorld size={iconSize} color={colors.blue} />
          </View>

          <Text style={[S.$modalTitle, { fontSize: titleFontSize, marginTop: 4 }]}>{title}</Text>

          <Text style={[S.$modalDesc, { fontSize: descFontSize, marginTop: 8 }]}>
            {description}
          </Text>

          <TouchableOpacity
            style={[S.$modalConfirmBtn, { marginTop: btnMarginTop, paddingVertical: btnPaddingV }]}
            activeOpacity={0.85}
            onPress={onConfirm}
          >
            <Text style={[S.$modalBtnText, { fontSize: btnFontSize }]}>{confirmText}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  )
}
