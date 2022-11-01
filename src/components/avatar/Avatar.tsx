import React from "react";
import {
  StyleSheet,
  Image,
  ImageSourcePropType,
  ViewStyle,
  ImageStyle,
  View,
} from "react-native";

type TProps = {
  source?: ImageSourcePropType;
  style?: ViewStyle;
  imageStyle?: ImageStyle;
  status?: "online" | "bussy";
};

export const Avatar: React.FC<TProps> = (props) => {
  return (
    <View style={[styles.container, props.style]}>
      <Image
        source={props.source}
        style={[styles.image, props.imageStyle]}
        resizeMode="stretch"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    overflow: "hidden",
  },
  image: {
    width: 64,
    height: 64,
  },
});
