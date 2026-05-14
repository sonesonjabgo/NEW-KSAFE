import { FC, useState } from "react"
import { StatusBar, TouchableOpacity, View } from "react-native"
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

import { QrCodeBottomSheet } from "./components/QrCodeBottomSheet"
import { styles } from "./styles"

export const QrScannerScreen: FC = () => {
  const navigation = useNavigation()
  const { top } = useSafeAreaInsets()
  const [isCodeSheetOpen, setIsCodeSheetOpen] = useState(false)
  const [hasCameraPermission, setHasCameraPermission] = useState(false)

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#0B3069" />

      <View style={styles.root}>
        {/* 상단 네이비 헤더 */}
        <View style={[styles.header, { paddingTop: top + 12 }]}>
          <TouchableOpacity
            style={styles.headerIconBtn}
            activeOpacity={0.7}
            onPress={() => navigation.goBack()}
          >
            <IconChevronLeft size={24} color="#FFFFFF" />
          </TouchableOpacity>

          <Text style={styles.headerTitle}>교육/발표 참여</Text>

          <TouchableOpacity
            style={styles.keyboardBtn}
            activeOpacity={0.7}
            onPress={() => setIsCodeSheetOpen(true)}
          >
            <IconKeyboard size={20} color="#FFFFFF" />
          </TouchableOpacity>
        </View>

        {/* 헤더 설명 */}
        <View style={styles.headerDescContainer}>
          <Text style={styles.headerDesc}>
            {"QR 코드를 스캔하거나 발표자가 공유한\n코드를 입력해 회의에 참여하세요."}
          </Text>
        </View>

        {/* 하단 콘텐츠 영역 */}
        <View style={styles.contentArea}>
          {/* QR 스캔 카드 */}
          <View style={styles.scanCard}>
            {/* QR 스캔 프레임 */}
            <View style={styles.qrFrameWrapper}>
              {/* 네 모서리 브래킷 */}
              <View style={styles.cornerTL} />
              <View style={styles.cornerTR} />
              <View style={styles.cornerBL} />
              <View style={styles.cornerBR} />

              {/* QR 아이콘 — 권한 상태 무관하게 항상 표시 */}
              <IconQrcode size={80} color="#CACACA" strokeWidth={1.2} />
            </View>

            {!hasCameraPermission && (
              <>
                {/* 카메라 권한 없음 경고 */}
                <View style={styles.permissionBanner}>
                  <IconAlertTriangle size={16} color="#B45309" />
                  <Text style={styles.permissionText}>
                    QR을 스캔하려면 카메라 권한이 필요합니다.
                  </Text>
                </View>

                {/* 다시 시도 버튼 */}
                <TouchableOpacity
                  style={styles.retryBtn}
                  activeOpacity={0.85}
                  onPress={() => setHasCameraPermission(true)}
                >
                  <Text style={styles.retryBtnText}>다시 시도</Text>
                </TouchableOpacity>
              </>
            )}
          </View>

          {/* 언어 카드 */}
          <View style={styles.languageCard}>
            <IconLanguageHiragana size={20} color="#4B5563" />
            <Text style={styles.languageText}>
              사용할 언어 <Text style={styles.languageHighlight}>· 한국어</Text>
            </Text>
          </View>
        </View>
      </View>

      <QrCodeBottomSheet isVisible={isCodeSheetOpen} onClose={() => setIsCodeSheetOpen(false)} />
    </>
  )
}
