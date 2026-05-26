import { FC, useEffect, useMemo, useRef, useState } from "react"
import { Animated, FlatList, Modal, Pressable, TouchableOpacity, View } from "react-native"
import { BellRing, Building, Check, ChevronDown, PencilLine } from "lucide-react-native"
import { observer } from "mobx-react-lite"

import { StackScreen } from "@/components/StackScreen"
import { Text } from "@/components/Text"
import { Toast } from "@/components/Toast"
import { useRole } from "@/context/RoleContext"
import { translate } from "@/i18n/translate"
import { useStores } from "@/models"

import { SafeBoardCard } from "./components/SafeBoardCard"
import * as S from "./styles"
import type { SafeBoardItem, SafeBoardScreenProps, ScopeType } from "./types"

type AdminTab = "all" | "my"

function formatPostDate(dateStr: string): string {
  const d = new Date(dateStr)
  if (isNaN(d.getTime())) return dateStr
  const yyyy = d.getFullYear()
  const mm = String(d.getMonth() + 1).padStart(2, "0")
  const dd = String(d.getDate()).padStart(2, "0")
  return `${yyyy}.${mm}.${dd}`
}

export const SafeBoardScreen: FC<SafeBoardScreenProps> = observer(function SafeBoardScreen({
  navigation,
  route,
}) {
  const { role } = useRole()
  const { safeBoardStore, workplaceStore } = useStores()
  const [activeTab, setActiveTab] = useState<AdminTab>("all")
  const [selectedWorkplaceId, setSelectedWorkplaceId] = useState<string>("")
  const [showWorkplaceModal, setShowWorkplaceModal] = useState(false)
  const [toastVisible, setToastVisible] = useState(false)
  const slideAnim = useRef(new Animated.Value(300)).current

  const isAdmin = role === "admin"

  // Derive available workplaces from board posts so admin sees all company workplaces,
  // not just the ones the current user is personally assigned to via workplaceStore.
  const availableWorkplaces = useMemo(() => {
    const seen = new Set<string>()
    const result: Array<{ id: string; workplaceName: string }> = []
    safeBoardStore.boards.forEach((post) => {
      if (post.workplaceId && post.workplaceName && !seen.has(post.workplaceId)) {
        seen.add(post.workplaceId)
        result.push({ id: post.workplaceId, workplaceName: post.workplaceName })
      }
    })
    return result
  }, [safeBoardStore.boards.length])

  // Admin: fetch ALL posts once so we can derive the full workplace list from them.
  // Non-admin: fetch workplaces first (for primaryWorkplace), then fetch posts.
  useEffect(() => {
    if (isAdmin) {
      safeBoardStore.fetchBoardPosts()
      safeBoardStore.fetchMyPosts()
    } else if (!workplaceStore.hasWorkplaces) {
      workplaceStore.fetchWorkplaces()
    } else {
      safeBoardStore.fetchBoardPosts(workplaceStore.primaryWorkplace?.id ?? undefined)
    }
  }, [])

  // Non-admin: when workplaces finish loading, kick off the post fetch.
  useEffect(() => {
    if (!isAdmin && workplaceStore.workplaces.length > 0 && safeBoardStore.boards.length === 0) {
      safeBoardStore.fetchBoardPosts(workplaceStore.primaryWorkplace?.id ?? undefined)
    }
  }, [workplaceStore.workplaces.length])

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

  const selectedWorkplaceName = selectedWorkplaceId
    ? (availableWorkplaces.find((w) => w.id === selectedWorkplaceId)?.workplaceName ?? "")
    : translate("safeBoardScreen:allWorkplaces")
  const filterWorkplaceId = isAdmin
    ? selectedWorkplaceId
    : (workplaceStore.primaryWorkplace?.id ?? "")

  const sourceData = isAdmin && activeTab === "my" ? safeBoardStore.myPosts : safeBoardStore.boards

  const displayData: SafeBoardItem[] = sourceData
    .filter((post) => {
      if (isAdmin && !filterWorkplaceId) return true
      return post.scope === "company_wide" || post.workplaceId === filterWorkplaceId
    })
    .slice()
    .sort((a, b) => {
      if (a.isPinned !== b.isPinned) return a.isPinned ? -1 : 1
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    })
    .map((post) => ({
      id: post.id,
      title: post.title,
      scope: post.scope as ScopeType,
      isPinned: post.isPinned,
      workplaceId: post.workplaceId,
      workplaceName: post.workplaceName,
      status: post.status,
      createdAt: formatPostDate(post.createdAt),
      updatedAt: post.updatedAt,
    }))

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
                style={S.$workplaceSelectorNew}
                activeOpacity={0.6}
                onPress={openModal}
              >
                <Text
                  text={selectedWorkplaceName}
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
                onPress={() => {
                  setActiveTab("all")
                  safeBoardStore.setActiveTab("all")
                }}
              >
                <Text
                  text={translate("safeBoardScreen:tabs.all")}
                  style={[S.$tabText, activeTab === "all" && S.$activeTabText]}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={[S.$tab, activeTab === "my" && S.$activeTab]}
                activeOpacity={0.7}
                onPress={() => {
                  setActiveTab("my")
                  safeBoardStore.setActiveTab("my")
                }}
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
            keyExtractor={(item) => item.id}
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

        {isAdmin && (
          <TouchableOpacity
            style={S.$floatingButton}
            activeOpacity={0.8}
            onPress={() => navigation.navigate("SafeBoardCreate")}
          >
            <PencilLine size={20} color="#FFFFFF" strokeWidth={1.8} />
            <Text text={translate("safeBoardScreen:write")} style={S.$floatingButtonText} />
          </TouchableOpacity>
        )}
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
            <TouchableOpacity
              style={[S.$workplaceOption, !selectedWorkplaceId && S.$workplaceOptionSelected]}
              activeOpacity={0.7}
              onPress={() => {
                setSelectedWorkplaceId("")
                closeModal()
              }}
            >
              <Building
                size={20}
                color={!selectedWorkplaceId ? "#1062D8" : "#979797"}
                strokeWidth={1.8}
              />
              <Text
                text={translate("safeBoardScreen:workplaceModal.allOption")}
                style={[S.$workplaceOptionText, !selectedWorkplaceId && S.$workplaceOptionTextSelected]}
              />
            </TouchableOpacity>
            {availableWorkplaces.map((wp) => {
              const isSelected = selectedWorkplaceId === wp.id
              return (
                <TouchableOpacity
                  key={wp.id}
                  style={[S.$workplaceOption, isSelected && S.$workplaceOptionSelected]}
                  activeOpacity={0.7}
                  onPress={() => {
                    setSelectedWorkplaceId(wp.id)
                    closeModal()
                  }}
                >
                  <Building
                    size={20}
                    color={isSelected ? "#1062D8" : "#979797"}
                    strokeWidth={1.8}
                  />
                  <Text
                    text={wp.workplaceName}
                    style={[S.$workplaceOptionText, isSelected && S.$workplaceOptionTextSelected]}
                    numberOfLines={2}
                  />
                </TouchableOpacity>
              )
            })}
          </Animated.View>
        </Pressable>
      </Modal>
    </>
  )
})
