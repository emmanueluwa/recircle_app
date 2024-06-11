import { FC } from "react";
import { Modal, StyleSheet, Text, View } from "react-native";
import colours from "@utils/colours";
import LottieView from "lottie-react-native";
import AvatarView from "./AvatarView";

interface Props {
  name: string;
  avatar?: string;
}

const PeerProfile: FC<Props> = ({ name, avatar }) => {
  return (
    <View style={styles.container}>
      <AvatarView size={35} uri={avatar} />
      <Text style={styles.name}>{name}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  name: { color: colours.primary, paddingLeft: 5, fontWeight: "600" },
});

export default PeerProfile;
