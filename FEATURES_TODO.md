# K-SAFEONE 기능 구현 항목

> UI 작업 완료 후 실제 API 및 기능을 연동해야 할 항목을 화면별로 정리한 문서.
> 현재 모든 데이터는 mock 데이터 또는 console.log 스텁 상태.
>
> 상태: ✅ 완료 / 🔄 진행중 / ⬜ 미착수

---

## 공통 / 인증 (Auth)

| 상태 | 항목 | 현재 상태 | 구현 내용 |
|---|---|---|---|
| ✅ | 로그인 API 연동 | mock 로그인 | Supabase 인증, JWT 저장 — `bc62bab` |
| ✅ | 역할 기반 UI 분기 | `mockRole` 하드코딩 | 로그인 응답으로 role 설정 — `bc62bab` |
| ✅ | 자동 로그인 | 미구현 | 토큰 유효성 검사 후 화면 진입 |
| ✅ | 로그아웃 API | 모달만 존재 | 로그아웃 API + Context 초기화 |
| ⬜ | 비밀번호 찾기 | 모달 UI만 | 실제 이메일 발송 API |
| ✅ | 사용자 정보 저장 | `MOCK_USER` 하드코딩 | 로그인 후 유저 정보 Context 저장 |
| ✅ | 사업장 목록 | `MOCK_WORKPLACES` 하드코딩 | WorkplaceStore 이식 + 5개 화면 연결 — `4970856` |

---

## 홈 (HomeScreen)

| 상태 | 항목 | 현재 상태 | 구현 내용 |
|---|---|---|---|
| ✅ | 사용자 이름 | `"김영희"` 하드코딩 | auth context에서 실제 이름 표시 |
| ✅ | 안전게시판 목록 | `BOARD_ITEMS` 하드코딩 | SafeBoardStore + fetchBoardPosts API 연동 |
| ✅ | 교육 배너 노출 여부 | `useState(false)` 로컬 상태 | 진행 중인 발표 세션 존재 여부 API (`/common/presentations/active`) |
| ⬜ | 푸시 알림 권한 요청 | BottomSheet 표시만 | 실제 푸시 권한 요청 + FCM 토큰 서버 등록 (`POST /common/users/fcm-token`) — 앱 레벨 연동 |

---

## 안전게시판 (SafeBoard)

### 목록 (SafeBoardScreen)

| 상태 | 항목 | 현재 상태 | 구현 내용 |
|---|---|---|---|
| ✅ | 게시글 목록 | `mockSafeBoardData` | 게시글 목록 API (사업장·탭 필터) — `15f1bf5` |
| ✅ | 내 게시글 탭 | `mockMyPosts` | 내 게시글 목록 API — `15f1bf5` |
| ⬜ | 알림 발송 | `console.log("알림 발송")` | 전체 알림 발송 API |

### 상세 (SafeBoardDetailScreen)

| 상태 | 항목 | 현재 상태 | 구현 내용 |
|---|---|---|---|
| ✅ | 게시글 상세 | `allMockItems.find(id)` | 게시글 상세 API (store fetchPostDetail/fetchAdminMyPostDetail) |
| ✅ | 내 게시글 여부 | `mockMyPosts.some(id)` | useAuth user.id === currentPost.createdBy |
| ✅ | 게시하기 | `console.log("publish")` | PATCH /publish + store publishPost 액션 |
| ✅ | 삭제 | `console.log("delete")` | DELETE + store deletePost 액션 |

### 작성 (SafeBoardCreateScreen)

| 상태 | 항목 | 현재 상태 | 구현 내용 |
|---|---|---|---|
| ⬜ | 사업장 목록 | `MOCK_WORKPLACES` | 사업장 목록 API |
| ⬜ | 파일 첨부 | mock 파일명 생성 | 파일 picker + 업로드 API |
| ⬜ | 임시저장/게시 | `console.log(JSON.stringify(...))` | 게시글 생성 API |

---

## TBM (Tool Box Meeting)

