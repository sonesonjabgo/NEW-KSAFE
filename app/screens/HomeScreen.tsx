import { FC, useEffect, useState } from "react"
import { View, ViewStyle, TextStyle, TouchableOpacity, ScrollView, StyleSheet } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import type { SvgProps } from "react-native-svg"
import type { MainTabScreenProps } from "@/navigators/navigationTypes"
import { typography } from "@/theme/typography"
import { Text } from "@/components/Text"
import { Pin, ChevronRight } from "lucide-react-native"

import GridInterpret from "@assets/icons/home2/grid_interpret.svg"
import GridChatbot from "@assets/icons/home2/grid_chatbot.svg"
import GridTranslate from "@assets/icons/home2/grid_translate.svg"
import GridEducation from "@assets/icons/home2/grid_education.svg"
import GridEduJoin from "@assets/icons/home2/grid_edu_join.svg"
import GridTbmJoin from "@assets/icons/home2/grid_tbm_join.svg"
import GridPatrol from "@assets/icons/home2/grid_patrol.svg"
import GridTbmCreate from "@assets/icons/home2/grid_tbm_create.svg"
import GridTbmReport from "@assets/icons/home2/grid_tbm_report.svg"
import GridWarning from "@assets/icons/home2/grid_warning.svg"
import GridBulb from "@assets/icons/home2/grid_bulb.svg"

import BoardType1 from "@assets/icons/board/board_type1.svg"
import BoardType2 from "@assets/icons/board/board_type2.svg"

import HeaderQr from "@assets/icons/nav2/header_qr.svg"
import HeaderBell from "@assets/icons/nav2/header_bell.svg"
import HeaderLang from "@assets/icons/nav2/header_lang.svg"

interface HomeScreenProps extends MainTabScreenProps<"Home"> {}

const GRID_ITEMS: { Icon: React.FC<SvgProps>; label: string; sub: string }[] = [
  {
    Icon: GridInterpret,
    label: "1:1 통역",
    sub: "실시간 통역 지원",
  },
  {
    Icon: GridChatbot,
    label: "AI 안전 챗봇",
    sub: "안전 상담/질의응답",
  },
  {
    Icon: GridTranslate,
    label: "다국어 번역",
    sub: "언어 번역 지원",
  },
  {
    Icon: GridEducation,
    label: "교육/발표",
    sub: "교육 자료 발표",
  },
  {
    Icon: GridEduJoin,
    label: "교육/발표 참여",
    sub: "교육/발표 참여",
  },
  {
    Icon: GridTbmJoin,
    label: "TBM 참여",
    sub: "안전점검 회의 참여",
  },
  {
    Icon: GridPatrol,
    label: "순회점검",
    sub: "순회점검 진행/기록",
  },
  {
    Icon: GridTbmCreate,
    label: "TBM 조회/생성",
    sub: "TBM 조회/생성",
  },
  {
    Icon: GridTbmReport,
    label: "TBM 보고서",
    sub: "TBM 보고서 조회",
  },

  // ── 근로자 전용 ──
  {
    Icon: GridWarning,
    label: "유해위험개소",
    sub: "유해위험개소 조회",
  },
  {
    Icon: GridBulb,
    label: "제도개선 제안",
    sub: "제도개선 제안 등록",
  },
]

const BOARD_ITEMS = [
  { tag: "사업장", title: "2026년 4월 2일 앱 출시", date: "2026.04.02", pinned: true },
  { tag: "회사전체", title: "2026년 4월 2일 앱 출시", date: "2026.04.02", pinned: false },
]

const TABS = ["전체", "회사전체", "사업장"] as const
type TabType = (typeof TABS)[number]

