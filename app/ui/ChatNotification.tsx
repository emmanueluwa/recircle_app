import { FC } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import colours from "@utils/colours";
import size from "@utils/size";

interface Props {
  indicate?: boolean;
  onPress?(): void;
}

const ChatNotification: FC<Props> = ({ indicate, onPress }) => {
  return (
    <Pressable onPress={onPress} style={styles.container}>
      <MaterialCommunityIcons
        name="message"
        size={24}
        color={indicate ? colours.active : colours.primary}
      />
      {indicate && <View style={styles.indicator} />}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: size.padding,
    alignSelf: "flex-end",
    position: "relative",
  },
  indicator: {
    width: 15,
    height: 15,
    backgroundColor: colours.active,
    borderRadius: 8,
    position: "absolute",
    top: 0,
    right: 10,
    borderWidth: 2,
    borderColor: colours.white,
  },
});

export default ChatNotification;
