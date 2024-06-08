import { StyleSheet } from "react-native";
import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import colours from "@utils/colours";
import AuthNavigator from "./AuthNavigator";
import { FC, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Profile, updateAuthState } from "app/store/auth";
import client from "app/api/client";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { runAxiosAsync } from "app/api/runAxiosAsync";
import LoadingSpinner from "@ui/LoadingSpinner";
import useAuth from "app/hooks/useAuth";
import TabNavigator from "./TabNavigator";
import useClient from "app/hooks/useClient";
import asyncStorage, { Keys } from "@utils/asyncStorage";

const Stack = createNativeStackNavigator();

const MyTheme = {
  ...DefaultTheme,
  colors: { ...DefaultTheme.colors, background: colours.white },
};

export type ProfileRes = {
  profile: {
    id: string;
    email: string;
    name: string;
    verified: boolean;
    avatar?: string;
  };
};

interface Props {}

const Navigator: FC<Props> = (props) => {
  const dispatch = useDispatch();

  const { loggedIn, authState } = useAuth();
  const { authClient } = useClient();

  const fetchAuthState = async () => {
    const token = await asyncStorage.get(Keys.AUTH_TOKEN);

    if (token) {
      dispatch(updateAuthState({ pending: true, profile: null }));

      const res = await runAxiosAsync<ProfileRes>(
        authClient.get("/auth/profile", {
          headers: {
            Authorization: "Bearer " + token,
          },
        })
      );

      if (res) {
        dispatch(
          updateAuthState({
            pending: false,
            profile: { ...res.profile, accessToken: token },
          })
        );
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
      {!loggedIn ? <AuthNavigator /> : <TabNavigator />}
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
