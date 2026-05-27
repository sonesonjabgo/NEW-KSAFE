import demoEn from "./demo-en"

const en = {
  common: {
    ok: "OK!",
    cancel: "Cancel",
    back: "Back",
    logOut: "Log Out",
  },
  welcomeScreen: {
    postscript:
      "psst  — This probably isn't what your app looks like. (Unless your designer handed you these screens, and in that case, ship it!)",
    readyForLaunch: "Your app, almost ready for launch!",
    exciting: "(ohh, this is exciting!)",
    letsGo: "Let's go!",
  },
  errorScreen: {
    title: "Something went wrong!",
    friendlySubtitle:
      "This is the screen that your users will see in production when an error is thrown. You'll want to customize this message (located in `app/i18n/en.ts`) and probably the layout as well (`app/screens/ErrorScreen`). If you want to remove this entirely, check `app/app.tsx` for the <ErrorBoundary> component.",
    reset: "RESET APP",
    traceTitle: "Error from %{name} stack",
  },
  emptyStateComponent: {
    generic: {
      heading: "So empty... so sad",
      content: "No data found yet. Try clicking the button to refresh or reload the app.",
      button: "Let's try this again",
    },
  },

  errors: {
    invalidEmail: "Invalid email address.",
  },
  loginScreen: {
    logIn: "Log In",
    tagline: "Integrated Safety Partner for the Workplace",
    enterDetails:
      "Enter your details below to unlock top secret info. You'll never guess what we've got waiting. Or maybe you will; it's not rocket science here.",
    emailFieldLabel: "Email",
    passwordFieldLabel: "Password",
    emailFieldPlaceholder: "Enter your email address",
    passwordFieldPlaceholder: "Enter your password",
    tapToLogIn: "Tap to log in!",
    hint: "Hint: you can use any email address and your favorite password :)",
    forgotPassword: "Forgot your password?",
    forgotPasswordModal: {
      title: "Notice",
      message: "For password recovery, please contact\nyour administrator.\nPhone: 062-383-0083",
      confirm: "OK",
    },
    alert: {
      invalidCredentials: "Invalid email or password.",
      signInFailed: "Sign in failed. Please try again.",
      fillFields: "Please fill in all required fields.",
      passwordLength: "Password must be at least 6 characters.",
      unauthorizedRole: "This account does not have access.",
      deactivatedAccount: "This account has been deactivated. Please contact your administrator.",
      profileLoadFailed: "Failed to load user information. Please try again.",
    },
    validation: {
      required: "Please enter your email and password.",
      invalidEmail: "Please enter a valid email address.",
      passwordTooShort: "Password must be at least 6 characters.",
      invalidCredentials: "Please check your email or password.",
    },
  },
  demoNavigator: {
    componentsTab: "Components",
    debugTab: "Debug",
    communityTab: "Community",
    podcastListTab: "Podcast",
  },
  demoCommunityScreen: {
    title: "Connect with the community",
    tagLine:
      "Plug in to Infinite Red's community of React Native engineers and level up your app development with us!",
    joinUsOnSlackTitle: "Join us on Slack",
    joinUsOnSlack:
      "Wish there was a place to connect with React Native engineers around the world? Join the conversation in the Infinite Red Community Slack! Our growing community is a safe space to ask questions, learn from others, and grow your network.",
    joinSlackLink: "Join the Slack Community",
    makeIgniteEvenBetterTitle: "Make Ignite even better",
    makeIgniteEvenBetter:
      "Have an idea to make Ignite even better? We're happy to hear that! We're always looking for others who want to help us build the best React Native tooling out there. Join us over on GitHub to join us in building the future of Ignite.",
    contributeToIgniteLink: "Contribute to Ignite",
    theLatestInReactNativeTitle: "The latest in React Native",
    theLatestInReactNative: "We're here to keep you current on all React Native has to offer.",
    reactNativeRadioLink: "React Native Radio",
    reactNativeNewsletterLink: "React Native Newsletter",
    reactNativeLiveLink: "React Native Live",
    chainReactConferenceLink: "Chain React Conference",
    hireUsTitle: "Hire Infinite Red for your next project",
    hireUs:
      "Whether it's running a full project or getting teams up to speed with our hands-on training, Infinite Red can help with just about any React Native project.",
    hireUsLink: "Send us a message",
  },
  demoShowroomScreen: {
    jumpStart: "Components to jump start your project!",
    lorem2Sentences:
      "Nulla cupidatat deserunt amet quis aliquip nostrud do adipisicing. Adipisicing excepteur elit laborum Lorem adipisicing do duis.",
    demoHeaderTxExample: "Yay",
    demoViaTxProp: "Via `tx` Prop",
    demoViaSpecifiedTxProp: "Via `{{prop}}Tx` Prop",
  },
  demoDebugScreen: {
    howTo: "HOW TO",
    title: "Debug",
    tagLine:
      "Congratulations, you've got a very advanced React Native app template here.  Take advantage of this boilerplate!",
    reactotron: "Send to Reactotron",
    reportBugs: "Report Bugs",
    demoList: "Demo List",
    demoPodcastList: "Demo Podcast List",
    androidReactotronHint:
      "If this doesn't work, ensure the Reactotron desktop app is running, run adb reverse tcp:9090 tcp:9090 from your terminal, and reload the app.",
    iosReactotronHint:
      "If this doesn't work, ensure the Reactotron desktop app is running and reload app.",
    macosReactotronHint:
      "If this doesn't work, ensure the Reactotron desktop app is running and reload app.",
    webReactotronHint:
      "If this doesn't work, ensure the Reactotron desktop app is running and reload app.",
    windowsReactotronHint:
      "If this doesn't work, ensure the Reactotron desktop app is running and reload app.",
  },
  demoPodcastListScreen: {
    title: "React Native Radio episodes",
    onlyFavorites: "Only Show Favorites",
    favoriteButton: "Favorite",
    unfavoriteButton: "Unfavorite",
    accessibility: {
      cardHint:
        "Double tap to listen to the episode. Double tap and hold to {{action}} this episode.",
      switch: "Switch on to only show favorites",
      favoriteAction: "Toggle Favorite",
      favoriteIcon: "Episode not favorited",
      unfavoriteIcon: "Episode favorited",
      publishLabel: "Published {{date}}",
      durationLabel: "Duration: {{hours}} hours {{minutes}} minutes {{seconds}} seconds",
    },
    noFavoritesEmptyState: {
      heading: "This looks a bit empty",
      content:
        "No favorites have been added yet. Tap the heart on an episode to add it to your favorites!",
    },
  },

  mainTab: {
    home: "Home",
    safeBoard: "Safety Board",
    safeHealth: "Safety Management",
    workerParticipation: "Worker Participation",
  },

  homeScreen: {
    orgName: "KS Industrial Safety Association",
    header: {
      qrScan: "QR Scan",
      notification: "Notifications",
      language: "Language",
    },
    greeting: {
      message: "Have a safe day today!",
      name: "{{name}},",
    },
    role: {
      admin: "Admin",
      worker: "Worker",
    },
    devToggle: {
      eduBanner: "Edu Banner",
    },
    board: {
      title: "Safety Board",
      viewMore: "View More",
      tabs: {
        all: "All",
        company: "Company",
        workplace: "Workplace",
      },
    },
    edu: {
      title: "Join Existing Education/Presentation",
      description: "An education/presentation room already exists.",
    },
    banner: {
      text: "Safe Working Environment with K-SAFEONE",
    },
    aiRiskBanner: {
      title: "AI Hazard Analysis",
      description: "Analyze hazards and generate reports via camera",
      action: "Go",
    },
    footer: {
      homepage: "Homepage",
      privacy: "Privacy Policy",
      terms: "Terms of Service",
      copyright: "Copyright © KS Industrial Safety Association all rights reserved.",
      webViewLoading: "Connecting to",
      webViewLoadingWait: "Please wait a moment",
      webViewClose: "Close",
    },
    grid: {
      interpret: { label: "1:1 Interpretation", sub: "Real-time interpretation" },
      chatbot: { label: "AI Safety Chatbot", sub: "Safety Q&A / Consultation" },
      translate: { label: "Multilingual Translation", sub: "Language translation" },
      education: { label: "Education/\nPresentation", sub: "Present educational materials" },
      eduJoin: { label: "Join Education", sub: "Join education/presentation" },
      tbmJoin: { label: "Join TBM", sub: "Join safety inspection meeting" },
      patrol: { label: "Site Patrol", sub: "Patrol and record" },
      tbmCreate: { label: "TBM View/Create", sub: "View/Create TBM" },
      tbmReport: { label: "TBM Report", sub: "View TBM report" },
      hazard: { label: "Hazard Areas", sub: "View hazard areas" },
      suggestion: { label: "Improvement Proposals", sub: "Submit improvement proposals" },
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
    title: "Safety Board",
    alertButton: "Send Alert",
    workplaceLabel: "Selected Workplace",
    workplaceModal: {
      title: "Select Workplace",
    },
    badge: {
      companyWide: "Company-wide",
      workplace: "Workplace",
      draft: "Draft",
      archived: "Archived",
    },
    tabs: {
      all: "Safety Board",
      myPosts: "My Posts",
    },
    empty: "No posts found",
    write: "Write",
    draftSaved: "Post saved as draft.",
  },

  safeBoardDetailScreen: {
    title: "Post Detail",
    authorLabel: "Author",
    editButton: "Edit",
    alertOn: "Alert ON",
    alertOff: "Alert OFF",
    publishButton: "Publish",
    deleteButton: "Delete",
    publishModal: {
      title: "Publish Post",
      message:
        "Are you sure you want to publish this post?\nIt will be visible to workplace members.",
      cancel: "Cancel",
      confirm: "Publish",
    },
    deleteModal: {
      title: "Delete Post",
      message: "Are you sure you want to delete this post?\nDeleted posts cannot be recovered.",
      cancel: "Cancel",
      confirm: "Delete",
    },
  },

  safeBoardCreateScreen: {
    title: "Write Post",
    guide: {
      title: "Writing Guide",
      description:
        "Please write clear and accurate content. Posts should be related to workplace safety.",
    },
    workplace: {
      label: "Workplace",
      placeholder: "Select workplace",
      helper: "Please select the workplace to post in.",
    },
    postTitle: {
      label: "Post Title",
      placeholder: "Enter announcement title.",
      helper: "Up to 80 characters.",
    },
    content: {
      label: "Post Content",
      placeholder: "Enter the detailed content to deliver to the site.",
      helper: "Up to 4,000 characters.",
    },
    attachment: {
      label: "Attachments",
      card1Text: "(Optional) You can upload\nfiles up to 50MB.",
      uploadButton: "Upload File",
      noFile: "No files selected.",
    },
    pushNotification: {
      label: "Send Push Notification",
      cardText:
        "When selected, a push notification will be sent to all members of the selected workplace upon posting.",
    },
    save: "Save",
  },

  safeBoardNotifyScreen: {
    title: "Send Workplace Push Notification",
    guide: {
      title: "Writing Guide",
      description:
        "Select one or more workplaces you manage\nand write a notification to deliver\nto site members.",
    },
    workplace: {
      label: "Select Workplace",
      helper: "Sending to {{selected}} of {{total}} workplaces",
    },
    notifyTitle: {
      label: "Notification Title",
      placeholder: "Enter a brief title.",
      helper: "Up to 50 characters.",
    },
    content: {
      label: "Push Notification Content",
      placeholder: "Enter the notification message to deliver to this workplace.",
      helper: "Up to 240 characters.",
    },
    send: "Send Notification",
    sendSuccess: "Notification sent.",
  },

  safeHealthScreen: {
    title: "Safety Management",
    menu: {
      patrol: { title: "Site Patrol Inspection", description: "Register site patrol inspection" },
      educationMaterial: {
        title: "Educational Materials",
        description: "View and register educational materials",
      },
      tbmManage: {
        title: "TBM Management/Create",
        description: "Manage and create TBM activities",
      },
      tbmReport: { title: "TBM Report View", description: "Check report status and download PDF" },
      tbmJoin: { title: "Join TBM", description: "Join another supervisor's safety meeting" },
      tbmHistory: { title: "TBM History", description: "View past TBM meeting history" },
      tbmJoinWorker: { title: "Join TBM", description: "Join another supervisor's safety meeting" },
      statusView: { title: "Status View", description: "Check ongoing TBM status" },
    },
  },

  workerParticipationScreen: {
    title: "Worker Participation",
    menu: {
      hazard: { title: "Hazard Areas", description: "Register hazard area" },
      suggestion: { title: "Improvement Proposals", description: "Submit improvement proposal" },
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
    title: "Industrial Safety AI Assistant",
    aiName: "Industrial Safety AI Assistant",
    welcomeMessage:
      "Hello! I am the Industrial Safety AI Assistant.\nIf you have any questions about construction site safety, feel free to ask anytime.",
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
    logout: "Log Out",
    logoutModal: {
      title: "Log Out",
      message: "Are you sure you want to log out?",
      cancel: "Cancel",
      confirm: "Log Out",
    },
  },

  languageSettings: {
    languageTitle: "Language",
    languageDescription: "Switch the app language instantly.",
    languageChangeSuccess: "Language changed to {{language}}.",
    languageChangeRestart:
      "Language changed to {{language}}.\nThe app will restart to apply the update.",
    languageChangeError: "Unable to change language. Please try again.",
    languageNames: {
      "en": "English",
      "ko": "Korean",
      "zh": "Chinese",
      "zh-Hans": "Chinese (Simplified)",
      "zh-Hant": "Chinese (Traditional)",
      "yue": "Cantonese",
      "pt": "Portuguese",
      "pt-BR": "Portuguese (Brazil)",
      "ja": "Japanese",
      "es": "Spanish",
      "fr": "French",
      "de": "German",
      "it": "Italian",
      "ru": "Russian",
      "ar": "Arabic",
      "hi": "Hindi",
      "ta": "Tamil",
      "te": "Telugu",
      "th": "Thai",
      "uk": "Ukrainian",
      "vi": "Vietnamese",
      "id": "Indonesian",
      "km": "Khmer",
      "ur": "Urdu",
      "ne": "Nepali",
      "lo": "Lao",
      "my": "Burmese",
    },
  },

  notify: {
    title: "Notifications",
    emptyTitle: "No Notifications",
    emptyDescription:
      "You have no notifications right now.\nWe'll let you know when new notifications arrive.",
    mock: {
      boardNewPost: {
        title: "A new post has been written on the board.",
        description: "Check the board of your affiliated workplace!",
      },
    },
  },

  qrScanner: {
    title: "Join Education/Presentation",
    description: "Scan the QR code or enter the code shared by the presenter to join the meeting.",
    permissionRequired: "Camera permission is required to scan the QR code.",
    retry: "Try Again",
    languageLabel: "Language",
    currentLanguage: "Korean",
    enterCode:
      "Having trouble with the camera? You can enter the education/presentation code directly.",
    enterCodeDescription: "Enter the 8-digit numeric code shared by the presenter.",
    joinMeeting: "Join Meeting",
    codePlaceholder: "Enter code",
  },

  imageTranslationScreen: {
    title: "Image Translation",
    selectImage: "Select Image to Translate",
    selectImageDesc: "Press the button below to select an image to translate.",
    languageLabel: "Select translation language",
    languageMenu: {
      title: "Select Language",
    },
    cameraButton: "Take Photo with Camera",
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
      korean: "(Korean)",
      english: "",
      chineseSimplified: "(Simplified Chinese)",
      chineseTraditional: "(Traditional Chinese)",
      russian: "(Russian)",
      vietnamese: "(Vietnamese)",
      indonesian: "(Indonesian)",
      khmer: "(Khmer)",
      thai: "(Thai)",
      urdu: "(Urdu)",
      nepali: "(Nepali)",
      lao: "(Lao)",
      japanese: "(Japanese)",
      french: "(French)",
      spanish: "(Spanish)",
    },
  },

  educationPresentationScreen: {
    title: "Education/Presentation",
    inviteButton: "Invite",
    inputLanguageLabel: "Input Language",
    languageMenu: { title: "Select Language" },
    recognizing: "Recognizing voice...",
    statusMicOff: "Please allow microphone access to record training notes.",
    statusMicOn: "Receiving live messages.",
    micOnLabel: "Mic Off",
    micOffLabel: "Mic On",
    inputHint: "Write your message",
    inputPlaceholder: "Enter message...",
    validationError: "Please enter a message.",
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
      english: "(English)",
      chineseSimplified: "(Simplified Chinese)",
      chineseTraditional: "(Traditional Chinese)",
      russian: "(Russian)",
      vietnamese: "(Vietnamese)",
      indonesian: "(Indonesian)",
      khmer: "(Khmer)",
      thai: "(Thai)",
      urdu: "(Urdu)",
      nepali: "(Nepali)",
      lao: "(Lao)",
      japanese: "(Japanese)",
      french: "(French)",
      spanish: "(Spanish)",
    },
  },

  textTranslationScreen: {
    title: "Text Translation",
    fontSizeButton: "AA",
    languageMenu: {
      title: "Select Language",
    },
    listening: "Listening...",
    inputPlaceholder: "Enter text to translate",
    inputHint: "Up to 1,000 characters",
    translateButton: "Translate",
    validationError: "ⓘ Please enter at least one character.",
    speakButton: "Speak",
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
      english: "(English)",
      chineseSimplified: "(Simplified Chinese)",
      chineseTraditional: "(Traditional Chinese)",
      russian: "(Russian)",
      vietnamese: "(Vietnamese)",
      indonesian: "(Indonesian)",
      khmer: "(Khmer)",
      thai: "(Thai)",
      urdu: "(Urdu)",
      nepali: "(Nepali)",
      lao: "(Lao)",
      japanese: "(Japanese)",
      french: "(French)",
      spanish: "(Spanish)",
    },
  },

  tbmListScreen: {
    title: "TBM Activity List",
    tabs: {
      all: "All",
      drafting: "Drafting",
      ongoing: "Ongoing",
      ended: "Ended",
    },
    status: {
      drafting: "Drafting",
      ongoing: "Ongoing",
      ended: "Ended",
    },
    participants: "{{count}} participant(s)",
    fab: "New Activity",
    empty: {
      drafting: "No drafting TBMs.",
      ongoing: "No ongoing TBMs.",
      ended: "No ended TBMs.",
      all: "No TBM activities.",
    },
  },

  tbmJoinInfoScreen: {
    title: "Join TBM",
    sectionInfo: "TBM Information",
    activityName: "Activity",
    manager: "Manager",
    date: "Date",
    sectionAttachments: "Attachments",
    noAttachments: "No attachments.",
    prev: "Previous",
    next: "Next",
  },

  tbmJoinHealthScreen: {
    title: "Join TBM",
    heading: "Health Check",
    prompt:
      "Please confirm if you consumed excessive alcohol the day before or have any health issues today.",
    statusGood: "No Issues",
    statusBad: "Issues Present",
    prev: "Previous",
    next: "Next",
    toastMessage: "Please select your health status before proceeding.",
    notAllCheckedModal: {
      title: "Please select your health status.",
      message: "You must select either No Issues or Issues Present to proceed.",
      confirm: "OK",
    },
  },

  tbmJoinSignScreen: {
    title: "Join TBM",
    heading: "Electronic Signature",
    description: "Please sign in the area below.",
    signatureArea: "Sign here",
    clearLabel: "Reset Signature",
    prev: "Previous",
    next: "Next",
    noSignatureModal: {
      title: "Signature required.",
      message: "Please complete your signature before proceeding.",
      confirm: "OK",
    },
  },

  tbmJoinCompleteScreen: {
    title: "Join TBM",
    heading: "TBM Participation Complete",
    subtitle: "Have a safe day!",
    goHome: "Complete",
  },

  tbmJoinScreen: {
    title: "Join TBM",
    selectPrompt: "Please select a TBM to join",
    empty: {
      title: "No TBM in progress.",
      subtitle: "There are no TBM sessions available to join.",
    },
    prev: "Previous",
    next: "Next",
    noSelectionModal: {
      title: "No session selected.",
      message: "Please select a TBM session to join.",
      confirm: "OK",
    },
    infoModal: {
      title: "TBM Guide",
      meaning: {
        heading: "What is TBM?",
        body: "TBM stands for Tool Box Meeting — a brief pre-work safety briefing where the day's tasks, hazards, and safety measures are reviewed together.",
      },
      importance: {
        heading: "Why TBM Matters",
        body: "TBM is a critical step to prevent accidents by sharing hazards in advance, clarifying roles, and checking that personal protective equipment is properly worn.",
      },
      procedure: {
        heading: "How It Works",
        step1: "Confirm today's work scope and participants.",
        step2: "Share key hazards and safety measures.",
        step3: "Check worker health, protective equipment, and any site changes.",
        step4: "Review the content, then complete TBM participation and sign off.",
      },
      close: "Close",
    },
  },

  tbmReportScreen: {
    title: "TBM Report Generation",
    notice: {
      description:
        " ·  Education logs can only be created for TBM activities in progress.\n ·  Completing the education log will automatically end the TBM activity.\n ·  At least one site photo must be attached.",
    },
    activityName: {
      label: "TBM Activity",
    },
    processName: {
      label: "Process Name",
      placeholder: "Enter process name (optional)",
      helper: "Optional. Up to 50 characters.",
    },
    teamName: {
      label: "Team / Unit Name",
      placeholder: "Enter team or unit name (optional)",
      helper: "Optional. Up to 50 characters.",
    },
    educationSummary: {
      label: "Education Content Summary",
      placeholder: "Write the key content covered in today's education",
      helper: "Between 10 and 1,000 characters.",
    },
    specialNotes: {
      label: "Special Notes (optional)",
      placeholder: "Enter any special notes or announcements to share",
      helper: "Up to 500 characters.",
    },
    sitePhotos: {
      label: "Site Photos",
      addButton: "Add Photo",
      guide:
        "At least 1 site photo must be registered.\nYou can attach a minimum of 1 and a maximum of 5 photos.",
      preview: "A preview will be shown when you add an image.",
    },
    submit: "Save",
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
    title: "TBM Activity Detail",
    workDate: "Work Date:  {{date}}",
    activityLabel: "Activity Content",
    educationHeader: "Education Materials ({{count}})",
    startActivity: "Start Activity",
    edit: "Edit",
    delete: "Delete",
    participantEmpty: "No participants.",
    toastStarted: "TBM activity has started.",
    endActivity: "End TBM and Generate Report",
    participantHeader: "Participants ({{count}})",
    badgeNormal: "Normal",
    badgeCaution: "Caution",
    badgeDanger: "Danger",
    deleteModal: {
      title: "Delete TBM Activity",
      message: "Are you sure you want to delete this TBM activity?",
      cancel: "Cancel",
      confirm: "Delete",
    },
    startModal: {
      title: "Start TBM Activity",
      message:
        "Are you sure you want to start this TBM activity?\nStatus will change to 'In Progress'.",
      cancel: "Cancel",
      confirm: "Start",
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
      sectionTitle: "Processing Result",
      reflected: "Reflected",
      rejected: "Not Reflected",
      dateLabel: "Processed on:",
    },
    alreadyProcessed: "This proposal has already been processed.",
    saveProcessingMessage: "Processing notes have been saved.",
    workerNoEditMessage: "Proposals in progress or already processed cannot be edited or deleted.",
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
      ongoingMessage: "Available when a completed or rejected status is selected.",
      rejectedInputLabel: "Reason for Rejection",
      rejectedProcessingPlaceholder: "Please describe the reason for rejection in detail.",
      processingPlaceholder:
        "Please describe the action taken in detail. (e.g., Equipment team review completed and arrangement done)",
    },
    history: {
      sectionTitle: "Status Change History",
      registeredTitle: "Proposal Registered",
      registeredDesc: "Proposal has been received.",
      ongoingTitle: "In Progress",
      ongoingChangeTitle: "Status Changed to In Progress",
      ongoingDesc: "Proposal review has started.",
      reflectedTitle: "Reflected",
      reflectedChangeTitle: "Reflected Processing",
      reflectedDesc: "Proposal has been reflected.",
      rejectedTitle: "Not Reflected",
      rejectedChangeTitle: "Not Reflected Processing",
      rejectedDesc: "Proposal could not be reflected.",
      proceedNote: "Manager assigned -",
      reflectedNote: "Processed as reflected -",
      rejectedNote: "Processed as not reflected -",
    },
    editForm: {
      label: "Details",
      required: " *",
      helper: "You can write up to 2,000 characters.",
      errorMaxLength: "Please enter details within 2,000 characters.",
    },
    edit: "Edit",
    delete: "Delete",
    proceed: "Proceed",
    saveProceeded: "Save Processing Notes",
    proceedStartedMessage: "Processing has started.",
    cancel: "Cancel",
    save: "Save",
    savedMessage: "Proposal has been updated.",
    deletedMessage: "Proposal has been deleted.",
    deleteModal: {
      title: "Delete Proposal",
      message:
        "Are you sure you want to delete this proposal?\nDeleted proposals cannot be recovered.",
      cancel: "Cancel",
      confirm: "Delete",
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
    submitting: "Submitting...",
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
    title: "TBM Report Inquiry",
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
    title: "Workplace Patrol Inspection",
    createButton: "New Inspection",
    workplaceSelector: {
      label: "Selected Workplace",
      modalTitle: "Select a workplace to view the inspection list.",
    },
    badge: {
      underReview: "In Review",
      inProgress: "Drafting",
      approved: "Approved",
    },
    card: {
      reviewer: "Reviewer",
      approver: "Approver",
    },
  },
  patrolDetailScreen: {
    title: "Inspection Detail",
    editButton: "Edit",
    summaryCard: {
      title: "Inspection Summary",
      total: "Total",
      good: "Good",
      bad: "Bad",
    },
    detailCard: {
      overallActions: "Overall Action Items",
      inspectionItems: "Inspection Items",
      checkItem: {
        goodBadge: "Good",
        badBadge: "Bad",
        actionLabel: "Action",
      },
    },
    buttons: {
      submit: "Submit",
      editComplete: "Edit Complete",
      reviewComplete: "Review Complete",
      approve: "Approve",
      recall: "Recall",
      delete: "Delete",
      reportPreview: "Report Preview",
    },
  },
  patrolCreateScreen: {
    title: "Create Patrol Inspection",
    section: {
      approver: {
        title: "Approver (Required)",
        placeholder: "Select Approver",
        description: "You can select an approver from the administrator list.",
      },
      reviewer: {
        title: "Reviewer (Optional)",
        placeholder: "Select Reviewer",
        description: "You can select a reviewer from the administrator list (optional).",
      },
      items: {
        title: "Inspection Items (Required)",
        placeholder: "Select Template",
        addButton: "Add Item",
        itemNamePlaceholder: "Item Name",
        itemNameDescription: "Example: General, Electrical, Gas, etc. / Enter 1~100 characters",
        deleteButton: "Delete",
        addCheckButton: "Add Inspection Detail",
        checkTitle: "Inspection Detail (Required)",
        checkNamePlaceholder: "Inspection detail name",
        checkDescription: "Example: Tidiness and cleanliness of workplace / Enter 1~200 characters",
        goodButton: "Good",
        badButton: "Bad",
        badNotePlaceholder: "Enter reason for bad status",
        deleteCheckButton: "Delete Inspection Detail",
      },
      requirements: {
        title: "Overall Action Requirements",
        placeholder: "Overall action requirements / opinions",
        description:
          "You can enter overall action requirements. Please enter within 1,000 characters.",
      },
    },
    submitButton: "Submit Inspection",
    successModal: {
      title: "Success",
      message: "The inspection has been successfully created.",
      confirmButton: "Confirm",
    },
    modal: {
      userTitle: "Select User",
      templateTitle: "Select Template",
      cancelButton: "Cancel",
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
    title: "Hazard Report",
    guide: {
      title: "Writing Guide",
      description:
        "Please report hazardous elements found on site. Providing accurate location and risk factors enables prompt action.",
    },
    workplace: {
      label: "Workplace",
      placeholder: "Select a workplace",
      modalTitle: "Select a Workplace",
      helper: "You can select a workplace from the list.",
    },
    location: {
      label: "Location",
      placeholder: "e.g., 2F east corridor, entrance to Zone B workshop",
      helper: "Up to 200 characters.",
    },
    hazardFactor: {
      label: "Hazard Factor",
      placeholder:
        "What hazard factors are there?\nExamples:\n · The stair railing is loose, posing a fall risk.\n · Exposed wires create an electrocution hazard.",
      helper: "Up to 1,000 characters.",
    },
    sitePhotos: {
      label: "Site Photos",
      addButton: "Add Photo",
      modalTitle: "Select Photo Method",
      camera: "Take with Camera",
      album: "Choose from Album",
      hint: "Please add photos that clearly show the site conditions.",
      guide:
        "At least 1 site photo must be registered.\nYou can attach a minimum of 1 and a maximum of 5 photos.",
      preview: "A preview will be shown when you add an image.",
    },
    submit: "Submit",
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
      sitePhotosLabel: "Site Photos",
      sitePhotosHints: {
        hint1: "Please add photos that clearly show the site conditions.",
        hint2: "Adding site photos after action can clearly communicate the results.",
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
      title: "Status History",
      titles: {
        pending: "Report Registered",
        completed: "Action Completed",
        impossible: "Action Impossible",
      },
      contents: {
        pending: "The report has been received.",
        completed: "The action has been completed.",
        impossible: "The action has been processed as impossible.",
        adminSuffix: " - Admin ({{name}})",
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

  ...demoEn,
}

export default en
export type Translations = typeof en
