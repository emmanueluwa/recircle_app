import colours from "@utils/colours";
import { FC } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

interface Props {
  title: string;
}

const EmptyView: FC<Props> = ({ title }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    color: colours.primary,
    fontWeight: "600",
    fontSize: 20,
    opacity: 0.6,
  },
});

export default EmptyView;
