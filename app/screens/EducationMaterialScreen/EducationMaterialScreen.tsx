import { FC, useCallback, useMemo, useState } from "react"
import { FlatList, ScrollView, TextInput, TouchableOpacity, View } from "react-native"
import { IconPlus, IconSearch } from "@tabler/icons-react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"

import TbmEmptyImage from "@assets/images/tbm-empty.svg"

import { StackScreen } from "@/components/StackScreen"
import { Text } from "@/components/Text"
import { translate } from "@/i18n/translate"
import { AppStackScreenProps } from "@/navigators/navigationTypes"
import { MOCK_EDUCATION_MATERIALS } from "@/screens/EducationSelectScreen/mockData"
import * as Shared from "@/screens/EducationSelectScreen/styles"
import { EducationMaterial, EducationSubcategory } from "@/screens/EducationSelectScreen/types"

import * as S from "./styles"

type EducationMaterialScreenProps = AppStackScreenProps<"EducationMaterial">

type CategoryTab = "전체" | EducationSubcategory

const SUBCATEGORY_COLORS: Record<EducationSubcategory, { bg: string; text: string }> = {
  공통: { bg: "#E6F0FD", text: "#1062D8" },
  감전사고: { bg: "#FDECEA", text: "#C62828" },
  기계점검보수: { bg: "#E8F5E9", text: "#2E7D32" },
}

const CATEGORY_TABS: CategoryTab[] = ["전체", "감전사고", "공통", "기계점검보수"]

const SOURCE_LABELS: Record<0 | 1 | 2, string> = {
  0: "KS산업안전협회",
  1: "KS산업안전협회",
  2: "내가 만든 자료",
}

export const EducationMaterialScreen: FC<EducationMaterialScreenProps> = ({ navigation }) => {
  const { bottom } = useSafeAreaInsets()
  const [sourceTabIndex, setSourceTabIndex] = useState<0 | 1 | 2>(0)
  const [query, setQuery] = useState("")
  const [categoryTab, setCategoryTab] = useState<CategoryTab>("전체")

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

  const handleSourceTabChange = useCallback((index: 0 | 1 | 2) => {
    setSourceTabIndex(index)
    setCategoryTab("전체")
    setQuery("")
  }, [])

  const renderItem = useCallback(({ item }: { item: EducationMaterial }) => {
    const badgeColor = SUBCATEGORY_COLORS[item.subcategory]
    return (
      <TouchableOpacity
        style={S.$card}
        activeOpacity={0.7}
        onPress={() => navigation.navigate("EducationMaterialDetail", { id: item.id })}
      >
        <View style={S.$cardTopRow}>
          <View style={[S.$cardBadge, { backgroundColor: badgeColor.bg }]}>
            <Text text={item.subcategory} style={[S.$cardBadgeText, { color: badgeColor.text }]} />
          </View>
          <Text text={item.datetime} style={S.$cardDate} />
        </View>

        <Text text={item.title} style={S.$cardTitle} numberOfLines={2} />
        <Text text={item.fileName} style={S.$cardFileName} numberOfLines={1} />

        <View style={S.$cardDivider} />

        <View style={S.$cardBottomRow}>
          <Text text={`${item.author} · ${item.department}`} style={S.$cardAuthor} />
          <Text text={SOURCE_LABELS[item.source]} style={S.$cardSource} />
        </View>
      </TouchableOpacity>
    )
  }, [])

  return (
    <StackScreen
      title={translate("educationMaterialScreen:title")}
      onBack={() => navigation.goBack()}
      squareTop
      contentBg="#FFFFFF"
    >
      <View style={{ flex: 1 }}>
        {/* 소스 탭 바 */}
        <View style={Shared.$sourceTabBar}>
          {sourceTabs.map((label, index) => {
            const isActive = index === sourceTabIndex
            return (
              <TouchableOpacity
                key={index}
                style={[Shared.$sourceTab, isActive && Shared.$sourceTabActive]}
                activeOpacity={0.7}
                onPress={() => handleSourceTabChange(index as 0 | 1 | 2)}
              >
                <Text
                  text={label}
                  style={[Shared.$sourceTabText, isActive && Shared.$sourceTabTextActive]}
                />
              </TouchableOpacity>
            )
          })}
        </View>

        {/* 검색 바 — 내가 만든 자료 탭에서는 숨김 */}
        {sourceTabIndex !== 2 && (
          <View style={Shared.$searchSection}>
            <View style={Shared.$searchRow}>
              <IconSearch size={24} color="#A9AAAC" />
              <TextInput
                style={Shared.$searchInput}
                value={query}
                onChangeText={setQuery}
                placeholder={translate("educationSelectScreen:searchPlaceholder")}
                placeholderTextColor="#ACAEB1"
                returnKeyType="search"
              />
            </View>
          </View>
        )}

        {hasSourceData ? (
          <>
            {/* 카테고리 탭 — 내가 만든 자료 탭에서는 숨김 */}
            {sourceTabIndex !== 2 && (
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={Shared.$categoryScrollView}
                contentContainerStyle={Shared.$categoryRow}
              >
                {CATEGORY_TABS.map((cat) => {
                  const isActive = cat === categoryTab
                  return (
                    <TouchableOpacity
                      key={cat}
                      style={[Shared.$categoryChip, isActive && Shared.$categoryChipActive]}
                      activeOpacity={0.7}
                      onPress={() => setCategoryTab(cat)}
                    >
                      <Text
                        text={cat}
                        style={[
                          Shared.$categoryChipText,
                          isActive && Shared.$categoryChipTextActive,
                        ]}
                      />
                    </TouchableOpacity>
                  )
                })}
              </ScrollView>
            )}

            {/* 카드 리스트 */}
            <FlatList
              data={filtered}
              keyExtractor={(item) => String(item.id)}
              renderItem={renderItem}
              contentContainerStyle={[Shared.$listContent, filtered.length === 0 && { flex: 1 }]}
              showsVerticalScrollIndicator={false}
              keyboardShouldPersistTaps="handled"
              ListEmptyComponent={
                <View style={Shared.$emptyContainer}>
                  <TbmEmptyImage width={150} height={162} />
                  <Text
                    text={translate("educationSelectScreen:emptyText")}
                    style={Shared.$emptyText}
                  />
                </View>
              }
            />
          </>
        ) : (
          <View style={Shared.$emptyContainer}>
            <TbmEmptyImage width={150} height={162} />
            <Text text={translate("educationSelectScreen:emptyText")} style={Shared.$emptyText} />
          </View>
        )}
      </View>

      {sourceTabIndex === 2 && (
        <View style={[S.$registerBar, { paddingBottom: bottom + 16 }]}>
          <TouchableOpacity
            style={S.$registerBtn}
            activeOpacity={0.8}
            onPress={() => navigation.navigate("EducationMaterialRegister")}
          >
            <IconPlus size={20} color="#FFFFFF" strokeWidth={2} />
            <Text
              text={translate("educationMaterialScreen:registerButton")}
              style={S.$registerBtnText}
            />
          </TouchableOpacity>
        </View>
      )}
    </StackScreen>
  )
}
