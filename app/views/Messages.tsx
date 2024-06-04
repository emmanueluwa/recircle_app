import { FC } from "react";
import { StyleSheet, Text, View } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Profile from "@views/Profile";

const Stack = createNativeStackNavigator();

interface Props {}

const Messages: FC<Props> = (props) => {
  return (
    <View>
      <Text>allahu akbar</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  innerContainer: {
    padding: 15,
    flex: 1,
  },

  formContainer: { marginTop: 30 },
});

export default Messages;
