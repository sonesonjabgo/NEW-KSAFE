import { FC, useState } from "react"
import { ScrollView, StatusBar, TouchableOpacity, View } from "react-native"
import { useNavigation } from "@react-navigation/native"
import {
  IconAlertTriangle,
  IconChevronLeft,
  IconKeyboard,
  IconLanguageHiragana,
  IconQrcode,
} from "@tabler/icons-react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"

import { Text } from "@/components/Text"
import i18n from "i18next"

import { fromI18nKey } from "@/i18n/i18n"
import { isRTL } from "@/i18n/rtl"
import { translate } from "@/i18n/translate"
import { colors } from "@/theme/colors"
import { useResponsive } from "@/theme/responsive"

import { QrCodeBottomSheet } from "./components/QrCodeBottomSheet"
import * as S from "./styles"

export const QrScannerScreen: FC = () => {
  const navigation = useNavigation()
  const { top } = useSafeAreaInsets()
  const [isCodeSheetOpen, setIsCodeSheetOpen] = useState(false)
  const [hasCameraPermission, setHasCameraPermission] = useState(false)

  const {
    width,
    height,
    isSmallPhone,
    isBasePhone,
    isLargePhone,
    isTablet,
    isShortHeight,
    breakpoint,
  } = useResponsive()

  // QR 프레임 크기 — 화면 크기 기반 반응형
  const qrFrameSize = isShortHeight
    ? Math.min(Math.floor(height * 0.27), 200)
    : isSmallPhone
      ? 180
      : isBasePhone
        ? 220
        : isLargePhone
          ? 240
          : Math.min(Math.floor(width * 0.4), 260) // isTablet

  // 모서리 브래킷 크기
  const cornerSize = isSmallPhone ? 20 : isTablet ? 28 : 24

  // QR 아이콘 크기
  const qrIconSize = isSmallPhone || isShortHeight ? 64 : 80

  // 콘텐츠 영역 패딩
  const contentPaddingH = isTablet ? 32 : isSmallPhone ? 16 : 20
  const contentPaddingT = isSmallPhone || isShortHeight ? 16 : 24

  // 스캔 카드 패딩
  const scanCardPaddingH = isSmallPhone ? 14 : 20
  const scanCardPaddingV = isShortHeight ? 14 : isSmallPhone ? 18 : 24

  // 헤더 설명 — breakpoint 직접 사용
  const descFontSize = breakpoint === "smallPhone" ? 13 : breakpoint === "tablet" ? 15 : 14
  const descLineHeight = breakpoint === "smallPhone" ? 20 : breakpoint === "tablet" ? 24 : 22
  const descPaddingBottom = isSmallPhone || isShortHeight ? 14 : 24

  // 권한 안내 텍스트
  const permFontSize = isSmallPhone ? 12 : 13

  // 다시 시도 버튼
  const retryPaddingV = isSmallPhone || isShortHeight ? 11 : 15
  const retryFontSize = isSmallPhone ? 14 : 15

  // 언어 카드
  const langCardPaddingV = isSmallPhone || isShortHeight ? 10 : 14
  const langFontSize = isSmallPhone ? 13 : 14

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor={colors.navy} />

      <View style={S.$root}>
        {/* 상단 네이비 헤더 */}
        <View style={[S.$header, { paddingTop: top + 10 }]}>
          <TouchableOpacity
            style={S.$headerSide}
            activeOpacity={0.7}
            onPress={() => navigation.goBack()}
          >
            <View style={isRTL ? S.$chevronRTL : undefined}>
              <IconChevronLeft size={24} color="#FFFFFF" />
            </View>
          </TouchableOpacity>

          <View style={S.$headerTitleContainer}>
            <Text style={S.$headerTitle} numberOfLines={2}>
              {translate("qrScanner:title")}
            </Text>
          </View>

          <TouchableOpacity
            style={S.$keyboardBtn}
            activeOpacity={0.7}
            onPress={() => setIsCodeSheetOpen(true)}
          >
            <IconKeyboard size={20} color="#FFFFFF" />
          </TouchableOpacity>
        </View>

        {/* 헤더 설명 — 다른 화면과 달리 콘텐츠 라운드 시작 전 위치 */}
        <View style={[S.$headerDescContainer, { paddingBottom: descPaddingBottom }]}>
          <Text style={[S.$headerDesc, { fontSize: descFontSize, lineHeight: descLineHeight }]}>
            {translate("qrScanner:description")}
          </Text>
        </View>

        {/* 하단 콘텐츠 영역 */}
        <ScrollView
          style={S.$contentArea}
          contentContainerStyle={[
            S.$contentInner,
            isTablet && S.$contentInnerTablet,
            { paddingHorizontal: contentPaddingH, paddingTop: contentPaddingT },
          ]}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* QR 스캔 카드 */}
          <View
            style={[
              S.$scanCard,
              {
                paddingHorizontal: scanCardPaddingH,
                paddingTop: scanCardPaddingV,
                paddingBottom: scanCardPaddingV,
              },
            ]}
          >
            {/* QR 스캔 프레임 */}
            <View style={[S.$qrFrameWrapper, { width: qrFrameSize, height: qrFrameSize }]}>
              <View style={[S.$cornerTL, { width: cornerSize, height: cornerSize }]} />
              <View style={[S.$cornerTR, { width: cornerSize, height: cornerSize }]} />
              <View style={[S.$cornerBL, { width: cornerSize, height: cornerSize }]} />
              <View style={[S.$cornerBR, { width: cornerSize, height: cornerSize }]} />

              <IconQrcode size={qrIconSize} color="#CACACA" strokeWidth={1.2} />
            </View>

            {!hasCameraPermission && (
              <>
                {/* 카메라 권한 없음 경고 */}
                <View style={S.$permissionBanner}>
                  <IconAlertTriangle size={16} color="#B45309" />
                  <Text style={[S.$permissionText, { fontSize: permFontSize }]}>
                    {translate("qrScanner:permissionRequired")}
                  </Text>
                </View>

                {/* 다시 시도 버튼 */}
                <TouchableOpacity
                  style={[S.$retryBtn, { paddingVertical: retryPaddingV }]}
                  activeOpacity={0.85}
                  onPress={() => setHasCameraPermission(true)}
                >
                  <Text style={[S.$retryBtnText, { fontSize: retryFontSize }]}>
                    {translate("qrScanner:retry")}
                  </Text>
                </TouchableOpacity>
              </>
            )}
          </View>

          {/* 언어 카드 */}
          <View style={[S.$languageCard, { paddingVertical: langCardPaddingV }]}>
            <IconLanguageHiragana size={20} color="#4B5563" />
            <Text style={[S.$languageText, { fontSize: langFontSize }]}>
              {translate("qrScanner:languageLabel")}{" "}
              <Text style={S.$languageHighlight}>
                · {translate(`languageSettings:languageNames.${fromI18nKey(i18n.language)}` as any)}
              </Text>
            </Text>
          </View>
        </ScrollView>
      </View>

      <QrCodeBottomSheet isVisible={isCodeSheetOpen} onClose={() => setIsCodeSheetOpen(false)} />
    </>
  )
}
