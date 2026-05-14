import { FC, useState } from "react"
import { Linking, ScrollView, TouchableOpacity, View, ViewStyle, TextStyle } from "react-native"
import {
  IconBell,
  IconCamera,
  IconChevronLeft,
  IconLogout,
  IconMicrophone,
  IconPhoto,
} from "@tabler/icons-react-native"

import { PermissionItem } from "@/components/MyPage/PermissionItem"
import { ProfileCard } from "@/components/MyPage/ProfileCard"
import { WorkplaceChip } from "@/components/MyPage/WorkplaceChip"
import { Text } from "@/components/Text"
import { useAuth } from "@/context/AuthContext"
import { translate } from "@/i18n/translate"
import type { MainTabScreenProps } from "@/navigators/navigationTypes"
import { typography } from "@/theme/typography"

type Role = "admin" | "worker"

const ICON_COLOR = "#4A6CF7"

export const MyPageScreen: FC<MainTabScreenProps<"MyPage">> = ({ navigation }) => {
  const { authEmail, logout } = useAuth()
  const [userRole] = useState<Role>("worker")
  const [notificationEnabled, setNotificationEnabled] = useState(true)

  const isWorker = userRole === "worker"

  const handleOpenSettings = () => {
    Linking.openSettings()
  }

  return (
    <View style={$root}>
      <View style={$header}>
        <TouchableOpacity style={$backButton} onPress={() => navigation.goBack()}>
          <IconChevronLeft size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text text={translate("myPageScreen:title")} style={$headerTitle} />
        <View style={$headerRight} />
      </View>

      <ScrollView
        style={$scrollView}
        contentContainerStyle={$scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <ProfileCard
          orgName="KS산업안전원"
          userName="김관리"
          email={authEmail ?? "worker-5@example.com"}
        />

        {isWorker && <WorkplaceChip name={translate("myPageScreen:workplace.label")} />}

        <View style={$section}>
          <Text text={translate("myPageScreen:permissions.sectionTitle")} style={$sectionTitle} />
          <View style={$permissionCard}>
            <PermissionItem
              icon={<IconCamera size={22} color={ICON_COLOR} />}
              title={translate("myPageScreen:permissions.camera.title")}
              description={translate("myPageScreen:permissions.camera.description")}
              type="button"
              buttonLabel={translate("myPageScreen:permissions.camera.button")}
              onButtonPress={handleOpenSettings}
              showDivider
            />
            <PermissionItem
              icon={<IconMicrophone size={22} color={ICON_COLOR} />}
              title={translate("myPageScreen:permissions.microphone.title")}
              description={translate("myPageScreen:permissions.microphone.description")}
              type="button"
              buttonLabel={translate("myPageScreen:permissions.microphone.button")}
              onButtonPress={handleOpenSettings}
              showDivider
            />
            <PermissionItem
              icon={<IconPhoto size={22} color={ICON_COLOR} />}
              title={translate("myPageScreen:permissions.photo.title")}
              description={translate("myPageScreen:permissions.photo.description")}
              type="button"
              buttonLabel={translate("myPageScreen:permissions.photo.button")}
              onButtonPress={handleOpenSettings}
              showDivider
            />
            <PermissionItem
              icon={<IconBell size={22} color={ICON_COLOR} />}
              title={translate("myPageScreen:permissions.notification.title")}
              description={translate("myPageScreen:permissions.notification.description")}
              type="switch"
              switchValue={notificationEnabled}
              onSwitchChange={setNotificationEnabled}
            />
          </View>
        </View>

        <TouchableOpacity style={$logoutButton} onPress={logout} activeOpacity={0.7}>
          <IconLogout size={20} color="#E53935" />
          <Text text={translate("myPageScreen:logout")} style={$logoutText} />
        </TouchableOpacity>
      </ScrollView>
    </View>
  )
}

const $root: ViewStyle = {
  flex: 1,
  backgroundColor: "#F5F5F5",
}

const $header: ViewStyle = {
  backgroundColor: "#0B3069",
  flexDirection: "row",
  alignItems: "center",
  paddingTop: 20,
  paddingBottom: 20,
  paddingHorizontal: 16,
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
  fontFamily: typography.primary.semiBold,
  textAlign: "center",
}

const $headerRight: ViewStyle = {
  width: 36,
}

const $scrollView: ViewStyle = {
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
  borderColor: "#E9ECF0",
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
  borderColor: "#E53935",
  backgroundColor: "#FFFFFF",
}

const $logoutText: TextStyle = {
  fontSize: 16,
  fontFamily: typography.primary.semiBold,
  color: "#E53935",
}
