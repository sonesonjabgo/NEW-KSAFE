import en, { Translations } from "./en"
import { mergeLocale, type LocaleOverrides } from "./mergeLocale"

const loOverrides = {
  languageSettings: {
    languageTitle: "ພາສາ",
    languageDescription: "ປ່ຽນພາສາແອັບໄດ້ທັນທີ",
    languageChangeSuccess: "ປ່ຽນພາສາເປັນ {{language}} ສຳເລັດແລ້ວ",
    languageChangeRestart:
      "ປ່ຽນພາສາເປັນ {{language}}\nສຳເລັດແລ້ວ. ແອັບຈະເລີ່ມໃໝ່ເພື່ອນຳການປ່ຽນແປງໄປໃຊ້",
    languageChangeError: "ບໍ່ສາມາດປ່ຽນພາສາໄດ້. ກະລຸນາລອງໃໝ່",
    languageNames: en.languageSettings.languageNames,
  },
}

const lo: Translations = mergeLocale(en, loOverrides as LocaleOverrides<Translations>)

export default lo
