import { FC } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import colours from "@utils/colours";

interface Props {}

const BackButton: FC<Props> = (props) => {
  return (
    <View style={styles.container}>
      <Ionicons name="chevron-back" size={18} color={colours.active} />
      <Text style={styles.title}>Go Back</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flexDirection: "row", alignItems: "center" },
  title: { color: colours.active },
});

export default BackButton;
