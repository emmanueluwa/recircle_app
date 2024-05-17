import colours from "@utils/colours";
import WelcomeHeader from "@ui/WelcomeHeader";
import { FC } from "react";
import { StyleSheet, View } from "react-native";
import FormInput from "@ui/FormInput";
import AppButton from "@ui/AppButton";
import FormDivider from "./FormDivider";
import FormNavigator from "@ui/FormNavigator";

interface Props {}

const SignIn: FC<Props> = (props) => {
  return (
    <View style={styles.container}>
      <WelcomeHeader />

      <View style={styles.formContainer}>
        <FormInput
          placeholder="Email"
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <FormInput placeholder="Passoword" secureTextEntry />
        <AppButton title="Sign in" />
        <FormDivider />

        <FormNavigator leftTitle="Forgot Password" rightTitle="Sign Up" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
  },
  formContainer: { marginTop: 30 },
});

export default SignIn;
