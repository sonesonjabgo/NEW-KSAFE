import { FC, useState } from "react"
import { Linking, ScrollView, TouchableOpacity, View, ViewStyle, TextStyle } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { useResponsive } from "@/theme/responsive"
import {
  IconBell,
  IconCamera,
  IconChevronLeft,
  IconLogout,
  IconPower,
  IconMicrophone,
  IconPhoto,
} from "@tabler/icons-react-native"

import { ConfirmModal } from "@/components/ConfirmModal"
import { PermissionItem } from "@/components/MyPage/PermissionItem"
import { ProfileCard } from "@/components/MyPage/ProfileCard"
import { WorkplaceChip } from "@/components/MyPage/WorkplaceChip"
import { Text } from "@/components/Text"
import { useAuth } from "@/context/AuthContext"
import { useRole } from "@/context/RoleContext"
import { translate } from "@/i18n/translate"
import type { AppStackScreenProps } from "@/navigators/navigationTypes"
import { colors } from "@/theme/colors"
import { typography } from "@/theme/typography"
import { useDevicePermissions } from "@/utils/useDevicePermissions"

const ICON_COLOR = "#000000"

const ORG_NAME = "KS산업안전협회"

export const MyPageScreen: FC<AppStackScreenProps<"MyPage">> = ({ navigation }) => {
  const { user, profile, signOut } = useAuth()
  const displayName = profile?.username?.trim() || user?.name?.trim() || ""
  const displayEmail = user?.email || ""
  const { role } = useRole()
  const { isSmallPhone } = useResponsive()
  const { top } = useSafeAreaInsets()
  const modalCardStyle: ViewStyle = { width: isSmallPhone ? 290 : 330 }
  const [logoutModalVisible, setLogoutModalVisible] = useState(false)

  const { permissions } = useDevicePermissions()
  const cameraGranted = permissions.find((p) => p.type === "camera")?.isGranted ?? false
  const micGranted = permissions.find((p) => p.type === "microphone")?.isGranted ?? false
  const photoGranted = permissions.find((p) => p.type === "photos")?.isGranted ?? false
  const notifGranted = permissions.find((p) => p.type === "notifications")?.isGranted ?? false

  const isWorker = role === "worker"

  const handleOpenSettings = () => {
    Linking.openSettings()
  }

  const handleLogoutConfirm = () => {
    setLogoutModalVisible(false)
    void signOut()
    // signOut() → isAuthenticated = false → AppNavigator가 Guest 스택(WelcomeIntro)으로 자동 전환
  }

  return (
    <>
      <View style={$root}>
        <View style={[$header, { paddingTop: top + 10 }]}>
          <View style={$headerTop}>
            <TouchableOpacity style={$backButton} onPress={() => navigation.goBack()}>
              <IconChevronLeft size={24} color="#FFFFFF" />
            </TouchableOpacity>
            <Text text={translate("myPageScreen:title")} style={$headerTitle} />
            <View style={$headerRight} />
          </View>

          <ProfileCard orgName={ORG_NAME} userName={displayName} email={displayEmail} />

          {isWorker && <WorkplaceChip name={translate("myPageScreen:workplace.label")} />}
        </View>

        <ScrollView
          style={$scrollView}
          contentContainerStyle={$scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={$section}>
            <Text text={translate("myPageScreen:permissions.sectionTitle")} style={$sectionTitle} />
            <View style={$permissionCard}>
              <PermissionItem
                icon={<IconCamera size={22} color={ICON_COLOR} />}
                title={translate("myPageScreen:permissions.camera.title")}
                description={translate("myPageScreen:permissions.camera.description")}
                type="button"
                isGranted={cameraGranted}
                buttonLabel={translate(
                  cameraGranted
                    ? "myPageScreen:permissions.allowed"
                    : "myPageScreen:permissions.notAllowed",
                )}
                onButtonPress={handleOpenSettings}
                showDivider
              />
              <PermissionItem
                icon={<IconMicrophone size={22} color={ICON_COLOR} />}
                title={translate("myPageScreen:permissions.microphone.title")}
                description={translate("myPageScreen:permissions.microphone.description")}
                type="button"
                isGranted={micGranted}
                buttonLabel={translate(
                  micGranted
                    ? "myPageScreen:permissions.allowed"
                    : "myPageScreen:permissions.notAllowed",
                )}
                onButtonPress={handleOpenSettings}
                showDivider
              />
              <PermissionItem
                icon={<IconPhoto size={22} color={ICON_COLOR} />}
                title={translate("myPageScreen:permissions.photo.title")}
                description={translate("myPageScreen:permissions.photo.description")}
                type="button"
                isGranted={photoGranted}
                buttonLabel={translate(
                  photoGranted
                    ? "myPageScreen:permissions.allowed"
                    : "myPageScreen:permissions.notAllowed",
                )}
                onButtonPress={handleOpenSettings}
                showDivider
              />
              <PermissionItem
                icon={<IconBell size={22} color={ICON_COLOR} />}
                title={translate("myPageScreen:permissions.notification.title")}
                description={translate("myPageScreen:permissions.notification.description")}
                type="switch"
                switchValue={notifGranted}
                onSwitchChange={() => handleOpenSettings()}
              />
            </View>
          </View>

          <TouchableOpacity
            style={$logoutButton}
            onPress={() => setLogoutModalVisible(true)}
            activeOpacity={0.7}
          >
            <IconLogout size={20} color="#E53935" />
            <Text text={translate("myPageScreen:logout")} style={$logoutText} />
          </TouchableOpacity>
        </ScrollView>
      </View>

      <ConfirmModal
        visible={logoutModalVisible}
        cardStyle={modalCardStyle}
        icon={
          <View style={$logoutModalIconCircle}>
            <IconPower size={26} color={colors.danger} />
          </View>
        }
        title={translate("myPageScreen:logoutModal.title")}
        message={translate("myPageScreen:logoutModal.message")}
        cancelLabel={translate("myPageScreen:logoutModal.cancel")}
        confirmLabel={translate("myPageScreen:logoutModal.confirm")}
        confirmBgColor={colors.danger}
        onCancel={() => setLogoutModalVisible(false)}
        onConfirm={handleLogoutConfirm}
      />
    </>
  )
}

const $root: ViewStyle = {
  flex: 1,
  backgroundColor: "#F9FAFE",
}

const $header: ViewStyle = {
  backgroundColor: "#0B3069",
  flexDirection: "column",
  alignItems: "center",
  paddingBottom: 20,
  paddingHorizontal: 16,
}

const $headerTop: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  width: "100%",
}

