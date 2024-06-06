import AppHeader from "@components/AppHeader";
import SingleProduct from "@components/SingleProduct";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { FontAwesome5 } from "@expo/vector-icons";
import BackButton from "@ui/BackButton";
import colours from "@utils/colours";
import useAuth from "app/hooks/useAuth";
import { ProfileNavigatorParamList } from "app/navigator/ProfileNavigator";
import { FC, useState } from "react";
import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import OptionButton from "@ui/OptionButton";
import OptionsModal from "@components/OptionsModal";
import useClient from "app/hooks/useClient";
import { runAxiosAsync } from "app/api/runAxiosAsync";
import { showMessage } from "react-native-flash-message";
import LoadingSpinner from "@ui/LoadingSpinner";
import { useDispatch } from "react-redux";
import { deleteItem } from "app/store/listings";
import size from "@utils/size";
import HorizontalImageList from "@components/HorizontalImageList";
import FormInput from "@ui/FormInput";
import DatePicker from "@ui/DatePicker";
import OptionSelector from "@ui/OptionSelector";

type Props = NativeStackScreenProps<ProfileNavigatorParamList, "EditProduct">;

const EditProduct: FC<Props> = ({ route }) => {
  const { product } = route.params;
  return (
    <>
      <AppHeader backButton={<BackButton />} />
      <View style={styles.container}>
        <ScrollView>
          <Text style={styles.title}>Images</Text>
          <HorizontalImageList images={product.image || []} />

          <Pressable style={styles.imageSelector}>
            <FontAwesome5 name="images" size={30} color={colours.primary} />
          </Pressable>

          <FormInput placeholder="Product name" value={product.name} />
          <FormInput
            placeholder="Price"
            keyboardType="numeric"
            value={product.price.toString()}
          />

          <DatePicker
            value={new Date(product.date)}
            title="Purchasing Date: "
            onChange={() => {}}
          />

          <OptionSelector title={product.category || "Category"} />

          <FormInput placeholder="Description" value={product.description} />
        </ScrollView>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: size.padding,
  },
  title: {
    fontWeight: "600",
    fontSize: 16,
    color: colours.primary,
    marginBottom: 10,
  },
  imageSelector: {
    height: 70,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 7,
    borderColor: colours.primary,
    marginVertical: 10,
  },
});

export default EditProduct;
