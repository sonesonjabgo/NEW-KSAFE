import type { SafeHealthMenuItem } from "../types"

export const mockAdminMenus: SafeHealthMenuItem[] = [
  {
    id: 1,
    title: "작업장 순회 점검",
    description: "작업장 순회 점검 등록",
    icon: "Walk",
  },
  {
    id: 2,
    title: "교육 자료",
    description: "교육 자료 조회 및 등록",
    icon: "Book",
  },
  {
    id: 3,
    title: "TBM 관리/생성",
    description: "TBM 활동을 관리하고 생성",
    icon: "CalendarPlus",
  },
  {
    id: 4,
    title: "TBM 보고서 조회",
    description: "보고서 상태 확인 및 PDF 다운로드",
    icon: "Download",
  },
  {
    id: 5,
    title: "TBM 참여",
    description: "다른 관리감독자의 안전점검 회의 참여",
    icon: "Users",
  },
  {
    id: 6,
    title: "TBM 참여 이력",
    description: "참여한 TBM 회의 이력 조회",
    icon: "History",
  },
]

export const mockWorkerMenus: SafeHealthMenuItem[] = [
  {
    id: 1,
    title: "TBM 참여",
    description: "다른 관리감독자의 안전점검 회의 참여",
    icon: "Users",
  },
  {
    id: 2,
    title: "현황 조회",
    description: "진행 중인 TBM 현황 확인",
    icon: "LayoutList",
  },
]
