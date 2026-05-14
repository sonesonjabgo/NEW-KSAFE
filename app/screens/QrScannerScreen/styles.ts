import { StyleSheet } from "react-native"

const NAVY = "#0B3069"
const NAVY_LIGHT = "#2E5386"
const WHITE = "#FFFFFF"
const WHITE_85 = "rgba(255,255,255,0.85)"
const CONTENT_BG = "#F9FAFE"
const BORDER_LIGHT = "#E5E7EB"
const ACCENT_BLUE = "#2563EB"
const TEXT_GRAY = "#374151"
const WARNING_BG = "#FEF3C7"
const WARNING_TEXT = "#92400E"
const OVERLAY_BG = "rgba(0,0,0,0.4)"
const GRAY_MEDIUM = "#D1D5DB"
const HANDLE_COLOR = "#B0B0B0"
const INACTIVE_BTN = "#E4E4E4"
const INACTIVE_TEXT = "#9CA3AF"
const REQUIRED_RED = "#EF4444"
const TEXT_DARK = "#1F2937"
const HELPER_COLOR = "#6B7280"
const CORNER_SIZE = 24
const CORNER_THICKNESS = 4
const CORNER_COLOR = NAVY

export const styles = StyleSheet.create({
  /* ── 코드 입력 필드 ── */
  codeInput: {
    borderColor: GRAY_MEDIUM,
    borderRadius: 10,
    borderWidth: 1,
    color: TEXT_DARK,
    fontSize: 15,
    marginBottom: 8,
    paddingHorizontal: 14,
    paddingVertical: 14,
  },

  /* ── 하단 콘텐츠 영역 ── */
  contentArea: {
    backgroundColor: CONTENT_BG,
    borderTopLeftRadius: 26,
    borderTopRightRadius: 26,
    flex: 1,
    gap: 14,
    paddingBottom: 32,
    paddingHorizontal: 20,
    paddingTop: 24,
  },

  /* QR 프레임 모서리 */
  cornerBL: {
    borderBottomLeftRadius: 4,
    borderBottomWidth: CORNER_THICKNESS,
    borderColor: CORNER_COLOR,
    borderLeftWidth: CORNER_THICKNESS,
    bottom: 0,
    height: CORNER_SIZE,
    left: 0,
    position: "absolute",
    width: CORNER_SIZE,
  },
  cornerBR: {
    borderBottomRightRadius: 4,
    borderBottomWidth: CORNER_THICKNESS,
    borderColor: CORNER_COLOR,
    borderRightWidth: CORNER_THICKNESS,
    bottom: 0,
    height: CORNER_SIZE,
    position: "absolute",
    right: 0,
    width: CORNER_SIZE,
  },
  cornerTL: {
    borderColor: CORNER_COLOR,
    borderLeftWidth: CORNER_THICKNESS,
    borderTopLeftRadius: 4,
    borderTopWidth: CORNER_THICKNESS,
    height: CORNER_SIZE,
    left: 0,
    position: "absolute",
    top: 0,
    width: CORNER_SIZE,
  },
  cornerTR: {
    borderColor: CORNER_COLOR,
    borderRightWidth: CORNER_THICKNESS,
    borderTopRightRadius: 4,
    borderTopWidth: CORNER_THICKNESS,
    height: CORNER_SIZE,
    position: "absolute",
    right: 0,
    top: 0,
    width: CORNER_SIZE,
  },

  /* ── 바텀시트 핸들바 ── */
  handle: {
    alignSelf: "center",
    backgroundColor: HANDLE_COLOR,
    borderRadius: 4,
    height: 4,
    marginBottom: 20,
    width: 46,
  },

  /* ── 헤더 ── */
  header: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingBottom: 12,
    paddingHorizontal: 16,
  },
  headerDesc: {
    color: WHITE_85,
    fontSize: 14,
    lineHeight: 22,
    textAlign: "center",
  },
  /* ── 헤더 설명 ── */
  headerDescContainer: {
    alignItems: "center",
    paddingBottom: 24,
    paddingHorizontal: 24,
  },
  headerIconBtn: {
    alignItems: "center",
    height: 36,
    justifyContent: "center",
    width: 36,
  },
  headerTitle: {
    color: WHITE,
    flex: 1,
    fontSize: 17,
    fontWeight: "600",
    textAlign: "center",
  },

  /* ── 바텀시트 도움말 텍스트 ── */
  helperText: {
    color: HELPER_COLOR,
    fontSize: 13,
    lineHeight: 20,
    marginBottom: 24,
  },

  /* ── 회의 참여 버튼 ── */
  joinBtn: {
    alignItems: "center",
    borderRadius: 12,
    paddingVertical: 16,
  },
  joinBtnActive: {
    backgroundColor: NAVY,
  },
  joinBtnInactive: {
    backgroundColor: INACTIVE_BTN,
  },
  joinBtnText: {
    fontSize: 16,
    fontWeight: "600",
  },
  joinBtnTextActive: {
    color: WHITE,
  },
  joinBtnTextInactive: {
    color: INACTIVE_TEXT,
  },

  keyboardBtn: {
    alignItems: "center",
    backgroundColor: NAVY_LIGHT,
    borderRadius: 8,
    height: 36,
    justifyContent: "center",
    width: 36,
  },

  /* ── 언어 카드 ── */
  languageCard: {
    alignItems: "center",
    backgroundColor: WHITE,
    borderColor: BORDER_LIGHT,
    borderRadius: 14,
    borderWidth: 1,
    flexDirection: "row",
    gap: 10,
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  languageHighlight: {
    color: ACCENT_BLUE,
    fontWeight: "500",
  },
  languageText: {
    color: TEXT_GRAY,
    fontSize: 14,
  },

  /* ── 딤 오버레이 ── */
  overlay: {
    flex: 1,
    justifyContent: "flex-end",
  },
  overlayBg: {
    backgroundColor: OVERLAY_BG,
    bottom: 0,
    left: 0,
    position: "absolute",
    right: 0,
    top: 0,
  },
  overlayDismiss: {
    flex: 1,
  },

  /* 카메라 권한 배너 */
  permissionBanner: {
    alignItems: "center",
    alignSelf: "stretch",
    backgroundColor: WARNING_BG,
    borderRadius: 10,
    flexDirection: "row",
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  permissionText: {
    color: WARNING_TEXT,
    flex: 1,
    fontSize: 13,
    lineHeight: 18,
  },

  /* QR 프레임 */
  qrFrameWrapper: {
    alignItems: "center",
    height: 220,
    justifyContent: "center",
    position: "relative",
    width: 220,
  },

  /* ── 필수 표시 ── */
  required: {
    color: REQUIRED_RED,
    fontSize: 15,
  },

  /* 다시 시도 버튼 */
  retryBtn: {
    alignItems: "center",
    alignSelf: "stretch",
    backgroundColor: NAVY,
    borderRadius: 12,
    paddingVertical: 15,
  },
  retryBtnText: {
    color: WHITE,
    fontSize: 15,
    fontWeight: "600",
  },

  /* ── 루트 ── */
  root: {
    backgroundColor: NAVY,
    flex: 1,
  },

  /* ── QR 스캔 카드 ── */
  scanCard: {
    alignItems: "center",
    backgroundColor: WHITE,
    borderColor: BORDER_LIGHT,
    borderRadius: 22,
    borderWidth: 1,
    gap: 16,
    paddingBottom: 24,
    paddingHorizontal: 20,
    paddingTop: 24,
  },

  /* ── 바텀시트 ── */
  sheet: {
    backgroundColor: WHITE,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingBottom: 32,
    paddingHorizontal: 20,
    paddingTop: 12,
  },
  sheetDesc: {
    color: TEXT_DARK,
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 16,
  },
})