export const HomeScreen: FC<HomeScreenProps> = ({ navigation }) => {
  const insets = useSafeAreaInsets()
  const [userRole, setUserRole] = useState<"admin" | "worker">("worker")
  const [selectedTab, setSelectedTab] = useState<TabType>("전체")
  // TODO: 추후 실제 API 연동으로 교체
  const [hasExistingEdu, setHasExistingEdu] = useState(true)

  useEffect(() => {
    if (userRole === "worker") {
      setSelectedTab("전체")
    }
  }, [userRole])

  // 관리자: 인덱스 0~8 (9개) / 근로자: 인덱스 0~5 + 9~10 (8개)
  const visibleGridItems =
    userRole === "admin" ? GRID_ITEMS.slice(0, 9) : [...GRID_ITEMS.slice(0, 6), ...GRID_ITEMS.slice(9)]

  return (
    <View style={$root}>
      <ScrollView
        style={$scrollView}
        contentContainerStyle={$scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* ── Header (blue background) ── */}
        <View style={[$header, { paddingTop: insets.top + 12 }]}>
          {/* ── 임시 개발용 토글 영역 ── */}
          <View style={$devToggleArea}>
            {/* 역할 전환 */}
            <View style={$roleToggleRow}>
              <TouchableOpacity
                style={[$roleToggleBtn, userRole === "admin" && $roleToggleBtnActive]}
                onPress={() => setUserRole("admin")}
              >
                <Text
                  text="관리자"
                  style={[$roleToggleText, userRole === "admin" && $roleToggleTextActive]}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={[$roleToggleBtn, userRole === "worker" && $roleToggleBtnActive]}
                onPress={() => setUserRole("worker")}
              >
                <Text
                  text="근로자"
                  style={[$roleToggleText, userRole === "worker" && $roleToggleTextActive]}
                />
              </TouchableOpacity>
            </View>

            {/* 배너 카드 ON/OFF (근로자일 때만 표시) */}
            {userRole === "worker" && (
              <View style={$subToggleRow}>
                <Text text="교육배너" style={$subToggleLabel} />
                <TouchableOpacity
                  style={[$subToggleBtn, hasExistingEdu ? $subToggleBtnOn : $subToggleBtnOff]}
                  onPress={() => setHasExistingEdu(!hasExistingEdu)}
                >
                  <Text
                    text={hasExistingEdu ? "ON" : "OFF"}
                    style={[$subToggleText, hasExistingEdu ? $subToggleTextOn : $subToggleTextOff]}
                  />
                </TouchableOpacity>
              </View>
            )}
          </View>

          {/* Row 1: Logo + Actions */}
          <View style={$titleRow}>
            <View>
              <Text text="K-SAFEONE" style={$appTitle} />
              <Text text="KS산업안전협회" style={$appSub} />
            </View>
            <View style={$headerActions}>
              <TouchableOpacity style={$headerAction}>
                <HeaderQr width={22} height={22} style={$headerActionIcon} />
                <Text text="QR스캔" style={$headerActionLabel} />
              </TouchableOpacity>
              <TouchableOpacity style={$headerAction}>
                <HeaderBell width={22} height={22} style={$headerActionIcon} />
                <Text text="알림" style={$headerActionLabel} />
              </TouchableOpacity>
              <TouchableOpacity style={$headerAction}>
                <HeaderLang width={22} height={22} style={$headerActionIcon} />
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
            {visibleGridItems.map((item, i) => (
              <TouchableOpacity key={i} style={$gridCell} activeOpacity={0.7}>
                <item.Icon width={36} height={36} style={$gridIcon} />
                <View style={$gridTextWrap}>
                  <Text text={item.label} style={$gridLabel} numberOfLines={1} />
                  <Text text={item.sub} style={$gridSub} numberOfLines={1} />
                </View>
              </TouchableOpacity>
            ))}
          </View>

          {/* 기존 교육/발표 참여 안내 배너 (근로자 전용) */}
          {userRole === "worker" && hasExistingEdu && (
            <TouchableOpacity style={$eduBanner} activeOpacity={0.7}>
              <View style={$eduBannerBar} />
              <View style={$eduBannerContent}>
                <Text text="기존 교육/발표 참여" style={$eduBannerTitle} />
                <Text text="이미 생성된 교육/발표실이 있습니다." style={$eduBannerDesc} />
              </View>
              <ChevronRight size={16} color="#7F848C" strokeWidth={2} />
            </TouchableOpacity>
          )}

          {/* Board Section */}
          <View style={$boardSection}>
            <View style={$boardHeader}>
              <Text text="안전게시판" style={$boardTitle} />
              <TouchableOpacity style={$boardMoreBtn} onPress={() => navigation.navigate("SafeBoard")}>
                <Text text="더보기" style={$boardMoreText} />
                <ChevronRight size={12} color="#7F848C" strokeWidth={2} />
              </TouchableOpacity>
            </View>

            {/* Tabs — 관리자만 표시 */}
            {userRole === "admin" && (
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
            )}

            {/* Board Items */}
            <View style={$boardList}>
              {BOARD_ITEMS.map((item, i) => (
                <TouchableOpacity key={i} style={$boardItem} activeOpacity={0.7}>
                  <View style={$tagWrap}>
                    {item.tag === "사업장" ? (
                      <BoardType1 width={44} height={21} />
                    ) : (
                      <BoardType2 width={54} height={21} />
                    )}
                  </View>
                  <View style={$boardItemContent}>
                    <Text text={item.title} style={$boardItemTitle} numberOfLines={1} />
                    <Text text={item.date} style={$boardItemDate} />
                  </View>
                  {item.pinned && <Pin size={14} color="#C03403" strokeWidth={2.5} />}
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

    </View>
  )
}

const BLUE = "#0B3069"

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

const $devToggleArea: ViewStyle = {
  alignItems: "center",
  gap: 8,
  marginBottom: 10,
}

const $roleToggleRow: ViewStyle = {
  flexDirection: "row",
  alignSelf: "center",
  backgroundColor: "rgba(255,255,255,0.15)",
  borderRadius: 8,
  padding: 3,
  gap: 4,
}

const $subToggleRow: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
  gap: 8,
}

const $subToggleLabel: TextStyle = {
  fontSize: 12,
  fontFamily: typography.primary.medium,
  color: "rgba(255,255,255,0.6)",
}

const $subToggleBtn: ViewStyle = {
  paddingVertical: 4,
  paddingHorizontal: 14,
  borderRadius: 6,
}

const $subToggleBtnOn: ViewStyle = {
  backgroundColor: "#4CAF50",
}

const $subToggleBtnOff: ViewStyle = {
  backgroundColor: "rgba(255,255,255,0.15)",
}

const $subToggleText: TextStyle = {
  fontSize: 12,
  fontFamily: typography.primary.bold,
}

const $subToggleTextOn: TextStyle = {
  color: "#FFFFFF",
}

const $subToggleTextOff: TextStyle = {
  color: "rgba(255,255,255,0.5)",
}

const $roleToggleBtn: ViewStyle = {
  paddingVertical: 6,
  paddingHorizontal: 16,
  borderRadius: 6,
}

const $roleToggleBtnActive: ViewStyle = {
  backgroundColor: "#FFFFFF",
}

const $roleToggleText: TextStyle = {
  fontSize: 13,
  fontFamily: typography.primary.semiBold,
  color: "rgba(255,255,255,0.6)",
}

const $roleToggleTextActive: TextStyle = {
  color: "#0B3069",
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

const $headerActionIcon: ViewStyle = {
  width: 24,
  height: 24,
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

const $gridIcon: ViewStyle = {
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

const $eduBanner: ViewStyle = {
  backgroundColor: "#EEF3FC",
  borderRadius: 12,
  paddingVertical: 16,
  paddingRight: 16,
  paddingLeft: 0,
  marginBottom: 20,
  flexDirection: "row",
  alignItems: "center",
  overflow: "hidden",
}

const $eduBannerBar: ViewStyle = {
  width: 4,
  borderRadius: 2,
  backgroundColor: "#214ACC",
  alignSelf: "stretch",
  marginLeft: 16,
  marginRight: 14,
}

const $eduBannerContent: ViewStyle = {
  flex: 1,
  gap: 4,
}

const $eduBannerTitle: TextStyle = {
  fontSize: 15,
  fontFamily: typography.primary.bold,
  color: "#1A2236",
}

const $eduBannerDesc: TextStyle = {
  fontSize: 13,
  fontFamily: typography.primary.normal,
  color: "#7F848C",
}
