import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import React, { useContext } from "react";

import { AuthenticationContext } from "../context";
import { useLocalization } from "../localization";
import {
  HomeScreen,
  PropertyDetailScreen,
  SearchScreen,
  ProfileScreen,
  MenuScreen,
  SearchMapScreen,
  LikedPropertiesScreen,
  AboutUsScreen,
  PrivacyPolicyScreen,
} from "../screens";
import { NewsListScreen, NewsDetailScreen } from "../screens/news";
import { Theme } from "../theme";
import { stackScreenOptions, tabScreenOptions } from "./NavigationHelper";
import NavigationNames from "./NavigationNames";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const HomeTabStack = () => {
  return (
    <Stack.Navigator headerMode="screen" screenOptions={stackScreenOptions}>
      <Stack.Screen
        name={NavigationNames.HomeScreen}
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={NavigationNames.PropertyDetailScreenForHomeTab}
        component={PropertyDetailScreen}
      />
    </Stack.Navigator>
  );
};

const SearchTabStack = () => {
  return (
    <Stack.Navigator headerMode="screen" screenOptions={stackScreenOptions}>
      <Stack.Screen
        name={NavigationNames.SearchScreen}
        component={SearchScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={NavigationNames.PropertyDetailScreenForSearchTab}
        component={PropertyDetailScreen}
      />
      <Stack.Screen
        name={NavigationNames.SearchMapScreen}
        component={SearchMapScreen}
      />
    </Stack.Navigator>
  );
};

const ProfileTabStack = () => {
  const { getString } = useLocalization();
  return (
    <Stack.Navigator headerMode="screen" screenOptions={stackScreenOptions}>
      <Stack.Screen
        name={NavigationNames.ProfileScreen}
        component={ProfileScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={NavigationNames.LikedPropertiesScreen}
        component={LikedPropertiesScreen}
        options={{ title: getString("Favorite Properties") }}
      />
      <Stack.Screen
        name={NavigationNames.PropertyDetailScreenForProfileTab}
        component={PropertyDetailScreen}
      />
    </Stack.Navigator>
  );
};

const MenuTabStack = () => {
  const { getString } = useLocalization();
  return (
    <Stack.Navigator headerMode="screen" screenOptions={stackScreenOptions}>
      <Stack.Screen
        name={NavigationNames.MenuScreen}
        component={MenuScreen}
        options={{ title: getString("Menu") }}
      />
      <Stack.Screen
        name={NavigationNames.NewsListScreen}
        component={NewsListScreen}
        options={{ title: getString("News") }}
      />
      <Stack.Screen
        name={NavigationNames.NewsDetailScreen}
        component={NewsDetailScreen}
        options={{ title: getString("News Detail") }}
      />
      <Stack.Screen
        name={NavigationNames.AboutUsScreen}
        component={AboutUsScreen}
        options={{ title: getString("About Us") }}
      />
      <Stack.Screen
        name={NavigationNames.PrivacyPolicyScreen}
        component={PrivacyPolicyScreen}
        options={{ title: getString("Privacy Policy") }}
      />
    </Stack.Navigator>
  );
};

const HomePageTabNavigator = () => {
  const authContext = useContext(AuthenticationContext);
  return (
    <Tab.Navigator
      screenOptions={tabScreenOptions}
      tabBarOptions={{
        activeTintColor: Theme.colors.navbarActiveColor,
        inactiveTintColor: Theme.colors.navbarInactiveColor,
      }}
    >
      <Tab.Screen name={NavigationNames.HomeTab} component={HomeTabStack} />
      <Tab.Screen name={NavigationNames.SearchTab} component={SearchTabStack} />
      <Tab.Screen
        name={NavigationNames.ProfileTab}
        component={ProfileTabStack}
        listeners={({ navigation, route }) => ({
          tabPress: (e) => {
            if (authContext.isLoggedIn) {
              return;
            }
            e.preventDefault();
            navigation.navigate(NavigationNames.RootLoginScreen);
          },
        })}
      />
      <Tab.Screen name={NavigationNames.MenuTab} component={MenuTabStack} />
    </Tab.Navigator>
  );
};

export default HomePageTabNavigator;
