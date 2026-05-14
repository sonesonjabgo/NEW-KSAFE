import { StyleSheet } from "react-native"

const NAVY = "#0B3069"
const WHITE = "#FFFFFF"
const BODY_BG = "#F9FAFE"
const SELECTED_BG = "#E7F1FB"
const ITEM_BORDER = "#E5E7EB"
const CONFIRM_BTN_COLOR = "#1062D8"
const MODAL_ICON_BG = "#EEF3FC"
const OVERLAY_BG = "rgba(0,0,0,0.4)"
const TEXT_DARK = "#1A2236"
const TEXT_GUIDE = "#374151"
const TEXT_DESC = "#6B7280"

export const styles = StyleSheet.create({
  /* ── 본문 ── */
  body: {
    backgroundColor: BODY_BG,
    flex: 1,
  },

  /* ── 안내 문구 ── */
  guideText: {
    color: TEXT_GUIDE,
    fontSize: 14,
    paddingBottom: 16,
    paddingTop: 20,
  },

  /* ── 헤더 ── */
  header: {
    alignItems: "center",
    backgroundColor: NAVY,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingBottom: 14,
    paddingHorizontal: 16,
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

  /* ── 언어 항목 ── */
  item: {
    alignItems: "center",
    backgroundColor: WHITE,
    borderColor: ITEM_BORDER,
    borderRadius: 10,
    borderWidth: 1,
    flexDirection: "row",
    height: 59,
    justifyContent: "space-between",
    marginBottom: 10,
    paddingHorizontal: 16,
  },
  itemContent: {
    alignItems: "center",
    flexDirection: "row",
    gap: 10,
  },
  itemLabel: {
    color: TEXT_DARK,
    fontSize: 15,
  },
  itemSelected: {
    backgroundColor: SELECTED_BG,
    borderColor: NAVY,
  },

  /* ── 리스트 컨텐츠 ── */
  listContent: {
    paddingBottom: 32,
    paddingHorizontal: 20,
  },

  /* ── 모달 버튼 텍스트 ── */
  modalBtnText: {
    color: WHITE,
    fontSize: 16,
    fontWeight: "600",
  },

  /* ── 모달 카드 ── */
  modalCard: {
    alignItems: "center",
    backgroundColor: WHITE,
    borderRadius: 18,
    marginHorizontal: 32,
    paddingBottom: 24,
    paddingHorizontal: 24,
    paddingTop: 32,
  },

  /* ── 모달 확인 버튼 ── */
  modalConfirmBtn: {
    alignItems: "center",
    alignSelf: "stretch",
    backgroundColor: CONFIRM_BTN_COLOR,
    borderRadius: 12,
    marginTop: 20,
    paddingVertical: 15,
  },

  /* ── 모달 설명 ── */
  modalDesc: {
    color: TEXT_DESC,
    fontSize: 14,
    lineHeight: 22,
    marginTop: 8,
    textAlign: "center",
  },

  /* ── 모달 아이콘 원형 ── */
  modalIconCircle: {
    alignItems: "center",
    backgroundColor: MODAL_ICON_BG,
    borderRadius: 36,
    height: 72,
    justifyContent: "center",
    marginBottom: 16,
    width: 72,
  },

  /* ── 모달 딤 오버레이 ── */
  modalOverlay: {
    alignItems: "center",
    backgroundColor: OVERLAY_BG,
    flex: 1,
    justifyContent: "center",
  },

  /* ── 모달 제목 ── */
  modalTitle: {
    color: TEXT_DARK,
    fontSize: 18,
    fontWeight: "700",
    marginTop: 4,
  },

  /* ── 루트 ── */
  root: {
    backgroundColor: NAVY,
    flex: 1,
  },
})
