import { FC } from "react"
import { ScrollView, TouchableOpacity, View } from "react-native"
import {
  IconCalendarTime,
  IconChevronRight,
  IconDownload,
  IconUpload,
} from "@tabler/icons-react-native"

import EducationFrame from "@assets/icons/education_frame.svg"

import { StackScreen } from "@/components/StackScreen"
import { Text } from "@/components/Text"
import { translate } from "@/i18n/translate"
import { AppStackScreenProps } from "@/navigators/navigationTypes"
import { MOCK_EDUCATION_MATERIALS } from "@/screens/EducationSelectScreen/mockData"

import * as S from "./styles"

type EducationMaterialDetailScreenProps = AppStackScreenProps<"EducationMaterialDetail">

function parseFileName(fileName: string) {
  const match = fileName.match(/^(.+)\s+\((.+)\)$/)
  if (match) return { name: match[1], size: match[2] }
  return { name: fileName, size: "" }
}

function getFileType(name: string) {
  const ext = name.split(".").pop()
  return ext ? ext.toUpperCase() : "FILE"
}

const ACTIVE_BADGE = { bg: "#E6F0FD", text: "#1062D8" }
const ARCHIVED_BADGE = { bg: "#E5E6E9", text: "#606679" }

export const EducationMaterialDetailScreen: FC<EducationMaterialDetailScreenProps> = ({
  navigation,
  route,
}) => {
  const { id } = route.params
  const item = MOCK_EDUCATION_MATERIALS.find((m) => m.id === id)

  if (!item) return null

  const { name: pureFileName, size: fileSize } = parseFileName(item.fileName)
  const fileType = getFileType(pureFileName)
  const isMine = item.source === 2

  const sourceLabel = isMine
    ? translate("educationMaterialDetailScreen:sourceMine")
    : translate("educationMaterialDetailScreen:sourceKs")

  const statusLabel = item.isActive
    ? translate("educationMaterialDetailScreen:statusActive")
    : translate("educationMaterialDetailScreen:statusArchived")

  const statusBadge = item.isActive ? ACTIVE_BADGE : ARCHIVED_BADGE
  const showPublishButton = isMine && !item.isActive

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

          {!isMine && (
            <Text
              text={`${translate("educationMaterialDetailScreen:categoryLabel")} ${item.subcategory}`}
              style={S.$categoryLabel}
            />
          )}

          <Text text={item.title} style={S.$title} />

          {isMine && (
            <View style={S.$authorBadge}>
              <Text
                text={`${translate("educationMaterialDetailScreen:registrantLabel")} ${item.author}`}
                style={S.$authorBadgeText}
              />
            </View>
          )}

          <View style={S.$dateRow}>
            <IconCalendarTime size={18} color="#606060" />
            <Text text={`${item.startDate} · ${item.endDate}`} style={S.$dateText} />
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
            <Text text={pureFileName} style={S.$fileChipName} numberOfLines={1} />
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => console.log("download:", item.id)}
            >
              <IconDownload size={20} color="#1062D8" />
            </TouchableOpacity>
          </View>

        </View>

        {showPublishButton && (
          <TouchableOpacity
            style={S.$publishBtn}
            activeOpacity={0.8}
            onPress={() => console.log("publish:", item.id)}
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
}
