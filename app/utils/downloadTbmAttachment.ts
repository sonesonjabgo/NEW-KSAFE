import { Platform } from "react-native"
import { Asset } from "expo-asset"
import { cacheDirectory, copyAsync } from "expo-file-system/legacy"

import { openPdfDocument } from "./openPdfDocument"

const FILE_NAME = "해빙기 안전수칙.pdf"

export const downloadTbmAttachment = async () => {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const [asset] = await Asset.loadAsync(require("@assets/sampleTBMatt.pdf"))

  if (Platform.OS === "web") {
    const response = await fetch(asset.uri)
    const blob = await response.blob()
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = FILE_NAME
    a.click()
    URL.revokeObjectURL(url)
    return
  }

  const sourceUri = asset.localUri ?? asset.uri
  const destUri = `${cacheDirectory}${FILE_NAME}`
  await copyAsync({ from: sourceUri, to: destUri })
  await openPdfDocument(destUri)
}
