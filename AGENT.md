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
| 안전게시판 목록 화면 | 완료 (API 미연결, 목업 데이터) |
| 안전관리 화면 | 완료 (API 미연결, 역할 하드코딩) |
| 근로자 참여 화면 | 완료 (API 미연결) |
| 인증 (로그인/로그아웃) | 미구현 |
| 기능 그리드 각 항목 화면 | 미구현 |
| 안전게시판 상세 페이지 | 미구현 |
| 바텀 네비게이션 화면 연결 | 미구현 (탭 하이라이트만 동작) |
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

**세 가지 방식이 혼용 중이다:**

1. **파일 하단 인라인 StyleSheet** (`const $root: ViewStyle = {...}`) — `LoginScreen`, `HomeScreen`
2. **분리된 styles.ts + namespace import** (`import * as S from "./styles"`) — `SafeBoardScreen`, `SafeHealthScreen`, `WorkerParticipationScreen` (팀원 작업 화면)
3. **NativeWind** (Tailwind className) — Gluestack UI 컴포넌트(`app/components/ui/`)에서 사용

새 화면을 작성할 때 방식 1과 2 중 팀 내에서 통일이 필요하다. 현재는 개발자별로 다른 방식을 사용 중이다.

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

### 네비게이션 아키텍처 (BottomTab 도입 완료)

프로젝트는 **Native Stack** 내부에 **Bottom Tab**이 중첩된 구조를 사용한다.

- **최상위 스택**: `app/navigators/AppNavigator.tsx` (`Login`, `Main` 등)
- **하단 탭 네비게이터**: `app/navigators/MainNavigator.tsx` (`Home`, `SafeBoard`, `SafeHealthMain`, `WorkerParticipation`)

#### 탭 표시 기준
- 앱의 핵심 메인 화면 4종(`Home`, `SafeBoard`, `SafeHealthMain`, `MyPage`)은 `MainNavigator`에 등록되어 하단 탭이 항상 표시된다.
- 상세 페이지, 등록 폼 등 탭이 사라져야 하는 화면은 `AppNavigator`의 전역 스택에 직접 등록한다.

#### ⚠️ 절대 규칙: 화면 내 직접 네비게이션 금지
- `HomeScreen.tsx` 등 화면 컴포넌트 내부에 별도의 탭 바나 네비게이션 UI를 직접 구현하지 않는다.
- 모든 화면 전환과 탭 관리는 `react-navigation`의 네비게이터 파일(`MainNavigator.tsx`, `AppNavigator.tsx`)에서 일괄 관리한다.

| API 엔드포인트 설정 | `app/config/config.base.ts`, `app/services/api/index.ts` |
| 로그인 화면 수정 | `app/screens/LoginScreen.tsx` |
| 홈 화면 수정 | `app/screens/HomeScreen.tsx` |
| 안전게시판 화면 수정 | `app/screens/SafeBoardScreen/SafeBoardScreen.tsx` |
| 안전관리 화면 수정 | `app/screens/SafeHealthScreen/SafeHealthMainScreen.tsx` |
| 근로자 참여 화면 수정 | `app/screens/WorkerParticipationScreen/WorkerParticipationScreen.tsx` |
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

### SafeBoardScreen (`app/screens/SafeBoardScreen/SafeBoardScreen.tsx`)

**목적**: 안전게시판 게시글 목록. 사업장 필터와 탭(전체/내 게시글)으로 필터링, 고정 글 상단 정렬.

**현재 상태**: UI만 구현. `mockRole: Role = "admin"` 하드코딩. `mockSafeBoardData`(목업 데이터) 사용 중.

**구성**:
- 관리자: 사업장 선택 드롭다운 모달 + 전체/내 게시글 탭 + 알림 발송 버튼
- 근로자: 본인 사업장 고정, 탭 없음
- `SafeBoardCard` 컴포넌트로 게시글 렌더링 (고정 글 핀 아이콘 표시)

**스타일 패턴**: `import * as S from "./styles"` 방식 (기존 화면과 다름)

**진입점**: `HomeScreen`의 안전게시판 더보기 버튼 → `navigation.navigate("SafeBoard")`

**추후 작업**: `mockRole`을 AuthContext 실제 역할로 교체, 목업 데이터를 API로 교체, 게시글 상세 화면 추가.

---

### SafeHealthMainScreen (`app/screens/SafeHealthScreen/SafeHealthMainScreen.tsx`)

**목적**: 안전관리 기능 메뉴 목록. 관리자/근로자에 따라 다른 메뉴를 표시.

**현재 상태**: UI만 구현. `mockRole: Role = "admin"` 하드코딩.

**구성**:
- 관리자 메뉴 (`SafeHealthAdminView`): 작업장 순회점검, 교육자료, TBM 관리/생성, TBM 보고서 조회, TBM 참여, TBM 참여 이력 (6개)
- 근로자 메뉴 (`SafeHealthUserView`): TBM 참여, 현황 조회 (2개)
- `SafeHealthMenuItemComponent`에서 `@tabler/icons-react-native` 아이콘 사용

