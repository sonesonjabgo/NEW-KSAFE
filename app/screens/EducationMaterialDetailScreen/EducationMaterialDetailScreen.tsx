import { FC, useCallback } from "react"
import { ActivityIndicator, Linking, ScrollView, TouchableOpacity, View } from "react-native"
import { useFocusEffect } from "@react-navigation/native"
import {
  IconCalendarTime,
  IconChevronRight,
  IconDownload,
  IconUpload,
} from "@tabler/icons-react-native"
import { observer } from "mobx-react-lite"

import EducationFrame from "@assets/icons/education_frame.svg"

import { StackScreen } from "@/components/StackScreen"
import { Text } from "@/components/Text"
import { translate } from "@/i18n/translate"
import { useStores } from "@/models"
import { AppStackScreenProps } from "@/navigators/navigationTypes"

import * as S from "./styles"

type EducationMaterialDetailScreenProps = AppStackScreenProps<"EducationMaterialDetail">

function formatDate(dateStr: string): string {
  const d = new Date(dateStr)
  if (isNaN(d.getTime())) return dateStr
  const yyyy = d.getFullYear()
  const mm = String(d.getMonth() + 1).padStart(2, "0")
  const dd = String(d.getDate()).padStart(2, "0")
  return `${yyyy}.${mm}.${dd}`
}

function formatFileSize(bytes: number): string {
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

function getFileType(name: string): string {
  const ext = name.split(".").pop()
  return ext ? ext.toUpperCase() : "FILE"
}

const ACTIVE_BADGE = { bg: "#E6F0FD", text: "#1062D8" }
const ARCHIVED_BADGE = { bg: "#E5E6E9", text: "#606679" }

export const EducationMaterialDetailScreen: FC<EducationMaterialDetailScreenProps> = observer(
  function EducationMaterialDetailScreen({ navigation, route }) {
    const { id, source } = route.params
    const { educationStore } = useStores()

    useFocusEffect(
      useCallback(() => {
        void educationStore.fetchDetail(id)
        return () => educationStore.clearDetail()
      }, [id, educationStore]),
    )

    const item = educationStore.currentDetail
    const isLoading = educationStore.status === "pending" || !item

    if (isLoading) {
      return (
        <StackScreen
          title={translate("educationMaterialDetailScreen:title")}
          onBack={() => navigation.goBack()}
          squareTop
          contentBg="#FFFFFF"
        >
          <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <ActivityIndicator size="large" color="#1062D8" />
          </View>
        </StackScreen>
      )
    }

    const isMine = source === "mine"
    const fileType = getFileType(item.fileName)
    const fileSize = formatFileSize(item.fileSize)

    const sourceLabel = isMine
      ? translate("educationMaterialDetailScreen:sourceMine")
      : translate("educationMaterialDetailScreen:sourceKs")

    const statusLabel =
      item.status === "active"
        ? translate("educationMaterialDetailScreen:statusActive")
        : translate("educationMaterialDetailScreen:statusArchived")

    const statusBadge = item.status === "active" ? ACTIVE_BADGE : ARCHIVED_BADGE
    const showPublishButton = isMine && item.status === "archived"

    const handlePublish = useCallback(async () => {
      try {
        await educationStore.restoreItem(id)
      } catch {
        // error handled in store
      }
    }, [id, educationStore])

    return (
      <StackScreen
        title={translate("educationMaterialDetailScreen:title")}
        onBack={() => navigation.goBack()}
        squareTop
        contentBg="#FFFFFF"
      >
        <ScrollView style={S.$scroll} contentContainerStyle={S.$scrollContent}>
          {/* Card 1 — 기본 정보 */}
          <View style={S.$card}>
            <View style={S.$badgesRow}>
              <View style={[S.$badge, { backgroundColor: ACTIVE_BADGE.bg }]}>
                <Text text={sourceLabel} style={[S.$badgeText, { color: ACTIVE_BADGE.text }]} />
              </View>
              <View style={[S.$badge, { backgroundColor: statusBadge.bg }]}>
                <Text text={statusLabel} style={[S.$badgeText, { color: statusBadge.text }]} />
              </View>
            </View>

            {!isMine && item.categoryName && (
              <Text
                text={`${translate("educationMaterialDetailScreen:categoryLabel")} ${item.categoryName}`}
                style={S.$categoryLabel}
              />
            )}

            <Text text={item.title} style={S.$title} />

            {isMine && item.createdByName && (
              <View style={S.$authorBadge}>
                <Text
                  text={`${translate("educationMaterialDetailScreen:registrantLabel")} ${item.createdByName}`}
                  style={S.$authorBadgeText}
                />
              </View>
            )}

            <View style={S.$dateRow}>
              <IconCalendarTime size={18} color="#606060" />
              <Text text={formatDate(item.createdAt)} style={S.$dateText} />
            </View>
          </View>

          {/* Card 2 — 첨부파일 */}
          <View style={S.$card}>
            <View style={S.$attachmentHeaderRow}>
              <Text
                text={translate("educationMaterialDetailScreen:attachmentLabel")}
                style={S.$attachmentHeaderText}
              />
              <IconChevronRight size={18} color="#000000" />
            </View>

            <Text text={`${fileType} · ${fileSize}`} style={S.$fileMetaText} />

            <View style={S.$fileChip}>
              <EducationFrame width={22} height={22} color="#1062D8" />
              <Text text={item.fileName} style={S.$fileChipName} numberOfLines={1} />
              <TouchableOpacity
                activeOpacity={0.7}
                disabled={!item.fileUrl}
                onPress={() => {
                  if (item.fileUrl) void Linking.openURL(item.fileUrl)
                }}
              >
                <IconDownload size={20} color={item.fileUrl ? "#1062D8" : "#CCCCCC"} />
              </TouchableOpacity>
            </View>
          </View>

          {showPublishButton && (
            <TouchableOpacity
              style={S.$publishBtn}
              activeOpacity={0.8}
              onPress={handlePublish}
            >
              <IconUpload size={20} color="#FFFFFF" />
              <Text
                text={translate("educationMaterialDetailScreen:publishButton")}
                style={S.$publishBtnText}
              />
            </TouchableOpacity>
          )}
        </ScrollView>
      </StackScreen>
    )
  },
)
