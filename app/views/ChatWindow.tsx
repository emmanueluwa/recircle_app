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
import { GiftedChat } from "react-native-gifted-chat";

type Props = NativeStackScreenProps<AppStackParamList, "ChatWindow">;

const ChatWindow: FC<Props> = ({ route }) => {
  const { authState } = useAuth();
  const { conversationId, peerProfile } = route.params;

  const profile = authState.profile;
  if (!profile) return null;

  return (
    <View style={styles.container}>
      <AppHeader
        backButton={<BackButton />}
        center={
          <PeerProfile name={peerProfile.name} avatar={peerProfile.avatar} />
        }
      />

      <GiftedChat
        messages={[]}
        user={{
          _id: profile.id,
          name: profile.name,
          avatar: profile.avatar,
        }}
        onSend={(messages) => {
          console.log(messages);
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
});

export default ChatWindow;
