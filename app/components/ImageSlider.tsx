import { useNavigation } from "@react-navigation/native";
import ProductImage from "@ui/ProductImage";
import colours from "@utils/colours";
import size from "@utils/size";
import { FC, useState } from "react";
import { FlatList, Pressable, StyleSheet, View } from "react-native";

interface Props {
  images?: string[];
}

const ImageSlider: FC<Props> = ({ images }) => {
  const { goBack, canGoBack } = useNavigation();
  return (
    <View style={styles.container}>
      <FlatList
        data={images}
        renderItem={({ item }) => <ProductImage uri={item} />}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: size.padding,
  },
});

export default ImageSlider;
ImageSlider;
