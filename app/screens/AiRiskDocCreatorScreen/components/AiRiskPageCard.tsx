import { FC } from "react"
import { ActivityIndicator, TouchableOpacity, View } from "react-native"
import { IconCamera, IconCopy, IconSparkles, IconTrash } from "@tabler/icons-react-native"
import AiRiskReportSvg from "@assets/images/ai-risk-report.svg"

import { Text } from "@/components/Text"
import { translate } from "@/i18n/translate"
import { colors } from "@/theme/colors"

import type { AiRiskPage } from "../mockData"
import * as S from "../styles"

interface AiRiskPageCardProps {
  page: AiRiskPage
  pageNumber: number
  onDelete: () => void
  onAnalysisRequest: () => void
  includeHazardCoordinates: boolean
}

export const AiRiskPageCard: FC<AiRiskPageCardProps> = ({
  page,
  pageNumber,
  onDelete,
  onAnalysisRequest,
  includeHazardCoordinates,
}) => {
  const handleCopyResult = () => {
    // TODO: 분석 결과 클립보드 복사
    console.log("[AiRisk] 분석 결과 복사 요청")
  }

  const handleAddAfterImage = () => {
    // TODO: 개선 후 이미지 선택 / 촬영
    console.log("[AiRisk] 개선 후 이미지 추가 요청")
  }

  const isAnalyzed = page.analysisStatus === "analyzed"
  const isAnalyzing = page.analysisStatus === "analyzing"

  return (
    <View style={S.$pageCard}>
      {/* ── 카드 헤더 ── */}
      <View style={S.$pageCardHeader}>
        <Text
          text={translate("aiRiskDocCreatorScreen:page.title", { number: pageNumber } as any)}
          style={S.$pageCardTitle}
        />
        <TouchableOpacity onPress={onDelete} activeOpacity={0.7} hitSlop={8}>
          <IconTrash size={20} color="#BBBBBB" strokeWidth={1.6} />
        </TouchableOpacity>
      </View>

      {/* ── 이미지 행: 개선 전 / 개선 후 ── */}
      <View style={S.$imageRow}>
        <View style={S.$imageCol}>
          <Text text={translate("aiRiskDocCreatorScreen:page.beforeLabel")} style={S.$imageLabel} />
          {/* TODO: page.beforeImage URI 연동 시 실제 이미지 URI로 교체 */}
          <View style={S.$beforeImageBox}>
            <AiRiskReportSvg width="100%" height="100%" />
          </View>
        </View>

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

      {/* ── 인공지능 분석 요청 버튼 ── */}
      {isAnalyzing ? (
        /* 분석 중: spinner + 연한 파란 배경 */
        <View style={S.$analyzeBtnAnalyzing}>
          <ActivityIndicator size="small" color="#FFFFFF" />
          <Text
            text={translate("aiRiskDocCreatorScreen:page.analyzeButton")}
            style={S.$analyzeBtnLabel}
          />
        </View>
      ) : isAnalyzed ? (
        /* 분석 완료: 동일 스타일로 비활성 표시 */
        <View style={S.$analyzeBtnAnalyzing}>
          <IconSparkles size={18} color="#FFFFFF" strokeWidth={1.8} />
          <Text
            text={translate("aiRiskDocCreatorScreen:page.analyzeButton")}
            style={S.$analyzeBtnLabel}
          />
        </View>
      ) : (
        /* idle: 파란 활성 버튼 */
        <TouchableOpacity style={S.$analyzeBtn} activeOpacity={0.8} onPress={onAnalysisRequest}>
          <IconSparkles size={18} color="#FFFFFF" strokeWidth={1.8} />
          <Text
            text={translate("aiRiskDocCreatorScreen:page.analyzeButton")}
            style={S.$analyzeBtnLabel}
          />
        </TouchableOpacity>
      )}

      {/* ── 분석 완료 + 위험 좌표 섹션 포함 ── */}
      {isAnalyzed && includeHazardCoordinates && (
        <>
          {/* AI 분석 이미지 (마커 overlay) */}
          <Text
            text={translate("aiRiskDocCreatorScreen:page.aiAnalysis")}
            style={S.$aiAnalysisTitle}
          />
          <View style={S.$analysisImageContainer}>
            {/* TODO: 실제 AI 분석 이미지 URI로 교체 */}
            <AiRiskReportSvg width="100%" height="100%" />
            {page.hazards.map((hazard) => (
              <View
                key={hazard.id}
                style={[S.$hazardMarker, { left: `${hazard.x}%`, top: `${hazard.y}%` } as object]}
              >
                <Text text={String(hazard.id)} style={S.$hazardMarkerText} />
              </View>
            ))}
          </View>

          {/* 위험 좌표 상세 리스트 */}
          <Text
            text={translate("aiRiskDocCreatorScreen:page.hazardTitle")}
            style={S.$hazardTitle}
          />
          {page.hazards.map((hazard) => (
            <View key={hazard.id} style={S.$hazardListItem}>
              <View style={S.$hazardBadge}>
                <Text text={String(hazard.id)} style={S.$hazardBadgeText} />
              </View>
              <Text text={hazard.description} style={S.$hazardItemDesc} />
            </View>
          ))}
        </>
      )}

      {/* ── idle / analyzing: 위험 좌표 섹션 포함 시 빈 상태 표시 ── */}
      {!isAnalyzed && includeHazardCoordinates && (
        <>
          <Text
            text={translate("aiRiskDocCreatorScreen:page.hazardTitle")}
            style={S.$hazardTitle}
          />
          <Text
            text={translate("aiRiskDocCreatorScreen:page.hazardEmpty")}
            style={S.$hazardEmpty}
          />
        </>
      )}

      {/* ── 분석 결과 박스 (항상 표시) ── */}
      <View style={S.$analysisBox}>
        <Text
          text={
            isAnalyzed && page.analysisResult
              ? page.analysisResult
              : translate("aiRiskDocCreatorScreen:page.analysisPlaceholder")
          }
          style={isAnalyzed && page.analysisResult ? S.$analysisResultText : S.$analysisPlaceholder}
        />
        <View style={S.$analysisCopyRow}>
          <TouchableOpacity onPress={handleCopyResult} activeOpacity={0.7} hitSlop={8}>
            <IconCopy size={18} color={colors.iconMuted} strokeWidth={1.5} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}
