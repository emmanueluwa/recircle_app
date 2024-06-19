import AppHeader from "@components/AppHeader";
import BackButton from "@ui/BackButton";
import colours from "@utils/colours";
import useAuth from "app/hooks/useAuth";
import { ProfileNavigatorParamList } from "app/navigator/ProfileNavigator";
import { FC, useCallback, useEffect, useState } from "react";
import { Alert, Pressable, StyleSheet, Text, View } from "react-native";
import { deleteItem } from "app/store/listings";
import { AppStackParamList } from "app/navigator/AppNavigator";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import AvatarView from "@ui/AvatarView";
import PeerProfile from "@ui/PeerProfile";
import { GiftedChat, IMessage } from "react-native-gifted-chat";
import EmptyChatContainer from "@ui/EmptyChatContainer";
import socket, { NewMessageResponse } from "app/socket";
import { useDispatch, useSelector } from "react-redux";
import {
  Conversation,
  addConversation,
  selectConversationById,
  updateConversation,
} from "app/store/conversation";
import useClient from "app/hooks/useClient";
import { runAxiosAsync } from "app/api/runAxiosAsync";
import EmptyView from "@ui/EmptyView";
import { useFocusEffect } from "@react-navigation/native";

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
      received: chat.viewed,
      user: {
        _id: chat.user.id,
        name: chat.user.name,
        avatar: chat.user.avatar,
      },
    };
  });

  const messages = formattedValues || [];

  return messages.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
};

let timeoutId: NodeJS.Timeout | null;
const TYPING_TIMEOUT = 2000;

const ChatWindow: FC<Props> = ({ route }) => {
  const { authState } = useAuth();
  const { conversationId, peerProfile } = route.params;
  const dispatch = useDispatch();
  const { authClient } = useClient();

  if (!conversationId) return;
  const conversation = useSelector(selectConversationById(conversationId));
  const [fetchingChats, setFetchingChats] = useState(false);

  const profile = authState.profile;

  const [typing, setTyping] = useState(false);

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

    //update store and ui
    dispatch(
      updateConversation({
        conversationId,
        chat: { ...newMessage.message, viewed: false },
        peerProfile,
      })
    );

    //sending message to api
    socket.emit("chat:new", newMessage);
  };

  const fetchOldChats = async () => {
    setFetchingChats(true);

    const res = await runAxiosAsync<{ conversation: Conversation }>(
      authClient("/conversation/chats/" + conversationId)
    );
    setFetchingChats(false);

    if (res?.conversation) {
      dispatch(addConversation([res.conversation]));
    }
  };

  const updateTypingStatus = (data: { typing: boolean }) => {
    setTyping(data.typing);
  };

  const emitTypingEnd = (timeout: number) => {
    return setTimeout(() => {
      socket.emit("chat:typing", { active: false, to: peerProfile.id });

      timeoutId = null;
    }, timeout);
  };

  const handleOnInputChange = () => {
    //notify that other user is typing

    //if still typing, invalidate previous typing end request
    if (timeoutId) {
      clearTimeout(timeoutId);

      timeoutId = emitTypingEnd(TYPING_TIMEOUT);
    } else {
      //typing has started
      socket.emit("chat:typing", { active: true, to: peerProfile.id });

      //typing has ended
      timeoutId = emitTypingEnd(TYPING_TIMEOUT);
    }
  };

  const sendSeenRequest = () => {
    runAxiosAsync(
      authClient.patch(`/conversation/seen/${conversationId}/${peerProfile.id}`)
    );
  };

  useEffect(() => {
    const handleApiRequest = async () => {
      await fetchOldChats();

      //updated viewed property in db
      await sendSeenRequest();
    };

    handleApiRequest();
  }, []);

  useFocusEffect(
    useCallback(() => {
      const updateSeenStatus = (data: NewMessageResponse) => {
        socket.emit("chat:seen", {
          messageId: data.message.id,
          conversationId,
          peerId: peerProfile.id,
        });
      };

      socket.on("chat:message", updateSeenStatus);

      return () => socket.off("chat:message", updateSeenStatus);
    }, [])
  );

  if (!profile) return null;

  if (fetchingChats) return <EmptyView title="Please wait..." />;

  return (
    <View style={styles.container}>
      <AppHeader
        backButton={<BackButton />}
        center={
          <PeerProfile name={peerProfile.name} avatar={peerProfile.avatar} />
        }
      />

      <GiftedChat
        messages={formatConversationToIMessage(conversation)}
        user={{
          _id: profile.id,
          name: profile.name,
          avatar: profile.avatar,
        }}
        onSend={handleOnMessageSend}
        renderChatEmpty={() => <EmptyChatContainer />}
        onInputTextChanged={handleOnInputChange}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
});

export default ChatWindow;
