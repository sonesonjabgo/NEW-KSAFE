import { FC } from "react"
import { ScrollView, TouchableOpacity, View } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"

import { StackScreen } from "@/components/StackScreen"
import { Text } from "@/components/Text"
import { translate } from "@/i18n/translate"
import type { AppStackScreenProps } from "@/navigators/navigationTypes"
import { mockTbmJoinData } from "@/screens/TbmJoinScreen/mockData"

import * as S from "./styles"

type TbmJoinInfoScreenProps = AppStackScreenProps<"TbmJoinInfo">

export const TbmJoinInfoScreen: FC<TbmJoinInfoScreenProps> = ({ navigation, route }) => {
  const insets = useSafeAreaInsets()
  const { id } = route.params
  const tbm = mockTbmJoinData.find((item) => item.id === id)

  return (
    <StackScreen
      title={translate("tbmJoinInfoScreen:title")}
      onBack={() => navigation.goBack()}
      squareTop
    >
      <View style={S.$wrapper}>
        <ScrollView
          style={S.$container}
          contentContainerStyle={S.$scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={S.$section}>
            <Text text={translate("tbmJoinInfoScreen:sectionInfo")} style={S.$sectionHeading} />
            <View style={S.$infoCard}>
              <View style={S.$infoRow}>
                <Text text={translate("tbmJoinInfoScreen:activityName")} style={S.$infoLabel} />
                <Text text={tbm?.title ?? "-"} style={S.$infoValue} numberOfLines={2} />
              </View>
              <View style={S.$infoRowDivider} />
              <View style={S.$infoRow}>
                <Text text={translate("tbmJoinInfoScreen:manager")} style={S.$infoLabel} />
                <Text text={tbm?.authorName ?? "-"} style={S.$infoValue} />
              </View>
              <View style={S.$infoRowDivider} />
              <View style={S.$infoRow}>
                <Text text={translate("tbmJoinInfoScreen:date")} style={S.$infoLabel} />
                <Text text={tbm?.date ?? "-"} style={S.$infoValue} />
              </View>
            </View>
          </View>

          <View style={S.$section}>
            <Text text={translate("tbmJoinInfoScreen:sectionAttachments")} style={S.$sectionHeading} />
            <View style={S.$emptyAttachments}>
              <Text text={translate("tbmJoinInfoScreen:noAttachments")} style={S.$emptyAttachmentsText} />
            </View>
          </View>
        </ScrollView>

        <View style={S.$buttonDivider} />
        <View style={[S.$buttonRow, { paddingBottom: insets.bottom + 28 }]}>
          <TouchableOpacity style={S.$prevBtn} activeOpacity={0.75} onPress={() => navigation.goBack()}>
            <Text text={translate("tbmJoinInfoScreen:prev")} style={S.$prevBtnText} />
          </TouchableOpacity>
          <TouchableOpacity
            style={S.$nextBtn}
            activeOpacity={0.75}
            onPress={() => navigation.navigate("TbmJoinHealth", { id })}
          >
            <Text text={translate("tbmJoinInfoScreen:next")} style={S.$nextBtnText} />
          </TouchableOpacity>
        </View>
      </View>
    </StackScreen>
  )
}
