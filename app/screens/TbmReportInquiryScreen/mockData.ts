import { TbmReportItem } from "./types"

export const mockTbmReports: TbmReportItem[] = [
  {
    id: 1,
    title: "2026.05.15 오전 철근작업 TBM 보고서",
    status: "completed",
    date: "2026.05.15",
    participants: 12,
    author: "관리자A",
    location: "광교 타워크레인 A구역",
  },
  {
    id: 2,
    title: "2026.05.18 오후 콘크리트 타설 TBM 보고서",
    status: "generating",
    date: "2026.05.18",
    participants: 8,
    author: "관리자B",
    location: "광교 지하주차장 B2",
  },
  {
    id: 3,
    title: "2026.05.19 오전 현장 순회 안전점검 보고서",
    status: "requested",
    date: "2026.05.19",
    participants: 5,
    author: "관리자A",
    location: "광교 타워크레인 C구역",
  },
  {
    id: 4,
    title: "2026.05.14 외부 도장 작업 TBM 보고서",
    status: "failed",
    date: "2026.05.14",
    participants: 10,
    author: "관리자C",
    location: "광교 외부 외벽",
  },
  {
    id: 5,
    title: "2026.05.15 오후 전기설비 점검 보고서",
    status: "completed",
    date: "2026.05.15",
    participants: 3,
    author: "관리자B",
    location: "광교 기계실",
  },
]
