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
    // img: require("@assets/icons/home/grid_interpret.png"),
    // 임시 > 추출한 아이콘 크기가 안맞아서 다른걸로 대체
    img: require("@assets/icons/home/grid_chatbot.png"),
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
    <View style={$root}>
      <ScrollView
        style={$scrollView}
        contentContainerStyle={$scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* ── Header (blue background) ── */}
        <View style={[$header, { paddingTop: insets.top + 12 }]}>
          {/* Row 1: Logo + Actions */}
          <View style={$titleRow}>
            <View>
              <Text text="K-SAFEONE" style={$appTitle} />
              <Text text="KS산업안전협회" style={$appSub} />
            </View>
            <View style={$headerActions}>
              <TouchableOpacity style={$headerAction}>
                <Image
                  source={require("@assets/icons/nav/header_qr.png")}
                  style={$headerActionIcon}
                  resizeMode="contain"
                />
                <Text text="QR스캔" style={$headerActionLabel} />
              </TouchableOpacity>
              <TouchableOpacity style={$headerAction}>
                <Image
                  source={require("@assets/icons/nav/header_bell.png")}
                  style={$headerActionIcon}
                  resizeMode="contain"
                />
                <Text text="알림" style={$headerActionLabel} />
              </TouchableOpacity>
              <TouchableOpacity style={$headerAction}>
                <Image
                  source={require("@assets/icons/nav/header_lang.png")}
                  style={$headerActionIcon}
                  resizeMode="contain"
                />
                <Text text="언어" style={$headerActionLabel} />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* ── Body (white rounded) ── */}
        <View style={$body}>
          {/* Greeting + Avatar */}
          <View style={$greetRow}>
            <View style={$greetLeft}>
              <Text text="김영희님," style={$greetBold} />
              <Text text="오늘도 안전한 하루 되세요!" style={$greetMsg} />
            </View>
            <View style={$avatar}>
              <View style={$avatarHead} />
              <View style={$avatarBody} />
            </View>
          </View>

          {/* Feature Grid */}
          <View style={$grid}>
            {GRID_ITEMS.map((item, i) => (
              <TouchableOpacity key={i} style={$gridCell} activeOpacity={0.7}>
                <Image source={item.img} style={$gridIcon} resizeMode="contain" />
                <View style={$gridTextWrap}>
                  <Text text={item.label} style={$gridLabel} numberOfLines={1} />
                  <Text text={item.sub} style={$gridSub} numberOfLines={1} />
                </View>
              </TouchableOpacity>
            ))}
          </View>

          {/* Board Section */}
          <View style={$boardSection}>
            <View style={$boardHeader}>
              <Text text="안전게시판" style={$boardTitle} />
              <TouchableOpacity style={$boardMoreBtn}>
                <Text text="더보기" style={$boardMoreText} />
                <Icon icon="caretRight" size={12} color="#7F848C" />
              </TouchableOpacity>
            </View>

            {/* Tabs */}
            <View style={$tabRow}>
              {TABS.map((tab) => (
                <TouchableOpacity
                  key={tab}
                  style={$tabItem}
                  onPress={() => setSelectedTab(tab)}
                  activeOpacity={0.7}
                >
                  <Text
                    text={tab}
                    style={[$tabLabel, selectedTab === tab ? $tabLabelActive : $tabLabelInactive]}
                  />
                  {selectedTab === tab && <View style={$tabLine} />}
                </TouchableOpacity>
              ))}
            </View>

            {/* Board Items */}
            <View style={$boardList}>
              {BOARD_ITEMS.map((item, i) => (
                <TouchableOpacity key={i} style={$boardItem} activeOpacity={0.7}>
                  <View style={$tagWrap}>
                    <View style={[$tagBadge, item.tag === "사업장" ? $tagOrange : $tagBlue]}>
                      <Text
                        text={item.tag}
                        style={[$tagText, item.tag === "사업장" ? $tagTextOrange : $tagTextBlue]}
                        numberOfLines={1}
                      />
                    </View>
                  </View>
                  <View style={$boardItemContent}>
                    <Text text={item.title} style={$boardItemTitle} numberOfLines={1} />
                    <Text text={item.date} style={$boardItemDate} />
                  </View>
                  {item.pinned && <Icon icon="pin" size={14} color="#C03403" />}
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Bottom Banner */}
          <View style={$banner}>
            <View style={$bannerInner}>
              <Text text="K-SAFEONE과 함께하는 안전한 작업환경" style={$bannerText} />
            </View>
          </View>

          {/* Footer */}
          <View style={$footer}>
            <Text text="홈페이지" style={$footerLink} />
            <Text text="|" style={$footerSep} />
            <Text text="개인정보처리방침" style={$footerLink} />
            <Text text="|" style={$footerSep} />
            <Text text="이용약관" style={$footerLink} />
          </View>
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={$bottomNav}>
        {NAV_ITEMS.map((item, i) => (
          <TouchableOpacity
            key={i}
            style={$navItem}
            onPress={() => setActiveNav(i)}
            activeOpacity={0.7}
          >
            <View style={[$navIconWrap, i === activeNav && $navIconWrapActive]}>
              <Icon icon={item.icon} size={22} color={i === activeNav ? "#214ACC" : "#9AA0AD"} />
            </View>
            <Text
              text={item.label}
              style={[$navLabel, i === activeNav ? $navLabelActive : $navLabelInactive]}
            />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  )
}

const BLUE = "#0B3069"
const ACTIVE_BLUE = "#214ACC"

const $root: ViewStyle = {
  flex: 1,
  backgroundColor: BLUE,
}

const $scrollView: ViewStyle = {
  flex: 1,
}

const $scrollContent: ViewStyle = {
  flexGrow: 1,
}

const $header: ViewStyle = {
  backgroundColor: BLUE,
  paddingBottom: 20,
  paddingHorizontal: 20,
  gap: 16,
}

const $titleRow: ViewStyle = {
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "flex-start",
}

const $appTitle: TextStyle = {
  color: "#FFFFFF",
  fontSize: 21,
  fontFamily: typography.primary.bold,
}

const $appSub: TextStyle = {
  color: "#FFFFFF",
  fontSize: 13,
  fontFamily: typography.primary.medium,
  marginTop: 2,
  opacity: 0.9,
}

const $headerActions: ViewStyle = {
  flexDirection: "row",
  gap: 14,
  paddingTop: 4,
}

const $headerAction: ViewStyle = {
  alignItems: "center",
  gap: 4,
}

const $headerActionIcon: ImageStyle = {
  width: 24,
  height: 24,
  tintColor: "#FFFFFF",
}

const $headerActionLabel: TextStyle = {
  color: "#FFFFFF",
  fontSize: 11,
  fontFamily: typography.primary.medium,
}

const $greetRow: ViewStyle = {
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: 30,
}

const $greetLeft: ViewStyle = {
  flex: 1,
  gap: 2,
}

const $greetBold: TextStyle = {
  fontFamily: typography.primary.bold,
  fontSize: 21,
  color: "#0B1929",
  lineHeight: 30,
}

const $greetMsg: TextStyle = {
  fontFamily: typography.primary.semiBold,
  fontSize: 19,
  color: "#0B1929",
  lineHeight: 28,
}

const $avatar: ViewStyle = {
  width: 52,
  height: 52,
  borderRadius: 26,
  backgroundColor: "#D8E8F4",
  alignItems: "center",
  justifyContent: "flex-end",
  overflow: "hidden",
  marginLeft: 16,
}

const $avatarHead: ViewStyle = {
  position: "absolute",
  top: 9,
  width: 20,
  height: 20,
  borderRadius: 10,
  backgroundColor: BLUE,
}

const $avatarBody: ViewStyle = {
  width: 38,
  height: 24,
  borderTopLeftRadius: 19,
  borderTopRightRadius: 19,
  backgroundColor: BLUE,
}

const $body: ViewStyle = {
  backgroundColor: "#F9FAFE",
  borderTopLeftRadius: 20,
  borderTopRightRadius: 20,
  paddingTop: 26,
  paddingHorizontal: 20,
  flex: 1,
}

const $grid: ViewStyle = {
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
}

const $gridCell: ViewStyle = {
  width: "33.33%",
  paddingTop: 7,
  paddingBottom: 7,
  alignItems: "center",
  borderRightWidth: StyleSheet.hairlineWidth,
  borderBottomWidth: StyleSheet.hairlineWidth,
  borderColor: "#E9ECF0",
}

const $gridIcon: ImageStyle = {
  width: 54,
  height: 54,
}

const $gridTextWrap: ViewStyle = {
  alignItems: "center",
}

const $gridLabel: TextStyle = {
  fontSize: 13,
  fontFamily: typography.primary.semiBold,
  color: "#1A2236",
  textAlign: "center",
}

const $gridSub: TextStyle = {
  fontSize: 11,
  fontFamily: typography.primary.medium,
  color: "#ABABAB",
  textAlign: "center",
}

const $boardSection: ViewStyle = {
  marginBottom: 20,
}

const $boardHeader: ViewStyle = {
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: 12,
}

const $boardTitle: TextStyle = {
  fontSize: 16,
  fontFamily: typography.primary.bold,
  color: "#1A2236",
}

const $boardMoreBtn: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
  gap: 2,
}

const $boardMoreText: TextStyle = {
  fontSize: 13,
  color: "#7F848C",
  fontFamily: typography.primary.normal,
}

const $tabRow: ViewStyle = {
  flexDirection: "row",
  borderBottomWidth: 1,
  borderBottomColor: "#E9ECF0",
}

const $tabItem: ViewStyle = {
  flex: 1,
  alignItems: "center",
  paddingVertical: 10,
  position: "relative",
}

const $tabLabel: TextStyle = {
  fontSize: 14,
  fontFamily: typography.primary.semiBold,
  textAlign: "center",
}

const $tabLabelActive: TextStyle = {
  color: "#1062D8",
  fontFamily: typography.primary.bold,
}

const $tabLabelInactive: TextStyle = {
  color: "#979797",
}

const $tabLine: ViewStyle = {
  position: "absolute",
  bottom: -1,
  left: 0,
  right: 0,
  height: 2.5,
  backgroundColor: "#1062D8",
  borderRadius: 1,
}

const $boardList: ViewStyle = {
  backgroundColor: "#FFFFFF",
  borderBottomLeftRadius: 8,
  borderBottomRightRadius: 8,
  shadowColor: "#000",
  shadowOffset: { width: 0, height: 3 },
  shadowOpacity: 0.04,
  shadowRadius: 10,
  elevation: 2,
}

const $boardItem: ViewStyle = {
  flexDirection: "row",
  alignItems: "flex-start",
  paddingVertical: 14,
  paddingHorizontal: 16,
  gap: 8,
  borderBottomWidth: StyleSheet.hairlineWidth,
  borderBottomColor: "#E9ECF0",
}

const $tagWrap: ViewStyle = {
  minWidth: 47,
  maxWidth: 47,
}

const $tagBadge: ViewStyle = {
  paddingTop: 3,
  paddingBottom: 2,
  paddingHorizontal: 6,
  borderRadius: 9,
  borderWidth: 1,
  alignSelf: "flex-start",
}

const $tagOrange: ViewStyle = {
  borderColor: "#F88526",
}

const $tagBlue: ViewStyle = {
  borderColor: "#99C1F7",
}

const $tagText: TextStyle = {
  fontSize: 10,
  fontFamily: typography.primary.bold,
  lineHeight: 10,
  includeFontPadding: false,
}

const $tagTextOrange: TextStyle = {
  color: "#F67229",
}

const $tagTextBlue: TextStyle = {
  color: "#1260CE",
}

const $boardItemContent: ViewStyle = {
  flex: 1,
  gap: 7,
}

const $boardItemTitle: TextStyle = {
  fontSize: 12,
  fontFamily: typography.primary.bold,
  color: "#000000",
  lineHeight: 12,
  includeFontPadding: false,
}

const $boardItemDate: TextStyle = {
  fontSize: 11,
  color: "#7F848C",
  fontFamily: typography.primary.normal,
  lineHeight: 11,
  includeFontPadding: false,
}

const $banner: ViewStyle = {
  borderRadius: 10,
  overflow: "hidden",
  height: 111,
  backgroundColor: "#D0DDF7",
}

const $bannerInner: ViewStyle = {
  flex: 1,
  alignItems: "center",
  justifyContent: "center",
  paddingHorizontal: 20,
}

const $bannerText: TextStyle = {
  fontSize: 15,
  fontFamily: typography.primary.semiBold,
  color: BLUE,
  textAlign: "center",
}

const $footer: ViewStyle = {
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
  marginTop: 19,
  gap: 20,
  paddingBottom: 40,
}

const $footerLink: TextStyle = {
  fontSize: 11,
  color: "#7F848C",
  fontFamily: typography.primary.normal,
}

const $footerSep: TextStyle = {
  fontSize: 11,
  color: "#CFD0D3",
}

const $bottomNav: ViewStyle = {
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
}

const $navItem: ViewStyle = {
  flex: 1,
  alignItems: "center",
  gap: 4,
}

const $navIconWrap: ViewStyle = {
  width: 36,
  height: 36,
  borderRadius: 10,
  alignItems: "center",
  justifyContent: "center",
}

const $navIconWrapActive: ViewStyle = {
  backgroundColor: "#EEF3FC",
}

const $navLabel: TextStyle = {
  fontSize: 11,
  textAlign: "center",
}

const $navLabelActive: TextStyle = {
  color: ACTIVE_BLUE,
  fontFamily: typography.primary.semiBold,
}

const $navLabelInactive: TextStyle = {
  color: "#9AA0AD",
  fontFamily: typography.primary.normal,
}
