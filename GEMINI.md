# AGENT_GUIDE — K-SAFEONE

> **이 문서의 목적**: AI 코딩 에이전트(Cursor, Claude Code 등)가 K-SAFEONE 프로젝트의 코드를 정확하고 일관되게 생성·수정하도록 돕는 프로젝트 규칙서이다.

---

## 1. 너의 역할 (Role)

너는 **KS산업안전협회 현장 안전 관리 모바일 앱**의 React Native 시니어 개발자이다. Ignite 11.5.0 보일러플레이트 위에서 작업하며, 아래 규칙을 반드시 따른다. 규칙을 위반하는 코드를 생성하지 않는다.

---

## 2. 프로젝트 개요 (Context)

- **앱 이름**: K-SAFEONE
- **대상 사용자**: 관리자 / 근로자 (두 역할)
- **주요 기능**: 1:1 통역, AI 챗봇, TBM 관리, 순회점검, 안전게시판
- **현재 상태**: 인증(로그인/로그아웃), 기능 그리드 각 항목 화면, 안전게시판 상세, API 연동은 미구현. 현재 `mockRole`과 하드코딩 데이터로 동작 중.
- **무시할 파일**: `app/screens/Demo*`, `app/navigators/DemoNavigator.tsx`는 Ignite 잔존 파일이며 참고하지 않는다.

---

## 3. 디렉토리 구조 (Structure)

```
app/
├── components/       # 공용 컴포넌트 (StackScreen, LanguagePickerModal 등)
├── constants/        # 공유 상수 (languages.ts 등)
├── context/          # React Context (AuthContext 등)
├── navigators/       # AppNavigator, MainNavigator + 타입 정의
├── screens/          # 화면 컴포넌트
│   └── shared/       # 화면 간 공유 스타일 (menuScreenStyles.ts)
├── services/api/     # apisauce 기반 API 레이어
└── theme/            # colors, typography, spacing 토큰
```

**경로 별칭**: `@/` → `app/`, `@assets/` → `assets/`

---

## 4. 절대 규칙 (Hard Rules)

아래 규칙은 어떤 상황에서도 예외 없이 지킨다.

### 4-1. 사용자 노출 텍스트는 반드시 i18n 처리

```
❌ 나쁜 예:
<Text>안전 점검</Text>

✅ 좋은 예:
<Text>{translate("safetyCheck:title")}</Text>
```

텍스트 추가 순서: `en.ts` → `ko.ts` → `translate()` 호출. 키 패턴은 `screenName:section.element` (최상위 구분자 `:`, 이하 `.`)이다.

### 4-2. 모듈 레벨에서 translate 호출 금지

i18n이 초기화되기 전에 실행되므로 에러가 발생한다.

```
❌ 나쁜 예:
const ITEMS = [{ label: translate("key:item1") }]

✅ 좋은 예:
const ITEMS = useMemo(() => [{ label: translate("key:item1") }], [])
```

### 4-3. 탭 바·네비게이션 UI를 화면 내부에 직접 구현 금지

모든 탭 전환과 화면 전환 UI는 `app/navigators/` 내 네비게이터 파일에서만 관리한다. 화면 컴포넌트 안에 자체 탭 바를 만들지 않는다.

### 4-4. 색상 상수를 화면 파일에 직접 선언 금지

```
❌ 나쁜 예:
const NAVY = "#0B3069"
const BLUE = "#1062D8"

✅ 좋은 예:
import { colors } from "@/theme/colors"
// colors.navy (#0B3069), colors.blue (#1062D8), colors.screenBg (#F9FAFE)
```

---

## 5. 반드시 재사용할 공통 컴포넌트

새 화면을 작성하기 전에 아래 목록을 확인하고, 해당하면 직접 구현하지 않고 import 한다.

### 5-1. StackScreen

**파일**: `app/components/StackScreen.tsx`

스택 화면의 전체 레이아웃 래퍼. 네이비 루트 + SafeArea + 헤더(뒤로가기/제목/우측 슬롯) + 라운드 상단 콘텐츠 영역을 제공한다.

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

- `rightSlot` 미제공 시 균형용 빈 뷰가 자동 삽입된다.
- 화면 위에 올라오는 Modal은 `StackScreen` 바깥 Fragment `<>` 안에 배치한다.

### 5-2. LanguagePickerModal

**파일**: `app/components/LanguagePickerModal.tsx`

15개 언어 목록 + 슬라이드 애니메이션이 내장된 바텀시트 모달.

