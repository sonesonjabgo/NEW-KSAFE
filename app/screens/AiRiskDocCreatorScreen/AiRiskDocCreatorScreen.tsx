import { FC, useCallback, useRef, useState } from "react"
import {
  Animated,
  Modal,
  PanResponder,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native"
import { IconCamera, IconFileExport, IconPhoto } from "@tabler/icons-react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"

import { StackScreen } from "@/components/StackScreen"
import { Text } from "@/components/Text"
import { translate } from "@/i18n/translate"
import type { AppStackScreenProps } from "@/navigators/navigationTypes"

import { AiRiskActionButton } from "./components/AiRiskActionButton"
import { AiRiskEmptyState } from "./components/AiRiskEmptyState"
import { HazardCoordinateToggleCard } from "./components/HazardCoordinateToggleCard"
import * as S from "./styles"

export const AiRiskDocCreatorScreen: FC<AppStackScreenProps<"AiRiskDocCreator">> = ({
  navigation,
}) => {
  const insets = useSafeAreaInsets()

  // TODO: 카메라/AI 분석 연동 후 setPages로 페이지를 추가
  const [pages, _setPages] = useState<string[]>([])
  const [includeHazardCoordinates, setIncludeHazardCoordinates] = useState(true)

  // ── Capture Sheet ────────────────────────────────────────────────────────────
  const [captureSheetVisible, setCaptureSheetVisible] = useState(false)
  const slideAnim = useRef(new Animated.Value(300)).current
  const fadeAnim = useRef(new Animated.Value(0)).current

  const openCaptureSheet = useCallback(() => {
    setCaptureSheetVisible(true)
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 200, useNativeDriver: true }),
      Animated.timing(slideAnim, { toValue: 0, duration: 260, useNativeDriver: true }),
    ]).start()
  }, [fadeAnim, slideAnim])

  const closeCaptureSheet = useCallback(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 0, duration: 160, useNativeDriver: true }),
      Animated.timing(slideAnim, { toValue: 300, duration: 200, useNativeDriver: true }),
    ]).start(() => setCaptureSheetVisible(false))
  }, [fadeAnim, slideAnim])

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, gs) => gs.dy > 5 && gs.dy > Math.abs(gs.dx),
      onPanResponderMove: (_, gs) => {
        if (gs.dy > 0) slideAnim.setValue(gs.dy)
      },
      onPanResponderRelease: (_, gs) => {
        if (gs.dy > 80 || gs.vy > 0.5) {
          closeCaptureSheet()
        } else {
          Animated.spring(slideAnim, { toValue: 0, useNativeDriver: true }).start()
        }
      },
    }),
  ).current

  const handleTakePhoto = useCallback(() => {
    closeCaptureSheet()
    // TODO: 카메라 실행 → 이미지 촬영 → AI 위험분석 → 페이지 추가
    console.log("[AiRisk] 카메라로 촬영 선택")
  }, [closeCaptureSheet])

  const handleSelectFromAlbum = useCallback(() => {
    closeCaptureSheet()
    // TODO: 앨범에서 이미지 선택 → AI 위험분석 → 페이지 추가
    console.log("[AiRisk] 앨범에서 선택 선택")
  }, [closeCaptureSheet])

  const canExport = pages.length > 0

  const handleExportPdf = () => {
    // TODO: 서명 입력 → PDF 생성 → 내보내기 API 연동
  }

  return (
    <>
      <StackScreen
        title={translate("aiRiskDocCreatorScreen:title")}
        onBack={() => navigation.goBack()}
        contentBg="#FFFFFF"
        squareTop
      >
        <ScrollView
          style={S.$scroll}
          contentContainerStyle={S.$scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <Text
            text={translate("aiRiskDocCreatorScreen:pageCount", { count: pages.length } as any)}
            style={S.$pageCount}
          />

          <AiRiskActionButton
            label={translate("aiRiskDocCreatorScreen:captureButton")}
            Icon={IconCamera}
            onPress={openCaptureSheet}
          />

          <AiRiskActionButton
            label={translate("aiRiskDocCreatorScreen:exportPdfButton")}
            Icon={IconFileExport}
            onPress={handleExportPdf}
            disabled={!canExport}
          />

          <HazardCoordinateToggleCard
            checked={includeHazardCoordinates}
            onToggle={() => setIncludeHazardCoordinates((prev) => !prev)}
          />

          {pages.length === 0 && <AiRiskEmptyState />}
        </ScrollView>
      </StackScreen>

      {/* 촬영 방법 선택 바텀시트 */}
      <Modal
        visible={captureSheetVisible}
        transparent
        animationType="none"
        onRequestClose={closeCaptureSheet}
      >
        <View style={StyleSheet.absoluteFill}>
          <Animated.View
            style={[StyleSheet.absoluteFill, S.$sheetBackdrop, { opacity: fadeAnim }]}
          />
          <TouchableOpacity
            style={StyleSheet.absoluteFill}
            onPress={closeCaptureSheet}
            activeOpacity={1}
          />
          <Animated.View
            style={[
              S.$sheet,
              { paddingBottom: insets.bottom + 16, transform: [{ translateY: slideAnim }] },
            ]}
          >
            {/* 드래그 핸들 */}
            <View style={S.$sheetDragHandleArea} {...panResponder.panHandlers}>
              <View style={S.$sheetDragHandleBar} />
            </View>

            {/* 버튼 2개 */}
            <View style={S.$sheetBtnRow}>
              <TouchableOpacity
                style={S.$sheetBtn}
                activeOpacity={0.7}
                onPress={handleTakePhoto}
              >
                <IconCamera size={20} color="#1A1A1A" strokeWidth={1.8} />
                <Text
                  text={translate("aiRiskDocCreatorScreen:captureSheet.camera")}
                  style={S.$sheetBtnLabel}
                />
              </TouchableOpacity>

              <TouchableOpacity
                style={S.$sheetBtn}
                activeOpacity={0.7}
                onPress={handleSelectFromAlbum}
              >
                <IconPhoto size={20} color="#1A1A1A" strokeWidth={1.8} />
                <Text
                  text={translate("aiRiskDocCreatorScreen:captureSheet.album")}
                  style={S.$sheetBtnLabel}
                />
              </TouchableOpacity>
            </View>
          </Animated.View>
        </View>
      </Modal>
    </>
  )
}
