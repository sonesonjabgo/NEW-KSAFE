const palette = {
  neutral100: "#FFFFFF",
  neutral200: "#F4F2F1",
  neutral300: "#D7CEC9",
  neutral400: "#B6ACA6",
  neutral500: "#978F8A",
  neutral600: "#564E4A",
  neutral700: "#3C3836",
  neutral800: "#191015",
  neutral900: "#000000",

  primary100: "#F4E0D9",
  primary200: "#E8C1B4",
  primary300: "#DDA28E",
  primary400: "#D28468",
  primary500: "#C76542",
  primary600: "#A54F31",

  secondary100: "#DCDDE9",
  secondary200: "#BCC0D6",
  secondary300: "#9196B9",
  secondary400: "#626894",
  secondary500: "#41476E",

  accent100: "#FFEED4",
  accent200: "#FFE1B2",
  accent300: "#FDD495",
  accent400: "#FBC878",
  accent500: "#FFBB50",

  angry100: "#F2D6CD",
  angry500: "#C03403",

  overlay20: "rgba(25, 16, 21, 0.2)",
  overlay50: "rgba(25, 16, 21, 0.5)",
  deepBlue: "#0B3069",
  actionBlue: "#1062D8",
  screenBg: "#F9FAFE",
  charcoal: "#3A3A3A",
  softGray: "#7F7F7F",
  nearBlack: "#252525",
  blueTint: "#E3EDFB",
  redTint: "#FEEEED",
  deleteRed: "#E03526",
} as const

export const colors = {
  /**
   * The palette is available to use, but prefer using the name.
   * This is only included for rare, one-off cases. Try to use
   * semantic names as much as possible.
   */
  palette,
  /**
   * A helper for making something see-thru.
   */
  transparent: "rgba(0, 0, 0, 0)",
  /**
   * The default text color in many components.
   */
  text: palette.neutral800,
  /**
   * Secondary text information.
   */
  textDim: palette.neutral600,
  /**
   * The default color of the screen background.
   */
  background: palette.deepBlue,
  /**
   * The default border color.
   */
  border: palette.neutral400,
  /**
   * The main tinting color.
   */
  tint: palette.primary500,
  /**
   * The inactive tinting color.
   */
  tintInactive: palette.neutral300,
  /**
   * A subtle color used for lines.
   */
  separator: palette.neutral300,
  /**
   * Error messages.
   */
  error: palette.angry500,
  /**
   * Error Background.
   */
  errorBackground: palette.angry100,
  /**
   * 앱 메인 네이비 색상 (#0B3069). 헤더, 루트 배경 등에 사용.
   */
  navy: palette.deepBlue,
  /**
   * 앱 메인 블루 색상 (#1062D8). 버튼, 링크, 강조 등에 사용.
   */
  blue: palette.actionBlue,
  /**
   * 기본 화면 배경색 (#F9FAFE).
   */
  screenBg: palette.screenBg,
  /**
   * 인트로 화면 로고 텍스트 색상 (#3A3A3A).
   */
  introLogo: palette.charcoal,
  /**
   * 인트로 화면 건너뛰기 텍스트 색상 (#7F7F7F).
   */
  introSkip: palette.softGray,
  /**
   * 인트로 화면 슬라이드 타이틀 색상 (#252525).
   */
  introTitle: palette.nearBlack,
  /**
   * 모달 아이콘 원형 배경색 (#E3EDFB).
   */
  modalIconBg: palette.blueTint,
  /**
   * 삭제/위험 모달 아이콘 원형 배경색 (#FEEEED).
   */
  modalIconRedBg: palette.redTint,
  /**
   * 삭제/위험 버튼 및 아이콘 색상 (#E03526).
   */
  danger: palette.deleteRed,
} as const
