import WelcomeHeader from "app/ui/WelcomeHeader";
import { FC } from "react";
import { Platform, StatusBar, StyleSheet, View } from "react-native";

interface Props {}

const SignIn: FC<Props> = (props) => {
  return (
    <View style={styles.container}>
      <WelcomeHeader />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  image: { width: 250, height: 250 },
});

export default SignIn;
