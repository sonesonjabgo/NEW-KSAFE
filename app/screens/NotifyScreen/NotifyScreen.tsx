import { FC } from "react"
import { StatusBar, TouchableOpacity, View } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { IconBellOff, IconChecks, IconChevronLeft, IconTrash } from "@tabler/icons-react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"

import { Text } from "@/components/Text"

import { styles } from "./styles"

export const NotifyScreen: FC = () => {
  const navigation = useNavigation()
  const { top } = useSafeAreaInsets()

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#0B3069" />

      <View style={styles.root}>
        {/* 상단 네이비 헤더 */}
        <View style={[styles.header, { paddingTop: top + 12 }]}>
          <TouchableOpacity
            style={styles.headerIconBtn}
            activeOpacity={0.7}
            onPress={() => navigation.goBack()}
          >
            <IconChevronLeft size={24} color="#FFFFFF" />
          </TouchableOpacity>

          <Text style={styles.headerTitle}>알림</Text>

          <View style={styles.headerRightActions}>
            <TouchableOpacity style={styles.headerIconBtn} activeOpacity={0.7}>
              <IconChecks size={22} color="#FFFFFF" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.headerIconBtn} activeOpacity={0.7}>
              <IconTrash size={22} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
        </View>

        {/* 본문 */}
        <View style={styles.body}>
          {/* Empty State */}
          <View style={styles.emptyState}>
            <View style={styles.emptyCircle}>
              <IconBellOff size={44} color="#9CA3AF" strokeWidth={1.5} />
            </View>
            <Text style={styles.emptyTitle}>알림이 없습니다</Text>
            <Text style={styles.emptyDesc}>
              {"현재 받은 알림이 없습니다.\n새로운 알림이 도착하면 알려드리겠습니다."}
            </Text>
          </View>
        </View>
      </View>
    </>
  )
}
