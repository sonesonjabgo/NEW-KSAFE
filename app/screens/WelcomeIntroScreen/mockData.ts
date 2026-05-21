import type { TxKeyPath } from "@/i18n"

// eslint-disable-next-line @typescript-eslint/no-require-imports
const welcomeAiRiskImage = require("@assets/images/welcome-ai-risk.png")
// eslint-disable-next-line @typescript-eslint/no-require-imports
const welcomeTbmImage = require("@assets/images/welcome-tbm.png")
// eslint-disable-next-line @typescript-eslint/no-require-imports
const welcomeTranslateImage = require("@assets/images/welcome-translate.png")

export interface IntroSlideData {
  id: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  image: any
  step: string
  titleTx: TxKeyPath
  descriptionTx: TxKeyPath
}

export const INTRO_SLIDES: IntroSlideData[] = [
  {
    id: "1",
    image: welcomeTranslateImage,
    step: "01",
    titleTx: "welcomeIntroScreen:slide1.title",
    descriptionTx: "welcomeIntroScreen:slide1.description",
  },
  {
    id: "2",
    image: welcomeTbmImage,
    step: "02",
    titleTx: "welcomeIntroScreen:slide2.title",
    descriptionTx: "welcomeIntroScreen:slide2.description",
  },
  {
    id: "3",
    image: welcomeAiRiskImage,
    step: "03",
    titleTx: "welcomeIntroScreen:slide3.title",
    descriptionTx: "welcomeIntroScreen:slide3.description",
  },
]
