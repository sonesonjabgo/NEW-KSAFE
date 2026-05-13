# AGENT_GUIDE — K-SAFEONE

AI 에이전트(Claude Code 등)가 이 프로젝트를 빠르게 파악하고 이어서 작업할 수 있도록 작성된 가이드입니다.

---

## 프로젝트 컨텍스트

**목적**: KS산업안전협회의 현장 안전 관리 모바일 앱. 관리자와 근로자 두 역할을 지원하며, 1:1 통역, AI 챗봇, TBM 관리, 교육/발표, 순회점검 등의 기능을 제공한다.

**현재 진행 상태** (2026-05-13 기준)

| 구분 | 상태 |
|---|---|
| 로그인 화면 UI | 완료 (인증 로직 미연결) |
| 홈 화면 UI | 완료 (API 미연결, 하드코딩 데이터) |
| 인증 (로그인/로그아웃) | 미구현 |
| 기능 그리드 각 항목 화면 | 미구현 |
| 안전게시판 상세/목록 | 미구현 |
| 안전관리 화면 | 원격 브랜치에 존재 (`origin/feature/safe-health-ui`) |
| 안전게시판 화면 | 원격 브랜치에 존재 (`origin/feature/safe-board-ui`) |
| 근로자 참여 화면 | 원격 브랜치에 존재 (`origin/feature/worker-participation-ui`) |
| API 연동 | 미구현 (apisauce 설정만 존재) |

---

## 아키텍처 개요

### 보일러플레이트: Ignite 11.5.0

Infinite Red의 Ignite CLI로 생성된 프로젝트. `app/screens/Demo*`, `app/navigators/DemoNavigator.tsx` 등 Demo 파일들은 보일러플레이트 잔존물이며 실제 서비스와 무관하다.

### 디렉토리 역할

```
app/
├── app.tsx           # 루트: Provider 스택 (GluestackUIProvider, ThemeProvider, SafeAreaProvider 등)
├── components/       # 프로젝트 공용 컴포넌트 (Ignite 기본 제공)
│   └── ui/           # Gluestack UI v2 래퍼 (직접 커스터마이징)
├── context/          # React Context (현재: AuthContext, EpisodeContext)
├── navigators/       # 네비게이터 + 타입 정의
├── screens/          # 화면 컴포넌트 (1파일 = 1화면)
├── services/api/     # apisauce 기반 API 레이어
├── theme/            # 색상/폰트/간격 토큰
└── utils/            # 범용 유틸리티
```

### 상태 관리

현재 **React Context API**만 사용 중이다. Ignite 기본값인 MobX-State-Tree는 아직 도입하지 않았다. 새로운 전역 상태가 필요하면 `app/context/` 아래에 Context를 추가하거나, 팀 논의 후 MobX-State-Tree 도입을 결정해야 한다.

### 스타일링 방식

두 가지 방식이 혼용 중이다:
1. **StyleSheet 객체** (`const $root: ViewStyle = {...}`) — LoginScreen, HomeScreen에서 주로 사용
2. **NativeWind** (Tailwind className) — Gluestack UI 컴포넌트(`app/components/ui/`)에서 사용

새 화면을 작성할 때는 기존 화면의 방식(StyleSheet)을 따르는 것이 일관성 면에서 낫다.

### 폰트

Pretendard 폰트가 전역 설정되어 있으며 `app/theme/typography.ts`의 `typography.primary` 객체를 통해 접근한다.

```ts
import { typography } from "@/theme/typography"

// 사용 예
fontFamily: typography.primary.bold     // Pretendard Bold
fontFamily: typography.primary.semiBold
fontFamily: typography.primary.medium
fontFamily: typography.primary.normal
```

### 경로 별칭

`tsconfig.json`에 `@/` 별칭이 설정되어 있다 (`app/` 디렉토리를 가리킴). `@assets/`는 `assets/` 디렉토리를 가리킨다.

---

## 주요 파일 맵

| 목적 | 파일 |
|---|---|
| 네비게이션 라우트 추가 | `app/navigators/AppNavigator.tsx` + `app/navigators/navigationTypes.ts` |
| 전역 테마/색상 수정 | `app/theme/colors.ts`, `app/theme/typography.ts` |
| API 엔드포인트 설정 | `app/config/config.base.ts`, `app/services/api/index.ts` |
| 로그인 화면 수정 | `app/screens/LoginScreen.tsx` |
| 홈 화면 수정 | `app/screens/HomeScreen.tsx` |
| 앱 전역 Provider 설정 | `app/app.tsx` |
| Gluestack UI 테마 | `app/components/ui/gluestack-ui-provider/config.ts` |
| 다크/라이트 모드 처리 | `app/components/ui/gluestack-ui-provider/index.tsx` |

---

## 화면별 상세 설명

### LoginScreen (`app/screens/LoginScreen.tsx`)

**목적**: 이메일/비밀번호 입력 후 홈 화면으로 이동.

**현재 상태**: UI만 구현. 로그인 버튼을 누르면 실제 API 검증 없이 `navigation.navigate("Home")`만 실행된다.

