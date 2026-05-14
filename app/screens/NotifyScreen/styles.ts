import { StyleSheet } from "react-native"

const NAVY = "#0B3069"
const WHITE = "#FFFFFF"
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
  headerRightActions: {
    alignItems: "center",
    flexDirection: "row",
    gap: 4,
  },
  headerTitle: {
    color: WHITE,
    flex: 1,
    fontSize: 17,
    fontWeight: "600",
    textAlign: "center",
  },

  /* ── 루트 ── */
  root: {
    backgroundColor: NAVY,
    flex: 1,
  },
})
