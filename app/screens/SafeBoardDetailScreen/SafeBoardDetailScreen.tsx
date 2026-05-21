import { FC } from "react"
import { ScrollView, View, ViewStyle, TextStyle } from "react-native"
import { User } from "lucide-react-native"

import { StackScreen } from "@/components/StackScreen"
import { Text } from "@/components/Text"
import { translate } from "@/i18n/translate"
import type { AppStackScreenProps } from "@/navigators/navigationTypes"
import { SafeBoardBadge } from "@/screens/SafeBoardScreen/components/SafeBoardBadge"
import { mockSafeBoardData, mockMyPosts } from "@/screens/SafeBoardScreen/mock/mockSafeBoardData"
import { typography } from "@/theme/typography"

export interface SafeBoardDetailScreenProps extends AppStackScreenProps<"SafeBoardDetail"> {}

const allMockItems = [...mockSafeBoardData, ...mockMyPosts]

export const SafeBoardDetailScreen: FC<SafeBoardDetailScreenProps> = ({ navigation, route }) => {
  const { id } = route.params
  const item = allMockItems.find((p) => p.id === id)

  if (!item) return null

  const showStatusBadge = item.status === "draft" || item.status === "archived"

  return (
    <StackScreen
      title={translate("safeBoardDetailScreen:title")}
      onBack={() => navigation.goBack()}
      contentBg="#F9FAFE"
      squareTop
    >
      <ScrollView
        contentContainerStyle={$scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* 게시글 정보 카드 */}
        <View style={$card}>
          <View style={$badgeDateRow}>
            <View style={$badgeRow}>
              <SafeBoardBadge type={item.scope} />
              {showStatusBadge && (
                <SafeBoardBadge type={item.status === "draft" ? "draft" : "archived"} />
              )}
            </View>
            <Text text={item.createdAt} style={$dateText} />
          </View>

          <Text text={item.title} style={$titleText} />

          <View style={$authorRow}>
            <View style={$authorIconWrap}>
              <User size={14} color="#606679" strokeWidth={2} />
            </View>
            <Text
              text={`${translate("safeBoardDetailScreen:authorLabel")} ${item.authorName}`}
              style={$authorText}
            />
          </View>

          <View style={$divider} />

          <Text text={item.authorAffiliation} style={$affiliationText} />
        </View>

        {/* 게시글 내용 카드 */}
        <View style={$card}>
          <Text text={item.content} style={$contentText} />
        </View>
      </ScrollView>
    </StackScreen>
  )
}

const $scrollContent: ViewStyle = {
  padding: 16,
  gap: 12,
  paddingBottom: 40,
}

const $card: ViewStyle = {
  backgroundColor: "#FFFFFF",
  borderRadius: 12,
  padding: 20,
  shadowColor: "#000000",
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.05,
  shadowRadius: 8,
  elevation: 2,
}

const $badgeDateRow: ViewStyle = {
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: 14,
}

const $badgeRow: ViewStyle = {
  flexDirection: "row",
  gap: 6,
}

const $dateText: TextStyle = {
  fontSize: 13,
  fontFamily: typography.primary.normal,
  color: "#979797",
}

const $titleText: TextStyle = {
  fontSize: 18,
  fontFamily: typography.primary.bold,
  color: "#1A1A1A",
  lineHeight: 26,
  marginBottom: 14,
}

const $authorRow: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
  gap: 6,
  marginBottom: 14,
}

const $authorIconWrap: ViewStyle = {
  width: 28,
  height: 28,
  borderRadius: 14,
  backgroundColor: "#F0F2F5",
  justifyContent: "center",
  alignItems: "center",
}

const $authorText: TextStyle = {
  fontSize: 14,
  fontFamily: typography.primary.medium,
  color: "#333333",
}

const $divider: ViewStyle = {
  height: 1,
  backgroundColor: "#E9ECF0",
  marginBottom: 14,
}

const $affiliationText: TextStyle = {
  fontSize: 13,
  fontFamily: typography.primary.normal,
  color: "#606679",
}

const $contentText: TextStyle = {
  fontSize: 15,
  fontFamily: typography.primary.normal,
  color: "#333333",
  lineHeight: 24,
}
