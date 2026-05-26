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
    tagline: "Partenaire de sécurité sur le lieu de travail",
    enterDetails:
      "Entrez vos informations ci-dessous pour débloquer des informations top secrètes. Vous ne devinerez jamais ce que nous avons en attente. Ou peut-être que vous le ferez ; ce n'est pas de la science spatiale ici.",
    emailFieldLabel: "E-mail",
    passwordFieldLabel: "Mot de passe",
    emailFieldPlaceholder: "Entrez votre adresse e-mail",
    passwordFieldPlaceholder: "Entrez votre mot de passe",
    tapToLogIn: "Appuyez pour vous connecter!",
    hint: "Astuce : utilisez n'importe quelle adresse e-mail et votre mot de passe favori :)",
    forgotPassword: "Mot de passe oublié ?",
    forgotPasswordModal: {
      title: "Avis",
      message:
        "Pour la récupération de mot de passe, veuillez contacter\nvotre administrateur.\nTél : 062-383-0083",
      confirm: "OK",
    },
    validation: {
      required: "Veuillez saisir votre e-mail et votre mot de passe.",
      invalidEmail: "Veuillez saisir une adresse e-mail valide.",
      passwordTooShort: "Le mot de passe doit comporter au moins 6 caractères.",
      invalidCredentials: "Veuillez vérifier votre e-mail ou mot de passe.",
    },
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

  mainTab: {
    home: "Accueil",
    safeBoard: "Tableau de sécurité",
    safeHealth: "Gestion de la sécurité",
    workerParticipation: "Participation des travailleurs",
  },

  homeScreen: {
    orgName: "KS산업안전협회",
    header: { qrScan: "Scanner QR", notification: "Notifications", language: "Langue" },
    greeting: { message: "Passez une journée en toute sécurité !", name: "{{name}}," },
    role: { admin: "Administrateur", worker: "Travailleur" },
    devToggle: { eduBanner: "Bannière Édu" },
    board: {
      title: "Tableau de sécurité",
      viewMore: "Plus",
      tabs: { all: "Tout", company: "Toute la société", workplace: "Lieu de travail" },
    },
    edu: { title: "Éducation", description: "Description" },
    banner: { text: "Environnement sûr" },
    aiRiskBanner: {
      title: "Analyse des Risques IA",
      description: "Analysez les dangers et générez des rapports par caméra",
      action: "Aller",
    },
    footer: {
      homepage: "Accueil",
      privacy: "Confidentialité",
      terms: "Conditions",
      copyright: "Copyright © KS Association de sécurité industrielle tous droits réservés.",
      webViewLoading: "Connexion à",
      webViewLoadingWait: "Veuillez patienter un moment",
      webViewClose: "Fermer",
    },
    grid: {
      interpret: { label: "Interprétation", sub: "Support d'interprétation" },
      chatbot: { label: "Chatbot sécurité", sub: "Consultation/questions sécurité" },
      translate: { label: "Traduction", sub: "Support de traduction" },
      education: { label: "Éducation/Présentation", sub: "Présentation des matériaux" },
      eduJoin: { label: "Rejoindre l'éducation", sub: "Rejoindre éducation/présentation" },
      tbmJoin: { label: "Rejoindre TBM", sub: "Rejoindre la réunion de sécurité" },
      patrol: { label: "Ronde d'inspection", sub: "Effectuer/enregistrer une ronde" },
      tbmCreate: { label: "TBM", sub: "Voir/créer TBM" },
      tbmReport: { label: "Rapport TBM", sub: "Voir le rapport TBM" },
      hazard: { label: "Zones dangereuses", sub: "Voir les zones dangereuses" },
      suggestion: { label: "Suggestions", sub: "Enregistrer des suggestions d'amélioration" },
    },
    pushNotificationSheet: {
      title: "Ne manquez pas les alertes importantes",
      description:
        "Pour recevoir les alertes de sécurité et les annonces à temps,\nveuillez autoriser les notifications push.",
      allowButton: "Autoriser les notifications push",
      settingsButton: "Modifier les autorisations dans les paramètres",
    },
  },
  safeBoardScreen: {
    title: "Tableau de sécurité",
    alertButton: "Alerte",
    workplaceLabel: "Lieu de travail",
    workplaceModal: { title: "Sélectionner le lieu de travail" },
    badge: {
      companyWide: "Toute la société",
      workplace: "Lieu de travail",
      draft: "Brouillon",
      archived: "Archivé",
    },
    tabs: { all: "Tout", myPosts: "Mes publications" },
    empty: "Vide",
    write: "Écrire",
    draftSaved: "Publication enregistrée en brouillon.",
  },
  safeBoardDetailScreen: {
    title: "Détail de la publication",
    authorLabel: "Auteur",
    editButton: "Modifier",
    alertOn: "Alerte ON",
    alertOff: "Alerte OFF",
    publishButton: "Publier",
    deleteButton: "Supprimer",
    publishModal: {
      title: "Publier la publication",
      message: "Êtes-vous sûr de vouloir publier cette publication ?",
      cancel: "Annuler",
      confirm: "Publier",
    },
    deleteModal: {
      title: "Supprimer la publication",
      message: "Êtes-vous sûr de vouloir supprimer cette publication ?",
      cancel: "Annuler",
      confirm: "Supprimer",
    },
  },
  safeBoardNotifyScreen: {
    title: "Envoyer une notification push au lieu de travail",
    guide: {
      title: "Guide de rédaction",
      description:
        "Sélectionnez un ou plusieurs lieux de travail que vous gérez\net rédigez une notification à envoyer\naux membres du site.",
    },
    workplace: {
      label: "Sélectionner le lieu de travail",
      helper: "Envoi à {{selected}} sur {{total}} lieux de travail",
    },
    notifyTitle: {
      label: "Titre de la notification",
      placeholder: "Entrez un titre court.",
      helper: "Jusqu'à 50 caractères.",
    },
    content: {
      label: "Contenu de la notification push",
      placeholder: "Entrez le message de notification à envoyer à ce lieu de travail.",
      helper: "Jusqu'à 240 caractères.",
    },
    send: "Envoyer la notification",
    sendSuccess: "Notification envoyée.",
  },
  safeBoardCreateScreen: {
    title: "Écrire une publication",
    guide: {
      title: "Guide de rédaction",
      description: "Veuillez rédiger un contenu clair et précis.",
    },
    workplace: {
      label: "Lieu de travail",
      placeholder: "Sélectionner le lieu de travail",
      helper: "Sélectionnez le lieu de travail auquel cette publication s'applique.",
    },
    postTitle: {
      label: "Titre de la publication",
      placeholder: "Entrez le titre de la publication (max 200 caractères)",
      helper: "Entrez un titre clair et descriptif.",
    },
    content: {
      label: "Contenu de la publication",
      placeholder: "Entrez le contenu de la publication (max 2000 caractères)",
      helper: "Décrivez le problème de sécurité en détail.",
    },
    attachment: {
      label: "Pièces jointes",
      card1Text: "(Facultatif) Vous pouvez télécharger\ndes fichiers jusqu'à 50 Mo.",
      uploadButton: "Télécharger un fichier",
      noFile: "Aucun fichier sélectionné.",
    },
    pushNotification: {
      label: "Envoyer une notification push",
      cardText:
        "Si sélectionné, une notification push sera envoyée à tous les membres du lieu de travail sélectionné lors de la publication.",
    },
    save: "Enregistrer",
  },

  safeHealthScreen: {
    title: "Gestion de la sécurité",
    menu: {
      patrol: {
        title: "Ronde d'inspection",
        description: "Enregistrer la ronde d'inspection du lieu de travail",
      },
      educationMaterial: {
        title: "Matériel éducatif",
        description: "Gérer le matériel éducatif TBM",
      },
      tbmManage: { title: "Gestion TBM", description: "Voir/créer des activités TBM" },
      tbmReport: { title: "Rapport TBM", description: "Générer un rapport TBM" },
      tbmJoin: { title: "Rejoindre TBM", description: "Rejoindre une réunion TBM" },
      tbmHistory: {
        title: "Historique TBM",
        description: "Voir l'historique de participation TBM",
      },
      tbmJoinWorker: { title: "Rejoindre TBM", description: "Rejoindre une réunion TBM" },
      statusView: { title: "Statut", description: "Voir le statut des rapports TBM" },
    },
  },
  workerParticipationScreen: {
    title: "Participation des travailleurs",
    menu: {
      hazard: { title: "Zones dangereuses", description: "Signaler les zones dangereuses" },
      suggestion: {
        title: "Suggestions d'amélioration",
        description: "Enregistrer des suggestions d'amélioration",
      },
    },
  },

  voiceTranslationScreen: {
    title: "Traduction de conversation vocale",
    flipScreen: "Inverser",
    listening: "Écoute en cours...",
    speakNow: "Parlez maintenant",
    languageMenu: {
      title: "Langue reconnue",
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
      korean: "(Coréen)",
      english: "(Anglais)",
      chineseSimplified: "(Chinois simplifié)",
      chineseTraditional: "(Chinois traditionnel)",
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

  aiSafetyChatScreen: {
    title: "Assistant sécurité IA",
    aiName: "Assistant sécurité IA",
    welcomeMessage: "Bonjour ! Je suis l'assistant IA de sécurité industrielle.",
    inputPlaceholder: "Entrez un message...",
    inputHint: "Obligatoire. Veuillez écrire entre 2 et 1 000 caractères.",
    deleteDialog: {
      title: "Supprimer la conversation",
      message: "Êtes-vous sûr de vouloir supprimer tout l'historique des conversations ?",
      confirm: "Supprimer",
      cancel: "Annuler",
    },
    suggestedQuestions: {
      q1: "Expliquez les réglementations générales de sécurité sur les chantiers de construction",
      q2: "Quelles sont les règles de sécurité pour travailler en hauteur ?",
      q3: "Quelle est la procédure d'intervention d'urgence en cas d'incendie ?",
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
        description:
          "Numérisation de codes QR, photos de traduction par IA, enregistrement d'urgence en cas de danger",
        button: "Autoriser",
      },
      microphone: {
        title: "Microphone",
        description: "Traduction vocale, appels radio, fonction d'identification vocale",
        button: "Autoriser",
      },
      photo: {
        title: "Photos/Bibliothèque",
        description:
          "Évaluation des risques par IA, traduction d'images, matériaux de formation TBM/rapports",
        button: "Autoriser",
      },
      notification: {
        title: "Notifications Push",
        description: "Alertes TBM, avertissements de danger, avis du lieu de travail",
      },
    },
    logout: "Déconnexion",
    logoutModal: {
      title: "Déconnexion",
      message: "Êtes-vous sûr de vouloir vous déconnecter ?",
      cancel: "Annuler",
      confirm: "Déconnexion",
    },
  },

  languageSettings: {
    languageTitle: "Paramètres de langue",
    languageDescription: "Changez la langue de l'application immédiatement.",
    languageChangeSuccess: "La langue a été changée en {{language}}.",
    languageChangeRestart:
      "La langue a été changée en {{language}}.\nL'application va redémarrer pour appliquer les modifications.",
    languageChangeError: "Impossible de changer la langue. Veuillez réessayer.",
    languageNames: {
      "en": "Anglais",
      "ko": "Coréen",
      "zh": "Chinois",
      "zh-Hans": "Chinois simplifié",
      "zh-Hant": "Chinois traditionnel",
      "yue": "Cantonais",
      "pt": "Portugais",
      "pt-BR": "Portugais (Brésil)",
      "ja": "Japonais",
      "es": "Espagnol",
      "fr": "Français",
      "de": "Allemand",
      "it": "Italien",
      "ru": "Russe",
      "ar": "Arabe",
      "hi": "Hindi",
      "ta": "Tamoul",
      "te": "Télougou",
      "th": "Thaï",
      "uk": "Ukrainien",
      "vi": "Vietnamien",
      "id": "Indonésien",
      "km": "Khmer",
      "ur": "Ourdou",
      "ne": "Népalais",
      "lo": "Laotien",
      "my": "Birman",
    },
  },

  notify: {
    title: "Notifications",
    emptyTitle: "Aucune notification",
    emptyDescription:
      "Vous n'avez aucune notification pour l'instant.\nNous vous informerons lorsque de nouvelles notifications arriveront.",
    mock: {
      boardNewPost: {
        title: "Une nouvelle publication a été écrite sur le tableau.",
        description: "Consultez le tableau de votre lieu de travail affilié !",
      },
    },
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
    title: "Éducation/Présentation",
    inviteButton: "Inviter",
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
    title: "Liste des activités TBM",
    tabs: { all: "Tout", drafting: "En rédaction", ongoing: "En cours", ended: "Terminé" },
    status: { drafting: "En rédaction", ongoing: "En cours", ended: "Terminé" },
    participants: "{{count}} participant(s)",
    fab: "Créer une nouvelle activité",
    empty: {
      drafting: "Aucun TBM en rédaction.",
      ongoing: "Aucun TBM en cours.",
      ended: "Aucun TBM terminé.",
      all: "Aucune activité TBM.",
    },
  },

  tbmJoinInfoScreen: {
    title: "Rejoindre TBM",
    sectionInfo: "Informations TBM",
    activityName: "Nom de l'activité",
    manager: "Responsable",
    date: "Date",
    sectionAttachments: "Pièces jointes",
    noAttachments: "Aucune pièce jointe.",
    prev: "Précédent",
    next: "Suivant",
  },

  tbmJoinHealthScreen: {
    title: "Rejoindre TBM",
    heading: "Vérification de santé",
    prompt:
      "Veuillez confirmer si vous avez consommé de l'alcool excessivement la veille ou si vous avez des problèmes de santé aujourd'hui.",
    statusGood: "Aucun problème",
    statusBad: "Problème présent",
    prev: "Précédent",
    next: "Suivant",
    toastMessage: "Veuillez sélectionner votre état de santé avant de continuer.",
    notAllCheckedModal: {
      title: "Veuillez sélectionner votre état de santé.",
      message: "Vous devez sélectionner Aucun problème ou Problème présent pour continuer.",
      confirm: "OK",
    },
  },

  tbmJoinSignScreen: {
    title: "Rejoindre TBM",
    heading: "Signature Électronique",
    description: "Veuillez signer dans la zone ci-dessous.",
    signatureArea: "Signez ici",
    clearLabel: "Réinitialiser la signature",
    prev: "Précédent",
    next: "Suivant",
    noSignatureModal: {
      title: "Signature requise.",
      message: "Veuillez compléter votre signature avant de continuer.",
      confirm: "OK",
    },
  },

  tbmJoinCompleteScreen: {
    title: "Rejoindre TBM",
    heading: "Participation au TBM complétée",
    subtitle: "Passez une journée en toute sécurité !",
    goHome: "Terminer",
  },

  tbmJoinScreen: {
    title: "Rejoindre TBM",
    selectPrompt: "Veuillez sélectionner un TBM à rejoindre",
    empty: {
      title: "Aucun TBM en cours.",
      subtitle: "Il n'y a pas de sessions TBM disponibles en ce moment.",
    },
    prev: "Précédent",
    next: "Suivant",
    noSelectionModal: {
      title: "Aucune session sélectionnée.",
      message: "Veuillez sélectionner une session TBM à rejoindre.",
      confirm: "OK",
    },
    infoModal: {
      title: "Guide TBM",
      meaning: {
        heading: "Qu'est-ce que le TBM ?",
        body: "TBM signifie Tool Box Meeting — une brève réunion de sécurité avant le travail où les tâches de la journée, les risques et les mesures de sécurité sont examinés ensemble.",
      },
      importance: {
        heading: "Pourquoi le TBM est important",
        body: "Le TBM est une étape essentielle pour prévenir les accidents en partageant les risques à l'avance, en clarifiant les rôles et en vérifiant le port des équipements de protection individuelle.",
      },
      procedure: {
        heading: "Comment ça fonctionne",
        step1: "Confirmez le périmètre de travail du jour et les participants.",
        step2: "Partagez les principaux risques et mesures de sécurité.",
        step3:
          "Vérifiez la santé des travailleurs, les équipements de protection et tout changement sur le site.",
        step4: "Passez en revue le contenu, puis complétez la participation TBM et signez.",
      },
      close: "Fermer",
    },
  },

  tbmReportScreen: {
    title: "Génération de rapport TBM",
    notice: {
      description:
        " ·  Le journal éducatif ne peut être rédigé que pour les activités TBM en cours.\n ·  La finalisation du journal mettra automatiquement fin à l'activité TBM.\n ·  Au moins une photo du site doit être jointe.",
    },
    activityName: {
      label: "Activité TBM",
    },
    processName: {
      label: "Nom du processus",
      placeholder: "Entrez le nom du processus",
      helper: "Facultatif. Jusqu'à 50 caractères.",
    },
    teamName: {
      label: "Nom de l'équipe / unité",
      placeholder: "Entrez le nom de l'équipe ou de l'unité",
      helper: "Facultatif. Jusqu'à 50 caractères.",
    },
    educationSummary: {
      label: "Résumé du contenu éducatif",
      placeholder: "Résumez le contenu éducatif",
      helper: "Entre 10 et 1 000 caractères.",
    },
    specialNotes: {
      label: "Notes spéciales",
      placeholder: "Entrez des notes spéciales",
      helper: "Jusqu'à 500 caractères.",
    },
    sitePhotos: {
      label: "Photos du site",
      addButton: "Ajouter une photo",
      guide:
        "Au moins 1 photo du site doit être enregistrée.\nVous pouvez joindre de 1 à 5 photos minimum et maximum.",
      preview: "Un aperçu s'affichera lorsque vous ajouterez une image.",
    },
    submit: "Générer le rapport",
  },

  tbmCreateScreen: {
    title: "Créer une activité TBM",
    reset: "Réinitialiser",
    guide: {
      title: "Guide de rédaction",
      description:
        "Gérez votre lieu de travail, votre emploi du temps, le contenu de l'activité et les matériaux éducatifs en un seul écran pour créer immédiatement une activité TBM. Vous pouvez sélectionner les matériaux éducatifs dans une liste déroulante ou les ajouter directement.",
    },
    workplace: {
      label: "Sélectionner le lieu de travail",
      placeholder: "Sélectionner un lieu de travail",
      helper: "Veuillez sélectionner le lieu de travail pour cette activité TBM.",
    },
    dateTime: {
      label: "Date de travail (AAAA-MM-JJ)",
      includeDateInTitle: "Inclure la date dans le titre",
      helper: "Veuillez sélectionner la date de travail dans le calendrier.",
      confirm: "Confirmer",
    },
    activityTitle: {
      label: "Titre de l'activité",
      placeholder: "ex. 2026.05.15 TBM Travaux ferraillage matin",
      helper: "Le titre de l'activité peut comporter jusqu'à 200 caractères.",
    },
    content: {
      label: "Contenu de l'activité",
      placeholder: "Entrez le contenu principal du travail",
      helper: "Entrez le contenu du travail. Maximum 2 000 caractères.",
    },
    education: {
      label: "Sélectionner les matériaux éducatifs",
      statusBadge: "Statut de sélection",
      multipleBadge: "Plusieurs sélections autorisées",
      countText: "{{count}} élément(s) sélectionné(s)",
      countHelper:
        "Accédez à la confirmation de sélection pour ajouter ou modifier les matériaux éducatifs.",
      selectButton: "+ Sélectionner les matériaux éducatifs",
    },
    submit: "Créer",
  },

  tbmDetailScreen: {
    title: "Détail de l'activité TBM",
    workDate: "Date de travail:  {{date}}",
    activityLabel: "Contenu de l'activité",
    educationHeader: "Matériaux éducatifs ({{count}})",
    startActivity: "Démarrer l'activité",
    edit: "Modifier",
    delete: "Supprimer",
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

  educationMaterialScreen: {
    title: "Liste des matériaux éducatifs TBM",
    registerButton: "Enregistrer un nouveau matériau éducatif",
  },

  educationMaterialRegisterScreen: {
    title: "Enregistrer un matériau éducatif TBM",
    guide: {
      title: "Guide de rédaction",
      description:
        "Enregistrez le titre, le contenu clé et la pièce jointe en une seule fois pour une utilisation immédiate sur le terrain. Les matériaux enregistrés peuvent être sélectionnés pour plusieurs activités TBM.",
    },
    attachment: {
      label: "Pièce jointe",
      boxPlaceholder: "nomdufichier.format",
      helper: "Un seul fichier autorisé, jusqu'à 50 Mo maximum.",
    },
    educationTitle: {
      label: "Titre de l'éducation",
      placeholder: "Entrez le titre du matériau éducatif",
      includeFileName: "Utiliser le nom du fichier comme titre",
      includeFileNameDesc: "Le nom du fichier sélectionné sera reflété dans le champ titre.",
    },
    content: {
      label: "Contenu éducatif",
      placeholder: "Entrez le contenu éducatif",
      helper:
        "La description est facultative. Si fournie, jusqu'à 10 000 caractères peuvent être saisis.",
    },
    submit: "Enregistrer",
  },

  educationMaterialDetailScreen: {
    title: "Détail du matériau éducatif TBM",
    sourceKs: "KS Association de sécurité industrielle",
    sourceMine: "Mon matériau",
    statusActive: "Actif",
    statusArchived: "Archivé",
    categoryLabel: "Catégorie :",
    attachmentLabel: "Pièce jointe",
    registrantLabel: "Déclarant :",
    publishButton: "Publier après activation",
  },

  educationSelectScreen: {
    title: "Sélectionner les matériaux éducatifs",
    sourceTab1: "KS Association de sécurité",
    sourceTab2: "KS Association de sécurité",
    sourceTab3: "Mes matériaux",
    searchPlaceholder: "Entrez le contenu à rechercher",
    confirm: "Complet ({{count}})",
    confirmNone: "Complet",
    emptyText: "Aucun matériau éducatif disponible.",
  },

  improvementProposalDetailScreen: {
    title: "Gestion des détails de la proposition",
    result: {
      sectionTitle: "Résultat du traitement",
      reflected: "A été pris en compte.",
      rejected: "N'a pas été pris en compte.",
      dateLabel: "Traité le :",
    },
    alreadyProcessed: "Cette proposition a déjà été traitée.",
    saveProcessingMessage: "Les notes de traitement ont été enregistrées.",
    workerNoEditMessage:
      "Les propositions en cours ou déjà traitées ne peuvent pas être modifiées ou supprimées.",
    status: {
      pending: "En attente",
      ongoing: "En cours",
      reflected: "Reflété",
      rejected: "Non reflété",
    },
    statusChange: {
      sectionTitle: "Changement de statut et traitement",
      ongoingBtn: "En cours",
      reflectedBtn: "Reflété",
      rejectedBtn: "Non reflété",
      inputLabel: "Notes de traitement",
      pendingMessage: "Le statut est En attente.\nPassez à En cours avant de traiter.",
      ongoingMessage: "Disponible lors de la sélection d'un statut terminé ou rejeté.",
      rejectedInputLabel: "Motif de rejet",
      rejectedProcessingPlaceholder: "Veuillez décrire le motif de rejet en détail.",
      processingPlaceholder:
        "Décrivez en détail l'action prise. (ex. Révision de l'équipe d'équipement terminée et arrangement effectué)",
    },
    history: {
      sectionTitle: "Historique des changements de statut",
      registeredTitle: "Proposition enregistrée",
      registeredDesc: "La proposition a été reçue.",
      ongoingTitle: "En cours",
      ongoingChangeTitle: "Passage à En cours",
      ongoingDesc: "L'examen de la proposition a commencé.",
      reflectedTitle: "Reflété",
      reflectedChangeTitle: "Traitement Accepté",
      reflectedDesc: "La proposition a été reflétée.",
      rejectedTitle: "Non reflété",
      rejectedChangeTitle: "Traitement Rejeté",
      rejectedDesc: "La proposition n'a pas pu être reflétée.",
      proceedNote: "Responsable assigné -",
      reflectedNote: "Traité comme accepté -",
      rejectedNote: "Traité comme rejeté -",
    },
    editForm: {
      label: "Détails",
      required: " *",
      helper: "Vous pouvez écrire jusqu'à 2 000 caractères.",
      errorMaxLength: "Veuillez saisir les détails dans la limite de 2 000 caractères.",
    },
    edit: "Modifier",
    delete: "Supprimer",
    proceed: "Procéder",
    saveProceeded: "Enregistrer les notes de traitement",
    proceedStartedMessage: "Le traitement a commencé.",
    cancel: "Annuler",
    save: "Enregistrer",
    savedMessage: "La proposition a été mise à jour.",
    deletedMessage: "La proposition a été supprimée.",
    deleteModal: {
      title: "Supprimer la proposition",
      message:
        "Voulez-vous supprimer cette proposition ?\nLes propositions supprimées ne peuvent pas être récupérées.",
      cancel: "Annuler",
      confirm: "Supprimer",
    },
  },

  improvementProposalCreateScreen: {
    title: "Écrire une proposition",
    guide: {
      title: "Guide de rédaction",
      description:
        "Proposez librement des idées pour améliorer la sécurité et l'efficacité du travail sur le terrain. Il serait utile d'inclure des lieux et des situations spécifiques.",
    },
    workplace: {
      label: "Lieu de travail",
      placeholder: "Veuillez sélectionner un lieu de travail",
      helper: "Vous pouvez sélectionner un lieu de travail dans la liste.",
    },
    detail: {
      label: "Détails",
      required: " *",
      placeholder:
        "Que souhaitez-vous améliorer ?\nExemples)\n · Problème : L'éclairage du couloir B est trop faible, rendant le travail dangereux.\n · Proposition : Veuillez ajouter un éclairage LED ou améliorer la luminosité.",
      helper: "Vous pouvez écrire jusqu'à 2 000 caractères.",
      errorMaxLength: "Veuillez saisir les détails dans la limite de 2 000 caractères.",
    },
    submit: "Soumettre",
    submitting: "Envoi en cours...",
  },

  improvementProposalListScreen: {
    title: "Propositions d'amélioration",
    tabs: {
      all: "Tout",
      pending: "En attente",
      ongoing: "En cours",
      reflected: "Reflété",
      rejected: "Non reflété",
    },
    summary: {
      myProposals: "Mes propositions",
      reflected: "Reflété",
      unit: "élément(s)",
    },
    status: {
      pending: "En attente",
      ongoing: "En cours",
      reflected: "Reflété",
      rejected: "Non reflété",
    },
    fab: "Nouvelle proposition",
    empty: {
      all: "Aucune proposition enregistrée.",
      pending: "Aucune proposition en attente.",
      ongoing: "Aucune proposition en cours.",
      reflected: "Aucune proposition reflétée.",
      rejected: "Aucune proposition marquée comme non reflétée.",
    },
  },

  tbmReportInquiryScreen: {
    title: "Enquête sur le rapport TBM",
    tabs: {
      all: "Tout",
      requested: "Demandé",
      generating: "En génération",
      completed: "Terminé",
      failed: "Échoué",
    },
    empty: {
      all: "Aucun rapport trouvé.",
      requested: "Aucun rapport en attente.",
      generating: "Aucun rapport en cours de génération.",
      completed: "Aucun rapport terminé.",
      failed: "Aucun rapport échoué.",
    },
  },

  tbmReportStatusScreen: {
    title: "Statut du rapport TBM",
    regenerate: "Régénérer",
    sectionReportInfo: "Informations du rapport",
    sectionProcessStatus: "Statut du traitement",
    sectionStatusHistory: "Historique des statuts",
    processName: "Nom du processus",
    teamName: "Équipe/Unité",
    historyRequestedAt: "Date de demande",
    historyStartedAt: "Début du traitement",
    historyCompletedAt: "Traitement terminé",
    downloadPdf: "Télécharger PDF",
    sectionRegenerate: "Régénération du rapport",
    regenerateInfoText:
      "Veuillez saisir les éléments ci-dessous avant\nde demander la régénération du rapport.",
    processNameLabel: "Nom du processus (facultatif)",
    processNamePlaceholder: "ex. Presse",
    teamNameLabel: "Équipe/Unité (facultatif)",
    teamNamePlaceholder: "ex. Équipe 1",
    inputDescription: "Champ facultatif. Maximum 50 caractères.",
    cautionTitle: "Attention",
    cautionItem1: "La régénération n'est disponible que pour les rapports échoués ou terminés.",
    cautionItem2:
      "Les rapports en attente ou en cours de traitement ne peuvent pas être régénérés.",
    cautionItem3: "La régénération réinitialisera les résultats existants.",
    requestRegenerate: "Demander une régénération",
    regenerateNote: "Une nouvelle régénération peut prendre un certain temps.",
    refresh: "Actualiser",
    toastRegenerate: "La demande de régénération du rapport a été soumise.",
  },

  patrolScreen: {
    title: "Inspection de ronde du lieu de travail",
    createButton: "Nouvelle inspection",
    workplaceSelector: {
      label: "Lieu de travail sélectionné",
      modalTitle: "Sélectionnez un lieu de travail pour voir la liste d'inspections.",
    },
    badge: {
      underReview: "En révision",
      inProgress: "En rédaction",
      approved: "Approuvé",
    },
    card: {
      reviewer: "Réviseur",
      approver: "Approbateur",
    },
  },
  patrolDetailScreen: {
    title: "Détail de l'Inspection",
    editButton: "Modifier",
    summaryCard: {
      title: "Résumé de l'inspection",
      total: "Total",
      good: "Bon",
      bad: "Mauvais",
    },
    detailCard: {
      overallActions: "Mesures Générales",
      inspectionItems: "Éléments d'Inspection",
      checkItem: {
        goodBadge: "Bon",
        badBadge: "Mauvais",
        actionLabel: "Action",
      },
    },
    buttons: {
      submit: "Soumettre",
      editComplete: "Modification Terminée",
      reviewComplete: "Révision Terminée",
      approve: "Approuver",
      recall: "Rappeler",
      delete: "Supprimer",
      reportPreview: "Aperçu du Rapport",
    },
  },
  patrolCreateScreen: {
    title: "Créer une inspection de ronde",
    section: {
      approver: {
        title: "Approbateur (Obligatoire)",
        placeholder: "Sélectionner l'approbateur",
        description: "Vous pouvez sélectionner un approbateur dans la liste des administrateurs.",
      },
      reviewer: {
        title: "Réviseur (Optionnel)",
        placeholder: "Sélectionner le réviseur",
        description:
          "Vous pouvez sélectionner un réviseur dans la liste des administrateurs (optionnel).",
      },
      items: {
        title: "Éléments d'inspection (Obligatoire)",
        placeholder: "Sélectionner le modèle",
        addButton: "Ajouter un élément",
        itemNamePlaceholder: "Nom de l'élément",
        itemNameDescription:
          "Exemple: Général, Électrique, Gaz, etc. / Saisissez 1 à 100 caractères",
        deleteButton: "Supprimer",
        addCheckButton: "Ajouter un détail d'inspection",
        checkTitle: "Détail d'inspection (Obligatoire)",
        checkNamePlaceholder: "Nom du détail d'inspection",
        checkDescription:
          "Exemple: Propreté et ordre du lieu de travail / Saisissez 1 à 200 caractères",
        goodButton: "Bon",
        badButton: "Mauvais",
        badNotePlaceholder: "Saisissez la raison de l'état mauvais",
        deleteCheckButton: "Supprimer le détail d'inspection",
      },
      requirements: {
        title: "Exigences d'action globales",
        placeholder: "Exigences d'action globales / opinions",
        description:
          "Vous pouvez saisir les exigences d'action globales. Veuillez saisir dans la limite de 1 000 caractères.",
      },
    },
    submitButton: "Soumettre l'inspection",
    successModal: {
      title: "Succès",
      message: "L'inspection a été créée avec succès.",
      confirmButton: "Confirmer",
    },
    modal: {
      userTitle: "Sélectionner l'utilisateur",
      templateTitle: "Sélectionner le modèle",
      cancelButton: "Annuler",
    },
  },

  tbmParticipationHistoryScreen: {
    title: "Historique de participation TBM",
    totalParticipation: "Participation totale",
    cautionResponse: "Réponse de précaution",
    unit: "cas",
    workplaceLabel: "Lieu de travail",
  },

  tbmParticipationHistoryDetailScreen: {
    participationDate: "Date de participation",
    workDate: "Date de travail",
    workplace: "Lieu de travail",
    manager: "Responsable",
    activityContent: "Contenu de l'activité",
  },

  aiRiskDocCreatorScreen: {
    title: "Rapport d'analyse des risques IA",
    pageCount: "Total {{count}} page(s)",
    captureButton: "Capturer avant amélioration",
    exportPdfButton: "Exporter PDF",
    hazardToggle: {
      label: "Inclure la section des coordonnées de danger",
      description:
        "Si décoché, les coordonnées de danger ne seront pas affichées à l'écran et dans le PDF.",
    },
    emptyState: {
      title: "Aucune page enregistrée.",
      description: "Capturez une image avant amélioration pour ajouter une page.",
    },
    captureSheet: {
      camera: "Prendre une photo",
      album: "Sélectionner dans l'album",
    },
    resetAll: "Tout réinitialiser",
    signature: {
      instruction: "Signez avec votre doigt dans la case, puis appuyez sur Enregistrer.",
      cancel: "Annuler",
      save: "Enregistrer",
    },
    page: {
      title: "Page {{number}}",
      beforeLabel: "Avant",
      afterLabel: "Après",
      addImage: "+ Ajouter une image",
      analyzeButton: "Demander une analyse IA",
      aiAnalysis: "Analyse IA",
      hazardTitle: "Détails des coordonnées de danger",
      hazardEmpty: "Aucune coordonnée de danger à afficher.",
      analysisPlaceholder: "Les résultats de l'analyse seront affichés ici.",
    },
  },

  hazardRiskCreateScreen: {
    title: "Signalement de danger",
    guide: {
      title: "Guide de rédaction",
      description:
        "Veuillez signaler les dangers trouvés sur le site. Indiquer l'emplacement précis et les facteurs de risque permet une intervention rapide.",
    },
    workplace: {
      label: "Lieu de travail",
      placeholder: "Sélectionnez un lieu de travail",
      modalTitle: "Sélectionnez un lieu de travail",
      helper: "Vous pouvez sélectionner un lieu de travail dans la liste.",
    },
    location: {
      label: "Emplacement",
      placeholder: "Ex : Couloir est du 2e étage, entrée de la zone B",
      helper: "Jusqu'à 200 caractères.",
    },
    hazardFactor: {
      label: "Facteur de risque",
      placeholder:
        "Quels sont les facteurs de risque ?\nExemples :\n · La rampe d'escalier est instable, présentant un risque de chute.\n · Des fils exposés créent un risque d'électrocution.",
      helper: "Jusqu'à 1 000 caractères.",
    },
    sitePhotos: {
      label: "Photos du site",
      addButton: "Ajouter une photo",
      modalTitle: "Sélectionner la méthode photo",
      camera: "Prendre avec la caméra",
      album: "Choisir depuis l'album",
      hint: "Veuillez ajouter des photos montrant clairement les conditions du site.",
      guide:
        "Au moins 1 photo du site doit être enregistrée.\nVous pouvez joindre de 1 à 5 photos.",
      preview: "Un aperçu s'affichera lorsque vous ajouterez une image.",
    },
    submit: "Soumettre",
  },

  hazardRiskScreen: {
    title: "Zones dangereuses",
    fab: "Nouveau rapport",
    summary: {
      myReports: "Mes rapports",
      completed: "Résolus",
      unit: "élément(s)",
    },
    tabs: {
      all: "Tout",
      pending: "En attente",
      ongoing: "En cours",
      completed: "Résolu",
      impossible: "Irrésolvable",
    },
    status: {
      pending: "En attente",
      ongoing: "En cours",
      completed: "Résolu",
      impossible: "Irrésolvable",
    },
    empty: {
      all: "Aucune zone dangereuse enregistrée.",
      pending: "Aucune zone dangereuse en attente.",
      ongoing: "Aucune zone dangereuse en cours.",
      completed: "Aucune zone dangereuse résolue.",
      impossible: "Aucune zone dangereuse irrésolvable.",
    },
  },

  hazardRiskDetailScreen: {
    title: "Détail de la zone dangereuse",
    infoCard: {
      locationLabel: "Emplacement",
      hazardFactorLabel: "Facteur de risque",
      sitePhotosLabel: "Photos du site",
      noPhotos: "Aucune photo enregistrée.",
      managerProfileLabel: "Profil du responsable",
    },
    adminSection: {
      title: "Changement de statut et action",
      noteLabel: "Entrez les détails de l'action",
      noteHint: "Jusqu'à 2 000 caractères peuvent être saisis.",
      sitePhotosLabel: "Photos du site",
      sitePhotosHints: {
        hint1: "Veuillez ajouter des photos montrant clairement les conditions du site.",
        hint2:
          "L'ajout de photos du site après l'action peut communiquer clairement les résultats.",
      },
      placeholder: {
        pending: "Le statut est en attente.\nPassez à En cours avant de prendre des mesures.",
        ongoing: "Saisie disponible lorsque le statut Terminé ou Impossible est sélectionné",
        completed:
          "Veuillez décrire en détail l'action entreprise (ex. garde-corps réinstallé, protège-câbles installé)",
        impossible: "Veuillez décrire en détail pourquoi l'action n'est pas possible.",
      },
    },
    statusHistory: {
      title: "Historique des statuts",
      titles: {
        pending: "Rapport enregistré",
        completed: "Action terminée",
        impossible: "Action impossible",
      },
      contents: {
        pending: "Le rapport a été reçu.",
        completed: "L'action a été terminée.",
        impossible: "L'action a été traitée comme impossible.",
        adminSuffix: " - Administrateur ({{name}})",
      },
    },
  },

  welcomeIntroScreen: {
    skip: "Passer",
    start: "Commencer",
    slide1: {
      step: "01",
      title: "Traduction multilingue en temps réel",
      description:
        "Communiquez facilement avec les travailleurs de toutes nationalités.\nTraduction instantanée vocale et textuelle\npour un lieu de travail plus sûr.",
    },
    slide2: {
      step: "02",
      title: "Gestion TBM intégrée",
      description:
        "Enregistrez-vous au TBM avec un simple scan de QR code — sans paperasse.\nSignatures numériques et rapports\ncompletés en un seul endroit.",
    },
    slide3: {
      step: "03",
      title: "Évaluation des risques par IA",
      description:
        "Prenez simplement une photo du site et l'IA analysera les dangers\net générera un brouillon de rapport pour vous.",
    },
  },

  ...demoFr,
}

export default fr
