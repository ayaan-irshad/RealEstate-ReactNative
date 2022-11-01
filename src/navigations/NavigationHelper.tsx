import { Ionicons } from "@expo/vector-icons";
import { BottomTabNavigationOptions } from "@react-navigation/bottom-tabs";
import { ParamListBase, RouteProp } from "@react-navigation/native";
import { StackNavigationOptions } from "@react-navigation/stack";
import React from "react";

import { useLocalization } from "../localization";
import { Theme } from "../theme";
import NavigationNames from "./NavigationNames";

const getTabTitle = (routeName: string): string => {
  const { getString } = useLocalization();
  if (routeName === NavigationNames.HomeTab) {
    return getString("Home");
  } else if (routeName === NavigationNames.SearchTab) {
    return getString("Search");
  } else if (routeName === NavigationNames.ProfileTab) {
    return getString("Profile");
  } else if (routeName === NavigationNames.MenuTab) {
    return getString("Menu");
  }
  return "";
};

export const tabScreenOptions: (props: {
  route: RouteProp<ParamListBase, keyof ParamListBase>;
  navigation: any;
}) => BottomTabNavigationOptions = ({ route }) => ({
  title: getTabTitle(route.name),
  tabBarIcon: ({ focused, color, size }) => {
    let iconName = "";
    switch (route.name) {
      case NavigationNames.HomeTab:
        iconName = "ios-home";
        break;
      case NavigationNames.SearchTab:
        iconName = "ios-search";
        break;
      case NavigationNames.ProfileTab:
        iconName = "md-person";
        break;
      case NavigationNames.MenuTab:
        iconName = "ios-menu";
        break;
    }
    return <Ionicons name={iconName} size={28} color={color} />;
  },
});

export const stackScreenOptions: StackNavigationOptions = {
  headerTitleAlign: "center",
  headerBackTitleVisible: false,
  headerTintColor: Theme.colors.primaryColorDark,
};
