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
    passwordFieldPlaceholder: "Super secret password here",
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

  ...demoEn,
}

export default en
export type Translations = typeof en
