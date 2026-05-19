import { FC } from "react"
import { View, ViewStyle } from "react-native"

import { StackScreen } from "@/components/StackScreen"
import { Text } from "@/components/Text"
import { translate } from "@/i18n/translate"

import type { TbmReportInquiryScreenProps } from "./types"

export const TbmReportInquiryScreen: FC<TbmReportInquiryScreenProps> = ({ navigation }) => {
  return (
    <StackScreen
      title={translate("tbmReportInquiryScreen:title")}
      onBack={() => navigation.goBack()}
      squareTop
      contentBg="#FFFFFF"
    >
      <View style={$container}>
        <Text text="TBM 보고서 조회 화면입니다." />
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
