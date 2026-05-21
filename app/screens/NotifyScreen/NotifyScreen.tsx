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

import { styles } from "./styles"

type NotificationItem = {
  id: string
  title: string
  description: string
  time: string
  isRead: boolean
}

export const NotifyScreen: FC = () => {
  const navigation = useNavigation()

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

  return (
    <StackScreen
      title={translate("notify:title")}
      onBack={() => navigation.goBack()}
      contentBg="#F9FAFE"
      squareTop
      rightSlot={
        <View style={styles.headerActions}>
          <TouchableOpacity
            style={styles.headerIconBtn}
            activeOpacity={0.7}
            onPress={handleMarkAllRead}
          >
            <IconChecks size={22} color={hasUnread ? "#1062D8" : "#FFFFFF"} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.headerIconBtn}
            activeOpacity={0.7}
            onPress={handleDeleteAll}
          >
            <IconTrash size={22} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      }
    >
      <View style={styles.body}>
        {notifications.length === 0 ? (
          <View style={styles.emptyContainer}>
            <View style={styles.emptyState}>
              <View style={styles.emptyCircle}>
                <IconBellOff size={44} color="#9CA3AF" strokeWidth={1.5} />
              </View>
              <Text style={styles.emptyTitle}>{translate("notify:emptyTitle")}</Text>
              <Text style={styles.emptyDesc}>{translate("notify:emptyDescription")}</Text>
            </View>
          </View>
        ) : (
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.listArea}>
              {notifications.map((item) => (
                <View key={item.id} style={[styles.card, item.isRead && styles.cardRead]}>
                  <View style={[styles.cardIconCircle, item.isRead && styles.cardIconCircleRead]}>
                    {item.isRead ? (
                      <IconBell size={18} color="#1062D8" strokeWidth={1.5} />
                    ) : (
                      <IconBellFilled size={18} color="#FFFFFF" />
                    )}
                  </View>
                  <View style={styles.cardContent}>
                    <Text style={styles.cardTitle}>{item.title}</Text>
                    <Text style={styles.cardDesc}>{item.description}</Text>
                    <Text style={styles.cardTime}>{item.time}</Text>
                  </View>
                  {!item.isRead && <View style={styles.unreadDot} />}
                </View>
              ))}
            </View>
          </ScrollView>
        )}
      </View>
    </StackScreen>
  )
}
