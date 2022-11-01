import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { StatusBar } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';

import { AuthenticationProvider, LikedPropertiesProvider } from "../context";
import { User } from "../models";
import { LoadingLayout, LoadingManager } from "../presentation";
import AuthNavigator from "./AuthNavigator";
import HomePageTabNavigator from "./HomePageTabNavigator";
import NavigationNames from "./NavigationNames";

const RootStack = createStackNavigator();

export default function () {
  const [user, setUser] = useState<User>(null);

  useEffect(() => {
    AsyncStorage.multiGet(["AccessToken", "User"]).then((response) => {
      const _accessToken = response[0][1];
      const _user = response[1][1];

      if (_accessToken && _user) {
        axios.defaults.headers["Authorization"] = "Bearer " + _accessToken;
        setUser(JSON.parse(_user));
      }
    });
  }, []);

  return (
    <>
      <StatusBar
        barStyle="dark-content"
        translucent
        backgroundColor="transparent"
      />
      <AuthenticationProvider user={user}>
        <LikedPropertiesProvider>
          <NavigationContainer
            theme={{
              dark: false,
              colors: {
                background: "rgb(255, 255, 255)",
                border: "rgb(224, 224, 224)",
                card: "rgb(255, 255, 255)",
                primary: "rgb(0, 122, 255)",
                text: "rgb(28, 28, 30)",
              },
            }}
          >
            <RootStack.Navigator
              screenOptions={{ headerShown: false }}
              mode="modal"
            >
              <RootStack.Screen
                name={NavigationNames.RootScreen}
                component={HomePageTabNavigator}
              />
              <RootStack.Screen
                name={NavigationNames.RootLoginScreen}
                component={AuthNavigator}
              />
            </RootStack.Navigator>
          </NavigationContainer>
        </LikedPropertiesProvider>
      </AuthenticationProvider>
      <LoadingLayout ref={(ref) => LoadingManager.setLoadingView(ref)} />
    </>
  );
}
