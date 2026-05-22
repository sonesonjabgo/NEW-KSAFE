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
    forgotPasswordModal: {
      title: "Notice",
      message: "For password recovery, please contact\nyour administrator.\nPhone: 062-383-0083",
      confirm: "OK",
    },
    validation: {
      required: "Please enter your email and password.",
      invalidEmail: "Please enter a valid email address.",
      passwordTooShort: "Password must be at least 6 characters.",
      invalidCredentials: "Please check your email or password.",
    },
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
    footer: {
      homepage: "Homepage",
      privacy: "Privacy",
      terms: "Terms",
      copyright: "Copyright © KS Industrial Safety Association all rights reserved.",
      webViewLoading: "Connecting to",
      webViewLoadingWait: "Please wait a moment",
      webViewClose: "Close",
    },
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
    pushNotificationSheet: {
      title: "Don't Miss Important Alerts",
      description:
        "To receive safety alerts and announcements on time,\nplease allow push notification permission.",
      allowButton: "Allow Push Notifications",
      settingsButton: "Change Permission in Settings",
    },
  },
  safeBoardScreen: {
    title: "Board",
    alertButton: "Alert",
    workplaceLabel: "Workplace",
    workplaceModal: { title: "Select Workplace" },
    badge: { companyWide: "Company-wide", workplace: "Workplace", draft: "Draft", archived: "Archived" },
    tabs: { all: "All", myPosts: "My" },
    empty: "Empty",
    write: "Write",
    draftSaved: "Post saved as draft.",
  },
  safeBoardDetailScreen: { title: "Post Detail", authorLabel: "Author", editButton: "Edit", alertOn: "Alert ON", alertOff: "Alert OFF", publishButton: "Publish", deleteButton: "Delete", publishModal: { title: "Publish Post", message: "Are you sure you want to publish this post?", cancel: "Cancel", confirm: "Publish" }, deleteModal: { title: "Delete Post", message: "Are you sure you want to delete this post?", cancel: "Cancel", confirm: "Delete" } },
  safeBoardNotifyScreen: { title: "Send Workplace Push Notification", guide: { title: "Writing Guide", description: "Select one or more workplaces you manage\nand write a notification to deliver\nto site members." }, workplace: { label: "Select Workplace", helper: "Sending to {{selected}} of {{total}} workplaces" }, notifyTitle: { label: "Notification Title", placeholder: "Enter a brief title.", helper: "Up to 50 characters." }, content: { label: "Push Notification Content", placeholder: "Enter the notification message to deliver to this workplace.", helper: "Up to 240 characters." }, send: "Send Notification", sendSuccess: "Notification sent." },
  safeBoardCreateScreen: { title: "Write Post", guide: { title: "Writing Guide", description: "Please write clear and accurate content." }, workplace: { label: "Workplace", placeholder: "Select workplace", helper: "Select the workplace this post applies to." }, postTitle: { label: "Post Title", placeholder: "Enter post title (max 200 characters)", helper: "Enter a clear and descriptive title." }, content: { label: "Post Content", placeholder: "Enter post content (max 2000 characters)", helper: "Describe the safety issue in detail." }, attachment: { label: "Attachments", card1Text: "(Optional) You can upload\nfiles up to 50MB.", uploadButton: "Upload File", noFile: "No files selected." }, pushNotification: { label: "Send Push Notification", cardText: "When selected, a push notification will be sent to all members of the selected workplace upon posting." }, save: "Save" },

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
    title: "マイページ",
    workplace: {
      label: "広教タワークレーン作業場",
    },
    permissions: {
      sectionTitle: "アプリ権限設定",
      camera: {
        title: "カメラ",
        description: "QRコードスキャン、AI翻訳撮影、危険緊急記録",
        button: "許可",
      },
      microphone: {
        title: "マイク",
        description: "音声翻訳、無線通話、音声識別機能",
        button: "許可",
      },
      photo: {
        title: "写真/ライブラリ",
        description: "AI危険性評価、画像翻訳、TBM教育資料/レポート作成など",
        button: "許可",
      },
      notification: {
        title: "プッシュ通知",
        description: "TBM通知、危険警報、作業場公開情報",
      },
    },
    logout: "ログアウト",
    logoutModal: {
      title: "Log Out",
      message: "Are you sure you want to log out?",
      cancel: "Cancel",
      confirm: "Log Out",
    },
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
    mock: {
      boardNewPost: {
        title: "A new post has been written on the board.",
        description: "Check the board of your affiliated workplace!",
      },
    },
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

  educationPresentationScreen: {
    title: "교육/발표",
    inviteButton: "초대",
    inputLanguageLabel: "入力言語",
    languageMenu: { title: "言語を選択" },
    recognizing: "音声認識中...",
    statusMicOff: "メモを録音するにはマイクのアクセスを許可してください。",
    statusMicOn: "リアルタイムでメッセージを受信しています。",
    micOnLabel: "マイクをオフ",
    micOffLabel: "マイクをオン",
    inputHint: "メッセージを入力してください",
    inputPlaceholder: "メッセージを入力...",
    validationError: "メッセージを入力してください。",
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

  tbmListScreen: {
    title: "TBM 활동 목록",
    tabs: { all: "전체", drafting: "작성중", ongoing: "진행중", ended: "종료됨" },
    status: { drafting: "작성중", ongoing: "진행중", ended: "종료됨" },
    participants: "참여자 {{count}}명",
    fab: "새 활동 생성",
    empty: {
      drafting: "작성중인 TBM이 없습니다.",
      ongoing: "진행중인 TBM이 없습니다.",
      ended: "종료된 TBM이 없습니다.",
      all: "TBM 활동이 없습니다.",
    },
  },

  tbmJoinInfoScreen: {
    title: "TBM参加",
    sectionInfo: "TBM情報",
    activityName: "活動名",
    manager: "担当者",
    date: "日付",
    sectionAttachments: "添付ファイル",
    noAttachments: "添付ファイルはありません。",
    prev: "前へ",
    next: "次へ",
  },

  tbmJoinHealthScreen: {
    title: "TBM参加",
    heading: "健康状態確認",
    prompt: "前日に過度の飲酒をしたか、または本日健康上の問題があるかご確認ください。",
    statusGood: "異常なし",
    statusBad: "異常あり",
    prev: "前へ",
    next: "次へ",
    toastMessage: "次のステップに進む前に健康状態を選択してください。",
    notAllCheckedModal: {
      title: "健康状態を選択してください。",
      message: "異常なしまたは異常ありを選択しないと次のステップに進めません。",
      confirm: "OK",
    },
  },

  tbmJoinSignScreen: {
    title: "TBM参加",
    heading: "電子署名",
    description: "下記の領域に署名してください。",
    signatureArea: "ここに署名",
    clearLabel: "署名をリセット",
    prev: "前へ",
    next: "次へ",
    noSignatureModal: {
      title: "署名が必要です。",
      message: "署名を完了してから次のステップに進んでください。",
      confirm: "OK",
    },
  },

  tbmJoinCompleteScreen: {
    title: "TBM参加",
    heading: "TBM参加完了",
    subtitle: "安全な一日をお過ごしください！",
    goHome: "完了",
  },

  tbmJoinScreen: {
    title: "TBM参加",
    selectPrompt: "参加するTBMを選択してください",
    empty: {
      title: "進行中のTBMがありません。",
      subtitle: "現在参加できるTBMセッションがありません。",
    },
    prev: "前へ",
    next: "次へ",
    noSelectionModal: {
      title: "セッションが選択されていません。",
      message: "参加するTBMセッションを選択してください。",
      confirm: "確認",
    },
    infoModal: {
      title: "TBMガイド",
      meaning: {
        heading: "TBMとは",
        body: "TBMとはTool Box Meetingの略称で、作業開始前に当日の作業内容、危険要因、安全対策を一緒に確認する短い安全会議です。",
      },
      importance: {
        heading: "TBMが重要な理由",
        body: "TBMは作業前に危険要因を事前に共有し、役割分担と保護具の着用を確認することで、事故を防ぐための重要な手順です。",
      },
      procedure: {
        heading: "進行手順",
        step1: "今日の作業内容と参加者を確認します。",
        step2: "主な危険要因と安全措置を共有します。",
        step3: "作業者の健康状態、保護具、現場変更事項を点検します。",
        step4: "内容を確認した後、TBM参加とサインを行います。",
      },
      close: "閉じる",
    },
  },

  tbmReportScreen: {
    title: "TBMレポート生成",
    notice: {
      description:
        " ·  教育日誌は進行中のTBM活動に対してのみ作成できます。\n ·  教育日誌を完了すると、該当するTBM活動が自動的に終了します。\n ·  現場写真を最低1枚以上添付する必要があります。",
    },
    activityName: {
      label: "TBM活動",
    },
    processName: {
      label: "工程名",
      placeholder: "工程名を入力してください",
      helper: "任意入力。50文字以内で入力できます。",
    },
    teamName: {
      label: "チーム/班名",
      placeholder: "チームまたは班名を入力してください",
      helper: "任意入力。50文字以内で入力できます。",
    },
    educationSummary: {
      label: "教育内容要約",
      placeholder: "教育内容を要約して入力してください",
      helper: "10文字以上1,000文字以内で入力できます。",
    },
    specialNotes: {
      label: "特記事項",
      placeholder: "特記事項を入力してください",
      helper: "最大500文字まで入力できます。",
    },
    sitePhotos: {
      label: "現場写真",
      addButton: "写真を追加",
      guide:
        "At least 1 site photo must be registered.\nYou can attach a minimum of 1 and a maximum of 5 photos.",
      preview: "A preview will be shown when you add an image.",
    },
    submit: "レポートを生成する",
  },

  tbmCreateScreen: {
    title: "Create TBM Activity",
    reset: "Reset",
    guide: {
      title: "Writing Guide",
      description:
        "Manage your workplace, work schedule, activity content, and educational materials all in one screen to create a TBM activity immediately. You can select educational materials from a dropdown or add them directly.",
    },
    workplace: {
      label: "Select Workplace",
      placeholder: "Select a workplace",
      helper: "Please select the workplace for this TBM activity.",
    },
    dateTime: {
      label: "Work Date (YYYY-MM-DD)",
      includeDateInTitle: "Include date in title",
      helper: "Please select the work schedule from the calendar.",
      confirm: "Confirm",
    },
    activityTitle: {
      label: "Activity Title",
      placeholder: "e.g. 2026.05.15 Morning Rebar Work TBM",
      helper: "Activity title can be up to 200 characters.",
    },
    content: {
      label: "Activity Content",
      placeholder: "Enter main work content",
      helper: "Enter work content. Maximum 2,000 characters.",
    },
    education: {
      label: "Select Educational Materials",
      statusBadge: "Selection Status",
      multipleBadge: "Multiple selections allowed",
      countText: "{{count}} item(s) selected",
      countHelper: "Go to selection confirmation to add or change educational materials.",
      selectButton: "+ Select Educational Materials",
    },
    submit: "Create",
  },

  tbmDetailScreen: {
    title: "TBM活動詳細",
    workDate: "作業日:  {{date}}",
    activityLabel: "活動内容",
    educationHeader: "教育資料 ({{count}}件)",
    startActivity: "Start Activity",
    edit: "Edit",
    delete: "Delete",
    participantEmpty: "参加者がいません。",
    toastStarted: "TBM活動が開始されました。",
    endActivity: "TBMを終了してレポートを生成する",
    participantHeader: "参加者 ({{count}}名)",
    badgeNormal: "正常",
    badgeCaution: "注意",
    badgeDanger: "危険",
    deleteModal: {
      title: "TBM活動を削除",
      message: "本当にこのTBM活動を削除しますか？",
      cancel: "キャンセル",
      confirm: "削除",
    },
    startModal: {
      title: "TBM活動を開始",
      message: "このTBM活動を開始しますか？\nステータスが「進行中」に変わります。",
      cancel: "キャンセル",
      confirm: "開始",
    },
  },

  educationMaterialScreen: {
    title: "TBM Education Material List",
    registerButton: "Register New Education Material",
  },

  educationMaterialRegisterScreen: {
    title: "Register TBM Education Material",
    guide: {
      title: "Writing Guide",
      description:
        "Register the education title, key content, and attachment all at once so they can be used on-site immediately. Registered materials can be selected together for multiple TBM activities.",
    },
    attachment: {
      label: "Attachment",
      boxPlaceholder: "filename.format",
      helper: "Only one allowed file can be registered, up to a maximum of 50MB.",
    },
    educationTitle: {
      label: "Education Title",
      placeholder: "Enter the education material title",
      includeFileName: "Use filename as title",
      includeFileNameDesc: "The selected filename will be reflected in the title field.",
    },
    content: {
      label: "Education Content",
      placeholder: "Enter the education content",
      helper: "Description is optional. If provided, up to 10,000 characters can be entered.",
    },
    submit: "Register",
  },

  educationMaterialDetailScreen: {
    title: "TBM Education Material Detail",
    sourceKs: "KS Industrial Safety Association",
    sourceMine: "My Material",
    statusActive: "Active",
    statusArchived: "Archived",
    categoryLabel: "Category:",
    attachmentLabel: "Attachment",
    registrantLabel: "Registrant:",
    publishButton: "Publish After Activation",
  },

  educationSelectScreen: {
    title: "Select Educational Materials",
    sourceTab1: "KS Safety Association",
    sourceTab2: "KS Safety Association",
    sourceTab3: "My Materials",
    searchPlaceholder: "Enter content to search",
    confirm: "Complete ({{count}})",
    confirmNone: "Complete",
    emptyText: "No educational materials available.",
  },

  improvementProposalDetailScreen: {
    title: "Proposal Detail Management",
    result: {
      sectionTitle: "処理結果",
      reflected: "反映されました。",
      rejected: "反映不可となりました。",
      dateLabel: "処理日:",
    },
    alreadyProcessed: "この提案はすでに処理済みです。",
    saveProcessingMessage: "処理内容が保存されました。",
    workerNoEditMessage: "進行中または処理済みの提案は編集・削除できません。",
    status: {
      pending: "Pending",
      ongoing: "In Progress",
      reflected: "Reflected",
      rejected: "Not Reflected",
    },
    statusChange: {
      sectionTitle: "Status Change & Processing",
      ongoingBtn: "In Progress",
      reflectedBtn: "Reflected",
      rejectedBtn: "Not Reflected",
      inputLabel: "Processing Notes",
      pendingMessage: "Status is Pending.\nChange to In Progress before processing.",
      ongoingMessage: "完了または不可のステータスを選択時に入力可能。",
      rejectedInputLabel: "不可理由",
      rejectedProcessingPlaceholder: "反映不可の理由を詳しく入力してください。",
      processingPlaceholder:
        "実施した対応内容を詳しく入力してください。（例：設備チームの確認後、配置完了）",
    },
    history: {
      sectionTitle: "Status Change History",
      registeredTitle: "Proposal Registered",
      registeredDesc: "Proposal has been received.",
      ongoingTitle: "In Progress",
      ongoingChangeTitle: "進行中に変更",
      ongoingDesc: "Proposal review has started.",
      reflectedTitle: "Reflected",
      reflectedChangeTitle: "反映完了処理",
      reflectedDesc: "Proposal has been reflected.",
      rejectedTitle: "Not Reflected",
      rejectedChangeTitle: "反映不可処理",
      rejectedDesc: "Proposal could not be reflected.",
      proceedNote: "担当者が配属されました -",
      reflectedNote: "反映完了として処理されました -",
      rejectedNote: "反映不可として処理されました -",
    },
    editForm: {
      label: "Details",
      required: " *",
      helper: "You can write up to 2,000 characters.",
      errorMaxLength: "Please enter details within 2,000 characters.",
    },
    edit: "Edit",
    delete: "Delete",
    proceed: "進める",
    saveProceeded: "処理内容を保存",
    proceedStartedMessage: "処理が開始されました。",
    cancel: "Cancel",
    save: "Save",
    savedMessage: "Proposal has been updated.",
    deletedMessage: "提案が削除されました。",
    deleteModal: {
      title: "提案を削除",
      message: "この提案を削除しますか？\n削除した提案は復元できません。",
      cancel: "キャンセル",
      confirm: "削除",
    },
  },

  improvementProposalCreateScreen: {
    title: "Write Proposal",
    guide: {
      title: "Writing Guide",
      description:
        "Freely propose ideas to improve safety and work efficiency at the site. It would be helpful to include specific locations and situations.",
    },
    workplace: {
      label: "Workplace",
      placeholder: "Please select a workplace",
      helper: "You can select a workplace from the workplace list.",
    },
    detail: {
      label: "Details",
      required: " *",
      placeholder:
        "What would you like to improve?\nExamples)\n · Problem: The lighting in corridor B is too dim, making work dangerous.\n · Proposal: Please add LED lighting or improve the brightness.",
      helper: "You can write up to 2,000 characters.",
      errorMaxLength: "Please enter details within 2,000 characters.",
    },
    submit: "Submit",
    submitting: "送信中...",
  },

  improvementProposalListScreen: {
    title: "Improvement Proposals",
    tabs: {
      all: "All",
      pending: "Pending",
      ongoing: "In Progress",
      reflected: "Reflected",
      rejected: "Not Reflected",
    },
    summary: {
      myProposals: "My Proposals",
      reflected: "Reflected",
      unit: "item(s)",
    },
    status: {
      pending: "Pending",
      ongoing: "In Progress",
      reflected: "Reflected",
      rejected: "Not Reflected",
    },
    fab: "New Proposal",
    empty: {
      all: "No proposals registered.",
      pending: "No pending proposals.",
      ongoing: "No proposals in progress.",
      reflected: "No reflected proposals.",
      rejected: "No proposals marked as not reflected.",
    },
  },

  tbmReportInquiryScreen: {
    title: "TBM報告書照会",
    tabs: {
      all: "All",
      requested: "Requested",
      generating: "Generating",
      completed: "Completed",
      failed: "Failed",
    },
    empty: {
      all: "No reports found.",
      requested: "No pending reports.",
      generating: "No reports being generated.",
      completed: "No completed reports.",
      failed: "No failed reports.",
    },
  },

  tbmReportStatusScreen: {
    title: "TBM Report Status",
    regenerate: "Regenerate",
    sectionReportInfo: "Report Information",
    sectionProcessStatus: "Processing Status",
    sectionStatusHistory: "Status History",
    processName: "Process Name",
    teamName: "Team/Unit",
    historyRequestedAt: "Request Date",
    historyStartedAt: "Processing Start",
    historyCompletedAt: "Processing Complete",
    downloadPdf: "Download PDF",
    sectionRegenerate: "Report Regeneration",
    regenerateInfoText: "Please enter the items below before\nrequesting report regeneration.",
    processNameLabel: "Process Name (Optional)",
    processNamePlaceholder: "e.g. Press",
    teamNameLabel: "Team/Unit (Optional)",
    teamNamePlaceholder: "e.g. Team 1",
    inputDescription: "Optional field. Maximum 50 characters.",
    cautionTitle: "Caution",
    cautionItem1: "Regeneration is only available for failed or completed reports.",
    cautionItem2: "Reports in pending or processing status cannot be regenerated.",
    cautionItem3: "Regeneration will reset the existing results.",
    requestRegenerate: "Request Regeneration",
    regenerateNote: "New regeneration may take some time.",
    refresh: "Refresh",
    toastRegenerate: "Report regeneration request has been submitted.",
  },

  patrolScreen: {
    title: "作業場巡回点検",
    createButton: "新規点検作成",
    workplaceSelector: {
      label: "選択した作業場",
      modalTitle: "点検リストを確認する作業場を選択してください。",
    },
    badge: {
      underReview: "審査中",
      inProgress: "作成中",
      approved: "承認済",
    },
    card: {
      reviewer: "審査者",
      approver: "承認者",
    },
  },
  patrolDetailScreen: {
    title: "点検詳細",
    editButton: "編集",
    summaryCard: {
      title: "点検結果サマリー",
      total: "合計",
      good: "良好",
      bad: "不良",
    },
    detailCard: {
      overallActions: "総合措置事項",
      inspectionItems: "点検項目",
      checkItem: {
        goodBadge: "良好",
        badBadge: "不良",
        actionLabel: "措置事項",
      },
    },
    buttons: {
      submit: "提出",
      editComplete: "修正完了",
      reviewComplete: "検討完了",
      approve: "承認",
      recall: "回収",
      delete: "削除",
      reportPreview: "レポートプレビュー",
    },
  },
  patrolCreateScreen: {
    title: "巡回点検作成",
    section: {
      approver: {
        title: "承認者（必須）",
        placeholder: "承認者を選択",
        description: "管理者リストから承認者を選択できます。",
      },
      reviewer: {
        title: "審査者（任意）",
        placeholder: "審査者を選択",
        description: "管理者リストから審査者を選択できます（任意）。",
      },
      items: {
        title: "点検項目（必須）",
        placeholder: "テンプレートを選択",
        addButton: "項目を追加",
        itemNamePlaceholder: "項目名",
        itemNameDescription: "例: 一般、電気、ガスなど / 1～100文字で入力",
        deleteButton: "削除",
        addCheckButton: "点検事項を追加",
        checkTitle: "点検事項（必須）",
        checkNamePlaceholder: "点検事項名",
        checkDescription: "例: 作業場の整理・整頓・清潔状態 / 1～200文字で入力",
        goodButton: "良好",
        badButton: "不良",
        badNotePlaceholder: "不良の理由を入力してください",
        deleteCheckButton: "点検事項を削除",
      },
      requirements: {
        title: "全体的な措置要件",
        placeholder: "全体的な措置要件 / 意見",
        description: "全体的な措置要件を入力できます。1,000文字以内で入力してください。",
      },
    },
    submitButton: "点検を提出",
    successModal: {
      title: "成功",
      message: "点検が正常に作成されました。",
      confirmButton: "確認",
    },
    modal: {
      userTitle: "ユーザーを選択",
      templateTitle: "テンプレートを選択",
      cancelButton: "キャンセル",
    },
  },

  tbmParticipationHistoryScreen: {
    title: "TBM Participation History",
    totalParticipation: "Total Participation",
    cautionResponse: "Caution Response",
    unit: "case(s)",
    workplaceLabel: "Workplace",
  },

  tbmParticipationHistoryDetailScreen: {
    participationDate: "Participation Date",
    workDate: "Work Date",
    workplace: "Workplace",
    manager: "Manager",
    activityContent: "Activity Content",
  },

  aiRiskDocCreatorScreen: {
    title: "AI Risk Analysis Report",
    pageCount: "Total {{count}} page(s)",
    captureButton: "Capture Before Improvement",
    exportPdfButton: "Export PDF",
    hazardToggle: {
      label: "Include Hazard Coordinate Section",
      description: "When unchecked, hazard coordinates will not be displayed on screen and PDF.",
    },
    emptyState: {
      title: "No pages registered.",
      description: "Capture a before-improvement image to add a page.",
    },
    captureSheet: {
      camera: "Take Photo",
      album: "Select from Album",
    },
    resetAll: "Reset All",
    signature: {
      instruction: "Sign with your finger in the box, then tap Save.",
      cancel: "Cancel",
      save: "Save",
    },
    page: {
      title: "Page {{number}}",
      beforeLabel: "Before",
      afterLabel: "After",
      addImage: "+ Add Image",
      analyzeButton: "Request AI Analysis",
      aiAnalysis: "AI Analysis",
      hazardTitle: "Hazard Coordinate Details",
      hazardEmpty: "No hazard coordinates to display.",
      analysisPlaceholder: "Analysis results will be displayed here.",
    },
  },

  hazardRiskCreateScreen: {
    title: "危険箇所報告",
    guide: {
      title: "作成ガイド",
      description:
        "現場で発見した有害危険要素を報告してください。正確な位置と危険要因を記載することで迅速な対応が可能です。",
    },
    workplace: {
      label: "事業場",
      placeholder: "事業場を選択してください",
      modalTitle: "事業場を選択してください",
      helper: "事業場リストから選択できます。",
    },
    location: {
      label: "場所",
      placeholder: "例：2階東側廊下、B区域作業場入口など",
      helper: "最大200文字まで入力できます。",
    },
    hazardFactor: {
      label: "危険要因",
      placeholder:
        "どのような危険要因がありますか？\n例：\n · 階段の手すりがぐらついており、転落の危険があります。\n · 電線が露出しており、感電の危険があります。",
      helper: "最大1,000文字まで入力できます。",
    },
    sitePhotos: {
      label: "現場写真",
      addButton: "写真を追加",
      modalTitle: "写真の追加方法を選択",
      camera: "カメラで撮影",
      album: "アルバムから選択",
      hint: "現場の状況を明確に示す写真を追加してください。",
      guide: "現場写真を最低1枚登録してください。\n1枚から最大5枚まで添付できます。",
      preview: "画像を追加するとプレビューが表示されます。",
    },
    submit: "送信する",
  },

  hazardRiskScreen: {
    title: "Hazard Areas",
    fab: "New Report",
    summary: {
      myReports: "My Reports",
      completed: "Resolved",
      unit: "item(s)",
    },
    tabs: {
      all: "All",
      pending: "Pending",
      ongoing: "In Progress",
      completed: "Resolved",
      impossible: "Unresolvable",
    },
    status: {
      pending: "Pending",
      ongoing: "In Progress",
      completed: "Resolved",
      impossible: "Unresolvable",
    },
    empty: {
      all: "No hazard areas registered.",
      pending: "No pending hazard areas.",
      ongoing: "No hazard areas in progress.",
      completed: "No resolved hazard areas.",
      impossible: "No unresolvable hazard areas.",
    },
  },

  hazardRiskDetailScreen: {
    title: "Hazard Area Detail",
    infoCard: {
      locationLabel: "Location",
      hazardFactorLabel: "Hazard Factor",
      sitePhotosLabel: "Site Photos",
      noPhotos: "No photos registered.",
      managerProfileLabel: "Manager Profile",
    },
    adminSection: {
      title: "Status Change & Action",
      noteLabel: "Enter Action Details",
      noteHint: "Up to 2,000 characters can be entered.",
      sitePhotosLabel: "現場写真",
      sitePhotosHints: {
        hint1: "現場の状況を明確に示す写真を追加してください。",
        hint2: "措置後の現場写真を追加すると、処理結果を明確に伝えることができます。",
      },
      placeholder: {
        pending: "Status is pending.\nChange to In Progress before taking action.",
        ongoing: "Input available when Completed or Impossible status is selected",
        completed:
          "Please describe the action taken in detail (e.g., handrail reinstalled, cable protector installed)",
        impossible: "Please describe in detail why the action is not possible.",
      },
    },
    statusHistory: {
      title: "ステータス변경이력",
      titles: {
        pending: "報告登録",
        completed: "措置完了処理",
        impossible: "措置不可処理",
      },
      contents: {
        pending: "報告が受付けられました。",
        completed: "措置完了処理されました。",
        impossible: "措置不可処理されました。",
        adminSuffix: " - 管理者({{name}})",
      },
    },
  },

  welcomeIntroScreen: {
    skip: "Skip",
    start: "Get Started",
    slide1: {
      step: "01",
      title: "Real-Time Multilingual Translation",
      description:
        "Communicate smoothly with workers of all nationalities.\nInstant voice and text translation\nfor a safer workplace.",
    },
    slide2: {
      step: "02",
      title: "Integrated TBM Management",
      description:
        "Check in to TBM with a single QR code scan — no paperwork.\nDigital signatures and reports\ncompleted in one place.",
    },
    slide3: {
      step: "03",
      title: "AI Risk Assessment",
      description:
        "Just take a photo of the site and AI will analyze hazards\nand generate a report draft for you.",
    },
  },

  ...demoJa,
}

export default ja
