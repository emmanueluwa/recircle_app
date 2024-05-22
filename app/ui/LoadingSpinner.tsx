import { FC } from "react";
import { Modal, StyleSheet, View } from "react-native";
import colours from "@utils/colours";
import LottieView from "lottie-react-native";

interface Props {
  visible: boolean;
}

const LoadingSpinner: FC<Props> = ({ visible }) => {
  if (!visible) return null;

  return (
    <Modal animationType="fade" transparent>
      <View style={styles.container}>
        <LottieView
          source={require("../../assets/loading.json")}
          autoPlay
          loop
          style={{ flex: 1, transform: [{ scale: 0.2 }] }}
        />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colours.backDrop },
});

export default LoadingSpinner;
