import { FC } from "react";
import { StyleSheet } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "@views/Home";
import Profile from "@views/Profile";
import Messages from "@views/Messages";
import ProductList from "@views/ProductList";
import { Product } from "app/store/listings";
import DetailProduct from "@views/DetailProduct";
import ChatWindow from "@views/ChatWindow";

export type AppStackParamList = {
  Home: undefined;
  Messages: undefined;
  ProductList: { category: string };
  DetailProduct: { product?: Product; id?: string };
  ChatWindow: {
    conversationId?: string;
    peerProfile: { id: string; name: string; avatar?: string };
  };
};
const Stack = createNativeStackNavigator<AppStackParamList>();

interface Props {}

const AppNavigator: FC<Props> = (props) => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Messages" component={Messages} />
      <Stack.Screen name="ProductList" component={ProductList} />
      <Stack.Screen name="DetailProduct" component={DetailProduct} />
      <Stack.Screen name="ChatWindow" component={ChatWindow} />
    </Stack.Navigator>
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

export default AppNavigator;
