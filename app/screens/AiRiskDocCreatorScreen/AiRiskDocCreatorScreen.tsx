import { FC, useState } from "react"
import { Alert, ScrollView } from "react-native"
import { IconCamera, IconFileExport } from "@tabler/icons-react-native"

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
  // TODO: 카메라/AI 분석 연동 후 setPages로 페이지를 추가
  const [pages, _setPages] = useState<string[]>([])
  const [includeHazardCoordinates, setIncludeHazardCoordinates] = useState(true)

  const canExport = pages.length > 0

  const handleCapture = () => {
    // TODO: 카메라 실행 → 이미지 선택 → AI 위험분석 → 페이지 추가
    Alert.alert(
      translate("aiRiskDocCreatorScreen:captureButton"),
      "해당 기능은 추후 구현 예정입니다.",
    )
  }

  const handleExportPdf = () => {
    // TODO: 서명 입력 → PDF 생성 → 내보내기 API 연동
  }

  return (
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
          onPress={handleCapture}
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
  )
}
