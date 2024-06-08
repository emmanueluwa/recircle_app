import { FC } from "react";
import { StyleSheet } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "@views/Home";
import Profile from "@views/Profile";
import Messages from "@views/Messages";

export type AppStackParamList = {
  Home: undefined;
  Messages: undefined;
};
const Stack = createNativeStackNavigator<AppStackParamList>();

interface Props {}

const AppNavigator: FC<Props> = (props) => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Messages" component={Messages} />
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

export default AppNavigator;
