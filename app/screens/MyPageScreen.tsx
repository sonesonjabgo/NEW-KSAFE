import React, { FC, useState } from "react"
import { View, ViewStyle, TextStyle, ScrollView, TouchableOpacity, Linking, Alert } from "react-native"
import { Screen } from "@/components/Screen"
import { Text } from "@/components/Text"
import { Header } from "@/components/Header"
import { ProfileCard } from "@/components/MyPage/ProfileCard"
import { PermissionItem } from "@/components/MyPage/PermissionItem"
import { WorkplaceChip } from "@/components/MyPage/WorkplaceChip"
import { Camera, Mic, Image as ImageIcon, Bell, LogOut } from "lucide-react-native"
import type { MainTabScreenProps } from "@/navigators/navigationTypes"
import { useAuth } from "@/context/AuthContext"

interface MyPageScreenProps extends MainTabScreenProps<"MyPage"> {}

export const MyPageScreen: FC<MyPageScreenProps> = ({ navigation }) => {
  const { logout } = useAuth()
  const [role, setRole] = useState<"admin" | "worker">("worker")
  const [pushEnabled, setPushEnabled] = useState(true)

  const handleOpenSettings = () => {
    Linking.openSettings().catch(() => {
      Alert.alert("설정 이동 실패", "앱 설정으로 이동할 수 없습니다.")
    })
  }

  const handleLogout = () => {
    Alert.alert("로그아웃", "정말 로그아웃 하시겠습니까?", [
      { text: "취소", style: "cancel" },
      { text: "확인", onPress: () => logout() },
    ])
  }

  return (
    <Screen
      preset="scroll"
      safeAreaEdges={["top"]}
      contentContainerStyle={$contentContainer}
      backgroundColor="#F9FAFB"
    >
      <Header
        title="마이페이지"
        leftIcon="back"
        onLeftPress={() => navigation.goBack()}
        backgroundColor="#FFFFFF"
        containerStyle={$headerContainer}
      />

      <View style={$innerContent}>
        {/* Role Toggle for Testing */}
        <View style={$roleToggleRow}>
          <TouchableOpacity
            style={[$roleToggleBtn, role === "admin" && $roleToggleBtnActive]}
            onPress={() => setRole("admin")}
          >
            <Text
              text="관리자"
              style={[$roleToggleText, role === "admin" && $roleToggleTextActive]}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={[$roleToggleBtn, role === "worker" && $roleToggleBtnActive]}
            onPress={() => setRole("worker")}
          >
            <Text
              text="근로자"
              style={[$roleToggleText, role === "worker" && $roleToggleTextActive]}
            />
          </TouchableOpacity>
        </View>

        {/* Profile Section */}
        <ProfileCard
          company="KS산업안전원"
          name={role === "admin" ? "김관리" : "이근로"}
          email={role === "admin" ? "admin-1@example.com" : "worker-5@example.com"}
        />

        {role === "worker" && <WorkplaceChip workplaceName="광교 타워크레인 작업장" />}

        {/* Permission Settings Section */}
        <View style={$sectionContainer}>
          <Text text="앱 권한 설정" style={$sectionTitle} />
          <View style={$card}>
            <PermissionItem
              icon={Camera}
              title="카메라"
              description={
                role === "admin"
                  ? "QR 스캔, 현장 점검 기록 촬영"
                  : "QR 스캔, AI 번역 촬영, 위험 응급 기록"
              }
              controlType="button"
              onPressButton={handleOpenSettings}
            />
            <View style={$divider} />
            <PermissionItem
              icon={Mic}
              title="마이크"
              description={
                role === "admin"
                  ? "음성 보고, 회의 녹음"
                  : "음성번역, 호이 통화, 음성 실명 기능"
              }
              controlType="button"
              onPressButton={handleOpenSettings}
            />
            <View style={$divider} />
            <PermissionItem
              icon={ImageIcon}
              title="사진/라이브러리"
              description={
                role === "admin"
                  ? "점검 결과 업로드, 교육 자료 관리"
                  : "AI 위험성 평가, 이미지 번역, TBM 교육 자료 작성 등"
              }
              controlType="button"
              onPressButton={handleOpenSettings}
            />
            <View style={$divider} />
            <PermissionItem
              icon={Bell}
              title="푸시 알림"
              description={
                role === "admin"
                  ? "긴급 사고 보고, 주요 공지 알림"
                  : "TBM 알림, 위험 경보, 사업장 공지"
              }
              controlType="toggle"
              value={pushEnabled}
              onValueChange={setPushEnabled}
            />
          </View>
        </View>

        {/* Logout Button */}
        <TouchableOpacity style={$logoutButton} onPress={handleLogout} activeOpacity={0.7}>
          <LogOut size={20} color="#EF4444" style={$logoutIcon} />
          <Text text="로그아웃" style={$logoutText} />
        </TouchableOpacity>
      </View>
    </Screen>
  )
}

const $contentContainer: ViewStyle = {
  paddingBottom: 40,
}

const $headerContainer: ViewStyle = {
  borderBottomWidth: 1,
  borderBottomColor: "#F3F4F6",
}

const $innerContent: ViewStyle = {
  padding: 20,
}

const $roleToggleRow: ViewStyle = {
  flexDirection: "row",
  backgroundColor: "#F3F4F6",
  borderRadius: 8,
  padding: 4,
  marginBottom: 20,
}

const $roleToggleBtn: ViewStyle = {
  flex: 1,
  paddingVertical: 8,
  alignItems: "center",
  borderRadius: 6,
}

const $roleToggleBtnActive: ViewStyle = {
  backgroundColor: "#FFFFFF",
  elevation: 2,
  shadowColor: "#000",
  shadowOffset: { width: 0, height: 1 },
  shadowOpacity: 0.1,
  shadowRadius: 2,
}

const $roleToggleText: TextStyle = {
  fontSize: 14,
  color: "#6B7280",
  fontWeight: "500",
}

const $roleToggleTextActive: TextStyle = {
  color: "#1B2559",
  fontWeight: "bold",
}

const $sectionContainer: ViewStyle = {
  marginTop: 32,
}

const $sectionTitle: TextStyle = {
  fontSize: 16,
  fontWeight: "bold",
  color: "#374151",
  marginBottom: 12,
}

const $card: ViewStyle = {
  backgroundColor: "#FFFFFF",
  borderRadius: 16,
  paddingHorizontal: 16,
  elevation: 2,
  shadowColor: "#000",
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.05,
  shadowRadius: 8,
}

const $divider: ViewStyle = {
  height: 1,
  backgroundColor: "#F3F4F6",
}

const $logoutButton: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
  marginTop: 40,
  borderWidth: 1.5,
  borderColor: "#FCA5A5",
  borderRadius: 12,
  height: 52,
}

const $logoutIcon: ViewStyle = {
  marginRight: 8,
}

const $logoutText: TextStyle = {
  fontSize: 16,
  color: "#EF4444",
  fontWeight: "bold",
}
