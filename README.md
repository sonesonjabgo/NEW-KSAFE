# K-SAFEONE

현장을 이해하는 통합 안전 파트너 — 건설/산업 현장의 안전 관리를 위한 React Native 모바일 앱입니다.

## 프로젝트 개요

KS산업안전협회가 운영하는 안전 관리 플랫폼으로, **관리자**와 **근로자** 두 역할에 맞는 기능을 제공합니다. 1:1 통역, AI 안전 챗봇, TBM(Tool Box Meeting) 관리, 교육 발표, 순회점검 등 현장 안전 업무 전반을 모바일에서 처리할 수 있도록 설계되었습니다.

**기술 스택**

| 분류 | 기술 |
|---|---|
| 프레임워크 | React Native 0.83.6 + Expo SDK 55 |
| 보일러플레이트 | Ignite 11.5.0 (Infinite Red) |
| 스타일링 | NativeWind 4.x (Tailwind CSS for RN) + StyleSheet |
| UI 컴포넌트 | Gluestack UI v2 |
| 네비게이션 | React Navigation 7.x (Native Stack) |
| 폰트 | Pretendard |
| 다국어 | i18next + react-i18next |
| 스토리지 | react-native-mmkv |
| HTTP | apisauce |
| 디버깅 | Reactotron |
| 언어 | TypeScript 5.9 |

---

## 프로젝트 구조

```
NEW-KSAFE/
├── app/
│   ├── app.tsx                  # 앱 진입점, Provider 설정
│   ├── components/              # 공용 컴포넌트 (Ignite 기본 제공)
│   │   ├── Icon.tsx             # 아이콘 컴포넌트
│   │   ├── Screen.tsx           # 화면 래퍼 (SafeArea, KeyboardAvoid)
│   │   ├── Text.tsx             # 타이포그래피 컴포넌트
│   │   └── ui/                  # Gluestack UI 래퍼 컴포넌트
│   │       ├── button/
│   │       ├── gluestack-ui-provider/  # 테마 Provider
│   │       ├── input/
│   │       └── vstack/
│   ├── config/                  # 환경별 설정 (dev/prod)
│   ├── context/                 # React Context (Auth 등)
│   ├── i18n/                    # 다국어 번역 파일
│   ├── navigators/
│   │   ├── AppNavigator.tsx     # 메인 스택 네비게이터
│   │   └── navigationTypes.ts   # 라우트 타입 정의
│   ├── screens/
│   │   ├── LoginScreen.tsx      # 로그인 화면
│   │   ├── HomeScreen.tsx       # 홈 화면 (역할 기반)
│   │   ├── WelcomeScreen.tsx    # (Ignite 기본, 미사용)
│   │   └── ErrorScreen/         # 전역 에러 경계
│   ├── services/api/            # API 클라이언트 (apisauce)
│   ├── theme/                   # 색상, 간격, 폰트 토큰
│   └── utils/                   # 유틸리티 함수
├── assets/
│   ├── icons/
│   │   ├── home/                # 홈 그리드 기능 아이콘 (9개)
│   │   └── nav/                 # 헤더/바텀 네비게이션 아이콘
│   └── logo-ksafeone.png        # 앱 로고
├── babel.config.js
├── tailwind.config.js
├── tsconfig.json
└── package.json
```

---

## 화면 목록

| 화면 | 파일 경로 | 라우트명 | 설명 |
|---|---|---|---|
| 로그인 | `app/screens/LoginScreen.tsx` | `Login` | 이메일/비밀번호 입력, 로그인 버튼으로 홈 이동 |
| 홈 | `app/screens/HomeScreen.tsx` | `Home` | 역할별 기능 그리드, 안전게시판, 바텀 네비게이션 |

### 홈 화면 구성 요소

- **헤더**: K-SAFEONE 로고, QR스캔/알림/언어 액션 버튼
- **기능 그리드 (3열)**:
  - 관리자: 1:1통역, AI안전챗봇, 다국어번역, 교육/발표, 교육/발표참여, TBM참여, 순회점검, TBM조회/생성, TBM보고서 (9개)
  - 근로자: 위 중 6개 + 유해위험개소, 제도개선 제안 (8개)
- **교육 배너**: 기존 교육/발표 참여 안내 (근로자 전용, 조건부 표시)
- **안전게시판**: 탭 필터(관리자만), 게시물 목록
- **바텀 네비게이션**: 홈 / 안전게시판 / 안전관리 / 근로자참여(관리자) or 마이페이지(근로자)

---

## 네비게이션 구조

```
AppNavigator (NativeStack)
├── Login  →  LoginScreen
└── Home   →  HomeScreen
```

> 현재 인증 로직은 미구현 상태로, 로그인 버튼 클릭 시 바로 Home으로 이동합니다.
> `AppNavigator.tsx`에 `isAuthenticated` 기반 조건 분기 코드가 주석 처리되어 있습니다.

---

## 설치 및 실행

```bash
# 1. 저장소 클론
git clone https://github.com/sonesonjabgo/NEW-KSAFE.git
cd NEW-KSAFE

# 2. 의존성 설치
npm install

# 3. iOS (시뮬레이터)
npm run ios

# 4. Android (에뮬레이터)
npm run android

# 5. 개발 서버만 실행
npm start

# 타입 검사
npm run compile
```

> **사전 요구사항**: Node.js 20+, Xcode (iOS), Android Studio (Android), Expo Dev Client

---

## 주요 라이브러리

| 라이브러리 | 버전 | 용도 |
|---|---|---|
| `expo` | ~55.0.23 | React Native 플랫폼 |
| `react-native` | 0.83.6 | 모바일 앱 프레임워크 |
| `nativewind` | ^4.2.3 | Tailwind CSS 스타일링 |
| `@gluestack-ui/*` | 1.x | UI 컴포넌트 라이브러리 |
| `@react-navigation/native-stack` | ^7.2.0 | 화면 네비게이션 |
| `@react-navigation/bottom-tabs` | ^7.2.0 | 바텀 탭 네비게이션 |
| `react-native-mmkv` | 3.3.3 | 로컬 스토리지 |
| `apisauce` | 3.1.1 | HTTP 클라이언트 |
| `i18next` | ^23.14.0 | 다국어 처리 |
| `lucide-react-native` | ^1.14.0 | 아이콘 |
| `tailwindcss` | ^3.4.1 | CSS 유틸리티 |

---

## 이번 병합 작업 요약 (2026-05-13)

| 브랜치 | 작업 내용 |
|---|---|
| `feat/login-screen` | 로그인 화면 UI 구현 (로고, 이메일/비밀번호 입력, 로그인 버튼, Gluestack UI 컴포넌트 추가) |
| `feat/home-screen-ui` | 홈 화면 UI 구현 (역할 기반 기능 그리드, 안전게시판, 바텀 네비게이션, 각종 아이콘 에셋 추가) |

병합 후 `gluestack-ui-provider`의 TypeScript 타입 오류(`ColorSchemeName` 미처리 케이스) 수정 완료.
