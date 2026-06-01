import { FC, useRef, useState } from "react"
import {
  Animated,
  FlatList,
  Modal,
  Pressable,
  TouchableOpacity,
  View,
  ViewStyle,
  TextStyle,
} from "react-native"
import { ChevronDown, Building } from "lucide-react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"

import TbmFabIcon from "@assets/images/tbm-fab-icon.svg"

import { StackScreen } from "@/components/StackScreen"
import { Text } from "@/components/Text"
import { UserAvatar } from "@/components/UserAvatar"
import { translate } from "@/i18n/translate"
import { colors } from "@/theme/colors"
import { typography } from "@/theme/typography"

import type { PatrolScreenProps } from "./types"

type PatrolStatus = "underReview" | "inProgress" | "approved"

interface PatrolItem {
  id: string
  status: PatrolStatus
  date: string
  title: string
  reviewer: string
  approver: string
  author: string
  location: string
}

const WORKPLACES = [
  "서울 한강 레지던스 RC공사 현장",
  "부산 센텀 물류센터 현장",
  "대구 산업단지 신축 현장",
]

const MOCK_PATROL_ITEMS: PatrolItem[] = [
  {
    id: "1",
    status: "underReview",
    date: "2025.05.20 09:30",
    title: "작업장 순회 점검",
    reviewer: "김철수",
    approver: "이부장",
    author: "박민준",
    location: "서울 한강 레지던스 RC공사 현장",
  },
  {
    id: "2",
    status: "inProgress",
    date: "2025.05.19 14:15",
    title: "작업장 순회 점검",
    reviewer: "최영호",
    approver: "정과장",
    author: "홍길동",
    location: "서울 한강 레지던스 RC공사 현장",
  },
  {
    id: "3",
    status: "approved",
    date: "2025.05.18 11:00",
    title: "작업장 순회 점검",
    reviewer: "이영수",
    approver: "김부장",
    author: "이민호",
    location: "서울 한강 레지던스 RC공사 현장",
  },
  {
    id: "4",
    status: "underReview",
    date: "2025.05.17 16:45",
    title: "작업장 순회 점검",
    reviewer: "강현우",
    approver: "박팀장",
    author: "조성현",
    location: "서울 한강 레지던스 RC공사 현장",
  },
  {
    id: "5",
    status: "approved",
    date: "2025.05.16 08:20",
    title: "작업장 순회 점검",
    reviewer: "손민재",
    approver: "윤부장",
    author: "임준혁",
    location: "서울 한강 레지던스 RC공사 현장",
  },
  {
    id: "6",
    status: "inProgress",
    date: "2025.05.15 13:50",
    title: "작업장 순회 점검",
    reviewer: "오세훈",
    approver: "강부장",
    author: "유재석",
    location: "서울 한강 레지던스 RC공사 현장",
  },
  {
    id: "7",
    status: "underReview",
    date: "2025.05.14 10:05",
    title: "작업장 순회 점검",
    reviewer: "김영일",
    approver: "이대리",
    author: "최준",
    location: "서울 한강 레지던스 RC공사 현장",
  },
]

const BADGE_STYLES: Record<PatrolStatus, { bg: string; text: string }> = {
  underReview: { bg: "#FEECDF", text: "#FD9040" },
  inProgress: { bg: "#E5E6E9", text: "#606679" },
  approved: { bg: "#CFFFE0", text: "#18A24A" },
}

const PatrolCard: FC<{ item: PatrolItem; onPress: () => void }> = ({ item, onPress }) => {
  const badge = BADGE_STYLES[item.status]

  return (
    <TouchableOpacity style={$card} activeOpacity={0.75} onPress={onPress}>
      {/* 상단: 뱃지 + 날짜 */}
      <View style={[$cardTopRow, $rowGap]}>
        <View style={[$badge, { backgroundColor: badge.bg }]}>
          <Text
            text={translate(`patrolScreen:badge.${item.status}`)}
            style={[$badgeText, { color: badge.text }]}
          />
        </View>
        <Text text={item.date} style={$cardDate} />
      </View>

      {/* 제목 */}
      <Text text={item.title} style={[$cardTitle, $rowGap]} numberOfLines={1} />

      {/* 검토자 */}
      <View style={[$reviewRow, $rowGap]}>
        <Text text={translate("patrolScreen:card.reviewer")} style={$reviewLabel} />
        <Text text={item.reviewer} style={$reviewName} />
      </View>

      {/* 승인자 */}
      <View style={[$reviewRow, $rowGap]}>
        <Text text={translate("patrolScreen:card.approver")} style={$reviewLabel} />
        <Text text={item.approver} style={$reviewName} />
      </View>

      {/* 구분선 */}
      <View style={[$cardDivider, $rowGap]} />

      {/* 하단: 프로필 + 이름 + 현장 */}
      <View style={$cardMetaRow}>
        <UserAvatar initial={item.author.charAt(0)} size={24} />
        <Text text={item.author} style={$cardMetaAuthor} numberOfLines={1} />
        <Text text={` · ${item.location}`} style={$cardMetaLocation} numberOfLines={1} />
      </View>
    </TouchableOpacity>
  )
}

