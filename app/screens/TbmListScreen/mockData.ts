import { TbmItem } from "./types"

export const mockTbmData: TbmItem[] = [
  {
    id: 1,
    title: "작업장 순회 점검",
    status: "진행중",
    date: "2026.02.19",
    participants: 4,
    author: "권 민수 사업장 관리자",
    location: "서울 영등포구 레미안스 비즈타워 8층",
  },
  {
    id: 2,
    title: "작업장 순회 점검",
    status: "종료됨",
    date: "2026.02.19",
    participants: 3,
    author: "권 민수 사업장 관리자",
    location: "서울 영등포구 레미안스 비즈타워 3층",
  },
  {
    id: 3,
    title: "전기설비 안전점검",
    status: "진행중",
    date: "2026.02.18",
    participants: 2,
    author: "김 영호 안전관리자",
    location: "부산 해운대구 센텀시티 12층",
  },
  {
    id: 4,
    title: "고소작업 안전교육",
    status: "종료됨",
    date: "2026.02.17",
    participants: 8,
    author: "이 정민 현장소장",
    location: "인천 연수구 송도동 건설현장",
  },
]
