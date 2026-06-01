import { Linking } from "react-native"
import { isAvailableAsync, shareAsync } from "expo-sharing"

const isRemotePdfUri = (uri: string) => /^https?:\/\//i.test(uri)

export const openPdfDocument = async (uri: string) => {
  if (isRemotePdfUri(uri)) {
    await Linking.openURL(uri)
    return
  }

  // 로컬 PDF는 shareAsync(Quick Look)를 우선 사용한다.
  // Linking.openURL(file://)은 iOS에서 Safari로 열려 HTML 소스가 노출될 수 있다.
  const canShare = await isAvailableAsync()
  if (canShare) {
    await shareAsync(uri, { UTI: ".pdf", mimeType: "application/pdf" })
    return
  }

  const canOpenLocally = await Linking.canOpenURL(uri).catch(() => false)
  if (canOpenLocally) {
    await Linking.openURL(uri)
    return
  }

  throw new Error("PDF를 열 수 없습니다.")
}
