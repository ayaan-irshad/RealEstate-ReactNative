import MultiSlider from "@ptomasroos/react-native-multi-slider";
import numeral from "numeral";
import React, { useMemo, useState } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import ReactNativeModal from "react-native-modal";
import SafeAreaView from "react-native-safe-area-view";

import { FilterSelectorView, Separator, Text } from "../components";
import {
  SEARCH_MIN_PRICE,
  SEARCH_MAX_PRICE,
  SEARCH_MIN_SIZE,
  SEARCH_MAX_SIZE,
} from "../constants";
import { useLocalization } from "../localization";
import {
  SearchConstantsModel,
  PropertyType,
  PropertyCategory,
  City,
  SearchPropertyRequestModel,
} from "../models";
import { Theme } from "../theme";

const WIDTH = Dimensions.get("window").width;

const Marker = ({ value, isMoneyFormat }) => (
  <View>
    <View style={styles.markerCircle} />
    <Text style={styles.markerTitle}>
      {isMoneyFormat ? numeral(value).format("$0,0") : value}
    </Text>
  </View>
);

type TProps = {
  isVisible: boolean;
  filterData: SearchPropertyRequestModel;
  onChangeFilterData: (filterData: SearchPropertyRequestModel) => void;
  searchConstants?: SearchConstantsModel;
  onDismissModal: () => void;
};

