import { FC, useState } from "react"
import { View, ViewStyle, TextStyle, TouchableOpacity, ScrollView } from "react-native"
import type { AppStackScreenProps } from "@/navigators/navigationTypes"
import { colors } from "@/theme/colors"
import { typography } from "@/theme/typography"
import { Icon, IconTypes } from "@/components/Icon"
import { Text } from "@/components/Text"

interface HomeScreenProps extends AppStackScreenProps<"Home"> {}

const GRID_ITEMS = [
  { icon: "lock" as IconTypes, label: "1:1 통역", sub: "실시간 통역 지원" },
  { icon: "ladybug" as IconTypes, label: "AI 안전 챗봇", sub: "안전 상담/질의응답" },
  { icon: "bell" as IconTypes, label: "다국어 번역", sub: "언어 번역 지원" },
  { icon: "settings" as IconTypes, label: "교육/발표", sub: "교육 자료 발표" },
  { icon: "x" as IconTypes, label: "교육/발표 참여", sub: "교육/발표 참여" },
  { icon: "view" as IconTypes, label: "TBM 참여", sub: "안전점검 회의 참여" },
  { icon: "lock" as IconTypes, label: "순회점검", sub: "순회점검 진행/기록" },
  { icon: "ladybug" as IconTypes, label: "TBM 조회/생성", sub: "TBM 조회/생성" },
  { icon: "bell" as IconTypes, label: "TBM 보고서", sub: "TBM 보고서 조회" },
]

export const HomeScreen: FC<HomeScreenProps> = () => {
  const [selectedTab, setSelectedTab] = useState("전체")

  const renderTabContent = () => (
    <View style={$tabContentBox}>
      <View style={$contentItem}>
        <Text text={`${selectedTab} 첫 번째 내용`} />
      </View>
      <View style={$contentItem}>
        <Text text={`${selectedTab} 두 번째 내용`} />
      </View>
    </View>
  )

  return (
    <View style={$screenWrapper}>
      <ScrollView contentContainerStyle={$scrollContent}>
        <View style={$headerContainer}>
          <View style={$leftBox}>
            <Text text="K-SAFEONE" style={$titleText} />
            <Text text="KS산업안전협회" style={$subtitleText} />
          </View>
          <View style={$rightBox}>
            <View style={$iconButton}>
              <Icon icon="x" size={25} color="#FFFFFF" />
              <Text text="QR스캔" style={$iconText} />
            </View>
            <View style={$iconButton}>
              <Icon icon="bell" size={25} color="#FFFFFF" />
              <Text text="알림" style={$iconText} />
            </View>
            <View style={$iconButton}>
              <Icon icon="settings" size={25} color="#FFFFFF" />
              <Text text="언어" style={$iconText} />
            </View>
          </View>
        </View>

        <View style={$bottomContainer}>
          <View style={$cardBox}>
            <View style={$nameTextWrapper}>
              <Text style={$nameText} numberOfLines={1}>
                <Text text="김영희님," style={$nameBold} />
              </Text>
              <Text text="오늘도 안전한 하루 되세요!" style={$messageText} numberOfLines={1} />
            </View>
            <View style={$iconWrapper}>
              <Icon icon="view" size={50} />
            </View>
          </View>

          <View style={$gridContainer}>
            {GRID_ITEMS.map((item, i) => (
              <View key={i} style={$gridCell}>
                <Icon icon={item.icon} size={30} />
                <Text text={item.label} style={$gridLabel} />
                <Text text={item.sub} style={$gridSub} />
              </View>
            ))}
          </View>

          <View style={$boardHeader}>
            <Text text="안전게시판" style={$boardTitle} />
            <Text text="더보기 >" style={$boardMore} />
          </View>

          <View style={$tabCombinedContainer}>
            <View style={$tabContainer}>
              {["전체", "회사전체", "사업장"].map((tab) => (
                <TouchableOpacity key={tab} onPress={() => setSelectedTab(tab)} style={$tabButton}>
                  <Text
                    text={tab}
                    style={[$tabText, selectedTab === tab ? $tabTextSelected : $tabTextUnselected]}
                  />
                  {selectedTab === tab && <View style={$tabIndicator} />}
                </TouchableOpacity>
              ))}
            </View>
            {renderTabContent()}
          </View>
          
          <View style={$bottomInfoBox} />
          
          <View style={$footerBox}>
            <Text text="홈페이지" style={$footerText} />
            <Text text=" | " style={$footerText} />
            <Text text="개인정보처리방침" style={$footerText} />
            <Text text=" | " style={$footerText} />
            <Text text="이용약관" style={$footerText} />
          </View>
        </View>
      </ScrollView>
    </View>
  )
}

