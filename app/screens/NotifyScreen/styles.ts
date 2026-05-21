import { StyleSheet } from "react-native"

import { typography } from "@/theme/typography"

const BODY_BG = "#ffffff"
const BLUE = "#1062D8"
const CARD_TEXT = "#181818"
const CARD_TIME_COLOR = "#9A9A9A"
const CARD_UNREAD_BG = "#EDF3FD"
const CARD_UNREAD_BORDER = "#B6D4FF"
const CARD_READ_BG = "#FFFFFF"
const CARD_READ_BORDER = "#ECECEC"
const CIRCLE_BG = "#E5E7EB"
const EMPTY_DESC = "#9CA3AF"
const EMPTY_TITLE = "#1A2236"
const ICON_CIRCLE_READ_BG = "#E0EBFB"

export const styles = StyleSheet.create({
  /* ── 본문 ── */
  body: {
    backgroundColor: BODY_BG,
    flex: 1,
  },

  /* ── 알림 카드 ── */
  card: {
    alignItems: "center",
    backgroundColor: CARD_UNREAD_BG,
    borderColor: CARD_UNREAD_BORDER,
    borderRadius: 16,
    borderWidth: 1.5,
    flexDirection: "row",
    gap: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  cardContent: {
    flex: 1,
    gap: 2,
  },
  cardDesc: {
    color: CARD_TEXT,
    fontFamily: typography.primary.normal,
    fontSize: 14,
  },
  cardIconCircle: {
    alignItems: "center",
    backgroundColor: BLUE,
    borderRadius: 19,
    flexShrink: 0,
    height: 38,
    justifyContent: "center",
    width: 38,
  },
  cardIconCircleRead: {
    backgroundColor: ICON_CIRCLE_READ_BG,
  },
  cardRead: {
    backgroundColor: CARD_READ_BG,
    borderColor: CARD_READ_BORDER,
  },
  cardTime: {
    color: CARD_TIME_COLOR,
    fontFamily: typography.primary.normal,
    fontSize: 14,
  },
  cardTitle: {
    color: CARD_TEXT,
    fontFamily: typography.primary.bold,
    fontSize: 14,
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
  emptyContainer: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
  },
  emptyDesc: {
    color: EMPTY_DESC,
    fontFamily: typography.primary.normal,
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
    fontFamily: typography.primary.bold,
    fontSize: 17,
    marginBottom: 10,
    textAlign: "center",
  },

  /* ── 헤더 우측 버튼 ── */
  headerActions: {
    flexDirection: "row",
    gap: 4,
  },
  headerIconBtn: {
    alignItems: "center",
    height: 36,
    justifyContent: "center",
    width: 36,
  },

  /* ── 알림 리스트 ── */
  listArea: {
    gap: 17,
    paddingBottom: 32,
    paddingHorizontal: 22,
    paddingTop: 17,
  },

  /* ── 읽지 않음 dot ── */
  unreadDot: {
    backgroundColor: BLUE,
    borderRadius: 4,
    flexShrink: 0,
    height: 8,
    width: 8,
  },
})
