import React from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";

import { Theme } from "../../theme";

var loadingView: LoadingLayout = null;

export const LoadingManager = {
  showLoading: () => loadingView.show(),
  hideLoading: () => loadingView.hide(),
  setLoadingView: (view: LoadingLayout) => (loadingView = view),
};

export class LoadingLayout extends React.Component {
  state = {
    isShowed: false,
  };

  show = () => this.setState({ isShowed: true });
  hide = () => this.setState({ isShowed: false });

  render() {
    if (!this.state.isShowed) {
      return null;
    }
    return (
      <View style={[StyleSheet.absoluteFill, styles.container]}>
        <ActivityIndicator size="large" color={Theme.colors.primaryColor} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#00000010",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1000,
  },
});
