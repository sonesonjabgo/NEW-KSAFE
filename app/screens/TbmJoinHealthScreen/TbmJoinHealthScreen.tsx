import { FC, useState } from "react"
import { TouchableOpacity, View } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { IconAlertCircle, IconCheck } from "@tabler/icons-react-native"

import { ConfirmModal } from "@/components/ConfirmModal"
import { StackScreen } from "@/components/StackScreen"
import { Text } from "@/components/Text"
import { translate } from "@/i18n/translate"
import type { AppStackScreenProps } from "@/navigators/navigationTypes"

import * as S from "./styles"

type TbmJoinHealthScreenProps = AppStackScreenProps<"TbmJoinHealth">

const HEALTH_ITEM_KEYS = ["item1", "item2", "item3", "item4"] as const

export const TbmJoinHealthScreen: FC<TbmJoinHealthScreenProps> = ({ navigation, route }) => {
  const insets = useSafeAreaInsets()
  const { id } = route.params
  const [checked, setChecked] = useState<Record<string, boolean>>({})
  const [notAllModalVisible, setNotAllModalVisible] = useState(false)

  const toggleItem = (key: string) => {
    setChecked((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  const allChecked = HEALTH_ITEM_KEYS.every((k) => !!checked[k])

  const handleNext = () => {
    if (!allChecked) {
      setNotAllModalVisible(true)
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
            <Text text={translate("tbmJoinHealthScreen:prompt")} style={S.$prompt} />

            <View style={S.$checklistContainer}>
              {HEALTH_ITEM_KEYS.map((key) => {
                const isChecked = !!checked[key]
                return (
                  <TouchableOpacity
                    key={key}
                    style={[S.$checkItem, isChecked && S.$checkItemSelected]}
                    activeOpacity={0.75}
                    onPress={() => toggleItem(key)}
                  >
                    <View style={isChecked ? S.$checkboxSelected : S.$checkbox}>
                      {isChecked && <IconCheck size={14} color="#FFFFFF" strokeWidth={3} />}
                    </View>
                    <Text
                      text={translate(`tbmJoinHealthScreen:items.${key}` as any)}
                      style={[S.$checkItemText, isChecked && S.$checkItemTextSelected]}
                    />
                  </TouchableOpacity>
                )
              })}
            </View>
          </View>

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

      <ConfirmModal
        visible={notAllModalVisible}
        icon={
          <View style={S.$iconCircle}>
            <IconAlertCircle size={19} color="#1062D8" />
          </View>
        }
        title={translate("tbmJoinHealthScreen:notAllCheckedModal.title")}
        message={translate("tbmJoinHealthScreen:notAllCheckedModal.message")}
        confirmLabel={translate("tbmJoinHealthScreen:notAllCheckedModal.confirm")}
        confirmBgColor="#1062D8"
        onConfirm={() => setNotAllModalVisible(false)}
      />
    </>
  )
}
