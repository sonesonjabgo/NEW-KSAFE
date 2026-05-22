import { FC, useEffect, useState, useMemo } from "react"
import {
  Linking,
  Platform,
  View,
  ViewStyle,
  TextStyle,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native"
import { ChevronRight } from "lucide-react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import type { SvgProps } from "react-native-svg"

import BoardPin from "@assets/icons/board/board_pin.svg"
import BannerIcon from "@assets/icons/home/banner_icon.svg"
import GridBulb from "@assets/icons/home/grid_bulb.svg"
import GridChatbot from "@assets/icons/home/grid_chatbot.svg"
import GridEduJoin from "@assets/icons/home/grid_edu_join.svg"
import GridEducation from "@assets/icons/home/grid_education.svg"
import GridInterpret from "@assets/icons/home/grid_live_talk.svg"
import GridPatrol from "@assets/icons/home/grid_patrol.svg"
import GridTbmCreate from "@assets/icons/home/grid_tbm_create.svg"
import GridTbmJoin from "@assets/icons/home/grid_tbm_join.svg"
import GridTbmReport from "@assets/icons/home/grid_tbm_report.svg"
import GridTranslate from "@assets/icons/home/grid_translate.svg"
import GridWarning from "@assets/icons/home/grid_warning.svg"
import HomeAiRiskBanner from "@assets/icons/home/home_ai_risk_banner.svg"
import HeaderBell from "@assets/icons/nav/header_bell.svg"
import HeaderLang from "@assets/icons/nav/header_lang.svg"
import HeaderQr from "@assets/icons/nav/header_qr.svg"
import ProfileSwitch from "@assets/icons/nav/profile_switch.svg"

import { PushNotificationBottomSheet } from "@/components/PushNotificationBottomSheet"
import { Text } from "@/components/Text"
import { WebViewModal } from "@/components/WebViewModal"
import { useRole } from "@/context/RoleContext"
import { translate } from "@/i18n/translate"
import type { MainTabScreenProps } from "@/navigators/navigationTypes"
import { SafeBoardBadge } from "@/screens/SafeBoardScreen/components/SafeBoardBadge"
import { colors } from "@/theme/colors"
import { useResponsive } from "@/theme/responsive"
import { typography } from "@/theme/typography"

interface HomeScreenProps extends MainTabScreenProps<"Home"> {}

const BOARD_ITEMS = [
  { tag: "company", title: "2026년 4월 2일 앱 출시", date: "2026.04.02", pinned: true },
  { tag: "workplace", title: "2026년 4월 2일 앱 출시", date: "2026.04.02", pinned: false },
]

type TabType = "all" | "company" | "workplace"

export const HomeScreen: FC<HomeScreenProps> = ({ navigation }) => {
  const insets = useSafeAreaInsets()
  const { role: userRole, setRole: setUserRole } = useRole()
  const [selectedTab, setSelectedTab] = useState<TabType>("all")
  // TODO: 추후 "생성된 교육/발표실 존재 여부" API 연동으로 교체
  const [showEducationBanner, setShowEducationBanner] = useState(false)
  const [webViewModalVisible, setWebViewModalVisible] = useState(false)
  const [selectedUrl, setSelectedUrl] = useState("")
  const [selectedTitle, setSelectedTitle] = useState("")
  const [pushNotificationVisible, setPushNotificationVisible] = useState(false)

  const {
    width,
    height: _height,
    isSmallPhone,
    isBasePhone: _isBasePhone,
    isLargePhone: _isLargePhone,
    isTablet,
    isShortHeight: _isShortHeight,
    breakpoint: _breakpoint,
  } = useResponsive()

  const handlePushAllow = () => setPushNotificationVisible(false)
  const handlePushOpenSettings = () => setPushNotificationVisible(false)

  const openWebView = (url: string, title: string) => {
    if (Platform.OS === "web") {
      Linking.openURL(url)
      return
    }
    setSelectedUrl(url)
    setSelectedTitle(title)
    setWebViewModalVisible(true)
  }

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
        iconSize: 30,
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
        onPress: () => {
          setShowEducationBanner(true)
          navigation.navigate("EducationPresentation")
        },
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
        onPress: () => navigation.navigate("TbmJoin"),
      },
      {
        Icon: GridPatrol,
        label: translate("homeScreen:grid.patrol.label"),
        sub: translate("homeScreen:grid.patrol.sub"),
        onPress: () => navigation.navigate("Patrol"),
      },
      {
        Icon: GridTbmCreate,
        label: translate("homeScreen:grid.tbmCreate.label"),
        sub: translate("homeScreen:grid.tbmCreate.sub"),
        iconSize: 24,
        onPress: () => navigation.navigate("TbmList"),
      },
      {
        Icon: GridTbmReport,
        label: translate("homeScreen:grid.tbmReport.label"),
        sub: translate("homeScreen:grid.tbmReport.sub"),
        onPress: () => navigation.navigate("TbmReportInquiry"),
      },
      {
        Icon: GridWarning,
        label: translate("homeScreen:grid.hazard.label"),
        sub: translate("homeScreen:grid.hazard.sub"),
        onPress: () => navigation.navigate("HazardRiskList"),
      },
      {
        Icon: GridBulb,
        label: translate("homeScreen:grid.suggestion.label"),
        sub: translate("homeScreen:grid.suggestion.sub"),
        onPress: () => navigation.navigate("ImprovementProposalList"),
      },
    ],
    [navigation],
  )

  useEffect(() => {
    setPushNotificationVisible(true)
  }, [])

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

  // 안전게시판 탭 필터 — 관리자: 탭 기준 필터, 근로자: 전체 표시
  const filteredBoardItems = useMemo(() => {
    if (userRole !== "admin" || selectedTab === "all") return BOARD_ITEMS
    return BOARD_ITEMS.filter((item) => item.tag === selectedTab)
  }, [selectedTab, userRole])

  // ── Responsive computed styles ────────────────────────────────────────────

  // Header
  const $headerDynamic: ViewStyle = {
    paddingHorizontal: isSmallPhone ? 14 : isTablet ? 28 : 20,
    paddingBottom: isSmallPhone ? 14 : 20,
    gap: isSmallPhone ? 10 : 16,
  }
  const $appTitleDynamic: TextStyle = { fontSize: isSmallPhone ? 18 : 21 }
  const $appSubDynamic: TextStyle = { fontSize: isSmallPhone ? 12 : 13 }
  const $headerActionsDynamic: ViewStyle = { gap: isSmallPhone ? 8 : 14 }
  const $headerIconWrapDynamic: ViewStyle = isSmallPhone ? { width: 22, height: 22 } : {}
  const $headerActionLabelDynamic: TextStyle = { fontSize: isSmallPhone ? 10 : 11 }

  // Body
  // tablet: paddingHorizontal 확대로 content가 640px 이상에서 중앙 정렬되는 효과
  const $bodyDynamic: ViewStyle = {
    paddingHorizontal: isTablet ? Math.max(20, (width - 640) / 2) : isSmallPhone ? 14 : 20,
    paddingTop: isSmallPhone ? 18 : 26,
  }

  // Greeting
  const avatarSize = isSmallPhone ? 44 : 52

  const $greetRowDynamic: ViewStyle = { marginBottom: isSmallPhone ? 20 : 30 }
  const $greetBoldDynamic: TextStyle = isSmallPhone ? { fontSize: 17, lineHeight: 24 } : {}
  const $greetMsgDynamic: TextStyle = isSmallPhone ? { fontSize: 15, lineHeight: 22 } : {}
  const $avatarDynamic: ViewStyle = { width: avatarSize, height: avatarSize }

  // Grid — tablet: 4열 / 기본: 3열
  const gridCellWidth = isTablet ? "25%" : "33.33%"
  const gridIconWrapSize = isSmallPhone ? 44 : 54

  const $gridDynamic: ViewStyle = { marginBottom: isSmallPhone ? 14 : 20 }
  const $gridCellDynamic: ViewStyle = {
    width: gridCellWidth,
    paddingTop: isSmallPhone ? 5 : 7,
    paddingBottom: isSmallPhone ? 5 : 7,
  }
  const $gridIconWrapDynamic: ViewStyle = isSmallPhone
    ? { width: gridIconWrapSize, height: gridIconWrapSize }
    : {}
  const $gridLabelDynamic: TextStyle = { fontSize: isSmallPhone ? 12 : 13 }
  const $gridSubDynamic: TextStyle = { fontSize: isSmallPhone ? 10 : 11 }

  // Board
  const $boardItemDynamic: ViewStyle = isSmallPhone
    ? { paddingVertical: 14, paddingHorizontal: 12 }
    : {}
  const $tagWrapDynamic: ViewStyle = { width: isSmallPhone ? 60 : 70 }

  // Footer
  const $footerDynamic: ViewStyle = {
    marginTop: isSmallPhone ? 14 : 19,
    paddingBottom: isSmallPhone ? 30 : 40,
  }
  const $footerLinksDynamic: ViewStyle = { gap: isSmallPhone ? 12 : 20 }
  const $footerLinkDynamic: TextStyle = { fontSize: isSmallPhone ? 12 : 13 }

  return (
    <>
      <View style={$root}>
        <ScrollView
          style={$scrollView}
          contentContainerStyle={$scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* ── Header (blue background) ── */}
          <View style={[$header, $headerDynamic, { paddingTop: insets.top + 12 }]}>
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
            </View>

            {/* Row 1: Logo + Actions */}
            <View style={$titleRow}>
              <View>
                <Text text="K-SAFEONE" style={[$appTitle, $appTitleDynamic]} />
                <Text text={translate("homeScreen:orgName")} style={[$appSub, $appSubDynamic]} />
              </View>
              <View style={[$headerActions, $headerActionsDynamic]}>
                <TouchableOpacity
                  style={$headerAction}
                  onPress={() => navigation.navigate("QrScanner")}
                >
                  <View style={[$headerIconWrap, $headerIconWrapDynamic]}>
                    <HeaderQr width={20} height={20} />
                  </View>
                  <Text
                    text={translate("homeScreen:header.qrScan")}
                    style={[$headerActionLabel, $headerActionLabelDynamic]}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  style={$headerAction}
                  onPress={() => navigation.navigate("Notify")}
                >
                  <View style={[$headerIconWrap, $headerIconWrapDynamic]}>
                    <HeaderBell width={22} height={22} color="white" />
                  </View>
                  <Text
                    text={translate("homeScreen:header.notification")}
                    style={[$headerActionLabel, $headerActionLabelDynamic]}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  style={$headerAction}
                  onPress={() => navigation.navigate("LanguageSettings")}
                >
                  <View style={[$headerIconWrap, $headerIconWrapDynamic]}>
                    <HeaderLang width={22} height={22} />
                  </View>
                  <Text
                    text={translate("homeScreen:header.language")}
                    style={[$headerActionLabel, $headerActionLabelDynamic]}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {/* ── Body (white rounded) ── */}
          <View style={[$body, $bodyDynamic]}>
            {/* Greeting + Avatar */}
            <View style={[$greetRow, $greetRowDynamic]}>
              <View style={$greetLeft}>
                <Text
                  text={translate("homeScreen:greeting.name", { name: "김영희" })}
                  style={[$greetBold, $greetBoldDynamic]}
                  numberOfLines={2}
                />
                <Text
                  text={translate("homeScreen:greeting.message")}
                  style={[$greetMsg, $greetMsgDynamic]}
                  numberOfLines={2}
                />
              </View>
              <TouchableOpacity
                style={[$avatar, $avatarDynamic]}
                activeOpacity={0.7}
                onPress={() => navigation.navigate("MyPage")}
              >
                <ProfileSwitch width={avatarSize} height={avatarSize} />
              </TouchableOpacity>
            </View>

            {/* Feature Grid */}
            <View style={[$grid, $gridDynamic]}>
              {visibleGridItems.map((item, i) => (
                <TouchableOpacity
                  key={i}
                  style={[$gridCell, $gridCellDynamic]}
                  activeOpacity={0.7}
                  onPress={item.onPress}
                >
                  <View style={[$gridIconWrap, $gridIconWrapDynamic]}>
                    <item.Icon width={item.iconSize ?? 36} height={item.iconSize ?? 36} />
                  </View>
                  <View style={$gridTextWrap}>
                    <Text text={item.label} style={[$gridLabel, $gridLabelDynamic]} numberOfLines={1} />
                    <Text text={item.sub} style={[$gridSub, $gridSubDynamic]} numberOfLines={1} />
                  </View>
                </TouchableOpacity>
              ))}
            </View>

            {/* 교육/발표 참여 안내 배너 (교육/발표 메뉴 클릭 시 표시) */}
            {showEducationBanner && (
              <TouchableOpacity
                style={$eduBanner}
                activeOpacity={0.7}
                onPress={() => navigation.navigate("EducationPresentation")}
              >
                <BannerIcon width={34} height={34} color="#0B3069" style={$eduBannerIcon} />
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
                {filteredBoardItems.map((item, i) => (
                  <TouchableOpacity
                    key={i}
                    style={[$boardItem, $boardItemDynamic]}
                    activeOpacity={0.7}
                    onPress={() => navigation.navigate("SafeBoard")}
                  >
                    <View style={[$tagWrap, $tagWrapDynamic]}>
                      <SafeBoardBadge
                        type={item.tag === "workplace" ? "workplace" : "company_wide"}
                      />
                    </View>
                    <View style={$boardItemContent}>
                      <Text text={item.title} style={$boardItemTitle} numberOfLines={1} />
                      <Text text={item.date} style={$boardItemDate} />
                    </View>
                    {item.pinned && <BoardPin width={20} height={20} />}
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Bottom Banner */}
            <TouchableOpacity
              style={$banner}
              activeOpacity={0.85}
              onPress={() => navigation.navigate("AiRiskDocCreator")}
            >
              <HomeAiRiskBanner width="100%" height="100%" />
            </TouchableOpacity>

            {/* Footer */}
            <View style={[$footer, $footerDynamic]}>
              <View style={[$footerLinks, $footerLinksDynamic]}>
                <TouchableOpacity
                  activeOpacity={0.6}
                  onPress={() =>
                    openWebView(
                      "https://www.kscenter.co.kr/",
                      translate("homeScreen:footer.homepage"),
                    )
                  }
                >
                  <Text
                    text={translate("homeScreen:footer.homepage")}
                    style={[$footerLink, $footerLinkDynamic]}
                  />
                </TouchableOpacity>
                <Text text="|" style={$footerSep} />
                <TouchableOpacity
                  activeOpacity={0.6}
                  onPress={() =>
                    openWebView(
                      "https://k-safeone.co.kr/policy/privacy",
                      translate("homeScreen:footer.privacy"),
                    )
                  }
                >
                  <Text
                    text={translate("homeScreen:footer.privacy")}
                    style={[$footerLink, $footerLinkDynamic]}
                  />
                </TouchableOpacity>
                <Text text="|" style={$footerSep} />
                <TouchableOpacity
                  activeOpacity={0.6}
                  onPress={() =>
                    openWebView(
                      "https://k-safeone.co.kr/policy/terms",
                      translate("homeScreen:footer.terms"),
                    )
                  }
                >
                  <Text
                    text={translate("homeScreen:footer.terms")}
                    style={[$footerLink, $footerLinkDynamic]}
                  />
                </TouchableOpacity>
              </View>
              <Text text={translate("homeScreen:footer.copyright")} style={$footerCopyright} />
            </View>
          </View>
        </ScrollView>
      </View>

      <WebViewModal
        visible={webViewModalVisible}
        url={selectedUrl}
        title={selectedTitle}
        onClose={() => setWebViewModalVisible(false)}
      />

      <PushNotificationBottomSheet
        isVisible={pushNotificationVisible}
        onAllow={handlePushAllow}
        onOpenSettings={handlePushOpenSettings}
        onClose={() => setPushNotificationVisible(false)}
      />
    </>
  )
}

// ── Static styles ─────────────────────────────────────────────────────────────

const $root: ViewStyle = {
  flex: 1,
  backgroundColor: colors.navy,
}

const $scrollView: ViewStyle = {
  flex: 1,
}

const $scrollContent: ViewStyle = {
  flexGrow: 1,
}

const $header: ViewStyle = {
  backgroundColor: colors.navy,
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
  color: colors.navy,
}

const $titleRow: ViewStyle = {
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "flex-start",
}

const $appTitle: TextStyle = {
  color: "#FFFFFF",
  fontFamily: typography.primary.bold,
}

const $appSub: TextStyle = {
  color: "#FFFFFF",
  fontFamily: typography.primary.medium,
  marginTop: 2,
  opacity: 0.9,
}

const $headerActions: ViewStyle = {
  flexDirection: "row",
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
  fontFamily: typography.primary.medium,
}

const $greetRow: ViewStyle = {
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
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
  marginLeft: 16,
}

const $body: ViewStyle = {
  backgroundColor: "#F9FAFE",
  borderTopLeftRadius: 20,
  borderTopRightRadius: 20,
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
  overflow: "hidden",
}

const $gridCell: ViewStyle = {
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
  fontFamily: typography.primary.semiBold,
  color: "#1A2236",
  textAlign: "center",
}

const $gridSub: TextStyle = {
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
  paddingVertical: 18,
  paddingHorizontal: 16,
  gap: 12,
  borderBottomWidth: StyleSheet.hairlineWidth,
  borderBottomColor: "#E9ECF0",
}

const $tagWrap: ViewStyle = {
  flexShrink: 0,
  alignItems: "flex-start",
}

const $boardItemContent: ViewStyle = {
  flex: 1,
  gap: 6,
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
  aspectRatio: 930 / 398,
}

const $footer: ViewStyle = {
  alignItems: "center",
  gap: 8,
}

const $footerLinks: ViewStyle = {
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
}

const $footerLink: TextStyle = {
  color: "#7F848C",
  fontFamily: typography.primary.normal,
}

const $footerSep: TextStyle = {
  fontSize: 13,
  color: "#CFD0D3",
}

const $footerCopyright: TextStyle = {
  fontSize: 10,
  color: "#B0B3B8",
  fontFamily: typography.primary.normal,
  textAlign: "center",
  marginTop: 25,
}

const $eduBanner: ViewStyle = {
  backgroundColor: "#EAF3FF",
  borderRadius: 12,
  borderWidth: 2,
  borderColor: "#99C1F7",
  paddingVertical: 16,
  paddingHorizontal: 16,
  marginBottom: 20,
  flexDirection: "row",
  alignItems: "center",
  gap: 14,
}

const $eduBannerIcon: ViewStyle = {
  flexShrink: 0,
}

const $eduBannerContent: ViewStyle = {
  flex: 1,
  gap: 4,
}

const $eduBannerTitle: TextStyle = {
  fontSize: 15,
  fontFamily: typography.primary.bold,
  color: colors.navy,
}

const $eduBannerDesc: TextStyle = {
  fontSize: 13,
  fontFamily: typography.primary.normal,
  color: "#1062D8",
}
