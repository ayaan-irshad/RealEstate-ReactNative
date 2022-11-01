import axios from "axios";

import { AppSettingsModel } from "../models";

const getAppSettings = async () => {
  return await axios.get<AppSettingsModel>("appsettings");
};

const getAboutUs = async () => {
  return await axios.get<{ aboutUs: string; website: string }>(
    "appsettings/aboutus"
  );
};

const getPrivacyPolicy = async () => {
  return await axios.get<{ privacyPolicy: string }>(
    "appsettings/privacypolicy"
  );
};

const getUserTerms = async () => {
  return await axios.get<{ userTerms: string }>("appsettings/userterms");
};

export const AppSettingsService = {
  getAppSettings,
  getAboutUs,
  getPrivacyPolicy,
  getUserTerms,
};
