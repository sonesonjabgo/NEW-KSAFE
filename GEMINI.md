# AGENT_GUIDE — K-SAFEONE

> **이 문서의 목적**: AI 코딩 에이전트(Cursor, Claude Code 등)가 K-SAFEONE 프로젝트의 코드를 정확하고 일관되게 생성·수정하도록 돕는 프로젝트 규칙서이다.

---

## 1. 너의 역할 (Role)

너는 **KS산업안전협회 현장 안전 관리 모바일 앱**의 React Native 시니어 개발자이다. Ignite 11.5.0 보일러플레이트 위에서 작업하며, 아래 규칙을 반드시 따른다.

**현재 작업**: 디자인 리뉴얼(NEW-KSAFE)이 완료된 상태에서, 기존 프로젝트(K-SAFEONE-RN-FRONTEND)의 API 연동 및 비즈니스 로직을 새 디자인으로 이식한다. 새 UI·컴포넌트 구조는 건드리지 않는다.

---

## 2. 프로젝트 개요 (Context)

- **앱 이름**: K-SAFEONE
- **대상 사용자**: 관리자 / 근로자 (두 역할)
- **주요 기능**: 1:1 통역, AI 챗봇, TBM 관리, 순회점검, 안전게시판, 위험성 평가, 교육 자료, 개선 제안
- **현재 상태**: UI 퍼블리싱 완료. 대부분의 화면은 `mockData.ts`와 하드코딩 데이터로 동작 중. 기존 K-SAFEONE-RN-FRONTEND 프로젝트에서 API 연동 및 비즈니스 로직을 이식하는 단계.
- **무시할 파일**: `app/screens/Demo*`, `app/navigators/DemoNavigator.tsx`는 Ignite 잔존 파일이며 참고하지 않는다.

---

## 3. 디렉토리 구조 (Structure)

```
app/
├── components/           # 공용 컴포넌트 (StackScreen, ConfirmModal, Toast 등)
│   ├── ui/               # Gluestack UI 기반 기본 컴포넌트
│   └── MyPage/           # MyPage 전용 하위 컴포넌트
├── constants/            # 공유 상수 (languages.ts 등)
├── context/              # React Context (AuthContext, RoleContext 등)
├── i18n/                 # 다국어 번역 파일 (en.ts, ko.ts, ar.ts, es.ts, fr.ts, hi.ts, ja.ts)
├── navigators/           # AppNavigator, MainNavigator + 타입 정의
├── screens/              # 화면 컴포넌트 (폴더 단위 구성)
│   ├── ScreenName/
│   │   ├── ScreenName.tsx   # 화면 컴포넌트
│   │   ├── styles.ts        # 스타일
│   │   ├── types.ts         # 타입 정의
│   │   ├── mockData.ts      # mock 데이터 (기능 이식 후 제거 대상)
│   │   ├── components/      # 화면 전용 하위 컴포넌트
│   │   └── index.ts         # (선택) 재익스포트
│   └── shared/              # 화면 간 공유 스타일 (menuScreenStyles.ts)
├── services/api/         # apisauce 기반 API 레이어
└── theme/                # colors, typography, spacing 토큰
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

모든 탭 전환과 화면 전환 UI는 `app/navigators/` 내 네비게이터 파일에서만 관리한다.

### 4-4. 색상 상수를 파일에 직접 선언 금지

```
❌ 나쁜 예:
const NAVY = "#0B3069"

✅ 좋은 예:
import { colors } from "@/theme/colors"
// colors.navy, colors.blue, colors.screenBg, colors.danger 등
```

주요 색상 토큰: `colors.navy` (#0B3069), `colors.blue` (#1062D8), `colors.screenBg` (#F9FAFE), `colors.danger` (#E03526)

### 4-5. 기능 이식 시 새 UI 구조를 절대 변경하지 않음

기존 K-SAFEONE-RN-FRONTEND에서 로직을 가져올 때 **스타일·컴포넌트 트리·레이아웃은 그대로 유지**한다. 변경 대상은 상태 관리·API 호출·이벤트 핸들러 등 로직만이다.

---

## 5. 반드시 재사용할 공통 컴포넌트

### 5-1. StackScreen

**파일**: `app/components/StackScreen.tsx`

네이비 헤더 + SafeArea + 라운드 콘텐츠 영역을 제공하는 스택 화면 레이아웃 래퍼.

```tsx
import { StackScreen } from "@/components/StackScreen"

<StackScreen
  title={translate("myScreen:title")}
  onBack={() => navigation.goBack()}
  contentBg="#FFFFFF"        // 기본값: colors.screenBg
  squareTop={false}          // true이면 상단 라운드 제거
  rightSlot={<TouchableOpacity onPress={...}><SomeIcon /></TouchableOpacity>}
>
  {/* 화면 콘텐츠 */}
