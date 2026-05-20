import { FC, useCallback, useEffect, useMemo, useState } from "react"
import { FlatList, ScrollView, TouchableOpacity, View } from "react-native"
import { IconCheck } from "@tabler/icons-react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"

import TbmFabIcon from "@assets/images/tbm-fab-icon.svg"

import { StackScreen } from "@/components/StackScreen"
import { Text } from "@/components/Text"
import { Toast } from "@/components/Toast"
import { translate } from "@/i18n/translate"

import { mockProposalData } from "./mockData"
import * as S from "./styles"
import type { ImprovementProposalListScreenProps, ProposalItem, ProposalStatus } from "./types"

type TabKey = "all" | ProposalStatus

const STATUS_KEY_MAP: Record<ProposalStatus, "pending" | "ongoing" | "reflected" | "rejected"> = {
  pending: "pending",
  ongoing: "ongoing",
  reflected: "reflected",
  rejected: "rejected",
}

// ── Status Badge ─────────────────────────────────────────────────────────────

const StatusBadge: FC<{ status: ProposalStatus }> = ({ status }) => (
  <View style={[S.$badge, S.$statusBadgeStyle[status]]}>
    <Text
      text={translate(`improvementProposalListScreen:status.${STATUS_KEY_MAP[status]}` as any)}
      style={[S.$badgeText, S.$statusBadgeTextStyle[status]]}
    />
  </View>
)

// ── Proposal Card ─────────────────────────────────────────────────────────────

const ProposalCard: FC<{ item: ProposalItem; onPress: () => void }> = ({ item, onPress }) => (
  <TouchableOpacity style={S.$card} activeOpacity={0.75} onPress={onPress}>
    <View style={S.$cardTopRow}>
      <StatusBadge status={item.status} />
      <Text text={item.date} style={S.$cardDate} />
    </View>
    <Text text={item.title} style={S.$cardTitle} numberOfLines={2} />
    <Text text={item.title} style={S.$cardContent} numberOfLines={1} />
    <View style={S.$cardDivider} />
    <View style={S.$cardAuthorRow}>
      <View style={S.$cardAvatar}>
        <Text text={item.authorInitial} style={S.$cardAvatarText} />
      </View>
      <Text text={item.authorName} style={S.$cardAuthorName} />
    </View>
  </TouchableOpacity>
)

// ── Summary Section ───────────────────────────────────────────────────────────

interface SummarySectionProps {
  myCount: number
  reflectedCount: number
}

const SummarySection: FC<SummarySectionProps> = ({ myCount, reflectedCount }) => (
  <View style={S.$summarySection}>
    <View style={S.$summaryCard}>
      <Text
        text={translate("improvementProposalListScreen:summary.myProposals")}
        style={S.$summaryLabel}
      />
      <View style={S.$summaryCountRow}>
        <Text text={String(myCount)} style={S.$summaryCountNavy} />
        <Text
          text={translate("improvementProposalListScreen:summary.unit")}
          style={S.$summaryUnitNavy}
        />
      </View>
    </View>

    <View style={S.$summaryCard}>
      <Text
        text={translate("improvementProposalListScreen:summary.reflected")}
        style={S.$summaryLabel}
      />
      <View style={S.$summaryCountRow}>
        <Text text={String(reflectedCount)} style={S.$summaryCountBlue} />
        <Text
          text={translate("improvementProposalListScreen:summary.unit")}
          style={S.$summaryUnitBlue}
        />
      </View>
    </View>
  </View>
)

// ── Empty State ───────────────────────────────────────────────────────────────

const EMPTY_KEY_MAP: Record<TabKey, string> = {
  all: "all",
  pending: "pending",
  ongoing: "ongoing",
  reflected: "reflected",
  rejected: "rejected",
}

