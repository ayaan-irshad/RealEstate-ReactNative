import React from "react";
import { StyleSheet, Dimensions, I18nManager } from "react-native";
import HTML from "react-native-render-html";

import { Theme } from "../../theme";

type TProps = {
  htmlContent: string;
  imagesMaxWidthOffset: number;
};

export const HtmlView: React.FC<TProps> = (props) => {
  return (
    <HTML
      baseFontStyle={styles.htmlBaseFontStyle}
      html={props.htmlContent}
      imagesMaxWidth={
        Dimensions.get("window").width - props.imagesMaxWidthOffset
      }
      ignoredStyles={["font-family"]}
      tagsStyles={{
        p: { marginVertical: 8 },
        h1: {
          marginTop: 12,
          marginBottom: 2,
          fontSize: 24,
          fontFamily: "default-medium",
        },
        h2: {
          marginTop: 12,
          marginBottom: 2,
          fontSize: 22,
          fontFamily: "default-medium",
        },
        h3: {
          marginTop: 12,
          marginBottom: 2,
          fontSize: 20,
          fontFamily: "default-medium",
        },
        h4: {
          marginTop: 12,
          marginBottom: 2,
          fontSize: 16,
          fontFamily: "default-medium",
        },
        strong: { fontFamily: "default-medium" },
      }}
    />
  );
};

const styles = StyleSheet.create({
  htmlBaseFontStyle: {
    color: Theme.colors.black,
    fontSize: 15,
    fontFamily: "default-regular",
    writingDirection: I18nManager.isRTL ? "rtl" : "ltr",
    textAlign: "justify",
  },
});
