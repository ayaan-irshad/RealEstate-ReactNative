import * as Updates from "expo-updates";
import i18n from "i18next";
import moment from "moment";
import { initReactI18next, useTranslation } from "react-i18next";
import { I18nManager } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';

import { LanguageModel } from "../models";
require("moment/locale/ar.js");
require("moment/locale/tr.js");

const I18N_NAME_SPACE = "translation";

var currentLang: LanguageModel = null;

export const initLocalization = (lang: LanguageModel) => {
  currentLang = lang;
  i18n.use(initReactI18next).init({
    resources: {},
    lng: lang.lang,
    fallbackLng: "en",
    ns: I18N_NAME_SPACE,
    interpolation: {
      escapeValue: false,
    },
  });

  i18n.addResources("en", I18N_NAME_SPACE, require("./locales/en.json"));
  i18n.addResources("tr", I18N_NAME_SPACE, require("./locales/tr.json"));
  i18n.addResources("ar", I18N_NAME_SPACE, require("./locales/ar.json"));

  moment.locale(
    i18n.hasResourceBundle(lang.lang, I18N_NAME_SPACE) ? lang.lang : "en"
  );

  I18nManager.allowRTL(lang.isRTL);
  I18nManager.forceRTL(lang.isRTL);
};

export const useLocalization = () => {
  const { t, i18n } = useTranslation();
  return {
    getString: (key: string, options?: any) => t(key, options),
    changeLanguage: (lang: LanguageModel) => {
      AsyncStorage.setItem("APP_LANGUAGE", lang.lang).then(() => {
        moment.locale(lang.lang);
        i18n.changeLanguage(lang.lang);
        if (currentLang && currentLang.isRTL !== lang.isRTL) {
          I18nManager.allowRTL(lang.isRTL);
          I18nManager.forceRTL(lang.isRTL);
          Updates.reloadAsync();
        }
      });
    },
    currentLanguage: () => i18n.language,
  };
};
