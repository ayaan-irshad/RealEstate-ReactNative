import React from "react";
import {
  KeyboardAvoidingView,
  StyleProp,
  ViewStyle,
  Platform,
} from "react-native";

type TProps = {
  style: StyleProp<ViewStyle>;
};

export const KeyboardView: React.FC<TProps> = ({ style, children }) => {
  return (
    <KeyboardAvoidingView
      style={style}
      behavior={Platform.select({ ios: "padding", android: "height" })}
    >
      {children}
    </KeyboardAvoidingView>
  );
};
