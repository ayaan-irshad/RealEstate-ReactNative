import React from "react";
import { Text, I18nManager } from "react-native";

export const configureGlobalTypography = () => {
  const oldTextRender = (Text as any).render;
  (Text as any).render = function (...args) {
    const origin = oldTextRender.call(this, ...args);
    return React.cloneElement(origin, {
      allowFontScaling: false,
      style: [
        {
          fontFamily: "default-regular",
          writingDirection: I18nManager.isRTL ? "rtl" : "ltr",
        },
        origin.props.style,
      ],
    });
  };
};
