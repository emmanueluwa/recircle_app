import colours from "@utils/colours";
import WelcomeHeader from "@ui/WelcomeHeader";
import { FC } from "react";
import { StyleSheet, View } from "react-native";
import FormInput from "@ui/FormInput";

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
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
  },
  image: { width: 250, height: 250 },
  input: {
    width: "100%",
    padding: 8,
    borderRadius: 5,
    marginBottom: 15,
    color: colours.primary,
    borderWidth: 1,
  },
  formContainer: { marginTop: 30 },
});

export default SignIn;
