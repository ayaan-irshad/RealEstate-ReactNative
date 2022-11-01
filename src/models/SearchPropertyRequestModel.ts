import { City } from "./City";
import { PropertyCategory } from "./PropertyCategory";
import { PropertyType } from "./PropertyType";

export type SearchPropertyRequestModel = {
  searchText: string;
  propertyTypes: PropertyType[];
  propertyCategories: PropertyCategory[];
  cities: City[];
  bedRoomCounts: number[];
  bathRoomCounts: number[];
  kitchenRoomCounts: number[];
  parkingCounts: number[];
  minSize: number;
  maxSize: number;
  minPrice: number;
  maxPrice: number;
  address: string;
};
