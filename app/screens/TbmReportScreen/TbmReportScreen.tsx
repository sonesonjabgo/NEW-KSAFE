import { FC, useState } from "react"
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native"
import { IconAlertTriangle, IconCalendar, IconPlus } from "@tabler/icons-react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"

import { StackScreen } from "@/components/StackScreen"
import { Text } from "@/components/Text"
import { translate } from "@/i18n/translate"
import { mockTbmDetails } from "@/screens/TbmDetailScreen/mockData"

import * as S from "./styles"
import type { TbmReportScreenProps } from "./types"

export const TbmReportScreen: FC<TbmReportScreenProps> = ({ navigation, route }) => {
  const { id } = route.params
  const insets = useSafeAreaInsets()

  const detail = mockTbmDetails[id]

  const [processName, setProcessName] = useState("")
  const [teamName, setTeamName] = useState("")
  const [educationSummary, setEducationSummary] = useState("")
  const [specialNotes, setSpecialNotes] = useState("")
  const [photos, setPhotos] = useState<string[]>([])

  if (!detail) return null

  return (
    <StackScreen
      title={translate("tbmReportScreen:title")}
      onBack={() => navigation.goBack()}
      squareTop
      contentBg="#FFFFFF"
    >
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          style={S.$scrollContent}
          contentContainerStyle={[S.$scrollInner, { paddingBottom: (insets.bottom || 0) + 40 }]}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* ── 1+2. 주의사항 + 활동명 카드 (간격 20, 아래 섹션과 40) ── */}
          <View style={{ gap: 20, marginBottom: 5 }}>
          <View style={S.$noticeCard}>
            <View style={S.$noticeRow}>
              <View style={{ paddingVertical: 6 }}>
                <IconAlertTriangle size={22} color="#F7A733" />
              </View>
              <Text
                text={translate("tbmReportScreen:notice.description")}
                style={S.$noticeDesc}
              />
            </View>
          </View>

          {/* ── 2. TBM 활동명 카드 ── */}
          <View style={S.$activityNameCard}>
            <View style={S.$activityNameInfo}>
              <Text
                text={translate("tbmReportScreen:activityName.label")}
                style={S.$activityNameLabel}
              />
              <Text text={detail.title} style={S.$activityNameText} />
            </View>
            <View style={S.$activityNameCircle}>
              <IconCalendar size={22} color="#1062D8" />
            </View>
          </View>
          </View>

          {/* ── 3. 공정명 ── */}
          <View style={S.$section}>
            <Text
              text={translate("tbmReportScreen:processName.label")}
              style={S.$sectionLabel}
            />
            <View style={S.$inputRow}>
              <TextInput
                style={S.$inputText}
                value={processName}
                onChangeText={setProcessName}
                placeholder={translate("tbmReportScreen:processName.placeholder")}
                placeholderTextColor="#BBBBBB"
              />
            </View>
          </View>

          {/* ── 4. 팀/반명 ── */}
          <View style={S.$section}>
            <Text
              text={translate("tbmReportScreen:teamName.label")}
              style={S.$sectionLabel}
            />
            <View style={S.$inputRow}>
              <TextInput
                style={S.$inputText}
                value={teamName}
                onChangeText={setTeamName}
                placeholder={translate("tbmReportScreen:teamName.placeholder")}
                placeholderTextColor="#BBBBBB"
              />
            </View>
          </View>

          {/* ── 5. 교육 내용 요약 ── */}
          <View style={S.$section}>
            <Text
              text={translate("tbmReportScreen:educationSummary.label")}
              style={S.$sectionLabel}
            />
            <View style={S.$textarea}>
              <TextInput
                style={S.$textareaInput}
                value={educationSummary}
                onChangeText={setEducationSummary}
                placeholder={translate("tbmReportScreen:educationSummary.placeholder")}
                placeholderTextColor="#BBBBBB"
                multiline
                scrollEnabled={false}
              />
            </View>
          </View>

          {/* ── 6. 특이사항 ── */}
          <View style={S.$section}>
            <Text
              text={translate("tbmReportScreen:specialNotes.label")}
              style={S.$sectionLabel}
            />
            <View style={S.$textarea}>
              <TextInput
                style={S.$textareaInput}
                value={specialNotes}
                onChangeText={setSpecialNotes}
                placeholder={translate("tbmReportScreen:specialNotes.placeholder")}
                placeholderTextColor="#BBBBBB"
                multiline
                scrollEnabled={false}
              />
            </View>
          </View>

          {/* ── 7. 현장 사진 ── */}
          <View style={[S.$section, { borderBottomWidth: 0 }]}>
            <Text
              text={translate("tbmReportScreen:sitePhotos.label")}
              style={S.$sectionLabel}
            />
            <View style={S.$photoGrid}>
              <TouchableOpacity
                style={S.$photoAddBtn}
                activeOpacity={0.7}
                onPress={() => console.log("사진 추가")}
              >
                <IconPlus size={22} color="#AAAAAA" />
                <Text
                  text={translate("tbmReportScreen:sitePhotos.addButton")}
                  style={S.$photoAddText}
                />
              </TouchableOpacity>
              {photos.map((uri, i) => (
                <Image key={i} source={{ uri }} style={S.$photoItem} />
              ))}
            </View>
          </View>
        </ScrollView>

        {/* ── 하단 생성 버튼 ── */}
        <View style={[S.$submitBar, { paddingBottom: (insets.bottom || 0) + 16 }]}>
          <TouchableOpacity
            style={S.$submitBtn}
            activeOpacity={0.8}
            onPress={() => console.log("보고서 생성:", detail.id)}
          >
            <Text text={translate("tbmReportScreen:submit")} style={S.$submitBtnText} />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </StackScreen>
  )
}
