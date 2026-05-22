import { FC, useState } from "react"
import {
  TextInput,
  TextStyle,
  TouchableOpacity,
  Text as RNText,
  StatusBar,
  View,
  ViewStyle,
} from "react-native"
import { useNavigation } from "@react-navigation/native"
import { IconAlertCircle } from "@tabler/icons-react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"

import EyeOffSvg from "@assets/icons/login/eye-off.svg"
import EyeSvg from "@assets/icons/login/eye.svg"
import LockSvg from "@assets/icons/login/lock.svg"
import LogoSvg from "@assets/icons/login/logo-ksafeone.svg"
import MailSvg from "@assets/icons/login/mail.svg"

import { ConfirmModal } from "@/components/ConfirmModal"
import { Screen } from "@/components/Screen"
import { translate } from "@/i18n/translate"
import type { AppStackScreenProps } from "@/navigators/navigationTypes"
import { colors } from "@/theme/colors"
import { useResponsive } from "@/theme/responsive"

interface LoginScreenProps extends AppStackScreenProps<"Login"> {}

export const LoginScreen: FC<LoginScreenProps> = () => {
  const navigation = useNavigation<any>()
  const [secureText, setSecureText] = useState(true)
  const [forgotModalVisible, setForgotModalVisible] = useState(false)
  const { bottom: bottomInset } = useSafeAreaInsets()
  const {
    width,
    height,
    isSmallPhone,
    isBasePhone: _isBasePhone,
    isLargePhone,
    isTablet,
    isShortHeight,
    breakpoint: _breakpoint,
  } = useResponsive()

  // isSmallPhone 또는 isShortHeight → 세로 간격 전반 압축
  const isCompact = isSmallPhone || isShortHeight

  // ── 네이비 영역 높이 (breakpoint별 비율) ─────────────────────────────────────
  const navySectionHeight = isTablet
    ? Math.min(height * 0.38, 300)
    : isShortHeight
      ? height * 0.34
      : isSmallPhone
        ? height * 0.36
        : isLargePhone
          ? height * 0.42
          : height * 0.4 // isBasePhone 기본 기준

  // ── 반응형 계산값 ─────────────────────────────────────────────────────────────
  const logoSize = isTablet ? 96 : isCompact ? 64 : 80
  const logoGap = isCompact ? 6 : 9

  const cardPaddingTop = isCompact ? 24 : 32
  // tablet: 내부 콘텐츠 maxWidth 480 기준으로 좌우 padding 확대 → 중앙 정렬 효과
  const cardPaddingHorizontal = isTablet ? Math.max(24, (width - 480) / 2) : 24

  const formBoxPadding = isCompact ? 14 : 20
  const gapSmallH = isCompact ? 10 : 16
  const gapMedH = isCompact ? 16 : 24
  const gapLargeH = isCompact ? 20 : 32

  // 입력 필드 / 버튼 공통 높이
  const controlHeight = isCompact ? 44 : 48

  // ── Pre-computed dynamic styles (react-native/no-inline-styles 준수) ─────────
  const $navySectionDynamic: ViewStyle = { height: navySectionHeight }
  const $logoContainerDynamic: ViewStyle = { gap: logoGap }
  // paddingHorizontal은 $cardContentDynamic으로 분리 — card outer width에 영향 없음
  const $cardDynamic: ViewStyle = {
    paddingTop: cardPaddingTop,
    paddingBottom: Math.max(bottomInset, 24),
  }
  // 카드 내부 콘텐츠의 좌우 여백 — tablet은 크게 잡아 maxWidth 480 중앙 정렬 효과
  const $cardContentDynamic: ViewStyle = { paddingHorizontal: cardPaddingHorizontal }
  const $formBoxDynamic: ViewStyle = { padding: formBoxPadding }
  const $gapS: ViewStyle = { height: gapSmallH }
  const $gapM: ViewStyle = { height: gapMedH }
  const $gapL: ViewStyle = { height: gapLargeH }
  const $controlDynamic: ViewStyle = { height: controlHeight }
  const $textInputDynamic: TextStyle = { height: controlHeight }

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#1B2A4A" />
      <Screen
        style={$root}
        contentContainerStyle={$screenContent}
        preset="fixed"
        safeAreaEdges={["top"]}
        backgroundColor={colors.navy}
      >
        {/* 상단 네이비 영역 */}
        <View style={[$navySection, $navySectionDynamic]}>
          <View style={[$logoContainer, $logoContainerDynamic]}>
            <LogoSvg width={logoSize} height={logoSize} style={$logoImage} />
            <RNText style={$brandName}>K-SAFEONE</RNText>
            <RNText style={$tagline}>{translate("loginScreen:tagline")}</RNText>
          </View>
        </View>

        {/* 하단 흰색 카드 — width:100%로 항상 전체 너비 보장, paddingHorizontal은 내부 래퍼에서 처리 */}
        <View style={[$card, $cardDynamic]}>
          <View style={[$cardContent, $cardContentDynamic]}>
            <RNText style={$cardTitle}>{translate("loginScreen:logIn")}</RNText>

            <View style={$gapM} />

            {/* 입력 폼 박스 */}
            <View style={[$formBox, $formBoxDynamic]}>
              {/* 이메일 필드 */}
              <RNText style={$label}>
                {translate("loginScreen:emailFieldLabel")} <RNText style={$required}>*</RNText>
              </RNText>
              <View style={[$inputRow, $controlDynamic]}>
                <MailSvg width={18} height={18} color="#9CA3AF" style={$inputIcon} />
                <TextInput
                  style={[$textInput, $textInputDynamic]}
                  placeholder={translate("loginScreen:emailFieldPlaceholder")}
                  placeholderTextColor="#9CA3AF"
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </View>

              <View style={$gapM} />

              {/* 비밀번호 필드 */}
              <RNText style={$label}>
                {translate("loginScreen:passwordFieldLabel")} <RNText style={$required}>*</RNText>
              </RNText>
              <View style={[$inputRow, $controlDynamic]}>
                <LockSvg width={18} height={18} color="#9CA3AF" style={$inputIcon} />
                <TextInput
                  style={[$textInput, $passwordInput, $textInputDynamic]}
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

            <View style={$gapL} />

            {/* 로그인 버튼 */}
            <TouchableOpacity
              style={[$loginButton, $controlDynamic]}
              onPress={() => navigation.navigate("Main")}
              activeOpacity={0.85}
            >
              <RNText style={$loginButtonText}>{translate("loginScreen:logIn")}</RNText>
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

const $screenContent: ViewStyle = { flex: 1 }

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
const $logoImage: ViewStyle = {
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

// inner: paddingHorizontal만 담당. tablet은 $cardContentDynamic으로 크게 잡아 중앙 정렬
const $cardContent: ViewStyle = {
  flex: 1,
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
  color: colors.danger,
}

// height는 $controlDynamic에서 주입
const $inputRow: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
  backgroundColor: "#F5F5F5",
  borderRadius: 12,
  paddingHorizontal: 12,
}

const $inputIcon: ViewStyle = {
  marginRight: 8,
}

// height는 $textInputDynamic에서 주입
const $textInput: TextStyle = {
  flex: 1,
  fontSize: 14,
  color: "#111827",
}

const $passwordInput: TextStyle = {
  marginLeft: 8,
}

// height는 $controlDynamic에서 주입
const $loginButton: ViewStyle = {
  backgroundColor: colors.navy,
  borderRadius: 12,
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
