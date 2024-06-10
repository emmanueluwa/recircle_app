import colours from "@utils/colours";
import { FC, useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import size from "@utils/size";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AppStackParamList } from "app/navigator/AppNavigator";
import useClient from "app/hooks/useClient";
import { runAxiosAsync } from "app/api/runAxiosAsync";
import { LatestProduct } from "@components/LatestProductList";
import ProductGridView from "@components/ProductGridView";
import AppHeader from "@components/AppHeader";
import BackButton from "@ui/BackButton";
import EmptyView from "@ui/EmptyView";
import ProductCard from "@ui/ProductCard";

type Props = NativeStackScreenProps<AppStackParamList, "ProductList">;

const column = 2;

const ProductList: FC<Props> = ({ route, navigation }) => {
  const { authClient } = useClient();
  const { category } = route.params;

  const [products, setProducts] = useState<LatestProduct[]>([]);

  const isOdd = products.length % column !== 0;

  const fetchProducts = async (category: string) => {
    const res = await runAxiosAsync<{ products: LatestProduct[] }>(
      authClient.get("/product/by-category/" + category)
    );
    if (res) {
      setProducts(res.products);
    }
  };

  useEffect(() => {
    fetchProducts(category);
  }, [category]);

  if (!products.length)
    return (
      <View style={styles.container}>
        <AppHeader
          backButton={<BackButton />}
          center={<Text style={styles.title}>{category}</Text>}
        />

        <EmptyView title="No products in this category at the moment" />
      </View>
    );

  return (
    <View style={styles.container}>
      <AppHeader
        backButton={<BackButton />}
        center={<Text style={styles.title}>{category}</Text>}
      />

      <FlatList
        numColumns={column}
        data={products}
        renderItem={({ item, index }) => (
          <View
            style={{
              flex: isOdd && index == products.length - 1 ? 1 / column : 1,
            }}
          >
            <ProductCard
              product={item}
              onPress={({ id }) => navigation.navigate("DetailProduct", { id })}
            />
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: size.padding },
  title: {
    fontWeight: "600",
    color: colours.primary,
    paddingBottom: 5,
    fontSize: 18,
  },
});

export default ProductList;
