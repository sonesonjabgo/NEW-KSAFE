import { FC, useCallback, useMemo, useState } from "react"
import { ActivityIndicator, FlatList, TextInput, TouchableOpacity, View } from "react-native"
import { useFocusEffect } from "@react-navigation/native"
import { IconSearch } from "@tabler/icons-react-native"
import { observer } from "mobx-react-lite"
import { useSafeAreaInsets } from "react-native-safe-area-context"

import TbmEmptyImage from "@assets/images/tbm-empty.svg"

import { StackScreen } from "@/components/StackScreen"
import { Text } from "@/components/Text"
import { translate } from "@/i18n/translate"
import { useStores } from "@/models"
import { AppStackScreenProps } from "@/navigators/navigationTypes"

import * as S from "./styles"
import { EducationListItem } from "./types"

type EducationSelectScreenProps = AppStackScreenProps<"EducationSelect">

const BADGE_COLORS: Record<string, { bg: string; text: string }> = {
  공통: { bg: "#E6F0FD", text: "#1062D8" },
  감전사고: { bg: "#FDECEA", text: "#C62828" },
  기계점검보수: { bg: "#E8F5E9", text: "#2E7D32" },
}
const DEFAULT_BADGE_COLOR = { bg: "#E6F0FD", text: "#1062D8" }

function formatDate(dateStr: string): string {
  const d = new Date(dateStr)
  if (isNaN(d.getTime())) return dateStr
  const yyyy = d.getFullYear()
  const mm = String(d.getMonth() + 1).padStart(2, "0")
  const dd = String(d.getDate()).padStart(2, "0")
  return `${yyyy}.${mm}.${dd}`
}

