import { useNavigation } from "@react-navigation/native";
import colours from "@utils/colours";
import size from "@utils/size";
import { FC, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

interface Props {
  backButton?: JSX.Element | null;
  center?: JSX.Element | null;
  right?: JSX.Element | null;
}

const SingleProduct: FC<Props> = ({ backButton, center, right }) => {
  const { goBack, canGoBack } = useNavigation();
  return (
    <View>
      <Text>single</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: size.padding,
  },
});

export default SingleProduct;
