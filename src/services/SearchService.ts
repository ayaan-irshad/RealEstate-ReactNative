import axios from "axios";

import {
  SearchConstantsModel,
  SearchPropertyRequestModel,
  Property,
} from "../models";

const searchProperties = async (data: SearchPropertyRequestModel) => {
  return await axios.post<Property[]>("properties/search", {
    ...data,
  });
};

const getSearchConstants = async () => {
  return await axios.get<SearchConstantsModel>("properties/search/constants");
};

export const SearchService = {
  searchProperties,
  getSearchConstants,
};
