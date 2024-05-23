import { FC } from "react";
import { StyleSheet } from "react-native";
import SignIn from "@views/SignIn";
import SignUp from "@views/SignUp";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ForgotPassword from "@views/ForgotPassword";
import Home from "@views/Home";
import Profile from "@views/Profile";

const Stack = createNativeStackNavigator();

interface Props {}

const ProfileNavigator: FC<Props> = (props) => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Profile" component={Profile}></Stack.Screen>
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

export default ProfileNavigator;