### 목록 (TbmListScreen)

| 상태 | 항목 | 현재 상태 | 구현 내용 |
|---|---|---|---|
| ⬜ | TBM 목록 | `mockTbmData` | TBM 목록 API (상태 필터) |

### 상세 (TbmDetailScreen)

| 상태 | 항목 | 현재 상태 | 구현 내용 |
|---|---|---|---|
| ⬜ | TBM 상세 | `mockTbmDetails[id]` | TBM 상세 API |
| ⬜ | 활동 시작 | UI 상태 전환만 | TBM 상태 변경 API |
| ⬜ | 교육자료 다운로드 | `console.log("download")` | 파일 다운로드 API |
| ⬜ | 삭제 | `console.log("삭제 확인")` | TBM 삭제 API |

### 작성 (TbmCreateScreen)

| 상태 | 항목 | 현재 상태 | 구현 내용 |
|---|---|---|---|
| ⬜ | 사업장 목록 | `MOCK_WORKPLACES` | 사업장 목록 API |
| ⬜ | TBM 생성 | `console.log(JSON.stringify(...))` | TBM 생성 API |

### 활동 보고서 (TbmReportScreen)

| 상태 | 항목 | 현재 상태 | 구현 내용 |
|---|---|---|---|
| ⬜ | TBM 상세 | `mockTbmDetails[id]` | TBM 상세 API |
| ⬜ | 사진 추가 | `console.log("사진 추가")` | 카메라/앨범 picker + 업로드 |
| ⬜ | 보고서 생성 | `console.log("보고서 생성")` | 보고서 생성 API |

### 보고서 현황 (TbmReportStatusScreen)

| 상태 | 항목 | 현재 상태 | 구현 내용 |
|---|---|---|---|
| ⬜ | 보고서 데이터 | `mockTbmReports.find(id)` | 보고서 상세 API |
| ⬜ | PDF 다운로드 | `console.log("PDF 다운로드")` | PDF 다운로드 API |
| ⬜ | 재생성 요청 | `console.log("재생성 요청")` | 보고서 재생성 API |

### TBM 참여 이력 (TbmParticipationHistoryScreen)

| 상태 | 항목 | 현재 상태 | 구현 내용 |
|---|---|---|---|
| ⬜ | 이력 목록 | `mockHistoryData` 하드코딩 | 참여 이력 목록 API |
| ⬜ | 총 횟수/주의 통계 | `MOCK_TOTAL`, `MOCK_CAUTION` | 통계 API |

### TBM 참여 이력 상세 (TbmParticipationHistoryDetailScreen)

| 상태 | 항목 | 현재 상태 | 구현 내용 |
|---|---|---|---|
| ⬜ | 이력 상세 | `mockHistoryDetails[id]` | 이력 상세 API |
| ⬜ | 교육자료 다운로드 | `console.log("download")` | 파일 다운로드 API |

### TBM 참여 (TbmJoinScreen / TbmJoinInfoScreen)

| 상태 | 항목 | 현재 상태 | 구현 내용 |
|---|---|---|---|
| ⬜ | 오늘의 TBM 목록 | `mockTbmJoinData` | TBM 목록 API (근로자 대상) |
| ⬜ | TBM 정보 | `mockTbmJoinData.find(id)` | TBM 상세 API |
| ⬜ | 건강상태 체크 저장 | 미구현 | 건강상태 저장 API |
| ⬜ | 전자서명 저장 | 미구현 | 서명 데이터 저장 API |

---

## 유해위험개소 (HazardRisk)

### 목록 (HazardRiskScreen)

| 상태 | 항목 | 현재 상태 | 구현 내용 |
|---|---|---|---|
| ⬜ | 제보 목록 | `mockHazardData` | 목록 API (탭/내 제보 필터) |
| ⬜ | 내 제보 수 통계 | `mockHazardData.filter(...)` | 통계 API |

### 상세 (HazardRiskDetailScreen)

