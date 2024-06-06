import { FC } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import colours from "@utils/colours";
import { AntDesign } from "@expo/vector-icons";

interface Props {
  onPress?(): void;
  title: string;
}

const OptionSelector: FC<Props> = ({ onPress, title }) => {
  return (
    <Pressable style={styles.categorySelector} onPress={onPress}>
      <Text style={styles.categoryTitle}>{title}</Text>
      <AntDesign name="caretdown" color={colours.primary} />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: { flexDirection: "row", alignItems: "center" },
  title: { color: colours.active },
  categorySelector: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 15,
    padding: 8,
    borderWidth: 1,
    borderColor: colours.inActive,
    borderRadius: 5,
  },
  categoryTitle: { color: colours.primary },
});

export default OptionSelector;
