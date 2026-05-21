import { FC, useRef, useState } from "react"
import { Animated, Modal, PanResponder, StyleSheet, TouchableOpacity, View } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import Svg, { Path } from "react-native-svg"

import { Text } from "@/components/Text"
import { translate } from "@/i18n/translate"
import { colors } from "@/theme/colors"

import * as S from "../styles"

interface SignatureBottomSheetProps {
  isVisible: boolean
  fadeAnim: Animated.Value
  slideAnim: Animated.Value
  onClose: () => void
  onSave: (paths: string[]) => void
}

export const SignatureBottomSheet: FC<SignatureBottomSheetProps> = ({
  isVisible,
  fadeAnim,
  slideAnim,
  onClose,
  onSave,
}) => {
  const insets = useSafeAreaInsets()
  const [paths, setPaths] = useState<string[]>([])
  const currentPath = useRef("")
  const isDrawing = useRef(false)

  // onClose를 ref로 보관해 PanResponder 클로저에서 최신값을 참조
  const onCloseRef = useRef(onClose)
  onCloseRef.current = onClose

  const dragPanResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, gs) => gs.dy > 5 && gs.dy > Math.abs(gs.dx),
      onPanResponderMove: (_, gs) => {
        if (gs.dy > 0) slideAnim.setValue(gs.dy)
      },
      onPanResponderRelease: (_, gs) => {
        if (gs.dy > 80 || gs.vy > 0.5) {
          onCloseRef.current()
        } else {
          Animated.spring(slideAnim, { toValue: 0, useNativeDriver: true }).start()
        }
      },
    }),
  ).current

  const drawPanResponder = useRef(
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

  const resetSignature = () => {
    setPaths([])
    currentPath.current = ""
    isDrawing.current = false
  }

  const handleClose = () => {
    resetSignature()
    onClose()
  }

  const handleSave = () => {
    const savedPaths = [...paths]
    resetSignature()
    onSave(savedPaths)
  }

  return (
    <Modal visible={isVisible} transparent animationType="none" onRequestClose={handleClose}>
      <View style={StyleSheet.absoluteFill}>
        <Animated.View style={[StyleSheet.absoluteFill, S.$sheetBackdrop, { opacity: fadeAnim }]} />
        <TouchableOpacity style={StyleSheet.absoluteFill} onPress={handleClose} activeOpacity={1} />
        <Animated.View
          style={[
            S.$sheet,
            { height: 390 + insets.bottom, paddingBottom: insets.bottom + 16 },
            { transform: [{ translateY: slideAnim }] },
          ]}
        >
          {/* 드래그 핸들 */}
          <View style={S.$sheetDragHandleArea} {...dragPanResponder.panHandlers}>
            <View style={S.$sheetDragHandleBar} />
          </View>

          {/* 안내 문구 */}
          <Text
            text={translate("aiRiskDocCreatorScreen:signature.instruction")}
            style={S.$signatureInstruction}
          />

          {/* 서명 입력 박스 */}
          <View style={S.$signatureBox} {...drawPanResponder.panHandlers}>
            <Svg style={StyleSheet.absoluteFill} width="100%" height="100%">
              {paths.map((d, i) => (
                <Path
                  key={i}
                  d={d}
                  stroke={colors.blue}
                  strokeWidth={2.5}
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              ))}
            </Svg>
          </View>

          {/* 하단 버튼 */}
          <View style={S.$signatureActionRow}>
            <TouchableOpacity
              style={S.$signatureCancelBtn}
              activeOpacity={0.75}
              onPress={handleClose}
            >
              <Text
                text={translate("aiRiskDocCreatorScreen:signature.cancel")}
                style={S.$signatureCancelLabel}
              />
            </TouchableOpacity>
            <TouchableOpacity style={S.$signatureSaveBtn} activeOpacity={0.75} onPress={handleSave}>
              <Text
                text={translate("aiRiskDocCreatorScreen:signature.save")}
                style={S.$signatureSaveLabel}
              />
            </TouchableOpacity>
          </View>
        </Animated.View>
      </View>
    </Modal>
  )
}
