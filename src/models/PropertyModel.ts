import { AdditionalDetailsModel } from "./AdditionalDetailsModel";
import { ImageModel } from "./ImageModel";
import { LocationModel } from "./LocationModel";
import { UserModel } from "./UserModel";

export type PropertyModel = {
  title: string;
  type: "sale" | "rent";
  price: number;
  currency: string;
  description: string;
  location: LocationModel;
  highlightedImage: ImageModel;
  images: ImageModel[];
  isLiked: boolean;
  likeCount: number;
  additionalDetails: AdditionalDetailsModel;
  contact: UserModel;
};
