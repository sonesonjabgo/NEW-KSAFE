import { FC } from "react"
import { Linking, ScrollView, TouchableOpacity, View } from "react-native"
import { IconDownload } from "@tabler/icons-react-native"
import { format, parseISO } from "date-fns"
import { observer } from "mobx-react-lite"
import { useSafeAreaInsets } from "react-native-safe-area-context"

import EducationFrame from "@assets/icons/education_frame.svg"

import { StackScreen } from "@/components/StackScreen"
import { Text } from "@/components/Text"
import { translate } from "@/i18n/translate"
import { useStores } from "@/models"
import type { AppStackScreenProps } from "@/navigators/navigationTypes"

import * as S from "./styles"

type TbmJoinInfoScreenProps = AppStackScreenProps<"TbmJoinInfo">

function formatDate(iso?: string | null): string {
  if (!iso) return "-"
  try {
    return format(parseISO(iso), "yyyy.MM.dd")
  } catch {
    return iso
  }
}

export const TbmJoinInfoScreen: FC<TbmJoinInfoScreenProps> = observer(function TbmJoinInfoScreen({
  navigation,
  route,
}) {
  const insets = useSafeAreaInsets()
  const { id } = route.params
  const { tbmStore } = useStores()
  const session = tbmStore.selectedSession

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
          {/* 상단 정보 카드 */}
          <View style={S.$infoCard}>
            <View style={S.$iconCircle}>
              <EducationFrame width={24} height={24} color="#FFFFFF" />
            </View>
            <View style={S.$cardTexts}>
              <Text text={translate("tbmJoinInfoScreen:sectionInfo")} style={S.$cardTitle} />
              <Text
                text={`${session?.createdByName ?? "-"}  ·  ${formatDate(session?.workDate)}`}
                style={S.$cardSubtitle}
              />
            </View>
          </View>

          {/* TBM 제목 */}
          <Text text={session?.title ?? "-"} style={S.$title} />

          {/* 첨부파일 */}
          <View>
            <Text
              text={translate("tbmJoinInfoScreen:sectionAttachments")}
              style={S.$attachHeading}
            />
            {(session?.materials ?? []).length > 0 ? (
              session?.materials.map((mat) => (
                <TouchableOpacity
                  key={mat.id}
                  style={S.$attachCard}
                  activeOpacity={0.7}
                  onPress={() => Linking.openURL(mat.fileUrl).catch(() => {})}
                >
                  <EducationFrame width={22} height={22} color="#1062D8" />
                  <Text text={mat.title} style={S.$attachName} numberOfLines={1} />
                  <IconDownload size={20} color="#1062D8" />
                </TouchableOpacity>
              ))
            ) : (
              <View style={S.$attachCard}>
                <EducationFrame width={22} height={22} color="#1062D8" />
                <Text
                  text={translate("tbmJoinInfoScreen:noAttachments")}
                  style={S.$attachName}
                  numberOfLines={1}
                />
              </View>
            )}
          </View>
        </ScrollView>

        <View style={S.$buttonDivider} />
        <View style={[S.$buttonRow, { paddingBottom: insets.bottom + 28 }]}>
          <TouchableOpacity
            style={S.$prevBtn}
            activeOpacity={0.75}
            onPress={() => navigation.goBack()}
          >
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
})
