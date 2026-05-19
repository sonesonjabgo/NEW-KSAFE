import { FC, useMemo, useState } from "react"
import { FlatList, TouchableOpacity, View } from "react-native"

import TbmEmptyImage from "@assets/images/tbm-empty.svg"

import { StackScreen } from "@/components/StackScreen"
import { Text } from "@/components/Text"
import { translate } from "@/i18n/translate"

import * as S from "./styles"
import type { TbmReportInquiryScreenProps } from "./types"

type TabKey = "all" | "requested" | "generating" | "completed" | "failed"

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

export const TbmReportInquiryScreen: FC<TbmReportInquiryScreenProps> = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState<TabKey>("all")

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

  // TODO: 실제 데이터 연동 시 필터링 로직 추가
  const reportData: any[] = []

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

      {/* 리스트 영역 (현재 데이터 없음 상태) */}
      <FlatList
        style={S.$listContent}
        data={reportData}
        keyExtractor={(_, index) => String(index)}
        contentContainerStyle={[S.$flatListContent, { flex: 1 }]}
        renderItem={null}
        ListEmptyComponent={<EmptyState tab={activeTab} />}
        showsVerticalScrollIndicator={false}
      />
    </StackScreen>
  )
}
