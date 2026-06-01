import demoEs from "./demo-es"
import { Translations } from "./en"

const es: Translations = {
  common: {
    ok: "OK",
    cancel: "Cancelar",
    back: "Volver",
    logOut: "Cerrar sesión",
  },
  welcomeScreen: {
    postscript:
      "psst — Esto probablemente no es cómo se va a ver tu app. (A menos que tu diseñador te haya enviado estas pantallas, y en ese caso, ¡lánzalas en producción!)",
    readyForLaunch: "Tu app, casi lista para su lanzamiento",
    exciting: "(¡ohh, esto es emocionante!)",
    letsGo: "¡Vamos!",
  },
  errorScreen: {
    title: "¡Algo salió mal!",
    friendlySubtitle:
      "Esta es la pantalla que verán tus usuarios en producción cuando haya un error. Vas a querer personalizar este mensaje (que está ubicado en `app/i18n/es.ts`) y probablemente también su diseño (`app/screens/ErrorScreen`). Si quieres eliminarlo completamente, revisa `app/app.tsx` y el componente <ErrorBoundary>.",
    reset: "REINICIA LA APP",
    traceTitle: "Error desde %{name}",
  },
  emptyStateComponent: {
    generic: {
      heading: "Muy vacío... muy triste",
      content:
        "No se han encontrado datos por el momento. Intenta darle clic en el botón para refrescar o recargar la app.",
      button: "Intentemos de nuevo",
    },
  },

  errors: {
    invalidEmail: "Email inválido.",
  },
  loginScreen: {
    logIn: "Iniciar sesión",
    tagline: "Socio integral de seguridad en el lugar de trabajo",
    enterDetails:
      "Ingresa tus datos a continuación para desbloquear información ultra secreta. Nunca vas a adivinar lo que te espera al otro lado. O quizás si lo harás; la verdad no hay mucha ciencia alrededor.",
    emailFieldLabel: "Email",
    passwordFieldLabel: "Contraseña",
    emailFieldPlaceholder: "Ingresa tu email",
    passwordFieldPlaceholder: "Ingresa tu contraseña",
    tapToLogIn: "¡Presiona acá para iniciar sesión!",
    hint: "Consejo: puede usar cualquier dirección de correo y su contraseña favorita :)",
    forgotPassword: "¿Olvidó su contraseña?",
    forgotPasswordModal: {
      title: "Aviso",
      message: "Para recuperar su contraseña, contacte al administrador.\nTeléfono: 062-383-0083",
      confirm: "Aceptar",
    },
    alert: {
      invalidCredentials: "Correo electrónico o contraseña incorrectos.",
      signInFailed: "Error al iniciar sesión. Inténtelo de nuevo.",
      fillFields: "Por favor complete todos los campos requeridos.",
      passwordLength: "La contraseña debe tener al menos 6 caracteres.",
      unauthorizedRole: "Esta cuenta no tiene acceso.",
      deactivatedAccount: "Esta cuenta ha sido desactivada. Contacte a su administrador.",
      profileLoadFailed: "No se pudo cargar la información del usuario. Inténtelo de nuevo.",
    },
    validation: {
      required: "Por favor ingrese su correo electrónico y contraseña.",
      invalidEmail: "Por favor ingrese una dirección de correo válida.",
      passwordTooShort: "La contraseña debe tener al menos 6 caracteres.",
      invalidCredentials: "Por favor verifique su correo electrónico o contraseña.",
    },
  },
  demoNavigator: {
    componentsTab: "Componentes",
    debugTab: "Debug",
    communityTab: "Comunidad",
    podcastListTab: "Podcasts",
  },
  demoCommunityScreen: {
    title: "Conecta con la comunidad",
    tagLine:
      "Únete a la comunidad React Native con los ingenieros de Infinite Red y mejora con nosotros tus habilidades para el desarrollo de apps.",
    joinUsOnSlackTitle: "Únete a nosotros en Slack",
    joinUsOnSlack:
      "¿Quieres conectar con desarrolladores de React Native de todo el mundo? Únete a la conversación en nuestra comunidad de Slack. Nuestra comunidad, que crece día a día, es un espacio seguro para hacer preguntas, aprender de los demás y ampliar tu red.",
    joinSlackLink: "Únete a la comunidad de Slack",
    makeIgniteEvenBetterTitle: "Haz que Ignite sea aún mejor",
    makeIgniteEvenBetter:
      "¿Tienes una idea para hacer que Ignite sea aún mejor? ¡Nos encantaría escucharla! Estamos siempre buscando personas que quieran ayudarnos a construir las mejores herramientas para React Native. Únete a nosotros en GitHub para ayudarnos a construir el futuro de Ignite.",
    contributeToIgniteLink: "Contribuir a Ignite",
    theLatestInReactNativeTitle: "Lo último en el mundo de React Native",
    theLatestInReactNative:
      "Estamos aquí para mantenerte al día con todo lo que React Native tiene para ofrecer.",
    reactNativeRadioLink: "React Native Radio",
    reactNativeNewsletterLink: "Newsletter de React Native",
    reactNativeLiveLink: "React Native Live",
    chainReactConferenceLink: "Conferencia Chain React",
    hireUsTitle: "Trabaja con Infinite Red en tu próximo proyecto",
    hireUs:
      "Ya sea para gestionar un proyecto de inicio a fin o educación a equipos a través de nuestros cursos y capacitación práctica, Infinite Red puede ayudarte en casi cualquier proyecto de React Native.",
    hireUsLink: "Envíanos un mensaje",
  },
  demoShowroomScreen: {
    jumpStart: "Componentes para comenzar tu proyecto",
    lorem2Sentences:
      "Nulla cupidatat deserunt amet quis aliquip nostrud do adipisicing. Adipisicing excepteur elit laborum Lorem adipisicing do duis.",
    demoHeaderTxExample: "Yay",
    demoViaTxProp: "A través de el atributo `tx`",
    demoViaSpecifiedTxProp: "A través de el atributo específico `{{prop}}Tx`",
  },
  demoDebugScreen: {
    howTo: "CÓMO HACERLO",
    title: "Debug",
    tagLine:
      "Felicidades, aquí tienes una propuesta de arquitectura y base de código avanzada para una app en React Native. ¡Disfrutalos!",
    reactotron: "Enviar a Reactotron",
    reportBugs: "Reportar errores",
    demoList: "Lista demo",
    demoPodcastList: "Lista demo de podcasts",
    androidReactotronHint:
      "Si esto no funciona, asegúrate de que la app de escritorio de Reactotron se esté ejecutando, corre adb reverse tcp:9090 tcp:9090 desde tu terminal, y luego recarga la app.",
    iosReactotronHint:
      "Si esto no funciona, asegúrate de que la app de escritorio de Reactotron se esté ejecutando, y luego recarga la app.",
    macosReactotronHint:
      "Si esto no funciona, asegúrate de que la app de escritorio de Reactotron se esté ejecutando, y luego recarga la app.",
    webReactotronHint:
      "Si esto no funciona, asegúrate de que la app de escritorio de Reactotron se esté ejecutando, y luego recarga la app.",
    windowsReactotronHint:
      "Si esto no funciona, asegúrate de que la app de escritorio de Reactotron se esté ejecutando, y luego recarga la app.",
  },
  demoPodcastListScreen: {
    title: "Episodios de React Native Radio",
    onlyFavorites: "Mostrar solo favoritos",
    favoriteButton: "Favorito",
    unfavoriteButton: "No favorito",
    accessibility: {
      cardHint:
        "Haz doble clic para escuchar el episodio. Haz doble clic y mantén presionado para {{action}} este episodio.",
      switch: "Activa para mostrar solo favoritos",
      favoriteAction: "Cambiar a favorito",
      favoriteIcon: "Episodio no favorito",
      unfavoriteIcon: "Episodio favorito",
      publishLabel: "Publicado el {{date}}",
      durationLabel: "Duración: {{hours}} horas {{minutes}} minutos {{seconds}} segundos",
    },
    noFavoritesEmptyState: {
      heading: "Esto está un poco vacío",
      content:
        "No se han agregado episodios favoritos todavía. ¡Presiona el corazón dentro de un episodio para agregarlo a tus favoritos!",
    },
  },

  mainTab: {
    home: "Inicio",
    safeBoard: "Tablero de seguridad",
    safeHealth: "Gestión de seguridad",
    workerParticipation: "Participación de trabajadores",
  },

  homeScreen: {
    orgName: "KS산업안전협회",
    header: { qrScan: "Escaneo QR", notification: "Notificaciones", language: "Idioma" },
    greeting: { message: "¡Que tengas un día seguro!", name: "{{name}}," },
    role: { admin: "Administrador", worker: "Trabajador" },
    devToggle: { eduBanner: "Banner educativo" },
    board: {
      title: "Tablero de seguridad",
      viewMore: "Ver más",
      tabs: { all: "Todo", company: "Toda la empresa", workplace: "Lugar de trabajo" },
      empty: "No posts available.",
    },
    edu: {
      title: "Unirse a educación/presentación existente",
      description: "Ya existe una sala de educación/presentación creada.",
    },
    banner: { text: "Un entorno de trabajo seguro con K-SAFEONE" },
    aiRiskBanner: {
      title: "Análisis de Riesgos con IA",
      description: "Analice peligros y genere informes mediante cámara",
      action: "Ir",
    },
    footer: {
      homepage: "Sitio web",
      privacy: "Política de privacidad",
      terms: "Términos de uso",
      copyright: "Copyright © KS Asociación de Seguridad Industrial all rights reserved.",
      webViewLoading: "Conectando a",
      webViewLoadingWait: "Por favor espera un momento",
      webViewClose: "Cerrar",
    },
    grid: {
      interpret: { label: "Interpretación", sub: "Soporte de interpretación" },
      chatbot: { label: "Chatbot de seguridad", sub: "Consultas/preguntas de seguridad" },
      translate: { label: "Traducción", sub: "Soporte de traducción" },
      education: { label: "Educación/Presentación", sub: "Presentación de materiales" },
      eduJoin: { label: "Unirse a educación", sub: "Unirse a educación/presentación" },
      tbmJoin: { label: "Unirse a TBM", sub: "Unirse a reunión de seguridad" },
      patrol: { label: "Ronda de inspección", sub: "Realizar/registrar ronda" },
      tbmCreate: { label: "TBM", sub: "Ver/crear TBM" },
      tbmReport: { label: "Informe TBM", sub: "Ver informe TBM" },
      hazard: { label: "Zonas de riesgo", sub: "Ver zonas peligrosas" },
      suggestion: { label: "Sugerencias", sub: "Registrar sugerencias de mejora" },
    },
    pushNotificationSheet: {
      title: "No se pierda las alertas importantes",
      description:
        "Para recibir alertas de seguridad y avisos a tiempo,\npor favor permita las notificaciones push.",
      allowButton: "Permitir notificaciones push",
      settingsButton: "Cambiar permiso en ajustes",
    },
  },
  safeBoardScreen: {
    title: "Tablero de seguridad",
    alertButton: "Enviar alerta",
    workplaceLabel: "Lugar de trabajo seleccionado",
    workplaceModal: { title: "Seleccionar lugar de trabajo" },
    badge: {
      companyWide: "Toda la empresa",
      workplace: "Lugar de trabajo",
      draft: "Borrador",
      archived: "Archivado",
    },
    tabs: { all: "Tablero de seguridad", myPosts: "Mis publicaciones" },
    empty: "No hay publicaciones",
    write: "Escribir",
    draftSaved: "La publicación se ha guardado como borrador.",
  },
  safeBoardDetailScreen: {
    title: "Detalle de publicación",
    authorLabel: "Autor",
    editButton: "Editar",
    alertOn: "Alerta activada",
    alertOff: "Alerta desactivada",
    publishButton: "Publicar",
    deleteButton: "Eliminar",
    publishModal: {
      title: "Publicar entrada",
      message: "¿Está seguro de que desea publicar esta entrada?",
      cancel: "Cancelar",
      confirm: "Publicar",
    },
    deleteModal: {
      title: "Eliminar publicación",
      message: "¿Está seguro de que desea eliminar esta publicación?",
      cancel: "Cancelar",
      confirm: "Eliminar",
    },
  },
  safeBoardNotifyScreen: {
    title: "Enviar notificación push al lugar de trabajo",
    guide: {
      title: "Guía de redacción",
      description:
        "Seleccione uno o más lugares de trabajo que gestione y escriba una notificación para enviar a los miembros del sitio.",
    },
    workplace: {
      label: "Seleccionar lugar de trabajo",
      helper: "Enviando a {{selected}} de {{total}} lugares de trabajo",
    },
    notifyTitle: {
      label: "Título de la notificación",
      placeholder: "Ingrese un título breve.",
      helper: "Hasta 50 caracteres.",
    },
    content: {
      label: "Contenido de la notificación push",
      placeholder: "Ingrese el mensaje de notificación para este lugar de trabajo.",
      helper: "Hasta 240 caracteres.",
    },
    send: "Enviar notificación",
    sendSuccess: "Notificación enviada.",
  },
  safeBoardCreateScreen: {
    title: "Escribir publicación",
    guide: {
      title: "Guía de redacción",
      description:
        "Seleccione uno o más lugares de trabajo que gestione y escriba una notificación para enviar a los miembros del sitio.",
    },
    workplace: {
      label: "Seleccionar lugar de trabajo",
      placeholder: "Seleccionar lugar de trabajo",
      helper: "Seleccione el lugar de trabajo al que aplica esta publicación.",
    },
    postTitle: {
      label: "Título de la publicación",
      placeholder: "Ingrese el título del anuncio.",
      helper: "Hasta 80 caracteres.",
    },
    content: {
      label: "Contenido de la publicación",
      placeholder: "Ingrese el contenido detallado para entregar al sitio.",
      helper: "Hasta 4,000 caracteres.",
    },
    attachment: {
      label: "Archivos adjuntos",
      card1Text: "(Opcional) Puede cargar\narchivos de hasta 50 MB.",
      uploadButton: "Cargar archivo",
      noFile: "No se han seleccionado archivos.",
    },
    pushNotification: {
      label: "Enviar notificación push",
      cardText:
        "Al seleccionar, se enviará una notificación push a todos los miembros del lugar de trabajo seleccionado al publicar.",
    },
    save: "Guardar",
  },

  safeHealthScreen: {
    title: "Gestión de seguridad",
    menu: {
      patrol: {
        title: "Ronda de inspección",
        description: "Registrar ronda de inspección del lugar de trabajo",
      },
      educationMaterial: {
        title: "Materiales educativos",
        description: "Ver y registrar materiales educativos",
      },
      tbmManage: { title: "Gestión de TBM", description: "Gestionar y crear actividades TBM" },
      tbmReport: {
        title: "Informe TBM",
        description: "Verificar estado del informe y descargar PDF",
      },
      tbmJoin: { title: "Unirse a TBM", description: "Unirse a la reunión de otro supervisor" },
      tbmHistory: {
        title: "Historial de participación TBM",
        description: "Ver historial de reuniones TBM participadas",
      },
      tbmJoinWorker: {
        title: "Unirse a TBM",
        description: "Unirse a la reunión de otro supervisor",
      },
      statusView: { title: "Ver estado", description: "Verificar el estado actual de TBM" },
    },
  },
  workerParticipationScreen: {
    title: "Participación de trabajadores",
    menu: {
      hazard: { title: "Zonas de riesgo", description: "Registrar zonas peligrosas" },
      suggestion: {
        title: "Sugerencias de mejora",
        description: "Registrar sugerencias de mejora",
      },
    },
  },

  voiceTranslationScreen: {
    title: "Traducción de conversación de voz",
    flipScreen: "Voltear",
    listening: "Escuchando...",
    tapToSpeak: "Toca para hablar",
    speakNow: "Hable ahora",
    languageMenu: {
      title: "Idioma reconocido",
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
      korean: "(Coreano)",
      english: "(Inglés)",
      chineseSimplified: "(Chino Simplificado)",
      chineseTraditional: "(Chino Tradicional)",
      russian: "(Ruso)",
      vietnamese: "(Vietnamita)",
      indonesian: "(Indonesio)",
      khmer: "(Jemer)",
      thai: "(Tailandés)",
      urdu: "(Urdu)",
      nepali: "(Nepalés)",
      lao: "(Laosiano)",
      japanese: "(Japonés)",
      french: "(Francés)",
      spanish: "",
    },
  },

  aiSafetyChatScreen: {
    title: "Asistente AI de seguridad industrial",
    aiName: "Asistente AI de seguridad industrial",
    welcomeMessage:
      "¡Hola! Soy el chatbot de IA de gestión de seguridad inteligente.\nSi tienes alguna pregunta sobre las regulaciones del lugar de trabajo, procedimientos o manuales de respuesta a emergencias, no dudes en preguntar.",
    inputPlaceholder: "Escribe un mensaje...",
    inputHint: "Obligatorio. Por favor escribe entre 2 y 1,000 caracteres.",
    deleteDialog: {
      title: "Eliminar conversación",
      message: "¿Está seguro de que desea eliminar todo el historial de conversación?",
      confirm: "Eliminar",
      cancel: "Cancelar",
    },
    suggestedQuestions: {
      q1: "Explica las normas generales de seguridad en obras de construcción",
      q2: "¿Cuáles son las normas de seguridad para trabajar en altura?",
      q3: "¿Cuál es el procedimiento de respuesta de emergencia en caso de incendio?",
    },
  },

  myPageScreen: {
    title: "Mi Página",
    orgName: "KS산업안전협회",
    workplace: {
      label: "Lugar de Trabajo de la Grúa de Torre",
    },
    permissions: {
      sectionTitle: "Permisos de la Aplicación",
      camera: {
        title: "Cámara",
        description:
          "Escaneo de código QR, fotos de traducción por IA, grabación de emergencia de peligro",
        button: "Permitir",
      },
      microphone: {
        title: "Micrófono",
        description: "Traducción de voz, llamada de radio, función de identificación de voz",
        button: "Permitir",
      },
      photo: {
        title: "Fotos/Biblioteca",
        description:
          "Evaluación de riesgos de IA, traducción de imágenes, materiales de capacitación TBM/informes",
        button: "Permitir",
      },
      notification: {
        title: "Notificaciones Push",
        description: "Alertas TBM, advertencias de peligro, avisos del lugar de trabajo",
      },
      allowed: "Permitido",
      notAllowed: "No Permitido",
    },
    logout: "Cerrar Sesión",
    logoutModal: {
      title: "Cerrar sesión",
      message: "¿Está seguro de que desea cerrar sesión?",
      cancel: "Cancelar",
      confirm: "Cerrar sesión",
    },
  },

  languageSettings: {
    languageTitle: "Configuración de idioma",
    languageDescription: "Cambia el idioma de la aplicación de inmediato.",
    languageChangeSuccess: "El idioma ha sido cambiado a {{language}}.",
    languageChangeRestart:
      "El idioma ha sido cambiado a {{language}}.\nLa aplicación se reiniciará para aplicar los cambios.",
    languageChangeError: "No se pudo cambiar el idioma. Por favor, inténtalo de nuevo.",
    languageNames: {
      "en": "Inglés",
      "ko": "Coreano",
      "zh": "Chino",
      "zh-Hans": "Chino simplificado",
      "zh-Hant": "Chino tradicional",
      "yue": "Cantonés",
      "pt": "Portugués",
      "pt-BR": "Portugués (Brasil)",
      "ja": "Japonés",
      "es": "Español",
      "fr": "Francés",
      "de": "Alemán",
      "it": "Italiano",
      "ru": "Ruso",
      "ar": "Árabe",
      "hi": "Hindi",
      "ta": "Tamil",
      "te": "Telugu",
      "th": "Tailandés",
      "uk": "Ucraniano",
      "vi": "Vietnamita",
      "id": "Indonesio",
      "km": "Jemer",
      "ur": "Urdu",
      "ne": "Nepalí",
      "lo": "Lao",
      "my": "Birmano",
    },
  },

  notify: {
    title: "Notificaciones",
    emptyTitle: "Sin notificaciones",
    emptyDescription:
      "No tienes notificaciones en este momento.\nTe avisaremos cuando lleguen nuevas notificaciones.",
    mock: {
      boardNewPost: {
        title: "Se ha escrito una nueva publicación en el tablero.",
        description: "¡Consulta el tablero de tu lugar de trabajo afiliado!",
      },
    },
  },

  qrScanner: {
    title: "Unirse a Educación/Presentación",
    description:
      "Escanea el código QR o ingresa el código compartido por el presentador para unirte a la reunión.",
    permissionRequired: "Se requiere permiso de cámara para escanear el código QR.",
    retry: "Reintentar",
    languageLabel: "Idioma",
    currentLanguage: "Coreano",
    enterCode:
      "¿Tienes problemas con la cámara? Puedes ingresar el código de educación/presentación directamente.",
    enterCodeDescription: "Ingresa el código numérico de 8 dígitos compartido por el presentador.",
    joinMeeting: "Unirse a la Reunión",
    codePlaceholder: "Ingresar código",
  },

  imageTranslationScreen: {
    title: "Traducción de Imagen",
    selectImage: "Seleccionar imagen para traducir",
    selectImageDesc: "Presiona el botón de abajo para seleccionar una imagen a traducir.",
    languageLabel: "Seleccionar idioma de traducción",
    languageMenu: {
      title: "Seleccionar Idioma",
    },
    cameraButton: "Tomar foto con la cámara",
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
      korean: "(Coreano)",
      english: "(Inglés)",
      chineseSimplified: "(Chino Simplificado)",
      chineseTraditional: "(Chino Tradicional)",
      russian: "(Ruso)",
      vietnamese: "(Vietnamita)",
      indonesian: "(Indonesio)",
      khmer: "(Jemer)",
      thai: "(Tailandés)",
      urdu: "(Urdu)",
      nepali: "(Nepalés)",
      lao: "(Laosiano)",
      japanese: "(Japonés)",
      french: "(Francés)",
      spanish: "",
    },
  },

  educationPresentationScreen: {
    title: "Educación/Presentación",
    inviteButton: "Invitar",
    inviteModal: {
      title: "Invite Participants",
      description: "Share the QR code or invite code\nto invite participants.",
      close: "Close",
    },
    inputLanguageLabel: "Idioma de entrada",
    languageMenu: { title: "Seleccionar idioma" },
    recognizing: "Reconociendo voz...",
    statusMicOff: "Permita el acceso al micrófono para grabar notas.",
    statusMicOn: "Recibiendo mensajes en tiempo real.",
    micOnLabel: "Apagar micrófono",
    micOffLabel: "Encender micrófono",
    inputHint: "Escribe tu mensaje",
    inputPlaceholder: "Ingresa el mensaje...",
    validationError: "Por favor ingresa un mensaje.",
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
      korean: "(Coreano)",
      english: "(Inglés)",
      chineseSimplified: "(Chino Simplificado)",
      chineseTraditional: "(Chino Tradicional)",
      russian: "(Ruso)",
      vietnamese: "(Vietnamita)",
      indonesian: "(Indonesio)",
      khmer: "(Jemer)",
      thai: "(Tailandés)",
      urdu: "(Urdu)",
      nepali: "(Nepalés)",
      lao: "(Laosiano)",
      japanese: "(Japonés)",
      french: "(Francés)",
      spanish: "",
    },
  },

  textTranslationScreen: {
    title: "Traducción de Texto",
    fontSizeButton: "AA",
    languageMenu: {
      title: "Seleccionar Idioma",
    },
    listening: "Escuchando...",
    inputPlaceholder: "Ingresa el texto a traducir",
    inputHint: "Hasta 1,000 caracteres",
    translateButton: "Traducir",
    validationError: "ⓘ Por favor, introduce al menos un carácter.",
    speakButton: "Hablar",
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
      korean: "(Coreano)",
      english: "(Inglés)",
      chineseSimplified: "(Chino Simplificado)",
      chineseTraditional: "(Chino Tradicional)",
      russian: "(Ruso)",
      vietnamese: "(Vietnamita)",
      indonesian: "(Indonesio)",
      khmer: "(Jemer)",
      thai: "(Tailandés)",
      urdu: "(Urdu)",
      nepali: "(Nepalés)",
      lao: "(Laosiano)",
      japanese: "(Japonés)",
      french: "(Francés)",
      spanish: "",
    },
  },

  tbmListScreen: {
    title: "Lista de actividades TBM",
    tabs: { all: "Todo", drafting: "En redacción", ongoing: "En progreso", ended: "Finalizado" },
    status: { drafting: "En redacción", ongoing: "En progreso", ended: "Finalizado" },
    participants: "{{count}} participante(s)",
    fab: "Crear nueva actividad",
    empty: {
      drafting: "No hay TBM en redacción.",
      ongoing: "No hay TBM en progreso.",
      ended: "No hay TBM finalizados.",
      all: "No hay actividades TBM.",
    },
  },

  tbmJoinInfoScreen: {
    title: "Unirse al TBM",
    sectionInfo: "Información del TBM",
    activityName: "Nombre de la actividad",
    manager: "Responsable",
    date: "Fecha",
    sectionAttachments: "Archivos adjuntos",
    noAttachments: "No hay archivos adjuntos.",
    prev: "Anterior",
    next: "Siguiente",
  },

  tbmJoinHealthScreen: {
    title: "Unirse al TBM",
    heading: "Verificación de salud",
    prompt:
      "Confirme si consumió alcohol en exceso el día anterior o tiene algún problema de salud hoy.",
    statusGood: "Sin problemas",
    statusBad: "Con problemas",
    prev: "Anterior",
    next: "Siguiente",
    toastMessage: "Por favor, seleccione su estado de salud antes de continuar.",
    notAllCheckedModal: {
      title: "Por favor, seleccione su estado de salud.",
      message: "Debe seleccionar Sin problemas o Con problemas para continuar.",
      confirm: "Aceptar",
    },
  },

  tbmJoinSignScreen: {
    title: "Unirse al TBM",
    heading: "Firma Electrónica",
    description: "Por favor, firme en el área a continuación.",
    signatureArea: "Firme aquí",
    clearLabel: "Restablecer firma",
    prev: "Anterior",
    next: "Siguiente",
    noSignatureModal: {
      title: "Se requiere firma.",
      message: "Por favor, complete su firma antes de continuar.",
      confirm: "Aceptar",
    },
  },

  tbmJoinCompleteScreen: {
    title: "Unirse al TBM",
    heading: "Participación en TBM completada",
    subtitle: "¡Que tenga un día seguro!",
    goHome: "Hecho",
  },

  tbmJoinScreen: {
    title: "Unirse al TBM",
    selectPrompt: "Por favor, seleccione un TBM al que unirse",
    empty: {
      title: "No hay TBM en progreso.",
      subtitle: "No hay sesiones TBM disponibles para unirse en este momento.",
    },
    prev: "Anterior",
    next: "Siguiente",
    noSelectionModal: {
      title: "No hay sesión seleccionada.",
      message: "Por favor, seleccione una sesión TBM para unirse.",
      confirm: "Aceptar",
    },
    infoModal: {
      title: "Guía TBM",
      meaning: {
        heading: "¿Qué es TBM?",
        body: "TBM significa Tool Box Meeting — una breve reunión de seguridad previa al trabajo donde se revisan las tareas del día, los peligros y las medidas de seguridad.",
      },
      importance: {
        heading: "Por qué es importante el TBM",
        body: "El TBM es un paso crítico para prevenir accidentes compartiendo los peligros con anticipación, aclarando roles y verificando que el equipo de protección personal se use correctamente.",
      },
      procedure: {
        heading: "Cómo funciona",
        step1: "Confirme el alcance del trabajo del día y los participantes.",
        step2: "Comparta los principales peligros y medidas de seguridad.",
        step3:
          "Verifique la salud de los trabajadores, el equipo de protección y cualquier cambio en el sitio.",
        step4: "Revise el contenido, luego complete la participación en el TBM y firme.",
      },
      close: "Cerrar",
    },
  },

  tbmReportScreen: {
    title: "Generación de Informe TBM",
    notice: {
      description:
        " ·  Solo se puede redactar el registro educativo para actividades TBM en curso.\n ·  Al completar el registro, la actividad TBM finalizará automáticamente.\n ·  Se debe adjuntar al menos una foto del sitio.",
    },
    activityName: {
      label: "Actividad TBM",
    },
    processName: {
      label: "Nombre del proceso",
      placeholder: "Ingrese el nombre del proceso",
      helper: "Opcional. Hasta 50 caracteres.",
    },
    teamName: {
      label: "Nombre del equipo / unidad",
      placeholder: "Ingrese el nombre del equipo o unidad",
      helper: "Opcional. Hasta 50 caracteres.",
    },
    educationSummary: {
      label: "Resumen del contenido educativo",
      placeholder: "Resuma el contenido educativo",
      helper: "Entre 10 y 1,000 caracteres.",
    },
    specialNotes: {
      label: "Notas especiales",
      placeholder: "Ingrese notas especiales",
      helper: "Hasta 500 caracteres.",
    },
    sitePhotos: {
      label: "Fotos del sitio",
      addButton: "Agregar foto",
      guide: "Se debe registrar al menos 1 foto del sitio.\nPuede adjuntar de 1 a 5 fotos.",
      preview: "Se mostrará una vista previa al agregar una imagen.",
    },
    submit: "Generar informe",
  },

  tbmCreateScreen: {
    title: "Crear actividad TBM",
    reset: "Restablecer",
    guide: {
      title: "Guía de redacción",
      description:
        "Gestione el lugar de trabajo, la agenda laboral, el contenido de la actividad y los materiales educativos en una sola pantalla para crear una actividad TBM de inmediato. Puede seleccionar materiales educativos de una lista desplegable o agregarlos directamente.",
    },
    workplace: {
      label: "Seleccionar lugar de trabajo",
      placeholder: "Seleccionar lugar de trabajo",
      helper: "Por favor seleccione el lugar de trabajo para esta actividad TBM.",
    },
    dateTime: {
      label: "Fecha de trabajo (YYYY-MM-DD)",
      includeDateInTitle: "Incluir fecha en el título",
      helper: "Por favor seleccione la fecha de trabajo en el calendario.",
      confirm: "Confirmar",
    },
    activityTitle: {
      label: "Título de la actividad",
      placeholder: "Ej: 2026.05.15 TBM trabajo de armadura mañana",
      helper: "El título de la actividad puede tener hasta 200 caracteres.",
    },
    content: {
      label: "Contenido de la actividad",
      placeholder: "Ingrese el contenido principal del trabajo",
      helper: "Ingrese el contenido del trabajo. Máximo 2,000 caracteres.",
    },
    education: {
      label: "Seleccionar materiales educativos",
      statusBadge: "Estado de selección",
      multipleBadge: "Se permiten selecciones múltiples",
      countText: "{{count}} elemento(s) seleccionado(s)",
      countHelper: "Vaya a confirmación de selección para agregar o cambiar materiales educativos.",
      selectButton: "+ Seleccionar materiales educativos",
    },
    submit: "Crear",
  },

  tbmDetailScreen: {
    title: "Detalle de Actividad TBM",
    workDate: "Fecha de trabajo:  {{date}}",
    activityLabel: "Contenido de actividad",
    educationHeader: "Materiales educativos ({{count}})",
    startActivity: "Iniciar actividad",
    edit: "Editar",
    delete: "Eliminar",
    participantEmpty: "No hay participantes.",
    toastStarted: "La actividad TBM ha comenzado.",
    endActivity: "Finalizar TBM y generar informe",
    participantHeader: "Participantes ({{count}})",
    badgeNormal: "Normal",
    badgeCaution: "Precaución",
    badgeDanger: "Peligro",
    deleteModal: {
      title: "Eliminar actividad TBM",
      message: "¿Está seguro de que desea eliminar esta actividad TBM?",
      cancel: "Cancelar",
      confirm: "Eliminar",
    },
    startModal: {
      title: "Iniciar actividad TBM",
      message: "¿Desea iniciar esta actividad TBM?\nEl estado cambiará a 'En progreso'.",
      cancel: "Cancelar",
      confirm: "Iniciar",
    },
  },

  educationMaterialScreen: {
    title: "Lista de materiales educativos TBM",
    registerButton: "Registrar nuevo material educativo",
  },

  educationMaterialRegisterScreen: {
    title: "Registrar material educativo TBM",
    guide: {
      title: "Guía de redacción",
      description:
        "Registre el título, el contenido clave y el archivo adjunto de una sola vez para usarlos en el sitio de inmediato. Los materiales registrados pueden seleccionarse juntos para múltiples actividades TBM.",
    },
    attachment: {
      label: "Archivo adjunto",
      boxPlaceholder: "nombre_archivo.formato",
      helper: "Solo se puede registrar un archivo permitido, con un máximo de 50 MB.",
    },
    educationTitle: {
      label: "Título del material educativo",
      placeholder: "Ingrese el título del material educativo",
      includeFileName: "Usar nombre de archivo como título",
      includeFileNameDesc: "El nombre del archivo seleccionado se reflejará en el campo de título.",
    },
    content: {
      label: "Contenido educativo",
      placeholder: "Ingrese el contenido educativo",
      helper:
        "La descripción es opcional. Si se proporciona, se pueden ingresar hasta 10,000 caracteres.",
    },
    submit: "PLACEHOLDER",
    submitSuccess: "Material registered successfully.",
    submitError: "Failed to register material. Please try again.",
  },

  educationMaterialDetailScreen: {
    title: "Detalle de material educativo TBM",
    sourceKs: "KS Asociación de Seguridad Industrial",
    sourceMine: "Mi material",
    statusActive: "Activo",
    statusArchived: "Archivado",
    categoryLabel: "Categoría:",
    attachmentLabel: "Archivo adjunto",
    registrantLabel: "Registrante:",
    publishButton: "Publicar tras activación",
  },

  educationSelectScreen: {
    title: "Seleccionar materiales educativos",
    sourceTab1: "KS Asociación de Seguridad",
    sourceTab2: "KS Asociación de Seguridad",
    sourceTab3: "Mis materiales",
    searchPlaceholder: "Ingrese contenido para buscar",
    confirm: "Confirmar selección ({{count}})",
    confirmNone: "Confirmar selección",
    emptyText: "No hay materiales educativos disponibles.",
    categoryAll: "All",
  },

  improvementProposalDetailScreen: {
    title: "Gestión de detalle de propuesta",
    result: {
      sectionTitle: "Resultado de procesamiento",
      reflected: "Ha sido aceptado.",
      rejected: "No fue aceptado.",
      dateLabel: "Procesado el:",
    },
    alreadyProcessed: "Esta propuesta ya ha sido procesada.",
    saveProcessingMessage: "Las notas de procesamiento se han guardado.",
    workerNoEditMessage:
      "Las propuestas en progreso o ya procesadas no se pueden editar ni eliminar.",
    status: {
      pending: "Pendiente",
      ongoing: "En progreso",
      reflected: "Aceptado",
      rejected: "No aceptado",
    },
    statusChange: {
      sectionTitle: "Cambio de estado y procesamiento",
      ongoingBtn: "En progreso",
      reflectedBtn: "Aceptado",
      rejectedBtn: "No aceptado",
      inputLabel: "Notas de procesamiento",
      pendingMessage: "Estado pendiente.\nCambie a En progreso antes de procesar.",
      ongoingMessage: "Disponible al seleccionar un estado completado o rechazado.",
      rejectedInputLabel: "Motivo de rechazo",
      rejectedProcessingPlaceholder: "Por favor, describa el motivo del rechazo en detalle.",
      processingPlaceholder:
        "Describa detalladamente la acción tomada. (ej. Revisión del equipo completada y disposición realizada)",
    },
    history: {
      sectionTitle: "Historial de cambio de estado",
      registeredTitle: "Propuesta registrada",
      registeredDesc: "La propuesta ha sido recibida.",
      ongoingTitle: "En progreso",
      ongoingChangeTitle: "Cambio a En Progreso",
      ongoingDesc: "La revisión de la propuesta ha comenzado.",
      reflectedTitle: "Aceptado",
      reflectedChangeTitle: "Procesamiento aceptado",
      reflectedDesc: "La propuesta ha sido aceptada.",
      rejectedTitle: "No aceptado",
      rejectedChangeTitle: "Procesamiento rechazado",
      rejectedDesc: "La propuesta no pudo ser aceptada.",
      proceedNote: "Responsable asignado -",
      reflectedNote: "Procesado como aceptado -",
      rejectedNote: "Procesado como rechazado -",
    },
    editForm: {
      label: "Detalles",
      required: " *",
      helper: "Puede escribir hasta 2,000 caracteres.",
      errorMaxLength: "Por favor ingrese los detalles dentro de 2,000 caracteres.",
    },
    edit: "Editar",
    delete: "Eliminar",
    proceed: "Proceder",
    saveProceeded: "Guardar notas de procesamiento",
    proceedStartedMessage: "El procesamiento ha comenzado.",
    cancel: "Cancelar",
    save: "Guardar",
    savedMessage: "La propuesta ha sido actualizada.",
    deletedMessage: "La propuesta ha sido eliminada.",
    deleteModal: {
      title: "Eliminar propuesta",
      message:
        "¿Está seguro de que desea eliminar esta propuesta?\nLas propuestas eliminadas no se pueden recuperar.",
      cancel: "Cancelar",
      confirm: "Eliminar",
    },
  },

  improvementProposalCreateScreen: {
    title: "Escribir propuesta",
    guide: {
      title: "Guía de redacción",
      description:
        "Proponga libremente ideas para mejorar la seguridad y la eficiencia laboral en el sitio. Sería útil incluir ubicaciones y situaciones específicas.",
    },
    workplace: {
      label: "Lugar de trabajo",
      placeholder: "Por favor seleccione un lugar de trabajo",
      helper: "Puede seleccionar un lugar de trabajo de la lista.",
    },
    detail: {
      label: "Detalles",
      required: " *",
      placeholder:
        "¿Qué le gustaría mejorar?\nEjemplos:\n · Problema: La iluminación del pasillo B es muy tenue, lo que hace peligroso el trabajo.\n · Propuesta: Por favor agregue iluminación LED o mejore el brillo.",
      helper: "Puede escribir hasta 2,000 caracteres.",
      errorMaxLength: "Por favor ingrese los detalles dentro de 2,000 caracteres.",
    },
    submit: "Enviar",
    submitting: "Enviando...",
  },

  improvementProposalListScreen: {
    title: "Propuestas de mejora",
    tabs: {
      all: "Todo",
      pending: "Pendiente",
      ongoing: "En progreso",
      reflected: "Aceptado",
      rejected: "No aceptado",
    },
    summary: {
      myProposals: "Mis propuestas",
      reflected: "Aceptado",
      unit: "elemento(s)",
    },
    status: {
      pending: "Pendiente",
      ongoing: "En progreso",
      reflected: "Aceptado",
      rejected: "No aceptado",
    },
    fab: "Nueva propuesta",
    empty: {
      all: "No hay propuestas registradas.",
      pending: "No hay propuestas pendientes.",
      ongoing: "No hay propuestas en progreso.",
      reflected: "No hay propuestas aceptadas.",
      rejected: "No hay propuestas no aceptadas.",
    },
  },

  tbmReportInquiryScreen: {
    title: "Consulta de informe TBM",
    untitled: "(No title)",
    tabs: {
      all: "Todo",
      requested: "Solicitado",
      generating: "Generando",
      completed: "Completado",
      failed: "Fallido",
    },
    empty: {
      all: "No se encontraron informes.",
      requested: "No hay informes pendientes.",
      generating: "No hay informes en generación.",
      completed: "No hay informes completados.",
      failed: "No hay informes fallidos.",
    },
  },

  tbmReportStatusScreen: {
    title: "Estado del informe TBM",
    regenerate: "Regenerar",
    sectionReportInfo: "Información del informe",
    sectionProcessStatus: "Estado de procesamiento",
    sectionStatusHistory: "Historial de estado",
    processName: "Nombre del proceso",
    teamName: "Equipo/Unidad",
    historyRequestedAt: "Fecha de solicitud",
    historyStartedAt: "Inicio de procesamiento",
    historyCompletedAt: "Procesamiento completado",
    downloadPdf: "Descargar PDF",
    sectionRegenerate: "Regeneración de informe",
    regenerateInfoText:
      "Por favor ingrese los elementos a continuación\nantes de solicitar la regeneración del informe.",
    processNameLabel: "Nombre del proceso (opcional)",
    processNamePlaceholder: "Ej: Prensa",
    teamNameLabel: "Equipo/Unidad (opcional)",
    teamNamePlaceholder: "Ej: Equipo 1",
    inputDescription: "Campo opcional. Máximo 50 caracteres.",
    cautionTitle: "Precaución",
    cautionItem1: "La regeneración solo está disponible para informes fallidos o completados.",
    cautionItem2: "Los informes en estado pendiente o en procesamiento no pueden regenerarse.",
    cautionItem3: "La regeneración restablecerá los resultados existentes.",
    requestRegenerate: "Solicitar regeneración",
    regenerateNote: "La nueva regeneración puede tardar algún tiempo.",
    refresh: "Actualizar",
    toastRegenerate: "La solicitud de regeneración del informe ha sido enviada.",
    processStatusRequested: "Report generation has been requested. Processing will begin shortly.",
    processStatusGenerating: "Generating the report. Please wait a moment.",
    processStatusCompleted: "The report is ready and available for download.",
    processStatusFailed: "Report generation has failed.",
    sectionFailureReason: "Failure Reason",
  },

  patrolScreen: {
    title: "Inspección de ronda del lugar de trabajo",
    createButton: "Nueva inspección",
    workplaceSelector: {
      label: "Lugar de trabajo seleccionado",
      modalTitle: "Seleccione un lugar de trabajo para ver la lista de inspecciones.",
    },
    badge: {
      underReview: "En revisión",
      inProgress: "En redacción",
      approved: "Aprobado",
    },
    card: {
      reviewer: "Revisor",
      approver: "Aprobador",
    },
  },
  patrolDetailScreen: {
    title: "Detalle de Inspección",
    editButton: "Editar",
    summaryCard: {
      title: "Resumen de Inspección",
      total: "Total",
      good: "Bien",
      bad: "Mal",
    },
    detailCard: {
      overallActions: "Medidas Generales",
      inspectionItems: "Elementos de Inspección",
      checkItem: {
        goodBadge: "Bien",
        badBadge: "Mal",
        actionLabel: "Acción",
      },
    },
    buttons: {
      submit: "Enviar",
      editComplete: "Edición Completa",
      reviewComplete: "Revisión Completa",
      approve: "Aprobar",
      recall: "Retirar",
      delete: "Eliminar",
      reportPreview: "Vista Previa del Informe",
    },
    toast: {
      reportSuccess: "El informe se abrió.",
      reportFail: "Error al generar el informe.",
    },
  },
  patrolCreateScreen: {
    title: "Crear inspección de ronda",
    editTitle: "Editar inspección de ronda",
    editSubmitButton: "Guardar cambios",
    section: {
      approver: {
        title: "Aprobador (Obligatorio)",
        placeholder: "Seleccionar aprobador",
        description: "Puede seleccionar un aprobador de la lista de administradores.",
      },
      reviewer: {
        title: "Revisor (Opcional)",
        placeholder: "Seleccionar revisor",
        description: "Puede seleccionar un revisor de la lista de administradores (opcional).",
      },
      items: {
        title: "Elementos de inspección (Obligatorio)",
        placeholder: "Seleccionar plantilla",
        addButton: "Agregar elemento",
        itemNamePlaceholder: "Nombre del elemento",
        itemNameDescription:
          "Ejemplo: General, Eléctrico, Gas, etc. / Ingrese de 1 a 100 caracteres",
        deleteButton: "Eliminar",
        addCheckButton: "Agregar detalle de inspección",
        checkTitle: "Detalle de inspección (Obligatorio)",
        checkNamePlaceholder: "Nombre del detalle de inspección",
        checkDescription:
          "Ejemplo: Limpieza y orden del lugar de trabajo / Ingrese de 1 a 200 caracteres",
        goodButton: "Bueno",
        badButton: "Malo",
        badNotePlaceholder: "Ingrese el motivo del estado malo",
        deleteCheckButton: "Eliminar detalle de inspección",
      },
      requirements: {
        title: "Requisitos de acción generales",
        placeholder: "Requisitos de acción generales / opiniones",
        description:
          "Puede ingresar los requisitos de acción generales. Por favor, ingrese dentro de 1,000 caracteres.",
      },
    },
    submitButton: "Enviar inspección",
    successModal: {
      title: "Éxito",
      message: "La inspección se ha creado correctamente.",
      confirmButton: "Confirmar",
    },
    modal: {
      userTitle: "Seleccionar usuario",
      templateTitle: "Seleccionar plantilla",
      cancelButton: "Cancelar",
    },
  },

  tbmParticipationHistoryScreen: {
    title: "Historial de participación en TBM",
    totalParticipation: "Total de participaciones",
    cautionResponse: "Respuesta de precaución",
    unit: "caso(s)",
    workplaceLabel: "PLACEHOLDER_WL",
    statusNormal: "Normal",
    statusAbnormal: "Caution",
  },

  tbmParticipationHistoryDetailScreen: {
    participationDate: "Fecha de participación",
    workDate: "Fecha de trabajo",
    workplace: "Lugar de trabajo",
    manager: "Responsable",
    activityContent: "Contenido de actividad",
  },

  aiRiskDocCreatorScreen: {
    title: "Informe de análisis de riesgos AI",
    pageCount: "Total {{count}} página(s)",
    captureButton: "Capturar antes de mejora",
    exportPdfButton: "Exportar PDF",
    hazardToggle: {
      label: "Incluir sección de coordenadas de riesgo",
      description: "Al desmarcar, las coordenadas de riesgo no se mostrarán en pantalla ni en PDF.",
    },
    emptyState: {
      title: "No hay páginas registradas.",
      description: "Capture una imagen antes de la mejora para agregar una página.",
    },
    captureSheet: {
      camera: "Tomar foto",
      album: "Seleccionar del álbum",
    },
    resetAll: "Restablecer todo",
    signature: {
      instruction: "Firme con el dedo en el recuadro y luego toque Guardar.",
      cancel: "Cancelar",
      save: "Guardar",
    },
    page: {
      title: "Página {{number}}",
      beforeLabel: "Antes",
      afterLabel: "Después",
      addImage: "+ Agregar imagen",
      analyzeButton: "Solicitar análisis AI",
      aiAnalysis: "Análisis AI",
      hazardTitle: "Detalles de coordenadas de riesgo",
      hazardEmpty: "No hay coordenadas de riesgo para mostrar.",
      analysisPlaceholder: "Los resultados del análisis se mostrarán aquí.",
    },
  },

  hazardRiskCreateScreen: {
    title: "Reporte de Riesgo",
    guide: {
      title: "Guía de redacción",
      description:
        "Por favor, reporte los riesgos que encontró en el sitio. Indicar la ubicación exacta y los factores de riesgo permite una acción rápida.",
    },
    workplace: {
      label: "Lugar de trabajo",
      placeholder: "Seleccione un lugar de trabajo",
      modalTitle: "Seleccione un lugar de trabajo",
      helper: "Puede seleccionar un lugar de trabajo de la lista.",
    },
    location: {
      label: "Ubicación",
      placeholder: "Ej: Pasillo este del 2.º piso, entrada de la zona B",
      helper: "Hasta 200 caracteres.",
    },
    hazardFactor: {
      label: "Factor de riesgo",
      placeholder:
        "¿Qué factores de riesgo hay?\nEjemplos:\n · El pasamanos de la escalera está suelto, lo que supone riesgo de caída.\n · Cables expuestos que representan riesgo de electrocución.",
      helper: "Hasta 1,000 caracteres.",
    },
    sitePhotos: {
      label: "Fotos del sitio",
      addButton: "Agregar foto",
      modalTitle: "Seleccionar método de foto",
      camera: "Tomar con cámara",
      album: "Elegir del álbum",
      hint: "Por favor, agregue fotos que muestren claramente las condiciones del sitio.",
      guide: "Debe registrar al menos 1 foto del sitio.\nPuede adjuntar de 1 a 5 fotos.",
      preview: "Se mostrará una vista previa al agregar una imagen.",
    },
    submit: "Enviar",
  },

  hazardRiskScreen: {
    title: "Zonas de riesgo",
    fab: "Nuevo informe",
    summary: {
      myReports: "Mis informes",
      completed: "Resuelto",
      unit: "elemento(s)",
    },
    tabs: {
      all: "Todo",
      pending: "Pendiente",
      ongoing: "En progreso",
      completed: "Resuelto",
      impossible: "Irresoluble",
    },
    status: {
      pending: "Pendiente",
      ongoing: "En progreso",
      completed: "Resuelto",
      impossible: "Irresoluble",
    },
    empty: {
      all: "No hay zonas de riesgo registradas.",
      pending: "No hay zonas de riesgo pendientes.",
      ongoing: "No hay zonas de riesgo en progreso.",
      completed: "No hay zonas de riesgo resueltas.",
      impossible: "No hay zonas de riesgo irresolubles.",
    },
  },

  hazardRiskDetailScreen: {
    title: "Detalle de zona de riesgo",
    infoCard: {
      locationLabel: "Ubicación",
      hazardFactorLabel: "Factor de riesgo",
      sitePhotosLabel: "Fotos del sitio",
      noPhotos: "No hay fotos registradas.",
      managerProfileLabel: "Perfil del administrador",
    },
    adminSection: {
      title: "Cambio de estado y acción",
      noteLabel: "Ingrese detalles de la acción",
      noteHint: "Se pueden ingresar hasta 2,000 caracteres.",
      sitePhotosLabel: "Fotos del sitio",
      sitePhotosHints: {
        hint1: "Por favor, agregue fotos que muestren claramente las condiciones del sitio.",
        hint2:
          "Agregar fotos del sitio después de la acción puede comunicar claramente los resultados.",
      },
      placeholder: {
        pending: "Estado pendiente.\nCambie a En progreso antes de tomar acción.",
        ongoing: "Disponible al seleccionar estado Completado o Imposible",
        completed:
          "Describa detalladamente la acción tomada (ej: pasamanos reinstalado, protector de cable instalado)",
        impossible: "Describa detalladamente por qué la acción no es posible.",
      },
    },
    statusHistory: {
      title: "Historial de estado",
      titles: {
        pending: "Informe registrado",
        completed: "Acción completada",
        impossible: "Acción imposible",
      },
      contents: {
        pending: "El informe ha sido recibido.",
        completed: "La acción ha sido completada.",
        impossible: "La acción ha sido procesada como imposible.",
        adminSuffix: " - Administrador ({{name}})",
      },
    },
  },

  welcomeIntroScreen: {
    skip: "Omitir",
    start: "Comenzar",
    slide1: {
      step: "01",
      title: "Traducción multilingüe en tiempo real",
      description:
        "Comuníquese fluidamente con trabajadores de todas las nacionalidades.\nTraducción instantánea de voz y texto\npara un lugar de trabajo más seguro.",
    },
    slide2: {
      step: "02",
      title: "Gestión TBM integrada",
      description:
        "Regístrese en TBM con un solo escaneo de código QR — sin papeleo.\nFirmas digitales e informes\ncompletados en un solo lugar.",
    },
    slide3: {
      step: "03",
      title: "Evaluación de riesgos con AI",
      description:
        "Solo tome una foto del sitio y la AI analizará los peligros\ny generará un borrador de informe para usted.",
    },
  },

  ...demoEs,
}

export default es
