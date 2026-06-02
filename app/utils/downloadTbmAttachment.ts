import { Linking } from "react-native"
import { Asset } from "expo-asset"

export const downloadTbmAttachment = async () => {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const [asset] = await Asset.loadAsync(require("@assets/sampleTBMatt.pdf"))
  await Linking.openURL(asset.uri)
}
