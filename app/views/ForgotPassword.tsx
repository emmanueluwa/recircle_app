import colours from "@utils/colours";
import WelcomeHeader from "@ui/WelcomeHeader";
import { FC } from "react";
import { StyleSheet, View } from "react-native";
import FormInput from "@ui/FormInput";
import AppButton from "@ui/AppButton";
import FormDivider from "./FormDivider";
import FormNavigator from "@ui/FormNavigator";
import CustomKeyAvoidingView from "@ui/CustomKeyAvoidingView";

interface Props {}

const ForgotPassword: FC<Props> = (props) => {
  return (
    <CustomKeyAvoidingView>
      <View style={styles.innerContainer}>
        <WelcomeHeader />

        <View style={styles.formContainer}>
          <FormInput
            placeholder="Email"
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <AppButton title="Request Link" />
          <FormDivider />

          <FormNavigator leftTitle="Sign Up" rightTitle="Sign In" />
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

export default ForgotPassword;
