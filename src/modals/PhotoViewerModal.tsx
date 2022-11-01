import React from "react";
import { StyleSheet } from "react-native";
import ImageViewer from "react-native-image-zoom-viewer";
import { ReactNativeModal } from "react-native-modal";

import { getImageUrl } from "../helpers";

type TProps = {
  imageNames: string[];
  visible: boolean;
  selectedImageIndex: number;
  onChange?: (currentIndex: number) => void;
  onSwipeDown?: () => void;
};

export const PhotoViewerModal: React.FC<TProps> = (props) => {
  return (
    <ReactNativeModal
      isVisible={props.visible}
      backdropColor="black"
      onBackButtonPress={props.onSwipeDown}
      style={{ margin: 0, padding: 0, backgroundColor: "black " }}
      animationIn="fadeIn"
      animationOut="fadeOut"
    >
      <ImageViewer
        enableSwipeDown
        swipeDownThreshold={200}
        onSwipeDown={props.onSwipeDown}
        imageUrls={props.imageNames.map((item) => {
          return {
            url: getImageUrl(item),
          };
        })}
        footerContainerStyle={styles.footerContainerStyle}
        backgroundColor="#000000"
        index={props.selectedImageIndex}
        onChange={props.onChange}
      />
    </ReactNativeModal>
  );
};

const styles = StyleSheet.create({
  footerContainerStyle: {
    backgroundColor: "#000000AA",
    left: 0,
    right: 0,
    bottom: 0,
  },
});
