import { MaterialCommunityIcons } from "@expo/vector-icons";
import {
  useNavigation,
  useFocusEffect,
  useRoute,
} from "@react-navigation/native";
import React, { useState, useEffect, useRef } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Alert,
  RefreshControl,
} from "react-native";
import { FlatList } from "react-native-gesture-handler";
import SafeAreaView from "react-native-safe-area-view";

import { TextInput, Separator, ListingItemView, Text } from "../../components";
import {
  SEARCH_MIN_PRICE,
  SEARCH_MAX_PRICE,
  SEARCH_MIN_SIZE,
  SEARCH_MAX_SIZE,
} from "../../constants";
import { useLocalization } from "../../localization";
import { SearchFilterBottomSheetModal } from "../../modals";
import {
  SearchConstantsModel,
  SearchPropertyRequestModel,
  Property,
  City,
} from "../../models";
import NavigationNames from "../../navigations/NavigationNames";
import { SearchService } from "../../services";
import { Theme } from "../../theme";

export const SearchScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { getString } = useLocalization();
  const refSearchInput = useRef<any>();

  const [isVisibleFilterModal, setIsVisibleFilterModal] = useState(false);
  const [resultList, setResultList] = useState<Property[]>([]);
  const [searchText, setSearchText] = useState("");
  const [searchConstants, setSearchConstants] = useState<SearchConstantsModel>(
    null
  );
  const [filterData, setFilterData] = useState<SearchPropertyRequestModel>({
    searchText: "",
    propertyTypes: [],
    propertyCategories: [],
    cities: [],
    bedRoomCounts: [0],
    bathRoomCounts: [0],
    kitchenRoomCounts: [0],
    parkingCounts: [0],
    minSize: SEARCH_MIN_SIZE,
    maxSize: SEARCH_MAX_SIZE,
    minPrice: SEARCH_MIN_PRICE,
    maxPrice: SEARCH_MAX_PRICE,
    address: "",
  });

  const onClickListingItem = (item: Property) => {
    navigation.navigate(NavigationNames.PropertyDetailScreenForSearchTab, {
      model: { ...item },
    });
  };

  const searchProperty = (filterData: SearchPropertyRequestModel) => {
    filterData.searchText = searchText;
    SearchService.searchProperties(filterData)
      .then((res) => setResultList(res.data))
      .catch((err) => Alert.alert(err.message));
    setFilterData({ ...filterData });
  };

  var filters = [];
  if (filterData) {
    filters = [
      ...filterData.propertyTypes.map((a) => a.name),
      ...filterData.propertyCategories.map((a) => a.name),
    ];
    filterData.bathRoomCounts[0] > 0 &&
      filters.push(`Bath ${filterData.bathRoomCounts[0]}`);
    filterData.bedRoomCounts[0] > 0 &&
      filters.push(`Bed ${filterData.bedRoomCounts[0]}`);
    filterData.kitchenRoomCounts[0] > 0 &&
      filters.push(`Kitchen ${filterData.kitchenRoomCounts[0]}`);
    filterData.parkingCounts[0] > 0 &&
      filters.push(`Parking ${filterData.parkingCounts[0]}`);
    filterData.cities.forEach((a) => filters.push(a.name));
  }

  useEffect(() => {
    SearchService.getSearchConstants()
      .then((res) => {
        setSearchConstants(res.data);
        setFilterData({
          ...filterData,
          propertyTypes: res.data.propertyTypes,
        });
        searchProperty(filterData);
      })
      .catch((err) => Alert.alert(err.message));
  }, []);

  useFocusEffect(() => {
    if (route.params) {
      var focusSearchInput = route.params["focusSearchInput"];
      if (focusSearchInput) {
        refSearchInput.current && refSearchInput.current.focus();
        delete route.params["focusSearchInput"];
      }
      var searchCity = route.params["searchCity"] as City;
      if (searchCity) {
        if (!filterData.cities.find((a) => a.id === searchCity.id)) {
          filterData.cities.push(searchCity);
        }
        searchProperty(filterData);
        delete route.params["searchCity"];
      }
    }
  });

  return (
    <>
      <SafeAreaView style={styles.safeAreaView} forceInset={{ top: "always" }}>
        <View style={styles.container}>
          <TextInput
            ref={refSearchInput}
            inputProps={{
              placeholder: getString("Search Place Holder"),
              returnKeyType: "search",
              value: searchText,
              onChangeText: setSearchText,
              onSubmitEditing: () => searchProperty(filterData),
            }}
            style={styles.searchInput}
          />
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <FlatList
              data={filters}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.filterItemsContentContainer}
              ItemSeparatorComponent={() => <Separator horizontal width={8} />}
              renderItem={({ item }) => (
                <View style={styles.filterContainer}>
                  <Text style={styles.filterTitle}>{item}</Text>
                </View>
              )}
              keyExtractor={(_, index) => `filterItemKey${index}`}
            />
            <TouchableOpacity
              style={styles.filterButton}
              onPress={() => setIsVisibleFilterModal(true)}
            >
              <Text style={styles.filterButtonText}>
                {getString("Filters")}
              </Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={resultList}
            renderItem={({ item }) => {
              return (
                <ListingItemView
                  model={item}
                  onClick={() => onClickListingItem(item)}
                />
              );
            }}
            ListHeaderComponent={() => (
              <View style={styles.listHeaderContainer}>
                <Text style={styles.resultFoundText}>
                  {getString("searchResultsFound", {
                    count: resultList.length,
                  })}
                </Text>
                <TouchableOpacity
                  style={{ alignItems: "center", flexDirection: "row" }}
                  onPress={() =>
                    navigation.navigate(NavigationNames.SearchMapScreen, {
                      resultList,
                    })
                  }
                >
                  <MaterialCommunityIcons
                    name="google-maps"
                    size={16}
                    color={Theme.colors.primaryColorDark}
                  />
                  <Text
                    style={{
                      marginStart: 4,
                      fontFamily: "default-medium",
                      color: Theme.colors.primaryColorDark,
                    }}
                  >
                    {getString("Go to Map")}
                  </Text>
                </TouchableOpacity>
              </View>
            )}
            ItemSeparatorComponent={() => <Separator height={16} />}
            contentContainerStyle={styles.resultListContentContainer}
            keyExtractor={(_, index) => `propertyItemKey${index}`}
            refreshControl={
              <RefreshControl
                refreshing={false}
                onRefresh={() => searchProperty(filterData)}
              />
            }
          />
        </View>
      </SafeAreaView>
      <SearchFilterBottomSheetModal
        isVisible={isVisibleFilterModal}
        filterData={filterData}
        onChangeFilterData={(_filterData) => searchProperty(_filterData)}
        searchConstants={searchConstants}
        onDismissModal={() => setIsVisibleFilterModal(false)}
      />
    </>
  );
};

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
  },
  container: { flex: 1, backgroundColor: "white" },
  searchInput: {
    marginHorizontal: 16,
    marginVertical: 16,
  },
  filterItemsContentContainer: {
    paddingHorizontal: 16,
    paddingVertical: 4,
  },
  filterContainer: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderWidth: 1.2,
    borderColor: Theme.colors.green,
    borderRadius: 8,
    backgroundColor: "white",
  },
  filterTitle: {
    color: Theme.colors.green,
    fontFamily: "default-medium",
    fontSize: 13,
  },
  filterButton: {
    backgroundColor: Theme.colors.primaryColor,
    marginEnd: 16,
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  filterButtonText: {
    fontFamily: "default-medium",
    fontSize: 15,
    color: "white",
  },
  listHeaderContainer: {
    flexDirection: "row",
    marginBottom: 16,
    justifyContent: "space-between",
    marginHorizontal: 18,
  },
  resultFoundText: {
    fontSize: 20,
    fontFamily: "default-medium",
    color: Theme.colors.textColor,
  },
  resultListContentContainer: { paddingVertical: 16 },
});
