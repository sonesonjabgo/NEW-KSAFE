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
import { IconCamera, IconFileExport, IconPhoto, IconTrash } from "@tabler/icons-react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"

import { StackScreen } from "@/components/StackScreen"
import { Text } from "@/components/Text"
import { translate } from "@/i18n/translate"
import type { AppStackScreenProps } from "@/navigators/navigationTypes"

import { AiRiskActionButton } from "./components/AiRiskActionButton"
import { AiRiskEmptyState } from "./components/AiRiskEmptyState"
import { AiRiskPageCard } from "./components/AiRiskPageCard"
import { HazardCoordinateToggleCard } from "./components/HazardCoordinateToggleCard"
import { type AiRiskPage, createMockPage } from "./mockData"
import * as S from "./styles"

export const AiRiskDocCreatorScreen: FC<AppStackScreenProps<"AiRiskDocCreator">> = ({
  navigation,
}) => {
  const insets = useSafeAreaInsets()

  const [pages, setPages] = useState<AiRiskPage[]>([])
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

  const addMockPage = useCallback(() => {
    // TODO: 실제 이미지 URI / AI 분석 결과로 교체
    setPages((prev) => [...prev, createMockPage()])
  }, [])

  const handleTakePhoto = useCallback(() => {
    closeCaptureSheet()
    addMockPage()
  }, [closeCaptureSheet, addMockPage])

  const handleSelectFromAlbum = useCallback(() => {
    closeCaptureSheet()
    addMockPage()
  }, [closeCaptureSheet, addMockPage])

  const handleDeletePage = useCallback((id: string) => {
    setPages((prev) => prev.filter((p) => p.id !== id))
  }, [])

  const handleResetAll = useCallback(() => {
    setPages([])
  }, [])

  const handleExportPdf = () => {
    // TODO: 서명 입력 → PDF 생성 → 내보내기 API 연동
  }

  const canExport = pages.length > 0

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

          {/* 전체 초기화 버튼 — pages > 0일 때만 표시 */}
          {pages.length > 0 && (
            <TouchableOpacity
              style={S.$resetBtn}
              activeOpacity={0.8}
              onPress={handleResetAll}
            >
              <IconTrash size={18} color="#E03526" strokeWidth={1.8} />
              <Text text={translate("aiRiskDocCreatorScreen:resetAll")} style={S.$resetBtnLabel} />
            </TouchableOpacity>
          )}

          <HazardCoordinateToggleCard
            checked={includeHazardCoordinates}
            onToggle={() => setIncludeHazardCoordinates((prev) => !prev)}
          />

          {pages.length === 0 ? (
            <AiRiskEmptyState />
          ) : (
            pages.map((page, index) => (
              <AiRiskPageCard
                key={page.id}
                page={page}
                pageNumber={index + 1}
                onDelete={() => handleDeletePage(page.id)}
              />
            ))
          )}
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
