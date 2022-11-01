import React, { useEffect, useState } from "react";
import { Alert, Dimensions, ScrollView } from "react-native";

import { HtmlView } from "../../components";
import { AppSettingsService } from "../../services";

const WIDTH = Dimensions.get("screen").width;

export const PrivacyPolicyScreen = () => {
  const [privacyPolicy, setPrivacyPolicy] = useState<string>();

  useEffect(() => {
    AppSettingsService.getPrivacyPolicy()
      .then((res) => setPrivacyPolicy(res.data.privacyPolicy))
      .catch((err) => Alert.alert(err.message));
  }, []);

  return (
    <ScrollView contentContainerStyle={{ padding: 16 }}>
      <HtmlView htmlContent={privacyPolicy} imagesMaxWidthOffset={WIDTH - 32} />
    </ScrollView>
  );
};
