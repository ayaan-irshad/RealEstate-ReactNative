import { City } from "./City";
import { PropertyCategory } from "./PropertyCategory";
import { PropertyType } from "./PropertyType";

export type SearchConstantsModel = {
  propertyTypes: PropertyType[];
  propertyCategories: PropertyCategory[];
  cities: City[];
};
