import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React, { useState, useContext, useEffect } from "react";
import {
  FlatList,
  View,
  StyleSheet,
  Alert,
  Linking,
  I18nManager,
} from "react-native";

import { Divider, TouchableHighlight, Text } from "../../components";
import { AuthenticationContext } from "../../context";
import { useLocalization } from "../../localization";
import { SettingsBottomSheet } from "../../modals";
import { AppSettingsModel } from "../../models";
import NavigationNames from "../../navigations/NavigationNames";
import { AppSettingsService } from "../../services";
import { Theme } from "../../theme";

const getMenuItems = (
  getString: (key: string) => string
): { title: string; iconName: string; [key: string]: any }[] => [
  {
    title: getString("News"),
    iconName: "newspaper",
    navigateToScreen: NavigationNames.NewsListScreen,
  },
  {
    title: getString("Facebook"),
    iconName: "logo-facebook",
    actionName: "openLink",
    appSettingsKey: "facebookUrl",
  },
  {
    title: getString("Twitter"),
    iconName: "logo-twitter",
    actionName: "openLink",
    appSettingsKey: "twitterUrl",
  },
  {
    title: getString("Youtube"),
    iconName: "logo-youtube",
    actionName: "openLink",
    appSettingsKey: "youtubeUrl",
  },
  {
    title: getString("Instagram"),
    iconName: "logo-instagram",
    actionName: "openLink",
    appSettingsKey: "instagramUrl",
  },
  {
    title: getString("About Us"),
    iconName: "ios-business",
    navigateToScreen: NavigationNames.AboutUsScreen,
  },
  {
    title: getString("Contact Us"),
    iconName: "ios-mail",
    actionName: "openEmail",
  },
  {
    title: getString("Privacy Policy"),
    iconName: "ios-leaf",
    navigateToScreen: NavigationNames.PrivacyPolicyScreen,
  },
  {
    title: getString("Settings"),
    iconName: "md-settings",
    actionName: "openSettings",
  },
];

export const MenuScreen = () => {
  const navigation = useNavigation();
  const { getString } = useLocalization();
  const authContext = useContext(AuthenticationContext);

  const [appSettings, setAppSettings] = useState<AppSettingsModel>();
  const [isVisibleSettingModal, setIsVisibleSettingModal] = useState(false);
  var menuItems = getMenuItems(getString);

  if (authContext.isLoggedIn) {
    menuItems = [
      ...menuItems,
      {
        title: getString("Logout"),
        iconName: "md-log-out",
        actionName: "logout",
      },
    ];
  }

  const onPressMenuItemClick = (item: any) => {
    if (item.actionName === "openSettings") {
      setIsVisibleSettingModal(true);
    } else if (item.actionName === "logout") {
      authContext.logout();
    } else if (item.navigateToScreen) {
      navigation.navigate(item.navigateToScreen);
    } else if (item.actionName === "openEmail") {
      const email = appSettings["email"];
      if (email) {
        Linking.openURL(`mailto:${appSettings["Email"]}`);
      }
    } else if (item.actionName === "openLink") {
      const link = appSettings[item.appSettingsKey];
      if (link) {
        Linking.openURL(link);
      }
    }
  };

  useEffect(() => {
    AppSettingsService.getAppSettings()
      .then((res) => setAppSettings(res.data))
      .catch((err) => Alert.alert(err.messsage));
  }, []);

  return (
    <>
      <FlatList
        data={menuItems}
        keyExtractor={(item, index) => `key${index}ForMenu`}
        renderItem={({ item }) => (
          <TouchableHighlight onPress={() => onPressMenuItemClick(item)}>
            <View style={styles.itemContainer}>
              <View style={styles.iconContainer}>
                <Ionicons
                  name={item.iconName}
                  size={24}
                  color={Theme.colors.gray}
                  style={styles.icon}
                />
              </View>
              <Text style={styles.titleText}>{item.title}</Text>
              <Ionicons
                name="ios-arrow-forward"
                size={24}
                color={Theme.colors.gray}
                style={{
                  transform: [{ scaleX: I18nManager.isRTL ? -1 : 1 }],
                }}
              />
            </View>
          </TouchableHighlight>
        )}
        ItemSeparatorComponent={() => <Divider />}
      />
      <SettingsBottomSheet
        isVisible={isVisibleSettingModal}
        onDismissModal={() => setIsVisibleSettingModal(false)}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  flex1: {
    flex: 1,
  },
  itemContainer: {
    flexDirection: "row",
    paddingVertical: 18,
    paddingEnd: 18,
    paddingStart: 0,
  },
  iconContainer: {
    width: 60,
    alignSelf: "center",
  },
  icon: { alignSelf: "center" },
  titleText: {
    flex: 1,
    alignSelf: "center",
    color: Theme.colors.black,
    fontSize: 17,
    textAlign: "justify",
  },
});
