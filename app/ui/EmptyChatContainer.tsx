import colours from "@utils/colours";
import size from "@utils/size";
import { FC } from "react";
import { StyleSheet, Text, View } from "react-native";

interface Props {
  title: string;
  active?: boolean;
  onPress?(): void;
}

const EmptyChatContainer: FC<Props> = () => {
  return (
    <View style={styles.container}>
      <View style={styles.messageContainer}>
        <Text style={styles.message}>
          Breaking the ice can be the hardest part, but trust me, it's worth it!
          Start with a simple 'hello' and watch the conversation unfold.
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: size.padding,
    transform: [{ rotate: "180deg" }],
  },
  messageContainer: {
    backgroundColor: colours.inActive,
    padding: size.padding,
    borderRadius: 5,
  },
  message: {
    color: colours.active,
    fontSize: 12,
    textAlign: "center",
  },
});

export default EmptyChatContainer;
