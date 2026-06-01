import { Linking } from "react-native"
import { isAvailableAsync, shareAsync } from "expo-sharing"

const isRemotePdfUri = (uri: string) => /^https?:\/\//i.test(uri)

export const openPdfDocument = async (uri: string) => {
  if (isRemotePdfUri(uri)) {
    await Linking.openURL(uri)
    return
  }

  const canOpenLocally = await Linking.canOpenURL(uri).catch(() => false)
  if (canOpenLocally) {
    await Linking.openURL(uri)
    return
  }

  const canShare = await isAvailableAsync()
  if (canShare) {
    await shareAsync(uri, { UTI: ".pdf", mimeType: "application/pdf" })
    return
  }

  throw new Error("PDF를 열 수 없습니다.")
}
