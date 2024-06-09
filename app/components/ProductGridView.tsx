import { FC } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { LatestProduct } from "./LatestProductList";
import GridView from "@ui/GridView";
import { formatPrice } from "@utils/helper";
import colours from "@utils/colours";
import { MaterialCommunityIcons } from "@expo/vector-icons";

interface Props {
  data: LatestProduct[];
  onPress(item: LatestProduct): void;
}

const ProductGridView: FC<Props> = ({ data, onPress }) => {
  return (
    <GridView
      data={data}
      renderItem={(item) => {
        return (
          <Pressable
            onPress={() => onPress(item)}
            style={styles.productContainer}
          >
            {item.thumbnail ? (
              <Image
                source={{ uri: item.thumbnail }}
                style={styles.thumbnail}
              />
            ) : (
              <View style={[styles.thumbnail, styles.noImageView]}>
                <MaterialCommunityIcons
                  name="image-off"
                  size={35}
                  color={colours.primary}
                />
              </View>
            )}
            <Text style={styles.price}>{formatPrice(item.price)}</Text>
            <Text style={styles.name}>{item.name}</Text>
          </Pressable>
        );
      }}
    />
  );
};

const styles = StyleSheet.create({
  productContainer: { padding: 7 },
  thumbnail: { width: "100%", height: 100, borderRadius: 5 },
  price: {
    fontSize: 16,
    fontWeight: "600",
    paddingTop: 5,
    color: colours.active,
  },
  name: {
    fontSize: 16,
    fontWeight: "600",
    color: colours.primary,
  },
  noImageView: {
    backgroundColor: colours.inActive,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default ProductGridView;
