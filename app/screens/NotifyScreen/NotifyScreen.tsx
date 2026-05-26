import { FC, useState } from "react"
import { ScrollView, TouchableOpacity, View } from "react-native"
import { useNavigation } from "@react-navigation/native"
import {
  IconBell,
  IconBellFilled,
  IconBellOff,
  IconChecks,
  IconTrash,
} from "@tabler/icons-react-native"

import { StackScreen } from "@/components/StackScreen"
import { Text } from "@/components/Text"
import { translate } from "@/i18n/translate"
import { colors } from "@/theme/colors"
import { useResponsive } from "@/theme/responsive"

import * as S from "./styles"

type NotificationItem = {
  id: string
  title: string
  description: string
  time: string
  isRead: boolean
}

export const NotifyScreen: FC = () => {
  const navigation = useNavigation()

  const {
    width,
    height,
    isSmallPhone,
    isBasePhone,
    isLargePhone,
    isTablet,
    isShortHeight,
    breakpoint,
  } = useResponsive()

  const [notifications, setNotifications] = useState<NotificationItem[]>(() => [
    {
      id: "1",
      title: "테스트",
      description: "테스트입니다.",
      time: "방금 전",
      isRead: false,
    },
    {
      id: "2",
      title: translate("notify:mock.boardNewPost.title"),
      description: translate("notify:mock.boardNewPost.description"),
      time: "1분 전",
      isRead: false,
    },
  ])

  const hasUnread = notifications.some((n) => !n.isRead)

  const handleMarkAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })))
  }

  const handleDeleteAll = () => {
    setNotifications([])
  }

  // 리스트 영역 padding / gap
  const listPaddingH = isSmallPhone ? 16 : isBasePhone ? 22 : isLargePhone ? 24 : 32
  const listPaddingTop = isSmallPhone || isShortHeight ? 12 : 17
  const listPaddingBottom = isSmallPhone || isShortHeight ? 24 : 32
  const listGap = isSmallPhone || isShortHeight ? 12 : isBasePhone ? 17 : isLargePhone ? 18 : 16

  // 카드 padding
  const cardPaddingH = isSmallPhone ? 12 : isLargePhone || isTablet ? 18 : 16
  const cardPaddingV = isSmallPhone || isShortHeight ? 10 : isLargePhone || isTablet ? 16 : 14

  // 아이콘 원형 크기
  const circleSize = isSmallPhone ? 32 : isLargePhone || isTablet ? 42 : 38
  const iconSize = isSmallPhone ? 15 : isLargePhone || isTablet ? 20 : 18

  // 카드 텍스트 크기 — breakpoint 직접 사용
  const titleFontSize =
    breakpoint === "smallPhone"
      ? 13
      : breakpoint === "largePhone" || breakpoint === "tablet"
        ? 15
        : 14
  const descFontSize = isSmallPhone ? 12 : 14
  const timeFontSize = isSmallPhone ? 11 : 13

  // Empty State 크기
  const emptyCircleSize = isShortHeight
    ? Math.min(Math.floor(height * 0.12), 96)
    : isSmallPhone
      ? 96
      : isTablet
        ? 140
        : 120
  const emptyCircleMarginBottom = isSmallPhone || isShortHeight ? 16 : isTablet ? 28 : 24
  const emptyIconSize = isSmallPhone ? 36 : isTablet ? 52 : 44
  const emptyTitleFontSize = isSmallPhone ? 15 : isTablet ? 20 : 17
  const emptyTitleMarginBottom = isSmallPhone ? 8 : 10
  const emptyDescFontSize = isSmallPhone ? 12 : isTablet ? 14 : 13
  const emptyPaddingH = isSmallPhone
    ? 32
    : isTablet
      ? Math.max(Math.floor((width - 700) / 2 + 48), 48)
      : 40

  return (
    <StackScreen
      title={translate("notify:title")}
      onBack={() => navigation.goBack()}
      contentBg={colors.screenBg}
      squareTop
      rightSlot={
        <View style={S.$headerActions}>
          <TouchableOpacity
            style={S.$headerIconBtn}
            activeOpacity={0.7}
            onPress={handleMarkAllRead}
          >
            <IconChecks size={22} color={hasUnread ? colors.blue : "#FFFFFF"} />
          </TouchableOpacity>
          <TouchableOpacity style={S.$headerIconBtn} activeOpacity={0.7} onPress={handleDeleteAll}>
            <IconTrash size={22} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      }
    >
      <View style={S.$body}>
        {notifications.length === 0 ? (
          /* ── Empty State ── */
          <View style={S.$emptyContainer}>
            <View style={[S.$emptyState, { paddingHorizontal: emptyPaddingH }]}>
              <View
                style={[
                  S.$emptyCircle,
                  {
                    width: emptyCircleSize,
                    height: emptyCircleSize,
                    borderRadius: emptyCircleSize / 2,
                    marginBottom: emptyCircleMarginBottom,
                  },
                ]}
              >
                <IconBellOff size={emptyIconSize} color="#9CA3AF" strokeWidth={1.5} />
              </View>
              <Text
                style={[
                  S.$emptyTitle,
                  { fontSize: emptyTitleFontSize, marginBottom: emptyTitleMarginBottom },
                ]}
              >
                {translate("notify:emptyTitle")}
              </Text>
              <Text style={[S.$emptyDesc, { fontSize: emptyDescFontSize }]}>
                {translate("notify:emptyDescription")}
              </Text>
            </View>
          </View>
        ) : (
          /* ── 알림 리스트 ── */
          <ScrollView showsVerticalScrollIndicator={false}>
            <View
              style={[
                S.$listArea,
                {
                  paddingHorizontal: listPaddingH,
                  paddingTop: listPaddingTop,
                  paddingBottom: listPaddingBottom,
                  gap: listGap,
                },
                isTablet ? S.$listAreaTablet : undefined,
              ]}
            >
              {notifications.map((item) => (
                <View
                  key={item.id}
                  style={[
                    S.$card,
                    item.isRead ? S.$cardRead : undefined,
                    { paddingHorizontal: cardPaddingH, paddingVertical: cardPaddingV },
                  ]}
                >
                  <View
                    style={[
                      S.$cardIconCircle,
                      item.isRead ? S.$cardIconCircleRead : undefined,
                      { width: circleSize, height: circleSize, borderRadius: circleSize / 2 },
                    ]}
                  >
                    {item.isRead ? (
                      <IconBell size={iconSize} color={colors.blue} strokeWidth={1.5} />
                    ) : (
                      <IconBellFilled size={iconSize} color="#FFFFFF" />
                    )}
                  </View>

                  <View style={S.$cardContent}>
                    <Text style={[S.$cardTitle, { fontSize: titleFontSize }]}>{item.title}</Text>
                    <Text style={[S.$cardDesc, { fontSize: descFontSize }]}>
                      {item.description}
                    </Text>
                    <Text style={[S.$cardTime, { fontSize: timeFontSize }]}>{item.time}</Text>
                  </View>

                  {!item.isRead && <View style={S.$unreadDot} />}
                </View>
              ))}
            </View>
          </ScrollView>
        )}
      </View>
    </StackScreen>
  )
}
