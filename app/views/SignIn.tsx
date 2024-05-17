import colours from "@utils/colours";
import WelcomeHeader from "@ui/WelcomeHeader";
import { FC } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import FormInput from "@ui/FormInput";
import AppButton from "@ui/AppButton";
import FormDivider from "./FormDivider";
import FormNavigator from "@ui/FormNavigator";
import CustomKeyAvoidingView from "@ui/CustomKeyAvoidingView";
import { useNavigation } from "@react-navigation/native";

interface Props {}

const SignIn: FC<Props> = (props) => {
  const { navigate } = useNavigation();

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
          <FormInput placeholder="Password" secureTextEntry />
          <AppButton title="Sign in" />
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