</StackScreen>
```

- `rightSlot` 미제공 시 빈 뷰가 자동 삽입(균형 유지).
- 화면 위에 올라오는 Modal은 `StackScreen` 바깥 Fragment `<>` 안에 배치한다.

### 5-2. ConfirmModal

**파일**: `app/components/ConfirmModal.tsx`

확인/취소 다이얼로그. 삭제·제출·경고 등 확인이 필요한 모든 액션에 사용한다.

### 5-3. Toast

**파일**: `app/components/Toast.tsx`

성공·실패·정보 메시지 표시용 토스트 컴포넌트.

### 5-4. LanguagePickerModal

**파일**: `app/components/LanguagePickerModal.tsx`

15개 언어 목록 + 슬라이드 애니메이션 바텀시트 모달.

```tsx
import { LanguagePickerModal } from "@/components/LanguagePickerModal"
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

### 5-5. LanguageKey / LANGUAGES

**파일**: `app/constants/languages.ts`

15개 언어 공유 상수. 언어 목록을 직접 선언하지 않고 여기서 import 한다.

---

## 6. 스타일링 규칙

새 화면(폴더 구조)은 `styles.ts` 파일을 별도로 두고 `import * as S from "./styles"` 패턴을 사용한다. 파일 내 인라인 스타일 상수 선언(`$style: ViewStyle`) 방식은 구형 화면(LoginScreen, HomeScreen 등)에만 남아 있다.

```ts
// styles.ts — 새 화면 표준 패턴
import { ViewStyle, TextStyle } from "react-native"
import { colors } from "@/theme/colors"
import { typography } from "@/theme/typography"

export const $container: ViewStyle = { ... }
export const $title: TextStyle = { ... }
```

**폰트**: Pretendard 전역 설정. `typography.primary.bold / semiBold / medium / normal`로 접근한다.

---

## 7. 기능 이식 원칙

기존 K-SAFEONE-RN-FRONTEND에서 로직을 가져올 때 아래 절차를 따른다.

1. **mock 데이터 파악**: 해당 화면의 `mockData.ts`를 확인해 데이터 형태를 파악한다.
2. **API 연동 로직 이식**: 기존 프로젝트의 API 호출·응답 처리 코드를 `services/api/`에 추가하고 화면에서 호출한다.
3. **타입 일치 확인**: `types.ts`의 인터페이스가 API 응답과 일치하는지 확인한다. 불일치 시 types.ts를 수정한다.
4. **mock 제거**: API 연동 완료 후 해당 화면의 `mockData.ts` import와 파일을 제거한다.
5. **UI 불변 원칙**: 위 과정에서 스타일·컴포넌트 구조는 변경하지 않는다.

---

## 8. 네비게이션 구조

Native Stack 안에 Bottom Tab이 중첩된 구조이다.

- **AppNavigator** (`app/navigators/AppNavigator.tsx`): 최상위 스택. 초기 라우트는 `WelcomeIntro`. 탭이 사라져야 하는 화면(상세, 폼 등)은 여기에 등록되어 있다.
- **MainNavigator** (`app/navigators/MainNavigator.tsx`): 하단 탭 4종 — Home, SafeBoard, SafeHealthMain, WorkerParticipation.
- **타입 정의** (`app/navigators/navigationTypes.ts`): `AppStackParamList`, `MainTabParamList`. 라우트 파라미터 변경 시 여기를 먼저 수정한다.

---

## 9. 상태 관리

React Context API만 사용한다. 새 전역 상태가 필요하면 `app/context/`에 Context를 추가한다. MobX, Redux, Zustand 등 외부 상태 관리 라이브러리를 도입하지 않는다.

현재 Context: `AuthContext` (인증 토큰), `RoleContext` (관리자/근로자 역할), `EpisodeContext`

---

## 10. 브랜치 / 커밋 규칙

- **브랜치 네이밍**: `feat/{기능}`, `fix/{버그}`
- **병합**: `main`에 `--no-ff` 방식, 커밋 메시지 `merge: {브랜치} → main`
- **커밋 접두어**: `feat` / `fix` / `style` / `refactor` / `chore`
- **작업 시작 전 커밋**: 새 지시를 받아 작업을 시작하기 전, `git status`로 미커밋 변경사항이 있는지 확인한다. 변경사항이 있으면 해당 내용을 먼저 커밋한 뒤 새 작업을 진행한다.
- **커밋 단위**: 논리적으로 완결된 시점(기능 이식 완료, 화면 API 연동 완료 등)에 묶어서 커밋한다. 세부 수정이 연속될 때는 매 요청마다 커밋하지 않는다.

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

코드를 작성하기 전에 아래를 스스로 점검한다.

- [ ] 하드코딩된 한국어/영어 텍스트가 있는가? → `translate()` 사용
- [ ] 색상을 `#0B3069` 같은 리터럴로 썼는가? → `colors.*` 토큰 사용
- [ ] `StackScreen` 없이 헤더를 직접 만들었는가? → `StackScreen` 래핑
- [ ] 언어 목록을 직접 배열로 선언했는가? → `LANGUAGES` import
- [ ] 모듈 최상위에서 `translate()`를 호출했는가? → `useMemo` 내부로 이동
- [ ] 기능 이식 중 UI 구조(스타일/컴포넌트 트리)를 변경했는가? → 로직만 이식
- [ ] API 연동 후 `mockData.ts` import가 남아 있는가? → 제거
- [ ] 새 전역 상태를 컴포넌트 내부에 만들었는가? → `app/context/`에 Context 추가
