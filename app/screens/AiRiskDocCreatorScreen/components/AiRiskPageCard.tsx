import { FC } from "react"
import { Alert, TouchableOpacity, View } from "react-native"
import {
  IconCamera,
  IconCopy,
  IconSparkles,
  IconTrash,
} from "@tabler/icons-react-native"

import { Text } from "@/components/Text"
import { translate } from "@/i18n/translate"

import type { AiRiskPage } from "../mockData"
import * as S from "../styles"

interface AiRiskPageCardProps {
  page: AiRiskPage
  pageNumber: number
  onDelete: () => void
}

export const AiRiskPageCard: FC<AiRiskPageCardProps> = ({ page, pageNumber, onDelete }) => {
  const handleAnalyze = () => {
    // TODO: AI 위험분석 API 연동
    Alert.alert(
      translate("aiRiskDocCreatorScreen:page.analyzeButton"),
      "해당 기능은 추후 구현 예정입니다.",
    )
  }

  const handleCopyResult = () => {
    // TODO: 분석 결과 클립보드 복사
    console.log("[AiRisk] 분석 결과 복사 요청")
  }

  const handleAddAfterImage = () => {
    // TODO: 개선 후 이미지 선택 / 촬영
    console.log("[AiRisk] 개선 후 이미지 추가 요청")
  }

  return (
    <View style={S.$pageCard}>
      {/* 카드 헤더: 페이지 제목 + 삭제 버튼 */}
      <View style={S.$pageCardHeader}>
        <Text
          text={translate("aiRiskDocCreatorScreen:page.title", { number: pageNumber } as any)}
          style={S.$pageCardTitle}
        />
        <TouchableOpacity onPress={onDelete} activeOpacity={0.7} hitSlop={8}>
          <IconTrash size={20} color="#BBBBBB" strokeWidth={1.6} />
        </TouchableOpacity>
      </View>

      {/* 이미지 행: 개선 전 / 개선 후 */}
      <View style={S.$imageRow}>
        {/* 개선 전 */}
        <View style={S.$imageCol}>
          <Text text={translate("aiRiskDocCreatorScreen:page.beforeLabel")} style={S.$imageLabel} />
          {/* TODO: page.beforeImage URI 연동 시 실제 Image 컴포넌트로 교체 */}
          <View style={S.$beforeImageBox} />
        </View>

        {/* 개선 후 */}
        <View style={S.$imageCol}>
          <Text text={translate("aiRiskDocCreatorScreen:page.afterLabel")} style={S.$imageLabel} />
          <TouchableOpacity
            style={S.$afterImagePlaceholder}
            activeOpacity={0.7}
            onPress={handleAddAfterImage}
          >
            <IconCamera size={24} color="#CCCCCC" strokeWidth={1.5} />
            <Text
              text={translate("aiRiskDocCreatorScreen:page.addImage")}
              style={S.$afterImagePlaceholderText}
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* 인공지능 분석 요청 버튼 */}
      <TouchableOpacity style={S.$analyzeBtn} activeOpacity={0.8} onPress={handleAnalyze}>
        <IconSparkles size={18} color="#FFFFFF" strokeWidth={1.8} />
        <Text
          text={translate("aiRiskDocCreatorScreen:page.analyzeButton")}
          style={S.$analyzeBtnLabel}
        />
      </TouchableOpacity>

      {/* 위험 좌표 상세 */}
      <Text text={translate("aiRiskDocCreatorScreen:page.hazardTitle")} style={S.$hazardTitle} />
      <Text text={translate("aiRiskDocCreatorScreen:page.hazardEmpty")} style={S.$hazardEmpty} />

      {/* 분석 결과 박스 */}
      <View style={S.$analysisBox}>
        <Text
          text={translate("aiRiskDocCreatorScreen:page.analysisPlaceholder")}
          style={S.$analysisPlaceholder}
        />
        <View style={S.$analysisCopyRow}>
          <TouchableOpacity onPress={handleCopyResult} activeOpacity={0.7} hitSlop={8}>
            <IconCopy size={18} color="#CCCCCC" strokeWidth={1.5} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}
