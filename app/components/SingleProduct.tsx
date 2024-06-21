import { useNavigation } from "@react-navigation/native";
import AvatarView from "@ui/AvatarView";
import colours from "@utils/colours";
import { formatDate } from "@utils/date";
import { formatPrice } from "@utils/helper";
import size from "@utils/size";
import { FC, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import ImageSlider from "./ImageSlider";
import { Product } from "app/store/listings";

interface Props {
  product: Product;
}

const SingleProduct: FC<Props> = ({ product }) => {
  const { goBack, canGoBack } = useNavigation();
  return (
    <View style={styles.container}>
      <ScrollView>
        {/* images */}
        <ImageSlider images={product.image} />

        <Text style={styles.category}>{product.location}</Text>
        <Text style={styles.category}>{product.category}</Text>
        <Text style={styles.price}>{formatPrice(product.price)}</Text>
        <Text style={styles.date}>
          Purchased on: {formatDate(product.date, "dd LL yyyy")}
        </Text>
        <Text style={styles.name}>{product.name}</Text>
        <Text style={styles.description}>{product.description}</Text>

        <View style={styles.profileContainer}>
          <AvatarView uri={product.seller.avatar} size={60} />
          <Text style={styles.profileName}>{product.seller.name}</Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: size.padding,
    flex: 1,
  },
  category: { marginTop: 15, color: colours.primary, fontWeight: "700" },
  price: {
    marginTop: 5,
    color: colours.active,
    fontWeight: "700",
    fontSize: 20,
  },
  date: {
    marginTop: 5,
    color: colours.active,
    fontWeight: "700",
  },
  name: {
    marginTop: 15,
    color: colours.primary,
    letterSpacing: 1,
    fontWeight: "700",
    fontSize: 20,
  },
  description: {
    marginTop: 15,
    color: colours.primary,
    letterSpacing: 0.5,
  },
  profileContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 20,
  },
  profileName: {
    paddingLeft: 15,
    color: colours.primary,
    letterSpacing: 0.5,
    fontWeight: "600",
    fontSize: 20,
  },
});

export default SingleProduct;
