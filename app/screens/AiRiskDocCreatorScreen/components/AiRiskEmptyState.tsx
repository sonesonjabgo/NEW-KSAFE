import { FC } from "react"
import { View } from "react-native"

import TbmEmptyImage from "@assets/images/tbm-empty.svg"

import { Text } from "@/components/Text"
import { translate } from "@/i18n/translate"

import * as S from "../styles"

export const AiRiskEmptyState: FC = () => (
  <View style={S.$emptyContainer}>
    <View style={S.$emptyImageWrapper}>
      <TbmEmptyImage width={150} height={162} />
    </View>
    <Text text={translate("aiRiskDocCreatorScreen:emptyState.title")} style={S.$emptyTitle} />
    <Text text={translate("aiRiskDocCreatorScreen:emptyState.description")} style={S.$emptyDesc} />
  </View>
)
