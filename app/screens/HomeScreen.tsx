import { FC, useEffect, useState, useMemo } from "react"
import { View, ViewStyle, TextStyle, TouchableOpacity, ScrollView, StyleSheet } from "react-native"
import { Pin, ChevronRight } from "lucide-react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import type { SvgProps } from "react-native-svg"

import GridPatrol from "@assets/icons/home/grid_patrol.svg"
import GridTbmCreate from "@assets/icons/home/grid_tbm_create.svg"
import GridTbmReport from "@assets/icons/home/grid_tbm_report.svg"
import GridWarning from "@assets/icons/home/grid_warning.svg"
import GridBulb from "@assets/icons/home/grid_bulb.svg"

import BoardType1 from "@assets/icons/board/board_type1.svg"
import BoardType2 from "@assets/icons/board/board_type2.svg"
import GridChatbot from "@assets/icons/home/grid_chatbot.svg"
import GridEduJoin from "@assets/icons/home/grid_edu_join.svg"
import GridEducation from "@assets/icons/home/grid_education.svg"
import GridInterpret from "@assets/icons/home/text-search.svg"
import GridTbmJoin from "@assets/icons/home/grid_tbm_join.svg"
import GridTranslate from "@assets/icons/home/grid_translate.svg"
import HeaderBell from "@assets/icons/nav/header_bell.svg"
import HeaderLang from "@assets/icons/nav/header_lang.svg"
import HeaderQr from "@assets/icons/nav/header_qr.svg"
import ProfileSwitch from "@assets/icons/nav/profile_switch.svg"

import { Text } from "@/components/Text"
import { useRole } from "@/context/RoleContext"
import { translate } from "@/i18n/translate"
import type { MainTabScreenProps } from "@/navigators/navigationTypes"
import { typography } from "@/theme/typography"

interface HomeScreenProps extends MainTabScreenProps<"Home"> {}

const BOARD_ITEMS = [
  { tag: "workplace", title: "2026년 4월 2일 앱 출시", date: "2026.04.02", pinned: true },
  { tag: "company", title: "2026년 4월 2일 앱 출시", date: "2026.04.02", pinned: false },
]

type TabType = "all" | "company" | "workplace"

