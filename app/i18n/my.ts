import en, { Translations } from "./en"
import { mergeLocale, type LocaleOverrides } from "./mergeLocale"

const myOverrides = {
  mainTab: {
    home: "မူလစာမျက်နှာ",
    safeBoard: "ဘေးကင်းရေးဘုတ်",
    safeHealth: "ဘေးကင်းရေးစီမံခန့်ခွဲမှု",
    workerParticipation: "အလုပ်သမားပါဝင်မှု",
  },
  loginScreen: {
    tagline: "အလုပ်ခွင် ဘေးကင်းရေး မိတ်ဖက်",
    forgotPassword: "စကားဝှက် မေ့သွားပြီလား?",
    forgotPasswordModal: {
      title: "အသိပေးချက်",
      message: "စကားဝှက် ပြန်လည်ရယူရန် သင်၏\nစီမံခန့်ခွဲသူနှင့် ဆက်သွယ်ပါ။\nဖုန်း: 062-383-0083",
      confirm: "ကောင်းပြီ",
    },
    validation: {
      required: "အီးမေးလ်နှင့် စကားဝှက် ထည့်သွင်းပါ။",
      invalidEmail: "မှန်ကန်သော အီးမေးလ်လိပ်စာ ထည့်သွင်းပါ။",
      passwordTooShort: "စကားဝှက်တွင် အနည်းဆုံး စာလုံး ၆ လုံး ရှိရမည်။",
      invalidCredentials: "သင်၏ အီးမေးလ် သို့မဟုတ် စကားဝှက် စစ်ဆေးပါ။",
    },
  },
  homeScreen: {
    orgName: "KS산업안전협회",
    header: { qrScan: "QR စကင်", notification: "အသိပေးချက်များ", language: "ဘာသာစကား" },
    greeting: { message: "ဘေးကင်းသော နေ့ရက် ဖြစ်ပါစေ!", name: "{{name}}," },
    role: { admin: "စီမံခန့်ခွဲသူ", worker: "အလုပ်သမား" },
    board: {
      title: "ဘုတ်",
      viewMore: "ပိုမိုကြည့်ရှုရန်",
      tabs: { all: "အားလုံး", company: "ကုမ္ပဏီ", workplace: "အလုပ်ခွင်" },
    },
    grid: {
      interpret: { label: "စကားပြန်", sub: "စကားပြန် အကူအညီ" },
      chatbot: { label: "ချတ်ဘော့", sub: "AI ချတ်" },
      translate: { label: "ဘာသာပြန်", sub: "စာသား ဘာသာပြန်" },
      education: { label: "ပညာရေး", sub: "ပညာရေး ပစ္စည်းများ" },
      eduJoin: { label: "ပညာ ပါဝင်", sub: "ပညာရေး ပါဝင်" },
      tbmJoin: { label: "TBM ပါဝင်", sub: "TBM ပါဝင်" },
      patrol: { label: "ကွင်းဆင်းစစ်ဆေး", sub: "စစ်ဆေးမှု" },
      tbmCreate: { label: "TBM ဖန်တီး", sub: "TBM ဖန်တီး" },
      tbmReport: { label: "TBM အစီရင်ခံ", sub: "အစီရင်ခံ ဖန်တီး" },
      hazard: { label: "အန္တရာယ်", sub: "အန္တရာယ် အစီရင်ခံ" },
      suggestion: { label: "အကြံပြုချက်", sub: "အကြံပြုချက် တင်သွင်း" },
    },
    pushNotificationSheet: {
      title: "အရေးကြီးသော သတိပေးချက်များ မလွတ်သွားရန်",
      description:
        "ဘေးကင်းရေး သတိပေးချက်များ အချိန်မီ ရရှိရန်\nပုရ်ရှ် အကြောင်းကြားချက် ခွင့်ပြုပါ။",
      allowButton: "ပုရ်ရှ် အကြောင်းကြားချက် ခွင့်ပြုရန်",
      settingsButton: "ဆက်တင်တွင် ခွင့်ပြုချက် ပြောင်းရန်",
    },
    aiRiskBanner: {
      title: "AI အန္တရာယ် ခွဲခြမ်းစိတ်ဖြာ",
      description: "ကင်မရာဖြင့် အန္တရာယ် ခွဲခြမ်းစိတ်ဖြာ၍ အစီရင်ခံစာ ဖန်တီး",
      action: "သွား",
    },
  },
  safeBoardScreen: {
    title: "ဘေးကင်းရေး ဘုတ်",
    alertButton: "သတိပေးချက်",
    workplaceLabel: "အလုပ်ခွင်",
    workplaceModal: { title: "အလုပ်ခွင် ရွေးချယ်ရန်" },
    badge: {
      companyWide: "ကုမ္ပဏီ တစ်ခုလုံး",
      workplace: "အလုပ်ခွင်",
      draft: "မူကြမ်း",
      archived: "မှတ်တမ်းတင်ထားသည်",
    },
    tabs: { all: "အားလုံး", myPosts: "ကျွန်ုပ်၏ ပို့စ်များ" },
    empty: "ပို့စ် မရှိပါ",
    write: "ရေးရန်",
    draftSaved: "ပို့စ်ကို မူကြမ်းအဖြစ် သိမ်းဆည်းထားသည်။",
  },
  safeHealthScreen: {
    title: "ဘေးကင်းရေး စီမံခန့်ခွဲမှု",
    menu: {
      patrol: { title: "ကွင်းဆင်းစစ်ဆေးမှု", description: "ဘေးကင်းရေး စစ်ဆေးမှု" },
      educationMaterial: { title: "ပညာရေး ပစ္စည်း", description: "TBM ပစ္စည်းများ" },
      tbmManage: { title: "TBM စီမံ", description: "ဖန်တီး & စီမံ" },
      tbmReport: { title: "အစီရင်ခံ", description: "ဖန်တီးထားသော အစီရင်ခံ" },
      tbmJoin: { title: "TBM ပါဝင်", description: "QR ဖြင့် ပါဝင်" },
      tbmHistory: { title: "မှတ်တမ်း", description: "TBM ပါဝင်မှု မှတ်တမ်း" },
      tbmJoinWorker: { title: "TBM ပါဝင်", description: "လက်ရှိ TBM ပါဝင်" },
      statusView: { title: "အခြေအနေ", description: "ဘေးကင်းရေး အခြေအနေ" },
    },
  },
  workerParticipationScreen: {
    title: "အလုပ်သမားပါဝင်မှု",
    menu: {
      hazard: { title: "အန္တရာယ် အစီရင်ခံ", description: "အန္တရာယ်ရှိသောနေရာ အစီရင်ခံ" },
      suggestion: { title: "တိုးတက်ရေး အကြံပြုချက်", description: "အကြံပြုချက် တင်သွင်း" },
    },
  },
  voiceTranslationScreen: {
    title: "အသံ စကားပြော ဘာသာပြန်မှု",
    flipScreen: "လှည့်ပြောင်း",
    listening: "နားထောင်နေသည်...",
    speakNow: "ပြောဆိုပါ",
    languageMenu: { title: "အသိမှတ်သောဘာသာစကား" },
    languageSubtitles: {
      korean: "(ကိုရီးယား)",
      english: "(အင်္ဂလိပ်)",
      chineseSimplified: "(တရုတ် ရိုးရှင်း)",
      chineseTraditional: "(တရုတ် ရိုးရာ)",
      russian: "(ရုရှ)",
      vietnamese: "(ဗီယက်နမ်)",
      indonesian: "(အင်ဒိုနီးရှား)",
      khmer: "(ခမာ)",
      thai: "(ထိုင်း)",
      urdu: "(အူရဒူ)",
      nepali: "(နီပေါ)",
      lao: "(လာအို)",
      japanese: "(ဂျပန်)",
      french: "(ပြင်သစ်)",
      spanish: "(စပိန်)",
    },
  },
  aiSafetyChatScreen: {
    title: "AI ဘေးကင်းရေး အကူအညီ",
    aiName: "AI ဘေးကင်းရေး အကူအညီ",
    welcomeMessage: "မင်္ဂလာပါ! ကျွန်ုပ်သည် စက်မှုဘေးကင်းရေး AI အကူအညီ ဖြစ်သည်။",
    inputPlaceholder: "စာသား ထည့်သွင်းပါ...",
    inputHint: "လိုအပ်သည်။ စာလုံး ၂ မှ ၁,၀၀၀ ကြားတွင် ရေးပါ။",
    deleteDialog: {
      title: "စကားဝိုင်း ဖျက်ရန်",
      message: "စကားဝိုင်း မှတ်တမ်းအားလုံး ဖျက်မှာ သေချာပါသလား?",
      confirm: "ဖျက်ရန်",
      cancel: "ပယ်ဖျက်",
    },
    suggestedQuestions: {
      q1: "ဆောက်လုပ်ရေးနေရာ ဘေးကင်းရေး စည်းမျဉ်းများ ရှင်းပြပါ",
      q2: "မြင့်မားသောနေရာတွင် အလုပ်လုပ်ရာ ဘေးကင်းရေး စည်းကမ်းများ ဘာတွေလဲ?",
      q3: "မီးလောင်မှု ဖြစ်ပွားလျှင် အရေးပေါ် တုံ့ပြန်မှု လုပ်ငန်းစဉ် ဘာလဲ?",
    },
  },
  myPageScreen: {
    logoutModal: {
      title: "ထွက်ရန်",
      message: "ထွက်မှာ သေချာပါသလား?",
      cancel: "ပယ်ဖျက်",
      confirm: "ထွက်ရန်",
    },
  },
  notify: {
    mock: {
      boardNewPost: {
        title: "ဘုတ်တွင် ပို့စ်အသစ် ရေးသားထားသည်။",
        description: "သင်၏ အလုပ်ခွင် ဘုတ်ကို စစ်ဆေးပါ!",
      },
    },
  },
  educationPresentationScreen: {
    title: "ပညာရေး/တင်ဆက်မှု",
    inviteButton: "ဖိတ်ကြားရန်",
  },
  tbmListScreen: {
    title: "TBM လုပ်ဆောင်ချက် စာရင်း",
    tabs: { all: "အားလုံး", drafting: "ရေးဆွဲနေဆဲ", ongoing: "လုပ်ဆောင်နေဆဲ", ended: "ပြီးဆုံး" },
    status: { drafting: "ရေးဆွဲနေဆဲ", ongoing: "လုပ်ဆောင်နေဆဲ", ended: "ပြီးဆုံး" },
    participants: "{{count}} ဦး ပါဝင်",
    fab: "လုပ်ဆောင်ချက်အသစ် ဖန်တီး",
    empty: {
      drafting: "ရေးဆွဲနေသော TBM မရှိပါ။",
      ongoing: "လုပ်ဆောင်နေသော TBM မရှိပါ။",
      ended: "ပြီးဆုံးသော TBM မရှိပါ။",
      all: "TBM လုပ်ဆောင်ချက် မရှိပါ။",
    },
  },
  welcomeIntroScreen: {
    skip: "ကျော်သွား",
    start: "စတင်ရန်",
    slide1: {
      step: "01",
      title: "Real-Time ဘာသာစကားများ ဘာသာပြန်",
      description:
        "မည်သည့် နိုင်ငံသားများနှင့်မဆို ချောမွေ့စွာ ဆက်သွယ်ပါ။\nချက်ချင်း အသံ နှင့် စာသား ဘာသာပြန်\nပိုမိုဘေးကင်းသော အလုပ်ခွင်အတွက်။",
    },
    slide2: {
      step: "02",
      title: "ပေါင်းစပ် TBM စီမံခန့်ခွဲမှု",
      description:
        "QR တစ်ကြိမ် စကင်ဖတ်ခြင်းဖြင့် TBM ဝင်ရောက် — စာရွက်မလိုပါ။\nဒစ်ဂျစ်တယ် လက်မှတ် နှင့် အစီရင်ခံ\nတစ်နေရာတည်းတွင် ပြီးဆုံး။",
    },
    slide3: {
      step: "03",
      title: "AI အန္တရာယ် အကဲဖြတ်မှု",
      description:
        "နေရာကို ဓာတ်ပုံရိုက်ရုံဖြင့် AI က အန္တရာယ်ကို ခွဲခြမ်းစိတ်ဖြာ\nပြီး အစီရင်ခံ မူကြမ်း ဖန်တီးပေးမည်။",
    },
  },
  languageSettings: {
    languageTitle: "ဘာသာစကား",
    languageDescription: "အက်ပ်ဘာသာစကားကို ချက်ချင်းပြောင်းနိုင်ပါသည်။",
    languageChangeSuccess: "ဘာသာစကားကို {{language}} သို့ ပြောင်းပြီးပါပြီ။",
    languageChangeRestart:
      "ဘာသာစကားကို {{language}}\nသို့ ပြောင်းပြီးပါပြီ။ ပြောင်းလဲမှုကို အသုံးချရန် အပ်ကို ပြန်လည်စတင်ပါမည်။",
    languageChangeError: "ဘာသာစကား ပြောင်းလဲ၍မရပါ။ ထပ်စမ်းကြည့်ပါ။",
    languageNames: {
      "en": "အင်္ဂလိပ်",
      "ko": "ကိုရီးယား",
      "zh": "တရုတ်",
      "zh-Hans": "တရုတ် (ရိုးရှင်း)",
      "zh-Hant": "တရုတ် (ရိုးရာ)",
      "ja": "ဂျပန်",
      "es": "စပိန်",
      "fr": "ပြင်သစ်",
      "ru": "ရုရှ",
      "ar": "အာရဗီ",
      "hi": "ဟိန်ဒူ",
      "th": "ထိုင်း",
      "vi": "ဗီယက်နမ်",
      "id": "အင်ဒိုနီးရှား",
      "km": "ခမာ",
      "ur": "အူရဒူ",
      "ne": "နီပေါ",
      "lo": "လာအို",
      "my": "မြန်မာ",
      "de": "ဂျာမန်",
      "it": "အီတလီ",
      "yue": "ကန်တိုနီ",
      "pt": "ပေါ်တူဂီ",
      "pt-BR": "ပေါ်တူဂီ (ဘရာဇီး)",
      "ta": "တမီး",
      "te": "တယ်လူဂူ",
      "uk": "ယူကရိန်း",
    },
  },
}

const my: Translations = mergeLocale(en, myOverrides as LocaleOverrides<Translations>)

export default my
