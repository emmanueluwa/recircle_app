import { FC, useEffect, useState } from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Profile from "@views/Profile";
import AppHeader from "@components/AppHeader";
import BackButton from "@ui/BackButton";
import useClient from "app/hooks/useClient";
import { runAxiosAsync } from "app/api/runAxiosAsync";
import size from "@utils/size";
import ProductImage from "@ui/ProductImage";
import { Product } from "./DetailProduct";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { ProfileNavigatorParamList } from "app/navigator/ProfileNavigator";

const Stack = createNativeStackNavigator();

interface Props {}

type ListingResponse = {
  products: Product[];
};

const Listings: FC<Props> = (props) => {
  const { navigate } =
    useNavigation<NavigationProp<ProfileNavigatorParamList>>();

  const { authClient } = useClient();

  const [listings, setListings] = useState<Product[]>([]);
  const [fetching, setFetching] = useState(false);

  const fetchListings = async () => {
    setFetching(true);
    const res = await runAxiosAsync<ListingResponse>(
      authClient.get("/product/listings")
    );
    setFetching(false);
    if (res) {
      setListings(res.products);
    }
  };

  useEffect(() => {
    fetchListings();
  }, []);

  return (
    <>
      <AppHeader backButton={<BackButton />} />
      <View>
        <FlatList
          refreshing={fetching}
          onRefresh={fetchListings}
          data={listings}
          contentContainerStyle={styles.flatList}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => {
            return (
              <Pressable
                onPress={() => navigate("DetailProduct", { product: item })}
                style={styles.listItem}
              >
                <ProductImage uri={item.thumbnail} />
                <Text style={styles.productName} numberOfLines={2}>
                  {item.name}
                </Text>
              </Pressable>
            );
          }}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: size.padding },
  innerContainer: {
    padding: 15,
    flex: 1,
  },

  listItem: { paddingBottom: size.padding },
  flatList: {
    paddingBottom: 20,
  },

  productName: {
    fontWeight: "700",
    fontSize: 20,
    letterSpacing: 1,
    paddingTop: 10,
  },
});

export default Listings;
