import { FC, useState } from "react"
import { FlatList, StatusBar, TouchableOpacity, View } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { IconChevronLeft } from "@tabler/icons-react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"

import { Text } from "@/components/Text"

import { LanguageChangedModal } from "./components/LanguageChangedModal"
import { LanguageOptionItem } from "./components/LanguageOptionItem"
import { styles } from "./styles"

type Language = {
  id: string
  label: string
  korName: string
}

const LANGUAGES: Language[] = [
  { id: "ko", label: "🇰🇷 한국어", korName: "한국어" },
  { id: "en", label: "🇺🇸 English (영어)", korName: "영어" },
  { id: "zh-cn", label: "🇨🇳 简体中文 (중국어(간체))", korName: "중국어(간체)" },
  { id: "zh-tw", label: "🇹🇼 繁體中文 (중국어(번체))", korName: "중국어(번체)" },
  { id: "ru", label: "🇷🇺 Русский (러시아어)", korName: "러시아어" },
  { id: "vi", label: "🇻🇳 Tiếng Việt (베트남어)", korName: "베트남어" },
  { id: "id", label: "🇮🇩 Bahasa Indonesia (인도네시아어)", korName: "인도네시아어" },
  { id: "km", label: "🇰🇭 ភាសាខ្មែរ (크메르어)", korName: "크메르어" },
  { id: "th", label: "🇹🇭 ไทย (태국어)", korName: "태국어" },
  { id: "ur", label: "🇵🇰 اردو (우르드어)", korName: "우르드어" },
  { id: "ne", label: "🇳🇵 नेपाली (네팔어)", korName: "네팔어" },
  { id: "lo", label: "🇱🇦 ພາສາລາວ (라오어)", korName: "라오어" },
]

export const LanguageSettingsScreen: FC = () => {
  const navigation = useNavigation()
  const { top } = useSafeAreaInsets()
  const [selectedId, setSelectedId] = useState("ko")
  const [modalVisible, setModalVisible] = useState(false)
  const [changedLanguageName, setChangedLanguageName] = useState("")

  const handleSelect = (id: string, korName: string) => {
    if (id === selectedId) return
    setSelectedId(id)
    setChangedLanguageName(korName)
    setModalVisible(true)
  }

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

          <Text style={styles.headerTitle}>언어 설정</Text>

          {/* 레이아웃 균형용 spacer */}
          <View style={styles.headerIconBtn} />
        </View>

        {/* 본문 — 리스트만 스크롤 */}
        <View style={styles.body}>
          <FlatList
            data={LANGUAGES}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
            ListHeaderComponent={<Text style={styles.guideText}>앱 언어를 바로 변경하세요.</Text>}
            renderItem={({ item }) => (
              <LanguageOptionItem
                label={item.label}
                isSelected={selectedId === item.id}
                onPress={() => handleSelect(item.id, item.korName)}
              />
            )}
          />
        </View>
      </View>

      <LanguageChangedModal
        isVisible={modalVisible}
        languageName={changedLanguageName}
        onConfirm={() => setModalVisible(false)}
      />
    </>
  )
}
