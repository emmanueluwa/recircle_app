import {
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  StatusBar,
} from "react-native";
import SignIn from "@views/SignIn";
import SignUp from "@views/SignUp";
import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ForgotPassword from "@views/ForgotPassword";
import colours from "@utils/colours";

const Stack = createNativeStackNavigator();

const MyTheme = {
  ...DefaultTheme,
  colors: { ...DefaultTheme.colors, background: colours.white },
};

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <NavigationContainer theme={MyTheme}>
        <Stack.Navigator
          initialRouteName="signIn"
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name="SignIn" component={SignIn}></Stack.Screen>
          <Stack.Screen name="SignUp" component={SignUp}></Stack.Screen>
          <Stack.Screen
            name="ForgotPassword"
            component={ForgotPassword}
          ></Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
});
