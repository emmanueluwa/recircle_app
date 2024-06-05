import { FC, useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Profile from "@views/Profile";
import AppHeader from "@components/AppHeader";
import BackButton from "@ui/BackButton";
import useClient from "app/hooks/useClient";
import { runAxiosAsync } from "app/api/runAxiosAsync";

const Stack = createNativeStackNavigator();

interface Props {}

type Product = {
  id: string;
  name: string;
  thumbnail?: string;
  category: string;
  price: number;
  image?: string[];
  date: Date;
  description: string;
  seller: {
    id: string;
    name: string;
    avatar?: string;
  };
};

type ListingResponse = {
  products: Product[];
};

const Listings: FC<Props> = (props) => {
  const [listings, setListings] = useState<Product[]>([]);
  const { authClient } = useClient();

  const fetchListings = async () => {
    const res = await runAxiosAsync<ListingResponse>(
      authClient.get("/product/listings")
    );

    if (res) {
      setListings(res.products);
    }
  };

  useEffect(() => {
    fetchListings();
  }, []);

  return (
    <View>
      <AppHeader backButton={<BackButton />} />

      <FlatList
        data={listings}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          return <Text>{item.name}</Text>;
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  innerContainer: {
    padding: 15,
    flex: 1,
  },

  formContainer: { marginTop: 30 },
});

export default Listings;
