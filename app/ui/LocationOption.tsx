import colours from "@utils/colours";
import { FC, ReactNode } from "react";
import { StyleSheet, Text, View } from "react-native";

interface Props {
  icon: JSX.Element;
  name: string;
}

const LocationOption: FC<Props> = ({ icon, name }) => {
  return (
    <View style={styles.container}>
      <View style={styles.icon}>{icon}</View>
      <Text style={styles.location}>{name}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flexDirection: "row", alignItems: "center" },
  location: { color: colours.primary, paddingVertical: 10 },
  icon: { transform: [{ scale: 0.8 }] },
});

export default LocationOption;
