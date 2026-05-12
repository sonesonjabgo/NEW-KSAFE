import { FC } from "react"
import { View, ViewStyle, TextStyle } from "react-native"
import type { AppStackScreenProps } from "@/navigators/navigationTypes"
import { Screen } from "@/components/Screen"
import { Text } from "@/components/Text"
import { Icon } from "@/components/Icon"
import { colors } from "@/theme/colors"
import { typography } from "@/theme/typography"

interface HomeScreenProps extends AppStackScreenProps<"Home"> {}

export const HomeScreen: FC<HomeScreenProps> = () => {
  return (
    <Screen style={$root} preset="scroll" backgroundColor={colors.background}>
      <View style={$headerContainer}>
        {/* 왼쪽 박스 */}
        <View style={$leftBox}>
          <Text text="K-SAFEONE" style={$titleText} />
          <Text text="KS산업안전협회" style={$subtitleText} />
        </View>

        {/* 오른쪽 박스 (130x43) */}
        <View style={$rightBox}>
          <View style={$iconButton}>
            <Icon icon="x" size={25} />
            <Text text="QR스캔" style={$iconText} />
          </View>
          <View style={$iconButton}>
            <Icon icon="bell" size={25} />
            <Text text="알림" style={$iconText} />
          </View>
          <View style={$iconButton}>
            <Icon icon="settings" size={25} />
            <Text text="언어" style={$iconText} />
          </View>
        </View>
      </View>
    </Screen>
  )
}

const $root: ViewStyle = {
  flex: 1,
}

const $headerContainer: ViewStyle = {
  marginTop: 30,
  width: "90%",
  alignSelf: "center",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "flex-start",
}

const $leftBox: ViewStyle = {
  flex: 1,
}

const $rightBox: ViewStyle = {
  width: 130,
  height: 43,
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
}

const $iconButton: ViewStyle = {
  alignItems: "center",
  justifyContent: "center",
}

const $titleText: TextStyle = {
  color: "#FFFFFF",
  fontSize: 21,
  fontFamily: typography.primary.bold,
}

const $subtitleText: TextStyle = {
  color: "#FFFFFF",
  fontSize: 13,
  fontFamily: typography.primary.medium,
}

const $iconText: TextStyle = {
  color: "#FFFFFF",
  fontSize: 11,
  fontFamily: typography.primary.medium,
  marginTop: 2,
}