**구성**:
- 상단 42%: 네이비 배경 + 로고 (`assets/logo-ksafeone.png`) + 브랜드명
- 하단: 흰색 카드 (이메일 입력, 비밀번호 입력 + 토글, 로그인 버튼, 비밀번호 찾기)

**연결된 타입**: `AppStackScreenProps<"Login">` (`app/navigators/navigationTypes.ts`)

**추후 작업**: 실제 API 연동 시 `navigation.navigate("Home")` 대신 AuthContext의 로그인 함수를 호출하고 토큰을 저장해야 한다.

---

### HomeScreen (`app/screens/HomeScreen.tsx`)

**목적**: 앱의 메인 대시보드. 역할(관리자/근로자)에 따라 다른 기능 그리드와 게시판을 보여준다.

**현재 상태**: UI만 구현. 사용자 역할은 화면 상단의 임시 토글 버튼으로 전환. 게시판 데이터는 하드코딩.

**주요 상태**:
```ts
const [userRole, setUserRole] = useState<"admin" | "worker">("worker")
const [selectedTab, setSelectedTab] = useState<TabType>("전체")
const [activeNav, setActiveNav] = useState(0)
const [hasExistingEdu, setHasExistingEdu] = useState(true)  // 교육 배너 ON/OFF
```

**기능 그리드 구성**:
- `GRID_ITEMS` 배열에 11개 항목 정의
- 관리자: `slice(0, 9)` → 9개
- 근로자: `slice(0, 6)` + `slice(9)` → 8개
- 아이콘 일부는 임시 아이콘 사용 중 (주석으로 표시됨)

**바텀 네비게이션**: 현재 화면 전환 로직 없음. `activeNav` 인덱스로 탭 하이라이트만 변경.

**임시 코드 위치**: `$devToggleArea` 뷰 전체(역할 전환 버튼, 교육 배너 ON/OFF)는 개발 편의용이며 실제 서비스 전에 제거 필요.

---

## 알려진 이슈 및 주의사항

1. **인증 미구현**: `AppNavigator.tsx`에서 `isAuthenticated` 기반 조건 분기가 주석 처리되어 있다. 현재는 Login → Home이 항상 열려 있다.

2. **임시 아이콘**: `HomeScreen.tsx`의 `GRID_ITEMS`에서 `grid_interpret.png` 아이콘이 크기 문제로 `grid_chatbot.png`로 대체되어 있고, 근로자 전용 항목도 임시 아이콘을 사용 중이다.

3. **하드코딩 데이터**: `BOARD_ITEMS`(게시판), 인사말의 "김영희님"은 모두 하드코딩이다. API 연동 시 교체 필요.

4. **바텀 탭 네비게이션 미연결**: 현재 바텀 네비게이션 탭 클릭 시 화면 이동이 구현되지 않았다. `@react-navigation/bottom-tabs`가 이미 설치되어 있으므로 `DemoNavigator.tsx`를 참고해 탭 네비게이터를 추가하면 된다.

5. **팀원 브랜치 미병합**: 다음 브랜치가 원격에만 존재하며 아직 main에 병합되지 않았다:
   - `origin/feature/safe-board-ui` (안전게시판 UI)
   - `origin/feature/safe-health-ui` (안전관리 UI)
   - `origin/feature/worker-participation-ui` (근로자 참여 UI)

6. **Demo 파일 잔존**: `app/screens/Demo*`, `app/navigators/DemoNavigator.tsx` 등 Ignite 보일러플레이트 Demo 파일이 남아 있다. 서비스 코드와 무관하므로 건드리지 않아도 되지만, 최종 배포 전 정리 권장.

---

## 새 화면 추가 시 따라야 할 절차

1. `app/screens/새화면.tsx` 파일 생성
2. `app/navigators/navigationTypes.ts`의 `AppStackParamList`에 라우트 추가
3. `app/navigators/AppNavigator.tsx`의 `<Stack.Navigator>` 안에 `<Stack.Screen>` 추가
4. 이전 화면에서 `navigation.navigate("새화면")` 호출

```ts
// navigationTypes.ts 예시
export type AppStackParamList = {
  Login: undefined
  Home: undefined
  NewScreen: { param?: string }  // 파라미터가 있을 경우
}
```

---

## 브랜치 전략

| 브랜치 패턴 | 용도 |
|---|---|
| `main` | 배포 기준 브랜치 |
| `feat/{기능명}` | 기능 개발 |
| `feature/{기능명}` | 팀원 작업 (혼용 중) |
| `fix/{버그명}` | 버그 수정 |

병합 시 `--no-ff` 옵션 사용, 커밋 메시지는 `merge: {브랜치명} → main` 형식.

---

## 커밋 메시지 규칙

```
feat: 새로운 기능 추가
fix: 버그 수정
chore: 빌드/설정 변경
refactor: 리팩토링
style: 스타일 변경 (코드 동작 무관)
merge: {브랜치명} → {대상브랜치}
```

---

## 개발 환경 확인

```bash
# 타입 검사
npm run compile

# 린트
npm run lint:check

# 테스트
npm test
```
