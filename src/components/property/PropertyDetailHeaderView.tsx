import { Entypo, MaterialCommunityIcons } from "@expo/vector-icons";
import ViewPager from "@react-native-community/viewpager";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import React, { useState, useContext } from "react";
import { View, StyleSheet, TouchableOpacity, Image } from "react-native";
import { Pagination } from "react-native-snap-carousel";

import { AuthenticationContext, LikedPropertiesContext } from "../../context";
import { getImageUrl } from "../../helpers";
import { useLocalization } from "../../localization";
import { Property } from "../../models";
import NavigationNames from "../../navigations/NavigationNames";
import { PropertyService } from "../../services";
import { Theme } from "../../theme";
import { LikeButton } from "../buttons";
import { Text } from "../text";

type TProps = {
  model: Property;
  onPressPhoto: (index: number, imageName: string) => void;
};

export const PropertyDetailHeaderView: React.FC<TProps> = ({
  model,
  onPressPhoto,
}) => {
  const { isLoggedIn } = useContext(AuthenticationContext);
  const { likedProperties, likeProperty } = useContext(LikedPropertiesContext);
  const navigation = useNavigation();
  const { getString } = useLocalization();
  const [indicatorIndex, setIndicatorIndex] = useState(0);

  const isLiked = likedProperties.hasOwnProperty(model.id);

  const onClickLike = () => {
    if (!isLoggedIn) {
      navigation.navigate(NavigationNames.RootLoginScreen);
      return;
    }
    PropertyService.likeProperty(model.id, !isLiked)
      .then((_) => {
        model.isLiked = !isLiked;
        likeProperty(model, !isLiked);
      })
      .catch((err) => alert(err.message));
  };

  const images = model.imageNames.split(",").filter((a) => a !== "");

  return (
    <View>
      <ViewPager
        style={styles.viewPager}
        initialPage={0}
        onPageSelected={(e) => setIndicatorIndex(e.nativeEvent.position)}
      >
        {images.map((item, index) => (
          <TouchableOpacity
            activeOpacity={0.9}
            key={`pagerItemKey${index}`}
            onPress={() => onPressPhoto(index, item)}
          >
            <Image
              source={{
                uri: getImageUrl(item),
              }}
              style={styles.flex1}
            />
          </TouchableOpacity>
        ))}
      </ViewPager>
      <LinearGradient
        colors={["transparent", "black"]}
        style={styles.gradient}
        pointerEvents="none"
      >
        <View style={styles.labelContent}>
          <Text style={styles.labelText}>
            {model.propertyType.name.toLocaleLowerCase("en") === "rent"
              ? getString("FOR RENT")
              : getString("FOR SALE")}
          </Text>
        </View>
        <Text style={styles.titleText}>{model.title}</Text>
        <Text style={styles.locationText}>
          <Entypo name="location-pin" size={14} />
          {` ${model.city.name}  `}
          <MaterialCommunityIcons name="floor-plan" size={14} />
          {` ${model.size}m²`}
        </Text>
      </LinearGradient>
      <View style={{ position: "absolute", bottom: 16, alignSelf: "center" }}>
        <Pagination
          activeDotIndex={indicatorIndex}
          dotsLength={images.length}
          dotColor={Theme.colors.primaryColor}
          inactiveDotColor={Theme.colors.lightgray}
          inactiveDotScale={0.8}
          inactiveDotOpacity={0.8}
          containerStyle={{ paddingVertical: 0 }}
          dotStyle={{
            marginHorizontal: -20,
          }}
        />
      </View>
      <LikeButton
        isLiked={isLiked}
        onClick={onClickLike}
        style={styles.likeIcon}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  flex1: { flex: 1 },
  viewPager: { height: 340 },
  gradient: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 16,
    paddingBottom: 32,
  },
  labelContent: {
    backgroundColor: Theme.colors.yellow,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    alignSelf: "flex-start",
  },
  labelText: {
    color: "white",
    fontFamily: "default-medium",
    fontSize: 10,
  },
  titleText: {
    marginTop: 8,
    color: "white",
    fontSize: 22,
    fontFamily: "default-bold",
    textAlign: "justify",
  },
  locationText: {
    color: "white",
    marginTop: 8,
    fontSize: 13,
    textAlign: "justify",
  },
  likeIcon: {
    position: "absolute",
    bottom: -18,
    right: 16,
    zIndex: 100,
  },
});
