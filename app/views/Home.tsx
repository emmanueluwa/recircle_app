import colours from "@utils/colours";
import WelcomeHeader from "@ui/WelcomeHeader";
import { FC, useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import ChatNotification from "@ui/ChatNotification";
import { AppStackParamList } from "app/navigator/AppNavigator";
import SearchBar from "@components/SearchBar";
import size from "@utils/size";
import CategoryList from "@components/CategoryList";
import LatestProductList, {
  LatestProduct,
} from "@components/LatestProductList";
import useClient from "app/hooks/useClient";
import { runAxiosAsync } from "app/api/runAxiosAsync";
import socket, { handleSocketConnection } from "app/socket";
import useAuth from "app/hooks/useAuth";
import { useDispatch } from "react-redux";

const testData = [];

interface Props {}

export interface SignInRes {
  profile: {
    id: string;
    email: string;
    name: string;
    verified: boolean;
    avatar?: string;
  };
  tokens: {
    refresh: string;
    access: string;
  };
}

const Home: FC<Props> = (props) => {
  const [products, setProducts] = useState<LatestProduct[]>([]);
  const { navigate } = useNavigation<NavigationProp<AppStackParamList>>();

  const { authClient } = useClient();
  const { authState } = useAuth();
  const dispatch = useDispatch();

  const fetchLatestProduct = async () => {
    const res = await runAxiosAsync<{ products: LatestProduct[] }>(
      authClient.get("product/latest")
    );
    if (res?.products) {
      setProducts(res.products);
    }
  };

  useEffect(() => {
    fetchLatestProduct();
  }, []);

  useEffect(() => {
    if (authState.profile) handleSocketConnection(authState.profile, dispatch);

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <>
      <ChatNotification onPress={() => navigate("Messages")} />
      <ScrollView style={styles.container}>
        <SearchBar />
        <CategoryList
          onPress={(category) => navigate("ProductList", { category })}
        />
        <LatestProductList
          data={products}
          onPress={({ id }) => navigate("DetailProduct", { id })}
        />
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: size.padding },
  innerContainer: {
    padding: 15,
    flex: 1,
  },

  formContainer: { marginTop: 30 },
});

export default Home;
