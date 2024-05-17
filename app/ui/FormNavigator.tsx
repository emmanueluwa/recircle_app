import colours from "@utils/colours";
import { FC } from "react";
import {
  ColorValue,
  DimensionValue,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

interface Props {
  leftTitle: string;
  rightTitle: string;
  onLeftPress?(): void;
  onRightPress?(): void;
}

const FormNavigator: FC<Props> = ({
  leftTitle,
  rightTitle,
  onLeftPress,
  onRightPress,
}) => {
  return (
    <View style={styles.container}>
      <Pressable onPress={onLeftPress}>
        <Text style={styles.title}>{leftTitle}</Text>
      </Pressable>
      <Pressable onPress={onRightPress}>
        <Text style={styles.title}>{rightTitle}</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  title: {
    color: colours.primary,
  },
});

export default FormNavigator;
