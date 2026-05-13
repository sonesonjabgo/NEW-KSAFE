import { FC, useState } from "react"
import {
  Image,
  ImageStyle,
  View,
  ViewStyle,
  TextStyle,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import type { AppStackScreenProps } from "@/navigators/navigationTypes"
import { typography } from "@/theme/typography"
import { Icon, IconTypes } from "@/components/Icon"
import { Text } from "@/components/Text"

interface HomeScreenProps extends AppStackScreenProps<"Home"> {}

const GRID_ITEMS: { img: number; label: string; sub: string }[] = [
  {
    img: require("@assets/icons/home/grid_interpret.png"),
    label: "1:1 통역",
    sub: "실시간 통역 지원",
  },
  {
    img: require("@assets/icons/home/grid_chatbot.png"),
    label: "AI 안전 챗봇",
    sub: "안전 상담/질의응답",
  },
  {
    img: require("@assets/icons/home/grid_translate.png"),
    label: "다국어 번역",
    sub: "언어 번역 지원",
  },
  {
    img: require("@assets/icons/home/grid_education.png"),
    label: "교육/발표",
    sub: "교육 자료 발표",
  },
  {
    img: require("@assets/icons/home/grid_edu_join.png"),
    label: "교육/발표 참여",
    sub: "교육/발표 참여",
  },
  {
    img: require("@assets/icons/home/grid_tbm_join.png"),
    label: "TBM 참여",
    sub: "안전점검 회의 참여",
  },
  {
    img: require("@assets/icons/home/grid_patrol.png"),
    label: "순회점검",
    sub: "순회점검 진행/기록",
  },
  {
    img: require("@assets/icons/home/grid_tbm_create.png"),
    label: "TBM 조회/생성",
    sub: "TBM 조회/생성",
  },
  {
    img: require("@assets/icons/home/grid_tbm_report.png"),
    label: "TBM 보고서",
    sub: "TBM 보고서 조회",
  },
]

const BOARD_ITEMS = [
  { tag: "사업장", title: "2026년 4월 2일 앱 출시", date: "2026.04.02", pinned: true },
  { tag: "회사전체", title: "2026년 4월 2일 앱 출시", date: "2026.04.02", pinned: false },
]

const TABS = ["전체", "회사전체", "사업장"] as const
type TabType = (typeof TABS)[number]

const NAV_ITEMS: { icon: IconTypes; label: string }[] = [
  { icon: "menu", label: "홈" },
  { icon: "clap", label: "안전게시판" },
  { icon: "check", label: "안전관리" },
  { icon: "community", label: "근로자 참여" },
]

export const HomeScreen: FC<HomeScreenProps> = () => {
  const insets = useSafeAreaInsets()
  const [selectedTab, setSelectedTab] = useState<TabType>("전체")
  const [activeNav, setActiveNav] = useState(0)

  return (
    <View style={s.root}>
      <ScrollView contentContainerStyle={s.scrollContent} showsVerticalScrollIndicator={false}>
        {/* ── Header (blue background) ── */}
        <View style={[s.header, { paddingTop: insets.top + 12 }]}>
          {/* Row 1: Logo + Actions */}
          <View style={s.titleRow}>
            <View>
              <Text text="K-SAFEONE" style={s.appTitle} />
              <Text text="KS산업안전협회" style={s.appSub} />
            </View>
            <View style={s.headerActions}>
              <TouchableOpacity style={s.headerAction}>
                <Image
                  source={require("@assets/icons/nav/header_qr.png")}
                  style={s.headerActionIcon}
                  resizeMode="contain"
                />
                <Text text="QR스캔" style={s.headerActionLabel} />
              </TouchableOpacity>
              <TouchableOpacity style={s.headerAction}>
                <Image
                  source={require("@assets/icons/nav/header_bell.png")}
                  style={s.headerActionIcon}
                  resizeMode="contain"
                />
                <Text text="알림" style={s.headerActionLabel} />
              </TouchableOpacity>
              <TouchableOpacity style={s.headerAction}>
                <Image
                  source={require("@assets/icons/nav/header_lang.png")}
                  style={s.headerActionIcon}
                  resizeMode="contain"
                />
                <Text text="언어" style={s.headerActionLabel} />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* ── Body (white rounded) ── */}
        <View style={s.body}>
          {/* Greeting + Avatar */}
          <View style={s.greetRow}>
            <View style={s.greetLeft}>
              <Text text="김영희님," style={s.greetBold} />
              <Text text="오늘도 안전한 하루 되세요!" style={s.greetMsg} />
            </View>
            <View style={s.avatar}>
              <View style={s.avatarHead} />
              <View style={s.avatarBody} />
            </View>
          </View>

          {/* Feature Grid */}
          <View style={s.grid}>
            {GRID_ITEMS.map((item, i) => (
              <TouchableOpacity key={i} style={s.gridCell} activeOpacity={0.7}>
                <Image source={item.img} style={s.gridIcon} resizeMode="contain" />
                <Text text={item.label} style={s.gridLabel} numberOfLines={1} />
                <Text text={item.sub} style={s.gridSub} numberOfLines={1} />
              </TouchableOpacity>
            ))}
          </View>

          {/* Board Section */}
          <View style={s.boardSection}>
            <View style={s.boardHeader}>
              <Text text="안전게시판" style={s.boardTitle} />
              <TouchableOpacity style={s.boardMoreBtn}>
                <Text text="더보기" style={s.boardMoreText} />
                <Icon icon="caretRight" size={12} color="#7F848C" />
              </TouchableOpacity>
            </View>

            {/* Tabs */}
            <View style={s.tabRow}>
              {TABS.map((tab) => (
                <TouchableOpacity
                  key={tab}
                  style={s.tabItem}
                  onPress={() => setSelectedTab(tab)}
                  activeOpacity={0.7}
                >
                  <Text
                    text={tab}
                    style={[
                      s.tabLabel,
                      selectedTab === tab ? s.tabLabelActive : s.tabLabelInactive,
                    ]}
                  />
                  {selectedTab === tab && <View style={s.tabLine} />}
                </TouchableOpacity>
              ))}
            </View>

            {/* Board Items */}
            <View style={s.boardList}>
              {BOARD_ITEMS.map((item, i) => (
                <TouchableOpacity key={i} style={s.boardItem} activeOpacity={0.7}>
                  <View style={s.boardItemTop}>
                    <View style={[s.tagBadge, item.tag === "사업장" ? s.tagBlue : s.tagGray]}>
                      <Text text={item.tag} style={s.tagText} />
                    </View>
                    {item.pinned && <Icon icon="pin" size={14} color="#C03403" />}
                  </View>
                  <Text text={item.title} style={s.boardItemTitle} numberOfLines={1} />
                  <Text text={item.date} style={s.boardItemDate} />
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Bottom Banner */}
          <View style={s.banner}>
            <View style={s.bannerInner}>
              <Text text="K-SAFEONE과 함께하는 안전한 작업환경" style={s.bannerText} />
            </View>
          </View>

          {/* Footer */}
          <View style={s.footer}>
            <Text text="홈페이지" style={s.footerLink} />
            <Text text=" | " style={s.footerSep} />
            <Text text="개인정보처리방침" style={s.footerLink} />
            <Text text=" | " style={s.footerSep} />
            <Text text="이용약관" style={s.footerLink} />
          </View>
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={s.bottomNav}>
        {NAV_ITEMS.map((item, i) => (
          <TouchableOpacity
            key={i}
            style={s.navItem}
            onPress={() => setActiveNav(i)}
            activeOpacity={0.7}
          >
            <View style={[s.navIconWrap, i === activeNav && s.navIconWrapActive]}>
              <Icon icon={item.icon} size={22} color={i === activeNav ? "#214ACC" : "#9AA0AD"} />
            </View>
            <Text
              text={item.label}
              style={[s.navLabel, i === activeNav ? s.navLabelActive : s.navLabelInactive]}
            />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  )
}

const BLUE = "#0B3069"
const ACTIVE_BLUE = "#214ACC"

const s = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: BLUE,
  } as ViewStyle,
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 16,
  } as ViewStyle,

  // Header (blue background, column layout)
  header: {
    backgroundColor: BLUE,
    paddingBottom: 20,
    paddingHorizontal: 20,
    gap: 16,
  } as ViewStyle,
  titleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  } as ViewStyle,
  appTitle: {
    color: "#FFFFFF",
    fontSize: 21,
    fontFamily: typography.primary.bold,
  } as TextStyle,
  appSub: {
    color: "#FFFFFF",
    fontSize: 13,
    fontFamily: typography.primary.medium,
    marginTop: 2,
    opacity: 0.9,
  } as TextStyle,
  headerActions: {
    flexDirection: "row",
    gap: 14,
    paddingTop: 4,
  } as ViewStyle,
  headerAction: {
    alignItems: "center",
    gap: 4,
  } as ViewStyle,
  headerActionIcon: {
    width: 24,
    height: 24,
    tintColor: "#FFFFFF",
  } as ImageStyle,
  headerActionLabel: {
    color: "#FFFFFF",
    fontSize: 11,
    fontFamily: typography.primary.medium,
  } as TextStyle,

  // Greeting row (in white body)
  greetRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 30,
  } as ViewStyle,
  greetLeft: {
    flex: 1,
    gap: 2,
  } as ViewStyle,
  greetBold: {
    fontFamily: typography.primary.bold,
    fontSize: 21,
    color: "#0B1929",
    lineHeight: 30,
  } as TextStyle,
  greetMsg: {
    fontFamily: typography.primary.semiBold,
    fontSize: 19,
    color: "#0B1929",
    lineHeight: 28,
  } as TextStyle,

  // Avatar circle (person silhouette)
  avatar: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: "#D8E8F4",
    alignItems: "center",
    justifyContent: "flex-end",
    overflow: "hidden",
    marginLeft: 16,
  } as ViewStyle,
  avatarHead: {
    position: "absolute",
    top: 9,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: BLUE,
  } as ViewStyle,
  avatarBody: {
    width: 38,
    height: 24,
    borderTopLeftRadius: 19,
    borderTopRightRadius: 19,
    backgroundColor: BLUE,
  } as ViewStyle,

  // Body (white rounded top)
  body: {
    backgroundColor: "#F2F4F8",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 20,
    paddingHorizontal: 20,
    flex: 1,
  } as ViewStyle,

  // Grid
  grid: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 20,
    overflow: "hidden",
  } as ViewStyle,
  gridCell: {
    width: "33.33%",
    paddingTop: 7,
    paddingBottom: 7,
    alignItems: "center",
    borderRightWidth: StyleSheet.hairlineWidth,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: "#E9ECF0",
  } as ViewStyle,
  gridIcon: {
    width: 54,
    height: 54,
    marginBottom: 14,
  } as ImageStyle,
  gridLabel: {
    fontSize: 13,
    fontFamily: typography.primary.semiBold,
    color: "#1A2236",
    textAlign: "center",
  } as TextStyle,
  gridSub: {
    fontSize: 11,
    fontFamily: typography.primary.medium,
    color: "#ABABAB",
    textAlign: "center",
  } as TextStyle,

  // Board Section
  boardSection: {
    marginBottom: 20,
  } as ViewStyle,
  boardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  } as ViewStyle,
  boardTitle: {
    fontSize: 16,
    fontFamily: typography.primary.bold,
    color: "#1A2236",
  } as TextStyle,
  boardMoreBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
  } as ViewStyle,
  boardMoreText: {
    fontSize: 13,
    color: "#7F848C",
    fontFamily: typography.primary.normal,
  } as TextStyle,

  // Tabs
  tabRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#E9ECF0",
  } as ViewStyle,
  tabItem: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 10,
    position: "relative",
  } as ViewStyle,
  tabLabel: {
    fontSize: 14,
    fontFamily: typography.primary.semiBold,
    textAlign: "center",
  } as TextStyle,
  tabLabelActive: {
    color: ACTIVE_BLUE,
  } as TextStyle,
  tabLabelInactive: {
    color: "#979797",
  } as TextStyle,
  tabLine: {
    position: "absolute",
    bottom: -1,
    left: 0,
    right: 0,
    height: 2,
    backgroundColor: ACTIVE_BLUE,
    borderRadius: 1,
  } as ViewStyle,

  // Board Items
  boardList: {
    backgroundColor: "#FFFFFF",
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    borderWidth: 1,
    borderTopWidth: 0,
    borderColor: "#E9ECF0",
    overflow: "hidden",
  } as ViewStyle,
  boardItem: {
    padding: 14,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#E9ECF0",
  } as ViewStyle,
  boardItemTop: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginBottom: 6,
  } as ViewStyle,
  tagBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
    borderWidth: 1,
  } as ViewStyle,
  tagBlue: {
    borderColor: ACTIVE_BLUE,
    backgroundColor: "#EEF3FC",
  } as ViewStyle,
  tagGray: {
    borderColor: "#C0C5CE",
    backgroundColor: "#F4F5F7",
  } as ViewStyle,
  tagText: {
    fontSize: 11,
    fontFamily: typography.primary.medium,
    color: "#3A4A6B",
  } as TextStyle,
  boardItemTitle: {
    fontSize: 14,
    fontFamily: typography.primary.medium,
    color: "#1A2236",
    marginBottom: 4,
  } as TextStyle,
  boardItemDate: {
    fontSize: 12,
    color: "#7F848C",
    fontFamily: typography.primary.normal,
  } as TextStyle,

  // Banner
  banner: {
    marginBottom: 20,
    borderRadius: 10,
    overflow: "hidden",
    height: 111,
    backgroundColor: "#D0DDF7",
  } as ViewStyle,
  bannerInner: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  } as ViewStyle,
  bannerText: {
    fontSize: 15,
    fontFamily: typography.primary.semiBold,
    color: BLUE,
    textAlign: "center",
  } as TextStyle,

  // Footer
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
    paddingVertical: 8,
    borderTopWidth: 1,
    borderTopColor: "#E9ECF0",
  } as ViewStyle,
  footerLink: {
    fontSize: 11,
    color: "#7F848C",
    fontFamily: typography.primary.normal,
  } as TextStyle,
  footerSep: {
    fontSize: 11,
    color: "#CFD0D3",
  } as TextStyle,

  // Bottom Navigation
  bottomNav: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    borderTopWidth: 1,
    borderTopColor: "#E9ECF0",
    paddingBottom: 24,
    paddingTop: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 10,
  } as ViewStyle,
  navItem: {
    flex: 1,
    alignItems: "center",
    gap: 4,
  } as ViewStyle,
  navIconWrap: {
    width: 36,
    height: 36,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  } as ViewStyle,
  navIconWrapActive: {
    backgroundColor: "#EEF3FC",
  } as ViewStyle,
  navLabel: {
    fontSize: 11,
    textAlign: "center",
  } as TextStyle,
  navLabelActive: {
    color: ACTIVE_BLUE,
    fontFamily: typography.primary.semiBold,
  } as TextStyle,
  navLabelInactive: {
    color: "#9AA0AD",
    fontFamily: typography.primary.normal,
  } as TextStyle,
})
