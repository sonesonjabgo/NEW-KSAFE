import { FC, useRef, useState } from "react"
import {
  ActivityIndicator,
  Image,
  ImageStyle,
  Platform,
  TextInput,
  TextStyle,
  TouchableOpacity,
  Text as RNText,
  StatusBar,
  View,
  ViewStyle,
} from "react-native"
import { IconAlertCircle } from "@tabler/icons-react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"

import EyeOffSvg from "@assets/icons/login/eye-off.svg"
import EyeSvg from "@assets/icons/login/eye.svg"
import LockSvg from "@assets/icons/login/lock.svg"
const LogoIcon = require("@assets/images/whiteIcon.png")
import MailSvg from "@assets/icons/login/mail.svg"

import { ConfirmModal } from "@/components/ConfirmModal"
import { Screen } from "@/components/Screen"
import { useAuth } from "@/context/AuthContext"
import { translate } from "@/i18n/translate"
import type { AppStackScreenProps } from "@/navigators/navigationTypes"
import { colors } from "@/theme/colors"
import { useResponsive } from "@/theme/responsive"

interface LoginScreenProps extends AppStackScreenProps<"Login"> {}

export const LoginScreen: FC<LoginScreenProps> = () => {
  const { signIn } = useAuth()
  const passwordInputRef = useRef<TextInput>(null)
  const [secureText, setSecureText] = useState(true)
  const [forgotModalVisible, setForgotModalVisible] = useState(false)
  const [isEmailFocused, setIsEmailFocused] = useState(false)
  const [isPasswordFocused, setIsPasswordFocused] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [emailError, setEmailError] = useState("")
  const [passwordError, setPasswordError] = useState("")
  const [loading, setLoading] = useState(false)
  const { bottom: bottomInset } = useSafeAreaInsets()
  const { width, height, isSmallPhone, isLargePhone, isTablet, isShortHeight } = useResponsive()

  const isCompact = isSmallPhone || isShortHeight

  const navySectionHeight = isTablet
    ? Math.min(height * 0.38, 300)
    : isShortHeight
      ? height * 0.34
      : isSmallPhone
        ? height * 0.39
        : isLargePhone
          ? height * 0.42
          : height * 0.4

  const logoSize = isTablet ? 96 : isSmallPhone ? 60 : isShortHeight ? 64 : 80
  const logoGap = isSmallPhone ? 5 : isShortHeight ? 6 : 9

  const cardPaddingTop = isTablet ? 48 : isSmallPhone ? 28 : isShortHeight ? 24 : 32
  const cardPaddingHorizontal = isTablet ? Math.max(24, (width - 480) / 2) : 24

  const gapSmallH = isSmallPhone ? 16 : isCompact ? 10 : 16
  const gapMedH = isSmallPhone ? 12 : isCompact ? 16 : 24
  const gapLargeH = isSmallPhone ? 16 : isCompact ? 20 : 32

  const controlHeight = isCompact ? 44 : 48
  const cardPaddingBottom = isSmallPhone ? Math.max(bottomInset, 16) : Math.max(bottomInset, 24)

  const $navySectionDynamic: ViewStyle = { height: navySectionHeight }
  const $logoContainerDynamic: ViewStyle = { gap: logoGap }
  const $cardDynamic: ViewStyle = { paddingTop: cardPaddingTop, paddingBottom: cardPaddingBottom }
  const $cardContentDynamic: ViewStyle = { paddingHorizontal: cardPaddingHorizontal }
  const $gapS: ViewStyle = { height: gapSmallH }
  const $gapM: ViewStyle = { height: gapMedH }
  const $gapL: ViewStyle = { height: gapLargeH }
  const $controlDynamic: ViewStyle = { height: controlHeight }
  const $textInputDynamic: TextStyle = { height: controlHeight - 4 }
  const $brandNameDynamic: TextStyle = isSmallPhone ? { fontSize: 18 } : {}
  const $taglineDynamic: TextStyle = isSmallPhone ? { fontSize: 12 } : {}

  const modalWidth = isTablet ? 400 : isLargePhone ? 360 : isSmallPhone ? 290 : 330
  const $modalCardDynamic: ViewStyle = { width: modalWidth }

  const EMAIL_REGEX = /\S+@\S+\.\S+/

  const handleLogin = async () => {
    let emailErr = ""
    let passwordErr = ""
    const trimmedEmail = email.trim()

    if (!trimmedEmail) {
      emailErr = translate("loginScreen:validation.required")
    } else if (!EMAIL_REGEX.test(trimmedEmail)) {
      emailErr = translate("loginScreen:validation.invalidEmail")
    }

    if (!password) {
      passwordErr = translate("loginScreen:validation.required")
    } else if (password.length < 6) {
      passwordErr = translate("loginScreen:validation.passwordTooShort")
    }

    setEmailError(emailErr)
    setPasswordError(passwordErr)

    if (emailErr || passwordErr) return

    setLoading(true)
    const result = await signIn(email.trim(), password)
    setLoading(false)

    if (result.error) {
      setPasswordError(translate("loginScreen:validation.invalidCredentials"))
      return
    }
  }

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#1B2A4A" />
      <Screen
        style={$root}
        contentContainerStyle={$screenContent}
        preset="scroll"
        safeAreaEdges={["top"]}
        backgroundColor={colors.navy}
        KeyboardAvoidingViewProps={{
          behavior: Platform.OS === "ios" ? "padding" : undefined,
        }}
      >
        {/* 상단 네이비 영역 */}
        <View style={[$navySection, $navySectionDynamic]}>
          <View style={[$logoContainer, $logoContainerDynamic]}>
            <Image source={LogoIcon} style={[$logoImage, { width: logoSize, height: logoSize }]} resizeMode="contain" />
            <RNText style={[$brandName, $brandNameDynamic]}>K-SAFEONE</RNText>
            <RNText style={[$tagline, $taglineDynamic]}>{translate("loginScreen:tagline")}</RNText>
          </View>
        </View>

        {/* 하단 흰색 카드 — paddingHorizontal은 $cardContent 내부 래퍼에서 처리 */}
        <View style={[$card, $cardDynamic]}>
          <View style={[$cardContent, $cardContentDynamic]}>
            <RNText style={$cardTitle}>{translate("loginScreen:logIn")}</RNText>

            <View style={$gapM} />

            <View style={$formBox}>
              {/* 이메일 필드 */}
              <RNText style={$label}>
                {translate("loginScreen:emailFieldLabel")} <RNText style={$required}>*</RNText>
              </RNText>
              <View
                style={[
                  $inputRow,
                  $controlDynamic,
                  isEmailFocused && $inputRowFocused,
                  !isEmailFocused && !!emailError && $inputRowError,
                ]}
              >
                <MailSvg width={18} height={18} color="#9CA3AF" style={$inputIcon} />
                <TextInput
                  style={[$textInput, $textInputDynamic]}
                  placeholder={translate("loginScreen:emailFieldPlaceholder")}
                  placeholderTextColor="#666666"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  underlineColorAndroid="transparent"
                  returnKeyType="next"
                  blurOnSubmit={false}
                  value={email}
                  onChangeText={setEmail}
                  onSubmitEditing={() => passwordInputRef.current?.focus()}
                  onFocus={() => setIsEmailFocused(true)}
                  onBlur={() => {
                    setIsEmailFocused(false)
                    if (!email.trim()) {
                      setEmailError(translate("loginScreen:validation.required"))
                    } else if (!EMAIL_REGEX.test(email.trim())) {
                      setEmailError(translate("loginScreen:validation.invalidEmail"))
                    } else {
                      setEmailError("")
                    }
                  }}
                  editable={!loading}
                />
              </View>
              {!isEmailFocused && !!emailError && <RNText style={$errorText}>{emailError}</RNText>}

              <View style={$gapM} />

              {/* 비밀번호 필드 */}
              <RNText style={$label}>
                {translate("loginScreen:passwordFieldLabel")} <RNText style={$required}>*</RNText>
              </RNText>
              <View
                style={[
                  $inputRow,
                  $controlDynamic,
                  isPasswordFocused && $inputRowFocused,
                  !isPasswordFocused && !!passwordError && $inputRowError,
                ]}
              >
                <LockSvg width={18} height={18} color="#9CA3AF" style={$inputIcon} />
                <TextInput
                  ref={passwordInputRef}
                  style={[$textInput, $passwordInput, $textInputDynamic]}
                  placeholder={translate("loginScreen:passwordFieldPlaceholder")}
                  placeholderTextColor="#666666"
                  secureTextEntry={secureText}
                  underlineColorAndroid="transparent"
                  returnKeyType="done"
                  value={password}
                  onChangeText={setPassword}
                  onSubmitEditing={handleLogin}
                  onFocus={() => setIsPasswordFocused(true)}
                  onBlur={() => {
                    setIsPasswordFocused(false)
                    if (!password) {
                      setPasswordError(translate("loginScreen:validation.required"))
                    } else if (password.length < 6) {
                      setPasswordError(translate("loginScreen:validation.passwordTooShort"))
                    } else {
                      setPasswordError("")
                    }
                  }}
                  editable={!loading}
                />
                <TouchableOpacity onPress={() => setSecureText((v) => !v)} hitSlop={8}>
                  {secureText ? (
                    <EyeOffSvg width={18} height={18} color="#9CA3AF" />
                  ) : (
                    <EyeSvg width={18} height={18} color="#9CA3AF" />
                  )}
                </TouchableOpacity>
              </View>
              {!isPasswordFocused && !!passwordError && (
                <RNText style={$errorText}>{passwordError}</RNText>
              )}
            </View>

            <View style={$gapL} />

            {/* 로그인 버튼 */}
            <TouchableOpacity
              style={[$loginButton, $controlDynamic, loading && $loginButtonDisabled]}
              onPress={handleLogin}
              activeOpacity={0.85}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="#FFFFFF" />
              ) : (
                <RNText style={$loginButtonText}>{translate("loginScreen:logIn")}</RNText>
              )}
            </TouchableOpacity>

            <View style={$gapS} />

            {/* 비밀번호 찾기 */}
            <TouchableOpacity onPress={() => setForgotModalVisible(true)} style={$forgotWrapper}>
              <RNText style={$forgotText}>{translate("loginScreen:forgotPassword")}</RNText>
            </TouchableOpacity>
          </View>
        </View>
      </Screen>

      <ConfirmModal
        visible={forgotModalVisible}
        cardStyle={$modalCardDynamic}
        icon={
          <View style={$modalIconCircle}>
            <IconAlertCircle size={26} color={colors.blue} strokeWidth={1.8} />
          </View>
        }
        title={translate("loginScreen:forgotPasswordModal.title")}
        message={translate("loginScreen:forgotPasswordModal.message")}
        confirmLabel={translate("loginScreen:forgotPasswordModal.confirm")}
        confirmBgColor={colors.blue}
        onCancel={() => setForgotModalVisible(false)}
        onConfirm={() => setForgotModalVisible(false)}
      />
    </>
  )
}

