import { FC } from "react"
import { SvgProps } from "react-native-svg"

import WelcomeAiRiskSvg from "@assets/images/welcome-ai-risk.svg"
import WelcomeTbmSvg from "@assets/images/welcome-tbm.svg"
import WelcomeTranslateSvg from "@assets/images/welcome-translate.svg"

import type { TxKeyPath } from "@/i18n"

export interface IntroSlideData {
  id: string
  SlideImage: FC<SvgProps>
  step: string
  titleTx: TxKeyPath
  descriptionTx: TxKeyPath
}

export const INTRO_SLIDES: IntroSlideData[] = [
  {
    id: "1",
    SlideImage: WelcomeTranslateSvg,
    step: "01",
    titleTx: "welcomeIntroScreen:slide1.title",
    descriptionTx: "welcomeIntroScreen:slide1.description",
  },
  {
    id: "2",
    SlideImage: WelcomeTbmSvg,
    step: "02",
    titleTx: "welcomeIntroScreen:slide2.title",
    descriptionTx: "welcomeIntroScreen:slide2.description",
  },
  {
    id: "3",
    SlideImage: WelcomeAiRiskSvg,
    step: "03",
    titleTx: "welcomeIntroScreen:slide3.title",
    descriptionTx: "welcomeIntroScreen:slide3.description",
  },
]
