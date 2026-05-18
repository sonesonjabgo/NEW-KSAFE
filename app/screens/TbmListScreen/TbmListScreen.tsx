import { FC, useMemo, useState } from "react"
import { FlatList, TouchableOpacity, View } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"

import TbmEmptyImage from "@assets/images/tbm-empty.svg"
import TbmFabIcon from "@assets/images/tbm-fab-icon.svg"

import { StackScreen } from "@/components/StackScreen"
import { Text } from "@/components/Text"
import { translate } from "@/i18n/translate"

import { mockTbmData } from "./mockData"
import * as S from "./styles"
import type { TbmItem, TbmListScreenProps, TbmStatus } from "./types"

type TabKey = "all" | "작성중" | "진행중" | "종료됨"

const TbmCard: FC<{ item: TbmItem }> = ({ item }) => {
  const badgeStyle =
    item.status === "작성중"
      ? S.$badgeDrafting
      : item.status === "진행중"
        ? S.$badgeOngoing
        : S.$badgeEnded

  const badgeTextStyle =
    item.status === "작성중"
      ? S.$badgeDraftingText
      : item.status === "진행중"
        ? S.$badgeOngoingText
        : S.$badgeEndedText

  const statusKey: Record<TbmStatus, "drafting" | "ongoing" | "ended"> = {
    작성중: "drafting",
    진행중: "ongoing",
    종료됨: "ended",
  }

  return (
    <TouchableOpacity
      style={S.$card}
      activeOpacity={0.75}
      onPress={() => console.log("TBM id:", item.id)}
    >
      {/* 상태 배지 + 날짜 */}
      <View style={S.$cardTopRow}>
        <View style={badgeStyle}>
          <Text
            text={translate(`tbmListScreen:status.${statusKey[item.status]}`)}
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
  const emptyKey: Record<TabKey, "all" | "drafting" | "ongoing" | "ended"> = {
    all: "all",
    작성중: "drafting",
    진행중: "ongoing",
    종료됨: "ended",
  }

  return (
    <View style={S.$emptyContainer}>
      <View style={S.$emptyImage}>
        <TbmEmptyImage width={150} height={162} />
      </View>
      <Text text={translate(`tbmListScreen:empty.${emptyKey[tab]}`)} style={S.$emptyText} />
    </View>
  )
}

export const TbmListScreen: FC<TbmListScreenProps> = ({ navigation }) => {
  const insets = useSafeAreaInsets()
  const [activeTab, setActiveTab] = useState<TabKey>("all")

  const TABS: { key: TabKey; label: string }[] = useMemo(
    () => [
      { key: "all", label: translate("tbmListScreen:tabs.all") },
      { key: "작성중", label: translate("tbmListScreen:tabs.drafting") },
      { key: "진행중", label: translate("tbmListScreen:tabs.ongoing") },
      { key: "종료됨", label: translate("tbmListScreen:tabs.ended") },
    ],
    [],
  )

  const filteredData = useMemo(
    () =>
      activeTab === "all"
        ? mockTbmData
        : mockTbmData.filter((item) => item.status === activeTab),
    [activeTab],
  )

  return (
    <>
      <StackScreen
        title={translate("tbmListScreen:title")}
        onBack={() => navigation.goBack()}
        contentBg="#FFFFFF"
        squareTop
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
        <FlatList<TbmItem>
          style={S.$listContent}
          data={filteredData}
          keyExtractor={(item) => String(item.id)}
          contentContainerStyle={[
            S.$flatListContent,
            filteredData.length === 0 && { flex: 1 },
          ]}
        renderItem={({ item }) => <TbmCard item={item} />}
        ListEmptyComponent={<EmptyState tab={activeTab} />}
        showsVerticalScrollIndicator={false}
      />

      {/* FAB */}
      </StackScreen>

      {/* FAB — StackScreen의 overflow:hidden 밖에 배치 */}
      <View
        style={{ position: "absolute", right: 20, bottom: 30 + insets.bottom, alignItems: "center" }}
        pointerEvents="box-none"
      >
        <TouchableOpacity
          style={S.$fab}
          activeOpacity={0.8}
          onPress={() => navigation.navigate("TbmCreate")}
        >
          <TbmFabIcon width={29} height={29} />
          <Text text={translate("tbmListScreen:fab")} style={S.$fabLabel} />
        </TouchableOpacity>
      </View>
    </>
  )
}
