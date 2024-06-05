import { useNavigation } from "@react-navigation/native";
import ProductImage from "@ui/ProductImage";
import colours from "@utils/colours";
import size from "@utils/size";
import { FC, useState } from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";

interface Props {
  images?: string[];
}

const ImageSlider: FC<Props> = ({ images }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  return (
    <View style={styles.container}>
      <FlatList
        contentContainerStyle={styles.flatList}
        data={images}
        renderItem={({ item }) => <ProductImage uri={item} />}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
      />
      <View style={styles.indicator}>
        <Text style={styles.indicatorText}>
          {activeIndex + 1}/{images?.length}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  flatList: { position: "relative" },
  indicatorText: { color: colours.white, fontWeight: "600" },
  indicator: {
    position: "absolute",
    width: 35,
    height: 25,
    backgroundColor: colours.backDropDark,
    bottom: 10,
    right: 10,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
  },
});

export default ImageSlider;
