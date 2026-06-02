import { FC, useState } from "react"
import { ScrollView, TouchableOpacity, View, ViewStyle, TextStyle } from "react-native"
import { Bell, Send, Trash2 } from "lucide-react-native"
import { useTranslation } from "react-i18next"
import { useSafeAreaInsets } from "react-native-safe-area-context"

import { useResponsive } from "@/theme/responsive"

import { ConfirmModal } from "@/components/ConfirmModal"
import { StackScreen } from "@/components/StackScreen"
import { Text } from "@/components/Text"
import { UserAvatar } from "@/components/UserAvatar"
import { useRole } from "@/context/RoleContext"
import { translate } from "@/i18n/translate"
import type { AppStackScreenProps } from "@/navigators/navigationTypes"
import { SafeBoardBadge } from "@/screens/SafeBoardScreen/components/SafeBoardBadge"
import { mockSafeBoardData, mockMyPosts } from "@/screens/SafeBoardScreen/mock/mockSafeBoardData"
import { typography } from "@/theme/typography"

export interface SafeBoardDetailScreenProps extends AppStackScreenProps<"SafeBoardDetail"> {}

const allMockItems = [...mockSafeBoardData, ...mockMyPosts]

export const SafeBoardDetailScreen: FC<SafeBoardDetailScreenProps> = ({ navigation, route }) => {
  const { id } = route.params
  const { role } = useRole()
  const insets = useSafeAreaInsets()
  const [alertOn, setAlertOn] = useState(false)
  const [publishModalVisible, setPublishModalVisible] = useState(false)
  const [deleteModalVisible, setDeleteModalVisible] = useState(false)

  const item = allMockItems.find((p) => p.id === id)
  if (!item) return null

  const { i18n } = useTranslation()
  const isRTL = i18n.language === "ur"
  const { isSmallPhone } = useResponsive()
  const modalCardStyle: ViewStyle = { width: isSmallPhone ? 290 : 330 }
  const isAdmin = role === "admin"
  const isMyPost = mockMyPosts.some((p) => p.id === id)
  const canEdit = isAdmin && isMyPost
  const isDraft = item.status === "draft"

  const showStatusBadge = item.status === "draft" || item.status === "archived"

  return (
    <>
      <StackScreen
        title={translate("safeBoardDetailScreen:title")}
        onBack={() => navigation.goBack()}
        contentBg="#F9FAFE"
        squareTop
        rightSlot={
          canEdit && isDraft ? (
            <TouchableOpacity
              onPress={() => navigation.navigate("SafeBoardCreate")}
              activeOpacity={0.7}
            >
              <Text text={translate("safeBoardDetailScreen:editButton")} style={$editButtonText} />
            </TouchableOpacity>
          ) : undefined
        }
      >
        <View style={$outerContainer}>
          {/* 게시글 정보 카드 */}
          <View style={$card}>
            <View style={[$badgeDateRow, isRTL && { flexDirection: "row-reverse" }]}>
              <View style={[$badgeRow, isRTL && { flexDirection: "row-reverse" }]}>
                <SafeBoardBadge type={item.scope} />
                {showStatusBadge && (
                  <SafeBoardBadge type={item.status === "draft" ? "draft" : "archived"} />
                )}
              </View>
              <Text text={item.createdAt} style={$dateText} />
            </View>

            <Text text={item.title} style={$titleText} />

            {canEdit && (
              <TouchableOpacity
                style={[$alertRow, isRTL && { flexDirection: "row-reverse" }]}
                activeOpacity={0.7}
                onPress={() => setAlertOn((v) => !v)}
              >
                <Bell size={17} color={alertOn ? "#1062D8" : "#56524F"} strokeWidth={2} />
                <Text
                  text={
                    alertOn
                      ? translate("safeBoardDetailScreen:alertOn")
                      : translate("safeBoardDetailScreen:alertOff")
                  }
                  style={$alertText}
                />
              </TouchableOpacity>
            )}

            <View style={[$authorRow, isRTL && { flexDirection: "row-reverse" }]}>
              <UserAvatar initial={item.authorName.charAt(0)} size={28} />
              <Text text={item.authorName} style={$authorText} />
            </View>

            <View style={$divider} />

            <Text text={item.authorAffiliation} style={$affiliationText} />
          </View>

          {/* 게시글 내용 카드 — 나머지 공간 전체 */}
          <View style={$contentCard}>
            <ScrollView showsVerticalScrollIndicator={false}>
              <Text text={item.content} style={$contentText} />
            </ScrollView>
          </View>
        </View>

        {canEdit && isDraft && (
          <View style={[$actionBar, { paddingBottom: insets.bottom + 12 }]}>
            <TouchableOpacity
              style={[$actionBtn, $publishBtn, isRTL && { flexDirection: "row-reverse" }]}
              activeOpacity={0.8}
              onPress={() => setPublishModalVisible(true)}
            >
              <Send size={16} color="#FFFFFF" strokeWidth={2} />
              <Text
                text={translate("safeBoardDetailScreen:publishButton")}
                style={$actionBtnText}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={[$actionBtn, $deleteBtn, isRTL && { flexDirection: "row-reverse" }]}
              activeOpacity={0.8}
              onPress={() => setDeleteModalVisible(true)}
            >
              <Trash2 size={16} color="#FFFFFF" strokeWidth={2} />
              <Text text={translate("safeBoardDetailScreen:deleteButton")} style={$actionBtnText} />
            </TouchableOpacity>
          </View>
        )}
      </StackScreen>

      <ConfirmModal
        visible={publishModalVisible}
        cardStyle={modalCardStyle}
        icon={
          <View style={$publishIconCircle}>
            <Send size={26} color="#1062D8" strokeWidth={2} />
          </View>
        }
        title={translate("safeBoardDetailScreen:publishModal.title")}
        message={translate("safeBoardDetailScreen:publishModal.message")}
        cancelLabel={translate("safeBoardDetailScreen:publishModal.cancel")}
        confirmLabel={translate("safeBoardDetailScreen:publishModal.confirm")}
        confirmBgColor="#1062D8"
        onCancel={() => setPublishModalVisible(false)}
        onConfirm={() => {
          setPublishModalVisible(false)
          console.log("publish", id)
        }}
      />

      <ConfirmModal
        visible={deleteModalVisible}
        cardStyle={modalCardStyle}
        icon={
          <View style={$deleteIconCircle}>
            <Trash2 size={26} color="#E42E2B" strokeWidth={2} />
          </View>
        }
        title={translate("safeBoardDetailScreen:deleteModal.title")}
        message={translate("safeBoardDetailScreen:deleteModal.message")}
        cancelLabel={translate("safeBoardDetailScreen:deleteModal.cancel")}
        confirmLabel={translate("safeBoardDetailScreen:deleteModal.confirm")}
        confirmBgColor="#E42E2B"
        onCancel={() => setDeleteModalVisible(false)}
        onConfirm={() => {
          setDeleteModalVisible(false)
          console.log("delete", id)
        }}
      />
    </>
  )
}

