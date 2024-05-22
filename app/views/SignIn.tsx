import colours from "@utils/colours";
import WelcomeHeader from "@ui/WelcomeHeader";
import { FC, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import FormInput from "@ui/FormInput";
import AppButton from "@ui/AppButton";
import FormDivider from "./FormDivider";
import FormNavigator from "@ui/FormNavigator";
import CustomKeyAvoidingView from "@ui/CustomKeyAvoidingView";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { AuthStackParamList } from "app/navigator/AuthNavigator";
import { signInSchema, yupValidate } from "@utils/validator";
import { showMessage } from "react-native-flash-message";
import { runAxiosAsync } from "app/api/runAxiosAsync";
import axios from "axios";
import client from "app/api/client";
import { useDispatch } from "react-redux";
import { updateAuthState } from "app/store/auth";

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

const SignIn: FC<Props> = (props) => {
  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
  });

  const [busy, setBusy] = useState(false);

  const { navigate } = useNavigation<NavigationProp<AuthStackParamList>>();

  const dispatch = useDispatch();

  const handleSubmit = async () => {
    const { values, error } = await yupValidate(signInSchema, userInfo);

    if (error) return showMessage({ message: error, type: "danger" });

    //set busy if api request is sent
    setBusy(true);
    const res = await runAxiosAsync<SignInRes>(
      client.post("/auth/sign-in", values)
    );

    if (res) {
      //store tokens
      console.log(res);
      await AsyncStorage.setItem("access-token", res.tokens.access);
      await AsyncStorage.setItem("refresh-token", res.tokens.refresh);

      dispatch(updateAuthState({ profile: res.profile, pending: false }));
    }
    setBusy(false);
  };

  const handleChange = (email: string) => (text: string) => {
    setUserInfo({ ...userInfo, [email]: text });
  };

  const { email, password } = userInfo;

  return (
    <CustomKeyAvoidingView>
      <View style={styles.innerContainer}>
        <WelcomeHeader />

        <View style={styles.formContainer}>
          <FormInput
            placeholder="Email"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={handleChange("email")}
          />
          <FormInput
            placeholder="Password"
            secureTextEntry
            value={password}
            onChangeText={handleChange("password")}
          />
          <AppButton active={!busy} title="Sign In" onPress={handleSubmit} />
          <FormDivider />

          <FormNavigator
            onLeftPress={() => navigate("ForgotPassword")}
            onRightPress={() => navigate("SignUp")}
            leftTitle="Forgot Password"
            rightTitle="Sign Up"
          />
        </View>
      </View>
    </CustomKeyAvoidingView>
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

export default SignIn;
