import colours from "@utils/colours";
import { FC } from "react";
import {
  ColorValue,
  DimensionValue,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

interface Props {
  width?: DimensionValue;
  height?: DimensionValue;
  backgroundColor?: ColorValue;
}

const FormDivider: FC<Props> = ({
  width = "50%",
  height = 2,
  backgroundColor = colours.inActive,
}) => {
  return (
    <View style={[styles.container, { width, height, backgroundColor }]} />
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: "center",
    marginVertical: 30,
  },
});

export default FormDivider;
