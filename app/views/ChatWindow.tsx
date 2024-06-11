import AppHeader from "@components/AppHeader";
import BackButton from "@ui/BackButton";
import colours from "@utils/colours";
import useAuth from "app/hooks/useAuth";
import { ProfileNavigatorParamList } from "app/navigator/ProfileNavigator";
import { FC, useState } from "react";
import { Alert, Pressable, StyleSheet, Text, View } from "react-native";
import { deleteItem } from "app/store/listings";
import { AppStackParamList } from "app/navigator/AppNavigator";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import AvatarView from "@ui/AvatarView";
import PeerProfile from "@ui/PeerProfile";

type Props = NativeStackScreenProps<AppStackParamList, "ChatWindow">;

const ChatWindow: FC<Props> = ({ route }) => {
  const { conversationId, peerProfile } = route.params;

  return (
    <View style={styles.container}>
      <AppHeader
        backButton={<BackButton />}
        center={
          <PeerProfile name={peerProfile.name} avatar={peerProfile.avatar} />
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default ChatWindow;
