import demoHi from "./demo-hi"
import { Translations } from "./en"

const hi: Translations = {
  common: {
    ok: "ठीक है!",
    cancel: "रद्द करें",
    back: "वापस",
    logOut: "लॉग आउट",
  },
  welcomeScreen: {
    postscript:
      "psst - शायद आपका ऐप ऐसा नहीं दिखता है। (जब तक कि आपके डिजाइनर ने आपको ये स्क्रीन नहीं दी हों, और उस स्थिति में, इसे लॉन्च करें!)",
    readyForLaunch: "आपका ऐप, लगभग लॉन्च के लिए तैयार है!",
    exciting: "(ओह, यह रोमांचक है!)",
    letsGo: "चलो चलते हैं!",
  },
  errorScreen: {
    title: "कुछ गलत हो गया!",
    friendlySubtitle:
      "यह वह स्क्रीन है जो आपके उपयोगकर्ता संचालन में देखेंगे जब कोई त्रुटि होगी। आप इस संदेश को बदलना चाहेंगे (जो `app/i18n/hi.ts` में स्थित है) और शायद लेआउट भी (`app/screens/ErrorScreen`)। यदि आप इसे पूरी तरह से हटाना चाहते हैं, तो `app/app.tsx` में <ErrorBoundary> कंपोनेंट की जांच करें।",
    reset: "ऐप रीसेट करें",
    traceTitle: "%{name} स्टैक से त्रुटि",
  },
  emptyStateComponent: {
    generic: {
      heading: "इतना खाली... इतना उदास",
      content: "अभी तक कोई डेटा नहीं मिला। रीफ्रेश करने या ऐप को पुनः लोड करने के लिए बटन दबाएं।",
      button: "चलो फिर से कोशिश करते हैं",
    },
  },

  errors: {
    invalidEmail: "अमान्य ईमेल पता।",
  },
  loginScreen: {
    logIn: "लॉग इन करें",
    tagline: "Safety Partner for the Workplace",
    enterDetails:
      "सर्वश्रेष्ठ रहस्य पता करने के लिए नीचे अपना विवरण दर्ज करें। आप कभी अनुमान नहीं लगा पाएंगे कि हमारे पास क्या इंतजार कर रहा है। या शायद आप कर सकते हैं; यह रॉकेट साइंस नहीं है।",
    emailFieldLabel: "ईमेल",
    passwordFieldLabel: "पासवर्ड",
    emailFieldPlaceholder: "अपना ईमेल पता दर्ज करें",
    passwordFieldPlaceholder: "अपना पासवर्ड दर्ज करें",
    tapToLogIn: "लॉग इन करने के लिए टैप करें!",
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
  },
  demoNavigator: {
    componentsTab: "कंपोनेंट्स",
    debugTab: "डीबग",
    communityTab: "समुदाय",
    podcastListTab: "पॉडकास्ट",
  },
  demoCommunityScreen: {
    title: "समुदाय से जुड़ें",
    tagLine:
      "Infinite Red के React Native इंजीनियरों के समुदाय से जुड़ें और हमारे साथ अपने ऐप विकास को बेहतर बनाएं!",
    joinUsOnSlackTitle: "Slack पर हमसे जुड़ें",
    joinUsOnSlack:
      "क्या आप चाहते हैं कि दुनिया भर के React Native इंजीनियरों से जुड़ने के लिए कोई जगह हो? Infinite Red Community Slack में बातचीत में शामिल हों! हमारा बढ़ता हुआ समुदाय प्रश्न पूछने, दूसरों से सीखने और अपने नेटवर्क को बढ़ाने के लिए एक सुरक्षित स्थान है।",
    joinSlackLink: "Slack समुदाय में शामिल हों",
    makeIgniteEvenBetterTitle: "Ignite को और बेहतर बनाएं",
    makeIgniteEvenBetter:
      "Ignite को और बेहतर बनाने का कोई विचार है? हमें यह सुनकर खुशी होगी! हम हमेशा ऐसे लोगों की तलाश में रहते हैं जो हमें सर्वश्रेष्ठ React Native टूलिंग बनाने में मदद करना चाहते हैं। Ignite के भविष्य को बनाने में हमारे साथ शामिल होने के लिए GitHub पर हमसे जुड़ें।",
    contributeToIgniteLink: "Ignite में योगदान दें",
    theLatestInReactNativeTitle: "React Native में नवीनतम",
    theLatestInReactNative: "हम आपको React Native के सभी प्रस्तावों पर अपडेट रखने के लिए यहां हैं।",
    reactNativeRadioLink: "React Native रेडियो",
    reactNativeNewsletterLink: "React Native न्यूजलेटर",
    reactNativeLiveLink: "React Native लाइव",
    chainReactConferenceLink: "Chain React कॉन्फ्रेंस",
    hireUsTitle: "अपने अगले प्रोजेक्ट के लिए Infinite Red को काम पर रखें",
    hireUs:
      "चाहे वह एक पूरा प्रोजेक्ट चलाना हो या हमारे हैंड्स-ऑन प्रशिक्षण के साथ टीमों को गति देना हो, Infinite Red लगभग किसी भी React Native प्रोजेक्ट में मदद कर सकता है।",
    hireUsLink: "हमें एक संदेश भेजें",
  },
  demoShowroomScreen: {
    jumpStart: "अपने प्रोजेक्ट को जंप स्टार्ट करने के लिए कंपोनेंट्स!",
    lorem2Sentences:
      "कोई भी काम जो आप नहीं करना चाहते, उसे करने के लिए किसी और को ढूंढना चाहिए। जो लोग दूसरों की मदद करते हैं, वे खुद की भी मदद करते हैं।",
    demoHeaderTxExample: "हाँ",
    demoViaTxProp: "`tx` प्रॉप के माध्यम से",
    demoViaSpecifiedTxProp: "`{{prop}}Tx` प्रॉप के माध्यम से",
  },
  demoDebugScreen: {
    howTo: "कैसे करें",
    title: "डीबग",
    tagLine:
      "बधाई हो, आपके पास यहां एक बहुत उन्नत React Native ऐप टेम्पलेट है। इस बॉयलरप्लेट का लाभ उठाएं!",
    reactotron: "Reactotron को भेजें",
    reportBugs: "बग्स की रिपोर्ट करें",
    demoList: "डेमो सूची",
    demoPodcastList: "डेमो पॉडकास्ट सूची",
    androidReactotronHint:
      "यदि यह काम नहीं करता है, तो सुनिश्चित करें कि Reactotron डेस्कटॉप ऐप चल रहा है, अपने टर्मिनल से adb reverse tcp:9090 tcp:9090 चलाएं, और ऐप को पुनः लोड करें।",
    iosReactotronHint:
      "यदि यह काम नहीं करता है, तो सुनिश्चित करें कि Reactotron डेस्कटॉप ऐप चल रहा है और ऐप को पुनः लोड करें।",
    macosReactotronHint:
      "यदि यह काम नहीं करता है, तो सुनिश्चित करें कि Reactotron डेस्कटॉप ऐप चल रहा है और ऐप को पुनः लोड करें।",
    webReactotronHint:
      "यदि यह काम नहीं करता है, तो सुनिश्चित करें कि Reactotron डेस्कटॉप ऐप चल रहा है और ऐप को पुनः लोड करें।",
    windowsReactotronHint:
      "यदि यह काम नहीं करता है, तो सुनिश्चित करें कि Reactotron डेस्कटॉप ऐप चल रहा है और ऐप को पुनः लोड करें।",
  },
  demoPodcastListScreen: {
    title: "React Native रेडियो एपिसोड",
    onlyFavorites: "केवल पसंदीदा दिखाएं",
    favoriteButton: "पसंदीदा",
    unfavoriteButton: "नापसंद",
    accessibility: {
      cardHint:
        "एपिसोड सुनने के लिए डबल टैप करें। इस एपिसोड को {{action}} करने के लिए डबल टैप करें और होल्ड करें।",
      switch: "केवल पसंदीदा दिखाने के लिए स्विच करें",
      favoriteAction: "पसंदीदा टॉगल करें",
      favoriteIcon: "एपिसोड पसंदीदा नहीं है",
      unfavoriteIcon: "एपिसोड पसंदीदा है",
      publishLabel: "{{date}} को प्रकाशित",
      durationLabel: "अवधि: {{hours}} घंटे {{minutes}} मिनट {{seconds}} सेकंड",
    },
    noFavoritesEmptyState: {
      heading: "यह थोड़ा खाली लगता है",
      content:
        "अभी तक कोई पसंदीदा नहीं जोड़ा गया है। इसे अपने पसंदीदा में जोड़ने के लिए किसी एपिसोड पर दिल पर टैप करें!",
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
      empty: "कोई पोस्ट उपलब्ध नहीं है।",
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
    allWorkplaces: "All Workplaces",
    workplaceModal: { title: "Select Workplace", allOption: "All" },
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
    title: "मेरा पृष्ठ",
    orgName: "KS औद्योगिक सुरक्षा संघ",
    workplace: {
      label: "कार्यस्थल",
    },
    permissions: {
      sectionTitle: "ऐप अनुमति",
      camera: {
        title: "कैमरा",
        description: "QR स्कैन, AI अनुवाद फोटो, जोखिम आपातकाल रिकॉर्डिंग",
        button: "अनुमति दें",
      },
      microphone: {
        title: "माइक्रोफ़ोन",
        description: "वॉयस अनुवाद, रेडियो कॉल, वॉयस पहचान",
        button: "अनुमति दें",
      },
      photo: {
        title: "फोटो/लाइब्रेरी",
        description: "AI जोखिम मूल्यांकन, छवि अनुवाद, TBM प्रशिक्षण सामग्री/रिपोर्ट",
        button: "अनुमति दें",
      },
      notification: {
        title: "पुश नोटिफिकेशन",
        description: "TBM अलर्ट, जोखिम चेतावनी, कार्यस्थल नोटिस",
      },
    },
    logout: "लॉग आउट",
    logoutModal: {
      title: "Log Out",
      message: "Are you sure you want to log out?",
      cancel: "Cancel",
      confirm: "Log Out",
    },
  },

  languageSettings: {
    title: "भाषा सेटिंग्स",
    description: "ऐप की भाषा तुरंत बदलें।",
    changedTitle: "भाषा सेटिंग्स",
    changedDescription:
      "भाषा को {{language}} में बदल दिया गया है।\nपरिवर्तन लागू करने के लिए ऐप पुनः प्रारंभ होगा।",
    confirm: "पुष्टि करें",
    languages: {
      ko: "कोरियाई (한국어)",
      en: "अंग्रेजी (English)",
      zhHans: "सरलीकृत चीनी (简体中文)",
      zhHant: "परंपरागत चीनी (繁體中文)",
      ru: "रूसी (Русский)",
      vi: "वियतनामी (Tiếng Việt)",
      id: "इंडोनेशियाई (Bahasa Indonesia)",
      km: "खमेर (ភាសាខ្មែរ)",
      th: "थाई (ไทย)",
      ur: "उर्दू (اردو)",
      ne: "नेपाली (नेपाली)",
      lo: "लाओ (ພາສາລາວ)",
    },
  },

  notify: {
    title: "सूचनाएं",
    emptyTitle: "कोई सूचना नहीं",
    emptyDescription: "अभी कोई सूचना नहीं है।\nजब नई सूचनाएं आएंगी तो हम आपको बताएंगे।",
    mock: {
      boardNewPost: {
        title: "A new post has been written on the board.",
        description: "Check the board of your affiliated workplace!",
      },
    },
  },

  qrScanner: {
    title: "शिक्षा/प्रस्तुति में शामिल हों",
    description:
      "QR कोड स्कैन करें या प्रस्तुतकर्ता द्वारा साझा किए गए कोड को दर्ज करके मीटिंग में शामिल हों।",
    permissionRequired: "QR कोड स्कैन करने के लिए कैमरा अनुमति आवश्यक है।",
    retry: "पुनः प्रयास करें",
    languageLabel: "भाषा",
    currentLanguage: "कोरियाई",
    enterCode: "कैमरे में परेशानी हो रही है? आप शिक्षा/प्रस्तुति कोड सीधे दर्ज कर सकते हैं।",
    enterCodeDescription: "प्रस्तुतकर्ता द्वारा साझा किया गया 8 अंकों का संख्यात्मक कोड दर्ज करें।",
    joinMeeting: "मीटिंग में शामिल हों",
    codePlaceholder: "कोड दर्ज करें",
  },

  imageTranslationScreen: {
    title: "छवि अनुवाद",
    selectImage: "अनुवाद के लिए छवि चुनें",
    selectImageDesc: "अनुवाद के लिए छवि चुनने के लिए नीचे दिए गए बटन को दबाएं।",
    languageLabel: "अनुवाद भाषा चुनें",
    languageMenu: {
      title: "भाषा चुनें",
    },
    cameraButton: "कैमरे से फोटो लें",
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
      korean: "(कोरियाई)",
      english: "(अंग्रेज़ी)",
      chineseSimplified: "(सरलीकृत चीनी)",
      chineseTraditional: "(पारंपरिक चीनी)",
      russian: "(रूसी)",
      vietnamese: "(वियतनामी)",
      indonesian: "(इंडोनेशियाई)",
      khmer: "(खमेर)",
      thai: "(थाई)",
      urdu: "(उर्दू)",
      nepali: "",
      lao: "(लाओ)",
      japanese: "(जापानी)",
      french: "(फ्रेंच)",
      spanish: "(स्पेनिश)",
    },
  },

  educationPresentationScreen: {
    title: "교육/발표",
    inviteButton: "초대",
    inputLanguageLabel: "इनपुट भाषा",
    languageMenu: { title: "भाषा चुनें" },
    recognizing: "आवाज़ पहचान रही है...",
    statusMicOff: "नोट्स रिकॉर्ड करने के लिए माइक्रोफ़ोन एक्सेस की अनुमति दें।",
    statusMicOn: "लाइव संदेश प्राप्त हो रहे हैं।",
    micOnLabel: "माइक बंद करें",
    micOffLabel: "माइक चालू करें",
    inputHint: "अपना संदेश लिखें",
    inputPlaceholder: "संदेश दर्ज करें...",
    validationError: "कृपया एक संदेश दर्ज करें।",
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
      korean: "(कोरियाई)",
      english: "(अंग्रेज़ी)",
      chineseSimplified: "(सरलीकृत चीनी)",
      chineseTraditional: "(पारंपरिक चीनी)",
      russian: "(रूसी)",
      vietnamese: "(वियतनामी)",
      indonesian: "(इंडोनेशियाई)",
      khmer: "(खमेर)",
      thai: "(थाई)",
      urdu: "(उर्दू)",
      nepali: "",
      lao: "(लाओ)",
      japanese: "(जापानी)",
      french: "(फ्रेंच)",
      spanish: "(स्पेनिश)",
    },
  },

  textTranslationScreen: {
    title: "पाठ अनुवाद",
    fontSizeButton: "AA",
    languageMenu: {
      title: "भाषा चुनें",
    },
    listening: "सुन रहा है...",
    inputPlaceholder: "अनुवाद के लिए पाठ दर्ज करें",
    inputHint: "अधिकतम 1,000 अक्षर",
    translateButton: "अनुवाद करें",
    validationError: "ⓘ कृपया कम से कम एक अक्षर दर्ज करें।",
    speakButton: "बोलें",
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
      korean: "(कोरियाई)",
      english: "(अंग्रेज़ी)",
      chineseSimplified: "(सरलीकृत चीनी)",
      chineseTraditional: "(पारंपरिक चीनी)",
      russian: "(रूसी)",
      vietnamese: "(वियतनामी)",
      indonesian: "(इंडोनेशियाई)",
      khmer: "(खमेर)",
      thai: "(थाई)",
      urdu: "(उर्दू)",
      nepali: "",
      lao: "(लाओ)",
      japanese: "(जापानी)",
      french: "(फ्रेंच)",
      spanish: "(स्पेनिश)",
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
    title: "TBM में शामिल हों",
    sectionInfo: "TBM जानकारी",
    activityName: "गतिविधि का नाम",
    manager: "प्रबंधक",
    date: "तारीख",
    sectionAttachments: "संलग्नक",
    noAttachments: "कोई संलग्नक नहीं।",
    prev: "पिछला",
    next: "अगला",
  },

  tbmJoinHealthScreen: {
    title: "TBM में शामिल हों",
    heading: "स्वास्थ्य जांच",
    prompt:
      "कृपया पुष्टि करें कि क्या आपने पिछले दिन अत्यधिक शराब का सेवन किया था या आज आपको कोई स्वास्थ्य समस्या है।",
    statusGood: "कोई समस्या नहीं",
    statusBad: "समस्या है",
    prev: "पिछला",
    next: "अगला",
    toastMessage: "आगे बढ़ने से पहले कृपया अपनी स्वास्थ्य स्थिति चुनें।",
    notAllCheckedModal: {
      title: "कृपया अपनी स्वास्थ्य स्थिति चुनें।",
      message: "आगे बढ़ने के लिए कोई समस्या नहीं या समस्या है चुनना अनिवार्य है।",
      confirm: "ठीक है",
    },
  },

  tbmJoinSignScreen: {
    title: "TBM में शामिल हों",
    heading: "इलेक्ट्रॉनिक हस्ताक्षर",
    description: "कृपया नीचे दिए गए क्षेत्र में हस्ताक्षर करें।",
    signatureArea: "यहाँ हस्ताक्षर करें",
    clearLabel: "हस्ताक्षर रीसेट करें",
    prev: "पिछला",
    next: "अगला",
    noSignatureModal: {
      title: "हस्ताक्षर आवश्यक है।",
      message: "आगे बढ़ने से पहले कृपया अपना हस्ताक्षर पूरा करें।",
      confirm: "ठीक है",
    },
  },

  tbmJoinCompleteScreen: {
    title: "TBM में शामिल हों",
    heading: "TBM भागीदारी पूर्ण",
    subtitle: "आपका दिन सुरक्षित रहे!",
    goHome: "पूर्ण",
  },

  tbmJoinScreen: {
    title: "TBM में शामिल हों",
    selectPrompt: "कृपया शामिल होने के लिए एक TBM चुनें",
    empty: {
      title: "कोई TBM चल नहीं रहा है।",
      subtitle: "अभी शामिल होने के लिए कोई TBM सत्र उपलब्ध नहीं है।",
    },
    prev: "पिछला",
    next: "अगला",
    noSelectionModal: {
      title: "कोई सत्र चयनित नहीं है।",
      message: "कृपया शामिल होने के लिए एक TBM सत्र चुनें।",
      confirm: "ठीक है",
    },
    infoModal: {
      title: "TBM गाइड",
      meaning: {
        heading: "TBM क्या है?",
        body: "TBM का अर्थ है Tool Box Meeting — काम शुरू होने से पहले एक संक्षिप्त सुरक्षा बैठक जहाँ दिन के कार्यों, खतरों और सुरक्षा उपायों की समीक्षा की जाती है।",
      },
      importance: {
        heading: "TBM क्यों महत्वपूर्ण है",
        body: "TBM दुर्घटनाओं को रोकने के लिए एक महत्वपूर्ण कदम है, जिसमें खतरों को पहले से साझा किया जाता है, भूमिकाएं स्पष्ट की जाती हैं और सुरक्षा उपकरण पहनने की जाँच की जाती है।",
      },
      procedure: {
        heading: "यह कैसे काम करता है",
        step1: "आज के कार्य क्षेत्र और प्रतिभागियों की पुष्टि करें।",
        step2: "प्रमुख खतरों और सुरक्षा उपायों को साझा करें।",
        step3: "कर्मचारियों के स्वास्थ्य, सुरक्षा उपकरण और साइट में किसी भी बदलाव की जाँच करें।",
        step4: "सामग्री की समीक्षा करें, फिर TBM भागीदारी पूरी करें और हस्ताक्षर करें।",
      },
      close: "बंद करें",
    },
  },

  tbmReportScreen: {
    title: "TBM रिपोर्ट जनरेशन",
    notice: {
      description:
        " ·  शिक्षा लॉग केवल प्रगति में चल रही TBM गतिविधियों के लिए बनाया जा सकता है।\n ·  शिक्षा लॉग पूरा होने पर TBM गतिविधि स्वचालित रूप से समाप्त हो जाएगी।\n ·  कम से कम एक साइट फ़ोटो अवश्य संलग्न करें।",
    },
    activityName: {
      label: "TBM गतिविधि",
    },
    processName: {
      label: "प्रक्रिया का नाम",
      placeholder: "प्रक्रिया का नाम दर्ज करें",
      helper: "वैकल्पिक। अधिकतम 50 अक्षर।",
    },
    teamName: {
      label: "टीम / इकाई का नाम",
      placeholder: "टीम या इकाई का नाम दर्ज करें",
      helper: "वैकल्पिक। अधिकतम 50 अक्षर।",
    },
    educationSummary: {
      label: "शिक्षा सामग्री सारांश",
      placeholder: "शिक्षा सामग्री का सारांश दर्ज करें",
      helper: "10 से 1,000 अक्षरों के बीच।",
    },
    specialNotes: {
      label: "विशेष नोट्स",
      placeholder: "कोई विशेष नोट्स दर्ज करें",
      helper: "अधिकतम 500 अक्षर।",
    },
    sitePhotos: {
      label: "साइट फ़ोटो",
      addButton: "फ़ोटो जोड़ें",
      guide:
        "At least 1 site photo must be registered.\nYou can attach a minimum of 1 and a maximum of 5 photos.",
      preview: "A preview will be shown when you add an image.",
    },
    submit: "रिपोर्ट बनाएं",
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
    title: "TBM गतिविधि विवरण",
    workDate: "कार्य तिथि:  {{date}}",
    activityLabel: "गतिविधि सामग्री",
    educationHeader: "शैक्षिक सामग्री ({{count}})",
    startActivity: "Start Activity",
    edit: "Edit",
    delete: "Delete",
    participantEmpty: "कोई प्रतिभागी नहीं।",
    toastStarted: "TBM गतिविधि शुरू हो गई है।",
    endActivity: "TBM समाप्त करें और रिपोर्ट बनाएं",
    participantHeader: "प्रतिभागी ({{count}})",
    badgeNormal: "सामान्य",
    badgeCaution: "सावधानी",
    badgeDanger: "खतरा",
    deleteModal: {
      title: "TBM गतिविधि हटाएं",
      message: "क्या आप वाकई इस TBM गतिविधि को हटाना चाहते हैं?",
      cancel: "रद्द करें",
      confirm: "हटाएं",
    },
    startModal: {
      title: "TBM गतिविधि शुरू करें",
      message: "क्या आप इस TBM गतिविधि को शुरू करना चाहते हैं?\nस्थिति 'प्रगति में' में बदल जाएगी।",
      cancel: "रद्द करें",
      confirm: "शुरू करें",
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
      sectionTitle: "प्रसंस्करण परिणाम",
      reflected: "स्वीकार कर लिया गया है।",
      rejected: "स्वीकार नहीं किया गया।",
      dateLabel: "संसाधन तिथि:",
    },
    alreadyProcessed: "यह प्रस्ताव पहले ही संसाधित हो चुका है।",
    saveProcessingMessage: "प्रसंस्करण नोट्स सहेजे गए हैं।",
    workerNoEditMessage:
      "प्रगति में या पहले से संसाधित प्रस्तावों को संपादित या हटाया नहीं जा सकता।",
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
      ongoingMessage: "पूर्ण या अस्वीकृत स्थिति चुनने पर उपलब्ध।",
      rejectedInputLabel: "अस्वीकृति का कारण",
      rejectedProcessingPlaceholder: "कृपया अस्वीकृति का कारण विस्तार से बताएं।",
      processingPlaceholder:
        "की गई कार्रवाई का विस्तृत विवरण दें। (उदा. उपकरण टीम की समीक्षा पूरी हुई और व्यवस्था हो गई)",
    },
    history: {
      sectionTitle: "Status Change History",
      registeredTitle: "Proposal Registered",
      registeredDesc: "Proposal has been received.",
      ongoingTitle: "In Progress",
      ongoingChangeTitle: "जारी में बदलाव",
      ongoingDesc: "Proposal review has started.",
      reflectedTitle: "Reflected",
      reflectedChangeTitle: "स्वीकृत प्रसंस्करण",
      reflectedDesc: "Proposal has been reflected.",
      rejectedTitle: "Not Reflected",
      rejectedChangeTitle: "अस्वीकृत प्रसंस्करण",
      rejectedDesc: "Proposal could not be reflected.",
      proceedNote: "प्रबंधक नियुक्त -",
      reflectedNote: "स्वीकृत के रूप में संसाधित -",
      rejectedNote: "अस्वीकृत के रूप में संसाधित -",
    },
    editForm: {
      label: "Details",
      required: " *",
      helper: "You can write up to 2,000 characters.",
      errorMaxLength: "Please enter details within 2,000 characters.",
    },
    edit: "Edit",
    delete: "Delete",
    proceed: "आगे बढ़ें",
    saveProceeded: "प्रसंस्करण नोट्स सहेजें",
    proceedStartedMessage: "प्रसंस्करण शुरू हो गया है।",
    cancel: "Cancel",
    save: "Save",
    savedMessage: "Proposal has been updated.",
    deletedMessage: "प्रस्ताव हटा दिया गया है।",
    deleteModal: {
      title: "प्रस्ताव हटाएं",
      message:
        "क्या आप इस प्रस्ताव को हटाना चाहते हैं?\nहटाए गए प्रस्ताव को पुनः प्राप्त नहीं किया जा सकता।",
      cancel: "रद्द करें",
      confirm: "हटाएं",
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
    submitting: "सबमिट हो रहा है...",
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
    title: "कार्यस्थल गश्त निरीक्षण",
    createButton: "नई निरीक्षण बनाएं",
    workplaceSelector: {
      label: "चयनित कार्यस्थल",
      modalTitle: "निरीक्षण सूची देखने के लिए कार्यस्थल चुनें।",
    },
    badge: {
      underReview: "समीक्षाधीन",
      inProgress: "लेखन में",
      approved: "अनुमोदित",
    },
    card: {
      reviewer: "समीक्षक",
      approver: "अनुमोदक",
    },
  },
  patrolDetailScreen: {
    title: "निरीक्षण विवरण",
    editButton: "संपादित करें",
    summaryCard: {
      title: "निरीक्षण सारांश",
      total: "कुल",
      good: "अच्छा",
      bad: "बुरा",
    },
    detailCard: {
      overallActions: "समग्र कार्रवाई",
      inspectionItems: "निरीक्षण आइटम",
      checkItem: {
        goodBadge: "अच्छा",
        badBadge: "बुरा",
        actionLabel: "कार्रवाई",
      },
    },
    buttons: {
      submit: "जमा करें",
      editComplete: "संपादन पूर्ण",
      reviewComplete: "समीक्षा पूर्ण",
      approve: "अनुमोदन",
      recall: "वापस लें",
      delete: "हटाएं",
      reportPreview: "रिपोर्ट पूर्वावलोकन",
    },
  },
  patrolCreateScreen: {
    title: "गश्त निरीक्षण बनाएं",
    section: {
      approver: {
        title: "अनुमोदक (आवश्यक)",
        placeholder: "अनुमोदक चुनें",
        description: "आप प्रशासक सूची से अनुमोदक चुन सकते हैं।",
      },
      reviewer: {
        title: "समीक्षक (वैकल्पिक)",
        placeholder: "समीक्षक चुनें",
        description: "आप प्रशासक सूची से समीक्षक चुन सकते हैं (वैकल्पिक)।",
      },
      items: {
        title: "निरीक्षण आइटम (आवश्यक)",
        placeholder: "टेम्पलेट चुनें",
        addButton: "आइटम जोड़ें",
        itemNamePlaceholder: "आइटम नाम",
        itemNameDescription: "उदाहरण: सामान्य, विद्युत, गैस, आदि / 1~100 अक्षर दर्ज करें",
        deleteButton: "हटाएं",
        addCheckButton: "निरीक्षण विवरण जोड़ें",
        checkTitle: "निरीक्षण विवरण (आवश्यक)",
        checkNamePlaceholder: "निरीक्षण विवरण नाम",
        checkDescription: "उदाहरण: कार्यस्थल की सफाई और व्यवस्था / 1~200 अक्षर दर्ज करें",
        goodButton: "अच्छा",
        badButton: "खराब",
        badNotePlaceholder: "खराब स्थिति का कारण दर्ज करें",
        deleteCheckButton: "निरीक्षण विवरण हटाएं",
      },
      requirements: {
        title: "समग्र कार्रवाई आवश्यकताएं",
        placeholder: "समग्र कार्रवाई आवश्यकताएं / राय",
        description:
          "आप समग्र कार्रवाई आवश्यकताएं दर्ज कर सकते हैं। कृपया 1,000 अक्षरों के भीतर दर्ज करें।",
      },
    },
    submitButton: "निरीक्षण जमा करें",
    successModal: {
      title: "सफलता",
      message: "निरीक्षण सफलतापूर्वक बनाया गया है।",
      confirmButton: "पुष्टि करें",
    },
    modal: {
      userTitle: "उपयोगकर्ता चुनें",
      templateTitle: "टेम्पलेट चुनें",
      cancelButton: "रद्द करें",
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
    title: "खतरे की रिपोर्ट",
    guide: {
      title: "लेखन गाइड",
      description:
        "कृपया साइट पर पाए गए खतरनाक तत्वों की रिपोर्ट करें। सटीक स्थान और जोखिम कारक बताने से त्वरित कार्रवाई संभव होती है।",
    },
    workplace: {
      label: "कार्यस्थल",
      placeholder: "कार्यस्थल चुनें",
      modalTitle: "कार्यस्थल चुनें",
      helper: "आप सूची से कार्यस्थल चुन सकते हैं।",
    },
    location: {
      label: "स्थान",
      placeholder: "उदा: दूसरी मंजिल का पूर्वी गलियारा, ज़ोन B कार्यस्थल प्रवेश द्वार",
      helper: "अधिकतम 200 अक्षर।",
    },
    hazardFactor: {
      label: "जोखिम कारक",
      placeholder:
        "कौन से जोखिम कारक हैं?\nउदाहरण:\n · सीढ़ी की रेलिंग ढीली है, जिससे गिरने का खतरा है।\n · उजागर तार बिजली के झटके का खतरा पैदा करते हैं।",
      helper: "अधिकतम 1,000 अक्षर।",
    },
    sitePhotos: {
      label: "साइट फ़ोटो",
      addButton: "फ़ोटो जोड़ें",
      modalTitle: "फ़ोटो जोड़ने का तरीका चुनें",
      camera: "कैमरे से लें",
      album: "एल्बम से चुनें",
      hint: "कृपया ऐसी फ़ोटो जोड़ें जो साइट की स्थिति को स्पष्ट रूप से दर्शाती हों।",
      guide: "कम से कम 1 साइट फ़ोटो दर्ज करना आवश्यक है।\n1 से 5 फ़ोटो तक संलग्न की जा सकती हैं।",
      preview: "छवि जोड़ने पर पूर्वावलोकन दिखाया जाएगा।",
    },
    submit: "सबमिट करें",
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
      sitePhotosLabel: "사이트 फ़ोटो",
      sitePhotosHints: {
        hint1: "कृपया ऐसी फ़ोटो जोड़ें जो साइट की स्थिति को स्पष्ट रूप से दर्शाती हों।",
        hint2:
          "कार्रवाई के बाद साइट की तस्वीरें जोड़ने से परिणाम स्पष्ट रूप से संप्रेषित हो सकते हैं।",
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
      title: "स्थिति इतिहास",
      titles: {
        pending: "रिपोर्ट पंजीकृत",
        completed: "कार्य पूर्ण",
        impossible: "कार्य असंभव",
      },
      contents: {
        pending: "रिपोर्ट प्राप्त हो गई है।",
        completed: "कार्य पूरा हो गया है।",
        impossible: "कार्य को असंभव के रूप में संसाधित किया गया है।",
        adminSuffix: " - व्यवस्थापक ({{name}})",
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

  ...demoHi,
}

export default hi