export const SearchFilterBottomSheetModal: React.FC<TProps> = ({
  isVisible,
  filterData,
  onChangeFilterData,
  searchConstants,
  onDismissModal,
}) => {
  const { getString, currentLanguage } = useLocalization();
  const [filterDataState, setFilterDataState] = useState(filterData);

  const content = useMemo(() => {
    return (
      <SafeAreaView style={styles.container} forceInset={{ top: "always" }}>
        <ScrollView>
          <Text style={styles.modalFilterTitle}>{getString("Type")}</Text>
          <FilterSelectorView<PropertyType>
            items={searchConstants ? searchConstants.propertyTypes : []}
            getTitle={(item) => item.name}
            selectedItems={filterDataState.propertyTypes}
            style={styles.filterSelectorView}
            onClickItem={(item, isSelected) => {
              if (isSelected) {
                setFilterDataState({
                  ...filterDataState,
                  propertyTypes: filterDataState.propertyTypes.filter(
                    (a) => a.id !== item.id
                  ),
                });
              } else if (
                !filterDataState.propertyTypes.find((a) => a.id === item.id)
              ) {
                filterDataState.propertyTypes.push(item);
                setFilterDataState({ ...filterDataState });
              }
            }}
            checkSelectedCondination={(selectedItems, item) =>
              selectedItems.findIndex((a) => a.id === item.id) > -1
            }
          />

          <Separator height={8} />

          <Text style={styles.modalFilterTitle}>{getString("Price")}</Text>
          <MultiSlider
            values={[filterDataState.minPrice, filterDataState.maxPrice]}
            sliderLength={WIDTH - 64}
            min={SEARCH_MIN_PRICE}
            max={SEARCH_MAX_PRICE}
            enabledTwo
            isMarkersSeparated
            containerStyle={{
              backgroundColor: "white",
              marginHorizontal: 32,
              marginBottom: 8,
            }}
            onValuesChangeFinish={(values) => {
              setFilterDataState({
                ...filterDataState,
                minPrice: values[0],
                maxPrice: values[1],
              });
            }}
            step={10}
            selectedStyle={{ backgroundColor: Theme.colors.green }}
            unselectedStyle={{ backgroundColor: Theme.colors.lightgray }}
            customMarkerLeft={(e) => (
              <Marker value={e.currentValue} isMoneyFormat />
            )}
            customMarkerRight={(e) => (
              <Marker value={e.currentValue} isMoneyFormat />
            )}
          />

          <Separator height={8} />

          <Text style={styles.modalFilterTitle}>{getString("Categories")}</Text>
          <FilterSelectorView<PropertyCategory>
            items={searchConstants ? searchConstants.propertyCategories : []}
            getTitle={(item) => item.name}
            selectedItems={filterDataState.propertyCategories}
            style={styles.filterSelectorView}
            onClickItem={(item, isSelected) => {
              if (isSelected) {
                setFilterDataState({
                  ...filterDataState,
                  propertyCategories: filterDataState.propertyCategories.filter(
                    (a) => a.id !== item.id
                  ),
                });
              } else if (
                !filterDataState.propertyCategories.find(
                  (a) => a.id === item.id
                )
              ) {
                filterDataState.propertyCategories.push(item);
                setFilterDataState({ ...filterDataState });
              }
            }}
          />

          <Separator height={8} />

          <Text style={styles.modalFilterTitle}>{getString("Bedrooms")}</Text>
          <FilterSelectorView<number>
            items={[0, 1, 2, 3, 4, 5]}
            getTitle={(item) =>
              item === 0 ? "Any" : item === 5 ? "5+" : String(item)
            }
            selectedItems={filterDataState.bedRoomCounts}
            style={styles.filterSelectorView}
            onClickItem={(item, isSelected) => {
              if (isSelected) {
                setFilterDataState({
                  ...filterDataState,
                  bedRoomCounts: filterDataState.bedRoomCounts.filter(
                    (a) => a !== item
                  ),
                });
              } else if (
                !filterDataState.bedRoomCounts.find((a) => a === item)
              ) {
                setFilterDataState({
                  ...filterDataState,
                  bedRoomCounts: [item],
                });
              }
            }}
          />

          <Separator height={8} />

          <Text style={styles.modalFilterTitle}>{getString("Bathrooms")}</Text>
          <FilterSelectorView<number>
            items={[0, 1, 2, 3, 4, 5]}
            getTitle={(item) =>
              item === 0 ? "Any" : item === 5 ? "5+" : String(item)
            }
            selectedItems={filterDataState.bathRoomCounts}
            style={styles.filterSelectorView}
            onClickItem={(item, isSelected) => {
              if (isSelected) {
                setFilterDataState({
                  ...filterDataState,
                  bathRoomCounts: filterDataState.bathRoomCounts.filter(
                    (a) => a !== item
                  ),
                });
              } else if (
                !filterDataState.bathRoomCounts.find((a) => a === item)
              ) {
                setFilterDataState({
                  ...filterDataState,
                  bathRoomCounts: [item],
                });
              }
            }}
          />

          <Separator height={8} />

          <Text style={styles.modalFilterTitle}>{getString("Kitchens")}</Text>
          <FilterSelectorView<number>
            items={[0, 1, 2, 3, 4, 5]}
            getTitle={(item) =>
              item === 0 ? "Any" : item === 5 ? "5+" : String(item)
            }
            selectedItems={filterDataState.kitchenRoomCounts}
            style={styles.filterSelectorView}
            onClickItem={(item, isSelected) => {
              if (isSelected) {
                setFilterDataState({
                  ...filterDataState,
                  kitchenRoomCounts: filterDataState.kitchenRoomCounts.filter(
                    (a) => a !== item
                  ),
                });
              } else if (
                !filterDataState.kitchenRoomCounts.find((a) => a === item)
              ) {
                setFilterDataState({
                  ...filterDataState,
                  kitchenRoomCounts: [item],
                });
              }
            }}
          />

          <Separator height={8} />

          <Text style={styles.modalFilterTitle}>{getString("Parkings")}</Text>
          <FilterSelectorView<number>
            items={[0, 1, 2, 3, 4, 5]}
            getTitle={(item) =>
              item === 0 ? "Any" : item === 5 ? "5+" : String(item)
            }
            selectedItems={filterDataState.parkingCounts}
            style={styles.filterSelectorView}
            onClickItem={(item, isSelected) => {
              if (isSelected) {
                setFilterDataState({
                  ...filterDataState,
                  parkingCounts: filterDataState.parkingCounts.filter(
                    (a) => a !== item
                  ),
                });
              } else if (
                !filterDataState.parkingCounts.find((a) => a === item)
              ) {
                setFilterDataState({
                  ...filterDataState,
                  parkingCounts: [item],
                });
              }
            }}
          />

          <Separator height={8} />

          <Text style={styles.modalFilterTitle}>{getString("Size")}</Text>
          <MultiSlider
            values={[filterDataState.minSize, filterDataState.maxSize]}
            sliderLength={WIDTH - 64}
            min={SEARCH_MIN_SIZE}
            max={SEARCH_MAX_SIZE}
            enabledTwo
            isMarkersSeparated
            containerStyle={{
              backgroundColor: "white",
              marginHorizontal: 32,
              marginBottom: 8,
            }}
            onValuesChangeFinish={(values) => {
              setFilterDataState({
                ...filterDataState,
                minSize: values[0],
                maxSize: values[1],
              });
            }}
            step={5}
            selectedStyle={{ backgroundColor: Theme.colors.green }}
            unselectedStyle={{ backgroundColor: Theme.colors.lightgray }}
            customMarkerLeft={(e) => (
              <Marker value={e.currentValue} isMoneyFormat={false} />
            )}
            customMarkerRight={(e) => (
              <Marker value={e.currentValue} isMoneyFormat={false} />
            )}
          />

          <Separator height={8} />

          <Text style={styles.modalFilterTitle}>{getString("Cities")}</Text>
          <FilterSelectorView<City>
            items={searchConstants ? searchConstants.cities : []}
            getTitle={(item) => item.name}
            selectedItems={filterDataState.cities}
            style={styles.filterSelectorView}
            onClickItem={(item, isSelected) => {
              if (isSelected) {
                setFilterDataState({
                  ...filterDataState,
                  cities: filterDataState.cities.filter(
                    (a) => a.id !== item.id
                  ),
                });
              } else if (
                !filterDataState.cities.find((a) => a.id === item.id)
              ) {
                filterDataState.cities.push(item);
                setFilterDataState({ ...filterDataState });
              }
            }}
            checkSelectedCondination={(selectedItems, item) =>
              selectedItems.findIndex((a) => a.id === item.id) > -1
            }
          />

          <Separator height={48} />
        </ScrollView>
      </SafeAreaView>
    );
  }, [currentLanguage]);

  return (
    <ReactNativeModal
      isVisible={isVisible}
      swipeDirection={null}
      style={styles.modal}
      propagateSwipe
      onSwipeComplete={onDismissModal}
      onBackdropPress={onDismissModal}
      onBackButtonPress={onDismissModal}
      onModalHide={() => onChangeFilterData(filterDataState)}
    >
      {content}
    </ReactNativeModal>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    paddingTop: 24,
    borderTopStartRadius: 24,
    borderTopEndRadius: 24,
    height: 500,
  },
  modal: {
    justifyContent: "flex-end",
    margin: 0,
  },
  modalFilterTitle: {
    fontFamily: "default-medium",
    fontSize: 16,
    color: Theme.colors.textColor,
    paddingVertical: 6,
    paddingHorizontal: 16,
  },
  filterSelectorView: { paddingVertical: 6, paddingHorizontal: 16 },
  markerCircle: {
    width: 28,
    height: 28,
    backgroundColor: "white",
    borderColor: Theme.colors.green,
    borderWidth: 2.5,
    borderRadius: 28,
  },
  markerTitle: {
    textAlign: "center",
    fontFamily: "default-medium",
    color: Theme.colors.green,
    alignSelf: "center",
    position: "absolute",
    fontSize: 13,
    width: 120,
    bottom: -20,
  },
});
