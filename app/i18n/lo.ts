import en, { Translations } from "./en"
import { mergeLocale, type LocaleOverrides } from "./mergeLocale"

const loOverrides = {
  mainTab: {
    home: "ໜ້າຫຼັກ",
    safeBoard: "ກະດານຄວາມປອດໄພ",
    safeHealth: "ການຄຸ້ມຄອງຄວາມປອດໄພ",
    workerParticipation: "ການມີສ່ວນຮ່ວມຂອງຄົນງານ",
  },
  loginScreen: {
    tagline: "ຄູ່ຮ່ວມງານດ້ານຄວາມປອດໄພໃນບ່ອນເຮັດວຽກ",
    forgotPassword: "ລືມລະຫັດຜ່ານ?",
    forgotPasswordModal: {
      title: "ແຈ້ງການ",
      message: "ສຳລັບການກູ້ຄືນລະຫັດຜ່ານ ກະລຸນາຕິດຕໍ່\nຜູ້ດູແລລະບົບຂອງທ່ານ.\nໂທ: 062-383-0083",
      confirm: "ຕົກລົງ",
    },
    validation: {
      required: "ກະລຸນາໃສ່ອີເມລ ແລະ ລະຫັດຜ່ານ.",
      invalidEmail: "ກະລຸນາໃສ່ທີ່ຢູ່ອີເມລທີ່ຖືກຕ້ອງ.",
      passwordTooShort: "ລະຫັດຜ່ານຕ້ອງມີຢ່າງໜ້ອຍ 6 ຕົວອັກສອນ.",
      invalidCredentials: "ກະລຸນາກວດສອບອີເມລ ຫຼື ລະຫັດຜ່ານຂອງທ່ານ.",
    },
  },
  homeScreen: {
    orgName: "KS산업안전협회",
    header: { qrScan: "ສະແກນ QR", notification: "ການແຈ້ງເຕືອນ", language: "ພາສາ" },
    greeting: { message: "ຂໍໃຫ້ມີວັນທີ່ປອດໄພ!", name: "{{name}}," },
    role: { admin: "ຜູ້ດູແລ", worker: "ຄົນງານ" },
    board: {
      title: "ກະດານ",
      viewMore: "ເບິ່ງເພີ່ມ",
      tabs: { all: "ທັງໝົດ", company: "ບໍລິສັດ", workplace: "ບ່ອນເຮັດວຽກ" },
    },
    grid: {
      interpret: { label: "ການແປ", sub: "ການຊ່ວຍແປ" },
      chatbot: { label: "ຊາດບອດ", sub: "AI ສົນທະນາ" },
      translate: { label: "ການແປ", sub: "ການແປຂໍ້ຄວາມ" },
      education: { label: "ການສຶກສາ", sub: "ວັດສະດຸສຶກສາ" },
      eduJoin: { label: "ຮ່ວມສຶກສາ", sub: "ຮ່ວມສຶກສາ" },
      tbmJoin: { label: "ຮ່ວມ TBM", sub: "ຮ່ວມ TBM" },
      patrol: { label: "순회점검", sub: "ການກວດກາ" },
      tbmCreate: { label: "ສ້າງ TBM", sub: "ສ້າງ TBM" },
      tbmReport: { label: "ລາຍງານ TBM", sub: "ສ້າງລາຍງານ" },
      hazard: { label: "ອັນຕະລາຍ", sub: "ລາຍງານອັນຕະລາຍ" },
      suggestion: { label: "ຂໍ້ສະເໜີ", sub: "ສ່ົງຄຳສະເໜີ" },
    },
    pushNotificationSheet: {
      title: "ຢ່າພາດການແຈ້ງເຕືອນສຳຄັນ",
      description: "ເພື່ອຮັບການແຈ້ງເຕືອນຄວາມປອດໄພທັນເວລາ\nກະລຸນາອະນຸຍາດການແຈ້ງເຕືອນ push.",
      allowButton: "ອະນຸຍາດການແຈ້ງເຕືອນ Push",
      settingsButton: "ປ່ຽນການອະນຸຍາດໃນການຕັ້ງຄ່າ",
    },
    aiRiskBanner: {
      title: "ການວິເຄາະອັນຕະລາຍ AI",
      description: "ວິເຄາະອັນຕະລາຍ ແລະ ສ້າງລາຍງານດ້ວຍກ້ອງ",
      action: "ໄປ",
    },
  },
  safeBoardScreen: {
    title: "ກະດານຄວາມປອດໄພ",
    alertButton: "ການເຕືອນ",
    workplaceLabel: "ບ່ອນເຮັດວຽກ",
    workplaceModal: { title: "ເລືອກບ່ອນເຮັດວຽກ" },
    badge: {
      companyWide: "ທົ່ວບໍລິສັດ",
      workplace: "ບ່ອນເຮັດວຽກ",
      draft: "ຮ່າງ",
      archived: "ຈັດເກັບແລ້ວ",
    },
    tabs: { all: "ທັງໝົດ", myPosts: "ຂອງຂ້ອຍ" },
    empty: "ບໍ່ມີໂພສ",
    write: "ຂຽນ",
    draftSaved: "ໂພສຖືກບັນທຶກເປັນຮ່າງ.",
  },
  safeHealthScreen: {
    title: "ການຄຸ້ມຄອງຄວາມປອດໄພ",
    menu: {
      patrol: { title: "순회점검", description: "ການກວດກາຄວາມປອດໄພ" },
      educationMaterial: { title: "ວັດສະດຸສຶກສາ", description: "ວັດສະດຸ TBM" },
      tbmManage: { title: "ຈັດການ TBM", description: "ສ້າງ & ຈັດການ" },
      tbmReport: { title: "ລາຍງານ", description: "ລາຍງານທີ່ສ້າງແລ້ວ" },
      tbmJoin: { title: "ຮ່ວມ TBM", description: "ຮ່ວມຜ່ານ QR" },
      tbmHistory: { title: "ປະຫວັດ", description: "ປະຫວັດການຮ່ວມ TBM" },
      tbmJoinWorker: { title: "ຮ່ວມ TBM", description: "ຮ່ວມ TBM ປັດຈຸບັນ" },
      statusView: { title: "ສະຖານະ", description: "ສະຖານະຄວາມປອດໄພ" },
    },
  },
  workerParticipationScreen: {
    title: "ການມີສ່ວນຮ່ວມຂອງຄົນງານ",
    menu: {
      hazard: { title: "ລາຍງານອັນຕະລາຍ", description: "ລາຍງານພື້ນທີ່ອັນຕະລາຍ" },
      suggestion: { title: "ຂໍ້ສະເໜີປັບປຸງ", description: "ສ່ົງຄຳສະເໜີ" },
    },
  },
  voiceTranslationScreen: {
    title: "ການແປສຽງສົນທະນາ",
    flipScreen: "ກັບ",
    listening: "ກຳລັງຟັງ...",
    speakNow: "ກະລຸນາເວົ້າ",
    languageMenu: { title: "ພາສາທີ່ຮັບຮູ້" },
    languageSubtitles: {
      korean: "(ເກົາຫຼີ)",
      english: "(ອັງກິດ)",
      chineseSimplified: "(ຈີນຕົວຫຍໍ)",
      chineseTraditional: "(ຈີນຕົວເຕັມ)",
      russian: "(ລັດເຊຍ)",
      vietnamese: "(ວຽດນາມ)",
      indonesian: "(ອິນໂດເນເຊຍ)",
      khmer: "(ຂະແໝ)",
      thai: "(ໄທ)",
      urdu: "(ອູດູ)",
      nepali: "(ເນປານ)",
      lao: "",
      japanese: "(ຍີ່ປຸ່ນ)",
      french: "(ຝຣັ່ງ)",
      spanish: "(ສະເປນ)",
    },
  },
  aiSafetyChatScreen: {
    title: "ຜູ້ຊ່ວຍ AI ຄວາມປອດໄພ",
    aiName: "ຜູ້ຊ່ວຍ AI ຄວາມປອດໄພ",
    welcomeMessage: "ສະບາຍດີ! ຂ້ອຍແມ່ນ AI ຜູ້ຊ່ວຍຄວາມປອດໄພທາງອຸດສາຫະກຳ.",
    inputPlaceholder: "ໃສ່ຂໍ້ຄວາມ...",
    inputHint: "ຈຳເປັນ. ຂຽນລະຫວ່າງ 2 ຫາ 1,000 ຕົວອັກສອນ.",
    deleteDialog: {
      title: "ລຶບການສົນທະນາ",
      message: "ທ່ານແນ່ໃຈບໍ່ທີ່ຈະລຶບປະຫວັດການສົນທະນາທັງໝົດ?",
      confirm: "ລຶບ",
      cancel: "ຍົກເລີກ",
    },
    suggestedQuestions: {
      q1: "ອະທິບາຍລະບຽບຄວາມປອດໄພທົ່ວໄປໃນສະຖານກໍ່ສ້າງ",
      q2: "ກົດລະບຽບຄວາມປອດໄພໃນການເຮັດວຽກທີ່ສູງແມ່ນຫຍັງ?",
      q3: "ຂັ້ນຕອນການຮັບມືຣ້ອນໃນກໍລະນີໄຟໄໝ້ແມ່ນຫຍັງ?",
    },
  },
  myPageScreen: {
    logoutModal: {
      title: "ອອກຈາກລະບົບ",
      message: "ທ່ານແນ່ໃຈທີ່ຈະອອກຈາກລະບົບ?",
      cancel: "ຍົກເລີກ",
      confirm: "ອອກຈາກລະບົບ",
    },
  },
  notify: {
    mock: {
      boardNewPost: {
        title: "ມີໂພສໃໝ່ໃນກະດານ.",
        description: "ກວດສອບກະດານຂອງບ່ອນເຮັດວຽກຂອງທ່ານ!",
      },
    },
  },
  educationPresentationScreen: {
    title: "ການສຶກສາ/ການນຳສະເໜີ",
    inviteButton: "ເຊີນ",
  },
  tbmListScreen: {
    title: "ລາຍຊື່ກິດຈະກຳ TBM",
    tabs: { all: "ທັງໝົດ", drafting: "ກຳລັງຂຽນ", ongoing: "ກຳລັງດຳເນີນ", ended: "ສິ້ນສຸດ" },
    status: { drafting: "ກຳລັງຂຽນ", ongoing: "ກຳລັງດຳເນີນ", ended: "ສິ້ນສຸດ" },
    participants: "{{count}} ຜູ້ເຂົ້າຮ່ວມ",
    fab: "ສ້າງກິດຈະກຳໃໝ່",
    empty: {
      drafting: "ບໍ່ມີ TBM ທີ່ກຳລັງຂຽນ.",
      ongoing: "ບໍ່ມີ TBM ທີ່ກຳລັງດຳເນີນ.",
      ended: "ບໍ່ມີ TBM ທີ່ສິ້ນສຸດ.",
      all: "ບໍ່ມີກິດຈະກຳ TBM.",
    },
  },
  welcomeIntroScreen: {
    skip: "ຂ້າມ",
    start: "ເລີ່ມຕົ້ນ",
    slide1: {
      step: "01",
      title: "ການແປພາສາ Real-Time",
      description:
        "ສື່ສານຢ່າງຄ່ອງແຄ້ວກັບຄົນງານທຸກສັນຊາດ.\nການແປສຽງ ແລະ ຂໍ້ຄວາມທັນທີ\nສຳລັບບ່ອນເຮັດວຽກທີ່ປອດໄພກວ່າ.",
    },
    slide2: {
      step: "02",
      title: "ການຈັດການ TBM ລວມ",
      description:
        "ເຂົ້າຮ່ວມ TBM ດ້ວຍການສະແກນ QR ຄັ້ງດຽວ — ບໍ່ຕ້ອງໃຊ້ເຈ້ຍ.\nລາຍເຊັນດິຈິຕອລ ແລະ ລາຍງານ\nສຳເລັດໃນທີ່ດຽວ.",
    },
    slide3: {
      step: "03",
      title: "ການປະເມີນຄວາມສ່ຽງ AI",
      description: "ພຽງຖ່າຍຮູບສະຖານທີ່ AI ຈະວິເຄາະອັນຕະລາຍ\nແລະ ສ້າງລາຍງານຮ່າງໃຫ້ທ່ານ.",
    },
  },
  languageSettings: {
    languageTitle: "ພາສາ",
    languageDescription: "ປ່ຽນພາສາແອັບໄດ້ທັນທີ",
    languageChangeSuccess: "ປ່ຽນພາສາເປັນ {{language}} ສຳເລັດແລ້ວ",
    languageChangeRestart:
      "ປ່ຽນພາສາເປັນ {{language}}\nສຳເລັດແລ້ວ. ແອັບຈະເລີ່ມໃໝ່ເພື່ອນຳການປ່ຽນແປງໄປໃຊ້",
    languageChangeError: "ບໍ່ສາມາດປ່ຽນພາສາໄດ້. ກະລຸນາລອງໃໝ່",
    languageNames: {
      "en": "ພາສາອັງກິດ",
      "ko": "ພາສາເກົາຫຼີ",
      "zh": "ພາສາຈີນ",
      "zh-Hans": "ຈີນ (ໂຕລ່ຽງ)",
      "zh-Hant": "ຈີນ (ໂຕຫຍ້ໍ)",
      "ja": "ພາສາຍີ່ປຸ່ນ",
      "es": "ພາສາສະເປນ",
      "fr": "ພາສາຝຣັ່ງ",
      "ru": "ພາສາລັດເຊຍ",
      "ar": "ພາສາອາຣາບິກ",
      "hi": "ພາສາຮິນດີ",
      "th": "ພາສາໄທ",
      "vi": "ພາສາຫວຽດນາມ",
      "id": "ພາສາອິນໂດເນເຊຍ",
      "km": "ພາສາຂະແໝ",
      "ur": "ພາສາອູດູ",
      "ne": "ພາສາເນປານ",
      "lo": "ພາສາລາວ",
      "my": "ພາສາມຽນມາ",
      "de": "ພາສາເຢຍລະມັນ",
      "it": "ພາສາອິຕາລີ",
      "yue": "ກວາງຕຸ້ງ",
      "pt": "ພາສາໂປຕຸເກດ",
      "pt-BR": "ພາສາໂປຕຸເກດ (ບຣາຊິນ)",
      "ta": "ທາມິນ",
      "te": "ເຕລູກູ",
      "uk": "ພາສາຢູເຄຣນ",
    },
  },
}

const lo: Translations = mergeLocale(en, loOverrides as LocaleOverrides<Translations>)

export default lo
