import { FC, useEffect, useRef, useState } from "react"
import {
  ActivityIndicator,
  Modal,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
  TextStyle,
} from "react-native"
import { IconX } from "@tabler/icons-react-native"
import WebView from "react-native-webview"

import { Text } from "@/components/Text"
import { translate } from "@/i18n/translate"
import { typography } from "@/theme/typography"

interface WebViewModalProps {
  visible: boolean
  url: string
  title: string
  onClose: () => void
}

const LOADING_TIMEOUT_MS = 8000

export const WebViewModal: FC<WebViewModalProps> = ({ visible, url, title, onClose }) => {
  const [loading, setLoading] = useState(true)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)

  // URL 또는 visible이 바뀔 때 loading 초기화
  useEffect(() => {
    if (visible && url) {
      setLoading(true)
    }
  }, [visible, url])

  // loading true → 8초 후 자동 해제 fallback
  useEffect(() => {
    if (loading) {
      timeoutRef.current = setTimeout(() => setLoading(false), LOADING_TIMEOUT_MS)
    }
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [loading])

  const stopLoading = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    setLoading(false)
  }

  return (
    <Modal visible={visible} animationType="slide" statusBarTranslucent onRequestClose={onClose}>
      <SafeAreaView style={$safeArea}>
        <StatusBar barStyle="dark-content" />

        {/* Header */}
        <View style={$header}>
          <View style={$headerLeft} />
          <Text text={title} style={$headerTitle} numberOfLines={1} />
          <TouchableOpacity style={$closeBtn} onPress={onClose} activeOpacity={0.7}>
            <IconX size={22} color="#333333" strokeWidth={2} />
          </TouchableOpacity>
        </View>

        {/* WebView */}
        <View style={$webViewContainer}>
          <WebView
            source={{ uri: url }}
            onLoadStart={() => setLoading(true)}
            onLoadEnd={stopLoading}
            onError={stopLoading}
            onHttpError={stopLoading}
            style={$webView}
          />

          {/* Loading overlay */}
          {loading && (
            <View style={$loadingOverlay}>
              <ActivityIndicator size="large" color="#1062D8" />
              <Text
                text={`${title}${translate("homeScreen:footer.webViewLoading")}`}
                style={$loadingTitle}
              />
              <Text text={translate("homeScreen:footer.webViewLoadingWait")} style={$loadingDesc} />
            </View>
          )}
        </View>
      </SafeAreaView>
    </Modal>
  )
}

const $safeArea: ViewStyle = {
  flex: 1,
  backgroundColor: "#FFFFFF",
}

const $header: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  height: 52,
  paddingHorizontal: 16,
  borderBottomWidth: 1,
  borderBottomColor: "#ECECEC",
  backgroundColor: "#FFFFFF",
}

const $headerLeft: ViewStyle = {
  width: 36,
}

const $headerTitle: TextStyle = {
  flex: 1,
  fontSize: 16,
  fontFamily: typography.primary.semiBold,
  color: "#1A1A1A",
  textAlign: "center",
}

const $closeBtn: ViewStyle = {
  width: 36,
  height: 36,
  alignItems: "center",
  justifyContent: "center",
}

const $webViewContainer: ViewStyle = {
  flex: 1,
}

const $webView: ViewStyle = {
  flex: 1,
}

const $loadingOverlay: ViewStyle = {
  ...StyleSheet.absoluteFillObject,
  backgroundColor: "#FFFFFF",
  alignItems: "center",
  justifyContent: "center",
  gap: 12,
}

const $loadingTitle: TextStyle = {
  fontSize: 15,
  fontFamily: typography.primary.semiBold,
  color: "#1A1A1A",
  textAlign: "center",
}

const $loadingDesc: TextStyle = {
  fontSize: 13,
  fontFamily: typography.primary.normal,
  color: "#888888",
  textAlign: "center",
}
