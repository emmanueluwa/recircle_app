import colours from "@utils/colours";
import { FC, ReactNode } from "react";
import {
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  View,
} from "react-native";

interface Props {
  icon: JSX.Element;
  name: string;
}

const CategoryOption: FC<Props> = ({ icon, name }) => {
  return (
    <View style={styles.container}>
      <View style={styles.icon}>{icon}</View>
      <Text style={styles.category}>{name}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flexDirection: "row", alignItems: "center" },
  category: { color: colours.primary, paddingVertical: 10 },
  icon: { transform: [{ scale: 0.5 }] },
});

export default CategoryOption;
