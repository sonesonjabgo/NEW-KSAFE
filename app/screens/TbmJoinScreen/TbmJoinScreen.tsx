import { FC, useEffect, useState } from "react"
import { Modal, ScrollView, TouchableOpacity, View } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { IconInfoCircle } from "@tabler/icons-react-native"
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated"

import TbmEmptyImage from "@assets/images/tbm-empty.svg"

import { StackScreen } from "@/components/StackScreen"
import { Text } from "@/components/Text"
import { translate } from "@/i18n/translate"
import type { AppStackScreenProps } from "@/navigators/navigationTypes"

import * as S from "./styles"

type TbmJoinScreenProps = AppStackScreenProps<"TbmJoin">

export const TbmJoinScreen: FC<TbmJoinScreenProps> = ({ navigation }) => {
  const insets = useSafeAreaInsets()
  const [infoModalVisible, setInfoModalVisible] = useState(false)

  const overlayOpacity = useSharedValue(0)
  const sheetTranslateY = useSharedValue(600)

  const overlayAnimStyle = useAnimatedStyle(() => ({ opacity: overlayOpacity.value }))
  const sheetAnimStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: sheetTranslateY.value }],
  }))

  useEffect(() => {
    if (infoModalVisible) {
      overlayOpacity.value = withTiming(1, { duration: 250 })
      sheetTranslateY.value = withTiming(0, { duration: 320 })
    }
  }, [infoModalVisible])

  const closeModal = () => {
    overlayOpacity.value = withTiming(0, { duration: 220 })
    sheetTranslateY.value = withTiming(600, { duration: 300 }, (finished) => {
      if (finished) runOnJS(setInfoModalVisible)(false)
    })
  }

  return (
    <>
      <StackScreen
        title={translate("tbmJoinScreen:title")}
        onBack={() => navigation.goBack()}
        squareTop
        rightSlot={
          <TouchableOpacity onPress={() => setInfoModalVisible(true)} activeOpacity={0.7}>
            <IconInfoCircle size={24} color="#FFFFFF" />
          </TouchableOpacity>
        }
      >
        <View style={S.$wrapper}>
          <View style={S.$container}>
            <Text text={translate("tbmJoinScreen:selectPrompt")} style={S.$selectPrompt} />

            <View style={S.$emptyContainer}>
              <TbmEmptyImage width={150} height={162} />
              <Text text={translate("tbmJoinScreen:empty.title")} style={S.$emptyTitle} />
              <Text text={translate("tbmJoinScreen:empty.subtitle")} style={S.$emptySubtitle} />
            </View>
          </View>

          <View style={S.$buttonDivider} />
          <View style={[S.$buttonRow, { paddingBottom: insets.bottom + 28 }]}>
            <TouchableOpacity style={S.$prevBtn} activeOpacity={0.75} onPress={() => navigation.goBack()}>
              <Text text={translate("tbmJoinScreen:prev")} style={S.$prevBtnText} />
            </TouchableOpacity>
            <TouchableOpacity style={S.$nextBtn} activeOpacity={0.75} onPress={() => {}}>
              <Text text={translate("tbmJoinScreen:next")} style={S.$nextBtnText} />
            </TouchableOpacity>
          </View>
        </View>
      </StackScreen>

      <Modal
        visible={infoModalVisible}
        transparent
        animationType="none"
        onRequestClose={closeModal}
      >
        <View style={S.$modalWrap}>
          <Animated.View style={[S.$modalOverlay, overlayAnimStyle]}>
            <TouchableOpacity style={S.$modalOverlayTouch} activeOpacity={1} onPress={closeModal} />
          </Animated.View>

          <Animated.View style={[S.$modalContainer, sheetAnimStyle, { paddingBottom: insets.bottom + 20 }]}>
            <ScrollView showsVerticalScrollIndicator={false} bounces={false}>
              {/* 섹션 1 */}
              <View style={S.$modalSection}>
                <View style={S.$modalHeaderRow}>
                  <IconInfoCircle size={24} color="#1062D8" />
                  <Text text={translate("tbmJoinScreen:infoModal.title")} style={S.$modalTitleText} />
                </View>
              </View>

              <View style={S.$sectionGap} />

              {/* 섹션 2 */}
              <View style={S.$modalSection}>
                <Text text={translate("tbmJoinScreen:infoModal.meaning.heading")} style={S.$sectionHeading} />
                <Text text={translate("tbmJoinScreen:infoModal.meaning.body")} style={S.$sectionBody} />
              </View>

              <View style={S.$sectionGap} />

              {/* 섹션 3 */}
              <View style={S.$modalSection}>
                <Text text={translate("tbmJoinScreen:infoModal.importance.heading")} style={S.$sectionHeading} />
                <Text text={translate("tbmJoinScreen:infoModal.importance.body")} style={S.$sectionBody} />
              </View>

              <View style={S.$sectionGap} />

              {/* 섹션 4 */}
              <View style={S.$modalSection}>
                <Text text={translate("tbmJoinScreen:infoModal.procedure.heading")} style={S.$sectionHeading} />
                <Text text={`1.  ${translate("tbmJoinScreen:infoModal.procedure.step1")}`} style={S.$procedureStep} />
                <Text text={`2.  ${translate("tbmJoinScreen:infoModal.procedure.step2")}`} style={S.$procedureStep} />
                <Text text={`3.  ${translate("tbmJoinScreen:infoModal.procedure.step3")}`} style={S.$procedureStep} />
                <Text text={`4.  ${translate("tbmJoinScreen:infoModal.procedure.step4")}`} style={S.$procedureStep} />
              </View>
            </ScrollView>

            <TouchableOpacity
              style={S.$modalCloseBtn}
              activeOpacity={0.75}
              onPress={closeModal}
            >
              <Text text={translate("tbmJoinScreen:infoModal.close")} style={S.$modalCloseBtnText} />
            </TouchableOpacity>
          </Animated.View>
        </View>
      </Modal>
    </>
  )
}
