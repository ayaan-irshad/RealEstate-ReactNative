import { useNavigation } from "@react-navigation/native";
import React, { useContext } from "react";
import { FlatList } from "react-native";

import { ListingItemView, Separator } from "../../components";
import { LikedPropertiesContext } from "../../context";
import { Property } from "../../models";
import NavigationNames from "../../navigations/NavigationNames";

export const LikedPropertiesScreen = () => {
  const navigation = useNavigation();
  const { likedProperties } = useContext(LikedPropertiesContext);

  const properties = Object.keys(likedProperties).map(
    (a) => likedProperties[a]
  );

  const onClickItem = (item: Property) => {
    navigation.navigate(NavigationNames.PropertyDetailScreenForProfileTab, {
      model: { ...item },
    });
  };

  return (
    <FlatList
      data={properties}
      keyExtractor={(_, index) => `key${index}`}
      ItemSeparatorComponent={() => <Separator />}
      contentContainerStyle={{ paddingVertical: 16 }}
      renderItem={({ item }) => {
        return (
          <ListingItemView model={item} onClick={() => onClickItem(item)} />
        );
      }}
    />
  );
};
