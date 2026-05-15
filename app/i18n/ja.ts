import demoJa from "./demo-ja"
import { Translations } from "./en"

const ja: Translations = {
  common: {
    ok: "OK",
    cancel: "キャンセル",
    back: "戻る",
    logOut: "ログアウト",
  },
  welcomeScreen: {
    postscript:
      "注目！ — このアプリはお好みの見た目では無いかもしれません(デザイナーがこのスクリーンを送ってこない限りは。もしそうなら公開しちゃいましょう！)",
    readyForLaunch: "このアプリはもう少しで公開できます！",
    exciting: "(楽しみですね！)",
    letsGo: "レッツゴー！",
  },
  errorScreen: {
    title: "問題が発生しました",
    friendlySubtitle:
      "本番では、エラーが投げられた時にこのページが表示されます。もし使うならこのメッセージに変更を加えてください(`app/i18n/jp.ts`)レイアウトはこちらで変更できます(`app/screens/ErrorScreen`)。もしこのスクリーンを取り除きたい場合は、`app/app.tsx`にある<ErrorBoundary>コンポーネントをチェックしてください",
    reset: "リセット",
    traceTitle: "エラーのスタック: %{name}",
  },
  emptyStateComponent: {
    generic: {
      heading: "静かだ...悲しい。",
      content:
        "データが見つかりません。ボタンを押してアプリをリロード、またはリフレッシュしてください。",
      button: "もう一度やってみよう",
    },
  },

  errors: {
    invalidEmail: "有効なメールアドレスを入力してください.",
  },
  loginScreen: {
    logIn: "ログイン",
    tagline: "Safety Partner for the Workplace",
    enterDetails:
      "ここにあなたの情報を入力してトップシークレットをアンロックしましょう。何が待ち構えているか予想もつかないはずです。はたまたそうでも無いかも - ロケットサイエンスほど複雑なものではありません。",
    emailFieldLabel: "メールアドレス",
    passwordFieldLabel: "パスワード",
    emailFieldPlaceholder: "メールアドレスを入力してください",
    passwordFieldPlaceholder: "パスワードを入力してください ",
    tapToLogIn: "タップしてログインしよう！",
    hint: "Hint: you can use any email address and your favorite password :)",
    forgotPassword: "Forgot your password?",
  },
  demoNavigator: {
    componentsTab: "コンポーネント",
    debugTab: "デバッグ",
    communityTab: "コミュニティ",
    podcastListTab: "ポッドキャスト",
  },
  demoCommunityScreen: {
    title: "コミュニティと繋がろう",
    tagLine:
      "Infinite RedのReact Nativeエンジニアコミュニティに接続して、一緒にあなたのアプリ開発をレベルアップしましょう！",
    joinUsOnSlackTitle: "私たちのSlackに参加しましょう",
    joinUsOnSlack:
      "世界中のReact Nativeエンジニアと繋がりたいを思いませんか？Infinite RedのコミュニティSlackに参加しましょう！私達のコミュニティは安全に質問ができ、お互いから学び、あなたのネットワークを広げることができます。",
    joinSlackLink: "Slackコミュニティに参加する",
    makeIgniteEvenBetterTitle: "Igniteをより良くする",
    makeIgniteEvenBetter:
      "Igniteをより良くする為のアイデアはありますか? そうであれば聞きたいです！ 私たちはいつでも最良のReact Nativeのツールを開発する為に助けを求めています。GitHubで私たちと一緒にIgniteの未来を作りましょう。",
    contributeToIgniteLink: "Igniteにコントリビュートする",
    theLatestInReactNativeTitle: "React Nativeの今",
    theLatestInReactNative: "React Nativeの現在をあなたにお届けします。",
    reactNativeRadioLink: "React Native Radio",
    reactNativeNewsletterLink: "React Native Newsletter",
    reactNativeLiveLink: "React Native Live",
    chainReactConferenceLink: "Chain React Conference",
    hireUsTitle: "あなたの次のプロジェクトでInfinite Redと契約する",
    hireUs:
      "それがプロジェクト全体でも、チームにトレーニングをしてあげたい時でも、Infinite RedはReact Nativeのことであればなんでもお手伝いができます。",
    hireUsLink: "メッセージを送る",
  },
  demoShowroomScreen: {
    jumpStart: "あなたのプロジェクトをスタートさせるコンポーネントです！",
    lorem2Sentences:
      "Nulla cupidatat deserunt amet quis aliquip nostrud do adipisicing. Adipisicing excepteur elit laborum Lorem adipisicing do duis.",
    demoHeaderTxExample: "Yay",
    demoViaTxProp: "`tx`から",
    demoViaSpecifiedTxProp: "`{{prop}}Tx`から",
  },
  demoDebugScreen: {
    howTo: "ハウツー",
    title: "デバッグ",
    tagLine:
      "おめでとうございます、あなたはとてもハイレベルなReact Nativeのテンプレートを使ってます。このボイラープレートを活用してください！",
    reactotron: "Reactotronに送る",
    reportBugs: "バグをレポートする",
    demoList: "デモリスト",
    demoPodcastList: "デモのポッドキャストリスト",
    androidReactotronHint:
      "もし動かなければ、Reactotronのデスクトップアプリが実行されていることを確認して, このコマンドをターミナルで実行した後、アプリをアプリをリロードしてください。 adb reverse tcp:9090 tcp:9090",
    iosReactotronHint:
      "もし動かなければ、Reactotronのデスクトップアプリが実行されていることを確認して、アプリをリロードしてください。",
    macosReactotronHint:
      "もし動かなければ、Reactotronのデスクトップアプリが実行されていることを確認して、アプリをリロードしてください。",
    webReactotronHint:
      "もし動かなければ、Reactotronのデスクトップアプリが実行されていることを確認して、アプリをリロードしてください。",
    windowsReactotronHint:
      "もし動かなければ、Reactotronのデスクトップアプリが実行されていることを確認して、アプリをリロードしてください。",
  },
  demoPodcastListScreen: {
    title: "React Native Radioのエピソード",
    onlyFavorites: "お気に入り表示",
    favoriteButton: "お気に入り",
    unfavoriteButton: "お気に入りを外す",
    accessibility: {
      cardHint: "ダブルタップで再生します。 ダブルタップと長押しで {{action}}",
      switch: "スイッチオンでお気に入りを表示する",
      favoriteAction: "お気に入りの切り替え",
      favoriteIcon: "お気に入りのエピソードではありません",
      unfavoriteIcon: "お気に入りのエピソードです",
      publishLabel: "公開日 {{date}}",
      durationLabel: "再生時間: {{hours}} 時間 {{minutes}} 分 {{seconds}} 秒",
    },
    noFavoritesEmptyState: {
      heading: "どうやら空っぽのようですね",
      content:
        "お気に入りのエピソードがまだありません。エピソードにあるハートマークにタップして、お気に入りに追加しましょう！",
    },
  },

  homeScreen: {
    orgName: "Organization Name",
    header: { qrScan: "QR Scan", notification: "Notifications", language: "Language" },
    greeting: { message: "Have a safe day!", name: "{{name}}," },
    role: { admin: "Admin", worker: "Worker" },
    devToggle: { eduBanner: "Edu Banner" },
    board: {
      title: "Board",
      viewMore: "More",
      tabs: { all: "All", company: "Company", workplace: "Workplace" },
    },
    edu: { title: "Education", description: "Description" },
    banner: { text: "Safe Environment" },
    footer: { homepage: "Homepage", privacy: "Privacy", terms: "Terms" },
    grid: {
      interpret: { label: "Interpret", sub: "Interpretation" },
      chatbot: { label: "Chatbot", sub: "Chatbot" },
      translate: { label: "Translate", sub: "Translate" },
      education: { label: "Education", sub: "Education" },
      eduJoin: { label: "Edu Join", sub: "Edu Join" },
      tbmJoin: { label: "TBM", sub: "TBM" },
      patrol: { label: "Patrol", sub: "Patrol" },
      tbmCreate: { label: "Create", sub: "Create" },
      tbmReport: { label: "Report", sub: "Report" },
      hazard: { label: "Hazard", sub: "Hazard" },
      suggestion: { label: "Suggestion", sub: "Suggestion" },
    },
  },
  safeBoardScreen: {
    title: "Board",
    alertButton: "Alert",
    workplaceLabel: "Workplace",
    tabs: { all: "All", myPosts: "My" },
    empty: "Empty",
    write: "Write",
  },
  safeHealthScreen: {
    title: "Health",
    menu: {
      patrol: { title: "Patrol", description: "Patrol" },
      educationMaterial: { title: "Material", description: "Material" },
      tbmManage: { title: "TBM", description: "TBM" },
      tbmReport: { title: "Report", description: "Report" },
      tbmJoin: { title: "Join", description: "Join" },
      tbmHistory: { title: "History", description: "History" },
      tbmJoinWorker: { title: "Join", description: "Join" },
      statusView: { title: "Status", description: "Status" },
    },
  },
  workerParticipationScreen: {
    title: "Worker",
    menu: {
      hazard: { title: "Hazard", description: "Hazard" },
      suggestion: { title: "Suggestion", description: "Suggestion" },
    },
  },

  voiceTranslationScreen: {
    title: "Voice Conversation Translation",
    flipScreen: "Flip",
    listening: "Listening...",
    speakNow: "Speak now",
    languageMenu: {
      title: "Recognized Language",
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
    title: "AI Safety Assistant",
    aiName: "AI Safety Assistant",
    welcomeMessage: "Hello! I am the Industrial Safety AI Assistant.",
    inputPlaceholder: "Enter a message...",
    inputHint: "Required. Please write between 2 and 1,000 characters.",
    deleteDialog: {
      title: "Delete Conversation",
      message: "Are you sure you want to delete all conversation history?",
      confirm: "Delete",
      cancel: "Cancel",
    },
    suggestedQuestions: {
      q1: "Explain general construction site safety regulations",
      q2: "What are the safety rules for working at heights?",
      q3: "What is the emergency response procedure in case of fire?",
    },
  },

  myPageScreen: {
    title: "My Page",
    workplace: {
      label: "Gwangyo Tower Crane Workplace",
    },
    permissions: {
      sectionTitle: "App Permission Settings",
      camera: {
        title: "Camera",
        description: "QR scan, AI translation photography, emergency hazard recording",
        button: "Allow",
      },
      microphone: {
        title: "Microphone",
        description: "Voice translation, Hoi calls, voice real-name verification",
        button: "Allow",
      },
      photo: {
        title: "Photos/Library",
        description: "AI risk assessment, image translation, TBM education materials",
        button: "Allow",
      },
      notification: {
        title: "Push Notifications",
        description: "TBM notifications, hazard alerts, workplace announcements",
      },
    },
    logout: "Logout",
  },

  languageSettings: {
    title: "言語設定",
    description: "アプリの言語をすぐに変更できます。",
    changedTitle: "言語設定",
    changedDescription:
      "言語が{{language}}に変更されました。\n変更を適用するためにアプリを再起動します。",
    confirm: "確認",
    languages: {
      ko: "韓国語 (한국어)",
      en: "英語 (English)",
      zhHans: "簡体字中国語 (简体中文)",
      zhHant: "繁体字中国語 (繁體中文)",
      ru: "ロシア語 (Русский)",
      vi: "ベトナム語 (Tiếng Việt)",
      id: "インドネシア語 (Bahasa Indonesia)",
      km: "クメール語 (ភាសាខ្មែរ)",
      th: "タイ語 (ไทย)",
      ur: "ウルドゥー語 (اردو)",
      ne: "ネパール語 (नेपाली)",
      lo: "ラオ語 (ພາສາລາວ)",
    },
  },

  notify: {
    title: "通知",
    emptyTitle: "通知はありません",
    emptyDescription: "現在、受け取った通知はありません。\n新しい通知が届いたらお知らせします。",
  },

  qrScanner: {
    title: "教育/発表に参加",
    description:
      "QRコードをスキャンするか、発表者が共有したコードを入力して会議に参加してください。",
    permissionRequired: "QRコードをスキャンするにはカメラの許可が必要です。",
    retry: "再試行",
    languageLabel: "使用言語",
    currentLanguage: "韓国語",
    enterCode: "カメラの使用が難しいですか？教育/発表コードを直接入力できます。",
    enterCodeDescription: "発表者が共有した8桁の数字コードを入力してください。",
    joinMeeting: "会議に参加",
    codePlaceholder: "コードを入力",
  },

  imageTranslationScreen: {
    title: "画像翻訳",
    selectImage: "翻訳する画像を選択",
    selectImageDesc: "下のボタンを押して、翻訳する画像を選択してください。",
    languageLabel: "翻訳に使用する言語を選択",
    languageMenu: {
      title: "言語を選択",
    },
    cameraButton: "カメラで撮影",
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
      korean: "(韓国語)",
      english: "(英語)",
      chineseSimplified: "(中国語(簡体))",
      chineseTraditional: "(中国語(繁体))",
      russian: "(ロシア語)",
      vietnamese: "(ベトナム語)",
      indonesian: "(インドネシア語)",
      khmer: "(クメール語)",
      thai: "(タイ語)",
      urdu: "(ウルドゥー語)",
      nepali: "(ネパール語)",
      lao: "(ラオス語)",
      japanese: "",
      french: "(フランス語)",
      spanish: "(スペイン語)",
    },
  },

  textTranslationScreen: {
    title: "テキスト翻訳",
    fontSizeButton: "AA",
    languageMenu: {
      title: "言語を選択",
    },
    listening: "音声を聞いています...",
    inputPlaceholder: "翻訳するテキストを入力してください",
    inputHint: "最大1,000文字まで翻訳可能",
    translateButton: "翻訳",
    validationError: "ⓘ 1文字以上入力してください。",
    speakButton: "話す",
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
      korean: "(韓国語)",
      english: "(英語)",
      chineseSimplified: "(中国語(簡体))",
      chineseTraditional: "(中国語(繁体))",
      russian: "(ロシア語)",
      vietnamese: "(ベトナム語)",
      indonesian: "(インドネシア語)",
      khmer: "(クメール語)",
      thai: "(タイ語)",
      urdu: "(ウルドゥー語)",
      nepali: "(ネパール語)",
      lao: "(ラオス語)",
      japanese: "",
      french: "(フランス語)",
      spanish: "(スペイン語)",
    },
  },

  ...demoJa,
}

export default ja