**아이콘 매핑**: `getIcon(iconName)` 함수로 문자열 → 아이콘 컴포넌트 변환. 지원 아이콘: `Walk`, `Book`, `CalendarPlus`, `Download`, `Users`, `History`, `LayoutList`

**스타일 패턴**: `import * as S from "./styles"` 방식

**추후 작업**: `mockRole`을 실제 역할로 교체, 각 메뉴 항목 클릭 시 화면 이동 구현 (현재 `console.log`만 출력).

---

### WorkerParticipationScreen (`app/screens/WorkerParticipationScreen/WorkerParticipationScreen.tsx`)

**목적**: 근로자 참여 기능 메뉴. 유해위험개소 등록, 제도개선 제안 등록 진입점.

**현재 상태**: UI만 구현.

**구성**:
- `WorkerParticipationMenuItemComponent`로 메뉴 렌더링
- 메뉴 항목: 유해위험개소 (`AlertTriangle` 아이콘), 제도개선 제안 (`Bulb` 아이콘)
- `@tabler/icons-react-native` 아이콘 사용

**스타일 패턴**: `import * as S from "./styles"` 방식. `SafeHealthScreen`의 styles.ts와 구조 동일 (복사 기반으로 보임).

**추후 작업**: 각 메뉴 항목 클릭 시 화면 이동 구현 (현재 `console.log`만 출력).

---

## 알려진 이슈 및 주의사항

1. **인증 미구현**: `AppNavigator.tsx`에서 `isAuthenticated` 기반 조건 분기가 주석 처리되어 있다. 현재는 Login → Home이 항상 열려 있다.

2. **임시 아이콘**: `HomeScreen.tsx`의 `GRID_ITEMS`에서 `grid_interpret.png` 아이콘이 크기 문제로 `grid_chatbot.png`로 대체되어 있고, 근로자 전용 항목도 임시 아이콘을 사용 중이다.

3. **하드코딩 데이터**: `BOARD_ITEMS`(게시판), 인사말의 "김영희님"은 모두 하드코딩이다. API 연동 시 교체 필요.

4. **바텀 탭 네비게이션 미연결**: 현재 바텀 네비게이션 탭 클릭 시 화면 이동이 구현되지 않았다. `@react-navigation/bottom-tabs`가 이미 설치되어 있으므로 `DemoNavigator.tsx`를 참고해 탭 네비게이터를 추가하면 된다. 연결 대상: 홈→`Home`, 안전게시판→`SafeBoard`, 안전관리→`SafeHealthMain`, 근로자참여/마이페이지→`WorkerParticipation`.

5. **역할(Role) 하드코딩**: `SafeBoardScreen`, `SafeHealthMainScreen`에 `const mockRole: Role = "admin"`이 하드코딩되어 있다. 실제 인증 구현 후 AuthContext에서 역할을 읽도록 교체 필요.

6. **메뉴 클릭 미연결**: `SafeHealthScreen`과 `WorkerParticipationScreen`의 각 메뉴 항목 `onPress`가 `console.log`만 출력한다. 각 기능 화면이 개발되면 `navigation.navigate()`로 교체 필요.

7. **스타일 패턴 불일치**: `LoginScreen`/`HomeScreen`은 파일 하단에 인라인 StyleSheet를 사용하지만, 팀원이 작성한 `SafeBoardScreen`/`SafeHealthScreen`/`WorkerParticipationScreen`은 별도 `styles.ts`에 `export`하고 `import * as S from "./styles"`로 가져오는 방식을 사용한다. 새 화면 추가 시 팀 내 통일 필요.

8. **Demo 파일 잔존**: `app/screens/Demo*`, `app/navigators/DemoNavigator.tsx` 등 Ignite 보일러플레이트 Demo 파일이 남아 있다. 서비스 코드와 무관하므로 건드리지 않아도 되지만, 최종 배포 전 정리 권장.

---

## 공통 컴포넌트 — 반드시 재사용할 것

새 화면 작성 전에 아래 공통 컴포넌트를 확인하고, 해당하는 경우 직접 구현 없이 재사용한다.

### `StackScreen` (`app/components/StackScreen.tsx`)

**스택 네비게이션 화면**에 사용하는 전체 레이아웃 래퍼.
- 네이비 배경 루트 + SafeArea 처리 + 헤더(뒤로가기/제목/우측 슬롯) + 라운드 상단 콘텐츠 영역을 일괄 제공
- 현재 사용 중: `AISafetyChatScreen`, `VoiceTranslationScreen`, `TextTranslationScreen`, `ImageTranslationScreen`

```tsx
import { StackScreen } from "@/components/StackScreen"

<StackScreen
  title={translate("myScreen:title")}
  onBack={() => navigation.goBack()}
  contentBg="#FFFFFF"                          // 기본값: colors.screenBg (#F9FAFE)
  rightSlot={<TouchableOpacity onPress={...}><IconTrash /></TouchableOpacity>}
>
  {/* 화면 콘텐츠 */}
</StackScreen>
```

- `rightSlot` 미제공 시 레이아웃 균형용 빈 뷰 자동 삽입
- 언어 선택 모달처럼 화면 위에 올라오는 Modal은 `StackScreen` 바깥, Fragment `<>` 안에 배치