// ── Static styles ─────────────────────────────────────────────────────────────

const $root: ViewStyle = {
  flex: 1,
  backgroundColor: colors.navy,
}

const $screenContent: ViewStyle = { flexGrow: 1 }

const $navySection: ViewStyle = {
  width: "100%",
  justifyContent: "center",
  alignItems: "center",
}

// gap은 동적 — $logoContainerDynamic에서 주입
const $logoContainer: ViewStyle = {
  alignItems: "center",
}

// width/height는 JSX props(logoSize)로 제어 — marginBottom만 유지
const $logoImage: ImageStyle = {
  marginBottom: 8,
}

const $brandName: TextStyle = {
  fontSize: 22,
  lineHeight: 30,
  color: "#FFFFFF",
  fontWeight: "bold",
  letterSpacing: 1,
}

const $tagline: TextStyle = {
  fontSize: 14,
  color: "rgba(255,255,255,0.8)",
}

// outer: 항상 전체 너비 보장, 배경색·borderRadius 담당. paddingHorizontal은 $cardContent에서 처리
const $card: ViewStyle = {
  width: "100%",
  alignSelf: "stretch",
  flex: 1,
  backgroundColor: "#FFFFFF",
  borderTopLeftRadius: 24,
  borderTopRightRadius: 24,
  marginTop: -20,
}

