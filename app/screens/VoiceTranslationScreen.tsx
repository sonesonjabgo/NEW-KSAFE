import { FC } from "react"
import { View, ViewStyle } from "react-native"

import { Text } from "@/components/Text"
import type { AppStackScreenProps } from "@/navigators/navigationTypes"

interface VoiceTranslationScreenProps extends AppStackScreenProps<"VoiceTranslation"> {}

export const VoiceTranslationScreen: FC<VoiceTranslationScreenProps> = () => {
  return (
    <View style={$root}>
      <Text text="음성 대화 번역" />
    </View>
  )
}

const $root: ViewStyle = {
  flex: 1,
  backgroundColor: "#F5F5F5",
}
