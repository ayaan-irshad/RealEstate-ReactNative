import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";

import { Theme } from "../../theme";
import { Text } from "../text";

type TProps = {
  title: string;
  onPress?: () => void;
};

export const PrimaryButton: React.FC<TProps> = ({ title, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Theme.colors.primaryColor,
    paddingVertical: 15,
    alignItems: "center",
    borderRadius: Theme.sizes.boxBorderRadius,
    borderColor: "white",
    borderWidth: 0,
    shadowColor: "#00000020",
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 4,
    shadowOffset: {
      width: 0,
      height: 4,
    },
  },
  text: { color: "white", fontSize: 16, fontFamily: "default-medium" },
});
