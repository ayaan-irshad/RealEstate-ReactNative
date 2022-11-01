import ViewPager from "@react-native-community/viewpager";
import React, { useState } from "react";
import {
  View,
  Image,
  StyleSheet,
  Animated,
  TouchableOpacity,
} from "react-native";
import { useSafeArea } from "react-native-safe-area-view";
import { Pagination } from "react-native-snap-carousel";

import { getImageUrl } from "../../helpers";
import { useLocalization } from "../../localization";
import { Theme } from "../../theme";
import { Text } from "../text";

type TProps = {
  height: number;
  animValue: Animated.Value;
  headerImages: string[];
  onPressSearchInput: () => void;
};

export const HomeHeaderView: React.FC<TProps> = ({
  height,
  animValue,
  headerImages = [],
  onPressSearchInput,
}) => {
  const { getString } = useLocalization();
  const safeArea = useSafeArea();
  const [indicatorIndex, setIndicatorIndex] = useState(0);

  const headerHeight = animValue.interpolate({
    inputRange: [0, height + safeArea.top],
    outputRange: [height + safeArea.top, safeArea.top + 60],
    extrapolate: "clamp",
  });

  const sliderHeight = animValue.interpolate({
    inputRange: [0, height + safeArea.top],
    outputRange: [height + safeArea.top - 26, 1],
    extrapolate: "clamp",
  });

  const opacityForSlider = animValue.interpolate({
    inputRange: [height, height + safeArea.top],
    outputRange: [1, 0],
    extrapolate: "clamp",
  });

  return (
    <Animated.View style={[styles.headerContainer, { height: headerHeight }]}>
      <Animated.View
        style={[
          StyleSheet.absoluteFill,
          {
            opacity: opacityForSlider,
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
            height: sliderHeight,
          },
        ]}
      >
        <ViewPager
          style={StyleSheet.absoluteFill}
          initialPage={0}
          onPageSelected={(e) => setIndicatorIndex(e.nativeEvent.position)}
        >
          {headerImages.map((item, index) => (
            <Image
              key={`sliderKey${index}`}
              style={styles.flex1}
              source={{
                uri: getImageUrl(item),
              }}
            />
          ))}
        </ViewPager>
        <View style={styles.paginationView}>
          <Pagination
            activeDotIndex={indicatorIndex}
            dotsLength={headerImages.length}
            dotColor={Theme.colors.primaryColor}
            inactiveDotColor={Theme.colors.lightgray}
            inactiveDotScale={0.8}
            inactiveDotOpacity={0.8}
            containerStyle={styles.paginationContainerStyle}
            dotStyle={styles.paginationDotStyle}
          />
        </View>

        <View
          pointerEvents="none"
          style={{
            position: "absolute",
          }}
        >
          <Image
            source={require("../../../assets/logo.png")}
            resizeMode="contain"
            style={{
              width: 200,
            }}
          />
        </View>
      </Animated.View>
      <TouchableOpacity
        style={styles.searchContainer}
        activeOpacity={0.95}
        onPress={onPressSearchInput}
      >
        <View style={styles.searchInput}>
          <Text style={{ color: Theme.colors.lightgray, fontSize: 14 }}>
            {getString("Search Property")}
          </Text>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  flex1: {
    flex: 1,
  },
  headerContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  paginationView: { position: "absolute", bottom: 34, alignSelf: "center" },
  paginationContainerStyle: { paddingVertical: 0 },
  paginationDotStyle: {
    marginHorizontal: -20,
  },
  searchContainer: {
    position: "absolute",
    left: 16,
    right: 16,
    bottom: 0,
  },
  searchInput: {
    backgroundColor: "white",
    paddingVertical: 16,
    paddingHorizontal: 16,
    fontSize: 15,
    borderRadius: 12,
    borderColor: "lightgray",
    borderWidth: StyleSheet.hairlineWidth,
    shadowColor: "#00000015",
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 4,
    shadowOffset: {
      width: 0,
      height: 4,
    },
  },
});
