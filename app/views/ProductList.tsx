import colours from "@utils/colours";
import { FC, useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import size from "@utils/size";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AppStackParamList } from "app/navigator/AppNavigator";
import useClient from "app/hooks/useClient";
import { runAxiosAsync } from "app/api/runAxiosAsync";
import { LatestProduct } from "@components/LatestProductList";
import ProductGridView from "@components/ProductGridView";

type Props = NativeStackScreenProps<AppStackParamList, "ProductList">;

const ProductList: FC<Props> = ({ route }) => {
  const { authClient } = useClient();
  const { category } = route.params;

  const [products, setProducts] = useState<LatestProduct[]>([]);

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

  return (
    <View style={styles.container}>
      <ProductGridView data={products} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default ProductList;
