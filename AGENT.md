# AGENT_GUIDE — K-SAFEONE

AI 에이전트가 이 프로젝트를 빠르게 파악하고 작업을 이어받기 위한 가이드.

---

## 프로젝트 컨텍스트

**목적**: KS산업안전협회 현장 안전 관리 모바일 앱. 관리자/근로자 두 역할을 지원하며, 1:1 통역, AI 챗봇, TBM 관리, 순회점검 등의 기능을 제공한다.

**주요 미구현 항목**: 인증(로그인/로그아웃), 기능 그리드 각 항목 화면, 안전게시판 상세, API 연동 전반. 각 화면 상태는 해당 파일의 주석 및 `mockRole`·하드코딩 데이터로 파악 가능.

---

## 아키텍처

**보일러플레이트**: Ignite 11.5.0. `app/screens/Demo*`, `app/navigators/DemoNavigator.tsx`는 잔존 파일이며 무시한다.

**디렉토리**:
```
app/
├── components/       # 공용 컴포넌트 (StackScreen, LanguagePickerModal 등 커스텀 포함)
├── constants/        # 공유 상수 (languages.ts 등)
├── context/          # React Context (AuthContext 등)
├── navigators/       # AppNavigator, MainNavigator + 타입 정의
├── screens/          # 화면 컴포넌트
│   └── shared/       # 화면 간 공유 스타일 (menuScreenStyles.ts)
├── services/api/     # apisauce 기반 API 레이어
└── theme/            # colors, typography, spacing 토큰
```

**상태 관리**: React Context API만 사용 중. 새 전역 상태는 `app/context/`에 추가.

**스타일링**: 두 방식 혼용 중 — 인라인 `const $style: ViewStyle = {}` (LoginScreen, HomeScreen) vs. 별도 `styles.ts` + `import * as S from "./styles"` (SafeBoardScreen, SafeHealthScreen 등). 새 화면은 기존 같은 패턴을 따른다.

**폰트**: Pretendard 전역 설정. `typography.primary.bold / semiBold / medium / normal`으로 접근.

**경로 별칭**: `@/` → `app/`, `@assets/` → `assets/`

---

## 네비게이션

Native Stack 안에 Bottom Tab이 중첩된 구조.

- **AppNavigator** (`app/navigators/AppNavigator.tsx`): 최상위 스택. 탭이 사라져야 하는 화면(상세, 폼 등)은 여기에 등록.
- **MainNavigator** (`app/navigators/MainNavigator.tsx`): 하단 탭 4종 — Home, SafeBoard, SafeHealthMain, WorkerParticipation.

**⚠️ 절대 규칙**: 화면 컴포넌트 내부에 탭 바나 네비게이션 UI를 직접 구현하지 않는다. 모든 탭/화면 전환은 네비게이터 파일에서만 관리한다.

---

## 공통 컴포넌트 — 반드시 재사용할 것

새 화면 작성 전에 아래를 확인하고, 해당하는 경우 직접 구현하지 않는다.

### `StackScreen` (`app/components/StackScreen.tsx`)

스택 화면의 전체 레이아웃 래퍼. 네이비 루트 + SafeArea + 헤더(뒤로가기/제목/우측 슬롯) + 라운드 상단 콘텐츠 영역 제공.

```tsx
import { StackScreen } from "@/components/StackScreen"

<StackScreen
  title={translate("myScreen:title")}
  onBack={() => navigation.goBack()}
  contentBg="#FFFFFF"           // 기본값: colors.screenBg (#F9FAFE)
  rightSlot={<TouchableOpacity onPress={...}><IconTrash /></TouchableOpacity>}
>
  {/* 화면 콘텐츠 */}
</StackScreen>
```

`rightSlot` 미제공 시 균형용 빈 뷰 자동 삽입. 화면 위에 올라오는 Modal은 `StackScreen` 바깥 Fragment `<>` 안에 배치.

### `LanguagePickerModal` (`app/components/LanguagePickerModal.tsx`)

언어 선택 바텀시트 모달. 15개 언어 목록 + 슬라이드 애니메이션 내장.

```tsx
import { LanguagePickerModal } from "@/components/LanguagePickerModal"
import { LanguageKey } from "@/constants/languages"

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

### `LanguageKey` / `LANGUAGES` (`app/constants/languages.ts`)

15개 언어 공유 상수. 번역 화면에서 직접 선언하지 말고 여기서 import.

### `menuScreenStyles` (`app/screens/shared/menuScreenStyles.ts`)

네이비 헤더 + 흰 카드 메뉴 항목 구조 화면(SafeHealth, WorkerParticipation 등)의 공유 스타일.

```ts
import * as S from "@/screens/shared/menuScreenStyles"
// S.$screenContainer, S.$headerContainer, S.$headerTitle
// S.$contentContainer, S.$menuCard, S.$menuItemContainer
// S.$menuTitle, S.$menuDescription, S.$menuChevron, S.$menuDivider
```

### `colors` (`app/theme/colors.ts`)

화면 파일에 `const NAVY`, `const BLUE`를 직접 선언하지 않는다.

```ts
import { colors } from "@/theme/colors"
// colors.navy (#0B3069), colors.blue (#1062D8), colors.screenBg (#F9FAFE)
```

---

## 새 화면 추가 절차

1. `app/screens/새화면.tsx` 생성
2. `app/navigators/navigationTypes.ts`의 `AppStackParamList`에 라우트 추가
3. `AppNavigator.tsx` 또는 `MainNavigator.tsx`에 `<Stack.Screen>` 추가
4. 진입 화면에서 `navigation.navigate("새화면")` 호출

---

## i18n 규칙

**절대 규칙: 사용자 노출 텍스트 하드코딩 금지.** 텍스트 추가 시 `en.ts` → `ko.ts` → `translate()` 순서로 작업.

**키 패턴**: `screenName:section.element` (최상위 구분자 `:`, 이하 `.`)

**모듈 레벨 배열에서 translate 사용 금지** — i18n 미초기화 시점에 실행되므로 `useMemo` 내부로 이동:

```ts
// ✅
const ITEMS = useMemo(() => [{ label: translate("key:item1") }], [])
```

`translate()` 함수를 기본으로 사용하고, 복잡한 다국어 로직에만 `useTranslation()` 훅을 사용.

---

## 브랜치 / 커밋 규칙

브랜치: `feat/{기능}`, `fix/{버그}` → `main` 병합 시 `--no-ff`, 커밋 메시지 `merge: {브랜치} → main`

커밋 접두어: `feat` / `fix` / `style` / `refactor` / `chore`

---

## 개발 명령어

```bash
npm run compile    # 타입 검사
npm run lint:check # 린트
npm test           # 테스트
```
