import demoFr from "./demo-fr"
import { Translations } from "./en"

const fr: Translations = {
  common: {
    ok: "OK !",
    cancel: "Annuler",
    back: "Retour",
    logOut: "Déconnexion",
  },
  welcomeScreen: {
    postscript:
      "psst  — Ce n'est probablement pas à quoi ressemble votre application. (À moins que votre designer ne vous ait donné ces écrans, dans ce cas, mettez la en prod !)",
    readyForLaunch: "Votre application, presque prête pour le lancement !",
    exciting: "(ohh, c'est excitant !)",
    letsGo: "Allons-y !",
  },
  errorScreen: {
    title: "Quelque chose s'est mal passé !",
    friendlySubtitle:
      "C'est l'écran que vos utilisateurs verront en production lorsqu'une erreur sera lancée. Vous voudrez personnaliser ce message (situé dans `app/i18n/fr.ts`) et probablement aussi la mise en page (`app/screens/ErrorScreen`). Si vous voulez le supprimer complètement, vérifiez `app/app.tsx` pour le composant <ErrorBoundary>.",
    reset: "RÉINITIALISER L'APPLICATION",
    traceTitle: "Erreur depuis %{name}",
  },
  emptyStateComponent: {
    generic: {
      heading: "Si vide... si triste",
      content:
        "Aucune donnée trouvée pour le moment. Essayez de cliquer sur le bouton pour rafraîchir ou recharger l'application.",
      button: "Essayons à nouveau",
    },
  },

  errors: {
    invalidEmail: "Adresse e-mail invalide.",
  },
  loginScreen: {
    logIn: "Se connecter",
    tagline: "Safety Partner for the Workplace",
    enterDetails:
      "Entrez vos informations ci-dessous pour débloquer des informations top secrètes. Vous ne devinerez jamais ce que nous avons en attente. Ou peut-être que vous le ferez ; ce n'est pas de la science spatiale ici.",
    emailFieldLabel: "E-mail",
    passwordFieldLabel: "Mot de passe",
    emailFieldPlaceholder: "Entrez votre adresse e-mail",
    passwordFieldPlaceholder: "Entrez votre mot de passe",
    tapToLogIn: "Appuyez pour vous connecter!",
    hint: "Hint: you can use any email address and your favorite password :)",
    forgotPassword: "Forgot your password?",
  },
  demoNavigator: {
    componentsTab: "Composants",
    debugTab: "Débogage",
    communityTab: "Communauté",
    podcastListTab: "Podcasts",
  },
  demoCommunityScreen: {
    title: "Connectez-vous avec la communauté",
    tagLine:
      "Rejoignez la communauté d'ingénieurs React Native d'Infinite Red et améliorez votre développement d'applications avec nous !",
    joinUsOnSlackTitle: "Rejoignez-nous sur Slack",
    joinUsOnSlack:
      "Vous souhaitez vous connecter avec des ingénieurs React Native du monde entier ? Rejoignez la conversation dans la communauté Slack d'Infinite Red ! Notre communauté en pleine croissance est un espace sûr pour poser des questions, apprendre des autres et développer votre réseau.",
    joinSlackLink: "Rejoindre la communauté Slack",
    makeIgniteEvenBetterTitle: "Rendre Ignite encore meilleur",
    makeIgniteEvenBetter:
      "Vous avez une idée pour rendre Ignite encore meilleur ? Nous sommes heureux de l'entendre ! Nous cherchons toujours des personnes qui veulent nous aider à construire les meilleurs outils React Native. Rejoignez-nous sur GitHub pour nous aider à construire l'avenir d'Ignite.",
    contributeToIgniteLink: "Contribuer à Ignite",
    theLatestInReactNativeTitle: "Les dernières nouvelles de React Native",
    theLatestInReactNative:
      "Nous sommes là pour vous tenir au courant de tout ce que React Native a à offrir.",
    reactNativeRadioLink: "React Native Radio",
    reactNativeNewsletterLink: "React Native Newsletter",
    reactNativeLiveLink: "React Native Live",
    chainReactConferenceLink: "Conférence Chain React",
    hireUsTitle: "Engagez Infinite Red pour votre prochain projet",
    hireUs:
      "Que ce soit pour gérer un projet complet ou pour former des équipes à notre formation pratique, Infinite Red peut vous aider pour presque tous les projets React Native.",
    hireUsLink: "Envoyez-nous un message",
  },
  demoShowroomScreen: {
    jumpStart: "Composants pour démarrer votre projet !",
    lorem2Sentences:
      "Nulla cupidatat deserunt amet quis aliquip nostrud do adipisicing. Adipisicing excepteur elit laborum Lorem adipisicing do duis.",
    demoHeaderTxExample: "Yay",
    demoViaTxProp: "Via la propriété `tx`",
    demoViaSpecifiedTxProp: "Via la propriété `{{prop}}Tx` spécifiée",
  },
  demoDebugScreen: {
    howTo: "COMMENT FAIRE",
    title: "Débugage",
    tagLine:
      "Félicitations, vous avez un modèle d'application React Native très avancé ici. Profitez de cette base de code !",
    reactotron: "Envoyer à Reactotron",
    reportBugs: "Signaler des bugs",
    demoList: "Liste de démonstration",
    demoPodcastList: "Liste de podcasts de démonstration",
    androidReactotronHint:
      "Si cela ne fonctionne pas, assurez-vous que l'application de bureau Reactotron est en cours d'exécution, exécutez adb reverse tcp:9090 tcp:9090 à partir de votre terminal, puis rechargez l'application.",
    iosReactotronHint:
      "Si cela ne fonctionne pas, assurez-vous que l'application de bureau Reactotron est en cours d'exécution, puis rechargez l'application.",
    macosReactotronHint:
      "Si cela ne fonctionne pas, assurez-vous que l'application de bureau Reactotron est en cours d'exécution, puis rechargez l'application.",
    webReactotronHint:
      "Si cela ne fonctionne pas, assurez-vous que l'application de bureau Reactotron est en cours d'exécution, puis rechargez l'application.",
    windowsReactotronHint:
      "Si cela ne fonctionne pas, assurez-vous que l'application de bureau Reactotron est en cours d'exécution, puis rechargez l'application.",
  },
  demoPodcastListScreen: {
    title: "Épisodes de Radio React Native",
    onlyFavorites: "Afficher uniquement les favoris",
    favoriteButton: "Favori",
    unfavoriteButton: "Non favori",
    accessibility: {
      cardHint:
        "Double-cliquez pour écouter l'épisode. Double-cliquez et maintenez pour {{action}} cet épisode.",
      switch: "Activez pour afficher uniquement les favoris",
      favoriteAction: "Basculer en favori",
      favoriteIcon: "Épisode non favori",
      unfavoriteIcon: "Épisode favori",
      publishLabel: "Publié le {{date}}",
      durationLabel: "Durée : {{hours}} heures {{minutes}} minutes {{seconds}} secondes",
    },
    noFavoritesEmptyState: {
      heading: "C'est un peu vide ici",
      content:
        "Aucun favori n'a été ajouté pour le moment. Appuyez sur le cœur d'un épisode pour l'ajouter à vos favoris !",
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
    title: "Ma Page",
    workplace: {
      label: "Lieu de travail Gwanggyo Tower Crane",
    },
    permissions: {
      sectionTitle: "Permissions de l'Application",
      camera: {
        title: "Appareil Photo",
        description: "Numérisation de codes QR, photos de traduction par IA, enregistrement d'urgence en cas de danger",
        button: "Autoriser",
      },
      microphone: {
        title: "Microphone",
        description: "Traduction vocale, appels radio, fonction d'identification vocale",
        button: "Autoriser",
      },
      photo: {
        title: "Photos/Bibliothèque",
        description: "Évaluation des risques par IA, traduction d'images, matériaux de formation TBM/rapports",
        button: "Autoriser",
      },
      notification: {
        title: "Notifications Push",
        description: "Alertes TBM, avertissements de danger, avis du lieu de travail",
      },
    },
    logout: "Déconnexion",
  },

  languageSettings: {
    title: "Paramètres de langue",
    description: "Changez la langue de l'application immédiatement.",
    changedTitle: "Paramètres de langue",
    changedDescription:
      "La langue a été changée en {{language}}.\nL'application va redémarrer pour appliquer les modifications.",
    confirm: "Confirmer",
    languages: {
      ko: "Coréen (한국어)",
      en: "Anglais (English)",
      zhHans: "Chinois simplifié (简体中文)",
      zhHant: "Chinois traditionnel (繁體中文)",
      ru: "Russe (Русский)",
      vi: "Vietnamien (Tiếng Việt)",
      id: "Indonésien (Bahasa Indonesia)",
      km: "Khmer (ភាសាខ្មែរ)",
      th: "Thaï (ไทย)",
      ur: "Ourdou (اردو)",
      ne: "Népalais (नेपाली)",
      lo: "Laotien (ພາສາLaos)",
    },
  },

  notify: {
    title: "Notifications",
    emptyTitle: "Aucune notification",
    emptyDescription:
      "Vous n'avez aucune notification pour l'instant.\nNous vous informerons lorsque de nouvelles notifications arriveront.",
  },

  qrScanner: {
    title: "Rejoindre Éducation/Présentation",
    description:
      "Scannez le code QR ou entrez le code partagé par le présentateur pour rejoindre la réunion.",
    permissionRequired: "L'autorisation de la caméra est requise pour scanner le code QR.",
    retry: "Réessayer",
    languageLabel: "Langue",
    currentLanguage: "Coréen",
    enterCode:
      "Problème avec la caméra ? Vous pouvez entrer le code d'éducation/présentation directement.",
    enterCodeDescription: "Entrez le code numérique à 8 chiffres partagé par le présentateur.",
    joinMeeting: "Rejoindre la Réunion",
    codePlaceholder: "Entrer le code",
  },

  imageTranslationScreen: {
    title: "Traduction d'image",
    selectImage: "Sélectionner une image à traduire",
    selectImageDesc: "Appuyez sur le bouton ci-dessous pour sélectionner une image à traduire.",
    languageLabel: "Sélectionner la langue de traduction",
    languageMenu: {
      title: "Sélectionner la Langue",
    },
    cameraButton: "Prendre une photo avec la caméra",
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
      korean: "(Coréen)",
      english: "(Anglais)",
      chineseSimplified: "(Chinois Simplifié)",
      chineseTraditional: "(Chinois Traditionnel)",
      russian: "(Russe)",
      vietnamese: "(Vietnamien)",
      indonesian: "(Indonésien)",
      khmer: "(Khmer)",
      thai: "(Thaï)",
      urdu: "(Ourdou)",
      nepali: "(Népalais)",
      lao: "(Laotien)",
      japanese: "(Japonais)",
      french: "",
      spanish: "(Espagnol)",
    },
  },

  educationPresentationScreen: {
    title: "교육/발표",
    inviteButton: "초대",
    inputLanguageLabel: "Langue d'entrée",
    languageMenu: { title: "Sélectionner la langue" },
    recognizing: "Reconnaissance vocale...",
    statusMicOff: "Veuillez autoriser l'accès au microphone pour enregistrer des notes.",
    statusMicOn: "Réception des messages en temps réel.",
    micOnLabel: "Désactiver le micro",
    micOffLabel: "Activer le micro",
    inputHint: "Écrivez votre message",
    inputPlaceholder: "Entrez le message...",
    validationError: "Veuillez entrer un message.",
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
      korean: "(Coréen)",
      english: "(Anglais)",
      chineseSimplified: "(Chinois Simplifié)",
      chineseTraditional: "(Chinois Traditionnel)",
      russian: "(Russe)",
      vietnamese: "(Vietnamien)",
      indonesian: "(Indonésien)",
      khmer: "(Khmer)",
      thai: "(Thaï)",
      urdu: "(Ourdou)",
      nepali: "(Népalais)",
      lao: "(Laotien)",
      japanese: "(Japonais)",
      french: "",
      spanish: "(Espagnol)",
    },
  },

  textTranslationScreen: {
    title: "Traduction de Texte",
    fontSizeButton: "AA",
    languageMenu: {
      title: "Sélectionner la Langue",
    },
    listening: "Écoute en cours...",
    inputPlaceholder: "Entrez le texte à traduire",
    inputHint: "Jusqu'à 1 000 caractères",
    translateButton: "Traduire",
    validationError: "ⓘ Veuillez saisir au moins un caractère.",
    speakButton: "Parler",
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
      korean: "(Coréen)",
      english: "(Anglais)",
      chineseSimplified: "(Chinois Simplifié)",
      chineseTraditional: "(Chinois Traditionnel)",
      russian: "(Russe)",
      vietnamese: "(Vietnamien)",
      indonesian: "(Indonésien)",
      khmer: "(Khmer)",
      thai: "(Thaï)",
      urdu: "(Ourdou)",
      nepali: "(Népalais)",
      lao: "(Laotien)",
      japanese: "(Japonais)",
      french: "",
      spanish: "(Espagnol)",
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

  tbmReportScreen: {
    title: "Génération de rapport TBM",
    notice: {
      description: " ·  Le journal éducatif ne peut être rédigé que pour les activités TBM en cours.\n ·  La finalisation du journal mettra automatiquement fin à l'activité TBM.\n ·  Au moins une photo du site doit être jointe.",
    },
    activityName: {
      label: "Nom de l'activité TBM",
    },
    processName: {
      label: "Nom du processus",
      placeholder: "Entrez le nom du processus",
    },
    teamName: {
      label: "Nom de l'équipe / unité",
      placeholder: "Entrez le nom de l'équipe ou de l'unité",
    },
    educationSummary: {
      label: "Résumé du contenu éducatif",
      placeholder: "Résumez le contenu éducatif",
    },
    specialNotes: {
      label: "Notes spéciales",
      placeholder: "Entrez des notes spéciales",
    },
    sitePhotos: {
      label: "Photos du site",
      addButton: "Ajouter une photo",
      helper: "Veuillez ajouter des photos du site.",
    },
    submit: "Générer le rapport",
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
    title: "Détail de l'activité TBM",
    workDate: "Date de travail:  {{date}}",
    activityLabel: "Contenu de l'activité",
    educationHeader: "Matériaux éducatifs ({{count}})",
    startActivity: "Start Activity",
    edit: "Edit",
    delete: "Delete",
    participantEmpty: "Aucun participant.",
    toastStarted: "L'activité TBM a démarré.",
    endActivity: "Terminer TBM et générer le rapport",
    participantHeader: "Participants ({{count}})",
    badgeNormal: "Normal",
    badgeCaution: "Attention",
    badgeDanger: "Danger",
    deleteModal: {
      title: "Supprimer l'activité TBM",
      message: "Êtes-vous sûr de vouloir supprimer cette activité TBM?",
      cancel: "Annuler",
      confirm: "Supprimer",
    },
    startModal: {
      title: "Démarrer l'activité TBM",
      message: "Voulez-vous démarrer cette activité TBM?\nLe statut passera à 'En cours'.",
      cancel: "Annuler",
      confirm: "Démarrer",
    },
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

  ...demoFr,
}

export default fr
