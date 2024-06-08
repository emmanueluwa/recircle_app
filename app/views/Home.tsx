import colours from "@utils/colours";
import WelcomeHeader from "@ui/WelcomeHeader";
import { FC, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { AuthStackParamList } from "app/navigator/AuthNavigator";
import { signInSchema, yupValidate } from "@utils/validator";
import { showMessage } from "react-native-flash-message";
import { runAxiosAsync } from "app/api/runAxiosAsync";
import axios from "axios";
import client from "app/api/client";
import ChatNotification from "@ui/ChatNotification";
import { AppStackParamList } from "app/navigator/AppNavigator";

interface Props {}

export interface SignInRes {
  profile: {
    id: string;
    email: string;
    name: string;
    verified: boolean;
    avatar?: string;
  };
  tokens: {
    refresh: string;
    access: string;
  };
}

const Home: FC<Props> = (props) => {
  const { navigate } = useNavigation<NavigationProp<AppStackParamList>>();
  return (
    <>
      <ChatNotification onPress={() => navigate("Messages")} />
      <View>
        <Text>Home</Text>
      </View>
    </>
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

export default Home;
