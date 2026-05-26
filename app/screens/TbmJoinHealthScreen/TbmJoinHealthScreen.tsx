import { FC, useState } from "react"
import { TouchableOpacity, View } from "react-native"
import { IconAlertCircle } from "@tabler/icons-react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"

import { StackScreen } from "@/components/StackScreen"
import { Text } from "@/components/Text"
import { Toast } from "@/components/Toast"
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

  const handleNext = () => {
    if (status === null) {
      setToastVisible(true)
    } else {
      navigation.navigate("TbmJoinSign", { id })
    }
  }

  return (
    <>
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

          <View style={S.$buttonDivider} />
          <View style={[S.$buttonRow, { paddingBottom: insets.bottom + 28 }]}>
            <TouchableOpacity
              style={S.$prevBtn}
              activeOpacity={0.75}
              onPress={() => navigation.goBack()}
            >
              <Text text={translate("tbmJoinHealthScreen:prev")} style={S.$prevBtnText} />
            </TouchableOpacity>
            <TouchableOpacity style={S.$nextBtn} activeOpacity={0.75} onPress={handleNext}>
              <Text text={translate("tbmJoinHealthScreen:next")} style={S.$nextBtnText} />
            </TouchableOpacity>
          </View>
        </View>
      </StackScreen>

      <Toast
        visible={toastVisible}
        message={translate("tbmJoinHealthScreen:toastMessage")}
        icon={<IconAlertCircle size={16} color="#F26160" />}
        iconCircleColor="#FDF1F1"
        backgroundColor="#FDF1F1"
        textColor="#F26160"
        onHide={() => setToastVisible(false)}
      />
    </>
  )
}