| 상태 | 항목 | 현재 상태 | 구현 내용 |
|---|---|---|---|
| ⬜ | 제보 상세 | `mockHazardDetails[id]` | 제보 상세 API |
| ⬜ | 상태 변경 | 미구현 | 처리 상태 변경 API (관리자) |
| ⬜ | 사진 추가 | `console.log("카메라/앨범")` | 카메라/앨범 picker + 업로드 |

### 작성 (HazardRiskCreateScreen)

| 상태 | 항목 | 현재 상태 | 구현 내용 |
|---|---|---|---|
| ⬜ | 사업장 목록 | `MOCK_WORKPLACES` | 사업장 목록 API |
| ⬜ | 사진 첨부 | `console.log("카메라/앨범")` | 카메라/앨범 picker + 업로드 |
| ⬜ | 제보 등록 | `console.log(JSON.stringify(...))` | 제보 등록 API |

---

## 개선 제안 (ImprovementProposal)

### 목록 (ImprovementProposalListScreen)

| 상태 | 항목 | 현재 상태 | 구현 내용 |
|---|---|---|---|
| ⬜ | 제안 목록 | `mockProposalData` | 개선 제안 목록 API |
| ⬜ | 내 제안 수 통계 | `mockProposalData.filter(...)` | 통계 API |

### 상세 (ImprovementProposalDetailScreen)

| 상태 | 항목 | 현재 상태 | 구현 내용 |
|---|---|---|---|
| ⬜ | 제안 상세 | `mockProposalDetails[id]` | 제안 상세 API |
| ⬜ | 현재 사용자 | `MOCK_CURRENT_USER = "홍길동"` | auth context 사용자 이름 |
| ⬜ | 처리 내용 저장 | `console.log("저장")` | 처리 결과 저장 API (관리자) |
| ⬜ | 삭제 | 미구현 | 제안 삭제 API |

### 작성 (ImprovementProposalCreateScreen)

| 상태 | 항목 | 현재 상태 | 구현 내용 |
|---|---|---|---|
| ⬜ | 사업장 목록 | `MOCK_WORKPLACES` | 사업장 목록 API |
| ⬜ | 작성자명 | `"홍길동"` 하드코딩 | auth context 사용자 이름 |
| ⬜ | 제안 등록 | 미구현 | 제안 등록 API |

---

## AI 위험성 평가 문서 (AiRiskDocCreator)

| 상태 | 항목 | 현재 상태 | 구현 내용 |
|---|---|---|---|
| ⬜ | 이미지 선택/촬영 | `createMockPage()` mock 생성 | 카메라/앨범 picker + 업로드 |
| ⬜ | AI 분석 요청 | `setTimeout` 2초 시뮬레이션 | AI 분석 API 호출 |
| ⬜ | 분석 결과 이미지 | placeholder 사용 | AI 분석 결과 이미지 URI |
| ⬜ | PDF 서명 저장 | `console.log(...)` | 서명 데이터 포함 PDF 생성 API |
| ⬜ | PDF 내보내기 | `console.log(...)` | PDF 내보내기 연동 |

---

## 교육 자료 (Education)

### 목록 (EducationMaterialScreen / EducationSelectScreen)

| 상태 | 항목 | 현재 상태 | 구현 내용 |
|---|---|---|---|
| ⬜ | 교육 자료 목록 | `MOCK_EDUCATION_MATERIALS` | 교육 자료 목록 API (카테고리 필터) |
| ⬜ | 내가 만든 자료 탭 | 미구현 | 내 자료 목록 API |

### 상세 (EducationMaterialDetailScreen)

| 상태 | 항목 | 현재 상태 | 구현 내용 |
|---|---|---|---|
| ⬜ | 자료 상세 | `MOCK_EDUCATION_MATERIALS.find(id)` | 교육 자료 상세 API |
| ⬜ | 파일 다운로드/열람 | `console.log("download")` | 파일 다운로드 연동 |
| ⬜ | 게시하기 | `console.log("publish")` | 게시 상태 변경 API |

