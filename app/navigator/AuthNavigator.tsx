import { FC } from "react";
import { StyleSheet } from "react-native";
import SignIn from "@views/SignIn";
import SignUp from "@views/SignUp";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ForgotPassword from "@views/ForgotPassword";

export type AuthStackParamList = {
  SignIn: undefined;
  SignUp: undefined;
  ForgotPassword: undefined;
};
const Stack = createNativeStackNavigator<AuthStackParamList>();

interface Props {}

const AuthNavigator: FC<Props> = (props) => {
  return (
    <Stack.Navigator
      initialRouteName="SignIn"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="SignIn" component={SignIn}></Stack.Screen>
      <Stack.Screen name="SignUp" component={SignUp}></Stack.Screen>
      <Stack.Screen
        name="ForgotPassword"
        component={ForgotPassword}
      ></Stack.Screen>
    </Stack.Navigator>
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

export default AuthNavigator;