export const PatrolScreen: FC<PatrolScreenProps> = ({ navigation }) => {
  const insets = useSafeAreaInsets()
  const [selectedWorkplace, setSelectedWorkplace] = useState(WORKPLACES[0])
  const [showWorkplaceModal, setShowWorkplaceModal] = useState(false)
  const slideAnim = useRef(new Animated.Value(300)).current

  const openModal = () => {
    setShowWorkplaceModal(true)
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 250,
      useNativeDriver: true,
    }).start()
  }

  const closeModal = () => {
    Animated.timing(slideAnim, {
      toValue: 300,
      duration: 200,
      useNativeDriver: true,
    }).start(() => setShowWorkplaceModal(false))
  }

  return (
    <View style={$screenContainer}>
      <StackScreen
        title={translate("patrolScreen:title")}
        onBack={() => navigation.goBack()}
        squareTop
        contentBg="#FFFFFF"
      >
        <View style={$container}>
          <TouchableOpacity style={$workplaceSelector} activeOpacity={0.7} onPress={openModal}>
            <View>
              <Text
                text={translate("patrolScreen:workplaceSelector.label")}
                style={$workplaceLabel}
              />
              <Text text={selectedWorkplace} style={$workplaceName} numberOfLines={1} />
            </View>
            <ChevronDown size={35} color="#979797" strokeWidth={1.8} />
          </TouchableOpacity>

          <FlatList
            data={MOCK_PATROL_ITEMS}
            keyExtractor={(item) => item.id}
            contentContainerStyle={$listContent}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <PatrolCard
                item={item}
                onPress={() => navigation.navigate("PatrolDetail", { id: item.id })}
              />
            )}
          />
        </View>
      </StackScreen>

      <View style={[$fabWrapper, { bottom: 30 + insets.bottom }]} pointerEvents="box-none">
        <TouchableOpacity
          style={$fab}
          activeOpacity={0.8}
          onPress={() => navigation.navigate("PatrolCreate")}
        >
          <TbmFabIcon width={30} height={30} />
          <Text text={translate("patrolScreen:createButton")} style={$fabLabel} />
        </TouchableOpacity>
      </View>

      <Modal
        visible={showWorkplaceModal}
        transparent
        animationType="fade"
        onRequestClose={closeModal}
      >
        <Pressable style={$modalOverlay} onPress={closeModal}>
          <Animated.View style={[$modalContent, { transform: [{ translateY: slideAnim }] }]}>
            <Text
              text={translate("patrolScreen:workplaceSelector.modalTitle")}
              style={$modalTitle}
            />
            {WORKPLACES.map((workplace) => {
              const isSelected = selectedWorkplace === workplace
              return (
                <TouchableOpacity
                  key={workplace}
                  style={[$workplaceOption, isSelected && $workplaceOptionSelected]}
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
                    style={[$workplaceOptionText, isSelected && $workplaceOptionTextSelected]}
                    numberOfLines={2}
                  />
                </TouchableOpacity>
              )
            })}
          </Animated.View>
        </Pressable>
      </Modal>
    </View>
  )
}

// ── Screen ────────────────────────────────────────────────────────────────────

const $screenContainer: ViewStyle = {
  flex: 1,
}

const $container: ViewStyle = {
  flex: 1,
  paddingHorizontal: 22,
  paddingVertical: 15,
}

// ── Workplace Selector ────────────────────────────────────────────────────────