const $cardContent: ViewStyle = {
  flex: 1,
}

const $cardTitle: TextStyle = {
  fontSize: 22,
  lineHeight: 30,
  fontWeight: "bold",
  color: "#1B2A4A",
}

const $label: TextStyle = {
  fontSize: 14,
  color: "#374151",
  marginBottom: 6,
}

const $required: TextStyle = {
  color: colors.danger,
}

// height는 $controlDynamic에서 주입
// borderWidth 항상 유지 — focused 시 borderColor만 변경해 레이아웃 쉬프트 방지
// overflow: "hidden" — TextInput 네이티브 포커스 링이 래퍼 경계 밖으로 삐져나오지 않도록 클리핑
// paddingHorizontal: 12→10으로 borderWidth 2 보정
const $inputRow: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
  backgroundColor: "#F5F5F5",
  borderRadius: 12,
  paddingHorizontal: 10,
  borderWidth: 2,
  borderColor: "transparent",
  overflow: "hidden",
}

const $inputRowFocused: ViewStyle = {
  borderColor: colors.blue,
  backgroundColor: colors.toggleCardBg,
}

const $inputRowError: ViewStyle = {
  borderColor: colors.danger,
}

const $errorText: TextStyle = {
  fontSize: 12,
  color: colors.danger,
  marginTop: 4,
}

const $inputIcon: ViewStyle = {
  marginEnd: 8,
}

// height는 $textInputDynamic에서 주입
// borderWidth: 0 명시 — 플랫폼별 시스템 focus 테두리 억제
const $textInput: TextStyle = {
  flex: 1,
  fontSize: 14,
  color: "#111827",
  backgroundColor: "transparent",
  borderWidth: 0,
  outlineStyle: "none" as any,
  outlineWidth: 0,
}

const $passwordInput: TextStyle = {}

// height는 $controlDynamic에서 주입
const $loginButton: ViewStyle = {
  backgroundColor: colors.navy,
  borderRadius: 12,
  justifyContent: "center",
  alignItems: "center",
}

const $loginButtonDisabled: ViewStyle = {
  opacity: 0.6,
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
  color: "#555555",
  textDecorationLine: "underline",
}

// padding은 $formBoxDynamic에서 주입
const $formBox: ViewStyle = {
  borderRadius: 16,
}

// ── 비밀번호 찾기 모달 ─────────────────────────────────────────────────────────

const $modalIconCircle: ViewStyle = {
  width: 52,
  height: 52,
  borderRadius: 26,
  backgroundColor: colors.modalIconBg,
  alignItems: "center",
  justifyContent: "center",
}