export const HomeScreen: FC<HomeScreenProps> = ({ navigation }) => {
  const insets = useSafeAreaInsets()
  const { role: userRole, setRole: setUserRole } = useRole()
  const [selectedTab, setSelectedTab] = useState<TabType>("all")
  // TODO: 추후 실제 API 연동으로 교체
  const [hasExistingEdu, setHasExistingEdu] = useState(true)

  const TABS: TabType[] = useMemo(() => ["all", "company", "workplace"], [])

  const GRID_ITEMS: {
    Icon: React.FC<SvgProps>
    label: string
    sub: string
    onPress?: () => void
    iconSize?: number
  }[] = useMemo(
    () => [
      {
        Icon: GridInterpret,
        label: translate("homeScreen:grid.interpret.label"),
        sub: translate("homeScreen:grid.interpret.sub"),
        onPress: () => navigation.navigate("VoiceTranslation"),
      },
      {
        Icon: GridChatbot,
        label: translate("homeScreen:grid.chatbot.label"),
        sub: translate("homeScreen:grid.chatbot.sub"),
        onPress: () => navigation.navigate("AISafetyChat"),
        iconSize: 32,
      },
      {
        Icon: GridTranslate,
        label: translate("homeScreen:grid.translate.label"),
        sub: translate("homeScreen:grid.translate.sub"),
        onPress: () => navigation.navigate("TextTranslation"),
        iconSize: 28,
      },
      {
        Icon: GridEducation,
        label: translate("homeScreen:grid.education.label"),
        sub: translate("homeScreen:grid.education.sub"),
        onPress: () => navigation.navigate("EducationPresentation"),
      },
      {
        Icon: GridEduJoin,
        label: translate("homeScreen:grid.eduJoin.label"),
        sub: translate("homeScreen:grid.eduJoin.sub"),
        onPress: () => navigation.navigate("QrScanner"),
        iconSize: 22,
      },
      {
        Icon: GridTbmJoin,
        label: translate("homeScreen:grid.tbmJoin.label"),
        sub: translate("homeScreen:grid.tbmJoin.sub"),
      },
      {
        Icon: GridPatrol,
        label: translate("homeScreen:grid.patrol.label"),
        sub: translate("homeScreen:grid.patrol.sub"),
      },
      {
        Icon: GridTbmCreate,
        label: translate("homeScreen:grid.tbmCreate.label"),
        sub: translate("homeScreen:grid.tbmCreate.sub"),
        iconSize: 24,
      },
      {
        Icon: GridTbmReport,
        label: translate("homeScreen:grid.tbmReport.label"),
        sub: translate("homeScreen:grid.tbmReport.sub"),
      },
      {
        Icon: GridWarning,
        label: translate("homeScreen:grid.hazard.label"),
        sub: translate("homeScreen:grid.hazard.sub"),
      },
      {
        Icon: GridBulb,
        label: translate("homeScreen:grid.suggestion.label"),
        sub: translate("homeScreen:grid.suggestion.sub"),
      },
    ],
    [navigation],
  )

  useEffect(() => {
    if (userRole === "worker") {
      setSelectedTab("all")
    }
  }, [userRole])

  // 관리자: 인덱스 0~8 (9개) / 근로자: 인덱스 0~5 + 9~10 (8개)
  const visibleGridItems =
    userRole === "admin"
      ? GRID_ITEMS.slice(0, 9)
      : [...GRID_ITEMS.slice(0, 6), ...GRID_ITEMS.slice(9)]

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
                  text={translate("homeScreen:role.admin")}
                  style={[$roleToggleText, userRole === "admin" && $roleToggleTextActive]}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={[$roleToggleBtn, userRole === "worker" && $roleToggleBtnActive]}
                onPress={() => setUserRole("worker")}
              >
                <Text
                  text={translate("homeScreen:role.worker")}
                  style={[$roleToggleText, userRole === "worker" && $roleToggleTextActive]}
                />
              </TouchableOpacity>
            </View>

            {/* 배너 카드 ON/OFF (근로자일 때만 표시) */}
            {userRole === "worker" && (
              <View style={$subToggleRow}>
                <Text text={translate("homeScreen:devToggle.eduBanner")} style={$subToggleLabel} />
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
              <Text text={translate("homeScreen:orgName")} style={$appSub} />
            </View>
            <View style={$headerActions}>
              <TouchableOpacity
                style={$headerAction}
                onPress={() => navigation.navigate("QrScanner")}
              >
                <View style={$headerIconWrap}>
                  <HeaderQr width={20} height={20} />
                </View>
                <Text text={translate("homeScreen:header.qrScan")} style={$headerActionLabel} />
              </TouchableOpacity>
              <TouchableOpacity style={$headerAction} onPress={() => navigation.navigate("Notify")}>
                <View style={$headerIconWrap}>
                  <HeaderBell width={22} height={22} />
                </View>
                <Text
                  text={translate("homeScreen:header.notification")}
                  style={$headerActionLabel}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={$headerAction}
                onPress={() => navigation.navigate("LanguageSettings")}
              >
                <View style={$headerIconWrap}>
                  <HeaderLang width={22} height={22} />
                </View>
                <Text text={translate("homeScreen:header.language")} style={$headerActionLabel} />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* ── Body (white rounded) ── */}
        <View style={$body}>
          {/* Greeting + Avatar */}
          <View style={$greetRow}>
            <View style={$greetLeft}>
              <Text
                text={translate("homeScreen:greeting.name", { name: "김영희" })}
                style={$greetBold}
              />
              <Text text={translate("homeScreen:greeting.message")} style={$greetMsg} />
            </View>
            <TouchableOpacity
              style={$avatar}
              activeOpacity={0.7}
              onPress={() => navigation.navigate("MyPage")}
            >
              <ProfileSwitch width={52} height={52} />
            </TouchableOpacity>
          </View>

          {/* Feature Grid */}
          <View style={$grid}>
            {visibleGridItems.map((item, i) => (
              <TouchableOpacity
                key={i}
                style={$gridCell}
                activeOpacity={0.7}
                onPress={item.onPress}
              >
                <View style={$gridIconWrap}>
                  <item.Icon width={item.iconSize ?? 36} height={item.iconSize ?? 36} />
                </View>
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
                <Text text={translate("homeScreen:edu.title")} style={$eduBannerTitle} />
                <Text text={translate("homeScreen:edu.description")} style={$eduBannerDesc} />
              </View>
              <ChevronRight size={16} color="#7F848C" strokeWidth={2} />
            </TouchableOpacity>
          )}

          {/* Board Section */}
          <View style={$boardSection}>
            <View style={$boardHeader}>
              <Text text={translate("homeScreen:board.title")} style={$boardTitle} />
              <TouchableOpacity
                style={$boardMoreBtn}
                onPress={() => navigation.navigate("SafeBoard")}
              >
                <Text text={translate("homeScreen:board.viewMore")} style={$boardMoreText} />
                <ChevronRight size={12} color="#7F848C" strokeWidth={2} />
              </TouchableOpacity>
            </View>

            {/* Tabs — 관리자만 표시 */}
            {userRole === "admin" && (
              <View style={$tabRow}>
                {TABS.map((tab) => {
                  const tabLabels: Record<TabType, string> = {
                    all: translate("homeScreen:board.tabs.all"),
                    company: translate("homeScreen:board.tabs.company"),
                    workplace: translate("homeScreen:board.tabs.workplace"),
                  }
                  return (
                    <TouchableOpacity
                      key={tab}
                      style={$tabItem}
                      onPress={() => setSelectedTab(tab)}
                      activeOpacity={0.7}
                    >
                      <Text
                        text={tabLabels[tab]}
                        style={[
                          $tabLabel,
                          selectedTab === tab ? $tabLabelActive : $tabLabelInactive,
                        ]}
                      />
                      {selectedTab === tab && <View style={$tabLine} />}
                    </TouchableOpacity>
                  )
                })}
              </View>
            )}

            {/* Board Items */}
            <View style={$boardList}>
              {BOARD_ITEMS.map((item, i) => (
                <TouchableOpacity key={i} style={$boardItem} activeOpacity={0.7}>
                  <View style={$tagWrap}>
                    {item.tag === "workplace" ? (
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
              <Text text={translate("homeScreen:banner.text")} style={$bannerText} />
            </View>
          </View>

          {/* Footer */}
          <View style={$footer}>
            <Text text={translate("homeScreen:footer.homepage")} style={$footerLink} />
            <Text text="|" style={$footerSep} />
            <Text text={translate("homeScreen:footer.privacy")} style={$footerLink} />
            <Text text="|" style={$footerSep} />
            <Text text={translate("homeScreen:footer.terms")} style={$footerLink} />
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

const $headerIconWrap: ViewStyle = {
  width: 24,
  height: 24,
  justifyContent: "center",
  alignItems: "center",
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
  marginLeft: 16,
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

const $gridIconWrap: ViewStyle = {
  width: 54,
  height: 54,
  justifyContent: "center",
  alignItems: "center",
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
