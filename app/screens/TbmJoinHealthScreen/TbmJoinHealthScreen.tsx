import { FC, useRef, useState } from "react"
import { TouchableOpacity, View } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { IconAlertCircle } from "@tabler/icons-react-native"
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated"

import { StackScreen } from "@/components/StackScreen"
import { Text } from "@/components/Text"
import { translate } from "@/i18n/translate"
import type { AppStackScreenProps } from "@/navigators/navigationTypes"

import * as S from "./styles"

type TbmJoinHealthScreenProps = AppStackScreenProps<"TbmJoinHealth">

type HealthStatus = "good" | "bad" | null

export const TbmJoinHealthScreen: FC<TbmJoinHealthScreenProps> = ({ navigation, route }) => {
  const insets = useSafeAreaInsets()
  const { id } = route.params
  const [status, setStatus] = useState<HealthStatus>(null)
  const [toastVisible, setToastVisible] = useState(false)
  const toastOpacity = useSharedValue(0)
  const dismissTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const toastAnimStyle = useAnimatedStyle(() => ({ opacity: toastOpacity.value }))

  const showToast = () => {
    if (dismissTimer.current) clearTimeout(dismissTimer.current)

    setToastVisible(true)
    toastOpacity.value = withTiming(1, { duration: 180 })

    dismissTimer.current = setTimeout(() => {
      toastOpacity.value = withTiming(0, { duration: 280 }, (finished) => {
        if (finished) runOnJS(setToastVisible)(false)
      })
    }, 3000)
  }

  const handleNext = () => {
    if (status === null) {
      showToast()
    } else {
      navigation.navigate("TbmJoinSign", { id })
    }
  }

  return (
    <StackScreen
      title={translate("tbmJoinHealthScreen:title")}
      onBack={() => navigation.goBack()}
      squareTop
    >
      <View style={S.$wrapper}>
        <View style={S.$container}>
          <Text text={translate("tbmJoinHealthScreen:heading")} style={S.$heading} />
          <Text text={translate("tbmJoinHealthScreen:prompt")} style={S.$prompt} />

          <View style={S.$cardRow}>
            <TouchableOpacity
              style={[S.$card, status === "good" && S.$cardSelected]}
              activeOpacity={0.8}
              onPress={() => setStatus("good")}
            >
              <Text style={S.$emoji}>😊</Text>
              <Text
                text={translate("tbmJoinHealthScreen:statusGood")}
                style={[S.$cardLabel, status === "good" && S.$cardLabelSelected]}
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={[S.$card, status === "bad" && S.$cardSelected]}
              activeOpacity={0.8}
              onPress={() => setStatus("bad")}
            >
              <Text style={S.$emoji}>🤢</Text>
              <Text
                text={translate("tbmJoinHealthScreen:statusBad")}
                style={[S.$cardLabel, status === "bad" && S.$cardLabelSelected]}
              />
            </TouchableOpacity>
          </View>
        </View>

        {toastVisible && (
          <Animated.View style={[S.$toast, toastAnimStyle]}>
            <IconAlertCircle size={21} color="#F26160" />
            <Text
              text={translate("tbmJoinHealthScreen:toastMessage")}
              style={S.$toastText}
            />
          </Animated.View>
        )}

        <View style={S.$buttonDivider} />
        <View style={[S.$buttonRow, { paddingBottom: insets.bottom + 28 }]}>
          <TouchableOpacity style={S.$prevBtn} activeOpacity={0.75} onPress={() => navigation.goBack()}>
            <Text text={translate("tbmJoinHealthScreen:prev")} style={S.$prevBtnText} />
          </TouchableOpacity>
          <TouchableOpacity style={S.$nextBtn} activeOpacity={0.75} onPress={handleNext}>
            <Text text={translate("tbmJoinHealthScreen:next")} style={S.$nextBtnText} />
          </TouchableOpacity>
        </View>
      </View>
    </StackScreen>
  )
}
