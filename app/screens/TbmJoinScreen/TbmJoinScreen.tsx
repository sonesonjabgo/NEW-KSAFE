import { FC, useEffect, useState } from "react"
import { FlatList, Modal, ScrollView, TouchableOpacity, View } from "react-native"
import { IconAlertCircle, IconCheck, IconInfoCircle } from "@tabler/icons-react-native"
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated"
import { useSafeAreaInsets } from "react-native-safe-area-context"

import TbmEmptyImage from "@assets/images/tbm-empty.svg"

import { ConfirmModal } from "@/components/ConfirmModal"
import { StackScreen } from "@/components/StackScreen"
import { Text } from "@/components/Text"
import { translate } from "@/i18n/translate"
import type { AppStackScreenProps } from "@/navigators/navigationTypes"

import { mockTbmJoinData } from "./mockData"
import * as S from "./styles"
import type { TbmJoinItem } from "./types"

type TbmJoinScreenProps = AppStackScreenProps<"TbmJoin">

export const TbmJoinScreen: FC<TbmJoinScreenProps> = ({ navigation }) => {
  const insets = useSafeAreaInsets()
  const [selectedId, setSelectedId] = useState<number | null>(null)
  const [infoModalVisible, setInfoModalVisible] = useState(false)
  const [noSelectionModalVisible, setNoSelectionModalVisible] = useState(false)

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

  const closeInfoModal = () => {
    overlayOpacity.value = withTiming(0, { duration: 220 })
    sheetTranslateY.value = withTiming(600, { duration: 300 }, (finished) => {
      if (finished) runOnJS(setInfoModalVisible)(false)
    })
  }

  const handleNext = () => {
    if (selectedId === null) {
      setNoSelectionModalVisible(true)
    } else {
      navigation.navigate("TbmJoinInfo", { id: selectedId })
    }
  }

  const renderCard = ({ item }: { item: TbmJoinItem }) => {
    const isSelected = selectedId === item.id
    return (
      <TouchableOpacity
        style={[S.$card, isSelected && S.$cardSelected]}
        activeOpacity={0.75}
        onPress={() => setSelectedId(isSelected ? null : item.id)}
      >
        <View style={isSelected ? S.$checkboxSelected : S.$checkbox}>
          {isSelected && <IconCheck size={14} color="#FFFFFF" strokeWidth={3} />}
        </View>
        <View style={S.$cardContent}>
          <Text text={item.title} style={S.$cardTitle} numberOfLines={1} />
          <View style={S.$cardMeta}>
            <View style={S.$cardAvatar} />
            <Text text={item.authorName} style={S.$cardAuthor} />
            <Text text={`· ${item.date}`} style={S.$cardDate} />
          </View>
        </View>
      </TouchableOpacity>
    )
  }

  const hasData = mockTbmJoinData.length > 0

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

            {hasData ? (
              <FlatList<TbmJoinItem>
                style={S.$listContent}
                data={mockTbmJoinData}
                keyExtractor={(item) => String(item.id)}
                contentContainerStyle={S.$flatListContent}
                renderItem={renderCard}
                showsVerticalScrollIndicator={false}
              />
            ) : (
              <View style={S.$emptyContainer}>
                <TbmEmptyImage width={150} height={162} />
                <Text text={translate("tbmJoinScreen:empty.title")} style={S.$emptyTitle} />
                <Text text={translate("tbmJoinScreen:empty.subtitle")} style={S.$emptySubtitle} />
              </View>
            )}
          </View>

          <View style={S.$buttonDivider} />
          <View style={[S.$buttonRow, { paddingBottom: insets.bottom + 28 }]}>
            <TouchableOpacity
              style={S.$prevBtn}
              activeOpacity={0.75}
              onPress={() => navigation.goBack()}
            >
              <Text text={translate("tbmJoinScreen:prev")} style={S.$prevBtnText} />
            </TouchableOpacity>
            <TouchableOpacity style={S.$nextBtn} activeOpacity={0.75} onPress={handleNext}>
              <Text text={translate("tbmJoinScreen:next")} style={S.$nextBtnText} />
            </TouchableOpacity>
          </View>
        </View>
      </StackScreen>

      <ConfirmModal
        visible={noSelectionModalVisible}
        icon={
          <View style={S.$noSelectionIconCircle}>
            <IconAlertCircle size={19} color="#1062D8" />
          </View>
        }
        title={translate("tbmJoinScreen:noSelectionModal.title")}
        message={translate("tbmJoinScreen:noSelectionModal.message")}
        confirmLabel={translate("tbmJoinScreen:noSelectionModal.confirm")}
        confirmBgColor="#1062D8"
        onConfirm={() => setNoSelectionModalVisible(false)}
      />

      <Modal
        visible={infoModalVisible}
        transparent
        animationType="none"
        onRequestClose={closeInfoModal}
      >
        <View style={S.$modalWrap}>
          <Animated.View style={[S.$modalOverlay, overlayAnimStyle]}>
            <TouchableOpacity
              style={S.$modalOverlayTouch}
              activeOpacity={1}
              onPress={closeInfoModal}
            />
          </Animated.View>

          <Animated.View
            style={[S.$modalContainer, sheetAnimStyle, { paddingBottom: insets.bottom + 20 }]}
          >
            <ScrollView showsVerticalScrollIndicator={false} bounces={false}>
              <View style={S.$modalSection}>
                <View style={S.$modalHeaderRow}>
                  <IconInfoCircle size={24} color="#1062D8" />
                  <Text
                    text={translate("tbmJoinScreen:infoModal.title")}
                    style={S.$modalTitleText}
                  />
                </View>
              </View>

              <View style={S.$sectionGap} />

              <View style={S.$modalSection}>
                <Text
                  text={translate("tbmJoinScreen:infoModal.meaning.heading")}
                  style={S.$sectionHeading}
                />
                <Text
                  text={translate("tbmJoinScreen:infoModal.meaning.body")}
                  style={S.$sectionBody}
                />
              </View>

              <View style={S.$sectionGap} />

              <View style={S.$modalSection}>
                <Text
                  text={translate("tbmJoinScreen:infoModal.importance.heading")}
                  style={S.$sectionHeading}
                />
                <Text
                  text={translate("tbmJoinScreen:infoModal.importance.body")}
                  style={S.$sectionBody}
                />
              </View>

              <View style={S.$sectionGap} />

              <View style={S.$modalSection}>
                <Text
                  text={translate("tbmJoinScreen:infoModal.procedure.heading")}
                  style={S.$sectionHeading}
                />
                <Text
                  text={`1.  ${translate("tbmJoinScreen:infoModal.procedure.step1")}`}
                  style={S.$procedureStep}
                />
                <Text
                  text={`2.  ${translate("tbmJoinScreen:infoModal.procedure.step2")}`}
                  style={S.$procedureStep}
                />
                <Text
                  text={`3.  ${translate("tbmJoinScreen:infoModal.procedure.step3")}`}
                  style={S.$procedureStep}
                />
                <Text
                  text={`4.  ${translate("tbmJoinScreen:infoModal.procedure.step4")}`}
                  style={S.$procedureStep}
                />
              </View>
            </ScrollView>

            <TouchableOpacity
              style={S.$modalCloseBtn}
              activeOpacity={0.75}
              onPress={closeInfoModal}
            >
              <Text
                text={translate("tbmJoinScreen:infoModal.close")}
                style={S.$modalCloseBtnText}
              />
            </TouchableOpacity>
          </Animated.View>
        </View>
      </Modal>
    </>
  )
}
