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
import { GiftedChat, IMessage } from "react-native-gifted-chat";
import EmptyChatContainer from "@ui/EmptyChatContainer";
import socket from "app/socket";

type Props = NativeStackScreenProps<AppStackParamList, "ChatWindow">;

const ChatWindow: FC<Props> = ({ route }) => {
  const { authState } = useAuth();
  const { conversationId, peerProfile } = route.params;

  const profile = authState.profile;
  if (!profile) return null;

  const handleOnMessageSend = (messages: IMessage[]) => {
    socket.emit("chat:new", { message: "This is from react native!" });
  };

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
        onSend={handleOnMessageSend}
        renderChatEmpty={() => <EmptyChatContainer />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
});

export default ChatWindow;
