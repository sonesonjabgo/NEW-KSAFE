import { FC, useState } from "react"
import { Image, ScrollView, TextInput, TouchableOpacity, View } from "react-native"
import { Check, Ellipsis, X } from "lucide-react-native"

import { StackScreen } from "@/components/StackScreen"
import { Text } from "@/components/Text"
import { useRole } from "@/context/RoleContext"
import { translate } from "@/i18n/translate"
import { colors } from "@/theme/colors"

import { mockHazardDetails } from "./mockData"
import * as S from "./styles"
import type { HazardRiskDetailScreenProps } from "@/screens/HazardRiskScreen/types"
import type { HazardStatus } from "@/screens/HazardRiskScreen/types"

const STATUS_BADGE_STYLE: Record<HazardStatus, { bg: string; text: string }> = {
  pending: { bg: "#E5E6E9", text: "#606679" },
  ongoing: { bg: "#CFFFE1", text: "#18A24A" },
  completed: { bg: "#EEF3FC", text: "#214ACC" },
  impossible: { bg: "#FFE8E8", text: "#D84040" },
}

const ACTION_STATUSES: HazardStatus[] = ["ongoing", "completed", "impossible"]

const ACTION_BUTTON_ICON: Record<string, FC<{ size: number; color: string }>> = {
  ongoing: Ellipsis,
  completed: Check,
  impossible: X,
}

const ACTION_BUTTON_COLOR: Record<HazardStatus, { bg: string; border: string; text: string }> = {
  pending: { bg: "#E5E6E9", border: "#C5C7CF", text: "#606679" },
  ongoing: { bg: "#CFFFE1", border: "#18A24A", text: "#18A24A" },
  completed: { bg: "#EFF4FD", border: "#1062D8", text: "#1062D8" },
  impossible: { bg: "#FDF7F7", border: "#E03526", text: "#E03526" },
}

const PLACEHOLDER_I18N_KEY: Record<HazardStatus, string> = {
  pending: "hazardRiskDetailScreen:adminSection.placeholder.pending",
  ongoing: "hazardRiskDetailScreen:adminSection.placeholder.ongoing",
  completed: "hazardRiskDetailScreen:adminSection.placeholder.completed",
  impossible: "hazardRiskDetailScreen:adminSection.placeholder.impossible",
}

const StatusBadge: FC<{ status: HazardStatus }> = ({ status }) => {
  const style = STATUS_BADGE_STYLE[status]
  return (
    <View style={[S.$badge, { backgroundColor: style.bg }]}>
      <Text
        text={translate(`hazardRiskScreen:status.${status}` as any)}
        style={[S.$badgeText, { color: style.text }]}
      />
    </View>
  )
}

