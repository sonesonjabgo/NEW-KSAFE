import demoKo from "./demo-ko"
import { Translations } from "./en"

const ko: Translations = {
  common: {
    ok: "확인!",
    cancel: "취소",
    back: "뒤로",
    logOut: "로그아웃",
  },
  welcomeScreen: {
    postscript:
      "잠깐! — 지금 보시는 것은 아마도 당신의 앱의 모양새가 아닐겁니다. (디자이너분이 이렇게 건내주셨다면 모를까요. 만약에 그렇다면, 이대로 가져갑시다!) ",
    readyForLaunch: "출시 준비가 거의 끝난 나만의 앱!",
    exciting: "(오, 이거 신나는데요!)",
    letsGo: "가보자구요!",
  },
  errorScreen: {
    title: "뭔가 잘못되었습니다!",
    friendlySubtitle:
      "이 화면은 오류가 발생할 때 프로덕션에서 사용자에게 표시됩니다. 이 메시지를 커스터마이징 할 수 있고(해당 파일은 `app/i18n/ko.ts` 에 있습니다) 레이아웃도 마찬가지로 수정할 수 있습니다(`app/screens/error`). 만약 이 오류화면을 완전히 없에버리고 싶다면 `app/app.tsx` 파일에서 <ErrorBoundary> 컴포넌트를 확인하기 바랍니다.",
    reset: "초기화",
    traceTitle: "%{name} 스택에서의 오류",
  },
  emptyStateComponent: {
    generic: {
      heading: "너무 텅 비어서.. 너무 슬퍼요..",
      content: "데이터가 없습니다. 버튼을 눌러서 리프레쉬 하시거나 앱을 리로드하세요.",
      button: "다시 시도해봅시다",
    },
  },

  errors: {
    invalidEmail: "잘못된 이메일 주소 입니다.",
  },
  loginScreen: {
    logIn: "로그인",
    tagline: "현장을 이해하는 통합 안전 파트너",
    enterDetails:
      "일급비밀 정보를 해제하기 위해 상세 정보를 입력하세요. 무엇이 기다리고 있는지 절대 모를겁니다. 혹은 알 수 있을지도 모르겠군요. 엄청 복잡한 뭔가는 아닙니다.",
    emailFieldLabel: "이메일",
    passwordFieldLabel: "비밀번호",
    emailFieldPlaceholder: "이메일을 입력하세요",
    passwordFieldPlaceholder: "비밀번호를 입력하세요",
    tapToLogIn: "눌러서 로그인 하기!",
    hint: "힌트: 가장 좋아하는 암호와 아무란 아무 이메일 주소나 사용할 수 있어요 :)",
    forgotPassword: "비밀번호를 잊으셨나요?",
  },
  demoNavigator: {
    componentsTab: "컴포넌트",
    debugTab: "디버그",
    communityTab: "커뮤니티",
    podcastListTab: "팟캐스트",
  },
  demoCommunityScreen: {
    title: "커뮤니티와 함께해요",
    tagLine:
      "전문적인 React Native 엔지니어들로 구성된 Infinite Red 커뮤니티에 접속해서 함께 개발 실력을 향상시켜 보세요!",
    joinUsOnSlackTitle: "Slack 에 참여하세요",
    joinUsOnSlack:
      "전 세계 React Native 엔지니어들과 함께할 수 있는 곳이 있었으면 좋겠죠? Infinite Red Community Slack 에서 대화에 참여하세요! 우리의 성장하는 커뮤니티는 질문을 던지고, 다른 사람들로부터 배우고, 네트워크를 확장할 수 있는 안전한 공간입니다. ",
    joinSlackLink: "Slack 에 참여하기",
    makeIgniteEvenBetterTitle: "Ignite 을 향상시켜요",
    makeIgniteEvenBetter:
      "Ignite 을 더 좋게 만들 아이디어가 있나요? 기쁜 소식이네요. 우리는 항상 최고의 React Native 도구를 구축하는데 도움을 줄 수 있는 분들을 찾고 있습니다. GitHub 에서 Ignite 의 미래를 만들어 가는것에 함께해 주세요.",
    contributeToIgniteLink: "Ignite 에 기여하기",
    theLatestInReactNativeTitle: "React Native 의 최신정보",
    theLatestInReactNative: "React Native 가 제공하는 모든 최신 정보를 알려드립니다.",
    reactNativeRadioLink: "React Native 라디오",
    reactNativeNewsletterLink: "React Native 뉴스레터",
    reactNativeLiveLink: "React Native 라이브 스트리밍",
    chainReactConferenceLink: "Chain React 컨퍼런스",
    hireUsTitle: "다음 프로젝트에 Infinite Red 를 고용하세요",
    hireUs:
      "프로젝트 전체를 수행하든, 실무 교육을 통해 팀의 개발 속도에 박차를 가하든 상관없이, Infinite Red 는 React Native 프로젝트의 모든 분야의 에서 도움을 드릴 수 있습니다.",
    hireUsLink: "메세지 보내기",
  },
  demoShowroomScreen: {
    jumpStart: "프로젝트를 바로 시작할 수 있는 컴포넌트들!",
    lorem2Sentences:
      "별 하나에 추억과, 별 하나에 사랑과, 별 하나에 쓸쓸함과, 별 하나에 동경(憧憬)과, 별 하나에 시와, 별 하나에 어머니, 어머니",
    demoHeaderTxExample: "야호",
    demoViaTxProp: "`tx` Prop 을 통해",
    demoViaSpecifiedTxProp: "`{{prop}}Tx` Prop 을 통해",
  },
  demoDebugScreen: {
    howTo: "사용방법",
    title: "디버그",
    tagLine:
      "축하합니다. 여기 아주 고급스러운 React Native 앱 템플릿이 있습니다. 이 보일러 플레이트를 사용해보세요!",
    reactotron: "Reactotron 으로 보내기",
    reportBugs: "버그 보고하기",
    demoList: "데모 목록",
    demoPodcastList: "데모 팟캐스트 목록",
    androidReactotronHint:
      "만약에 동작하지 않는 경우, Reactotron 데스크탑 앱이 실행중인지 확인 후, 터미널에서 adb reverse tcp:9090 tcp:9090 을 실행한 다음 앱을 다시 실행해보세요.",
    iosReactotronHint:
      "만약에 동작하지 않는 경우, Reactotron 데스크탑 앱이 실행중인지 확인 후 앱을 다시 실행해보세요.",
    macosReactotronHint:
      "만약에 동작하지 않는 경우, Reactotron 데스크탑 앱이 실행중인지 확인 후 앱을 다시 실행해보세요.",
    webReactotronHint:
      "만약에 동작하지 않는 경우, Reactotron 데스크탑 앱이 실행중인지 확인 후 앱을 다시 실행해보세요.",
    windowsReactotronHint:
      "만약에 동작하지 않는 경우, Reactotron 데스크탑 앱이 실행중인지 확인 후 앱을 다시 실행해보세요.",
  },
  demoPodcastListScreen: {
    title: "React Native 라디오 에피소드",
    onlyFavorites: "즐겨찾기만 보기",
    favoriteButton: "즐겨찾기",
    unfavoriteButton: "즐겨찾기 해제",
    accessibility: {
      cardHint:
        "에피소드를 들으려면 두 번 탭하세요. 이 에피소드를 좋아하거나 싫어하려면 두 번 탭하고 길게 누르세요.",
      switch: "즐겨찾기를 사용하려면 스위치를 사용하세요.",
      favoriteAction: "즐겨찾기 토글",
      favoriteIcon: "좋아하는 에피소드",
      unfavoriteIcon: "즐겨찾기하지 않은 에피소드",
      publishLabel: "{{date}} 에 발행됨",
      durationLabel: "소요시간: {{hours}}시간 {{minutes}}분 {{seconds}}초",
    },
    noFavoritesEmptyState: {
      heading: "조금 텅 비어 있네요.",
      content: "즐겨찾기가 없습니다. 에피소드에 있는 하트를 눌러서 즐겨찾기에 추가하세요.",
    },
  },

  homeScreen: {
    orgName: "KS산업안전협회",
    header: {
      qrScan: "QR스캔",
      notification: "알림",
      language: "언어",
    },
    greeting: {
      message: "오늘도 안전한 하루 되세요!",
      name: "{{name}}님,",
    },
    role: {
      admin: "관리자",
      worker: "근로자",
    },
    devToggle: {
      eduBanner: "교육배너",
    },
    board: {
      title: "안전게시판",
      viewMore: "더보기",
      tabs: {
        all: "전체",
        company: "회사전체",
        workplace: "사업장",
      },
    },
    edu: {
      title: "기존 교육/발표 참여",
      description: "이미 생성된 교육/발표실이 있습니다.",
    },
    banner: {
      text: "K-SAFEONE과 함께하는 안전한 작업환경",
    },
    footer: {
      homepage: "홈페이지",
      privacy: "개인정보처리방침",
      terms: "이용약관",
    },
    grid: {
      interpret: { label: "1:1 통역", sub: "실시간 통역 지원" },
      chatbot: { label: "AI 안전 챗봇", sub: "안전 상담/질의응답" },
      translate: { label: "다국어 번역", sub: "언어 번역 지원" },
      education: { label: "교육/발표", sub: "교육 자료 발표" },
      eduJoin: { label: "교육/발표 참여", sub: "교육/발표 참여" },
      tbmJoin: { label: "TBM 참여", sub: "안전점검 회의 참여" },
      patrol: { label: "순회점검", sub: "순회점검 진행/기록" },
      tbmCreate: { label: "TBM 조회/생성", sub: "TBM 조회/생성" },
      tbmReport: { label: "TBM 보고서", sub: "TBM 보고서 조회" },
      hazard: { label: "유해위험개소", sub: "유해위험개소 조회" },
      suggestion: { label: "제도개선 제안", sub: "제도개선 제안 등록" },
    },
  },

  safeBoardScreen: {
    title: "안전게시판",
    alertButton: "알림 발송",
    workplaceLabel: "선택된 작업장",
    tabs: {
      all: "안전게시판",
      myPosts: "내 게시글",
    },
    empty: "게시물이 없습니다",
    write: "작성하기",
  },

  safeHealthScreen: {
    title: "안전관리",
    menu: {
      patrol: { title: "작업장 순회 점검", description: "작업장 순회 점검 등록" },
      educationMaterial: { title: "교육 자료", description: "교육 자료 조회 및 등록" },
      tbmManage: { title: "TBM 관리/생성", description: "TBM 활동을 관리하고 생성" },
      tbmReport: { title: "TBM 보고서 조회", description: "보고서 상태 확인 및 PDF 다운로드" },
      tbmJoin: { title: "TBM 참여", description: "다른 관리감독자의 안전점검 회의 참여" },
      tbmHistory: { title: "TBM 참여 이력", description: "참여한 TBM 회의 이력 조회" },
      tbmJoinWorker: { title: "TBM 참여", description: "다른 관리감독자의 안전점검 회의 참여" },
      statusView: { title: "현황 조회", description: "진행 중인 TBM 현황 확인" },
    },
  },

  workerParticipationScreen: {
    title: "근로자 참여",
    menu: {
      hazard: { title: "유해위험개소", description: "유해위험개소 등록" },
      suggestion: { title: "제도개선 제안", description: "제도개선 제안 등록" },
    },
  },

  voiceTranslationScreen: {
    title: "음성 대화 번역",
    flipScreen: "돌리기",
    listening: "음성을 듣는 중...",
    speakNow: "말씀해 주세요",
    languageMenu: {
      title: "인식된 언어",
    },
    languages: {
      korean: "한국어",
      english: "English",
      chineseSimplified: "简体中文",
      chineseTraditional: "繁體中文",
      russian: "Русский",
      vietnamese: "Tiếng Việt",
      indonesian: "Bahasa Indonesia",
      khmer: "ភាសាខ្មែរ",
      thai: "ไทย",
      urdu: "اردو",
      nepali: "नेपाली",
      lao: "ພາສາລາວ",
      japanese: "日本語",
      french: "Français",
      spanish: "Español",
    },
    languageSubtitles: {
      korean: "",
      english: "(영어)",
      chineseSimplified: "(중국어(간체))",
      chineseTraditional: "(중국어(번체))",
      russian: "(러시아어)",
      vietnamese: "(베트남어)",
      indonesian: "(인도네시아어)",
      khmer: "(크메르어)",
      thai: "(태국어)",
      urdu: "(우르두어)",
      nepali: "(네팔어)",
      lao: "(라오어)",
      japanese: "(일본어)",
      french: "(프랑스어)",
      spanish: "(스페인어)",
    },
  },

  aiSafetyChatScreen: {
    title: "산업안전AI 도우미",
    aiName: "산업안전AI 도우미",
    welcomeMessage:
      "안녕하세요! 저는 산업안전AI 도우미입니다.\n건설 현장 안전에 관한 질문이 있으시면 언제든지 물어보세요.",
    inputPlaceholder: "메시지를 입력하세요...",
    inputHint: "필수 입력. 2~1,000자 이내로 작성하세요.",
    deleteDialog: {
      title: "대화 삭제",
      message: "모든 대화 내역을 삭제하시겠습니까?",
      confirm: "삭제",
      cancel: "취소",
    },
    suggestedQuestions: {
      q1: "건설 현장 일반 안전규정 설명해줘",
      q2: "고소 작업 시 안전 수칙은?",
      q3: "화재 발생 시 비상 대응 절차는?",
    },
  },

  myPageScreen: {
    title: "마이페이지",
    workplace: {
      label: "광교 타워크레인 작업장",
    },
    permissions: {
      sectionTitle: "앱 권한 설정",
      camera: {
        title: "카메라",
        description: "QR 스캔, AI 번역 촬영, 위험 증적 기록",
        button: "허용",
      },
      microphone: {
        title: "마이크",
        description: "음성번역, 회의 통역, 음성 입력",
        button: "허용",
      },
      photo: {
        title: "사진/라이브러리",
        description: "AI 위험성 평가, 이미지 번역, TBM 교육 자료/일지 작성 등",
        button: "허용",
      },
      notification: {
        title: "푸시 알림",
        description: "TBM 알림, 위험 경보, 사업장 공지",
      },
    },
    logout: "로그아웃",
  },

  languageSettings: {
    title: "언어 설정",
    description: "앱 언어를 바로 변경하세요.",
    changedTitle: "언어 설정",
    changedDescription:
      "언어가 {{language}}(으)로 변경되었습니다.\n변경 사항 적용을 위해 앱을 다시 시작합니다.",
    confirm: "확인",
    languages: {
      ko: "한국어",
      en: "English (영어)",
      zhHans: "简体中文 (중국어(간체))",
      zhHant: "繁體中文 (중국어(번체))",
      ru: "Русский (러시아어)",
      vi: "Tiếng Việt (베트남어)",
      id: "Bahasa Indonesia (인도네시아어)",
      km: "ភាសាខ្មែរ (크메르어)",
      th: "ไทย (태국어)",
      ur: "اردو (우르드어)",
      ne: "नेपाली (네팔어)",
      lo: "ພາສາລາວ (라오어)",
    },
  },

  notify: {
    title: "알림",
    emptyTitle: "알림이 없습니다",
    emptyDescription: "현재 받은 알림이 없습니다.\n새로운 알림이 도착하면 알려드리겠습니다.",
  },

  qrScanner: {
    title: "교육/발표 참여",
    description: "QR 코드를 스캔하거나 발표자가 공유한\n코드를 입력해 회의에 참여하세요.",
    permissionRequired: "QR을 스캔하려면 카메라 권한이 필요합니다.",
    retry: "다시 시도",
    languageLabel: "사용할 언어",
    currentLanguage: "한국어",
    enterCode: "카메라 사용이 어려우신가요? 교육/발표 코드를 직접 입력할 수 있어요.",
    enterCodeDescription: "발표자가 공유한 8자리 숫자 코드를 입력하세요.",
    joinMeeting: "회의 참여하기",
    codePlaceholder: "코드를 입력하세요",
  },

  imageTranslationScreen: {
    title: "이미지 번역",
    selectImage: "번역할 이미지 선택",
    selectImageDesc: "아래 버튼을 눌러 번역할 이미지를 선택하세요.",
    languageLabel: "번역에 사용할 언어 선택",
    languageMenu: {
      title: "언어 선택",
    },
    cameraButton: "카메라로 촬영",
    languages: {
      korean: "한국어",
      english: "English",
      chineseSimplified: "简体中文",
      chineseTraditional: "繁體中文",
      russian: "Русский",
      vietnamese: "Tiếng Việt",
      indonesian: "Bahasa Indonesia",
      khmer: "ភាសាខ្មែរ",
      thai: "ไทย",
      urdu: "اردو",
      nepali: "नेपाली",
      lao: "ພາສາລາວ",
      japanese: "日本語",
      french: "Français",
      spanish: "Español",
    },
    languageSubtitles: {
      korean: "",
      english: "(영어)",
      chineseSimplified: "(중국어(간체))",
      chineseTraditional: "(중국어(번체))",
      russian: "(러시아어)",
      vietnamese: "(베트남어)",
      indonesian: "(인도네시아어)",
      khmer: "(크메르어)",
      thai: "(태국어)",
      urdu: "(우르두어)",
      nepali: "(네팔어)",
      lao: "(라오어)",
      japanese: "(일본어)",
      french: "(프랑스어)",
      spanish: "(스페인어)",
    },
  },

  educationPresentationScreen: {
    title: "교육/발표",
    inviteButton: "초대",
    inputLanguageLabel: "입력 언어",
    languageMenu: { title: "언어 선택" },
    recognizing: "음성 인식 중...",
    statusMicOff: "훈련 메모를 녹음하려면 마이크 권한을 허용해주세요.",
    statusMicOn: "실시간 메시지를 수신하는 중입니다.",
    micOnLabel: "마이크 끄기",
    micOffLabel: "마이크 켜기",
    inputHint: "입력할 메시지를 작성하세요",
    inputPlaceholder: "메시지 입력...",
    validationError: "메시지를 입력해주세요.",
    languages: {
      korean: "한국어",
      english: "English",
      chineseSimplified: "简体中文",
      chineseTraditional: "繁體中文",
      russian: "Русский",
      vietnamese: "Tiếng Việt",
      indonesian: "Bahasa Indonesia",
      khmer: "ភាសាខ្មែរ",
      thai: "ไทย",
      urdu: "اردو",
      nepali: "नेपाली",
      lao: "ພາສາລາວ",
      japanese: "日本語",
      french: "Français",
      spanish: "Español",
    },
    languageSubtitles: {
      korean: "",
      english: "(영어)",
      chineseSimplified: "(중국어(간체))",
      chineseTraditional: "(중국어(번체))",
      russian: "(러시아어)",
      vietnamese: "(베트남어)",
      indonesian: "(인도네시아어)",
      khmer: "(크메르어)",
      thai: "(태국어)",
      urdu: "(우르두어)",
      nepali: "(네팔어)",
      lao: "(라오어)",
      japanese: "(일본어)",
      french: "(프랑스어)",
      spanish: "(스페인어)",
    },
  },

  textTranslationScreen: {
    title: "텍스트 번역",
    fontSizeButton: "AA",
    languageMenu: {
      title: "언어 선택",
    },
    listening: "음성을 듣는 중...",
    inputPlaceholder: "번역할 내용을 입력해주세요",
    inputHint: "최대 1,000자 번역 가능",
    translateButton: "번역",
    validationError: "ⓘ 한 글자 이상 입력해 주세요.",
    speakButton: "말하기",
    languages: {
      korean: "한국어",
      english: "English",
      chineseSimplified: "简体中文",
      chineseTraditional: "繁體中文",
      russian: "Русский",
      vietnamese: "Tiếng Việt",
      indonesian: "Bahasa Indonesia",
      khmer: "ភាសាខ្មែរ",
      thai: "ไทย",
      urdu: "اردو",
      nepali: "नेपाली",
      lao: "ພາສາລາວ",
      japanese: "日本語",
      french: "Français",
      spanish: "Español",
    },
    languageSubtitles: {
      korean: "",
      english: "(영어)",
      chineseSimplified: "(중국어(간체))",
      chineseTraditional: "(중국어(번체))",
      russian: "(러시아어)",
      vietnamese: "(베트남어)",
      indonesian: "(인도네시아어)",
      khmer: "(크메르어)",
      thai: "(태국어)",
      urdu: "(우르두어)",
      nepali: "(네팔어)",
      lao: "(라오어)",
      japanese: "(일본어)",
      french: "(프랑스어)",
      spanish: "(스페인어)",
    },
  },

  tbmListScreen: {
    title: "TBM 활동 목록",
    tabs: {
      all: "전체",
      drafting: "작성중",
      ongoing: "진행중",
      ended: "종료됨",
    },
    status: {
      drafting: "작성중",
      ongoing: "진행중",
      ended: "종료됨",
    },
    participants: "참여자 {{count}}명",
    fab: "새 활동 생성",
    empty: {
      drafting: "작성중인 TBM이 없습니다.",
      ongoing: "진행중인 TBM이 없습니다.",
      ended: "종료된 TBM이 없습니다.",
      all: "TBM 활동이 없습니다.",
    },
  },

  tbmReportScreen: {
    title: "TBM 보고서 생성",
    notice: {
      description:
        "· 진행중인 TBM 활동에 대해서만 교육일지를 작성할 수 있습니다.\n· 교육일지를 완료하면 해당 TBM 활동이 자동으로 종료됩니다.\n· 현장 사진은 최소 1장 이상 반드시 첨부해야 합니다.",
    },
    activityName: {
      label: "TBM 활동명",
    },
    processName: {
      label: "공정명",
      placeholder: "공정명을 입력하세요",
    },
    teamName: {
      label: "팀/반명",
      placeholder: "팀 또는 반명을 입력하세요",
    },
    educationSummary: {
      label: "교육 내용 요약",
      placeholder: "교육 내용을 요약하여 입력하세요",
    },
    specialNotes: {
      label: "특이사항",
      placeholder: "특이사항을 입력하세요",
    },
    sitePhotos: {
      label: "현장 사진",
      addButton: "사진 추가",
      helper: "현장 사진을 추가해 주세요.",
    },
    submit: "보고서 생성하기",
  },

  tbmCreateScreen: {
    title: "TBM 활동 생성",
    reset: "초기화",
    guide: {
      title: "작성 가이드",
      description:
        "사업장, 작업 일정, 활동 내용과 교육자료를 한 화면에서 관리해 TBM 활동을 바로 생성할 수 있습니다. 교육자료는 드롭 다운이나 직접 추가 중 선택할 수 있습니다.",
    },
    workplace: {
      label: "사업장 선택",
      placeholder: "사업장을 선택하세요",
      helper: "TBM 활동을 진행할 사업장을 선택해주세요.",
    },
    dateTime: {
      label: "작업 일시 (YYYY-MM-DD)",
      includeDateInTitle: "제목에 작업 일시 포함하기",
      helper: "작업 일정을 달력에서 선택해주세요.",
      confirm: "확인",
    },
    activityTitle: {
      label: "활동 제목",
      placeholder: "예: 2026.05.15 오전 철근작업 TBM",
      helper: "TBM 활동 제목은 최대 200자까지 입력해주세요.",
    },
    content: {
      label: "활동 내용",
      placeholder: "주요 작업 내용을 입력하세요",
      helper: "작업 내용을 입력해주세요. 최대 2,000자까지 입력할 수 있습니다.",
    },
    education: {
      label: "교육 자료 선택",
      statusBadge: "선택 현황",
      multipleBadge: "복수 선택 가능",
      countText: "총 {{count}}개 선택",
      countHelper: "선택 확인으로 이동해 교육자료를 추가하거나, 변경할 수 있습니다.",
      selectButton: "+ 교육자료 선택하기",
    },
    submit: "생성하기",
  },



  tbmDetailScreen: {
    title: "TBM 활동 상세",
    workDate: "작업일:  {{date}}",
    activityLabel: "활동 내용",
    educationHeader: "교육자료 ({{count}}개)",
    startActivity: "활동 시작",
    edit: "수정",
    delete: "삭제",
    participantEmpty: "참여자가 없습니다.",
    toastStarted: "TBM 활동이 시작되었습니다.",
    endActivity: "TBM 종료하고 보고서 생성하기",
    participantHeader: "참여자 목록 ({{count}}명)",
    badgeNormal: "정상",
    badgeCaution: "주의",
    badgeDanger: "위험",
    deleteModal: {
      title: "TBM 활동 삭제",
      message: "정말로 이 TBM 활동을 삭제하시겠습니까?",
      cancel: "취소",
      confirm: "삭제",
    },
    startModal: {
      title: "TBM 활동 시작",
      message: "이 TBM 활동을 시작하시겠습니까?\n상태가 '진행중'으로 변경됩니다.",
      cancel: "취소",
      confirm: "시작",
    },
  },

  educationSelectScreen: {
    title: "교육자료 선택",
    sourceTab1: "KS산업안전협회",
    sourceTab2: "KS산업안전협회",
    sourceTab3: "내가 만든 자료",
    searchPlaceholder: "검색하고자 하는 콘텐츠를 입력하세요",
    confirm: "선택완료 ({{count}}개)",
    confirmNone: "선택완료",
    emptyText: "회사 교육자료가 없습니다.",
  },

  ...demoKo,
}

export default ko
