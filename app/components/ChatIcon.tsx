import ProductImage from "@ui/ProductImage";
import colours from "@utils/colours";
import { FC } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import LottieView from "lottie-react-native";

interface Props {
  onPress?(): void;
  busy?: boolean;
}

const ChatIcon: FC<Props> = ({ busy, onPress }) => {
  if (busy)
    return (
      <View style={styles.common}>
        <View style={styles.flex1}>
          <LottieView
            style={styles.flex1}
            autoPlay
            loop
            source={require("../../assets/loading_2.json")}
          />
        </View>
      </View>
    );

  return (
    <Pressable onPress={onPress} style={[styles.common, styles.messageButton]}>
      <AntDesign name="message1" size={20} color={colours.white} />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  common: {
    width: 50,
    height: 50,
    position: "absolute",
    bottom: 20,
    right: 20,
  },
  messageButton: {
    borderRadius: 25,
    backgroundColor: colours.active,
    justifyContent: "center",
    alignItems: "center",
  },
  flex1: { flex: 1 },
});

export default ChatIcon;
