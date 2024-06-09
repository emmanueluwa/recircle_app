import AppHeader from "@components/AppHeader";
import SingleProduct from "@components/SingleProduct";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Feather, AntDesign } from "@expo/vector-icons";
import BackButton from "@ui/BackButton";
import colours from "@utils/colours";
import useAuth from "app/hooks/useAuth";
import { ProfileNavigatorParamList } from "app/navigator/ProfileNavigator";
import { FC, useEffect, useState } from "react";
import { Alert, Pressable, StyleSheet, Text, View } from "react-native";
import OptionButton from "@ui/OptionButton";
import OptionsModal from "@components/OptionsModal";
import useClient from "app/hooks/useClient";
import { runAxiosAsync } from "app/api/runAxiosAsync";
import { showMessage } from "react-native-flash-message";
import LoadingSpinner from "@ui/LoadingSpinner";
import { useDispatch } from "react-redux";
import { Product, deleteItem } from "app/store/listings";

type Props = NativeStackScreenProps<ProfileNavigatorParamList, "DetailProduct">;

const menuOptions = [
  {
    name: "Edit",
    icon: <Feather name="edit" size={20} color={colours.primary} />,
  },
  {
    name: "Delete",
    icon: <Feather name="trash-2" size={20} color={colours.primary} />,
  },
];

const DetailProduct: FC<Props> = ({ route, navigation }) => {
  const { authState } = useAuth();
  const { authClient } = useClient();
  const { product, id } = route.params;
  const [productInfo, setProductInfo] = useState<Product>();

  const dispatch = useDispatch();

  const isAdmin = authState.profile?.id === product?.seller.id;
  const [busy, setBusy] = useState(false);

  const [showMenu, setShowMenu] = useState(false);

  const confirmDelete = async () => {
    const id = product?.id;
    if (!id) return;

    setBusy(true);
    const res = await runAxiosAsync<{ message: string }>(
      authClient.delete("/product/" + id)
    );
    setBusy(false);
    if (res?.message) {
      dispatch(deleteItem(id));

      showMessage({ message: res.message, type: "success" });
      navigation.navigate("Listings");
    }
  };

  const onDeletePress = () => {
    Alert.alert(
      "Are you sure you want to delete?",
      "This action will remove this product permanently",
      [
        { text: "Delete", style: "destructive", onPress: confirmDelete },
        { text: "Cancel", style: "cancel" },
      ]
    );
  };

  const fetchProductInfo = async (id: string) => {
    const res = await runAxiosAsync<{ product: Product }>(
      authClient.get("/product/detail/" + id)
    );
    if (res) {
      setProductInfo(res.product);
    }
  };

  useEffect(() => {
    if (id) fetchProductInfo(id);

    if (product) setProductInfo(product);
  }, [id, product]);

  return (
    <>
      <AppHeader
        backButton={<BackButton />}
        right={
          <OptionButton onPress={() => setShowMenu(true)} visible={isAdmin} />
        }
      />
      <View style={styles.container}>
        {productInfo ? <SingleProduct product={productInfo} /> : <></>}

        <Pressable
          onPress={() => navigation.navigate("ChatWindow")}
          style={styles.messageButton}
        >
          <AntDesign name="message1" size={20} color={colours.white} />
        </Pressable>
      </View>
      <OptionsModal
        options={menuOptions}
        renderItem={({ icon, name }) => (
          <View style={styles.option}>
            {icon}
            <Text style={styles.optionTitle}>{name}</Text>
          </View>
        )}
        visible={showMenu}
        onRequestClose={setShowMenu}
        onPress={(option) => {
          if (option.name === "Delete") {
            onDeletePress();
          }
          if (option.name === "Edit") {
            navigation.navigate("EditProduct", { product: product! });
          }
        }}
      />
      <LoadingSpinner visible={busy} />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
  },
  optionTitle: { paddingLeft: 5, color: colours.primary },
  messageButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: colours.active,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: 20,
    right: 20,
  },
});

export default DetailProduct;