const $workplaceSelector: ViewStyle = {
  height: 52,
  flexDirection: "row",
  alignItems: "flex-end",
  justifyContent: "space-between",
}

const $workplaceLabel: TextStyle = {
  fontSize: 14,
  fontFamily: typography.primary.medium,
  color: "#555555",
}

const $workplaceName: TextStyle = {
  fontSize: 21,
  fontFamily: typography.primary.bold,
  color: "#000000",
}

// ── Card List ─────────────────────────────────────────────────────────────────

const $listContent: ViewStyle = {
  paddingTop: 20,
  paddingBottom: 120,
  gap: 25,
}

const $card: ViewStyle = {
  backgroundColor: "#FFFFFF",
  borderRadius: 12,
  borderWidth: 1,
  borderColor: "#ECECEC",
  paddingHorizontal: 16,
  paddingVertical: 16,
}

const $rowGap: ViewStyle = {
  marginBottom: 15,
}

const $cardTopRow: ViewStyle = {
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
}

const $badge: ViewStyle = {
  width: 44,
  height: 20,
  borderRadius: 4,
  justifyContent: "center",
  alignItems: "center",
}

const $badgeText: TextStyle = {
  fontSize: 10,
  fontFamily: typography.primary.semiBold,
}

const $cardDate: TextStyle = {
  fontSize: 12,
  fontFamily: typography.primary.normal,
  color: "#555555",
}

const $cardTitle: TextStyle = {
  fontSize: 17,
  fontFamily: typography.primary.bold,
  color: "#000000",
}

const $reviewRow: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
  gap: 21,
}

const $reviewLabel: TextStyle = {
  fontSize: 12,
  fontFamily: typography.primary.semiBold,
  color: "#555555",
}

const $reviewName: TextStyle = {
  fontSize: 12,
  fontFamily: typography.primary.semiBold,
  color: "#000000",
}

const $cardDivider: ViewStyle = {
  height: 1,
  backgroundColor: "#E9ECF0",
}

const $cardMetaRow: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
  gap: 6,
}

const $cardMetaAuthor: TextStyle = {
  fontSize: 12,
  fontFamily: typography.primary.semiBold,
  color: "#333333",
  flexShrink: 1,
  marginRight: 5,
}

const $cardMetaLocation: TextStyle = {
  fontSize: 12,
  fontFamily: typography.primary.normal,
  color: "#555555",
  flexShrink: 1,
}

// ── Floating Button ───────────────────────────────────────────────────────────

const $fabWrapper: ViewStyle = {
  position: "absolute",
  right: 20,
  alignItems: "center",
}

const $fab: ViewStyle = {
  width: 96,
  height: 96,
  borderRadius: 48,
  backgroundColor: colors.navy,
  justifyContent: "center",
  alignItems: "center",
  shadowColor: "#000000",
  shadowOffset: { width: 0, height: 6 },
  shadowOpacity: 0.3,
  shadowRadius: 16,
  elevation: 8,
}

const $fabLabel: TextStyle = {
  marginTop: 4,
  fontSize: 13,
  lineHeight: 16,
  color: "#FFFFFF",
  fontFamily: typography.primary.bold,
  textAlign: "center",
  includeFontPadding: false,
}

// ── Modal ─────────────────────────────────────────────────────────────────────

const $modalOverlay: ViewStyle = {
  flex: 1,
  backgroundColor: "rgba(0, 0, 0, 0.3)",
  justifyContent: "flex-end",
}

const $modalTitle: TextStyle = {
  fontSize: 17,
  fontFamily: typography.primary.medium,
  color: "#000000",
  paddingHorizontal: 20,
  marginBottom: 12,
}

const $modalContent: ViewStyle = {
  backgroundColor: "#FFFFFF",
  borderTopLeftRadius: 20,
  borderTopRightRadius: 20,
  paddingTop: 36,
  paddingBottom: 40,
}

const $workplaceOption: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
  gap: 12,
  height: 66,
  paddingHorizontal: 20,
}

const $workplaceOptionSelected: ViewStyle = {
  backgroundColor: "#E5F1FD",
}

const $workplaceOptionText: TextStyle = {
  flex: 1,
  fontSize: 17,
  fontFamily: typography.primary.medium,
  color: "#000000",
}

const $workplaceOptionTextSelected: TextStyle = {
  color: "#1062D8",
}
