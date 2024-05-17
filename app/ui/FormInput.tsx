import colours from "@utils/colours";
import { FC, useState } from "react";
import { StyleSheet, TextInput, TextInputProps } from "react-native";

interface Props extends TextInputProps {}

const FormInput: FC<Props> = (props) => {
  const [isFocused, setIsFocused] = useState(false);
  return (
    <TextInput
      style={[
        styles.input,
        isFocused ? styles.borderActive : styles.borderInActive,
      ]}
      placeholderTextColor={colours.primary}
      onFocus={() => {
        setIsFocused(true);
      }}
      onBlur={() => {
        setIsFocused(false);
      }}
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
  },
  borderInActive: { borderWidth: 1, borderColor: colours.inActive },
  borderActive: { borderWidth: 1, borderColor: colours.primary },
});

export default FormInput;
