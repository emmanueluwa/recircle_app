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

const data = [
  {
    id: "1",
    name: "Vintage Camera",
    price: 99.99,
    thumbnail:
      "https://images.unsplash.com/photo-1519183071298-a2962d9da8b6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MXwyMDg2N3wwfDF8c2VhcmNofDJ8fGNhbWVyYXxlbnwwfHx8fA&ixlib=rb-1.2.1&q=80&w=400",
  },
  {
    id: "2",
    name: "Leather Backpack",
    price: 79.99,
    thumbnail:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MXwyMDg2N3wwfDF8c2VhcmNofDF8fGJhY2twYWNrfGVufDB8fHx8&ixlib=rb-1.2.1&q=80&w=400",
  },
  {
    id: "3",
    name: "Running Shoes",
    price: 59.99,
    thumbnail:
      "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MXwyMDg2N3wwfDF8c2VhcmNofDEwfHxydW5uaW5nJTIwc2hvZXN8ZW58MHx8fHw&ixlib=rb-1.2.1&q=80&w=400",
  },
  {
    id: "4",
    name: "Smart Watch",
    price: 199.99,
    thumbnail:
      "https://images.unsplash.com/photo-1517430816045-df4b7de00dbb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MXwyMDg2N3wwfDF8c2VhcmNofDV8fHNtYXJ0JTIwd2F0Y2h8ZW58MHx8fHw&ixlib=rb-1.2.1&q=80&w=400",
  },
  {
    id: "5",
    name: "Wireless Headphones",
    price: 149.99,
    thumbnail:
      "https://images.unsplash.com/photo-1519677100203-a0e668c92439?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MXwyMDg2N3wwfDF8c2VhcmNofDZ8fHdpcmVsZXNzJTIwaGVhZHBob25lc3xlbnwwfHx8fA&ixlib=rb-1.2.1&q=80&w=400",
  },
];

const Home: FC<Props> = (props) => {
  const [products, setProducts] = useState<LatestProduct[]>([]);
  const { navigate } = useNavigation<NavigationProp<AppStackParamList>>();

  const { authClient } = useClient();

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

  return (
    <>
      <ChatNotification onPress={() => navigate("Messages")} />
      <ScrollView style={styles.container}>
        <SearchBar />
        <CategoryList onPress={() => navigate("ProductList")} />
        <LatestProductList data={products} />
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
