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
import { useSelector } from "react-redux";
import { Conversation, selectConversationById } from "app/store/conversation";

type Props = NativeStackScreenProps<AppStackParamList, "ChatWindow">;

type OutGoingMessage = {
  message: {
    id: string;
    time: string;
    text: string;
    user: { id: string; name: string; avatar?: string };
  };
  to: string;
  conversationId: string;
};

const getTime = (value: IMessage["createdAt"]) => {
  if (value instanceof Date) return value.toISOString();

  return new Date(value).toISOString();
};

const formatConversationToIMessage = (value?: Conversation): IMessage[] => {
  const formattedValues = value?.chats.map((chat) => {
    return {
      _id: chat.id,
      text: chat.text,
      createdAt: new Date(chat.time),
      user: {
        _id: chat.user.id,
        name: chat.user.name,
        avatar: chat.user.avatar,
      },
    };
  });

  return formattedValues || [];
};

const ChatWindow: FC<Props> = ({ route }) => {
  const { authState } = useAuth();
  const { conversationId, peerProfile } = route.params;

  if (!conversationId) return;
  const chats = useSelector(selectConversationById(conversationId));

  const profile = authState.profile;
  if (!profile) return null;

  const handleOnMessageSend = (messages: IMessage[]) => {
    if (!profile) return;
    if (!conversationId) return;

    const currentMessage = messages[messages.length - 1];

    const newMessage: OutGoingMessage = {
      message: {
        id: currentMessage._id.toString(),
        text: currentMessage.text,
        time: getTime(currentMessage.createdAt),
        user: { id: profile.id, name: profile.name, avatar: profile.avatar },
      },
      conversationId,
      to: peerProfile.id,
    };

    //sending message to api
    socket.emit("chat:new", newMessage);
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
        messages={formatConversationToIMessage(chats)}
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
