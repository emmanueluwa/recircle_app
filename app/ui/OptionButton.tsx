import colours from "@utils/colours";
import { FC } from "react";
import { Pressable, StyleSheet, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface Props {
  visible?: boolean;
  onPress?(): void;
}

const OptionButton: FC<Props> = ({ onPress, visible }) => {
  if (!visible) return null;
  return (
    <Pressable onPress={onPress}>
      <Ionicons
        name="ellipsis-vertical-sharp"
        color={colours.primary}
        size={20}
      />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default OptionButton;