export const EducationSelectScreen: FC<EducationSelectScreenProps> = observer(
  function EducationSelectScreen({ navigation, route }) {
    const insets = useSafeAreaInsets()
    const { educationStore } = useStores()
    const { initialSelected = [], onConfirm } = route.params

    const [sourceTabIndex, setSourceTabIndex] = useState<0 | 1 | 2>(0)
    const [query, setQuery] = useState("")
    const [selectedCategoryName, setSelectedCategoryName] = useState<string | null>(null)
    const [selectedIds, setSelectedIds] = useState<string[]>(initialSelected)

    const sourceTabs = useMemo(
      () => [
        translate("educationSelectScreen:sourceTab1"),
        translate("educationSelectScreen:sourceTab2"),
        translate("educationSelectScreen:sourceTab3"),
      ],
      [],
    )

    useFocusEffect(
      useCallback(() => {
        void educationStore.fetchPlatformItems()
        void educationStore.fetchCategories()
        void educationStore.fetchCompanyItems()
        void educationStore.fetchMyItems()
      }, [educationStore]),
    )

    const sourceItems = useMemo<EducationListItem[]>(() => {
      if (sourceTabIndex === 0) return educationStore.platformItems.slice()
      if (sourceTabIndex === 1) return educationStore.companyItems.slice()
      return educationStore.myItems.slice()
    }, [
      sourceTabIndex,
      educationStore.platformItems,
      educationStore.companyItems,
      educationStore.myItems,
    ])

    const filtered = useMemo(() => {
      const q = query.trim().toLowerCase()
      return sourceItems.filter((item) => {
        const matchesCategory =
          sourceTabIndex !== 0 ||
          !selectedCategoryName ||
          item.categoryName === selectedCategoryName
        const matchesQuery = !q || item.title.toLowerCase().includes(q)
        return matchesCategory && matchesQuery
      })
    }, [sourceItems, sourceTabIndex, selectedCategoryName, query])

    const toggleItem = useCallback((id: string) => {
      setSelectedIds((prev) => (prev.includes(id) ? prev.filter((v) => v !== id) : [...prev, id]))
    }, [])

    const handleConfirm = useCallback(() => {
      onConfirm(selectedIds)
      navigation.goBack()
    }, [onConfirm, selectedIds, navigation])

    const handleSourceTabChange = useCallback((index: 0 | 1 | 2) => {
      setSourceTabIndex(index)
      setSelectedCategoryName(null)
      setQuery("")
    }, [])

    const confirmLabel = useMemo(
      () =>
        selectedIds.length > 0
          ? translate("educationSelectScreen:confirm", { count: selectedIds.length })
          : translate("educationSelectScreen:confirmNone"),
      [selectedIds.length],
    )

    const isLoading = educationStore.status === "pending"

    const renderItem = useCallback(
      ({ item }: { item: EducationListItem }) => {
        const isSelected = selectedIds.includes(item.id)
        const badgeColor = item.categoryName
          ? (BADGE_COLORS[item.categoryName] ?? DEFAULT_BADGE_COLOR)
          : DEFAULT_BADGE_COLOR
        return (
          <TouchableOpacity
            style={[S.$card, isSelected && S.$cardSelected]}
            activeOpacity={0.7}
            onPress={() => toggleItem(item.id)}
          >
            <View style={S.$cardTopRow}>
              {item.source === "platform" && item.categoryName ? (
                <View style={[S.$cardBadge, { backgroundColor: badgeColor.bg }]}>
                  <Text
                    text={item.categoryName}
                    style={[S.$cardBadgeText, { color: badgeColor.text }]}
                  />
                </View>
              ) : (
                <View />
              )}
              <View style={S.$cardTopRight}>
                <Text text={formatDate(item.createdAt)} style={S.$cardDate} />
                <View style={[S.$checkbox, isSelected && S.$checkboxActive]}>
                  {isSelected && <View style={S.$checkboxDot} />}
                </View>
              </View>
            </View>
            <Text text={item.title} style={S.$cardTitle} numberOfLines={2} />
          </TouchableOpacity>
        )
      },
      [selectedIds, toggleItem],
    )

    return (
      <StackScreen
        title={translate("educationSelectScreen:title")}
        onBack={() => navigation.goBack()}
        squareTop
        contentBg="#FFFFFF"
      >
        <View style={{ flex: 1 }}>
          {/* 소스 탭 바 */}
          <View style={S.$sourceTabBar}>
            {sourceTabs.map((label, index) => {
              const isActive = index === sourceTabIndex
              return (
                <TouchableOpacity
                  key={index}
                  style={[S.$sourceTab, isActive && S.$sourceTabActive]}
                  activeOpacity={0.7}
                  onPress={() => handleSourceTabChange(index as 0 | 1 | 2)}
                >
                  <Text
                    text={label}
                    style={[S.$sourceTabText, isActive && S.$sourceTabTextActive]}
                  />
                </TouchableOpacity>
              )
            })}
          </View>

          {/* 검색 바 */}
          <View style={S.$searchSection}>
            <View style={S.$searchRow}>
              <IconSearch size={24} color="#A9AAAC" />
              <TextInput
                style={S.$searchInput}
                value={query}
                onChangeText={setQuery}
                placeholder={translate("educationSelectScreen:searchPlaceholder")}
                placeholderTextColor="#ACAEB1"
                returnKeyType="search"
              />
            </View>
          </View>

          {isLoading ? (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
              <ActivityIndicator size="large" color="#1062D8" />
            </View>
          ) : (
            <>
              {/* 카테고리 탭 — platform 탭(0)에서만 표시 */}
              {sourceTabIndex === 0 && educationStore.categories.length > 0 && (
                <View style={S.$categoryRow}>
                  {[null, ...educationStore.categories.map((c) => c.name)].map((cat) => {
                    const isActive = cat === selectedCategoryName
                    const label = cat ?? translate("educationSelectScreen:categoryAll")
                    return (
                      <TouchableOpacity
                        key={cat ?? "all"}
                        style={[S.$categoryChip, isActive && S.$categoryChipActive]}
                        activeOpacity={0.7}
                        onPress={() => setSelectedCategoryName(isActive ? null : cat)}
                      >
                        <Text
                          text={label}
                          style={[
                            S.$categoryChipText,
                            isActive && S.$categoryChipTextActive,
                          ]}
                        />
                      </TouchableOpacity>
                    )
                  })}
                </View>
              )}

              <FlatList
                data={filtered}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
                contentContainerStyle={[S.$listContent, filtered.length === 0 && { flex: 1 }]}
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="handled"
                ListEmptyComponent={
                  <View style={S.$emptyContainer}>
                    <TbmEmptyImage width={150} height={162} />
                    <Text text={translate("educationSelectScreen:emptyText")} style={S.$emptyText} />
                  </View>
                }
              />
            </>
          )}
        </View>

        {/* 확인 버튼 */}
        <View style={[S.$bottomBar, { paddingBottom: insets.bottom + 16 }]}>
          <TouchableOpacity
            style={[S.$confirmBtn, selectedIds.length === 0 && S.$confirmBtnDisabled]}
            activeOpacity={0.8}
            onPress={handleConfirm}
            disabled={selectedIds.length === 0}
          >
            <Text text={confirmLabel} style={S.$confirmBtnText} />
          </TouchableOpacity>
        </View>
      </StackScreen>
    )
  },
)
