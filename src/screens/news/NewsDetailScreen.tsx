import { useRoute } from "@react-navigation/native";
import moment from "moment";
import React from "react";
import { StyleSheet, Image, ScrollView, View, Dimensions } from "react-native";

import { HtmlView, Text } from "../../components";
import { getImageUrl } from "../../helpers";
import { News } from "../../models";
import { Theme } from "../../theme";

const WIDTH = Dimensions.get("window").width;

export const NewsDetailScreen = () => {
  const { params } = useRoute();

  const model = params["model"] as News;

  return (
    <ScrollView>
      <Image
        source={{ uri: getImageUrl(model.imageName) }}
        style={{ aspectRatio: 1.8 }}
      />
      <View style={styles.content}>
        <Text style={styles.dateText}>
          {moment(model.createdDate).format("LLL")}
        </Text>
        <Text style={styles.titleText}>{model.title}</Text>
        <HtmlView
          htmlContent={model.content}
          imagesMaxWidthOffset={WIDTH - 32}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  content: {
    padding: 16,
  },
  dateText: {
    fontFamily: "default-medium",
    fontSize: 12,
    color: Theme.colors.primaryColorDark,
  },
  titleText: {
    fontSize: 16,
    marginTop: 8,
    fontFamily: "default-medium",
  },
});
