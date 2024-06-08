import colours from "@utils/colours";
import { FC, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import size from "@utils/size";
import ProductGridView from "./ProductGridView";

export type LatestProduct = {
  id: any;
  name: string;
  thumbnail?: string;
  category: string;
  price: number;
};

interface Props {
  data: LatestProduct[];
}

const LatestProductList: FC<Props> = ({ data }) => {
  console.log({ data });
  const onPressing = () => {};
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Recently Listed Offers</Text>
      <ProductGridView onPress={onPressing} data={data} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    width: "100%",
    flexWrap: "wrap",
  },
  title: {},
});

export default LatestProductList;
