import { LanguageModel } from "../models";

export const BASE_URL = "http://publrealty.publsoft.com/";
export const API_URL = BASE_URL + "api/v1/";
export const IMAGES_URL = BASE_URL + "uploadfiles/images/";

export const SEARCH_MIN_PRICE = 1;
export const SEARCH_MAX_PRICE = 4000000;
export const SEARCH_MIN_SIZE = 1;
export const SEARCH_MAX_SIZE = 1000;

export const ADDITIONAL_FEATURES_SEPARATOR_CHARACTER = ",";

export const LANGUAGES: LanguageModel[] = [
  {
    lang: "en",
    isRTL: false,
  },
  {
    lang: "tr",
    isRTL: false, 
  },
  {
    lang: "ar",
    isRTL: true,
  },
];

export const getLang = (lang: string) => {
  const foundLang = LANGUAGES.find((a) => a.lang === lang);
  if (foundLang) {
    return foundLang;
  }
  return {
    lang: "en",
    isRTL: false,
  };
};
