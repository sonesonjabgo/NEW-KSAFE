import { FC, useRef, useState } from "react"
import { PanResponder, TouchableOpacity, View } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { IconAlertCircle } from "@tabler/icons-react-native"
import Svg, { Path } from "react-native-svg"

import { ConfirmModal } from "@/components/ConfirmModal"
import { StackScreen } from "@/components/StackScreen"
import { Text } from "@/components/Text"
import { translate } from "@/i18n/translate"
import type { AppStackScreenProps } from "@/navigators/navigationTypes"

import * as S from "./styles"

type TbmJoinSignScreenProps = AppStackScreenProps<"TbmJoinSign">

export const TbmJoinSignScreen: FC<TbmJoinSignScreenProps> = ({ navigation, route }) => {
  const insets = useSafeAreaInsets()
  const { id } = route.params
  const [paths, setPaths] = useState<string[]>([])
  const currentPath = useRef("")
  const isDrawing = useRef(false)
  const [noSignModalVisible, setNoSignModalVisible] = useState(false)

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: (evt) => {
        const { locationX, locationY } = evt.nativeEvent
        currentPath.current = `M${locationX.toFixed(1)},${locationY.toFixed(1)}`
        isDrawing.current = true
        setPaths((prev) => [...prev, currentPath.current])
      },
      onPanResponderMove: (evt) => {
        if (!isDrawing.current) return
        const { locationX, locationY } = evt.nativeEvent
        currentPath.current += ` L${locationX.toFixed(1)},${locationY.toFixed(1)}`
        setPaths((prev) => [...prev.slice(0, -1), currentPath.current])
      },
      onPanResponderRelease: () => {
        isDrawing.current = false
        currentPath.current = ""
      },
      onPanResponderTerminate: () => {
        isDrawing.current = false
        currentPath.current = ""
      },
    }),
  ).current

  const hasSignature = paths.length > 0

  const handleClear = () => {
    setPaths([])
    currentPath.current = ""
    isDrawing.current = false
  }

  const handleNext = () => {
    if (!hasSignature) {
      setNoSignModalVisible(true)
    } else {
      navigation.navigate("TbmJoinComplete")
    }
  }

  return (
    <>
      <StackScreen
        title={translate("tbmJoinSignScreen:title")}
        onBack={() => navigation.goBack()}
        squareTop
      >
        <View style={S.$wrapper}>
          <View style={S.$container}>
            <Text text={translate("tbmJoinSignScreen:prompt")} style={S.$prompt} />

            <View style={S.$signatureBox} {...panResponder.panHandlers}>
              <Svg style={S.$svg} width="100%" height="100%">
                {paths.map((d, i) => (
                  <Path
                    key={i}
                    d={d}
                    stroke="#1062D8"
                    strokeWidth={2.5}
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                ))}
              </Svg>
              {!hasSignature && (
                <View style={S.$placeholderContainer} pointerEvents="none">
                  <Text
                    text={translate("tbmJoinSignScreen:signatureArea")}
                    style={S.$signaturePlaceholder}
                  />
                </View>
              )}
            </View>

            {hasSignature && (
              <TouchableOpacity style={S.$clearBtn} activeOpacity={0.75} onPress={handleClear}>
                <Text text={translate("tbmJoinSignScreen:clearLabel")} style={S.$clearBtnText} />
              </TouchableOpacity>
            )}
          </View>

          <View style={S.$buttonDivider} />
          <View style={[S.$buttonRow, { paddingBottom: insets.bottom + 28 }]}>
            <TouchableOpacity style={S.$prevBtn} activeOpacity={0.75} onPress={() => navigation.goBack()}>
              <Text text={translate("tbmJoinSignScreen:prev")} style={S.$prevBtnText} />
            </TouchableOpacity>
            <TouchableOpacity style={S.$nextBtn} activeOpacity={0.75} onPress={handleNext}>
              <Text text={translate("tbmJoinSignScreen:next")} style={S.$nextBtnText} />
            </TouchableOpacity>
          </View>
        </View>
      </StackScreen>

      <ConfirmModal
        visible={noSignModalVisible}
        icon={
          <View style={S.$iconCircle}>
            <IconAlertCircle size={19} color="#1062D8" />
          </View>
        }
        title={translate("tbmJoinSignScreen:noSignatureModal.title")}
        message={translate("tbmJoinSignScreen:noSignatureModal.message")}
        confirmLabel={translate("tbmJoinSignScreen:noSignatureModal.confirm")}
        confirmBgColor="#1062D8"
        onConfirm={() => setNoSignModalVisible(false)}
      />
    </>
  )
}
