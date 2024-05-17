import colours from "@utils/colours";
import { FC } from "react";
import { StyleSheet, TextInput, TextInputProps } from "react-native";

interface Props extends TextInputProps {}

const FormInput: FC<Props> = (props) => {
  return (
    <TextInput
      style={styles.input}
      placeholderTextColor={colours.primary}
      {...props}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    width: "100%",
    padding: 8,
    borderRadius: 5,
    marginBottom: 15,
    color: colours.primary,
    borderWidth: 1,
  },
});

export default FormInput;