export const HazardRiskDetailScreen: FC<HazardRiskDetailScreenProps> = ({ navigation, route }) => {
  const { id } = route.params
  const detail = mockHazardDetails[id] ?? mockHazardDetails[1]
  const { role } = useRole()
  const [selectedStatus, setSelectedStatus] = useState<HazardStatus>(detail.status)
  const [actionNote, setActionNote] = useState("")

  const isInputEnabled = selectedStatus === "completed" || selectedStatus === "impossible"

  return (
    <StackScreen
      title={translate("hazardRiskDetailScreen:title")}
      onBack={() => navigation.goBack()}
      contentBg={colors.screenBg}
      squareTop
    >
      <ScrollView
        contentContainerStyle={S.$scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* 제보 정보 카드 */}
        <View style={S.$infoCard}>
          {/* 뱃지 + 날짜 */}
          <View style={S.$cardTopRow}>
            <StatusBadge status={detail.status} />
            <Text text={detail.date} style={S.$cardDate} />
          </View>

          {/* 위치 */}
          <View style={S.$infoRow}>
            <Text
              text={translate("hazardRiskDetailScreen:infoCard.locationLabel")}
              style={S.$inlineLabel}
            />
            <Text text={detail.location} style={S.$inlineValue} />
          </View>

          {/* 위험요인 */}
          <View style={S.$infoRow}>
            <Text
              text={translate("hazardRiskDetailScreen:infoCard.hazardFactorLabel")}
              style={S.$inlineLabel}
            />
            <Text text={detail.description} style={S.$inlineValue} />
          </View>

          {/* 제보사진 */}
          <View style={S.$photosSection}>
            <Text
              text={translate("hazardRiskDetailScreen:infoCard.sitePhotosLabel")}
              style={S.$photosSectionLabel}
            />
            {detail.photos.length > 0 ? (
              <View style={S.$photoGrid}>
                {detail.photos.map((uri, index) => (
                  <Image key={index} source={{ uri }} style={S.$photoItem} />
                ))}
              </View>
            ) : (
              <Text
                text={translate("hazardRiskDetailScreen:infoCard.noPhotos")}
                style={S.$noPhotosText}
              />
            )}
          </View>

          {/* 관리자 프로필 */}
          <View style={S.$managerRow}>
            <View style={S.$managerAvatar}>
              <Text text={detail.managerInitial} style={S.$managerAvatarText} />
            </View>
            <View style={S.$managerInfo}>
              <Text text={detail.managerName} style={S.$managerName} />
              <Text text={detail.managerAffiliation} style={S.$managerAffiliation} />
            </View>
          </View>
        </View>

        {/* 관리자 전용: 상태 변경 및 처리 */}
        {role === "admin" && (
          <View style={S.$adminSection}>
            {/* 섹션 제목 + 구분선 */}
            <View style={S.$sectionTitleRow}>
              <Text
                text={translate("hazardRiskDetailScreen:adminSection.title")}
                style={S.$sectionTitle}
              />
              <View style={S.$sectionDivider} />
            </View>

            {/* 카드 */}
            <View style={S.$adminCard}>
              {/* 상태 변경 버튼 3개 */}
              <View style={S.$statusButtonRow}>
                {ACTION_STATUSES.map((status) => {
                  const isSelected = selectedStatus === status
                  const btnColor = ACTION_BUTTON_COLOR[status]
                  return (
                    <TouchableOpacity
                      key={status}
                      style={[
                        S.$statusButton,
                        isSelected && {
                          backgroundColor: btnColor.bg,
                          borderColor: btnColor.border,
                        },
                      ]}
                      onPress={() => setSelectedStatus(status)}
                      activeOpacity={0.7}
                    >
                      {(() => {
                        const IconComponent = ACTION_BUTTON_ICON[status]
                        const iconColor = isSelected ? btnColor.text : "#AAAAAA"
                        return <IconComponent size={24} color={iconColor} />
                      })()}
                      <Text
                        text={translate(`hazardRiskScreen:status.${status}` as any)}
                        style={[
                          S.$statusButtonText,
                          isSelected && { color: btnColor.text },
                        ]}
                      />
                      {isSelected && (
                        <View
                          style={[S.$selectedBadge, { backgroundColor: btnColor.border }]}
                        >
                          <Check size={12} color="#FFFFFF" strokeWidth={3} />
                        </View>
                      )}
                    </TouchableOpacity>
                  )
                })}
              </View>

              {/* 조치 내용 입력 + 점선 입력 카드 */}
              <View style={{ gap: 11 }}>
                <Text
                  text={translate("hazardRiskDetailScreen:adminSection.noteLabel")}
                  style={S.$noteLabel}
                />
                <View style={S.$dashedInputCard}>
                  <TextInput
                    style={S.$dashedInput}
                    placeholder={translate(PLACEHOLDER_I18N_KEY[selectedStatus] as any)}
                    placeholderTextColor="#BBBBBB"
                    multiline
                    editable={isInputEnabled}
                    value={actionNote}
                    onChangeText={setActionNote}
                  />
                </View>
                <Text
                  text={translate("hazardRiskDetailScreen:adminSection.noteHint")}
                  style={S.$noteHint}
                />
              </View>
            </View>
          </View>
        )}
      </ScrollView>
    </StackScreen>
  )
}
