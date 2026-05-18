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
    footer: {
      homepage: "Homepage",
      privacy: "Privacy Policy",
      terms: "Terms of Service",
    },
    grid: {
      interpret: { label: "1:1 Interpretation", sub: "Real-time interpretation" },
      chatbot: { label: "AI Safety Chatbot", sub: "Safety Q&A / Consultation" },
      translate: { label: "Multilingual Translation", sub: "Language translation" },
      education: { label: "Education/Presentation", sub: "Present educational materials" },
      eduJoin: { label: "Join Education", sub: "Join education/presentation" },
      tbmJoin: { label: "Join TBM", sub: "Join safety inspection meeting" },
      patrol: { label: "Site Patrol", sub: "Patrol and record" },
      tbmCreate: { label: "TBM View/Create", sub: "View/Create TBM" },
      tbmReport: { label: "TBM Report", sub: "View TBM report" },
      hazard: { label: "Hazard Areas", sub: "View hazard areas" },
      suggestion: { label: "Improvement Proposals", sub: "Submit improvement proposals" },
    },
  },

  safeBoardScreen: {
    title: "Safety Board",
    alertButton: "Send Alert",
    workplaceLabel: "Selected Workplace",
    tabs: {
      all: "Safety Board",
      myPosts: "My Posts",
    },
    empty: "No posts found",
    write: "Write",
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
  },

  languageSettings: {
    title: "Language Settings",
    description: "Change the app language right away.",
    changedTitle: "Language Settings",
    changedDescription:
      "The language has been changed to {{language}}.\nThe app will restart to apply the changes.",
    confirm: "Confirm",
    languages: {
      ko: "Korean (한국어)",
      en: "English",
      zhHans: "Simplified Chinese (简体中文)",
      zhHant: "Traditional Chinese (繁體中文)",
      ru: "Russian (Русский)",
      vi: "Vietnamese (Tiếng Việt)",
      id: "Indonesian (Bahasa Indonesia)",
      km: "Khmer (ភាសាខ្មែរ)",
      th: "Thai (ไทย)",
      ur: "Urdu (اردو)",
      ne: "Nepali (नेपाली)",
      lo: "Lao (ພາສາລາວ)",
    },
  },

  notify: {
    title: "Notifications",
    emptyTitle: "No Notifications",
    emptyDescription:
      "You have no notifications right now.\nWe'll let you know when new notifications arrive.",
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

  ...demoEn,
}

export default en
export type Translations = typeof en
