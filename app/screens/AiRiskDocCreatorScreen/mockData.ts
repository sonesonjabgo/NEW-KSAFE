export interface AiRiskPage {
  id: string
  beforeImage: "mock" | null
  afterImage: string | null
  analysisResult: string | null
  hazards: string[]
}

export function createMockPage(): AiRiskPage {
  return {
    id: `page-${Date.now()}`,
    beforeImage: "mock", // TODO: 실제 촬영/선택 이미지 URI로 교체
    afterImage: null,
    analysisResult: null,
    hazards: [],
  }
}
