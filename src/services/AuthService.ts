import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';

import { User } from "../models";

const login = async (username: string, password: string): Promise<User> => {
  try {
    const result = await axios.post("auth/login", {
      username,
      password,
    });

    if (result?.data?.error) {
      return Promise.reject(Error(result.data.error.message));
    }

    await AsyncStorage.multiSet([
      ["User", JSON.stringify(result.data.user)],
      ["AccessToken", result.data.token],
    ]);

    return Promise.resolve(result.data.user);
  } catch (error) {
    return Promise.reject(error);
  }
};

const register = async (
  firstName: string,
  lastName: string,
  email: string,
  username: string,
  password: string
): Promise<User> => {
  try {
    const result = await axios.post("auth/register", {
      firstName,
      lastName,
      email,
      username,
      password,
    });
    if (result?.data?.error) {
      return Promise.reject(Error(result.data.error.message));
    }
    const user = await login(username, password);
    return Promise.resolve(user);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const AuthService = {
  login,
  register,
};
