import axios from "axios";

const getLikedProperties = async () => {
  return await axios.get("properties/likes");
};

const likeProperty = async (propertyId: number, isLiked: boolean) => {
  return await axios.post("properties/like", {
    propertyId,
    isLiked,
  });
};

export const PropertyService = {
  likeProperty,
  getLikedProperties,
};
