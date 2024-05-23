import { FC } from "react";
import { StyleSheet } from "react-native";
import {
  createBottomTabNavigator,
  BottomTabNavigationOptions,
} from "@react-navigation/bottom-tabs";
import AppNavigator from "./AppNavigator";
import ProfileNavigator from "./ProfileNavigator";
import { AntDesign } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import NewListing from "@views/NewListing";

export type AuthStackParamList = {
  SignIn: undefined;
  SignUp: undefined;
  ForgotPassword: undefined;
};
const Tab = createBottomTabNavigator();

interface Props {}

const TabNavigator: FC<Props> = (props) => {
  const getOptions = (iconName: string): BottomTabNavigationOptions => {
    return {
      tabBarIcon({ color, focused, size }) {
        return <AntDesign name={iconName as any} size={size} color={color} />;
      },
      title: "",
    };
  };

  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen
        name="HomeNavigator"
        component={AppNavigator}
        options={getOptions("home")}
      ></Tab.Screen>
      <Tab.Screen
        name="NewListing"
        component={NewListing}
        options={getOptions("pluscircleo")}
      ></Tab.Screen>
      <Tab.Screen
        name="ProfileNavigator"
        component={ProfileNavigator}
        options={getOptions("user")}
      ></Tab.Screen>
    </Tab.Navigator>
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

export default TabNavigator;
