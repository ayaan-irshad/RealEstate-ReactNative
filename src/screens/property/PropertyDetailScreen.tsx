import {
  MaterialCommunityIcons,
  FontAwesome,
  Ionicons,
} from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import numeral from "numeral";
import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  Animated,
  TouchableOpacity,
  Image,
  ViewStyle,
  StyleProp,
  FlatList,
  Dimensions,
  Linking,
  Share,
} from "react-native";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import {
  HeaderButton,
  HeaderButtons,
  Item,
} from "react-navigation-header-buttons";

import {
  SectionHeader,
  Divider,
  Box,
  CircleIconButton,
  PropertyDetailHeaderView,
  Separator,
  HtmlView,
  Text,
} from "../../components";
import { getImageUrl } from "../../helpers";
import { useLocalization } from "../../localization";
import { PhotoViewerModal } from "../../modals";
import { Property } from "../../models";
import { Theme } from "../../theme";
import { ADDITIONAL_FEATURES_SEPARATOR_CHARACTER } from "../../constants";

const WIDTH = Dimensions.get("window").width;

const SectionContent: React.FC<{
  title: string;
  contentStyle?: StyleProp<ViewStyle>;
}> = ({ title, children, contentStyle }) => (
  <View style={{ paddingVertical: 8 }}>
    <SectionHeader title={title} />
    <View style={[styles.sectionChildrenContent, contentStyle]}>
      {children}
    </View>
  </View>
);

const IoniconsHeaderButton = (props) => (
  <HeaderButton
    {...props}
    IconComponent={Ionicons}
    iconSize={24}
    color={Theme.colors.primaryColor}
  />
);

