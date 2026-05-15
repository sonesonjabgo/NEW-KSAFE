import { useState } from "react"
import { TextStyle, View, ViewStyle } from "react-native"
import { Bell, Camera, Image, Mic } from "lucide-react-native"

import { Button } from "@/components/Button"
import { Header } from "@/components/Header"
import { Screen } from "@/components/Screen"
import { Text } from "@/components/Text"
import { translate } from "@/i18n/translate"
import type { AppStackScreenProps } from "@/navigators/navigationTypes"
import { useAppTheme } from "@/theme/context"
import type { ThemedStyle } from "@/theme/types"

import { PermissionItem } from "./PermissionItem"
import { ProfileCard } from "./ProfileCard"
import { WorkplaceChip } from "./WorkplaceChip"

interface MyPageScreenProps extends AppStackScreenProps<"MyPage"> {}

export function MyPageScreen({ navigation }: MyPageScreenProps) {
  const { themed } = useAppTheme()

  const [userRole] = useState<"admin" | "worker">("worker")
  const [pushNotificationEnabled, setPushNotificationEnabled] = useState(false)

  const handleBackPress = () => {
    navigation.goBack()
  }

  const handleAllowPermission = (permissionType: string) => {
    // TODO: Implement actual permission request logic
    console.log(`Allow ${permissionType}`)
  }

  const handleLogOut = () => {
    // TODO: Implement logout logic
    console.log("Log out pressed")
  }

  return (
    <Screen
      preset="scroll"
      safeAreaEdges={["top", "bottom"]}
      contentContainerStyle={themed($screenContent)}
    >
      <Header title={translate("myPageScreen:title")} leftText="<" onLeftPress={handleBackPress} />

      <ProfileCard company="KS산업안전원" name="김관리" email="worker-5@example.com" />

      {userRole === "worker" && (
        <WorkplaceChip
          workplaceName={translate("myPageScreen:workplace.label")}
          onPress={() => console.log("Workplace pressed")}
        />
      )}

      <View style={themed($sectionContainer)}>
        <Text
          tx="myPageScreen:permissions.sectionTitle"
          size="md"
          weight="semiBold"
          style={themed($sectionTitle)}
        />

        <View style={themed($permissionListContainer)}>
          <PermissionItem
            icon={Camera}
            title={translate("myPageScreen:permissions.camera.title")}
            description={translate("myPageScreen:permissions.camera.description")}
            rightType="button"
            buttonText={translate("myPageScreen:permissions.camera.button")}
            onButtonPress={() => handleAllowPermission("camera")}
            bottomSeparator
          />

          <PermissionItem
            icon={Mic}
            title={translate("myPageScreen:permissions.microphone.title")}
            description={translate("myPageScreen:permissions.microphone.description")}
            rightType="button"
            buttonText={translate("myPageScreen:permissions.microphone.button")}
            onButtonPress={() => handleAllowPermission("microphone")}
            bottomSeparator
          />

          <PermissionItem
            icon={Image}
            title={translate("myPageScreen:permissions.photo.title")}
            description={translate("myPageScreen:permissions.photo.description")}
            rightType="button"
            buttonText={translate("myPageScreen:permissions.photo.button")}
            onButtonPress={() => handleAllowPermission("photoLibrary")}
            bottomSeparator
          />

          <PermissionItem
            icon={Bell}
            title={translate("myPageScreen:permissions.notification.title")}
            description={translate("myPageScreen:permissions.notification.description")}
            rightType="toggle"
            toggleValue={pushNotificationEnabled}
            onToggleChange={setPushNotificationEnabled}
          />
        </View>
      </View>

      <View style={themed($logoutButtonContainer)}>
        <Button
          preset="default"
          text={translate("myPageScreen:logout")}
          style={themed($logoutButton)}
          textStyle={themed($logoutButtonText)}
          onPress={handleLogOut}
        />
      </View>
    </Screen>
  )
}

const $screenContent: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  paddingBottom: spacing.lg,
})

const $sectionContainer: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  marginTop: spacing.lg,
  marginHorizontal: spacing.md,
})

const $sectionTitle: ThemedStyle<TextStyle> = ({ colors, spacing }) => ({
  color: colors.text,
  marginBottom: spacing.md,
})

const $permissionListContainer: ThemedStyle<ViewStyle> = ({ colors }) => ({
  backgroundColor: colors.palette.neutral100,
  borderRadius: 12,
  overflow: "hidden",
})

const $logoutButtonContainer: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  marginHorizontal: spacing.md,
  marginTop: spacing.lg,
})

const $logoutButton: ThemedStyle<ViewStyle> = ({ colors }) => ({
  borderWidth: 1,
  borderColor: colors.error,
  backgroundColor: colors.transparent,
  minHeight: 48,
  borderRadius: 8,
})

const $logoutButtonText: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.error,
})