const $backButton: ViewStyle = {
  width: 36,
  height: 36,
  justifyContent: "center",
  alignItems: "flex-start",
}

const $headerTitle: TextStyle = {
  flex: 1,
  color: "#FFFFFF",
  fontSize: 21,
  lineHeight: 28,
  fontFamily: typography.primary.semiBold,
  textAlign: "center",
}

const $headerRight: ViewStyle = {
  width: 36,
}

const $scrollView: ViewStyle = {
  backgroundColor: "#F9FAFE",
  flex: 1,
}

const $scrollContent: ViewStyle = {
  paddingBottom: 32,
}

const $section: ViewStyle = {
  marginTop: 24,
  marginHorizontal: 20,
}

const $sectionTitle: TextStyle = {
  fontSize: 13,
  fontFamily: typography.primary.semiBold,
  color: "#6B7280",
  marginBottom: 10,
  textTransform: "uppercase",
  letterSpacing: 0.5,
}

const $permissionCard: ViewStyle = {
  backgroundColor: "#FFFFFF",
  borderRadius: 12,
  borderWidth: 1,
  borderColor: "#DDDDDD",
  overflow: "hidden",
}

const $logoutButton: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
  gap: 8,
  marginHorizontal: 20,
  marginTop: 24,
  paddingVertical: 14,
  borderRadius: 10,
  borderWidth: 1.5,
  borderColor: "#DDDDDD",
  backgroundColor: "#FFFFFF",
}

const $logoutText: TextStyle = {
  fontSize: 16,
  fontFamily: typography.primary.semiBold,
  color: "#E53935",
}

// ── 로그아웃 모달 ─────────────────────────────────────────────────────────────

const $logoutModalIconCircle: ViewStyle = {
  width: 52,
  height: 52,
  borderRadius: 26,
  backgroundColor: colors.modalIconRedBg,
  alignItems: "center",
  justifyContent: "center",
}
