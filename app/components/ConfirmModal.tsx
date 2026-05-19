import { FC, ReactNode } from "react"
import { Modal, Pressable, TextStyle, TouchableOpacity, View, ViewStyle } from "react-native"

import { Text } from "@/components/Text"
import { typography } from "@/theme/typography"

interface ConfirmModalProps {
  visible: boolean
  icon: ReactNode
  title: string
  message: string
  cancelLabel?: string
  confirmLabel: string
  confirmBgColor: string
  onCancel?: () => void
  onConfirm: () => void
}

export const ConfirmModal: FC<ConfirmModalProps> = ({
  visible,
  icon,
  title,
  message,
  cancelLabel,
  confirmLabel,
  confirmBgColor,
  onCancel,
  onConfirm,
}) => {
  return (
    <Modal visible={visible} transparent animationType="fade" statusBarTranslucent>
      <Pressable style={$overlay} onPress={onCancel ?? (() => {})}>
        <Pressable onPress={() => {}} style={$card}>
          {icon}
          <Text text={title} style={$title} />
          <Text text={message} style={$message} />
          <View style={$btnRow}>
            {cancelLabel && (
              <TouchableOpacity style={$cancelBtn} activeOpacity={0.7} onPress={onCancel}>
                <Text text={cancelLabel} style={$cancelBtnText} />
              </TouchableOpacity>
            )}
            <TouchableOpacity
              style={[$confirmBtn, { backgroundColor: confirmBgColor }]}
              activeOpacity={0.8}
              onPress={onConfirm}
            >
              <Text text={confirmLabel} style={$confirmBtnText} />
            </TouchableOpacity>
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  )
}

const $overlay: ViewStyle = {
  flex: 1,
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  justifyContent: "center",
  alignItems: "center",
}

const $card: ViewStyle = {
  width: 330,
  backgroundColor: "#FFFFFF",
  borderRadius: 18,
  paddingHorizontal: 24,
  paddingTop: 28,
  paddingBottom: 24,
  alignItems: "center",
  gap: 10,
}

const $title: TextStyle = {
  fontSize: 17,
  fontFamily: typography.primary.bold,
  color: "#111111",
  textAlign: "center",
}

const $message: TextStyle = {
  fontSize: 14,
  fontFamily: typography.primary.normal,
  color: "#555555",
  textAlign: "center",
  lineHeight: 22,
}

const $btnRow: ViewStyle = {
  flexDirection: "row",
  gap: 10,
  width: "100%",
  marginTop: 6,
}

const $cancelBtn: ViewStyle = {
  flex: 1,
  height: 50,
  borderRadius: 10,
  borderWidth: 1,
  borderColor: "#D3D3D3",
  justifyContent: "center",
  alignItems: "center",
}

const $cancelBtnText: TextStyle = {
  fontSize: 15,
  fontFamily: typography.primary.semiBold,
  color: "#4C4C4C",
}

const $confirmBtn: ViewStyle = {
  flex: 1,
  height: 50,
  borderRadius: 10,
  justifyContent: "center",
  alignItems: "center",
}

const $confirmBtnText: TextStyle = {
  fontSize: 15,
  fontFamily: typography.primary.semiBold,
  color: "#FFFFFF",
}