export const PropertyDetailScreen = () => {
  const { getString } = useLocalization();
  const navigation = useNavigation();
  const route = useRoute();

  const [photoViewerConfig, setPhotoViewerConfig] = useState({
    selectedPhotoIndex: 0,
    isShowed: false,
  });

  const model = route.params["model"] as Property;
  const images = model.imageNames.split(",").filter((a) => a !== "");

  const animation = new Animated.Value(0);
  const opacity = animation.interpolate({
    inputRange: [0, 1, 200],
    outputRange: [0, 0, 1],
    extrapolate: "clamp",
  });

  const onClickPhoto = (index: number) =>
    setPhotoViewerConfig({
      selectedPhotoIndex: index,
      isShowed: true,
    });

  useEffect(() => {
    navigation.setOptions({
      title: model.title,
      headerTransparent: true,
      headerTintColor: Theme.colors.primaryColorDark,
      headerTitleStyle: { opacity },
      headerBackground: () => (
        <Animated.View
          style={[StyleSheet.absoluteFill, styles.headerView, { opacity }]}
        >
          <Divider style={styles.headerDivider} />
        </Animated.View>
      ),
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={IoniconsHeaderButton}>
          <Item
            title="share"
            iconName="md-share-social"
            onPress={() =>
              Share.share({
                title: "asdasd",
                message: `${model.title} (${model.propertyType.name})\n${
                  model.currency
                }${numeral(model.price).format("0,0.00")}`,
              })
            }
          />
        </HeaderButtons>
      ),
    });
  }, [opacity])

  return (
    <>
      <ScrollView
        style={styles.scrollView}
        scrollEventThrottle={16}
        onScroll={Animated.event([
          { nativeEvent: { contentOffset: { y: animation } } },
        ], { useNativeDriver: false })}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollViewContainer}
      >
        <PropertyDetailHeaderView model={model} onPressPhoto={onClickPhoto} />

        <View style={styles.moneyContainer}>
          <Text style={styles.moneyTitle}>{getString("Price")}</Text>
          <Text style={styles.moneyText}>
            {`${model.currency} ${numeral(model.price).format("0,0.00")}`}
            {model.propertyType.name.toLocaleLowerCase("en") === "rent" && (
              <Text style={styles.monthlyText}> {getString("monthly")}</Text>
            )}
          </Text>
        </View>

        <Divider />

        <View>
          <View style={styles.propertiesContainer}>
            <View style={styles.propertyContent}>
              <FontAwesome name="bed" size={20} color={Theme.colors.yellow} />
              <Text style={styles.propertyTitle}>
                {getString("bedroomWithCount", {
                  count: model.bedRoomCount,
                })}
              </Text>
            </View>

            <View style={styles.propertyContent}>
              <FontAwesome name="bath" size={20} color={Theme.colors.yellow} />
              <Text style={styles.propertyTitle}>
                {getString("bathroomWithCount", {
                  count: model.bathRoomCount,
                })}
              </Text>
            </View>
            <View style={styles.propertyContent}>
              <MaterialCommunityIcons
                name="food-variant"
                size={22}
                color={Theme.colors.yellow}
              />
              <Text style={styles.propertyTitle}>
                {getString("kitchenWithCount", {
                  count: model.kitchenRoomCount,
                })}
              </Text>
            </View>
            <View style={styles.propertyContent}>
              <FontAwesome name="car" size={20} color={Theme.colors.yellow} />
              <Text style={styles.propertyTitle}>
                {getString("parkingWithCount", {
                  count: model.parkingCount,
                })}
              </Text>
            </View>
          </View>
        </View>

        <Divider />

        <SectionContent
          title={getString("Description")}
          contentStyle={{ marginTop: -4 }}
        >
          <HtmlView
            htmlContent={model.description}
            imagesMaxWidthOffset={WIDTH - 32}
          />
        </SectionContent>

        <Divider />

        <SectionContent title={getString("Photos")}>
          <FlatList
            data={images}
            renderItem={({ index, item }) => (
              <TouchableOpacity onPress={() => onClickPhoto(index)}>
                <Box>
                  <Image
                    source={{ uri: getImageUrl(item) }}
                    style={styles.previewImage}
                  />
                </Box>
              </TouchableOpacity>
            )}
            keyExtractor={(_, index) => `propertyImageKey${index}`}
            horizontal
            ItemSeparatorComponent={() => <Separator horizontal />}
            contentContainerStyle={styles.previewImagesContainer}
            style={styles.previewImages}
            showsHorizontalScrollIndicator={false}
          />
        </SectionContent>

        <Divider />

        {model.additionalFeatures && (
          <>
            <SectionContent title={getString("Property Details")}>
              {model.additionalFeatures
                .split(ADDITIONAL_FEATURES_SEPARATOR_CHARACTER)
                .filter((a) => a !== "")
                .map((item, index) => (
                  <View
                    style={styles.propertyDetailRow}
                    key={`featureKey${index}`}
                  >
                    <Ionicons
                      name="ios-checkmark-circle-outline"
                      color={Theme.colors.primaryColorDark}
                      size={22}
                    />
                    <Text style={styles.propertyDetailTitle}>
                      {item.trim()}
                    </Text>
                  </View>
                ))}
            </SectionContent>

            <Divider />
          </>
        )}

        <SectionContent title={getString("Location")}>
          <View style={styles.mapViewContainer}>
            <MapView
              style={styles.mapView}
              provider={PROVIDER_GOOGLE}
              initialRegion={{
                latitude: Number(model.latitude),
                longitude: Number(model.longitude),
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}
            >
              <Marker
                coordinate={{
                  latitude: Number(model.latitude),
                longitude: Number(model.longitude),
                }}
              />
            </MapView>
          </View>
        </SectionContent>

        <Divider />

        <SectionContent
          title={getString("Contact")}
          contentStyle={styles.contactContent}
        >
          <View style={styles.flex1}>
            <Text style={styles.contactName}>
              {`${model.user.firstName} ${model.user.lastName}`}
            </Text>
            <Text style={styles.contactAddress}>{model.user.address}</Text>
          </View>
          <CircleIconButton
            iconColor={Theme.colors.primaryColor}
            iconName="ios-call"
            iconSize={23}
            size={46}
            onPress={() => Linking.openURL(`tel:${model.user.phoneNumber}`)}
          />
          <CircleIconButton
            iconColor={Theme.colors.primaryColor}
            iconName="ios-mail"
            iconSize={25}
            size={46}
            style={{ marginStart: 16 }}
            onPress={() => Linking.openURL(`mailto:${model.user.email}`)}
          />
        </SectionContent>
        <PhotoViewerModal
          imageNames={images}
          selectedImageIndex={photoViewerConfig.selectedPhotoIndex}
          visible={photoViewerConfig.isShowed}
          onSwipeDown={() => {
            setPhotoViewerConfig({
              ...photoViewerConfig,
              isShowed: false,
            });
          }}
        />
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  flex1: { flex: 1 },
  headerView: { backgroundColor: "white" },
  headerDivider: { position: "absolute", bottom: 0, left: 0, right: 0 },
  scrollView: { flex: 1, backgroundColor: "white" },
  scrollViewContainer: { paddingBottom: 24 },
  moneyContainer: {
    marginTop: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  moneyTitle: {
    fontFamily: "default-medium",
    color: Theme.colors.primaryColorDark,
  },
  moneyText: {
    color: Theme.colors.textColor,
    fontSize: 24,
    fontFamily: "default-medium",
    paddingVertical: 8,
    textAlign: "justify",
  },
  monthlyText: { fontSize: 14, color: "gray", textAlign: "justify" },
  propertiesContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 16,
    alignItems: "center",
    alignContent: "center",
  },
  propertyContent: {
    alignItems: "center",
    justifyContent: "center",
  },
  propertyTitle: {
    fontSize: 12,
    marginTop: 8,
    color: "gray",
  },
  previewImages: { marginHorizontal: -16 },
  previewImagesContainer: { paddingVertical: 8, paddingHorizontal: 16 },
  previewImage: {
    width: 100,
    height: 100,
    borderRadius: Theme.sizes.boxBorderRadius,
  },
  propertyDetailRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 6,
  },
  propertyDetailTitle: {
    fontSize: 15,
    marginStart: 12,
    color: Theme.colors.textColor,
  },
  mapViewContainer: {
    borderRadius: Theme.sizes.boxBorderRadius,
    overflow: "hidden",
  },
  mapView: {
    borderRadius: Theme.sizes.boxBorderRadius,
    height: 180,
  },
  contactContent: {
    flexDirection: "row",
  },
  contactName: {
    fontSize: 18,
    fontFamily: "default-medium",
    color: Theme.colors.primaryColorDark,
    textAlign: "justify",
  },
  contactAddress: {
    fontSize: 13,
    fontFamily: "default-medium",
    color: "gray",
    marginTop: 4,
  },
  sectionChildrenContent: {
    paddingHorizontal: 16,
    paddingTop: 4,
    paddingBottom: 8,
  },
});
