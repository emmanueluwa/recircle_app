import { StyleSheet } from "react-native";
import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import colours from "@utils/colours";
import AuthNavigator from "./AuthNavigator";
import { FC, useEffect } from "react";
import AppNavigator from "./AppNavigator";
import { useDispatch, useSelector } from "react-redux";
import { Profile, getAuthState, updateAuthState } from "app/store/auth";
import client from "app/api/client";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { runAxiosAsync } from "app/api/runAxiosAsync";
import LoadingSpinner from "@ui/LoadingSpinner";

const Stack = createNativeStackNavigator();

const MyTheme = {
  ...DefaultTheme,
  colors: { ...DefaultTheme.colors, background: colours.white },
};

interface Props {}

const Navigator: FC<Props> = (props) => {
  const authState = useSelector(getAuthState);
  const dispatch = useDispatch();

  const loggedIn = authState.profile ? true : false;

  const fetchAuthState = async () => {
    const token = await AsyncStorage.getItem("access-token");

    if (token) {
      dispatch(updateAuthState({ pending: true, profile: null }));

      const res = await runAxiosAsync<{ profile: Profile }>(
        client.get("/auth/profile", {
          headers: {
            Authorization: "Bearer " + token,
          },
        })
      );

      if (res) {
        dispatch(updateAuthState({ pending: false, profile: res.profile }));
      } else {
        dispatch(updateAuthState({ pending: false, profile: null }));
      }
    }
  };

  useEffect(() => {
    fetchAuthState();
  }, []);

  console.log(authState);
  return (
    <NavigationContainer theme={MyTheme}>
      <LoadingSpinner visible={authState.pending} />
      {!loggedIn ? <AuthNavigator /> : <AppNavigator />}
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
