import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';

import { User } from "../models";

const getUserInfo = async (): Promise<User> => {
  try {
    const result = await axios.get("profile/userinfo");

    if (result.data.user === null) {
      return Promise.reject(new Error("user is null"));
    }
    await AsyncStorage.setItem("User", JSON.stringify(result.data.user));

    return Promise.resolve(result.data.user);
  } catch (error) {
    return Promise.reject(error);
  }
};

const updateProfileImage = async (fileUri: string): Promise<string> => {
  try {
    const image: any = {
      uri: fileUri,
      type: "image/jpg",
      name: "upload.jpg",
    };

    var data = new FormData();
    data.append("image", image);
    const result = await axios.post("profile/updateprofileimage", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    if (result?.data?.error) {
      return Promise.reject(Error(result.data.error.message));
    }
    return Promise.resolve(result.data);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const ProfileService = {
  getUserInfo,
  updateProfileImage,
};
