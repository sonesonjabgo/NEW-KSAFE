# K-SAFEONE 기능 구현 항목 정리

> UI 작업 완료 후 실제 API/기능을 붙여야 할 항목을 화면별로 정리한 문서.  
> 현재 모든 데이터는 mock 데이터 or console.log 스텁 상태임.

---

## 공통 / 인증 (Auth)

| 항목 | 현재 상태 | 구현 내용 |
|---|---|---|
| 역할(role) | `RoleContext`에서 `mockRole`로 하드코딩 | 로그인 API 응답으로 역할 설정 |
| 사용자 정보 | `MOCK_USER = { name, email }` 하드코딩 | 로그인 후 유저 정보를 Context에 저장 |
| 사업장 ID | `mockWorkerWorkplaceId = 1` 하드코딩 | 로그인 사용자의 소속 사업장 ID 사용 |
| 사업장 목록 | `MOCK_WORKPLACES` 배열 하드코딩 | 사업장 목록 API 연동 (TBM/게시판/개선제안 등에서 공용) |

---

## 홈 (HomeScreen)

| 항목 | 현재 상태 | 구현 내용 |
|---|---|---|
| 교육 배너 상태 | `useState(true)` 하드코딩 | 금일 TBM 또는 교육 자료 존재 여부 API |
| 사용자 이름 | `"김영희"` 하드코딩 | auth context에서 실제 이름 표시 |
| 역할 전환 토글 | 개발용 임시 UI (lines 156-194) | 배포 전 제거 |

---

## 안전게시판 (SafeBoard)

### 목록 (SafeBoardScreen)

| 항목 | 현재 상태 | 구현 내용 |
|---|---|---|
| 게시글 목록 | `mockSafeBoardData` | 게시글 목록 API (사업장ID·탭 필터 포함) |
| 내 게시글 탭 | `mockMyPosts` | 내 게시글 목록 API (작성자 기준 필터) |
| 알림 발송 버튼 | `console.log("알림 발송")` | 전체 알림 발송 API |

### 상세 (SafeBoardDetailScreen)

| 항목 | 현재 상태 | 구현 내용 |
|---|---|---|
| 게시글 데이터 | `allMockItems.find(p => p.id)` | 게시글 상세 API |
| 내 게시글 여부 | `mockMyPosts.some(p => p.id)` | auth context 작성자 ID 비교 |
| 게시하기 | `console.log("publish", id)` | 게시 상태 변경 API (draft → published) |
| 삭제하기 | `console.log("delete", id)` | 게시글 삭제 API |

### 작성 (SafeBoardCreateScreen)

| 항목 | 현재 상태 | 구현 내용 |
|---|---|---|
| 사업장 목록 | `MOCK_WORKPLACES` | 사업장 목록 API |
| 파일 첨부 | mock 파일명 생성 | 파일 picker + 업로드 API |
| 임시저장/게시 | `console.log(JSON.stringify(...))` | 게시글 생성/저장 API |

---

## TBM (Tool Box Meeting)

### 목록 (TbmListScreen)

| 항목 | 현재 상태 | 구현 내용 |
|---|---|---|
| TBM 목록 | `mockTbmData` | TBM 목록 API (상태 필터 포함) |

### 상세 (TbmDetailScreen)

| 항목 | 현재 상태 | 구현 내용 |
|---|---|---|
| TBM 상세 | `mockTbmDetails[id]` | TBM 상세 API |
| 교육자료 다운로드 | `console.log("download:", id)` | 파일 다운로드 API |
| 활동 시작 | UI 상태 전환만 | TBM 상태 변경 API (진행중) |
| 수정 | `console.log("수정:", id)` | TBM 수정 화면 연결 |
| 삭제 | `console.log("삭제 확인:", id)` | TBM 삭제 API |

### 작성 (TbmCreateScreen)

| 항목 | 현재 상태 | 구현 내용 |
|---|---|---|
| 사업장 목록 | `MOCK_WORKPLACES` | 사업장 목록 API |
| TBM 생성 | `console.log(JSON.stringify(...))` | TBM 생성 API |

### 활동 보고서 (TbmReportScreen)

| 항목 | 현재 상태 | 구현 내용 |
|---|---|---|
| TBM 상세 | `mockTbmDetails[id]` | TBM 상세 API |
| 사진 추가 | `console.log("사진 추가")` | 카메라/앨범 picker + 이미지 업로드 |
| 보고서 생성 | `console.log("보고서 생성:", id)` | 보고서 생성 API |

### 보고서 현황 (TbmReportStatusScreen)

