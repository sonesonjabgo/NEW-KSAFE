import { FC, useState } from "react"
import {
  View,
  TextInput,
  TouchableOpacity,
  Text as RNText,
  StatusBar,
  useWindowDimensions,
  ViewStyle,
  TextStyle,
} from "react-native"
import { useNavigation } from "@react-navigation/native"
import { useSafeAreaInsets } from "react-native-safe-area-context"

import EyeOffSvg from "@assets/icons/login/eye-off.svg"
import EyeSvg from "@assets/icons/login/eye.svg"
import LockSvg from "@assets/icons/login/lock.svg"
import LogoSvg from "@assets/icons/login/logo-ksafeone.svg"
import MailSvg from "@assets/icons/login/mail.svg"

import { Screen } from "@/components/Screen"
import { translate } from "@/i18n/translate"
import type { AppStackScreenProps } from "@/navigators/navigationTypes"

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
            <LogoSvg width={80} height={80} style={$logoImage} />
            <RNText style={$brandName}>K-SAFEONE</RNText>
            <RNText style={$tagline}>{translate("loginScreen:tagline")}</RNText>
          </View>
        </View>

        {/* 하단 흰색 카드 */}
        <View style={[$card, { paddingBottom: Math.max(bottomInset, 24) }]}>
          <RNText style={$cardTitle}>{translate("loginScreen:logIn")}</RNText>

          <View style={$gap24} />

          {/* 입력 폼 박스 */}
          <View style={$formBox}>
            {/* 이메일 필드 */}
            <RNText style={$label}>
              {translate("loginScreen:emailFieldLabel")} <RNText style={$required}>*</RNText>
            </RNText>
            <View style={$inputRow}>
              <MailSvg width={18} height={18} color="#9CA3AF" style={$inputIcon} />
              <TextInput
                style={$textInput}
                placeholder={translate("loginScreen:emailFieldPlaceholder")}
                placeholderTextColor="#9CA3AF"
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            <View style={$gap24} />

            {/* 비밀번호 필드 */}
            <RNText style={$label}>
              {translate("loginScreen:passwordFieldLabel")} <RNText style={$required}>*</RNText>
            </RNText>
            <View style={$inputRow}>
              <LockSvg width={18} height={18} color="#9CA3AF" style={$inputIcon} />
              <TextInput
                style={[$textInput, $passwordInput]}
                placeholder={translate("loginScreen:passwordFieldPlaceholder")}
                placeholderTextColor="#9CA3AF"
                secureTextEntry={secureText}
              />
              <TouchableOpacity onPress={() => setSecureText((v) => !v)} hitSlop={8}>
                {secureText ? (
                  <EyeOffSvg width={18} height={18} color="#9CA3AF" />
                ) : (
                  <EyeSvg width={18} height={18} color="#9CA3AF" />
                )}
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
            <RNText style={$loginButtonText}>{translate("loginScreen:logIn")}</RNText>
          </TouchableOpacity>

          <View style={$gap16} />

          {/* 비밀번호 찾기 */}
          <TouchableOpacity onPress={() => {}} style={$forgotWrapper}>
            <RNText style={$forgotText}>{translate("loginScreen:forgotPassword")}</RNText>
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

const $logoImage: ViewStyle = {
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

const $inputIcon: ViewStyle = {
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
