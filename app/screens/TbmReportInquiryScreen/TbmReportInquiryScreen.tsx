import { FC, useCallback, useMemo, useState } from "react"
import { FlatList, TouchableOpacity, View } from "react-native"
import { useFocusEffect } from "@react-navigation/native"
import { format, parseISO } from "date-fns"
import { observer } from "mobx-react-lite"

import TbmEmptyImage from "@assets/images/tbm-empty.svg"

import { StackScreen } from "@/components/StackScreen"
import { Text } from "@/components/Text"
import { translate } from "@/i18n/translate"
import { useStores } from "@/models"

import * as S from "./styles"
import type { TbmReportInquiryScreenProps, TbmReportItem, TbmReportStatus } from "./types"

type TabKey = "all" | TbmReportStatus

const API_STATUS_MAP: Record<"pending" | "processing" | "completed" | "failed", TbmReportStatus> = {
  pending: "requested",
  processing: "generating",
  completed: "completed",
  failed: "failed",
}

function formatDate(isoString?: string | null): string {
  if (!isoString) return ""
  try {
    return format(parseISO(isoString), "yyyy.MM.dd")
  } catch {
    return isoString
  }
}

const TbmReportCard: FC<{ item: TbmReportItem; onPress: () => void }> = ({ item, onPress }) => {
  const badgeStyle = {
    requested: S.$badgeRequested,
    generating: S.$badgeGenerating,
    completed: S.$badgeCompleted,
    failed: S.$badgeFailed,
  }[item.status]

  const badgeTextStyle = {
    requested: S.$badgeRequestedText,
    generating: S.$badgeGeneratingText,
    completed: S.$badgeCompletedText,
    failed: S.$badgeFailedText,
  }[item.status]

  return (
    <TouchableOpacity style={S.$card} activeOpacity={0.75} onPress={onPress}>
      {/* 상태 배지 + 날짜 */}
      <View style={S.$cardTopRow}>
        <View style={badgeStyle}>
          <Text
            text={translate(`tbmReportInquiryScreen:tabs.${item.status}`)}
            style={badgeTextStyle}
          />
        </View>
        <Text text={item.date} style={S.$cardDate} />
      </View>

      {/* 제목 + 참여자 */}
      <Text text={item.title} style={S.$cardTitle} />
      <Text
        text={translate("tbmListScreen:participants", { count: item.participants })}
        style={S.$cardParticipants}
      />

      {/* 구분선 */}
      <View style={S.$cardDivider} />

      {/* 작성자 + 현장 */}
      <View style={S.$cardMetaRow}>
        <View style={S.$cardAvatar} />
        <Text text={item.author} style={S.$cardMetaAuthor} numberOfLines={1} />
        <Text text={` · ${item.location}`} style={S.$cardMetaLocation} numberOfLines={1} />
      </View>
    </TouchableOpacity>
  )
}

const EmptyState: FC<{ tab: TabKey }> = ({ tab }) => {
  return (
    <View style={S.$emptyContainer}>
      <View style={S.$emptyImage}>
        <TbmEmptyImage width={150} height={162} />
      </View>
      <Text text={translate(`tbmReportInquiryScreen:empty.${tab}`)} style={S.$emptyText} />
    </View>
  )
}

export const TbmReportInquiryScreen: FC<TbmReportInquiryScreenProps> = observer(
  function TbmReportInquiryScreen({ navigation }) {
    const [activeTab, setActiveTab] = useState<TabKey>("all")
    const { tbmAdminStore } = useStores()

    useFocusEffect(
      useCallback(() => {
        tbmAdminStore.fetchMyReportJobs()
      }, [tbmAdminStore]),
    )

    const TABS: { key: TabKey; label: string }[] = useMemo(
      () => [
        { key: "all", label: translate("tbmReportInquiryScreen:tabs.all") },
        { key: "requested", label: translate("tbmReportInquiryScreen:tabs.requested") },
        { key: "generating", label: translate("tbmReportInquiryScreen:tabs.generating") },
        { key: "completed", label: translate("tbmReportInquiryScreen:tabs.completed") },
        { key: "failed", label: translate("tbmReportInquiryScreen:tabs.failed") },
      ],
      [],
    )

    const reportItems = useMemo<TbmReportItem[]>(
      () =>
        tbmAdminStore.reportJobs
          .filter((job) => {
            if (activeTab === "all") return true
            const uiStatus = API_STATUS_MAP[job.status as keyof typeof API_STATUS_MAP]
            return uiStatus === activeTab
          })
          .map((job) => ({
            id: job.id,
            title: job.activityTitle ?? translate("tbmReportInquiryScreen:untitled"),
            status: API_STATUS_MAP[job.status as keyof typeof API_STATUS_MAP] ?? "requested",
            date: formatDate(job.createdAt),
            participants: job.participantCount ?? 0,
            author: job.requestedBy ?? "",
            location: job.workplaceName ?? "",
            processName: job.processName ?? undefined,
            teamName: job.teamName ?? undefined,
            requestedAt: job.createdAt ? formatDate(job.createdAt) : undefined,
            startedAt: job.startedAt ? formatDate(job.startedAt) : undefined,
            completedAt: job.completedAt ? formatDate(job.completedAt) : undefined,
          })),
      [tbmAdminStore.reportJobs, activeTab],
    )

    return (
      <StackScreen
        title={translate("tbmReportInquiryScreen:title")}
        onBack={() => navigation.goBack()}
        squareTop
        contentBg="#FFFFFF"
      >
        {/* 탭 바 */}
        <View style={S.$tabBar}>
          {TABS.map((tab) => (
            <TouchableOpacity
              key={tab.key}
              style={[S.$tab, activeTab === tab.key && S.$activeTab]}
              activeOpacity={0.7}
              onPress={() => setActiveTab(tab.key)}
            >
              <Text
                text={tab.label}
                style={[S.$tabText, activeTab === tab.key && S.$activeTabText]}
              />
            </TouchableOpacity>
          ))}
        </View>

        {/* 카드 리스트 */}
        <FlatList<TbmReportItem>
          style={S.$listContent}
          data={reportItems}
          keyExtractor={(item) => String(item.id)}
          contentContainerStyle={[S.$flatListContent, reportItems.length === 0 && { flex: 1 }]}
          renderItem={({ item }) => (
            <TbmReportCard
              item={item}
              onPress={() => navigation.navigate("TbmReportStatus", { id: item.id })}
            />
          )}
          ListEmptyComponent={<EmptyState tab={activeTab} />}
          showsVerticalScrollIndicator={false}
        />
      </StackScreen>
    )
  },
)
