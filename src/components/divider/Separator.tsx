import React from "react";
import { View } from "react-native";

import { Theme } from "../../theme";

type TProps = {
  vertical?: boolean;
  horizontal?: boolean;
  width?: number;
  height?: number;
};

export const Separator: React.FC<TProps> = ({
  vertical,
  horizontal,
  width,
  height,
}) => {
  return (
    <View
      style={[
        !vertical &&
          !horizontal && { height: height ?? Theme.sizes.separatorSize },
        horizontal && { width: width ?? Theme.sizes.separatorSize },
      ]}
    />
  );
};
