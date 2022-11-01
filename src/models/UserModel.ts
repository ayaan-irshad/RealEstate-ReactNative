import { LocationModel } from "./LocationModel";

export type UserModel = {
  name: string;
  phoneNumber: string;
  email: string;
  location: LocationModel;
};
