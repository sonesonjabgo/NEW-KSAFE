import { FC, useCallback, useMemo, useState } from "react"
import { ActivityIndicator, FlatList, TextInput, TouchableOpacity, View } from "react-native"
import { useFocusEffect } from "@react-navigation/native"
import { IconPlus, IconSearch } from "@tabler/icons-react-native"
import { observer } from "mobx-react-lite"
import { useSafeAreaInsets } from "react-native-safe-area-context"

import TbmEmptyImage from "@assets/images/tbm-empty.svg"

import { StackScreen } from "@/components/StackScreen"
import { Text } from "@/components/Text"
import { translate } from "@/i18n/translate"
import { useStores } from "@/models"
import { AppStackScreenProps } from "@/navigators/navigationTypes"
import * as Shared from "@/screens/EducationSelectScreen/styles"
import { EducationListItem, EducationSource } from "@/screens/EducationSelectScreen/types"

import * as S from "./styles"

type EducationMaterialScreenProps = AppStackScreenProps<"EducationMaterial">

const BADGE_COLORS: Record<string, { bg: string; text: string }> = {
  공통: { bg: "#E6F0FD", text: "#1062D8" },
  감전사고: { bg: "#FDECEA", text: "#C62828" },
  기계점검보수: { bg: "#E8F5E9", text: "#2E7D32" },
}
const DEFAULT_BADGE_COLOR = { bg: "#E6F0FD", text: "#1062D8" }

const SOURCE_LABELS: Record<EducationSource, string> = {
  platform: "KS산업안전협회",
  company: "KS산업안전협회",
  mine: "내가 만든 자료",
}

function formatDate(dateStr: string): string {
  const d = new Date(dateStr)
  if (isNaN(d.getTime())) return dateStr
  const yyyy = d.getFullYear()
  const mm = String(d.getMonth() + 1).padStart(2, "0")
  const dd = String(d.getDate()).padStart(2, "0")
  const hh = String(d.getHours()).padStart(2, "0")
  const min = String(d.getMinutes()).padStart(2, "0")
  return `${yyyy}.${mm}.${dd} ${hh}:${min}`
}

export const EducationMaterialScreen: FC<EducationMaterialScreenProps> = observer(
  function EducationMaterialScreen({ navigation }) {
    const { bottom } = useSafeAreaInsets()
    const { educationStore } = useStores()

    const [sourceTabIndex, setSourceTabIndex] = useState<0 | 1 | 2>(0)
    const [query, setQuery] = useState("")
    const [selectedCategoryName, setSelectedCategoryName] = useState<string | null>(null)

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

    const handleSourceTabChange = useCallback(
      (index: 0 | 1 | 2) => {
        setSourceTabIndex(index)
        setSelectedCategoryName(null)
        setQuery("")
        if (index === 2 && educationStore.myItems.length === 0) {
          void educationStore.fetchMyItems()
        }
      },
      [educationStore],
    )

    const isLoading = educationStore.status === "pending"

    const renderItem = useCallback(
      ({ item }: { item: EducationListItem }) => {
        const badgeColor = item.categoryName
          ? (BADGE_COLORS[item.categoryName] ?? DEFAULT_BADGE_COLOR)
          : DEFAULT_BADGE_COLOR
        return (
          <TouchableOpacity
            style={S.$card}
            activeOpacity={0.7}
            onPress={() =>
              navigation.navigate("EducationMaterialDetail", { id: item.id, source: item.source })
            }
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
              <Text text={formatDate(item.createdAt)} style={S.$cardDate} />
            </View>

            <Text text={item.title} style={S.$cardTitle} numberOfLines={2} />
            <Text text={item.fileName} style={S.$cardFileName} numberOfLines={1} />

            <View style={S.$cardDivider} />

            <View style={S.$cardBottomRow}>
              <Text text={item.createdByName ?? ""} style={S.$cardAuthor} />
              <Text text={SOURCE_LABELS[item.source]} style={S.$cardSource} />
            </View>
          </TouchableOpacity>
        )
      },
      [navigation],
    )

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

          {isLoading ? (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
              <ActivityIndicator size="large" color="#1062D8" />
            </View>
          ) : (
            <>
              {/* 카테고리 탭 — platform 탭(0)에서만 표시 */}
              {sourceTabIndex === 0 && educationStore.categories.length > 0 && (
                <View style={Shared.$categoryRow}>
                  {[null, ...educationStore.categories.map((c) => c.name)].map((cat) => {
                    const isActive = cat === selectedCategoryName
                    const label = cat ?? translate("educationSelectScreen:categoryAll")
                    return (
                      <TouchableOpacity
                        key={cat ?? "all"}
                        style={[Shared.$categoryChip, isActive && Shared.$categoryChipActive]}
                        activeOpacity={0.7}
                        onPress={() => setSelectedCategoryName(isActive ? null : cat)}
                      >
                        <Text
                          text={label}
                          style={[
                            Shared.$categoryChipText,
                            isActive && Shared.$categoryChipTextActive,
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
                contentContainerStyle={[
                  Shared.$listContent,
                  filtered.length === 0 && { flex: 1 },
                ]}
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
  },
)
