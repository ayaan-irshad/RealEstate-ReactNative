import axios from "axios";
import React, { useState, Children, useEffect } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';

import { User } from "../models";

export type AuthenticationContextType = {
  isLoggedIn: boolean;
  user?: User;
  login: (user: User) => Promise<boolean>;
  logout: () => Promise<boolean>;
};

export const AuthenticationContext = React.createContext<
  AuthenticationContextType
>({
  isLoggedIn: false,
  user: null,
  login: (_: User) => null,
  logout: () => null,
});

export const AuthenticationProvider: React.FC<{ user: User }> = (props) => {
  const [user, setUser] = useState<User>();

  const login = async (user: User) => {
    axios.defaults.headers["Authorization"] =
      "Bearer " + (await AsyncStorage.getItem("AccessToken"));
    setUser(user);
    return Promise.resolve(true);
  };

  const logout = async () => {
    await AsyncStorage.multiRemove(["AccessToken", "User"]);
    axios.defaults.headers["Authorization"] = null;
    setUser(null);
    return Promise.resolve(true);
  };

  useEffect(() => {
    setUser(props.user);
  }, [props.user]);

  return (
    <AuthenticationContext.Provider
      value={{ login, logout, user, isLoggedIn: !!user }}
    >
      {Children.only(props.children)}
    </AuthenticationContext.Provider>
  );
};
