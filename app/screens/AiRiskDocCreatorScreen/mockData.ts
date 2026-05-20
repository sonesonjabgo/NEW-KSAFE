export type AnalysisStatus = "idle" | "analyzing" | "analyzed"

export interface AiRiskHazard {
  id: number
  description: string
  x: number // image 너비 대비 % (0-100)
  y: number // image 높이 대비 % (0-100)
}

export interface AiRiskPage {
  id: string
  beforeImage: "mock" | null
  afterImage: string | null
  analysisStatus: AnalysisStatus
  analysisResult: string | null
  hazards: AiRiskHazard[]
}

// ── Mock 위험 좌표 ─────────────────────────────────────────────────────────────
// TODO: 실제 AI 분석 API 연동 시 서버 응답 데이터로 교체

export const MOCK_HAZARDS: AiRiskHazard[] = [
  { id: 1, description: "낙석 위험 구역.", x: 8, y: 38 },
  { id: 2, description: "미끄럽고 불안정한 지면.", x: 4, y: 72 },
  { id: 3, description: "미끄럽고 불안정한 지면.", x: 17, y: 80 },
  { id: 4, description: "미끄럽고 불안정한 지면.", x: 29, y: 84 },
  { id: 5, description: "젖고 미끄러운 수변 바위.", x: 11, y: 62 },
  { id: 6, description: "젖고 미끄러운 수변 바위.", x: 23, y: 68 },
]

// ── Mock 분석 결과 텍스트 ─────────────────────────────────────────────────────
// TODO: 실제 AI 분석 API 연동 시 서버 응답 데이터로 교체

export const MOCK_ANALYSIS_RESULT =
  "1. 원인\n* 자연 지형 특성상 지면이 불균일함.\n* 폭포 주변 환경은 바위와 물이 많음.\n* 강수 및 습한 기후로 지표면이 미끄러움.\n* 절벽 지형의 자연적 풍화 작용.\n* 강한 햇빛으로 시야 확보가 어려움.\n\n2. 위험\n* 미끄러운 바위로 약한 정도 사고 위험."

export function createMockPage(): AiRiskPage {
  return {
    id: `page-${Date.now()}`,
    beforeImage: "mock", // TODO: 실제 촬영/선택 이미지 URI로 교체
    afterImage: null,
    analysisStatus: "idle",
    analysisResult: null,
    hazards: [],
  }
}
