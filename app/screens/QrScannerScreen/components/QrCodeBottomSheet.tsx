import { FC, useEffect, useRef, useState } from "react"
import {
  Animated,
  Modal,
  // eslint-disable-next-line no-restricted-imports
  TextInput,
  TouchableOpacity,
  View,
} from "react-native"

import { Text } from "@/components/Text"
import { translate } from "@/i18n/translate"

import { styles } from "../styles"

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
  const isReady = accessCode.length === 8

  useEffect(() => {
    if (isVisible) {
      setModalVisible(true)
      Animated.parallel([
        // 딤 배경: 즉시 fade in
        Animated.timing(overlayOpacity, {
          toValue: 1,
          duration: 150,
          useNativeDriver: true,
        }),
        // 바텀시트: 하단에서 슬라이드 업
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
      })
    }
  }, [isVisible, overlayOpacity, sheetTranslateY])

  return (
    <Modal visible={modalVisible} transparent animationType="none" onRequestClose={onClose}>
      <View style={styles.overlay}>
        {/* 딤 배경: 전체 화면 고정, fade 애니메이션 */}
        <Animated.View
          style={[styles.overlayBg, { opacity: overlayOpacity }]}
          pointerEvents="none"
        />

        {/* 딤 영역 탭 시 닫힘 */}
        <TouchableOpacity style={styles.overlayDismiss} activeOpacity={1} onPress={onClose} />

        {/* 바텀시트: 하단에서 슬라이드 업 */}
        <Animated.View style={[styles.sheet, { transform: [{ translateY: sheetTranslateY }] }]}>
          {/* 핸들바 */}
          <View style={styles.handle} />

          {/* 안내 문구 */}
          <Text style={styles.sheetDesc}>
            {translate("qrScanner:enterCode")}
            <Text style={styles.required}> *</Text>
          </Text>

          {/* 코드 입력 */}
          <TextInput
            style={styles.codeInput}
            placeholder={translate("qrScanner:codePlaceholder")}
            placeholderTextColor="#9CA3AF"
            value={accessCode}
            onChangeText={(text) => setAccessCode(text.replace(/[^0-9]/g, "").slice(0, 8))}
            keyboardType="number-pad"
            maxLength={8}
          />

          {/* 설명 문구 */}
          <Text style={styles.helperText}>{translate("qrScanner:enterCodeDescription")}</Text>

          {/* 회의 참여하기 버튼 */}
          <TouchableOpacity
            style={[styles.joinBtn, isReady ? styles.joinBtnActive : styles.joinBtnInactive]}
            activeOpacity={0.85}
            disabled={!isReady}
            onPress={() => console.log(accessCode)}
          >
            <Text
              style={[
                styles.joinBtnText,
                isReady ? styles.joinBtnTextActive : styles.joinBtnTextInactive,
              ]}
            >
              {translate("qrScanner:joinMeeting")}
            </Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </Modal>
  )
}
