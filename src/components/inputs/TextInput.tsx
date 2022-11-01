import React from "react";
import {
  View,
  StyleSheet,
  StyleProp,
  ViewStyle,
  TextInput as RNTextInput,
  TextInputProps,
  I18nManager,
} from "react-native";

import { Theme } from "../../theme";

type TProps = {
  style?: StyleProp<ViewStyle>;
  inputProps?: TextInputProps;
};

export const TextInput = React.forwardRef<RNTextInput, TProps>(
  ({ inputProps, style }, ref) => (
    <View style={[styles.container, style]}>
      <RNTextInput
        ref={ref}
        {...inputProps}
        style={[
          styles.input,
          {
            writingDirection: I18nManager.isRTL ? "rtl" : "ltr",
          },
          inputProps?.style,
        ]}
      />
    </View>
  )
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    borderRadius: 12,
    borderColor: Theme.colors.lightgray,
    borderWidth: StyleSheet.hairlineWidth,
    shadowColor: "#00000010",
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 4,
    shadowOffset: {
      width: 0,
      height: 4,
    },
  },
  input: {
    fontSize: 15,
    paddingHorizontal: 16,
    height: Theme.sizes.inputHeight,
    fontFamily: "default-regular",
  },
});
