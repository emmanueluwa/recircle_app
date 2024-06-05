import AppHeader from "@components/AppHeader";
import SingleProduct from "@components/SingleProduct";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import BackButton from "@ui/BackButton";
import colours from "@utils/colours";
import { ProfileNavigatorParamList } from "app/navigator/ProfileNavigator";
import { FC } from "react";
import { ColorValue, DimensionValue, StyleSheet, View } from "react-native";

export type Product = {
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

type Props = NativeStackScreenProps<ProfileNavigatorParamList, "DetailProduct">;

const DetailProduct: FC<Props> = ({ route }) => {
  const { product } = route.params;

  return (
    <>
      <AppHeader backButton={<BackButton />} />
      <View style={[styles.container]}>
        <SingleProduct />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: "center",
    marginVertical: 30,
  },
});

export default DetailProduct;
