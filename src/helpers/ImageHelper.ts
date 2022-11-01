import { IMAGES_URL } from "../constants";

export function getImageUrl(imageName: string) {
  return IMAGES_URL + imageName;
}
