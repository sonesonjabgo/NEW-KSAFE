import { FC, useEffect, useRef, useState } from "react"
import {
  Animated,
  Modal,
  StyleSheet,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"

import { Text } from "@/components/Text"
import { translate } from "@/i18n/translate"
import { colors } from "@/theme/colors"
import { typography } from "@/theme/typography"

const SHEET_HEIGHT = 293

interface PushNotificationBottomSheetProps {
  isVisible: boolean
  onAllow: () => void
  onOpenSettings: () => void
  onClose: () => void
}

export const PushNotificationBottomSheet: FC<PushNotificationBottomSheetProps> = ({
  isVisible,
  onAllow,
  onOpenSettings,
  onClose,
}) => {
  const insets = useSafeAreaInsets()
  const [modalVisible, setModalVisible] = useState(false)
  const fadeAnim = useRef(new Animated.Value(0)).current
  const slideAnim = useRef(new Animated.Value(SHEET_HEIGHT)).current
  // 닫힘 콜백이 늦게 실행돼도 열린 모달을 닫지 않도록 방어
  const shouldHideRef = useRef(false)

  useEffect(() => {
    if (isVisible) {
      shouldHideRef.current = false
      fadeAnim.setValue(0)
      slideAnim.setValue(SHEET_HEIGHT)
      setModalVisible(true)
      Animated.parallel([
        Animated.timing(fadeAnim, { toValue: 1, duration: 250, useNativeDriver: true }),
        Animated.spring(slideAnim, { toValue: 0, bounciness: 4, useNativeDriver: true }),
      ]).start()
    } else {
      shouldHideRef.current = true
      Animated.parallel([
        Animated.timing(fadeAnim, { toValue: 0, duration: 220, useNativeDriver: true }),
        Animated.timing(slideAnim, {
          toValue: SHEET_HEIGHT,
          duration: 220,
          useNativeDriver: true,
        }),
      ]).start(({ finished }) => {
        if (finished && shouldHideRef.current) {
          setModalVisible(false)
        }
      })
    }
  }, [isVisible, fadeAnim, slideAnim])

  return (
    <Modal visible={modalVisible} transparent animationType="none" onRequestClose={onClose}>
      <View style={StyleSheet.absoluteFill}>
        <Animated.View style={[StyleSheet.absoluteFill, $backdrop, { opacity: fadeAnim }]} />
        <TouchableOpacity style={StyleSheet.absoluteFill} onPress={onClose} activeOpacity={1} />

        <Animated.View
          style={[
            $sheet,
            { paddingBottom: insets.bottom + 20 },
            { transform: [{ translateY: slideAnim }] },
          ]}
        >
          {/* Drag handle */}
          <View style={$dragHandleArea}>
            <View style={$dragHandle} />
          </View>

          {/* Content */}
          <View style={$content}>
            <Text text={translate("homeScreen:pushNotificationSheet.title")} style={$title} />
            <Text
              text={translate("homeScreen:pushNotificationSheet.description")}
              style={$description}
            />
          </View>

          {/* Allow button */}
          <TouchableOpacity style={$allowBtn} activeOpacity={0.85} onPress={onAllow}>
            <Text
              text={translate("homeScreen:pushNotificationSheet.allowButton")}
              style={$allowBtnLabel}
            />
          </TouchableOpacity>

          {/* Settings link */}
          <TouchableOpacity style={$settingsBtn} activeOpacity={0.7} onPress={onOpenSettings}>
            <Text
              text={translate("homeScreen:pushNotificationSheet.settingsButton")}
              style={$settingsBtnLabel}
            />
          </TouchableOpacity>
        </Animated.View>
      </View>
    </Modal>
  )
}

const $backdrop: ViewStyle = {
  backgroundColor: "rgba(0, 0, 0, 0.5)",
}

const $sheet: ViewStyle = {
  position: "absolute",
  bottom: 0,
  left: 0,
  right: 0,
  backgroundColor: "#FFFFFF",
  borderTopLeftRadius: 20,
  borderTopRightRadius: 20,
  alignItems: "center",
  paddingHorizontal: 24,
}

const $dragHandleArea: ViewStyle = {
  paddingTop: 14,
  paddingBottom: 20,
  alignItems: "center",
  alignSelf: "stretch",
}

const $dragHandle: ViewStyle = {
  width: 46,
  height: 4,
  borderRadius: 2,
  backgroundColor: "#7B7B7B",
}

const $content: ViewStyle = {
  alignItems: "center",
  marginBottom: 20,
  gap: 8,
}

const $title: TextStyle = {
  fontSize: 15,
  fontFamily: typography.primary.semiBold,
  lineHeight: 23,
  textAlign: "center",
  color: "#888888",
}

const $description: TextStyle = {
  fontSize: 15,
  fontFamily: typography.primary.medium,
  lineHeight: 23,
  textAlign: "center",
  color: "#888888",
}

const $allowBtn: ViewStyle = {
  width: 346,
  height: 45,
  backgroundColor: colors.blue,
  borderRadius: 10,
  alignItems: "center",
  justifyContent: "center",
  marginBottom: 20,
}

const $allowBtnLabel: TextStyle = {
  fontSize: 17,
  fontFamily: typography.primary.bold,
  color: "#FFFFFF",
}

const $settingsBtn: ViewStyle = {
  alignItems: "center",
  justifyContent: "center",
}

const $settingsBtnLabel: TextStyle = {
  fontSize: 15,
  fontFamily: typography.primary.semiBold,
  lineHeight: 23,
  color: colors.blue,
  textAlign: "center",
}
