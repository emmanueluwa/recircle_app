import colours from "@utils/colours";
import WelcomeHeader from "@ui/WelcomeHeader";
import { FC, useState } from "react";
import { StyleSheet, View } from "react-native";
import axios from "axios";
import * as yup from "yup";

import FormInput from "@ui/FormInput";
import AppButton from "@ui/AppButton";
import FormDivider from "./FormDivider";
import FormNavigator from "@ui/FormNavigator";
import CustomKeyAvoidingView from "@ui/CustomKeyAvoidingView";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { AuthStackParamList } from "app/navigator/AuthNavigator";

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const passwordRegex =
  /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

yup.addMethod(yup.string, "email", function validateEmail(message) {
  return this.matches(emailRegex, {
    message,
    name: "email",
    excludeEmptyString: true,
  });
});

export const newUserSchema = yup.object({
  name: yup.string().required("Name is missing"),
  email: yup.string().email("Invalid email").required("Email is missing"),
  password: yup
    .string()
    .required("Password is missing")
    .min(8, "Password needs to be 8 a more characters")
    .matches(passwordRegex, "Password is not safe enough"),
});

interface Props {}

const SignUp: FC<Props> = (props) => {
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { navigate } = useNavigation<NavigationProp<AuthStackParamList>>();

  const handleChange = (name: string) => (text: string) => {
    setUserInfo({ ...userInfo, [name]: text });
  };

  const handleSubmit = async () => {
    try {
      const info = await newUserSchema.validate(userInfo);
      const { data } = await axios.post(
        "http://192.168.1.84:8000/auth/sign-up",
        info
        // {
        //   headers: {
        //     "Content-Type": "application/json",
        //     Accept: "application/json",
        //   },
        // }
      );
      console.log(data);
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        console.log("Invalid form", error.message);
      }
      if (error instanceof axios.AxiosError) {
        const response = error.response;
        if (response) {
          console.log("Invalid form: ", response.data.message);
        }
      }

      console.log((error as any).message);
    }
  };
  const { email, name, password } = userInfo;

  return (
    <CustomKeyAvoidingView>
      <View style={styles.innerContainer}>
        <WelcomeHeader />

        <View style={styles.formContainer}>
          <FormInput
            placeholder="Name"
            value={name}
            onChangeText={handleChange("name")}
          />
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

          <AppButton title="Sign Up" onPress={handleSubmit} />

          <FormDivider />

          <FormNavigator
            onLeftPress={() => navigate("ForgotPassword")}
            onRightPress={() => navigate("SignIn")}
            leftTitle="Forgot Password"
            rightTitle="Sign In"
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

export default SignUp;
