import colours from "@utils/colours";
import { FC, useState } from "react";
import {
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";

interface Props {
  antIconName: string;
  title: string;
  onPress?(): void;
  style?: StyleProp<ViewStyle>;
  active?: boolean;
}

const ProfileOptionListItem: FC<Props> = ({
  antIconName,
  title,
  style,
  onPress,
  active,
}) => {
  return (
    <Pressable onPress={onPress} style={[styles.container, style]}>
      <View style={styles.buttonContainer}>
        <AntDesign
          name={antIconName as any}
          size={24}
          color={active ? colours.active : colours.primary}
        />
        <Text
          style={[
            styles.title,
            { color: active ? colours.active : colours.primary },
          ]}
        >
          {title}
        </Text>
      </View>

      {active && <View style={styles.indicator} />}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  buttonContainer: { flexDirection: "row", alignItems: "center" },
  title: {
    fontSize: 20,
    paddingLeft: 10,
  },
  indicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colours.active,
  },
});

export default ProfileOptionListItem;
