import en, { Translations } from "./en"
import { mergeLocale, type LocaleOverrides } from "./mergeLocale"

const kmOverrides = {
  mainTab: {
    home: "ទំព័រដើម",
    safeBoard: "បន្ទះសុវត្ថិភាព",
    safeHealth: "ការគ្រប់គ្រងសុវត្ថិភាព",
    workerParticipation: "ការចូលរួមរបស់កម្មករ",
  },
  loginScreen: {
    tagline: "ដៃគូសុវត្ថិភាពការងារ",
    forgotPassword: "ភ្លេចពាក្យសម្ងាត់?",
    forgotPasswordModal: {
      title: "សេចក្តីជូនដំណឹង",
      message:
        "សម្រាប់ការសង្គ្រោះពាក្យសម្ងាត់ សូមទាក់ទង\nអ្នកគ្រប់គ្រងរបស់អ្នក។\nទូរស័ព្ទ: 062-383-0083",
      confirm: "យល់ព្រម",
    },
    validation: {
      required: "សូមបញ្ចូលអ៊ីមែល និងពាក្យសម្ងាត់របស់អ្នក។",
      invalidEmail: "សូមបញ្ចូលអាសយដ្ឋានអ៊ីមែលត្រឹមត្រូវ។",
      passwordTooShort: "ពាក្យសម្ងាត់ត្រូវមានយ៉ាងហោចណាស់ 6 តួអក្សរ។",
      invalidCredentials: "សូមពិនិត្យអ៊ីមែល ឬពាក្យសម្ងាត់របស់អ្នក។",
    },
  },
  homeScreen: {
    orgName: "KS산업안전협회",
    header: { qrScan: "ស្កែន QR", notification: "ការជូនដំណឹង", language: "ភាសា" },
    greeting: { message: "សូមឱ្យមានថ្ងៃដ៏មានសុវត្ថិភាព!", name: "{{name}}," },
    role: { admin: "អ្នកគ្រប់គ្រង", worker: "កម្មករ" },
    board: {
      title: "ក្តារ",
      viewMore: "មើលបន្ថែម",
      tabs: { all: "ទាំងអស់", company: "ក្រុមហ៊ុន", workplace: "កន្លែងធ្វើការ" },
    },
    grid: {
      interpret: { label: "បកប្រែ", sub: "ជំនួយបកប្រែ" },
      chatbot: { label: "ចែតបូត", sub: "AI ជជែក" },
      translate: { label: "ការបកប្រែ", sub: "បកប្រែអត្ថបទ" },
      education: { label: "ការអប់រំ", sub: "សម្ភារអប់រំ" },
      eduJoin: { label: "ចូលរួមអប់រំ", sub: "ចូលរួមអប់រំ" },
      tbmJoin: { label: "ចូលរួម TBM", sub: "ចូលរួម TBM" },
      patrol: { label: "ការចុះត្រួត", sub: "ការត្រួតពិនិត្យ" },
      tbmCreate: { label: "បង្កើត TBM", sub: "បង្កើត TBM" },
      tbmReport: { label: "របាយការណ៍ TBM", sub: "បង្កើតរបាយការណ៍" },
      hazard: { label: "គ្រោះថ្នាក់", sub: "រាយការណ៍គ្រោះថ្នាក់" },
      suggestion: { label: "យោបល់", sub: "ដាក់ស្នើយោបល់" },
    },
    pushNotificationSheet: {
      title: "កុំខកខានការជូនដំណឹងសំខាន់",
      description: "ដើម្បីទទួលការជូនដំណឹងសុវត្ថិភាពទាន់ពេល\nសូមអនុញ្ញាតការជូនដំណឹង push។",
      allowButton: "អនុញ្ញាតការជូនដំណឹង Push",
      settingsButton: "ផ្លាស់ប្តូរការអនុញ្ញាតក្នុងការកំណត់",
    },
    aiRiskBanner: {
      title: "ការវិភាគហានិភ័យ AI",
      description: "វិភាគហានិភ័យ និងបង្កើតរបាយការណ៍តាមកាមេរ៉ា",
      action: "ទៅ",
    },
  },
  safeBoardScreen: {
    title: "បន្ទះសុវត្ថិភាព",
    alertButton: "ការព្រមាន",
    workplaceLabel: "កន្លែងធ្វើការ",
    workplaceModal: { title: "ជ្រើសរើសកន្លែងធ្វើការ" },
    badge: {
      companyWide: "ទូទាំងក្រុមហ៊ុន",
      workplace: "កន្លែងធ្វើការ",
      draft: "ព្រាង",
      archived: "បានដាក់ក្នុងប័ណ្ណសារ",
    },
    tabs: { all: "ទាំងអស់", myPosts: "របស់ខ្ញុំ" },
    empty: "គ្មានការបង្ហោះ",
    write: "សរសេរ",
    draftSaved: "ការបង្ហោះបានរក្សាទុកជាព្រាង។",
  },
  safeHealthScreen: {
    title: "ការគ្រប់គ្រងសុវត្ថិភាព",
    menu: {
      patrol: { title: "ការចុះត្រួត", description: "ការត្រួតពិនិត្យសុវត្ថិភាព" },
      educationMaterial: { title: "សម្ភារអប់រំ", description: "សម្ភារ TBM" },
      tbmManage: { title: "គ្រប់គ្រង TBM", description: "បង្កើត & គ្រប់គ្រង" },
      tbmReport: { title: "របាយការណ៍", description: "របាយការណ៍ដែលបានបង្កើត" },
      tbmJoin: { title: "ចូលរួម TBM", description: "ចូលតាម QR" },
      tbmHistory: { title: "ប្រវត្តិ", description: "ប្រវត្តិចូលរួម TBM" },
      tbmJoinWorker: { title: "ចូលរួម TBM", description: "ចូលរួម TBM បច្ចុប្បន្ន" },
      statusView: { title: "ស្ថានភាព", description: "ស្ថានភាពសុវត្ថិភាព" },
    },
  },
  workerParticipationScreen: {
    title: "ការចូលរួមរបស់កម្មករ",
    menu: {
      hazard: { title: "រាយការណ៍គ្រោះថ្នាក់", description: "រាយការណ៍តំបន់គ្រោះថ្នាក់" },
      suggestion: { title: "យោបល់ធ្វើឲ្យប្រសើរ", description: "ដាក់ស្នើគំនិត" },
    },
  },
  voiceTranslationScreen: {
    title: "ការបកប្រែការសន្ទនាដោយសំឡេង",
    flipScreen: "បញ្ច្រាស",
    listening: "កំពុងស្តាប់...",
    speakNow: "សូមនិយាយ",
    languageMenu: { title: "ភាសាដែលត្រូវបានស្គាល់" },
    languageSubtitles: {
      korean: "(កូរ៉េ)",
      english: "(អង់គ្លេស)",
      chineseSimplified: "(ចិនសាមញ្ញ)",
      chineseTraditional: "(ចិនប្រពៃណី)",
      russian: "(រុស្ស៊ី)",
      vietnamese: "(វៀតណាម)",
      indonesian: "(ឥណ្ឌូនេស៊ី)",
      khmer: "",
      thai: "(ថៃ)",
      urdu: "(អ៊ូរឌូ)",
      nepali: "(នេប៉ាល់)",
      lao: "(លាវ)",
      japanese: "(ជប៉ុន)",
      french: "(បារាំង)",
      spanish: "(អេស្បាញ)",
    },
  },
  aiSafetyChatScreen: {
    title: "ជំនួយការ AI សុវត្ថិភាព",
    aiName: "ជំនួយការ AI សុវត្ថិភាព",
    welcomeMessage: "សួស្ដី! ខ្ញុំជា AI ជំនួយការសុវត្ថិភាពឧស្សាហ៍កម្ម។",
    inputPlaceholder: "បញ្ចូលសារ...",
    inputHint: "ចាំបាច់។ សរសេររវាង 2 ដល់ 1,000 តួអក្សរ។",
    deleteDialog: {
      title: "លុបការសន្ទនា",
      message: "តើអ្នកប្រាកដថាចង់លុបប្រវត្តិការសន្ទនាទាំងអស់?",
      confirm: "លុប",
      cancel: "បោះបង់",
    },
    suggestedQuestions: {
      q1: "ពន្យល់ពីបទប្បញ្ញត្តិសុវត្ថិភាពនៅទីតាំងសំណង់",
      q2: "តើច្បាប់សុវត្ថិភាពសម្រាប់ការធ្វើការនៅកំពស់គឺជាអ្វី?",
      q3: "តើដំណើរការឆ្លើយតបក្នុងករណីអគ្គិភ័យគឺជាអ្វី?",
    },
  },
  myPageScreen: {
    logoutModal: {
      title: "ចាកចេញ",
      message: "តើអ្នកប្រាកដថាចង់ចាកចេញ?",
      cancel: "បោះបង់",
      confirm: "ចាកចេញ",
    },
  },
  notify: {
    mock: {
      boardNewPost: {
        title: "មានការបង្ហោះថ្មីនៅលើក្តារ។",
        description: "ពិនិត្យក្តារនៃកន្លែងធ្វើការរបស់អ្នក!",
      },
    },
  },
  educationPresentationScreen: {
    title: "ការអប់រំ/បទបង្ហាញ",
    inviteButton: "អញ្ជើញ",
  },
  tbmListScreen: {
    title: "បញ្ជីសកម្មភាព TBM",
    tabs: { all: "ទាំងអស់", drafting: "កំពុងសរសេរ", ongoing: "កំពុងដំណើរការ", ended: "បានបញ្ចប់" },
    status: { drafting: "កំពុងសរសេរ", ongoing: "កំពុងដំណើរការ", ended: "បានបញ្ចប់" },
    participants: "{{count}} អ្នកចូលរួម",
    fab: "បង្កើតសកម្មភាពថ្មី",
    empty: {
      drafting: "គ្មាន TBM ដែលកំពុងសរសេរ។",
      ongoing: "គ្មាន TBM ដែលកំពុងដំណើរការ។",
      ended: "គ្មាន TBM ដែលបានបញ្ចប់។",
      all: "គ្មានសកម្មភាព TBM។",
    },
  },
  welcomeIntroScreen: {
    skip: "រំលង",
    start: "ចាប់ផ្តើម",
    slide1: {
      step: "01",
      title: "ការបកប្រែពហុភាសា Real-Time",
      description:
        "ទំនាក់ទំនងយ៉ាងរលូនជាមួយកម្មករគ្រប់សញ្ជាតិ។\nការបកប្រែសំឡេង និងអត្ថបទភ្លាមៗ\nសម្រាប់កន្លែងធ្វើការដ៏មានសុវត្ថិភាព។",
    },
    slide2: {
      step: "02",
      title: "ការគ្រប់គ្រង TBM រួបរួម",
      description:
        "ចូល TBM ដោយការស្កែន QR តែម្ដង — គ្មានឯកសារ។\nហត្ថលេខាឌីជីថល និងរបាយការណ៍\nបញ្ចប់នៅកន្លែងតែមួយ។",
    },
    slide3: {
      step: "03",
      title: "ការវាយតម្លៃហានិភ័យ AI",
      description:
        "គ្រាន់តែថតរូបទីតាំង AI នឹងវិភាគគ្រោះថ្នាក់\nហើយបង្កើតព្រាងរបាយការណ៍សម្រាប់អ្នក។",
    },
  },
  languageSettings: {
    languageTitle: "ភាសា",
    languageDescription: "ប្តូរភាសាកម្មវិធីភ្លាមៗ។",
    languageChangeSuccess: "បានប្តូរភាសាទៅជា {{language}}។",
    languageChangeRestart:
      "បានប្តូរភាសាទៅជា {{language}}។\nកម្មវិធីនឹងចាប់ផ្តើមឡើងវិញដើម្បីអនុវត្តការផ្លាស់ប្តូរ។",
    languageChangeError: "មិនអាចប្តូរភាសាបានទេ។ សូមព្យាយាមម្តងទៀត។",
    languageNames: {
      "en": "អង់គ្លេស",
      "ko": "កូរ៉េ",
      "zh": "ចិន",
      "zh-Hans": "ចិន (អក្សរកាត់)",
      "zh-Hant": "ចិន (អក្សរពេញ)",
      "ja": "ជប៉ុន",
      "es": "អេស្ប៉ាញ",
      "fr": "បារាំង",
      "ru": "រុស្ស៊ី",
      "ar": "អារ៉ាប់",
      "hi": "ហិណ្ឌូ",
      "th": "ថៃ",
      "vi": "វៀតណាម",
      "id": "អង់ដូណេស៊ី",
      "km": "ខ្មែរ",
      "ur": "អ៊ូរទូ",
      "ne": "នេប៉ាល់",
      "lo": "ឡាវ",
      "my": "មីយ៉ាន់ម៉ា",
      "de": "អាល្លឺម៉ង់",
      "it": "អ៊ីតាលី",
      "yue": "ក្វាងទុង",
      "pt": "ព័រទុយហ្គាល់",
      "pt-BR": "ព័រទុយហ្គាល់ (ប្រេស៊ីល)",
      "ta": "តាមីល",
      "te": "តេលូហ្គូ",
      "uk": "អ៊ុយក្រែន",
    },
  },
}

const km: Translations = mergeLocale(en, kmOverrides as LocaleOverrides<Translations>)

export default km
