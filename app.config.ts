import { ExpoConfig, ConfigContext } from "@expo/config"

/**
 * Use tsx/cjs here so we can use TypeScript for our Config Plugins
 * and not have to compile them to JavaScript.
 *
 * See https://docs.expo.dev/config-plugins/plugins/#add-typescript-support-and-convert-to-dynamic-app-config
 */
import "tsx/cjs"

/**
 * @param config ExpoConfig coming from the static config app.json if it exists
 *
 * You can read more about Expo's Configuration Resolution Rules here:
 * https://docs.expo.dev/workflow/configuration/#configuration-resolution-rules
 */
module.exports = ({ config }: ConfigContext): Partial<ExpoConfig> => {
  const existingPlugins = config.plugins ?? []

  return {
    ...config,
    ios: {
      ...config.ios,
      privacyManifests: {
        NSPrivacyAccessedAPITypes: [
          {
            NSPrivacyAccessedAPIType: "NSPrivacyAccessedAPICategoryUserDefaults",
            NSPrivacyAccessedAPITypeReasons: ["CA92.1"],
          },
        ],
      },
      infoPlist: {
        ...((config.ios as any)?.infoPlist ?? {}),
        NSCameraUsageDescription:
          "QR 스캔, AI 번역 촬영, 위험 증적 기록을 위해 카메라 접근이 필요합니다.",
        NSMicrophoneUsageDescription:
          "음성 번역, 무선 통화, 음성 인식 기능을 위해 마이크 접근이 필요합니다.",
        NSPhotoLibraryUsageDescription:
          "AI 위험성 평가, 이미지 번역, TBM/보고서 자료 첨부를 위해 사진 라이브러리 접근이 필요합니다.",
        NSPhotoLibraryAddUsageDescription:
          "촬영한 사진을 라이브러리에 저장하기 위해 접근이 필요합니다.",
      },
    },
    plugins: [...existingPlugins, "expo-notifications"],
  }
}
