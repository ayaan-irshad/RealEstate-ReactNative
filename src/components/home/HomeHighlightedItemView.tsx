import { Entypo, MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import numeral from "numeral";
import React from "react";
import {
  View,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
} from "react-native";

import { getImageUrl } from "../../helpers";
import { useLocalization } from "../../localization";
import { Property } from "../../models";
import { Theme } from "../../theme";
import { Box } from "../box";
import { Text } from "../text";

type TProps = {
  item: Property;
  onClick: () => void;
};

export const HomeHighlightedItemView: React.FC<TProps> = ({
  item,
  onClick,
}) => {
  const { getString } = useLocalization();
  return (
    <TouchableOpacity onPress={onClick} activeOpacity={1}>
      <Box style={styles.container}>
        <ImageBackground
          style={styles.imgBack}
          imageStyle={{ borderRadius: Theme.sizes.boxBorderRadius }}
          source={{
            uri: getImageUrl(item.imageNames.split(",")[0]),
          }}
        >
          <View style={styles.labelContent}>
            <Text style={styles.labelText}>
              {item.propertyType.name.toLocaleLowerCase("en") === "rent"
                ? getString("FOR RENT")
                : getString("FOR SALE")}
            </Text>
          </View>
          <View style={styles.rowsContainer}>
            <LinearGradient
              colors={["transparent", "#000000"]}
              style={styles.gradientLayout}
            >
              <View style={styles.flex1}>
                <Text style={styles.titleText} numberOfLines={2}>
                  {item.title}
                </Text>
                <Text style={styles.locationText}>
                  <Entypo name="location-pin" size={14} />
                  {` ${item.city.name}  `}
                  <MaterialCommunityIcons name="floor-plan" size={14} />
                  {` ${item.size}m²`}
                </Text>
              </View>
              <Text style={styles.moneyText}>
                {`${item.currency}${numeral(item.price).format("0,0.00")}`}
              </Text>
            </LinearGradient>
          </View>
        </ImageBackground>
      </Box>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: { marginVertical: 8 },
  imgBack: {
    flex: 1,
    height: 200,
  },
  flex1: { flex: 1 },
  labelContent: {
    backgroundColor: Theme.colors.yellow,
    position: "absolute",
    paddingHorizontal: 8,
    paddingVertical: 4,
    left: 16,
    top: 16,
    borderRadius: 4,
  },
  labelText: {
    color: "white",
    fontFamily: "default-medium",
    fontSize: 12,
  },
  rowsContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
  gradientLayout: {
    padding: 16,
    borderRadius: 12,
    flexDirection: "row",
  },
  titleText: {
    color: "white",
    fontSize: 19,
    fontFamily: "default-bold",
    textAlign: "justify",
  },
  locationText: {
    color: "white",
    marginTop: 6,
    fontSize: 13,
    textAlign: "justify",
  },
  moneyText: {
    color: "white",
    fontSize: 22,
    fontFamily: "default-medium",
    alignSelf: "flex-end",
  },
});
