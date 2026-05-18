import { TbmDetail } from "./types"

export const mockTbmDetails: Record<number, TbmDetail> = {
  1: {
    id: 1,
    title: "작업장 순회 점검",
    status: "진행중",
    date: "2026.02.19",
    workDate: "2026년 2월 19일 오전 09:00",
    author: "권 민수 사업장 관리자",
    location: "서울 한강 레지던스 RC공사 현장",
    activityContent:
      "작업 전 안전 점검 사항을 확인하고 위험 요소를 제거합니다. 고소 작업 시 안전벨트를 필히 착용하며, 작업 구역 내 비인가자 출입을 통제합니다.",
    educationMaterials: [
      { id: 1, title: "고소작업 안전 수칙 교육 자료" },
      { id: 2, title: "추락 방지 장비 착용 가이드" },
    ],
  },
  2: {
    id: 2,
    title: "작업장 순회 점검",
    status: "종료됨",
    date: "2026.02.19",
    workDate: "2026년 2월 19일 오전 10:00",
    author: "권 민수 사업장 관리자",
    location: "서울 영등포구 레미안스 비즈타워 3층",
    activityContent:
      "전기 설비 주변 작업 시 절연 장갑 착용을 의무화합니다. 배선 작업 전 전원 차단을 확인하고 잠금 장치를 설치합니다.",
    educationMaterials: [{ id: 3, title: "전기 안전 사고 예방 교육" }],
  },
  3: {
    id: 3,
    title: "전기설비 안전점검",
    status: "진행중",
    date: "2026.02.18",
    workDate: "2026년 2월 18일 오전 09:30",
    author: "김 영호 안전관리자",
    location: "부산 해운대구 센텀시티 12층",
    activityContent:
      "전기 설비 점검 전 반드시 전원을 차단하고 LOTO(잠금-태그-외출) 절차를 준수합니다. 점검 중 다른 작업자가 전원을 투입하지 않도록 경고 표지를 설치합니다.",
    educationMaterials: [
      { id: 4, title: "LOTO 절차 교육 자료" },
      { id: 5, title: "전기설비 점검 체크리스트" },
      { id: 6, title: "감전 사고 응급처치 방법" },
    ],
  },
  4: {
    id: 4,
    title: "고소작업 안전교육",
    status: "종료됨",
    date: "2026.02.17",
    workDate: "2026년 2월 17일 오전 08:00",
    author: "이 정민 현장소장",
    location: "인천 연수구 송도동 건설현장",
    activityContent:
      "2미터 이상 고소 작업 시 안전대를 착용하고 안전 로프에 연결합니다. 작업 발판의 상태를 점검하고 불량 발판은 즉시 교체합니다.",
    educationMaterials: [{ id: 7, title: "고소작업 안전대 착용 교육" }],
  },
  5: {
    id: 5,
    title: "화학물질 취급 안전점검",
    status: "진행중",
    date: "2026.02.16",
    workDate: "2026년 2월 16일 오전 09:00",
    author: "박 서연 환경안전팀장",
    location: "경기 화성시 동탄산업단지 A동",
    activityContent:
      "화학물질 취급 시 물질안전보건자료(MSDS)를 사전에 숙지합니다. 적절한 개인보호장비(PPE)를 착용하고 환기가 충분한 환경에서 작업합니다.",
    educationMaterials: [
      { id: 8, title: "화학물질 MSDS 교육 자료" },
      { id: 9, title: "개인보호장비 착용 방법 안내" },
    ],
  },
  6: {
    id: 6,
    title: "비계 설치 작업 전 TBM",
    status: "종료됨",
    date: "2026.02.15",
    workDate: "2026년 2월 15일 오전 07:30",
    author: "최 준혁 현장안전팀장",
    location: "대구 달서구 성서산업단지 3공장",
    activityContent:
      "비계 설치 작업 전 지반 상태를 확인하고 수평을 맞춥니다. 비계 클램프 체결 상태를 점검하고 작업 중 하중 초과를 방지합니다.",
    educationMaterials: [],
  },
  7: {
    id: 7,
    title: "크레인 작업 안전교육",
    status: "진행중",
    date: "2026.02.14",
    workDate: "2026년 2월 14일 오전 08:30",
    author: "정 수진 안전관리자",
    location: "경남 창원시 성산구 가음정동",
    activityContent:
      "크레인 작업 반경 내 작업자 접근을 금지합니다. 신호수를 배치하고 정해진 신호 체계에 따라 작업합니다.",
    educationMaterials: [{ id: 10, title: "크레인 안전 운전 교육 자료" }],
  },
  8: {
    id: 8,
    title: "밀폐공간 작업 전 TBM",
    status: "종료됨",
    date: "2026.02.13",
    workDate: "2026년 2월 13일 오전 09:00",
    author: "한 동현 현장소장",
    location: "울산 남구 여천동 석유화학단지",
    activityContent:
      "밀폐공간 진입 전 산소 농도를 측정합니다. 감시인을 배치하고 비상 구조 장비를 준비합니다.",
    educationMaterials: [
      { id: 11, title: "밀폐공간 진입 안전 절차" },
      { id: 12, title: "산소 결핍 위험 예방 교육" },
    ],
  },
  9: {
    id: 9,
    title: "용접 작업 안전점검",
    status: "종료됨",
    date: "2026.02.12",
    workDate: "2026년 2월 12일 오전 10:00",
    author: "윤 지훈 안전관리자",
    location: "충북 청주시 흥덕구 오창읍",
    activityContent:
      "용접 작업 전 주변 가연성 물질을 제거합니다. 용접 불꽃 비산 방지를 위한 방화포를 설치합니다.",
    educationMaterials: [{ id: 13, title: "용접 화재 예방 안전 교육" }],
  },
  10: {
    id: 10,
    title: "굴삭기 작업 TBM",
    status: "진행중",
    date: "2026.02.11",
    workDate: "2026년 2월 11일 오전 08:00",
    author: "임 채원 현장안전팀장",
    location: "전남 광양시 금호동 제철소 구역",
    activityContent:
      "굴삭기 작업 반경 내 안전 펜스를 설치합니다. 작업 전 장비 이상 유무를 점검하고 매일 작업 전 일상 점검표를 작성합니다.",
    educationMaterials: [
      { id: 14, title: "건설기계 운전 안전 수칙" },
      { id: 15, title: "굴삭기 일상 점검 가이드" },
    ],
  },
}
