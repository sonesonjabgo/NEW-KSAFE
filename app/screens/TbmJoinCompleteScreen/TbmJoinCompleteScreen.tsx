import { FC } from "react"
import { TouchableOpacity, View } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"

import TbmDoneImage from "@assets/images/tbm_done.svg"

import { StackScreen } from "@/components/StackScreen"
import { Text } from "@/components/Text"
import { translate } from "@/i18n/translate"
import type { AppStackScreenProps } from "@/navigators/navigationTypes"

import * as S from "./styles"

type TbmJoinCompleteScreenProps = AppStackScreenProps<"TbmJoinComplete">

export const TbmJoinCompleteScreen: FC<TbmJoinCompleteScreenProps> = ({ navigation }) => {
  const insets = useSafeAreaInsets()

  return (
    <StackScreen title={translate("tbmJoinCompleteScreen:title")} squareTop>
      <View style={S.$wrapper}>
        <View style={S.$container}>
          <TbmDoneImage width={162} height={167} />
          <View style={S.$textBlock}>
            <Text text={translate("tbmJoinCompleteScreen:heading")} style={S.$heading} />
            <Text text={translate("tbmJoinCompleteScreen:subtitle")} style={S.$subtitle} />
          </View>
        </View>

        <View style={S.$buttonDivider} />
        <View style={[S.$buttonRow, { paddingBottom: insets.bottom + 28 }]}>
          <TouchableOpacity
            style={S.$homeBtn}
            activeOpacity={0.75}
            onPress={() => navigation.navigate("Main", { screen: "Home" })}
          >
            <Text text={translate("tbmJoinCompleteScreen:goHome")} style={S.$homeBtnText} />
          </TouchableOpacity>
        </View>
      </View>
    </StackScreen>
  )
}
