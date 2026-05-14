import { FC } from "react"
import { Modal, TouchableOpacity, View } from "react-native"
import { IconWorld } from "@tabler/icons-react-native"

import { Text } from "@/components/Text"

import { styles } from "../styles"

interface Props {
  isVisible: boolean
  languageName: string
  onConfirm: () => void
}

export const LanguageChangedModal: FC<Props> = ({ isVisible, languageName, onConfirm }) => (
  <Modal visible={isVisible} transparent animationType="fade" onRequestClose={onConfirm}>
    <View style={styles.modalOverlay}>
      <View style={styles.modalCard}>
        <View style={styles.modalIconCircle}>
          <IconWorld size={36} color="#1062D8" />
        </View>

        <Text style={styles.modalTitle}>언어 설정</Text>

        <Text style={styles.modalDesc}>
          {`언어가 ${languageName}(으)로 변경되었습니다.\n변경 사항 적용을 위해 앱을 다시 시작합니다.`}
        </Text>

        <TouchableOpacity style={styles.modalConfirmBtn} activeOpacity={0.85} onPress={onConfirm}>
          <Text style={styles.modalBtnText}>확인</Text>
        </TouchableOpacity>
      </View>
    </View>
  </Modal>
)
