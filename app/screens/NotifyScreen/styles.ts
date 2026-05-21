import { StyleSheet } from "react-native"

const BODY_BG = "#F9FAFE"
const CIRCLE_BG = "#E5E7EB"
const EMPTY_TITLE = "#1A2236"
const EMPTY_DESC = "#9CA3AF"

export const styles = StyleSheet.create({
  /* ── 본문 ── */
  body: {
    alignItems: "center",
    backgroundColor: BODY_BG,
    flex: 1,
    justifyContent: "center",
  },

  /* ── Empty State ── */
  emptyCircle: {
    alignItems: "center",
    backgroundColor: CIRCLE_BG,
    borderRadius: 60,
    height: 120,
    justifyContent: "center",
    marginBottom: 24,
    width: 120,
  },
  emptyDesc: {
    color: EMPTY_DESC,
    fontSize: 13,
    lineHeight: 20,
    textAlign: "center",
  },
  emptyState: {
    alignItems: "center",
    paddingHorizontal: 40,
  },
  emptyTitle: {
    color: EMPTY_TITLE,
    fontSize: 17,
    fontWeight: "700",
    marginBottom: 10,
    textAlign: "center",
  },

  /* ── 헤더 우측 버튼 ── */
  headerIconBtn: {
    alignItems: "center",
    height: 36,
    justifyContent: "center",
    width: 36,
  },
})
