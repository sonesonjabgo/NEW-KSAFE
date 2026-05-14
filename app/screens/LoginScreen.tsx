import { FC, useState } from "react"
import {
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Text as RNText,
  StatusBar,
  useWindowDimensions,
  ViewStyle,
  TextStyle,
  ImageStyle,
} from "react-native"
import { useNavigation } from "@react-navigation/native"
import { useSafeAreaInsets } from "react-native-safe-area-context"

import { Icon } from "@/components/Icon"
import { Screen } from "@/components/Screen"
import type { AppStackScreenProps } from "@/navigators/navigationTypes"

const logoImage = require("@assets/logo-ksafeone.png")

interface LoginScreenProps extends AppStackScreenProps<"Login"> {}

export const LoginScreen: FC<LoginScreenProps> = () => {
  const navigation = useNavigation<any>()
  const [secureText, setSecureText] = useState(true)
  const { height } = useWindowDimensions()
  const { bottom: bottomInset } = useSafeAreaInsets()

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#1B2A4A" />
      <Screen
        style={$root}
        contentContainerStyle={$screenContent}
        preset="fixed"
        safeAreaEdges={["top"]}
      >
        {/* 상단 네이비 영역 */}
        <View style={[$navySection, { height: height * 0.42 }]}>
          <View style={$logoContainer}>
            <Image source={logoImage} style={$logoImage} resizeMode="contain" />
            <RNText style={$brandName}>K-SAFEONE</RNText>
            <RNText style={$tagline}>현장을 이해하는 통합 안전 파트너</RNText>
          </View>
        </View>

        {/* 하단 흰색 카드 */}
        <View style={[$card, { paddingBottom: Math.max(bottomInset, 24) }]}>
          <RNText style={$cardTitle}>로그인</RNText>

          <View style={$gap24} />

          {/* 입력 폼 박스 */}
          <View style={$formBox}>
            {/* 이메일 필드 */}
            <RNText style={$label}>
              이메일 <RNText style={$required}>*</RNText>
            </RNText>
            <View style={$inputRow}>
              <RNText style={$mailIcon}>✉</RNText>
              <TextInput
                style={$textInput}
                placeholder="이메일을 입력하세요."
                placeholderTextColor="#9CA3AF"
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            <View style={$gap24} />

            {/* 비밀번호 필드 */}
            <RNText style={$label}>
              비밀번호 <RNText style={$required}>*</RNText>
            </RNText>
            <View style={$inputRow}>
              <Icon icon="lock" size={18} color="#9CA3AF" />
              <TextInput
                style={[$textInput, $passwordInput]}
                placeholder="패스워드를 입력하세요."
                placeholderTextColor="#9CA3AF"
                secureTextEntry={secureText}
              />
              <TouchableOpacity onPress={() => setSecureText((v) => !v)} hitSlop={8}>
                <Icon icon={secureText ? "hidden" : "view"} size={18} color="#9CA3AF" />
              </TouchableOpacity>
            </View>
          </View>

          <View style={$gap32} />

          {/* 로그인 버튼 */}
          <TouchableOpacity
            style={$loginButton}
            onPress={() => navigation.navigate("Main")}
            activeOpacity={0.85}
          >
            <RNText style={$loginButtonText}>로그인</RNText>
          </TouchableOpacity>

          <View style={$gap16} />

          {/* 비밀번호 찾기 */}
          <TouchableOpacity onPress={() => {}} style={$forgotWrapper}>
            <RNText style={$forgotText}>비밀번호를 잊으셨나요?</RNText>
          </TouchableOpacity>
        </View>
      </Screen>
    </>
  )
}

const $root: ViewStyle = {
  flex: 1,
  backgroundColor: "#0B3069",
}

const $navySection: ViewStyle = {
  justifyContent: "center",
  alignItems: "center",
}

const $logoContainer: ViewStyle = {
  alignItems: "center",
  gap: 9,
}

const $logoImage: ImageStyle = {
  width: 80,
  height: 80,
  marginBottom: 8,
}

const $brandName: TextStyle = {
  fontSize: 22,
  color: "#FFFFFF",
  fontWeight: "bold",
  letterSpacing: 1,
}

const $tagline: TextStyle = {
  fontSize: 14,
  color: "rgba(255,255,255,0.8)",
}

const $card: ViewStyle = {
  flex: 1,
  backgroundColor: "#FFFFFF",
  borderTopLeftRadius: 24,
  borderTopRightRadius: 24,
  marginTop: -20,
  paddingHorizontal: 24,
  paddingTop: 32,
}

const $cardTitle: TextStyle = {
  fontSize: 22,
  fontWeight: "bold",
  color: "#1B2A4A",
}

const $label: TextStyle = {
  fontSize: 14,
  color: "#374151",
  marginBottom: 6,
}

const $required: TextStyle = {
  color: "#EF4444",
}

const $inputRow: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
  backgroundColor: "#F5F5F5",
  borderRadius: 12,
  height: 48,
  paddingHorizontal: 12,
}

const $mailIcon: TextStyle = {
  fontSize: 16,
  color: "#9CA3AF",
  marginRight: 8,
}

const $textInput: TextStyle = {
  flex: 1,
  fontSize: 14,
  color: "#111827",
  height: 48,
}

const $passwordInput: TextStyle = {
  marginLeft: 8,
}

const $loginButton: ViewStyle = {
  backgroundColor: "#0B3069",
  borderRadius: 12,
  height: 48,
  justifyContent: "center",
  alignItems: "center",
}

const $loginButtonText: TextStyle = {
  color: "#FFFFFF",
  fontSize: 16,
  fontWeight: "bold",
}

const $forgotWrapper: ViewStyle = {
  alignItems: "center",
}

const $forgotText: TextStyle = {
  fontSize: 14,
  color: "#6B7280",
}

const $formBox: ViewStyle = {
  borderRadius: 16,
  padding: 20,
}

const $screenContent: ViewStyle = { flex: 1 }
const $gap16: ViewStyle = { height: 16 }
const $gap24: ViewStyle = { height: 24 }
const $gap32: ViewStyle = { height: 32 }