const $outerContainer: ViewStyle = {
  flex: 1,
  paddingHorizontal: 22,
  paddingTop: 16,
  gap: 12,
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

const $contentCard: ViewStyle = {
  flex: 1,
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
  lineHeight: 18,
  fontFamily: typography.primary.normal,
  color: "#777777",
}

const $titleText: TextStyle = {
  fontSize: 18,
  fontFamily: typography.primary.bold,
  color: "#1A1A1A",
  lineHeight: 26,
  marginBottom: 14,
}

const $alertRow: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
  gap: 5,
  marginBottom: 14,
}

const $alertText: TextStyle = {
  fontSize: 15,
  lineHeight: 20,
  fontFamily: typography.primary.semiBold,
  color: "#333333",
}

const $authorRow: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
  gap: 6,
  marginBottom: 14,
}


const $authorText: TextStyle = {
  fontSize: 14,
  lineHeight: 20,
  fontFamily: typography.primary.medium,
  color: "#333333",
}

const $divider: ViewStyle = {
  height: 1,
  backgroundColor: "#E9ECF0",
  marginBottom: 14,
}

const $affiliationText: TextStyle = {
  fontSize: 14,
  fontFamily: typography.primary.normal,
  color: "#333333",
}

const $contentText: TextStyle = {
  fontSize: 15,
  fontFamily: typography.primary.normal,
  color: "#333333",
  lineHeight: 24,
}

const $editButtonText: TextStyle = {
  fontSize: 15,
  fontFamily: typography.primary.semiBold,
  color: "#FFFFFF",
}

const $actionBar: ViewStyle = {
  gap: 8,
  paddingHorizontal: 16,
  paddingTop: 8,
}

const $actionBtn: ViewStyle = {
  height: 50,
  borderRadius: 10,
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
  gap: 8,
}

const $publishBtn: ViewStyle = {
  backgroundColor: "#1062D8",
}

const $deleteBtn: ViewStyle = {
  backgroundColor: "#E42E2B",
}

const $actionBtnText: TextStyle = {
  fontSize: 15,
  fontFamily: typography.primary.bold,
  color: "#FFFFFF",
}

const $publishIconCircle: ViewStyle = {
  width: 56,
  height: 56,
  borderRadius: 28,
  backgroundColor: "#E8F0FE",
  justifyContent: "center",
  alignItems: "center",
}

const $deleteIconCircle: ViewStyle = {
  width: 56,
  height: 56,
  borderRadius: 28,
  backgroundColor: "#FDECEA",
  justifyContent: "center",
  alignItems: "center",
}
