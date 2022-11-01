import React from "react";
import { StyleSheet, ImageBackground, TouchableOpacity } from "react-native";

import { getImageUrl } from "../../helpers";
import { City } from "../../models";
import { Theme } from "../../theme";
import { Box } from "../box";
import { Text } from "../text";

type TProps = {
  item: City;
  onClick: () => void;
};

export const HomeTopSearchItemView: React.FC<TProps> = ({ item, onClick }) => {
  return (
    <TouchableOpacity onPress={onClick}>
      <Box style={styles.container}>
        <ImageBackground
          source={{ uri: getImageUrl(item.imageName) }}
          imageStyle={styles.imageStyle}
          style={styles.imgBackStyle}
        >
          <Text style={styles.countryText}>
            {item.name.toLocaleUpperCase("en")}
          </Text>
        </ImageBackground>
      </Box>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: { marginVertical: 8, backgroundColor: "#000" },
  imageStyle: {
    borderRadius: Theme.sizes.boxBorderRadius,
    opacity: 0.7,
  },
  imgBackStyle: {
    width: 120,
    height: 120,
    alignItems: "center",
    justifyContent: "center",
  },
  countryText: {
    color: "white",
    fontSize: 14,
    fontFamily: "default-bold",
    textAlign: "center",
  },
});