const $scrollContent: ViewStyle = { flexGrow: 1 }
const $screenWrapper: ViewStyle = { flex: 1, backgroundColor: colors.background }
const $headerContainer: ViewStyle = {
  marginTop: 60,
  width: "90%",
  alignSelf: "center",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "flex-start",
  marginBottom: 20,
}
const $leftBox: ViewStyle = { flex: 1 }
const $rightBox: ViewStyle = {
  width: 130,
  height: 43,
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
}
const $iconButton: ViewStyle = { alignItems: "center", justifyContent: "center" }
const $titleText: TextStyle = {
  color: "#FFFFFF",
  fontSize: 21,
  fontFamily: typography.primary.bold,
}
const $subtitleText: TextStyle = {
  color: "#FFFFFF",
  fontSize: 13,
  fontFamily: typography.primary.medium,
}
const $iconText: TextStyle = {
  color: "#FFFFFF",
  fontSize: 11,
  fontFamily: typography.primary.medium,
  marginTop: 2,
}
const $bottomContainer: ViewStyle = {
  flex: 1,
  backgroundColor: "#F9FAFE",
  borderTopLeftRadius: 12,
  borderTopRightRadius: 12,
  alignItems: "center",
  paddingTop: 20,
}
const $cardBox: ViewStyle = {
  width: 353,
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  padding: 16,
  borderRadius: 8,
  marginBottom: 20,
}
const $gridContainer: ViewStyle = {
  width: 351,
  height: 360,
  flexDirection: "row",
  flexWrap: "wrap",
  backgroundColor: "#FFFFFF",
  borderRadius: 8,
  shadowColor: "#000",
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.1,
  shadowRadius: 4,
  elevation: 5,
}
const $gridCell: ViewStyle = {
  width: "33.33%",
  height: "33.33%",
  justifyContent: "center",
  alignItems: "center",
  padding: 5,
}
const $gridLabel: TextStyle = { fontSize: 12, fontWeight: "bold", marginTop: 5 }
const $gridSub: TextStyle = { fontSize: 10, color: "#666" }
const $boardHeader: ViewStyle = {
  width: 346,
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  marginTop: 20,
}
const $boardTitle: TextStyle = { fontSize: 16, fontWeight: "bold", color: "#000000" }
const $boardMore: TextStyle = { fontSize: 14, color: "#7F848C" }
const $tabCombinedContainer: ViewStyle = { width: 353, marginTop: 15 }
const $tabContainer: ViewStyle = {
  flexDirection: "row",
  justifyContent: "space-around",
  paddingVertical: 10,
  backgroundColor: "transparent",
}
const $tabButton: ViewStyle = { alignItems: "center", paddingBottom: 10, flex: 1 }
const $tabText: TextStyle = { fontSize: 14, fontWeight: "bold", textAlign: "center" }
const $tabTextSelected: TextStyle = { color: "#1062D8" }
const $tabTextUnselected: TextStyle = { color: "#979797" }
const $tabIndicator: ViewStyle = {
  height: 2,
  width: "100%",
  backgroundColor: "#1062D8",
  marginTop: 10,
  position: "absolute",
  bottom: 0,
}
const $tabContentBox: ViewStyle = {
  width: 353,
  height: 139,
  backgroundColor: "#FFFFFF",
  borderRadius: 8,
  borderWidth: 1,
  borderColor: "#E9ECF0",
  borderTopWidth: 0,
}
const $contentItem: ViewStyle = {
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
  borderBottomWidth: 1,
  borderBottomColor: "#EEE",
}

const $nameTextWrapper: ViewStyle = { justifyContent: "center", flexShrink: 1 }
const $nameText: TextStyle = { fontSize: 18, color: "#000000" }
const $nameBold: TextStyle = { fontFamily: typography.primary.bold, fontSize: 18 }
const $messageText: TextStyle = { fontSize: 18, color: "#000000", marginTop: 4 }
const $iconWrapper: ViewStyle = { padding: 8, marginLeft: 10 }
const $bottomInfoBox: ViewStyle = {
  width: 352,
  height: 111,
  backgroundColor: "#E3F2FD",
  alignSelf: "center",
  marginTop: 20,
  borderRadius: 8,
}
const $footerBox: ViewStyle = {
  width: 237,
  height: 15,
  borderWidth: 1,
  borderColor: "#CFD0D3",
  alignSelf: "center",
  flexDirection: "row",
  justifyContent: "center",
  marginTop: 20,
  marginBottom: 40,
}
const $footerText: TextStyle = {
  fontSize: 10,
  color: "#7F848C",
}
