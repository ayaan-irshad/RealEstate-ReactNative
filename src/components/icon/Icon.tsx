import React from "react";
import { View, ViewStyle, StyleProp, I18nManager } from "react-native";
import {
  Ionicons,
  FontAwesome,
  FontAwesome5,
  MaterialIcons,
} from "@expo/vector-icons";

type TProps = {
  group?: "Ionicons" | "FontAwesome" | "FontAwesome5" | "MaterialIcons";
  name: string;
  size?: number;
  color?: string;
  style?: StyleProp<ViewStyle>;
  ignoreRTL?: boolean;
};

export const Icon: React.FC<TProps> = ({
  group,
  name,
  size,
  color,
  ignoreRTL,
  style,
}) => {
  var Icon;
  switch (group) {
    case "FontAwesome":
      Icon = FontAwesome;
      break;
    case "FontAwesome5":
      Icon = FontAwesome5;
      break;
    case "MaterialIcons":
      Icon = MaterialIcons;
      break;
    default:
      Icon = Ionicons;
      break;
  }

  return (
    <View style={style}>
      <Icon
        name={name}
        size={size ?? 24}
        color={color ?? "#000"}
        style={{
          transform: [{ scaleX: I18nManager.isRTL && !ignoreRTL ? -1 : 1 }],
        }}
      />
    </View>
  );
};
