import { FC, useState } from "react"
import { FlatList, Modal, Pressable, TouchableOpacity, View } from "react-native"
import { Bell, ChevronDown, PencilLine, Check } from "lucide-react-native"

import { Text } from "@/components/Text"
import { useRole } from "@/context/RoleContext"
import { translate } from "@/i18n/translate"

import { SafeBoardCard } from "./components/SafeBoardCard"
import { mockMyPosts, mockSafeBoardData } from "./mock/mockSafeBoardData"
import * as S from "./styles"
import type { SafeBoardItem, SafeBoardScreenProps } from "./types"

type AdminTab = "all" | "my"

const mockWorkerWorkplaceId = 1

const WORKPLACES = [
  "서울 한강 레지던스 RC공사 현장",
  "부산 센텀 물류센터 현장",
  "대구 산업단지 신축 현장",
]

const getWorkplaceId = (workplaceName: string): number => {
  const workplaceMap: Record<string, number> = {
    "서울 한강 레지던스 RC공사 현장": 1,
    "부산 센텀 물류센터 현장": 2,
    "대구 산업단지 신축 현장": 3,
  }

  return workplaceMap[workplaceName] ?? 1
}

const filterByWorkplace = (posts: SafeBoardItem[], workplaceId: number): SafeBoardItem[] => {
  return posts.filter(
    (post) => post.scope === "company_wide" || Number(post.workplaceId) === workplaceId,
  )
}

export const SafeBoardScreen: FC<SafeBoardScreenProps> = () => {
  const { role } = useRole()
  const [activeTab, setActiveTab] = useState<AdminTab>("all")
  const [selectedWorkplace, setSelectedWorkplace] = useState("서울 한강 레지던스 RC공사 현장")
  const [showWorkplaceModal, setShowWorkplaceModal] = useState(false)

  const isAdmin = role === "admin"
  const selectedWorkplaceId = getWorkplaceId(selectedWorkplace)
  const filterWorkplaceId = isAdmin ? selectedWorkplaceId : mockWorkerWorkplaceId

  const baseData: SafeBoardItem[] = isAdmin && activeTab === "my" ? mockMyPosts : mockSafeBoardData
  const filteredData = filterByWorkplace(baseData, filterWorkplaceId)
  const displayData = filteredData.sort((a, b) => {
    if (a.isPinned !== b.isPinned) {
      return a.isPinned ? -1 : 1
    }
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  })

  return (
    <View style={S.$screenContainer}>
      {isAdmin ? (
        <>
          <View style={S.$adminHeaderContainer}>
            <View style={S.$adminHeaderContent}>
              <Text text={translate("safeBoardScreen:title")} style={S.$headerTitle} />

              <TouchableOpacity
                style={S.$bellIconContainer}
                activeOpacity={0.7}
                onPress={() => {
                  console.log("알림 발송")
                }}
              >
                <Bell size={20} color="#FFFFFF" strokeWidth={1.8} />
                <Text text={translate("safeBoardScreen:alertButton")} style={S.$bellText} />
              </TouchableOpacity>
            </View>
          </View>

          <View style={S.$workplaceContainer}>
            <Text text={translate("safeBoardScreen:workplaceLabel")} style={S.$workplaceLabel} />
            <TouchableOpacity
              style={S.$workplaceSelectorNew}
              activeOpacity={0.6}
              onPress={() => setShowWorkplaceModal(true)}
            >
              <Text
                text={selectedWorkplace}
                style={S.$workplaceSelectorTextNew}
                numberOfLines={1}
              />
              <View style={S.$chevronContainer}>
                <ChevronDown size={16} color="#979797" strokeWidth={2} />
              </View>
            </TouchableOpacity>
          </View>

          <View style={S.$tabContainer}>
            <TouchableOpacity
              style={[S.$tab, activeTab === "all" && S.$activeTab]}
              activeOpacity={0.7}
              onPress={() => setActiveTab("all")}
            >
              <Text
                text={translate("safeBoardScreen:tabs.all")}
                style={[S.$tabText, activeTab === "all" && S.$activeTabText]}
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={[S.$tab, activeTab === "my" && S.$activeTab]}
              activeOpacity={0.7}
              onPress={() => setActiveTab("my")}
            >
              <Text
                text={translate("safeBoardScreen:tabs.myPosts")}
                style={[S.$tabText, activeTab === "my" && S.$activeTabText]}
              />
            </TouchableOpacity>
          </View>
        </>
      ) : (
        <View style={S.$headerContainer}>
          <Text text={translate("safeBoardScreen:title")} style={S.$headerTitle} />
        </View>
      )}

      <View style={S.$contentContainer}>
        <FlatList<SafeBoardItem>
          data={displayData}
          renderItem={({ item, index }) => (
            <SafeBoardCard
              item={item}
              showStatus={isAdmin && activeTab === "my"}
              showEditIcon={false}
              showDivider={index < displayData.length - 1}
            />
          )}
          keyExtractor={(item) => String(item.id)}
          contentContainerStyle={S.$listContainer}
          ListEmptyComponent={
            <View style={S.$emptyContainer}>
              <Text text={translate("safeBoardScreen:empty")} style={S.$emptyText} />
            </View>
          }
        />
      </View>

      {isAdmin && (
        <TouchableOpacity
          style={S.$floatingButton}
          activeOpacity={0.8}
          onPress={() => {
            console.log("작성하기")
          }}
        >
          <PencilLine size={20} color="#FFFFFF" strokeWidth={1.8} />
          <Text text={translate("safeBoardScreen:write")} style={S.$floatingButtonText} />
        </TouchableOpacity>
      )}

      {/* Workplace Selection Modal */}
      <Modal
        visible={showWorkplaceModal}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowWorkplaceModal(false)}
      >
        <Pressable style={S.$modalOverlay} onPress={() => setShowWorkplaceModal(false)}>
          <View style={S.$modalContent}>
            {WORKPLACES.map((workplace) => (
              <TouchableOpacity
                key={workplace}
                style={S.$workplaceOption}
                onPress={() => {
                  setSelectedWorkplace(workplace)
                  setShowWorkplaceModal(false)
                }}
              >
                <Text text={workplace} style={S.$workplaceOptionText} numberOfLines={2} />
                {selectedWorkplace === workplace && (
                  <Check size={20} color="#0B3069" strokeWidth={2.5} />
                )}
              </TouchableOpacity>
            ))}
          </View>
        </Pressable>
      </Modal>
    </View>
  )
}
