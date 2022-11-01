import React from "react";
import { View, StyleSheet, StyleProp, ViewStyle } from "react-native";

type TProps = {
  style?: StyleProp<ViewStyle>;
};

export const Box: React.FC<TProps> = ({ children, style }) => {
  return <View style={[styles.container, style]}>{children}</View>;
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    backgroundColor: "white",
    shadowColor: "#00000020",
    shadowOffset: {
      height: 2,
      width: 0,
    },
    shadowOpacity: 1,
    shadowRadius: 2,
    elevation: 2,
  },
});