### 등록 (EducationMaterialRegisterScreen)

| 상태 | 항목 | 현재 상태 | 구현 내용 |
|---|---|---|---|
| ⬜ | 파일 첨부 | `MOCK_FILE` 고정 | 파일 picker + 업로드 |
| ⬜ | 자료 등록 | `console.log(JSON.stringify(...))` | 교육 자료 등록 API |

---

## 순회점검 (Patrol)

### 목록 (PatrolScreen)

| 상태 | 항목 | 현재 상태 | 구현 내용 |
|---|---|---|---|
| ⬜ | 점검 목록 | `MOCK_PATROL_ITEMS` 인라인 | 순회점검 목록 API |

### 상세 (PatrolDetailScreen)

| 상태 | 항목 | 현재 상태 | 구현 내용 |
|---|---|---|---|
| ⬜ | 점검 상세 | `MOCK_PATROL`, `MOCK_CHECK_ITEMS` | 점검 상세 API |
| ⬜ | 항목별 통계 | `MOCK_TOTAL`, `MOCK_GOOD`, `MOCK_BAD` | 통계 API |

### 작성 (PatrolCreateScreen)

| 상태 | 항목 | 현재 상태 | 구현 내용 |
|---|---|---|---|
| ⬜ | 담당자 목록 | `MOCK_USERS` | 사용자 목록 API |
| ⬜ | 점검 템플릿 | `MOCK_TEMPLATES` | 점검 템플릿 목록 API |
| ⬜ | 점검 생성 | 미구현 | 점검 생성 API |

---

## 번역 (Translation)

### 음성 번역 (VoiceTranslationScreen)

| 상태 | 항목 | 현재 상태 | 구현 내용 |
|---|---|---|---|
| ⬜ | STT / 번역 / TTS | `MOCK_TOP_MESSAGES`, `MOCK_BOTTOM_MESSAGES` | 실시간 음성인식 + 번역 API (웹소켓) |

### 통역 교육 (EducationPresentationScreen)

| 상태 | 항목 | 현재 상태 | 구현 내용 |
|---|---|---|---|
| ⬜ | Room ID | `MOCK_ROOM_ID = "76481574"` | navigation params로 수신 |
| ⬜ | 실시간 채팅 | `MOCK_MESSAGES` | 실시간 채팅 API (웹소켓) |

---

## 알림 (NotifyScreen)

| 상태 | 항목 | 현재 상태 | 구현 내용 |
|---|---|---|---|
| ⬜ | 알림 목록 | empty state만 표시 | 알림 목록 API |
| ⬜ | 읽음 처리 | 버튼 미연결 | 읽음 처리 API |
| ⬜ | 전체 읽음/삭제 | 버튼 미연결 | 전체 읽음/삭제 API |

---

## 마이페이지 (MyPageScreen)

| 상태 | 항목 | 현재 상태 | 구현 내용 |
|---|---|---|---|
| ✅ | 사용자 정보 | `MOCK_USER.name`, `MOCK_USER.email` | auth context 실제 유저 정보 |
| ✅ | 로그아웃 | 모달 UI만 | 로그아웃 API + context 초기화 |
| ✅ | 작업장 정보 | 미구현 | WorkplaceStore 연결 — `8cabf5a` |

---

## 언어 설정 (LanguageSettingsScreen)

| 상태 | 항목 | 현재 상태 | 구현 내용 |
|---|---|---|---|
| ⬜ | 언어 변경 저장 | UI 상태만 변경 | i18n 언어 변경 + 서버 사용자 설정 저장 |

---

## QR 스캐너 (QrScannerScreen)

| 상태 | 항목 | 현재 상태 | 구현 내용 |
|---|---|---|---|
| ⬜ | QR 인식 | `console.log(accessCode)` | 카메라 QR 인식 실제 연동 |
| ⬜ | QR 결과 라우팅 | 미구현 | QR 결과 기반 화면 이동 (TBM 참여 등) |
