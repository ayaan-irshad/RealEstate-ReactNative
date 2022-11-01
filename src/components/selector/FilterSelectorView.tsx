import React from "react";
import {
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ViewStyle,
  StyleProp,
} from "react-native";

import { Theme } from "../../theme";
import { Separator } from "../divider";
import { Text } from "../text";

type TProps<T> = {
  items: T[];
  selectedItems: T[];
  style?: StyleProp<ViewStyle>;
  getTitle: (item: T) => string;
  onClickItem?: (item: T, isSelected: boolean) => void;
  checkSelectedCondination?: (selectedItems: T[], item: T) => boolean;
};

type TState<T> = {
  selectedItem: T;
};

export class FilterSelectorView<T> extends React.Component<
  TProps<T>,
  TState<T>
> {
  render() {
    const { checkSelectedCondination, selectedItems } = this.props;
    return (
      <FlatList
        horizontal
        data={this.props.items}
        renderItem={({ item }) => {
          const isSelected = checkSelectedCondination
            ? checkSelectedCondination(selectedItems, item)
            : selectedItems.includes(item);
          return (
            <TouchableOpacity
              onPress={() => this.props.onClickItem(item, isSelected)}
              style={[
                styles.item,
                isSelected
                  ? {
                      backgroundColor: Theme.colors.green,
                      borderColor: Theme.colors.green,
                    }
                  : {
                      backgroundColor: "white",
                      borderColor: Theme.colors.lightgray,
                    },
              ]}
            >
              <Text
                style={{
                  color: isSelected ? "white" : "gray",
                  fontSize: 14,
                }}
              >
                {this.props.getTitle(item)}
              </Text>
            </TouchableOpacity>
          );
        }}
        ItemSeparatorComponent={() => <Separator horizontal />}
        contentContainerStyle={[this.props.style]}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(_, index) => `itemKey${index}`}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  item: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    minWidth: 60,
    alignItems: "center",
  },
});
