import { FC } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { formatPrice } from "@utils/helper";
import colours from "@utils/colours";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { LatestProduct } from "@components/LatestProductList";

interface Props {
  product: LatestProduct;
  onPress(item: LatestProduct): void;
}

const ProductCard: FC<Props> = ({ product, onPress }) => {
  return (
    <Pressable onPress={() => onPress(product)} style={styles.productContainer}>
      {product.thumbnail ? (
        <Image source={{ uri: product.thumbnail }} style={styles.thumbnail} />
      ) : (
        <View style={[styles.thumbnail, styles.noImageView]}>
          <MaterialCommunityIcons
            name="image-off"
            size={35}
            color={colours.primary}
          />
        </View>
      )}
      <Text style={styles.price}>{formatPrice(product.price)}</Text>
      <Text style={styles.name}>{product.name}</Text>
    </Pressable>
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

export default ProductCard;
