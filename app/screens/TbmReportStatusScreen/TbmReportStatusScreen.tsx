import { FC } from "react"
import { TouchableOpacity, View, ViewStyle, TextStyle } from "react-native"

import { StackScreen } from "@/components/StackScreen"
import { Text } from "@/components/Text"
import { translate } from "@/i18n/translate"
import { colors } from "@/theme/colors"
import { typography } from "@/theme/typography"

import type { TbmReportStatusScreenProps } from "./types"

export const TbmReportStatusScreen: FC<TbmReportStatusScreenProps> = ({ navigation, route }) => {
  const { id } = route.params

  const handleRegenerate = () => {
    console.log("보고서 재생성 요청:", id)
  }

  return (
    <StackScreen
      title={translate("tbmReportStatusScreen:title")}
      onBack={() => navigation.goBack()}
      squareTop
      contentBg="#FFFFFF"
      rightSlot={
        <TouchableOpacity onPress={handleRegenerate} activeOpacity={0.7}>
          <Text text={translate("tbmReportStatusScreen:regenerate")} style={$regenerateText} />
        </TouchableOpacity>
      }
    >
      <View style={$container}>
        <Text text={`TBM 보고서 상태 화면 (ID: ${id})`} />
      </View>
    </StackScreen>
  )
}

const $container: ViewStyle = {
  flex: 1,
  padding: 20,
  alignItems: "center",
  justifyContent: "center",
}

const $regenerateText: TextStyle = {
  fontSize: 16,
  fontFamily: typography.primary.medium,
  color: "#FFFFFF",
}
