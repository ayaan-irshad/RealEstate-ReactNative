import React from "react";
import { View, StyleSheet, ViewStyle } from "react-native";

import { Theme } from "../../theme";

type TProps = {
  style?: ViewStyle;
  mh16?: boolean;
};

export const Divider: React.FC<TProps> = ({ style, mh16 }) => {
  return (
    <View style={[styles.container, style, mh16 && { marginHorizontal: 16 }]} />
  );
};

const styles = StyleSheet.create({
  container: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: Theme.colors.lightgray,
  },
});
