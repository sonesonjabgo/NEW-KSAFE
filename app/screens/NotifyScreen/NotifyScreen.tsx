import { FC } from "react"
import { TouchableOpacity, View } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { IconBellOff, IconChecks, IconTrash } from "@tabler/icons-react-native"

import { StackScreen } from "@/components/StackScreen"
import { Text } from "@/components/Text"
import { translate } from "@/i18n/translate"

import { styles } from "./styles"

export const NotifyScreen: FC = () => {
  const navigation = useNavigation()

  return (
    <StackScreen
      title={translate("notify:title")}
      onBack={() => navigation.goBack()}
      contentBg="#F9FAFE"
      rightSlot={
        <View style={{ flexDirection: "row", gap: 4 }}>
          <TouchableOpacity style={styles.headerIconBtn} activeOpacity={0.7}>
            <IconChecks size={22} color="#FFFFFF" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerIconBtn} activeOpacity={0.7}>
            <IconTrash size={22} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      }
    >
      <View style={styles.body}>
        <View style={styles.emptyState}>
          <View style={styles.emptyCircle}>
            <IconBellOff size={44} color="#9CA3AF" strokeWidth={1.5} />
          </View>
          <Text style={styles.emptyTitle}>{translate("notify:emptyTitle")}</Text>
          <Text style={styles.emptyDesc}>{translate("notify:emptyDescription")}</Text>
        </View>
      </View>
    </StackScreen>
  )
}