const EmptyState: FC<{ tab: TabKey }> = ({ tab }) => (
  <View style={S.$emptyContainer}>
    <Text
      text={translate(`improvementProposalListScreen:empty.${EMPTY_KEY_MAP[tab]}` as any)}
      style={S.$emptyText}
    />
  </View>
)

// ── Screen ────────────────────────────────────────────────────────────────────

export const ImprovementProposalListScreen: FC<ImprovementProposalListScreenProps> = ({
  navigation,
  route,
}) => {
  const insets = useSafeAreaInsets()
  const fabBottom = useMemo<import("react-native").ViewStyle>(
    () => ({ bottom: 30 + insets.bottom }),
    [insets.bottom],
  )
  const [activeTab, setActiveTab] = useState<TabKey>("all")
  const [deleteToastVisible, setDeleteToastVisible] = useState(false)
  const hideDeleteToast = useCallback(() => setDeleteToastVisible(false), [])

  useEffect(() => {
    if (!route.params?.deleted) return
    setDeleteToastVisible(true)
    navigation.setParams({ deleted: undefined })
  }, [route.params?.deleted, navigation])

  const TABS: { key: TabKey; label: string }[] = useMemo(
    () => [
      { key: "all", label: translate("improvementProposalListScreen:tabs.all") },
      { key: "pending", label: translate("improvementProposalListScreen:tabs.pending") },
      { key: "ongoing", label: translate("improvementProposalListScreen:tabs.ongoing") },
      { key: "reflected", label: translate("improvementProposalListScreen:tabs.reflected") },
      { key: "rejected", label: translate("improvementProposalListScreen:tabs.rejected") },
    ],
    [],
  )

  const myCount = useMemo(() => mockProposalData.filter((item) => item.isMyProposal).length, [])

  const reflectedCount = useMemo(
    () =>
      mockProposalData.filter((item) => item.status === "reflected" || item.status === "rejected")
        .length,
    [],
  )

  const filteredData = useMemo(
    () =>
      activeTab === "all"
        ? mockProposalData
        : mockProposalData.filter((item) => item.status === activeTab),
    [activeTab],
  )

  return (
    <>
      <Toast
        visible={deleteToastVisible}
        message={translate("improvementProposalDetailScreen:deletedMessage")}
        icon={<IconCheck size={16} color="#FFFFFF" strokeWidth={2.5} />}
        onHide={hideDeleteToast}
      />

      <StackScreen
        title={translate("improvementProposalListScreen:title")}
        onBack={() => navigation.goBack()}
        contentBg="#FFFFFF"
        squareTop
      >
        {/* 탭 바 */}
        <View style={S.$tabBarWrapper}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={S.$tabScrollView}
            contentContainerStyle={S.$tabBarContent}
            bounces={false}
          >
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
          </ScrollView>
        </View>

        {/* 카드 리스트 */}
        <FlatList<ProposalItem>
          data={filteredData}
          keyExtractor={(item) => String(item.id)}
          ListHeaderComponent={<SummarySection myCount={myCount} reflectedCount={reflectedCount} />}
          contentContainerStyle={[S.$listContent, filteredData.length === 0 && S.$flex1]}
          renderItem={({ item }) => (
            <ProposalCard
              item={item}
              onPress={() => navigation.navigate("ImprovementProposalDetail", { id: item.id })}
            />
          )}
          ListEmptyComponent={<EmptyState tab={activeTab} />}
          showsVerticalScrollIndicator={false}
        />
      </StackScreen>

      {/* FAB — StackScreen의 overflow:hidden 밖에 배치 */}
      <View style={[S.$fabWrapper, fabBottom]} pointerEvents="box-none">
        <TouchableOpacity
          style={S.$fab}
          activeOpacity={0.8}
          onPress={() => navigation.navigate("ImprovementProposalCreate")}
        >
          <TbmFabIcon width={29} height={29} />
          <Text text={translate("improvementProposalListScreen:fab")} style={S.$fabLabel} />
        </TouchableOpacity>
      </View>
    </>
  )
}
