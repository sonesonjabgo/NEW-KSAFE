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
    tagline: "कार्यस्थल सुरक्षा साझेदार",
    enterDetails:
      "सर्वश्रेष्ठ रहस्य पता करने के लिए नीचे अपना विवरण दर्ज करें। आप कभी अनुमान नहीं लगा पाएंगे कि हमारे पास क्या इंतजार कर रहा है। या शायद आप कर सकते हैं; यह रॉकेट साइंस नहीं है।",
    emailFieldLabel: "ईमेल",
    passwordFieldLabel: "पासवर्ड",
    emailFieldPlaceholder: "अपना ईमेल पता दर्ज करें",
    passwordFieldPlaceholder: "अपना पासवर्ड दर्ज करें",
    tapToLogIn: "लॉग इन करने के लिए टैप करें!",
    hint: "संकेत: आप किसी भी ईमेल पता और अपना पसंदीदा पासवर्ड उपयोग कर सकते हैं :)",
    forgotPassword: "पासवर्ड भूल गए?",
    forgotPasswordModal: {
      title: "सूचना",
      message:
        "पासवर्ड पुनः प्राप्त करने के लिए, कृपया अपने\nप्रशासक से संपर्क करें।\nफ़ोन: 062-383-0083",
      confirm: "ठीक है",
    },
    alert: {
      invalidCredentials: "ईमेल या पासवर्ड गलत है।",
      signInFailed: "साइन इन विफल। कृपया पुनः प्रयास करें।",
      fillFields: "कृपया सभी आवश्यक फ़ील्ड भरें।",
      passwordLength: "पासवर्ड कम से कम 6 वर्णों का होना चाहिए।",
      unauthorizedRole: "इस खाते को पहुंच नहीं है।",
      deactivatedAccount: "यह खाता निष्क्रिय कर दिया गया है। कृपया व्यवस्थापक से संपर्क करें।",
      profileLoadFailed: "उपयोगकर्ता जानकारी लोड करने में विफल। कृपया पुनः प्रयास करें।",
    },
    validation: {
      required: "कृपया अपना ईमेल और पासवर्ड दर्ज करें।",
      invalidEmail: "कृपया एक वैध ईमेल पता दर्ज करें।",
      passwordTooShort: "पासवर्ड कम से कम 6 अक्षरों का होना चाहिए।",
      invalidCredentials: "कृपया अपना ईमेल या पासवर्ड जांचें।",
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

  mainTab: {
    home: "होम",
    safeBoard: "सुरक्षा बोर्ड",
    safeHealth: "सुरक्षा प्रबंधन",
    workerParticipation: "श्रमिक भागीदारी",
  },

  homeScreen: {
    orgName: "KS산업안전협회",
    header: { qrScan: "QR स्कैन", notification: "सूचनाएं", language: "भाषा" },
    greeting: { message: "सुरक्षित दिन बिताएं!", name: "{{name}}," },
    role: { admin: "प्रशासक", worker: "कर्मचारी" },
    devToggle: { eduBanner: "शिक्षा बैनर" },
    board: {
      title: "सुरक्षा बोर्ड",
      viewMore: "और देखें",
      tabs: { all: "सभी", company: "पूरी कंपनी", workplace: "कार्यस्थल" },
      empty: "No posts available.",
    },
    edu: { title: "शिक्षा", description: "विवरण" },
    banner: { text: "सुरक्षित वातावरण" },
    aiRiskBanner: {
      title: "AI खतरा विश्लेषण",
      description: "कैमरे से खतरों का विश्लेषण और रिपोर्ट बनाएं",
      action: "जाएं",
    },
    footer: {
      homepage: "मुखपृष्ठ",
      privacy: "गोपनीयता",
      terms: "शर्तें",
      copyright: "Copyright © KS औद्योगिक सुरक्षा संघ सर्वाधिकार सुरक्षित।",
      webViewLoading: "से जुड़ रहे हैं",
      webViewLoadingWait: "कृपया एक क्षण प्रतीक्षा करें",
      webViewClose: "बंद करें",
    },
    grid: {
      interpret: { label: "दुभाषिया", sub: "दुभाषिया सहायता" },
      chatbot: { label: "सुरक्षा चैटबॉट", sub: "सुरक्षा परामर्श/प्रश्न" },
      translate: { label: "अनुवाद", sub: "भाषा अनुवाद सहायता" },
      education: { label: "शिक्षा/प्रस्तुति", sub: "सामग्री प्रस्तुति" },
      eduJoin: { label: "शिक्षा में शामिल हों", sub: "शिक्षा/प्रस्तुति में शामिल हों" },
      tbmJoin: { label: "TBM में शामिल हों", sub: "सुरक्षा बैठक में शामिल हों" },
      patrol: { label: "गश्त निरीक्षण", sub: "गश्त/निरीक्षण दर्ज करें" },
      tbmCreate: { label: "TBM", sub: "TBM देखें/बनाएं" },
      tbmReport: { label: "TBM रिपोर्ट", sub: "TBM रिपोर्ट देखें" },
      hazard: { label: "खतरनाक क्षेत्र", sub: "खतरनाक क्षेत्र देखें" },
      suggestion: { label: "सुझाव", sub: "सुधार सुझाव दर्ज करें" },
    },
    pushNotificationSheet: {
      title: "महत्वपूर्ण अलर्ट न चूकें",
      description:
        "सुरक्षा अलर्ट और घोषणाएं समय पर प्राप्त करने के लिए,\nकृपया पुश नोटिफिकेशन की अनुमति दें।",
      allowButton: "पुश नोटिफिकेशन की अनुमति दें",
      settingsButton: "सेटिंग्स में अनुमति बदलें",
    },
  },
  safeBoardScreen: {
    title: "सुरक्षा बोर्ड",
    alertButton: "अलर्ट",
    workplaceLabel: "कार्यस्थल",
    workplaceModal: { title: "कार्यस्थल चुनें" },
    badge: {
      companyWide: "पूरी कंपनी",
      workplace: "कार्यस्थल",
      draft: "मसौदा",
      archived: "संग्रहीत",
    },
    tabs: { all: "सभी", myPosts: "मेरी पोस्ट" },
    empty: "खाली",
    write: "लिखें",
    draftSaved: "पोस्ट मसौदे के रूप में सहेजी गई।",
  },
  safeBoardDetailScreen: {
    title: "पोस्ट विवरण",
    authorLabel: "लेखक",
    editButton: "संपादित करें",
    alertOn: "अलर्ट चालू",
    alertOff: "अलर्ट बंद",
    publishButton: "प्रकाशित करें",
    deleteButton: "हटाएं",
    publishModal: {
      title: "पोस्ट प्रकाशित करें",
      message: "क्या आप वाकई इस पोस्ट को प्रकाशित करना चाहते हैं?",
      cancel: "रद्द करें",
      confirm: "प्रकाशित करें",
    },
    deleteModal: {
      title: "पोस्ट हटाएं",
      message: "क्या आप वाकई इस पोस्ट को हटाना चाहते हैं?",
      cancel: "रद्द करें",
      confirm: "हटाएं",
    },
  },
  safeBoardNotifyScreen: {
    title: "कार्यस्थल पुश नोटिफिकेशन भेजें",
    guide: {
      title: "लेखन गाइड",
      description:
        "आप जो कार्यस्थल प्रबंधित करते हैं उनमें से एक या अधिक चुनें और साइट सदस्यों को भेजने के लिए एक नोटिफिकेशन लिखें।",
    },
    workplace: {
      label: "कार्यस्थल चुनें",
      helper: "{{total}} में से {{selected}} कार्यस्थलों को भेज रहे हैं",
    },
    notifyTitle: {
      label: "नोटिफिकेशन शीर्षक",
      placeholder: "एक संक्षिप्त शीर्षक दर्ज करें।",
      helper: "अधिकतम 50 अक्षर।",
    },
    content: {
      label: "पुश नोटिफिकेशन सामग्री",
      placeholder: "इस कार्यस्थल को भेजने के लिए नोटिफिकेशन संदेश दर्ज करें।",
      helper: "अधिकतम 240 अक्षर।",
    },
    send: "नोटिफिकेशन भेजें",
    sendSuccess: "नोटिफिकेशन भेजी गई।",
  },
  safeBoardCreateScreen: {
    title: "पोस्ट लिखें",
    guide: { title: "लेखन गाइड", description: "कृपया स्पष्ट और सटीक सामग्री लिखें।" },
    workplace: {
      label: "कार्यस्थल",
      placeholder: "कार्यस्थल चुनें",
      helper: "वह कार्यस्थल चुनें जिस पर यह पोस्ट लागू होती है।",
    },
    postTitle: {
      label: "पोस्ट शीर्षक",
      placeholder: "घोषणा शीर्षक दर्ज करें।",
      helper: "अधिकतम 80 अक्षर।",
    },
    content: {
      label: "पोस्ट सामग्री",
      placeholder: "साइट पर पहुंचाने के लिए विस्तृत सामग्री दर्ज करें।",
      helper: "अधिकतम 4,000 अक्षर।",
    },
    attachment: {
      label: "संलग्नक",
      card1Text: "(वैकल्पिक) आप 50MB तक\nफ़ाइलें अपलोड कर सकते हैं।",
      uploadButton: "फ़ाइल अपलोड करें",
      noFile: "कोई फ़ाइल चयनित नहीं।",
    },
    pushNotification: {
      label: "पुश नोटिफिकेशन भेजें",
      cardText:
        "चयनित होने पर, पोस्ट करने पर चयनित कार्यस्थल के सभी सदस्यों को पुश नोटिफिकेशन भेजी जाएगी।",
    },
    save: "सहेजें",
  },

  safeHealthScreen: {
    title: "सुरक्षा प्रबंधन",
    menu: {
      patrol: { title: "गश्त निरीक्षण", description: "कार्यस्थल गश्त निरीक्षण दर्ज करें" },
      educationMaterial: {
        title: "शैक्षिक सामग्री",
        description: "TBM शैक्षिक सामग्री प्रबंधित करें",
      },
      tbmManage: { title: "TBM प्रबंधन", description: "TBM गतिविधियां देखें/बनाएं" },
      tbmReport: { title: "TBM रिपोर्ट", description: "TBM रिपोर्ट बनाएं" },
      tbmJoin: { title: "TBM में शामिल हों", description: "TBM बैठक में शामिल हों" },
      tbmHistory: { title: "TBM इतिहास", description: "TBM भागीदारी इतिहास देखें" },
      tbmJoinWorker: { title: "TBM में शामिल हों", description: "TBM बैठक में शामिल हों" },
      statusView: { title: "स्थिति", description: "TBM रिपोर्ट स्थिति देखें" },
    },
  },
  workerParticipationScreen: {
    title: "श्रमिक भागीदारी",
    menu: {
      hazard: { title: "खतरनाक क्षेत्र", description: "खतरनाक क्षेत्र दर्ज करें" },
      suggestion: { title: "सुधार सुझाव", description: "सुधार सुझाव दर्ज करें" },
    },
  },

  voiceTranslationScreen: {
    title: "वॉयस वार्तालाप अनुवाद",
    flipScreen: "पलटें",
    listening: "सुन रहा है...",
    tapToSpeak: "बोलने के लिए टैप करें",
    speakNow: "अभी बोलें",
    languageMenu: {
      title: "पहचानी गई भाषा",
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

  aiSafetyChatScreen: {
    title: "AI सुरक्षा सहायक",
    aiName: "AI सुरक्षा सहायक",
    welcomeMessage:
      "नमस्ते! मैं स्मार्ट सेफ्टी मैनेजमेंट AI चैटबॉट हूं।\nयदि आपके कार्यस्थल के नियमों, प्रक्रियाओं या आपातकालीन प्रतिक्रिया मैनुअल के बारे में कोई प्रश्न है तो कभी भी पूछें।",
    inputPlaceholder: "संदेश दर्ज करें...",
    inputHint: "आवश्यक। कृपया 2 से 1,000 अक्षरों के बीच लिखें।",
    deleteDialog: {
      title: "वार्तालाप हटाएं",
      message: "क्या आप वाकई सभी वार्तालाप इतिहास हटाना चाहते हैं?",
      confirm: "हटाएं",
      cancel: "रद्द करें",
    },
    suggestedQuestions: {
      q1: "निर्माण स्थल की सामान्य सुरक्षा नियमों की व्याख्या करें",
      q2: "ऊंचाई पर काम करने के लिए सुरक्षा नियम क्या हैं?",
      q3: "आग लगने की स्थिति में आपातकालीन प्रतिक्रिया प्रक्रिया क्या है?",
    },
  },

  myPageScreen: {
    title: "मेरा पृष्ठ",
    orgName: "KS산업안전협회",
    workplace: {
      label: "ग्वांগগियो टावर क्रेन वर्कप्लेस",
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
      allowed: "अनुमत",
      notAllowed: "अनुमति नहीं",
    },
    logout: "लॉग आउट",
    logoutModal: {
      title: "लॉग आउट",
      message: "क्या आप वाकई लॉग आउट करना चाहते हैं?",
      cancel: "रद्द करें",
      confirm: "लॉग आउट",
    },
  },

  languageSettings: {
    languageTitle: "भाषा",
    languageDescription: "ऐप की भाषा तुरंत बदलें।",
    languageChangeSuccess: "भाषा {{language}} में बदल दी गई है।",
    languageChangeRestart:
      "भाषा {{language}}\nमें बदल दी गई है। परिवर्तनों को लागू करने के लिए ऐप पुनः प्रारंभ होगा।",
    languageChangeError: "भाषा बदलने में विफल। कृपया पुनः प्रयास करें।",
    languageNames: {
      "en": "अंग्रेजी",
      "ko": "कोरियाई",
      "zh": "चीनी",
      "zh-Hans": "सरलीकृत चीनी",
      "zh-Hant": "परंपरागत चीनी",
      "yue": "कैंटोनीज",
      "pt": "पुर्तगाली",
      "pt-BR": "पुर्तगाली (ब्राजील)",
      "ja": "जापानी",
      "es": "स्पेनिश",
      "fr": "फ्रेंच",
      "de": "जर्मन",
      "it": "इतालवी",
      "ru": "रूसी",
      "ar": "अरबी",
      "hi": "हिंदी",
      "ta": "तमिल",
      "te": "तेलुगु",
      "th": "थाई",
      "uk": "यूक्रेनी",
      "vi": "वियतनामी",
      "id": "इंडोनेशियाई",
      "km": "खमेर",
      "ur": "उर्दू",
      "ne": "नेपाली",
      "lo": "लाओ",
      "my": "बर्मी",
    },
  },

  notify: {
    title: "सूचनाएं",
    emptyTitle: "कोई सूचना नहीं",
    emptyDescription: "अभी कोई सूचना नहीं है।\nजब नई सूचनाएं आएंगी तो हम आपको बताएंगे।",
    mock: {
      boardNewPost: {
        title: "बोर्ड पर एक नई पोस्ट लिखी गई है।",
        description: "अपने संबद्ध कार्यस्थल का बोर्ड देखें!",
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
    title: "शिक्षा/प्रस्तुति",
    inviteButton: "आमंत्रित करें",
    inviteModal: {
      title: "Invite Participants",
      description: "Share the QR code or invite code\nto invite participants.",
      close: "Close",
    },
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
    fontSizeModal: {
      title: "टेक्स्ट आकार",
      small: "छोटा",
      medium: "मध्यम",
      large: "बड़ा",
    },
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
    title: "TBM गतिविधि सूची",
    tabs: { all: "सभी", drafting: "तैयार हो रहा है", ongoing: "जारी है", ended: "समाप्त" },
    status: { drafting: "तैयार हो रहा है", ongoing: "जारी है", ended: "समाप्त" },
    participants: "{{count}} प्रतिभागी",
    fab: "नई गतिविधि बनाएं",
    empty: {
      drafting: "कोई TBM तैयार नहीं हो रहा।",
      ongoing: "कोई TBM जारी नहीं है।",
      ended: "कोई TBM समाप्त नहीं हुआ।",
      all: "कोई TBM गतिविधि नहीं।",
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
        "कम से कम 1 साइट फ़ोटो दर्ज करना आवश्यक है।\n1 से अधिकतम 5 फ़ोटो तक संलग्न की जा सकती हैं।",
      preview: "छवि जोड़ने पर पूर्वावलोकन दिखाया जाएगा।",
    },
    submit: "रिपोर्ट बनाएं",
  },

  tbmCreateScreen: {
    editTitle: "수정",
    submitEdit: "수정하기",
    title: "TBM गतिविधि बनाएं",
    reset: "रीसेट करें",
    guide: {
      title: "लेखन गाइड",
      description:
        "अपने कार्यस्थल, कार्य शेड्यूल, गतिविधि सामग्री और शैक्षिक सामग्रियों को एक स्क्रीन पर प्रबंधित करें और तुरंत TBM गतिविधि बनाएं। आप ड्रॉपडाउन से शैक्षिक सामग्री चुन सकते हैं या सीधे जोड़ सकते हैं।",
    },
    workplace: {
      label: "कार्यस्थल चुनें",
      placeholder: "एक कार्यस्थल चुनें",
      helper: "कृपया इस TBM गतिविधि के लिए कार्यस्थल चुनें।",
    },
    dateTime: {
      label: "कार्य तिथि (YYYY-MM-DD)",
      includeDateInTitle: "शीर्षक में तिथि शामिल करें",
      helper: "कृपया कैलेंडर से कार्य शेड्यूल चुनें।",
      confirm: "पुष्टि करें",
    },
    activityTitle: {
      label: "गतिविधि शीर्षक",
      placeholder: "उदा. 2026.05.15 सुबह सरिया काम TBM",
      helper: "गतिविधि शीर्षक अधिकतम 200 अक्षरों का हो सकता है।",
    },
    content: {
      label: "गतिविधि सामग्री",
      placeholder: "मुख्य कार्य सामग्री दर्ज करें",
      helper: "कार्य सामग्री दर्ज करें। अधिकतम 2,000 अक्षर।",
    },
    education: {
      label: "शैक्षिक सामग्री चुनें",
      statusBadge: "चयन स्थिति",
      multipleBadge: "एकाधिक चयन की अनुमति",
      countText: "{{count}} आइटम चयनित",
      countHelper: "शैक्षिक सामग्री जोड़ने या बदलने के लिए चयन पुष्टि पर जाएं।",
      selectButton: "+ शैक्षिक सामग्री चुनें",
    },
    submit: "बनाएं",
  },

  tbmDetailScreen: {
    title: "TBM गतिविधि विवरण",
    workDate: "कार्य तिथि:  {{date}}",
    activityLabel: "गतिविधि सामग्री",
    educationHeader: "शैक्षिक सामग्री ({{count}})",
    startActivity: "गतिविधि शुरू करें",
    edit: "संपादित करें",
    delete: "हटाएं",
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
    downloadLog: "교육일지 다운로드",
    startModal: {
      title: "TBM गतिविधि शुरू करें",
      message: "क्या आप इस TBM गतिविधि को शुरू करना चाहते हैं?\nस्थिति 'प्रगति में' में बदल जाएगी।",
      cancel: "रद्द करें",
      confirm: "शुरू करें",
    },
  },

  educationMaterialScreen: {
    title: "TBM शैक्षिक सामग्री सूची",
    registerButton: "नई शैक्षिक सामग्री दर्ज करें",
  },

  educationMaterialRegisterScreen: {
    title: "TBM शैक्षिक सामग्री दर्ज करें",
    guide: {
      title: "लेखन गाइड",
      description:
        "शिक्षा शीर्षक, मुख्य सामग्री और संलग्नक एक साथ दर्ज करें ताकि इसे तुरंत साइट पर उपयोग किया जा सके। दर्ज की गई सामग्री कई TBM गतिविधियों के लिए चुनी जा सकती है।",
    },
    attachment: {
      label: "संलग्नक",
      boxPlaceholder: "filename.format",
      helper: "केवल एक फ़ाइल दर्ज की जा सकती है, अधिकतम 50MB।",
    },
    educationTitle: {
      label: "शिक्षा शीर्षक",
      placeholder: "शैक्षिक सामग्री का शीर्षक दर्ज करें",
      includeFileName: "फ़ाइल नाम को शीर्षक के रूप में उपयोग करें",
      includeFileNameDesc: "चयनित फ़ाइल नाम शीर्षक फ़ील्ड में दिखाई देगा।",
    },
    content: {
      label: "शिक्षा सामग्री",
      placeholder: "शिक्षा सामग्री दर्ज करें",
      helper: "विवरण वैकल्पिक है। यदि प्रदान किया गया है, तो 10,000 अक्षर तक दर्ज किए जा सकते हैं।",
    },
    submit: "PLACEHOLDER",
    submitSuccess: "Material registered successfully.",
    submitError: "Failed to register material. Please try again.",
  },

  educationMaterialDetailScreen: {
    title: "TBM शैक्षिक सामग्री विवरण",
    sourceKs: "KS औद्योगिक सुरक्षा संघ",
    sourceMine: "मेरी सामग्री",
    statusActive: "सक्रिय",
    statusArchived: "संग्रहीत",
    categoryLabel: "श्रेणी:",
    attachmentLabel: "संलग्नक",
    registrantLabel: "दर्ज करने वाला:",
    publishButton: "सक्रियण के बाद प्रकाशित करें",
  },

  educationSelectScreen: {
    title: "शैक्षिक सामग्री चुनें",
    sourceTab1: "KS सुरक्षा संघ",
    sourceTab2: "KS सुरक्षा संघ",
    sourceTab3: "मेरी सामग्री",
    searchPlaceholder: "खोज के लिए सामग्री दर्ज करें",
    confirm: "पूर्ण ({{count}})",
    confirmNone: "पूर्ण",
    emptyText: "कोई शैक्षिक सामग्री उपलब्ध नहीं।",
    categoryAll: "All",
  },

  improvementProposalDetailScreen: {
    title: "प्रस्ताव विवरण प्रबंधन",
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
      pending: "लंबित",
      ongoing: "प्रगति में",
      reflected: "प्रतिबिंबित",
      rejected: "अप्रतिबिंबित",
    },
    statusChange: {
      sectionTitle: "स्थिति परिवर्तन और प्रसंस्करण",
      ongoingBtn: "प्रगति में",
      reflectedBtn: "प्रतिबिंबित",
      rejectedBtn: "अप्रतिबिंबित",
      inputLabel: "प्रसंस्करण नोट्स",
      pendingMessage: "स्थिति लंबित है।\nप्रसंस्करण से पहले प्रगति में बदलें।",
      ongoingMessage: "पूर्ण या अस्वीकृत स्थिति चुनने पर उपलब्ध।",
      rejectedInputLabel: "अस्वीकृति का कारण",
      rejectedProcessingPlaceholder: "कृपया अस्वीकृति का कारण विस्तार से बताएं।",
      processingPlaceholder:
        "की गई कार्रवाई का विस्तृत विवरण दें। (उदा. उपकरण टीम की समीक्षा पूरी हुई और व्यवस्था हो गई)",
    },
    history: {
      sectionTitle: "स्थिति परिवर्तन इतिहास",
      registeredTitle: "प्रस्ताव दर्ज हुआ",
      registeredDesc: "प्रस्ताव प्राप्त हो गया है।",
      ongoingTitle: "प्रगति में",
      ongoingChangeTitle: "जारी में बदलाव",
      ongoingDesc: "प्रस्ताव की समीक्षा शुरू हो गई है।",
      reflectedTitle: "प्रतिबिंबित",
      reflectedChangeTitle: "स्वीकृत प्रसंस्करण",
      reflectedDesc: "प्रस्ताव प्रतिबिंबित हो गया है।",
      rejectedTitle: "अप्रतिबिंबित",
      rejectedChangeTitle: "अस्वीकृत प्रसंस्करण",
      rejectedDesc: "प्रस्ताव प्रतिबिंबित नहीं हो सका।",
      proceedNote: "प्रबंधक नियुक्त -",
      reflectedNote: "स्वीकृत के रूप में संसाधित -",
      rejectedNote: "अस्वीकृत के रूप में संसाधित -",
    },
    editForm: {
      label: "विवरण",
      required: " *",
      helper: "आप 2,000 अक्षर तक लिख सकते हैं।",
      errorMaxLength: "कृपया 2,000 अक्षरों के भीतर विवरण दर्ज करें।",
    },
    edit: "संपादित करें",
    delete: "हटाएं",
    proceed: "आगे बढ़ें",
    saveProceeded: "प्रसंस्करण नोट्स सहेजें",
    proceedStartedMessage: "प्रसंस्करण शुरू हो गया है।",
    cancel: "रद्द करें",
    save: "सहेजें",
    savedMessage: "प्रस्ताव अपडेट हो गया है।",
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
    title: "प्रस्ताव लिखें",
    guide: {
      title: "लेखन गाइड",
      description:
        "साइट पर सुरक्षा और कार्य दक्षता में सुधार के लिए विचार स्वतंत्र रूप से प्रस्तावित करें। विशिष्ट स्थानों और स्थितियों को शामिल करना सहायक होगा।",
    },
    workplace: {
      label: "कार्यस्थल",
      placeholder: "कृपया एक कार्यस्थल चुनें",
      helper: "आप कार्यस्थल सूची से कार्यस्थल चुन सकते हैं।",
    },
    detail: {
      label: "विवरण",
      required: " *",
      placeholder:
        "आप क्या सुधारना चाहते हैं?\nउदाहरण)\n · समस्या: गलियारे B की रोशनी बहुत कम है, जिससे काम खतरनाक हो जाता है।\n · प्रस्ताव: कृपया LED रोशनी जोड़ें या चमक सुधारें।",
      helper: "आप 2,000 अक्षर तक लिख सकते हैं।",
      errorMaxLength: "कृपया 2,000 अक्षरों के भीतर विवरण दर्ज करें।",
    },
    submit: "सबमिट करें",
    submitting: "सबमिट हो रहा है...",
  },

  improvementProposalListScreen: {
    title: "सुधार प्रस्ताव",
    tabs: {
      all: "सभी",
      pending: "लंबित",
      ongoing: "प्रगति में",
      reflected: "प्रतिबिंबित",
      rejected: "अप्रतिबिंबित",
    },
    summary: {
      myProposals: "मेरे प्रस्ताव",
      reflected: "प्रतिबिंबित",
      unit: "आइटम",
    },
    status: {
      pending: "लंबित",
      ongoing: "प्रगति में",
      reflected: "प्रतिबिंबित",
      rejected: "अप्रतिबिंबित",
    },
    fab: "नया प्रस्ताव",
    empty: {
      all: "कोई प्रस्ताव दर्ज नहीं।",
      pending: "कोई लंबित प्रस्ताव नहीं।",
      ongoing: "कोई प्रगति में प्रस्ताव नहीं।",
      reflected: "कोई प्रतिबिंबित प्रस्ताव नहीं।",
      rejected: "कोई अप्रतिबिंबित प्रस्ताव नहीं।",
    },
  },

  tbmReportInquiryScreen: {
    title: "TBM रिपोर्ट जांच",
    untitled: "(No title)",
    tabs: {
      all: "सभी",
      requested: "अनुरोधित",
      generating: "बन रही है",
      completed: "पूर्ण",
      failed: "विफल",
    },
    empty: {
      all: "कोई रिपोर्ट नहीं मिली।",
      requested: "कोई लंबित रिपोर्ट नहीं।",
      generating: "कोई रिपोर्ट नहीं बन रही।",
      completed: "कोई पूर्ण रिपोर्ट नहीं।",
      failed: "कोई विफल रिपोर्ट नहीं।",
    },
  },

  tbmReportStatusScreen: {
    title: "TBM रिपोर्ट स्थिति",
    regenerate: "पुनः उत्पन्न करें",
    sectionReportInfo: "रिपोर्ट जानकारी",
    sectionProcessStatus: "प्रसंस्करण स्थिति",
    sectionStatusHistory: "स्थिति इतिहास",
    processName: "प्रक्रिया का नाम",
    teamName: "टीम/इकाई",
    historyRequestedAt: "अनुरोध तिथि",
    historyStartedAt: "प्रसंस्करण प्रारंभ",
    historyCompletedAt: "प्रसंस्करण पूर्ण",
    downloadPdf: "PDF डाउनलोड करें",
    sectionRegenerate: "रिपोर्ट पुनर्जनन",
    regenerateInfoText: "रिपोर्ट पुनर्जनन का अनुरोध करने से पहले\nनीचे दिए गए आइटम दर्ज करें।",
    processNameLabel: "प्रक्रिया का नाम (वैकल्पिक)",
    processNamePlaceholder: "उदा. प्रेस",
    teamNameLabel: "टीम/इकाई (वैकल्पिक)",
    teamNamePlaceholder: "उदा. टीम 1",
    inputDescription: "वैकल्पिक फ़ील्ड। अधिकतम 50 अक्षर।",
    cautionTitle: "सावधानी",
    cautionItem1: "पुनर्जनन केवल विफल या पूर्ण रिपोर्ट के लिए उपलब्ध है।",
    cautionItem2: "लंबित या प्रसंस्करण स्थिति में रिपोर्ट पुनः उत्पन्न नहीं की जा सकती।",
    cautionItem3: "पुनर्जनन मौजूदा परिणामों को रीसेट कर देगा।",
    requestRegenerate: "पुनर्जनन का अनुरोध करें",
    regenerateNote: "नए पुनर्जनन में कुछ समय लग सकता है।",
    refresh: "रीफ्रेश करें",
    toastRegenerate: "रिपोर्ट पुनर्जनन का अनुरोध सबमिट किया गया है।",
    processStatusRequested: "Report generation has been requested. Processing will begin shortly.",
    processStatusGenerating: "Generating the report. Please wait a moment.",
    processStatusCompleted: "The report is ready and available for download.",
    processStatusFailed: "Report generation has failed.",
    sectionFailureReason: "Failure Reason",
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
    deleteModal: {
      title: "निरीक्षण हटाएं",
      message: "क्या आप इस निरीक्षण को हटाना चाहते हैं?\nयह क्रिया पूर्ववत नहीं की जा सकती।",
      cancel: "रद्द करें",
      confirm: "हटाएं",
    },
    toast: {
      reportSuccess: "रिपोर्ट खुल गई।",
      reportFail: "रिपोर्ट बनाने में विफल।",
    },
  },
  patrolCreateScreen: {
    title: "गश्त निरीक्षण बनाएं",
    editTitle: "गश्त निरीक्षण संपादित करें",
    editSubmitButton: "परिवर्तन सहेजें",
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
    title: "TBM भागीदारी इतिहास",
    totalParticipation: "कुल भागीदारी",
    cautionResponse: "सावधानी प्रतिक्रिया",
    unit: "मामला",
    workplaceLabel: "PLACEHOLDER_WL",
    statusNormal: "Normal",
    statusAbnormal: "Caution",
  },

  tbmParticipationHistoryDetailScreen: {
    participationDate: "भागीदारी तिथि",
    workDate: "कार्य तिथि",
    workplace: "कार्यस्थल",
    manager: "प्रबंधक",
    activityContent: "गतिविधि सामग्री",
  },

  aiRiskDocCreatorScreen: {
    title: "AI जोखिम विश्लेषण रिपोर्ट",
    pageCount: "कुल {{count}} पृष्ठ",
    captureButton: "सुधार से पहले कैप्चर करें",
    exportPdfButton: "PDF निर्यात करें",
    hazardToggle: {
      label: "खतरा निर्देशांक अनुभाग शामिल करें",
      description: "अनचेक होने पर, खतरा निर्देशांक स्क्रीन और PDF पर नहीं दिखाए जाएंगे।",
    },
    emptyState: {
      title: "कोई पृष्ठ दर्ज नहीं।",
      description: "पृष्ठ जोड़ने के लिए सुधार से पहले की छवि कैप्चर करें।",
    },
    captureSheet: {
      camera: "फोटो लें",
      album: "एल्बम से चुनें",
    },
    resetAll: "सभी रीसेट करें",
    signature: {
      instruction: "बॉक्स में अपनी उंगली से हस्ताक्षर करें, फिर सहेजें टैप करें।",
      cancel: "रद्द करें",
      save: "सहेजें",
    },
    page: {
      title: "पृष्ठ {{number}}",
      beforeLabel: "पहले",
      afterLabel: "बाद",
      addImage: "+ छवि जोड़ें",
      analyzeButton: "AI विश्लेषण का अनुरोध करें",
      aiAnalysis: "AI विश्लेषण",
      hazardTitle: "खतरा निर्देशांक विवरण",
      hazardEmpty: "प्रदर्शित करने के लिए कोई खतरा निर्देशांक नहीं।",
      analysisPlaceholder: "विश्लेषण परिणाम यहाँ दिखाए जाएंगे।",
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
    title: "खतरनाक क्षेत्र",
    fab: "नई रिपोर्ट",
    summary: {
      myReports: "मेरी रिपोर्ट",
      completed: "हल किया गया",
      unit: "आइटम",
    },
    tabs: {
      all: "सभी",
      pending: "लंबित",
      ongoing: "प्रगति में",
      completed: "हल किया गया",
      impossible: "हल नहीं हो सकता",
    },
    status: {
      pending: "लंबित",
      ongoing: "प्रगति में",
      completed: "हल किया गया",
      impossible: "हल नहीं हो सकता",
    },
    empty: {
      all: "कोई खतरनाक क्षेत्र दर्ज नहीं।",
      pending: "कोई लंबित खतरनाक क्षेत्र नहीं।",
      ongoing: "कोई प्रगति में खतरनाक क्षेत्र नहीं।",
      completed: "कोई हल किया गया खतरनाक क्षेत्र नहीं।",
      impossible: "कोई अनसुलझा खतरनाक क्षेत्र नहीं।",
    },
  },

  hazardRiskDetailScreen: {
    title: "खतरनाक क्षेत्र विवरण",
    infoCard: {
      locationLabel: "स्थान",
      hazardFactorLabel: "जोखिम कारक",
      sitePhotosLabel: "साइट फ़ोटो",
      noPhotos: "कोई फ़ोटो दर्ज नहीं।",
      managerProfileLabel: "प्रबंधक प्रोफ़ाइल",
    },
    adminSection: {
      title: "स्थिति परिवर्तन और कार्रवाई",
      noteLabel: "कार्रवाई विवरण दर्ज करें",
      noteHint: "अधिकतम 2,000 अक्षर दर्ज किए जा सकते हैं।",
      sitePhotosLabel: "साइट फ़ोटो",
      sitePhotosHints: {
        hint1: "कृपया ऐसी फ़ोटो जोड़ें जो साइट की स्थिति को स्पष्ट रूप से दर्शाती हों।",
        hint2:
          "कार्रवाई के बाद साइट की तस्वीरें जोड़ने से परिणाम स्पष्ट रूप से संप्रेषित हो सकते हैं।",
      },
      placeholder: {
        pending: "स्थिति लंबित है।\nकार्रवाई करने से पहले प्रगति में बदलें।",
        ongoing: "पूर्ण या असंभव स्थिति चुनने पर इनपुट उपलब्ध",
        completed:
          "कृपया की गई कार्रवाई का विस्तार से वर्णन करें (उदा. रेलिंग पुनः स्थापित, केबल प्रोटेक्टर लगाया)",
        impossible: "कृपया विस्तार से बताएं कि कार्रवाई क्यों संभव नहीं है।",
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
    bottomButton: {
      proceed: "आगे बढ़ें",
      saveAction: "कार्रवाई सहेजें",
      alreadyProcessed: "इस रिपोर्ट को पहले ही संसाधित किया जा चुका है।",
    },
    toast: {
      noAction: "कृपया पूर्ण या असंभव चुनें।",
      noNote: "कृपया कार्रवाई का विवरण दर्ज करें।",
    },
  },

  welcomeIntroScreen: {
    skip: "छोड़ें",
    start: "शुरू करें",
    slide1: {
      step: "01",
      title: "वास्तविक समय बहुभाषी अनुवाद",
      description:
        "सभी राष्ट्रीयताओं के कर्मचारियों के साथ सहजता से संवाद करें।\nतत्काल आवाज और पाठ अनुवाद\nसुरक्षित कार्यस्थल के लिए।",
    },
    slide2: {
      step: "02",
      title: "एकीकृत TBM प्रबंधन",
      description:
        "एकल QR कोड स्कैन से TBM में चेक इन करें — कोई कागजी काम नहीं।\nडिजिटल हस्ताक्षर और रिपोर्ट\nएक ही स्थान पर पूर्ण।",
    },
    slide3: {
      step: "03",
      title: "AI जोखिम मूल्यांकन",
      description:
        "बस साइट की फोटो लें और AI खतरों का विश्लेषण करेगा\nऔर आपके लिए रिपोर्ट का मसौदा तैयार करेगा।",
    },
  },

  ...demoHi,
}

export default hi
