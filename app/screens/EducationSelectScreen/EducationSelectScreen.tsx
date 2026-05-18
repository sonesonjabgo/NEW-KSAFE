import { FC, useCallback, useMemo, useState } from "react"
import {
  FlatList,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { IconSearch } from "@tabler/icons-react-native"
import TbmEmptyImage from "@assets/images/tbm-empty.svg"

import { StackScreen } from "@/components/StackScreen"
import { Text } from "@/components/Text"
import { translate } from "@/i18n/translate"
import { AppStackScreenProps } from "@/navigators/navigationTypes"

import { MOCK_EDUCATION_MATERIALS } from "./mockData"
import { EducationMaterial, EducationSubcategory } from "./types"
import * as S from "./styles"

type EducationSelectScreenProps = AppStackScreenProps<"EducationSelect">

type CategoryTab = "전체" | EducationSubcategory

const SUBCATEGORY_COLORS: Record<EducationSubcategory, { bg: string; text: string }> = {
  공통: { bg: "#E6F0FD", text: "#1062D8" },
  감전사고: { bg: "#FDECEA", text: "#C62828" },
  기계점검보수: { bg: "#E8F5E9", text: "#2E7D32" },
}

const CATEGORY_TABS: CategoryTab[] = ["전체", "감전사고", "공통", "기계점검보수"]

export const EducationSelectScreen: FC<EducationSelectScreenProps> = ({ navigation, route }) => {
  const insets = useSafeAreaInsets()
  const { initialSelected = [], onConfirm } = route.params

  const [sourceTabIndex, setSourceTabIndex] = useState<0 | 1 | 2>(0)
  const [query, setQuery] = useState("")
  const [categoryTab, setCategoryTab] = useState<CategoryTab>("전체")
  const [selectedIds, setSelectedIds] = useState<number[]>(initialSelected)

  const sourceTabs = useMemo(
    () => [
      translate("educationSelectScreen:sourceTab1"),
      translate("educationSelectScreen:sourceTab2"),
      translate("educationSelectScreen:sourceTab3"),
    ],
    [],
  )

  const sourceData = useMemo(
    () => MOCK_EDUCATION_MATERIALS.filter((item) => item.source === sourceTabIndex),
    [sourceTabIndex],
  )

  const filtered = useMemo(() => {
    const q = query.trim()
    return sourceData.filter((item) => {
      const matchesCategory = categoryTab === "전체" || item.subcategory === categoryTab
      const matchesQuery = !q || item.title.includes(q)
      return matchesCategory && matchesQuery
    })
  }, [sourceData, categoryTab, query])

  const hasSourceData = sourceData.length > 0

  const toggleItem = useCallback((id: number) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((v) => v !== id) : [...prev, id],
    )
  }, [])

  const handleConfirm = useCallback(() => {
    onConfirm(selectedIds)
    navigation.goBack()
  }, [onConfirm, selectedIds, navigation])

  const handleSourceTabChange = useCallback((index: 0 | 1 | 2) => {
    setSourceTabIndex(index)
    setCategoryTab("전체")
    setQuery("")
  }, [])

  const confirmLabel = useMemo(
    () =>
      selectedIds.length > 0
        ? translate("educationSelectScreen:confirm", { count: selectedIds.length })
        : translate("educationSelectScreen:confirmNone"),
    [selectedIds.length],
  )

  const renderItem = useCallback(
    ({ item }: { item: EducationMaterial }) => {
      const isSelected = selectedIds.includes(item.id)
      const badgeColor = SUBCATEGORY_COLORS[item.subcategory]
      return (
        <TouchableOpacity
          style={[S.$card, isSelected && S.$cardSelected]}
          activeOpacity={0.7}
          onPress={() => toggleItem(item.id)}
        >
          <View style={S.$cardTopRow}>
            <View style={[S.$cardBadge, { backgroundColor: badgeColor.bg }]}>
              <Text text={item.subcategory} style={[S.$cardBadgeText, { color: badgeColor.text }]} />
            </View>
            <View style={S.$cardTopRight}>
              <Text text={item.datetime} style={S.$cardDate} />
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

        {hasSourceData ? (
          <>
            {/* 카테고리 탭 */}
            <View style={S.$categoryRow}>
              {CATEGORY_TABS.map((cat) => {
                const isActive = cat === categoryTab
                return (
                  <TouchableOpacity
                    key={cat}
                    style={[S.$categoryChip, isActive && S.$categoryChipActive]}
                    activeOpacity={0.7}
                    onPress={() => setCategoryTab(cat)}
                  >
                    <Text
                      text={cat}
                      style={[S.$categoryChipText, isActive && S.$categoryChipTextActive]}
                    />
                  </TouchableOpacity>
                )
              })}
            </View>

            {/* 카드 리스트 */}
            <FlatList
              data={filtered}
              keyExtractor={(item) => String(item.id)}
              renderItem={renderItem}
              contentContainerStyle={[
                S.$listContent,
                filtered.length === 0 && { flex: 1 },
              ]}
              showsVerticalScrollIndicator={false}
              keyboardShouldPersistTaps="handled"
              ListEmptyComponent={
                <View style={S.$emptyContainer}>
                  <TbmEmptyImage width={150} height={162} />
                  <Text
                    text={translate("educationSelectScreen:emptyText")}
                    style={S.$emptyText}
                  />
                </View>
              }
            />
          </>
        ) : (
          <View style={S.$emptyContainer}>
            <TbmEmptyImage width={150} height={162} />
            <Text
              text={translate("educationSelectScreen:emptyText")}
              style={S.$emptyText}
            />
          </View>
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
}
