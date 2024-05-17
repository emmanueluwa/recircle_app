import colours from "@utils/colours";
import { FC } from "react";
import { Pressable, StyleSheet, Text } from "react-native";

interface Props {
  title: string;
  active?: boolean;
  onPress?(): void;
}

const AppButton: FC<Props> = ({ title, active = true, onPress }) => {
  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.button,
        active ? styles.buttonActive : styles.buttonInActive,
      ]}
    >
      <Text style={styles.title}>{title}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonInActive: { backgroundColor: colours.inActive },
  buttonActive: { backgroundColor: colours.primary },
  title: { color: colours.white, fontWeight: "700", letterSpacing: 1 },
});

export default AppButton;