### `LanguagePickerModal` (`app/components/LanguagePickerModal.tsx`)

**언어 선택 바텀시트 모달**. 15개 언어 목록, 슬라이드 업/다운 애니메이션 내장.
- 현재 사용 중: `TextTranslationScreen`, `VoiceTranslationScreen`, `ImageTranslationScreen`

```tsx
import { LanguagePickerModal } from "@/components/LanguagePickerModal"
import { LanguageKey } from "@/constants/languages"

const [langMenuVisible, setLangMenuVisible] = useState(false)
const [language, setLanguage] = useState<LanguageKey>("korean")

<LanguagePickerModal
  isVisible={langMenuVisible}
  currentKey={language}
  title={translate("myScreen:languageMenu.title")}
  getLabel={(key) => translate(`myScreen:languages.${key}` as any)}
  getSubtitle={(key) => translate(`myScreen:languageSubtitles.${key}` as any)}
  onSelect={(key) => setLanguage(key)}
  onClose={() => setLangMenuVisible(false)}
/>
```

### `LanguageKey` 타입 / `LANGUAGES` 배열 (`app/constants/languages.ts`)

번역 관련 화면에서 공유하는 15개 언어 상수. 직접 선언하지 말고 여기서 import.

```ts
import { LanguageKey, LANGUAGES } from "@/constants/languages"
```

### `menuScreenStyles` (`app/screens/shared/menuScreenStyles.ts`)

**메뉴 목록 구조 화면** (SafeHealth, WorkerParticipation 등)의 공유 스타일.
네이비 헤더 + 흰 카드 메뉴 항목 구조를 가진 화면은 이 파일을 사용한다.

```ts
import * as S from "@/screens/shared/menuScreenStyles"

// 사용 가능한 토큰:
// S.$screenContainer, S.$headerContainer, S.$headerTitle
// S.$contentContainer, S.$menuCard, S.$menuItemContainer
// S.$menuIconContainer, S.$menuContentContainer
// S.$menuTitle, S.$menuDescription, S.$menuChevron, S.$menuDivider
// S.$emptyContainer, S.$emptyText
```

### `colors` (`app/theme/colors.ts`)

`const NAVY = "#0B3069"` 또는 `const BLUE = "#1062D8"` 를 화면 파일에 직접 선언하지 말 것.

```ts
import { colors } from "@/theme/colors"

colors.navy      // "#0B3069"
colors.blue      // "#1062D8"
colors.screenBg  // "#F9FAFE"
```

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

## 다국어 지원 (i18n)

프로젝트는 **i18next + react-i18next**를 사용하여 다국어를 지원합니다.

### 파일 구조

- `app/i18n/index.ts` — i18n 초기화 및 설정
- `app/i18n/translate.ts` — translate() 함수 (권장)
- `app/i18n/en.ts` — 영어 번역 (소스 of truth, 여기서 구조 정의)
- `app/i18n/ko.ts` — 한국어 번역 (현재 주 언어)
- `app/i18n/{ar|es|fr|hi|ja}.ts` — 기타 언어

### 텍스트 추가 절차

**절대 규칙: 사용자 노출 텍스트는 하드코딩 금지**

새로운 텍스트가 필요할 때:

1. **en.ts에 키와 영어 번역 추가** (TypeScript 타입 정의의 소스)
   ```ts
   myFeature: {
     title: "My Feature Title",
     description: "Feature description",
   }
   ```

2. **ko.ts에 한국어 번역 추가** (동일한 구조)
   ```ts
   myFeature: {
     title: "내 기능 제목",
     description: "기능 설명",
   }
   ```

3. **코드에서 translate() 함수 사용**
   ```ts
   import { translate } from "@/i18n/translate"
   
   <Text text={translate("myFeature:title")} />
   ```

### 키 네이밍 규칙

- **패턴**: `screenOrFeature.section.element`
- **구분자**: 최상위와 두 번째 사이는 `:` (콜론), 그 이하는 `.` (점)
- **예시**: 
  - `loginScreen:tagline`
  - `homeScreen:grid.interpret.label`
  - `safeBoardScreen:tabs.all`

### translate() vs useTranslation()

- **translate() 권장** — 컴포넌트 외부(모듈 레벨)에서도 사용 가능, 인터폴레이션 지원
  ```ts
  translate("key:path", { name: "value" })  // "Hello {{name}}"
  ```

- **useTranslation() 훅** — 복잡한 다국어 로직이 필요한 경우만 사용
  ```ts
  const { t } = useTranslation()
  t("key:path")
  ```

### 모듈 레벨 배열에서 translate 사용

배열이나 객체를 컴포넌트 외부에서 정의하고 translate를 사용해야 하는 경우, **useMemo 내부로 이동**:

```ts
// ❌ 나쁜 예: 모듈 레벨 (i18n 미초기화)
const ITEMS = [
  { label: translate("key:item1") }  // ⚠️ 작동 안 할 수 있음
]

// ✅ 좋은 예: 컴포넌트 내부 useMemo
const ITEMS = useMemo(() => [
  { label: translate("key:item1") }
], [])
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
