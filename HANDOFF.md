# 인수인계 문서 — feat/safe-board 브랜치

> 작성일: 2026-05-26  
> 브랜치: `feat/safe-board`  
> 전체 기능 목록 및 완료 현황: `FEATURES_TODO.md` 참고

---

## 1. 현재 상태 요약

안전게시판(SafeBoard) 기능의 API 연동이 대부분 완료된 상태. 마지막 작업인 **게시글 수정 화면의 첨부파일 로직**이 미커밋 상태로 남아있음.

### 미커밋 변경사항 (작업 시작 전 반드시 커밋 또는 확인)

| 파일 | 변경 내용 |
|---|---|
| `app/screens/SafeBoardCreateScreen/SafeBoardCreateScreen.tsx` | 수정 모드 첨부파일 표시/추가/삭제 UI 및 로직 |
| `app/services/api/safeBoard.ts` | `UpdateCompanyPostPayload`에 `newUploadIds`, `deleteAttachmentIds` 필드 추가 |

---

## 2. 안전게시판 완료 항목

| 커밋 | 내용 |
|---|---|
| `8e955e4` | 게시글 작성 400 오류 수정 (scope 필드 제거), 상세 조회 404 수정 |
| `5b28ff7` | 상세 화면 첨부파일 표시 (AttachmentModel, AttachmentDto, UI 카드) |
| `b55a84a` | 작성 화면 첨부파일 섹션 추가 (expo-document-picker, presigned URL 업로드) |
| `bc55fb1` | 홈 → 상세 네비게이션 연결, activeTab 기반 엔드포인트 분기 버그 수정 |
| 미커밋 | 수정 화면 첨부파일 (기존 첨부 유지/삭제, 새 파일 추가) |

---

## 3. 안전게시판 아키텍처

### 엔드포인트 선택 규칙

상세 화면 진입 시 두 엔드포인트 중 하나를 선택:

```
isAdmin && safeBoardStore.myPosts.some(p => p.id === id)
  → PATCH /api/v1/user/me/company-posts/{id}   (본인 게시글, draft/published/archived 모두)
  → else /api/v1/user/company-posts/{id}        (열람용, published만)
```

`myPosts`는 SafeBoardScreen 마운트 시 로드됨. 홈에서 바로 진입하면 `myPosts`가 비어있어 열람용 엔드포인트 사용 — 홈은 published 게시글만 노출하므로 문제없음.

### 파일 업로드 흐름 (작성/수정 공통)

```
DocumentPicker.getDocumentAsync()
  → POST /api/v1/user/company-posts/upload-url  (initiateCompanyPostUpload)
     { fileName, contentType, fileSize }
     → { uploadId, signedUrl }
  → fetch(fileUri).blob()
  → fetch(signedUrl, { method: 'PUT', body: blob })
  → uploadId 수집
```

**작성 시**: `uploadIds` 배열로 `createPost` payload에 전달  
**수정 시**: `newUploadIds`(새 파일) + `deleteAttachmentIds`(삭제할 기존 파일 id) 로 `updatePost` payload에 전달

### 주요 파일

| 파일 | 역할 |
|---|---|
| `app/services/api/safeBoard.ts` | 전체 SafeBoard API 함수 및 DTO 타입 |
| `app/models/SafeBoardStore.ts` | MobX State Tree 스토어 (boards, myPosts, currentPost) |
| `app/screens/SafeBoardScreen/SafeBoardScreen.tsx` | 게시글 목록 (전체/내 게시글 탭) |
| `app/screens/SafeBoardDetailScreen/SafeBoardDetailScreen.tsx` | 게시글 상세, 발행/삭제 |
| `app/screens/SafeBoardCreateScreen/SafeBoardCreateScreen.tsx` | 게시글 작성/수정, 첨부파일 |

### SafeBoardStore 액션

| 액션 | 설명 |
|---|---|
| `fetchBoardPosts(workplaceId?)` | 전체 게시글 목록 (페이지네이션, cursor 방식) |
| `fetchMyPosts()` | 내 게시글 목록 |
| `fetchPostDetail(id)` | 열람용 상세 (`/company-posts/{id}`) |
| `fetchMyPostDetail(id)` | 관리자 본인 게시글 상세 (`/me/company-posts/{id}`) |
| `createPost(payload)` | 게시글 생성 |
| `updatePost(id, payload)` | 게시글 수정 |
| `publishPost(id)` | 게시글 발행 |
| `deletePost(id)` | 게시글 삭제 |

---

## 4. 안전게시판 잔여 작업

| 항목 | 위치 | 내용 |
|---|---|---|
| 알림 발송 화면 | `SafeBoardNotifyScreen` | 전체 알림 발송 API 연동 (`/api/v1/user/company-posts/notify` 또는 유사 엔드포인트 — docs-json.json 확인 필요) |
| 수정 화면 첨부파일 커밋 | `SafeBoardCreateScreen` | 미커밋 상태, 커밋 필요 |

---

## 5. 다음 우선 작업 (SafeBoard 외)

`FEATURES_TODO.md` 기준 미착수(`⬜`) 항목 중 우선순위:

1. **TBM** — 목록/상세/작성/활동 보고서 전체 미착수
2. **알림 화면** — 목록/읽음 처리 미착수
3. **푸시 알림** — FCM 토큰 등록 (`POST /common/users/fcm-token`) 앱 레벨 연동
4. **HazardRisk, ImprovementProposal** — 목록/상세/작성 전체 미착수

---

## 6. 개발 환경 참고

```bash
npm run compile    # 타입 검사 (작업 후 반드시 실행)
npm run lint:check # 린트
```

- **API base URL**: `https://api.k-safeone.co.kr`
- **API 명세**: 프로젝트 루트 `docs-json.json` (OpenAPI 3.0)
- **인증**: Supabase JWT, `supabase.auth.getSession()`으로 토큰 획득 후 `Authorization: Bearer {token}` 헤더
- **네이티브 모듈 재빌드 필요**: `expo-document-picker` 이번 세션에서 추가됨 (`npx expo install expo-document-picker` 완료)

---

## 7. 주의사항

- **UI 구조 변경 금지**: 기능 이식 시 스타일·컴포넌트 트리는 그대로 유지, 로직만 수정
- **색상 리터럴 금지**: `colors.*` 토큰 사용 (`app/theme/colors.ts`)
- **텍스트 하드코딩 금지**: `translate()` + `en.ts`/`ko.ts` 동시 추가
- **모듈 최상위 translate() 금지**: `useMemo` 내부에서 호출
- **커밋 단위**: 작업 시작 전 `git status` 확인 후 미커밋 변경사항 먼저 커밋
