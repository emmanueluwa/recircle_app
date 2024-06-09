import { FC } from "react";
import { StyleSheet } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Profile from "@views/Profile";
import Messages from "@views/Messages";
import Listings from "@views/Listings";
import DetailProduct from "@views/DetailProduct";
import { Product } from "app/store/listings";
import ChatWindow from "@views/ChatWindow";
import EditProduct from "@views/EditProduct";

export type ProfileNavigatorParamList = {
  Profile: undefined;
  Messages: undefined;
  Listings: undefined;
  DetailProduct: { product?: Product; id?: string };
  EditProduct: { product: Product };
  ChatWindow: undefined;
};

const Stack = createNativeStackNavigator<ProfileNavigatorParamList>();

interface Props {}

const ProfileNavigator: FC<Props> = (props) => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="Messages" component={Messages} />
      <Stack.Screen name="Listings" component={Listings} />
      <Stack.Screen name="DetailProduct" component={DetailProduct} />
      <Stack.Screen name="ChatWindow" component={ChatWindow} />
      <Stack.Screen name="EditProduct" component={EditProduct} />
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

export default ProfileNavigator;
