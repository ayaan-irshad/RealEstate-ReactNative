import { City } from "./City";
import { Property } from "./Property";

export type DashboardModel = {
  headerImages: string[];
  featuredProperties: Property[];
  topSearchCities: City[];
  newProperties: Property[];
};
