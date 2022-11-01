import React from "react";
import { View, StyleSheet } from "react-native";

import { Theme } from "../../theme";
import { Text } from "../text";

type TProps = {
  title: string;
  mTop?: number;
};

export const SectionHeader: React.FC<TProps> = ({ title, mTop }) => {
  return (
    <View style={[styles.container, mTop && { marginTop: mTop }]}>
      <Text style={styles.titleText}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  titleText: {
    fontFamily: "default-medium",
    fontSize: 18,
  },
});
