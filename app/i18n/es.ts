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
    tagline: "Safety Partner for the Workplace",
    enterDetails:
      "Ingresa tus datos a continuación para desbloquear información ultra secreta. Nunca vas a adivinar lo que te espera al otro lado. O quizás si lo harás; la verdad no hay mucha ciencia alrededor.",
    emailFieldLabel: "Email",
    passwordFieldLabel: "Contraseña",
    emailFieldPlaceholder: "Ingresa tu email",
    passwordFieldPlaceholder: "Ingresa tu contraseña",
    tapToLogIn: "¡Presiona acá para iniciar sesión!",
    hint: "Hint: you can use any email address and your favorite password :)",
    forgotPassword: "Forgot your password?",
    forgotPasswordModal: {
      title: "Notice",
      message: "For password recovery, please contact\nyour administrator.\nPhone: 062-383-0083",
      confirm: "OK",
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
    workplaceModal: { title: "Select Workplace" },
    badge: { companyWide: "Company-wide", workplace: "Workplace", draft: "Draft", archived: "Archived" },
    tabs: { all: "All", myPosts: "My" },
    empty: "Empty",
    write: "Write",
    draftSaved: "Post saved as draft.",
  },
  safeBoardDetailScreen: { title: "Post Detail", authorLabel: "Author", editButton: "Edit", alertOn: "Alert ON", alertOff: "Alert OFF", publishButton: "Publish", deleteButton: "Delete", publishModal: { title: "Publish Post", message: "Are you sure you want to publish this post?", cancel: "Cancel", confirm: "Publish" }, deleteModal: { title: "Delete Post", message: "Are you sure you want to delete this post?", cancel: "Cancel", confirm: "Delete" } },
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
    title: "Mi Página",
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
    },
    logout: "Cerrar Sesión",
  },

  languageSettings: {
    title: "Configuración de idioma",
    description: "Cambia el idioma de la aplicación de inmediato.",
    changedTitle: "Configuración de idioma",
    changedDescription:
      "El idioma ha sido cambiado a {{language}}.\nLa aplicación se reiniciará para aplicar los cambios.",
    confirm: "Confirmar",
    languages: {
      ko: "Coreano (한국어)",
      en: "Inglés (English)",
      zhHans: "Chino simplificado (简体中文)",
      zhHant: "Chino tradicional (繁體中文)",
      ru: "Ruso (Русский)",
      vi: "Vietnamita (Tiếng Việt)",
      id: "Indonesio (Bahasa Indonesia)",
      km: "Jemer (ភាសាខ្មែរ)",
      th: "Tailandés (ไทย)",
      ur: "Urdu (اردو)",
      ne: "Nepalí (नेपाली)",
      lo: "Lao (ພາສາລາວ)",
    },
  },

  notify: {
    title: "Notificaciones",
    emptyTitle: "Sin notificaciones",
    emptyDescription:
      "No tienes notificaciones en este momento.\nTe avisaremos cuando lleguen nuevas notificaciones.",
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
    title: "교육/발표",
    inviteButton: "초대",
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
      guide:
        "At least 1 site photo must be registered.\nYou can attach a minimum of 1 and a maximum of 5 photos.",
      preview: "A preview will be shown when you add an image.",
    },
    submit: "Generar informe",
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
    title: "Detalle de Actividad TBM",
    workDate: "Fecha de trabajo:  {{date}}",
    activityLabel: "Contenido de actividad",
    educationHeader: "Materiales educativos ({{count}})",
    startActivity: "Start Activity",
    edit: "Edit",
    delete: "Delete",
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
      sectionTitle: "Resultado de Procesamiento",
      reflected: "Ha sido reflejado.",
      rejected: "No fue reflejado.",
      dateLabel: "Procesado el:",
    },
    alreadyProcessed: "Esta propuesta ya ha sido procesada.",
    saveProcessingMessage: "Las notas de procesamiento se han guardado.",
    workerNoEditMessage:
      "Las propuestas en progreso o ya procesadas no se pueden editar ni eliminar.",
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
      ongoingMessage: "Disponible al seleccionar un estado completado o rechazado.",
      rejectedInputLabel: "Motivo de rechazo",
      rejectedProcessingPlaceholder: "Por favor, describa el motivo del rechazo en detalle.",
      processingPlaceholder:
        "Describa detalladamente la acción tomada. (ej. Revisión del equipo de equipos completada y disposición realizada)",
    },
    history: {
      sectionTitle: "Status Change History",
      registeredTitle: "Proposal Registered",
      registeredDesc: "Proposal has been received.",
      ongoingTitle: "In Progress",
      ongoingChangeTitle: "Cambio a En Progreso",
      ongoingDesc: "Proposal review has started.",
      reflectedTitle: "Reflected",
      reflectedChangeTitle: "Procesamiento Aceptado",
      reflectedDesc: "Proposal has been reflected.",
      rejectedTitle: "Not Reflected",
      rejectedChangeTitle: "Procesamiento Rechazado",
      rejectedDesc: "Proposal could not be reflected.",
      proceedNote: "Responsable asignado -",
      reflectedNote: "Procesado como aceptado -",
      rejectedNote: "Procesado como rechazado -",
    },
    editForm: {
      label: "Details",
      required: " *",
      helper: "You can write up to 2,000 characters.",
      errorMaxLength: "Please enter details within 2,000 characters.",
    },
    edit: "Edit",
    delete: "Delete",
    proceed: "Proceder",
    saveProceeded: "Guardar notas de procesamiento",
    proceedStartedMessage: "El procesamiento ha comenzado.",
    cancel: "Cancel",
    save: "Save",
    savedMessage: "Proposal has been updated.",
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
    submitting: "Enviando...",
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
  },
  patrolCreateScreen: {
    title: "Crear inspección de ronda",
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
      sitePhotosLabel: "Fotos del sitio",
      sitePhotosHints: {
        hint1: "Por favor, agregue fotos que muestren claramente las condiciones del sitio.",
        hint2: "Agregar fotos del sitio después de la acción puede comunicar claramente los resultados.",
      },
      placeholder: {
        pending:
          "Status is pending.\nChange to In Progress before taking action.",
        ongoing: "Input available when Completed or Impossible status is selected",
        completed:
          "Please describe the action taken in detail (e.g., handrail reinstalled, cable protector installed)",
        impossible: "Please describe in detail why the action is not possible.",
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

  ...demoEs,
}

export default es
