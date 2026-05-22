import { FC, useEffect, useState } from "react"
import { ActivityIndicator, ScrollView, TouchableOpacity, View, ViewStyle, TextStyle } from "react-native"
import { Bell, Send, Trash2, User } from "lucide-react-native"
import { observer } from "mobx-react-lite"
import { useSafeAreaInsets } from "react-native-safe-area-context"

import { ConfirmModal } from "@/components/ConfirmModal"
import { StackScreen } from "@/components/StackScreen"
import { Text } from "@/components/Text"
import { useRole } from "@/context/RoleContext"
import { translate } from "@/i18n/translate"
import { useStores } from "@/models"
import type { AppStackScreenProps } from "@/navigators/navigationTypes"
import {
  fetchCompanyPostDetail,
  UserCompanyPostDetailDto,
} from "@/services/api/safeBoard"
import { SafeBoardBadge } from "@/screens/SafeBoardScreen/components/SafeBoardBadge"
import { typography } from "@/theme/typography"

export interface SafeBoardDetailScreenProps extends AppStackScreenProps<"SafeBoardDetail"> {}

function formatPostDate(dateStr: string): string {
  const d = new Date(dateStr)
  if (isNaN(d.getTime())) return dateStr
  const yyyy = d.getFullYear()
  const mm = String(d.getMonth() + 1).padStart(2, "0")
  const dd = String(d.getDate()).padStart(2, "0")
  return `${yyyy}.${mm}.${dd}`
}

export const SafeBoardDetailScreen: FC<SafeBoardDetailScreenProps> = observer(
  function SafeBoardDetailScreen({ navigation, route }) {
    const { id } = route.params
    const { role } = useRole()
    const { safeBoardStore } = useStores()
    const insets = useSafeAreaInsets()

    const [post, setPost] = useState<UserCompanyPostDetailDto | null>(null)
    const [loading, setLoading] = useState(true)
    const [alertOn, setAlertOn] = useState(false)
    const [publishModalVisible, setPublishModalVisible] = useState(false)
    const [deleteModalVisible, setDeleteModalVisible] = useState(false)

    const isAdmin = role === "admin"
    const isMyPost = safeBoardStore.myPosts.some((p) => p.id === id)
    const canEdit = isAdmin && isMyPost

    useEffect(() => {
      let cancelled = false
      setLoading(true)
      fetchCompanyPostDetail(id)
        .then((data) => {
          if (!cancelled) setPost(data)
        })
        .catch(() => {
          if (!cancelled) setPost(null)
        })
        .finally(() => {
          if (!cancelled) setLoading(false)
        })
      return () => {
        cancelled = true
      }
    }, [id])

    const showStatusBadge = post?.status === "draft" || post?.status === "archived"

    return (
      <>
        <StackScreen
          title={translate("safeBoardDetailScreen:title")}
          onBack={() => navigation.goBack()}
          contentBg="#F9FAFE"
          squareTop
          rightSlot={
            canEdit ? (
              <TouchableOpacity
                onPress={() => navigation.navigate("SafeBoardCreate")}
                activeOpacity={0.7}
              >
                <Text
                  text={translate("safeBoardDetailScreen:editButton")}
                  style={$editButtonText}
                />
              </TouchableOpacity>
            ) : undefined
          }
        >
          {loading ? (
            <View style={$loadingContainer}>
              <ActivityIndicator size="large" color="#1062D8" />
            </View>
          ) : !post ? (
            <View style={$loadingContainer}>
              <Text text={translate("safeBoardDetailScreen:loadError")} style={$errorText} />
            </View>
          ) : (
            <View style={$outerContainer}>
              <View style={$card}>
                <View style={$badgeDateRow}>
                  <View style={$badgeRow}>
                    <SafeBoardBadge type={post.scope} />
                    {showStatusBadge && (
                      <SafeBoardBadge type={post.status === "draft" ? "draft" : "archived"} />
                    )}
                  </View>
                  <Text text={formatPostDate(post.createdAt)} style={$dateText} />
                </View>

                <Text text={post.title} style={$titleText} />

                {canEdit && (
                  <TouchableOpacity
                    style={$alertRow}
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

                <View style={$authorRow}>
                  <View style={$authorIconWrap}>
                    <User size={14} color="#606679" strokeWidth={2} />
                  </View>
                  <Text
                    text={`${translate("safeBoardDetailScreen:authorLabel")} ${post.authorName ?? ""}`}
                    style={$authorText}
                  />
                </View>

                <View style={$divider} />

                <Text text={post.authorAffiliation ?? ""} style={$affiliationText} />
              </View>

              <View style={$contentCard}>
                <ScrollView showsVerticalScrollIndicator={false}>
                  <Text text={post.content ?? ""} style={$contentText} />
                </ScrollView>
              </View>
            </View>
          )}

          {canEdit && !loading && post && (
            <View style={[$actionBar, { paddingBottom: insets.bottom + 12 }]}>
              <TouchableOpacity
                style={[$actionBtn, $publishBtn]}
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
                style={[$actionBtn, $deleteBtn]}
                activeOpacity={0.8}
                onPress={() => setDeleteModalVisible(true)}
              >
                <Trash2 size={16} color="#FFFFFF" strokeWidth={2} />
                <Text
                  text={translate("safeBoardDetailScreen:deleteButton")}
                  style={$actionBtnText}
                />
              </TouchableOpacity>
            </View>
          )}
        </StackScreen>

        <ConfirmModal
          visible={publishModalVisible}
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
  },
)

const $outerContainer: ViewStyle = {
  flex: 1,
  padding: 16,
  gap: 12,
}

const $loadingContainer: ViewStyle = {
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
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

const $alertRow: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
  gap: 5,
  marginBottom: 14,
}

const $alertText: TextStyle = {
  fontSize: 12,
  fontFamily: typography.primary.semiBold,
  color: "#979797",
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

const $errorText: TextStyle = {
  fontSize: 14,
  fontFamily: typography.primary.normal,
  color: "#979797",
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