| 항목 | 현재 상태 | 구현 내용 |
|---|---|---|
| 보고서 데이터 | `mockTbmReports.find(r => r.id)` | 보고서 상세 API |
| PDF 다운로드 | `console.log("PDF 다운로드:", id)` | PDF 다운로드 API |
| 재생성 요청 | `console.log("재생성 요청:", id)` | 보고서 재생성 API |
| 새로고침 | `console.log("새로고침:", id)` | 보고서 상태 폴링/갱신 API |

### TBM 참여 이력 (TbmParticipationHistoryScreen)

| 항목 | 현재 상태 | 구현 내용 |
|---|---|---|
| 이력 목록 | `mockHistoryData` 인라인 하드코딩 | 참여 이력 목록 API |
| 총 횟수/주의 | `MOCK_TOTAL`, `MOCK_CAUTION` | 통계 API |

### TBM 참여 이력 상세 (TbmParticipationHistoryDetailScreen)

| 항목 | 현재 상태 | 구현 내용 |
|---|---|---|
| 이력 상세 | `mockHistoryDetails[id]` 인라인 | 이력 상세 API |
| TBM 상세 | `mockTbmDetails[id]` | TBM 상세 API |
| 교육자료 다운로드 | `console.log("download:", id)` | 파일 다운로드 API |

### TBM 참여 (TbmJoinScreen / TbmJoinInfoScreen)

| 항목 | 현재 상태 | 구현 내용 |
|---|---|---|
| 참여 TBM 목록 | `mockTbmJoinData` | 오늘의 TBM 목록 API (근로자 대상) |
| TBM 정보 | `mockTbmJoinData.find(id)` | TBM 상세 API |

---

## 유해위험개소 (HazardRisk)

### 목록 (HazardRiskScreen)

| 항목 | 현재 상태 | 구현 내용 |
|---|---|---|
| 제보 목록 | `mockHazardData` | 유해위험개소 목록 API (탭/내게시글 필터) |
| 내 제보 수 | `mockHazardData.filter(...)` | 통계 API |

### 상세 (HazardRiskDetailScreen)

| 항목 | 현재 상태 | 구현 내용 |
|---|---|---|
| 제보 상세 | `mockHazardDetails[id]` | 제보 상세 API |
| 사진 추가 | `console.log("카메라"/"앨범")` | 카메라/앨범 picker + 이미지 업로드 |
| 상태 변경 | 미구현 | 처리 상태 변경 API (관리자) |

### 작성 (HazardRiskCreateScreen)

| 항목 | 현재 상태 | 구현 내용 |
|---|---|---|
| 사업장 목록 | `MOCK_WORKPLACES` | 사업장 목록 API |
| 사진 첨부 | `console.log("카메라"/"앨범")` | 카메라/앨범 picker + 이미지 업로드 |
| 제보 등록 | `console.log(JSON.stringify(...))` | 제보 등록 API |

---

## 개선 제안 (ImprovementProposal)

### 목록 (ImprovementProposalListScreen)

| 항목 | 현재 상태 | 구현 내용 |
|---|---|---|
| 제안 목록 | `mockProposalData` | 개선 제안 목록 API |
| 내 제안 수 | `mockProposalData.filter(...)` | 통계 API |

### 상세 (ImprovementProposalDetailScreen)

| 항목 | 현재 상태 | 구현 내용 |
|---|---|---|
| 제안 상세 | `mockProposalDetails[id]` | 제안 상세 API |
| 현재 사용자 | `MOCK_CURRENT_USER = "홍길동"` | auth context 사용자 이름 |
| 처리 결과 | `MOCK_RESULT_*` 하드코딩 | 처리 결과 API 데이터 |
| 처리 내용 저장 | `console.log("저장:", content)` | 처리 결과 저장 API (관리자) |
| 내 제안 여부 | `MOCK_CURRENT_USER`와 비교 | auth context 작성자 ID 비교 |

### 작성 (ImprovementProposalCreateScreen)

| 항목 | 현재 상태 | 구현 내용 |
|---|---|---|
| 사업장 목록 | `MOCK_WORKPLACES` | 사업장 목록 API |
| 작성자명 | `"홍길동"` 하드코딩 | auth context 사용자 이름 |
| 제안 등록 | 미구현 | 제안 등록 API |

---

## AI 위험성 평가 문서 (AiRiskDocCreator)

