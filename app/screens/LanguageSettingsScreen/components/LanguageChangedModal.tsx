import { FC } from "react"
import { Modal, TouchableOpacity, View } from "react-native"
import { IconWorld } from "@tabler/icons-react-native"

import { Text } from "@/components/Text"

import { styles } from "../styles"

interface Props {
  isVisible: boolean
  title: string
  description: string
  confirmText: string
  onConfirm: () => void
}

export const LanguageChangedModal: FC<Props> = ({
  isVisible,
  title,
  description,
  confirmText,
  onConfirm,
}) => (
  <Modal visible={isVisible} transparent animationType="fade" onRequestClose={onConfirm}>
    <View style={styles.modalOverlay}>
      <View style={styles.modalCard}>
        <View style={styles.modalIconCircle}>
          <IconWorld size={36} color="#1062D8" />
        </View>

        <Text style={styles.modalTitle}>{title}</Text>

        <Text style={styles.modalDesc}>{description}</Text>

        <TouchableOpacity style={styles.modalConfirmBtn} activeOpacity={0.85} onPress={onConfirm}>
          <Text style={styles.modalBtnText}>{confirmText}</Text>
        </TouchableOpacity>
      </View>
    </View>
  </Modal>
)
