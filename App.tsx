import { Platform, SafeAreaView, StyleSheet, StatusBar } from "react-native";
import { DefaultTheme } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import colours from "@utils/colours";
import Navigator from "app/navigator";

const Stack = createNativeStackNavigator();

const MyTheme = {
  ...DefaultTheme,
  colors: { ...DefaultTheme.colors, background: colours.white },
};

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <Navigator />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
});
