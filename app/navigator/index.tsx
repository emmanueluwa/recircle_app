import { StyleSheet } from "react-native";
import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import colours from "@utils/colours";
import AuthNavigator from "./AuthNavigator";
import { FC } from "react";

const Stack = createNativeStackNavigator();

const MyTheme = {
  ...DefaultTheme,
  colors: { ...DefaultTheme.colors, background: colours.white },
};

interface Props {}

const Navigator: FC<Props> = (props) => {
  return (
    <NavigationContainer theme={MyTheme}>
      <AuthNavigator />
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  innerContainer: {
    padding: 15,
    flex: 1,
  },

  formContainer: { marginTop: 30 },
});

export default Navigator;
