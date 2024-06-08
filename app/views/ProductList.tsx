import colours from "@utils/colours";
import { FC, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import size from "@utils/size";

interface Props {}

const ProductList: FC<Props> = (props) => {
  return (
    <>
      <View style={styles.container}>
        <Text>CAT</Text>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default ProductList;
