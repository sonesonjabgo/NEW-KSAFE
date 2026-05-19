import type { ImprovementProposalDetail } from "./types"

export const mockProposalDetails: Record<number, ImprovementProposalDetail> = {
  1: {
    id: 1,
    status: "pending",
    date: "2026.02.23 10:28",
    content:
      "1층 화장실 세면대 배수구가 막혀 물이 넘쳐흐르고 있습니다. 빠른 점검이 필요합니다.",
    authorInitial: "이",
    authorName: "이현수",
    workplace: "서울 한강 레지던스 RC공사 현장",
    statusHistory: [
      { id: 1, type: "registered", date: "2026.02.23 10:28" },
    ],
  },
  2: {
    id: 2,
    status: "ongoing",
    date: "2026.02.10 09:15",
    content: "휴게실 의자 다수가 파손되어 사용이 불편합니다. 교체를 요청드립니다.",
    authorInitial: "박",
    authorName: "박지훈",
    workplace: "부산 해운대구 센텀시티",
    statusHistory: [
      { id: 1, type: "registered", date: "2026.02.10 09:15" },
      { id: 2, type: "ongoing", date: "2026.02.12 11:30" },
    ],
  },
  3: {
    id: 3,
    status: "reflected",
    date: "2026.01.14 14:20",
    content:
      "야간 작업 시 조명이 어두워 안전사고 위험이 있습니다. LED 추가 설치를 건의합니다.",
    authorInitial: "김",
    authorName: "김관리",
    workplace: "경기 화성시 동탄산업단지 A동",
    statusHistory: [
      { id: 1, type: "registered", date: "2026.01.14 14:20" },
      { id: 2, type: "ongoing", date: "2026.01.16 10:00" },
      { id: 3, type: "reflected", date: "2026.01.28 16:45" },
    ],
  },
  4: {
    id: 4,
    status: "rejected",
    date: "2026.01.09 08:50",
    content: "현재 보관함 수량이 부족해 안전모가 바닥에 방치되는 경우가 많습니다.",
    authorInitial: "최",
    authorName: "최성민",
    workplace: "인천 연수구 송도동 건설현장",
    statusHistory: [
      { id: 1, type: "registered", date: "2026.01.09 08:50" },
      { id: 2, type: "ongoing", date: "2026.01.11 10:00" },
      { id: 3, type: "rejected", date: "2026.01.20 14:00" },
    ],
  },
  5: {
    id: 5,
    status: "pending",
    date: "2026.01.03 13:00",
    content:
      "창고 입구 바닥이 비가 오면 매우 미끄럽습니다. 미끄럼 방지 패드 설치를 요청합니다.",
    authorInitial: "정",
    authorName: "정다은",
    workplace: "서울 영등포구 레미안스 비즈타워",
    statusHistory: [
      { id: 1, type: "registered", date: "2026.01.03 13:00" },
    ],
  },
}
