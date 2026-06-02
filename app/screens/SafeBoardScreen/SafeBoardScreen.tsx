import { FC, useEffect, useMemo, useRef, useState } from "react"
import { Animated, FlatList, Modal, Pressable, TouchableOpacity, View, ViewStyle } from "react-native"
import { BellRing, Building, Check, ChevronDown } from "lucide-react-native"
import { useTranslation } from "react-i18next"
import { useSafeAreaInsets } from "react-native-safe-area-context"

import TbmFabIcon from "@assets/images/tbm-fab-icon.svg"

import { StackScreen } from "@/components/StackScreen"
import { Text } from "@/components/Text"
import { Toast } from "@/components/Toast"
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

export const SafeBoardScreen: FC<SafeBoardScreenProps> = ({ navigation, route }) => {
  const { i18n } = useTranslation()
  const isRTL = i18n.language === "ur"
  const insets = useSafeAreaInsets()
  const fabBottom = useMemo<ViewStyle>(() => ({ bottom: insets.bottom }), [insets.bottom])
  const { role } = useRole()
  const [activeTab, setActiveTab] = useState<AdminTab>("all")
  const [selectedWorkplace, setSelectedWorkplace] = useState("서울 한강 레지던스 RC공사 현장")
  const [showWorkplaceModal, setShowWorkplaceModal] = useState(false)
  const [toastVisible, setToastVisible] = useState(false)
  const slideAnim = useRef(new Animated.Value(300)).current

  useEffect(() => {
    if (route.params?.showToast) {
      setToastVisible(true)
      navigation.setParams({ showToast: false })
    }
  }, [route.params?.showToast, navigation])

  const openModal = () => {
    setShowWorkplaceModal(true)
    Animated.timing(slideAnim, { toValue: 0, duration: 250, useNativeDriver: true }).start()
  }

  const closeModal = () => {
    Animated.timing(slideAnim, { toValue: 300, duration: 200, useNativeDriver: true }).start(() =>
      setShowWorkplaceModal(false),
    )
  }

  const isAdmin = role === "admin"
  const selectedWorkplaceId = getWorkplaceId(selectedWorkplace)
  const filterWorkplaceId = isAdmin ? selectedWorkplaceId : mockWorkerWorkplaceId

  const baseData: SafeBoardItem[] = isAdmin && activeTab === "my" ? mockMyPosts : mockSafeBoardData
  const filteredData = filterByWorkplace(baseData, filterWorkplaceId)
  const displayData = filteredData.sort((a, b) => {
    if (a.isPinned !== b.isPinned) return a.isPinned ? -1 : 1
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  })

  return (
    <>
      <StackScreen
        title={translate("safeBoardScreen:title")}
        squareTop
        contentBg="#F9FAFE"
        rightSlot={
          isAdmin ? (
            <TouchableOpacity
              style={S.$bellIconContainer}
              activeOpacity={0.7}
              onPress={() => navigation.navigate("SafeBoardNotify")}
            >
              <BellRing size={18} color="#FFFFFF" strokeWidth={1.8} />
              <Text text={translate("safeBoardScreen:alertButton")} style={S.$bellText} />
            </TouchableOpacity>
          ) : undefined
        }
      >
        {isAdmin && (
          <>
            <View style={S.$workplaceContainer}>
              <Text text={translate("safeBoardScreen:workplaceLabel")} style={S.$workplaceLabel} />
              <TouchableOpacity
                style={[S.$workplaceSelectorNew, isRTL && { flexDirection: "row-reverse" }]}
                activeOpacity={0.6}
                onPress={openModal}
              >
                <Text
                  text={selectedWorkplace}
                  style={S.$workplaceSelectorTextNew}
                  numberOfLines={1}
                />
                <View style={S.$chevronContainer}>
                  <ChevronDown size={35} color="#979797" strokeWidth={1.8} />
                </View>
              </TouchableOpacity>
            </View>

            <View style={[S.$tabContainer, isRTL && { flexDirection: "row-reverse" }]}>
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
                onPress={() => navigation.navigate("SafeBoardDetail", { id: item.id })}
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

        <Toast
          visible={toastVisible}
          message={translate("safeBoardScreen:draftSaved")}
          icon={<Check size={14} color="#FFFFFF" strokeWidth={2.5} />}
          onHide={() => setToastVisible(false)}
        />

      </StackScreen>

      <Modal
        visible={showWorkplaceModal}
        transparent
        animationType="fade"
        onRequestClose={closeModal}
      >
        <Pressable style={S.$modalOverlay} onPress={closeModal}>
          <Animated.View style={[S.$modalContent, { transform: [{ translateY: slideAnim }] }]}>
            <Text text={translate("safeBoardScreen:workplaceModal.title")} style={S.$modalTitle} />
            {WORKPLACES.map((workplace) => {
              const isSelected = selectedWorkplace === workplace
              return (
                <TouchableOpacity
                  key={workplace}
                  style={[
                    S.$workplaceOption,
                    isSelected && S.$workplaceOptionSelected,
                    isRTL && { flexDirection: "row-reverse" },
                  ]}
                  activeOpacity={0.7}
                  onPress={() => {
                    setSelectedWorkplace(workplace)
                    closeModal()
                  }}
                >
                  <Building
                    size={20}
                    color={isSelected ? "#1062D8" : "#979797"}
                    strokeWidth={1.8}
                  />
                  <Text
                    text={workplace}
                    style={[S.$workplaceOptionText, isSelected && S.$workplaceOptionTextSelected]}
                    numberOfLines={2}
                  />
                </TouchableOpacity>
              )
            })}
          </Animated.View>
        </Pressable>
      </Modal>

      {/* FAB — StackScreen의 overflow:hidden 밖에 배치 */}
      {isAdmin && (
        <View
          style={[S.$fabWrapper, fabBottom, isRTL ? { left: 20 } : { right: 20 }]}
          pointerEvents="box-none"
        >
          <TouchableOpacity
            style={S.$fab}
            activeOpacity={0.8}
            onPress={() => navigation.navigate("SafeBoardCreate")}
          >
            <TbmFabIcon width={30} height={30} />
            <Text text={translate("safeBoardScreen:write")} style={S.$fabLabel} />
          </TouchableOpacity>
        </View>
      )}
    </>
  )
}