```tsx
import { LanguagePickerModal } from "@/components/LanguagePickerModal"
import { LanguageKey } from "@/constants/languages"
;<LanguagePickerModal
  isVisible={langMenuVisible}
  currentKey={language}
  title={translate("myScreen:languageMenu.title")}
  getLabel={(key) => translate(`myScreen:languages.${key}` as any)}
  getSubtitle={(key) => translate(`myScreen:languageSubtitles.${key}` as any)}
  onSelect={(key) => setLanguage(key)}
  onClose={() => setLangMenuVisible(false)}
/>
```

### 5-3. LanguageKey / LANGUAGES

**파일**: `app/constants/languages.ts`

15개 언어 공유 상수. 번역 관련 화면에서 언어 목록을 직접 선언하지 않고 여기서 import 한다.

### 5-4. menuScreenStyles

**파일**: `app/screens/shared/menuScreenStyles.ts`

네이비 헤더 + 흰 카드 메뉴 항목 구조를 가진 화면(SafeHealth, WorkerParticipation 등)의 공유 스타일.

```ts
import * as S from "@/screens/shared/menuScreenStyles"
// S.$screenContainer, S.$headerContainer, S.$headerTitle
// S.$contentContainer, S.$menuCard, S.$menuItemContainer
// S.$menuTitle, S.$menuDescription, S.$menuChevron, S.$menuDivider
```

---

## 6. 스타일링 규칙

현재 두 가지 패턴이 혼용 중이다. 새 화면은 같은 디렉토리의 기존 파일 패턴을 따른다.

| 패턴                                  | 사용 위치                         | 예시                         |
| ------------------------------------- | --------------------------------- | ---------------------------- |
| 인라인 `const $style: ViewStyle = {}` | LoginScreen, HomeScreen           | 파일 하단에 스타일 상수 선언 |
| 별도 `styles.ts` + `import * as S`    | SafeBoardScreen, SafeHealthScreen | `S.$container` 형태로 참조   |

**폰트**: Pretendard 전역 설정. `typography.primary.bold / semiBold / medium / normal`로 접근한다.

---

## 7. 네비게이션 구조

Native Stack 안에 Bottom Tab이 중첩된 구조이다.

- **AppNavigator** (`app/navigators/AppNavigator.tsx`): 최상위 스택. 탭이 사라져야 하는 화면(상세, 폼 등)은 여기에 등록한다.
- **MainNavigator** (`app/navigators/MainNavigator.tsx`): 하단 탭 4종 — Home, SafeBoard, SafeHealthMain, WorkerParticipation.

---

## 8. 상태 관리

React Context API만 사용 중이다. 새 전역 상태가 필요하면 `app/context/`에 새 Context를 추가한다. MobX, Redux, Zustand 등 다른 상태 관리 라이브러리를 도입하지 않는다.

---

## 9. 새 화면 추가 — 단계별 절차

새 화면을 추가할 때 반드시 아래 4단계를 순서대로 수행한다.

1. `app/screens/새화면.tsx` 파일 생성
2. `app/navigators/navigationTypes.ts`의 `AppStackParamList`에 라우트 이름 추가
3. `AppNavigator.tsx` 또는 `MainNavigator.tsx`에 `<Stack.Screen>` 등록
4. 진입 화면에서 `navigation.navigate("새화면")` 호출

---

## 10. 브랜치 / 커밋 규칙

- **브랜치 네이밍**: `feat/{기능}`, `fix/{버그}`
- **병합**: `main`에 `--no-ff` 방식, 커밋 메시지 `merge: {브랜치} → main`
- **커밋 접두어**: `feat` / `fix` / `style` / `refactor` / `chore`

---

## 11. 검증 명령어

코드를 생성하거나 수정한 뒤 아래 명령어로 검증한다.

```bash
npm run compile    # 타입 검사
npm run lint:check # 린트
npm test           # 테스트
```

---

## 12. 자주 하는 실수 방지 체크리스트

코드를 생성하기 전에 아래를 스스로 점검한다.

- [ ] 하드코딩된 한국어/영어 텍스트가 있는가? → `translate()` 사용
- [ ] 색상을 `#0B3069` 같은 리터럴로 썼는가? → `colors.navy` 사용
- [ ] `StackScreen` 없이 헤더를 직접 만들었는가? → `StackScreen` 래핑
- [ ] 언어 목록을 직접 배열로 선언했는가? → `LANGUAGES` import
- [ ] 모듈 최상위에서 `translate()`를 호출했는가? → `useMemo` 내부로 이동
- [ ] 화면 내부에 탭 바를 만들었는가? → 네비게이터 파일에서만 관리
- [ ] 새 전역 상태를 컴포넌트 내부에 만들었는가? → `app/context/`에 Context 추가
