import { FC } from "react"
import { ScrollView, TouchableOpacity, View } from "react-native"
import {
  IconCalendar,
  IconEdit,
  IconDownload,
  IconPlayerPlayFilled,
  IconTrash,
} from "@tabler/icons-react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"

import EducationFrame from "@assets/icons/education_frame.svg"

import { StackScreen } from "@/components/StackScreen"
import { Text } from "@/components/Text"
import { translate } from "@/i18n/translate"
import type { TbmStatus } from "@/screens/TbmListScreen/types"

import { mockTbmDetails } from "./mockData"
import * as S from "./styles"
import type { TbmDetailScreenProps } from "./types"

function getBadgeStyles(status: TbmStatus) {
  if (status === "작성중") return { badge: S.$badgeDrafting, text: S.$badgeDraftingText }
  if (status === "진행중") return { badge: S.$badgeOngoing, text: S.$badgeOngoingText }
  return { badge: S.$badgeEnded, text: S.$badgeEndedText }
}

const STATUS_LABEL: Record<TbmStatus, "drafting" | "ongoing" | "ended"> = {
  작성중: "drafting",
  진행중: "ongoing",
  종료됨: "ended",
}

export const TbmDetailScreen: FC<TbmDetailScreenProps> = ({ navigation, route }) => {
  const { id } = route.params
  const insets = useSafeAreaInsets()

  const detail = mockTbmDetails[id]
  const badgeStyles = detail ? getBadgeStyles(detail.status) : null

  if (!detail) return null

  return (
    <StackScreen
      title={translate("tbmDetailScreen:title")}
      onBack={() => navigation.goBack()}
      squareTop
      contentBg="#FFFFFF"
    >
      <ScrollView
        contentContainerStyle={[S.$scrollInner, { paddingBottom: (insets.bottom || 0) + 24 }]}
        showsVerticalScrollIndicator={false}
      >
        {/* ── 상세 카드 ── */}
        <View style={S.$detailCard}>
          {/* 배지 + 날짜 */}
          <View style={S.$cardTopRow}>
            <View style={badgeStyles!.badge}>
              <Text
                text={translate(`tbmListScreen:status.${STATUS_LABEL[detail.status]}`)}
                style={badgeStyles!.text}
              />
            </View>
            <Text text={detail.date} style={S.$cardDate} />
          </View>

          {/* 제목 */}
          <Text text={detail.title} style={S.$cardTitle} />

          {/* 작업일 */}
          <View style={S.$cardWorkDateRow}>
            <IconCalendar size={20} color="#6B7281" />
            <Text
              text={translate("tbmDetailScreen:workDate", { date: detail.workDate })}
              style={S.$cardWorkDate}
            />
          </View>

          {/* 작성자 + 현장 */}
          <View style={S.$cardAuthorRow}>
            <View style={S.$cardAvatar} />
            <View>
              <Text text={detail.author} style={S.$cardAuthorName} />
              <Text text={detail.location} style={S.$cardAuthorLocation} />
            </View>
          </View>

          {/* 구분선 */}
          <View style={S.$cardDivider} />

          {/* 활동 내용 */}
          <Text text={translate("tbmDetailScreen:activityLabel")} style={S.$activityLabel} />
          <Text text={detail.activityContent} style={S.$activityContent} />
        </View>

        {/* ── 교육자료 섹션 ── */}
        <Text
          text={translate("tbmDetailScreen:educationHeader", {
            count: detail.educationMaterials.length,
          })}
          style={S.$educationSectionHeader}
        />
        {detail.educationMaterials.map((item) => (
          <View key={item.id} style={S.$educationCard}>
            <View style={S.$educationIconCircle}>
              <EducationFrame width={18} height={18} />
            </View>
            <Text text={item.title} style={S.$educationCardTitle} numberOfLines={2} />
            <TouchableOpacity activeOpacity={0.7} onPress={() => console.log("download:", item.id)}>
              <IconDownload size={20} color="#1062D8" />
            </TouchableOpacity>
          </View>
        ))}

        {/* ── 하단 액션 바 (스크롤과 함께 이동) ── */}
        <View style={S.$bottomBar}>
          <TouchableOpacity
            style={S.$startBtn}
            activeOpacity={0.8}
            onPress={() => console.log("활동시작:", detail.id)}
          >
            <IconPlayerPlayFilled size={24} color="#FFFFFF" />
            <Text text={translate("tbmDetailScreen:startActivity")} style={S.$startBtnText} />
          </TouchableOpacity>

          <View style={S.$actionRow}>
            <TouchableOpacity
              style={S.$editBtn}
              activeOpacity={0.75}
              onPress={() => console.log("수정:", detail.id)}
            >
              <IconEdit size={16} color="#4C4C4C" />
              <Text text={translate("tbmDetailScreen:edit")} style={S.$editBtnText} />
            </TouchableOpacity>
            <TouchableOpacity
              style={S.$deleteBtn}
              activeOpacity={0.75}
              onPress={() => console.log("삭제:", detail.id)}
            >
              <IconTrash size={16} color="#F87165" />
              <Text text={translate("tbmDetailScreen:delete")} style={S.$deleteBtnText} />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </StackScreen>
  )
}