| 항목 | 현재 상태 | 구현 내용 |
|---|---|---|
| 페이지 추가 | `createMockPage()` mock 생성 | 실제 이미지 선택/촬영 + 이미지 업로드 |
| AI 분석 | `setTimeout` 2초 시뮬레이션 | AI 분석 API 호출 |
| 분석 이미지 | placeholder 이미지 사용 | AI 분석 결과 이미지 URI |
| 개선 후 이미지 | `console.log(...)` | 카메라/앨범 picker + 업로드 |
| 분석 결과 복사 | `console.log(...)` | 클립보드 복사 |
| PDF 생성 | `console.log(...)` | 서명 데이터 포함 PDF 생성 API |

---

## 교육 자료 (Education)

### 목록 (EducationMaterialScreen / EducationSelectScreen)

| 항목 | 현재 상태 | 구현 내용 |
|---|---|---|
| 교육 자료 목록 | `MOCK_EDUCATION_MATERIALS` | 교육 자료 목록 API |

### 상세 (EducationMaterialDetailScreen)

| 항목 | 현재 상태 | 구현 내용 |
|---|---|---|
| 자료 상세 | `MOCK_EDUCATION_MATERIALS.find(id)` | 교육 자료 상세 API |
| 다운로드 | `console.log("download:", id)` | 파일 다운로드 |
| 게시하기 | `console.log("publish:", id)` | 게시 상태 변경 API |

### 등록 (EducationMaterialRegisterScreen)

| 항목 | 현재 상태 | 구현 내용 |
|---|---|---|
| 파일 첨부 | `MOCK_FILE` 고정 | 파일 picker + 업로드 |
| 등록 | `console.log(JSON.stringify(...))` | 교육 자료 등록 API |

---

## 순회점검 (Patrol)

### 목록 (PatrolScreen)

| 항목 | 현재 상태 | 구현 내용 |
|---|---|---|
| 점검 목록 | `MOCK_PATROL_ITEMS` 인라인 | 순회점검 목록 API |

### 상세 (PatrolDetailScreen)

| 항목 | 현재 상태 | 구현 내용 |
|---|---|---|
| 점검 상세 | `MOCK_PATROL`, `MOCK_CHECK_ITEMS` | 점검 상세 API |
| 통계 | `MOCK_TOTAL`, `MOCK_GOOD`, `MOCK_BAD` | 항목별 통계 API |

### 작성 (PatrolCreateScreen)

| 항목 | 현재 상태 | 구현 내용 |
|---|---|---|
| 담당자 목록 | `MOCK_USERS` | 사용자 목록 API |
| 점검 템플릿 | `MOCK_TEMPLATES` | 점검 템플릿 목록 API |
| 점검 생성 | 미구현 | 점검 생성 API |

---

## 번역 (Translation)

### 음성 번역 (VoiceTranslationScreen)

| 항목 | 현재 상태 | 구현 내용 |
|---|---|---|
| 번역 메시지 | `MOCK_TOP_MESSAGES`, `MOCK_BOTTOM_MESSAGES` | 실시간 음성 인식 + 번역 API (웹소켓) |

### 통역 교육 (EducationPresentationScreen)

| 항목 | 현재 상태 | 구현 내용 |
|---|---|---|
| Room ID | `MOCK_ROOM_ID = "76481574"` | navigation params로 수신 |
| 채팅 메시지 | `MOCK_MESSAGES` | 실시간 채팅 API (웹소켓) |

---

## 알림 (NotifyScreen)

| 항목 | 현재 상태 | 구현 내용 |
|---|---|---|
| 알림 목록 | 빈 empty state만 표시 | 알림 목록 API |
| 전체 읽음 | `IconChecks` 버튼 (미연결) | 전체 읽음 처리 API |
| 전체 삭제 | `IconTrash` 버튼 (미연결) | 전체 알림 삭제 API |

---

## 마이페이지 (MyPageScreen)

| 항목 | 현재 상태 | 구현 내용 |
|---|---|---|
| 사용자 정보 | `MOCK_USER.name`, `MOCK_USER.email` | auth context 실제 유저 정보 |
| 로그아웃 | 모달만 있음 (기능 확인 필요) | 로그아웃 API + context 초기화 |

---

## 언어 설정 (LanguageSettingsScreen)

| 항목 | 현재 상태 | 구현 내용 |
|---|---|---|
| 언어 변경 저장 | 모달 확인 후 UI 상태만 변경 | i18n 언어 변경 + 서버 사용자 설정 저장 |

---

## QR 스캐너 (QrScannerScreen)

| 항목 | 현재 상태 | 구현 내용 |
|---|---|---|
| QR 코드 제출 | `console.log(accessCode)` | QR/접근코드 검증 API + TBM 입장 처리 |
