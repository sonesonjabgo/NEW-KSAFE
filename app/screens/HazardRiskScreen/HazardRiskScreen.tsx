import { FC, useMemo, useState } from "react"
import { FlatList, ScrollView, TouchableOpacity, View } from "react-native"
import { PencilLine } from "lucide-react-native"

import { StackScreen } from "@/components/StackScreen"
import { Text } from "@/components/Text"
import { UserAvatar } from "@/components/UserAvatar"
import { translate } from "@/i18n/translate"

import { mockHazardData } from "./mockData"
import * as S from "./styles"
import type { HazardItem, HazardRiskScreenProps, HazardStatus } from "./types"

type TabKey = "all" | HazardStatus

const STATUS_KEY_MAP: Record<HazardStatus, "pending" | "ongoing" | "completed" | "impossible"> = {
  pending: "pending",
  ongoing: "ongoing",
  completed: "completed",
  impossible: "impossible",
}

// ── Status Badge ─────────────────────────────────────────────────────────────

const StatusBadge: FC<{ status: HazardStatus }> = ({ status }) => (
  <View style={[S.$badge, S.$statusBadgeStyle[status]]}>
    <Text
      text={translate(`hazardRiskScreen:status.${STATUS_KEY_MAP[status]}` as any)}
      style={[S.$badgeText, S.$statusBadgeTextStyle[status]]}
    />
  </View>
)

// ── Hazard Card ───────────────────────────────────────────────────────────────

const HazardCard: FC<{ item: HazardItem; onPress: () => void }> = ({ item, onPress }) => (
  <TouchableOpacity style={S.$card} activeOpacity={0.75} onPress={onPress}>
    <View style={S.$cardTopRow}>
      <StatusBadge status={item.status} />
      <Text text={item.date} style={S.$cardDate} />
    </View>
    <Text text={item.location} style={S.$cardLocation} />
    <Text text={item.description} style={S.$cardDescription} numberOfLines={2} />
    <View style={S.$cardDivider} />
    <View style={S.$cardAuthorRow}>
      <UserAvatar initial={item.reporterInitial} size={24} />
      <Text text={item.reporterName} style={S.$cardAuthorName} numberOfLines={1} />
      <Text text={` · ${item.workplace}`} style={S.$cardWorkplace} numberOfLines={1} />
    </View>
  </TouchableOpacity>
)

// ── Summary Section ───────────────────────────────────────────────────────────

const SummarySection: FC<{ myCount: number; completedCount: number }> = ({
  myCount,
  completedCount,
}) => (
  <View style={S.$summarySection}>
    <View style={S.$summaryCard}>
      <Text text={translate("hazardRiskScreen:summary.myReports")} style={S.$summaryLabel} />
      <View style={S.$summaryCountRow}>
        <Text text={String(myCount)} style={S.$summaryCountNavy} />
        <Text text={translate("hazardRiskScreen:summary.unit")} style={S.$summaryUnitNavy} />
      </View>
    </View>
    <View style={S.$summaryCard}>
      <Text text={translate("hazardRiskScreen:summary.completed")} style={S.$summaryLabel} />
      <View style={S.$summaryCountRow}>
        <Text text={String(completedCount)} style={S.$summaryCountBlue} />
        <Text text={translate("hazardRiskScreen:summary.unit")} style={S.$summaryUnitBlue} />
      </View>
    </View>
  </View>
)

// ── Empty State ───────────────────────────────────────────────────────────────

const EMPTY_KEY_MAP: Record<TabKey, string> = {
  all: "all",
  pending: "pending",
  ongoing: "ongoing",
  completed: "completed",
  impossible: "impossible",
}

const EmptyState: FC<{ tab: TabKey }> = ({ tab }) => (
  <View style={S.$emptyContainer}>
    <Text
      text={translate(`hazardRiskScreen:empty.${EMPTY_KEY_MAP[tab]}` as any)}
      style={S.$emptyText}
    />
  </View>
)

// ── Screen ────────────────────────────────────────────────────────────────────

export const HazardRiskScreen: FC<HazardRiskScreenProps> = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState<TabKey>("all")

  const myCount = useMemo(() => mockHazardData.filter((item) => item.isMyReport).length, [])
  const completedCount = useMemo(
    () => mockHazardData.filter((item) => item.status === "completed").length,
    [],
  )

  const TABS: { key: TabKey; label: string }[] = useMemo(
    () => [
      { key: "all", label: translate("hazardRiskScreen:tabs.all") },
      { key: "pending", label: translate("hazardRiskScreen:tabs.pending") },
      { key: "ongoing", label: translate("hazardRiskScreen:tabs.ongoing") },
      { key: "completed", label: translate("hazardRiskScreen:tabs.completed") },
      { key: "impossible", label: translate("hazardRiskScreen:tabs.impossible") },
    ],
    [],
  )

  const filteredData = useMemo(
    () =>
      activeTab === "all"
        ? mockHazardData
        : mockHazardData.filter((item) => item.status === activeTab),
    [activeTab],
  )

  return (
    <>
      <StackScreen
        title={translate("hazardRiskScreen:title")}
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
        <FlatList<HazardItem>
          data={filteredData}
          keyExtractor={(item) => String(item.id)}
          ListHeaderComponent={<SummarySection myCount={myCount} completedCount={completedCount} />}
          contentContainerStyle={[S.$listContent, filteredData.length === 0 && S.$flex1]}
          renderItem={({ item }) => (
            <HazardCard
              item={item}
              onPress={() => navigation.navigate("HazardRiskDetail", { id: item.id })}
            />
          )}
          ListEmptyComponent={<EmptyState tab={activeTab} />}
          showsVerticalScrollIndicator={false}
        />
      </StackScreen>

      <TouchableOpacity
        style={S.$fab}
        activeOpacity={0.8}
        onPress={() => navigation.navigate("HazardRiskCreate")}
      >
        <PencilLine size={20} color="#FFFFFF" strokeWidth={1.8} />
        <Text text={translate("hazardRiskScreen:fab")} style={S.$fabText} />
      </TouchableOpacity>
    </>
  )
}
