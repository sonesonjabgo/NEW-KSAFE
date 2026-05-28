import { FC, useEffect, useRef, useState } from "react"
import {
  Animated,
  Keyboard,
  Modal,
  Platform,
  // eslint-disable-next-line no-restricted-imports
  TextInput,
  TouchableOpacity,
  View,
} from "react-native"

import { Text } from "@/components/Text"
import { translate } from "@/i18n/translate"

import * as S from "../styles"

interface Props {
  isVisible: boolean
  onClose: () => void
}

const SHEET_OFFSET = 500

export const QrCodeBottomSheet: FC<Props> = ({ isVisible, onClose }) => {
  const [accessCode, setAccessCode] = useState("")
  const [modalVisible, setModalVisible] = useState(false)
  const overlayOpacity = useRef(new Animated.Value(0)).current
  const sheetTranslateY = useRef(new Animated.Value(SHEET_OFFSET)).current
  const keyboardOffset = useRef(new Animated.Value(0)).current
  const isReady = accessCode.length === 8

  useEffect(() => {
    if (isVisible) {
      setModalVisible(true)
      Animated.parallel([
        Animated.timing(overlayOpacity, {
          toValue: 1,
          duration: 150,
          useNativeDriver: true,
        }),
        Animated.timing(sheetTranslateY, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start()
    } else {
      Animated.parallel([
        Animated.timing(overlayOpacity, {
          toValue: 0,
          duration: 180,
          useNativeDriver: true,
        }),
        Animated.timing(sheetTranslateY, {
          toValue: SHEET_OFFSET,
          duration: 250,
          useNativeDriver: true,
        }),
      ]).start(() => {
        setModalVisible(false)
        setAccessCode("")
        keyboardOffset.setValue(0)
      })
    }
  }, [isVisible, overlayOpacity, sheetTranslateY, keyboardOffset])

  // 모달이 보일 때만 키보드 이벤트 감지
  // iOS: keyboardWillShow/Hide → 키보드 나타나기 전에 발동 → 완전히 동기 이동
  // Android: keyboardDidShow/Hide → 키보드 나타난 후 발동 → 짧은 duration으로 빠르게 따라감
  useEffect(() => {
    if (!modalVisible) return

    const showEvent = Platform.OS === "ios" ? "keyboardWillShow" : "keyboardDidShow"
    const hideEvent = Platform.OS === "ios" ? "keyboardWillHide" : "keyboardDidHide"

    const onShow = Keyboard.addListener(showEvent, (e) => {
      Animated.timing(keyboardOffset, {
        toValue: -e.endCoordinates.height,
        duration: Platform.OS === "ios" ? e.duration : 120,
        useNativeDriver: true,
      }).start()
    })

    const onHide = Keyboard.addListener(hideEvent, (e) => {
      Animated.timing(keyboardOffset, {
        toValue: 0,
        duration: Platform.OS === "ios" ? e.duration : 120,
        useNativeDriver: true,
      }).start()
    })

    return () => {
      onShow.remove()
      onHide.remove()
    }
  }, [modalVisible, keyboardOffset])

  return (
    <Modal visible={modalVisible} transparent animationType="none" onRequestClose={onClose}>
      <View style={S.$overlay}>
        {/* 딤 배경: 전체 화면 고정, fade 애니메이션 */}
        <Animated.View style={[S.$overlayBg, { opacity: overlayOpacity }]} pointerEvents="none" />

        {/* 딤 영역 탭 시 닫힘 */}
        <TouchableOpacity style={S.$overlayDismiss} activeOpacity={1} onPress={onClose} />

        {/* 바텀시트: sheetTranslateY + keyboardOffset 합산 (모두 native thread) */}
        <Animated.View
          style={[
            S.$sheet,
            { transform: [{ translateY: Animated.add(sheetTranslateY, keyboardOffset) }] },
          ]}
        >
          {/* 핸들바 */}
          <View style={S.$handle} />

          {/* 안내 문구 */}
          <Text style={S.$sheetDesc}>
            {translate("qrScanner:enterCode")}
            <Text style={S.$required}> *</Text>
          </Text>

          {/* 코드 입력 */}
          <TextInput
            style={S.$codeInput}
            placeholder={translate("qrScanner:codePlaceholder")}
            placeholderTextColor="#9CA3AF"
            value={accessCode}
            onChangeText={(text) => setAccessCode(text.replace(/[^0-9]/g, "").slice(0, 8))}
            keyboardType="number-pad"
            maxLength={8}
          />

          {/* 설명 문구 */}
          <Text style={S.$helperText}>{translate("qrScanner:enterCodeDescription")}</Text>

          {/* 회의 참여하기 버튼 */}
          <TouchableOpacity
            style={[S.$joinBtn, isReady ? S.$joinBtnActive : S.$joinBtnInactive]}
            activeOpacity={0.85}
            disabled={!isReady}
            onPress={() => console.log(accessCode)}
          >
            <Text
              style={[S.$joinBtnText, isReady ? S.$joinBtnTextActive : S.$joinBtnTextInactive]}
            >
              {translate("qrScanner:joinMeeting")}
            </Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </Modal>
  )
}
