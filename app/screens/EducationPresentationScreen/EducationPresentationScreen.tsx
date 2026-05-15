import { FC } from "react"
import { TouchableOpacity, View, TextStyle } from "react-native"

import { StackScreen } from "@/components/StackScreen"
import { Text } from "@/components/Text"
import { translate } from "@/i18n/translate"
import type { AppStackScreenProps } from "@/navigators/navigationTypes"
import { typography } from "@/theme/typography"

// TODO: API 연동 시 navigation params로 roomId 수신
const MOCK_ROOM_ID = "76481574"

interface EducationPresentationScreenProps extends AppStackScreenProps<"EducationPresentation"> {}

export const EducationPresentationScreen: FC<EducationPresentationScreenProps> = ({
  navigation,
}) => {
  return (
    <StackScreen
      title={`${translate("educationPresentationScreen:title")}\n${MOCK_ROOM_ID}`}
      onBack={() => navigation.goBack()}
      rightSlot={
        <TouchableOpacity activeOpacity={0.7}>
          <Text
            text={translate("educationPresentationScreen:inviteButton")}
            style={$inviteText}
          />
        </TouchableOpacity>
      }
    >
      <View />
    </StackScreen>
  )
}

const $inviteText: TextStyle = {
  fontSize: 15,
  fontFamily: typography.primary.semiBold,
  color: "#FFFFFF",
}
