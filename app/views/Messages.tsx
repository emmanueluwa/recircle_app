import { FC, useEffect } from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Profile from "@views/Profile";
import AppHeader from "@components/AppHeader";
import BackButton from "@ui/BackButton";
import EmptyView from "@ui/EmptyView";
import useClient from "app/hooks/useClient";
import { runAxiosAsync } from "app/api/runAxiosAsync";
import { useDispatch, useSelector } from "react-redux";
import { LastChat, getLastChats, removeUnreadChatCount } from "app/store/chats";
import LastChatComponent, {
  ListSeperator,
} from "@components/LastChatComponent";
import size from "@utils/size";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { ProfileNavigatorParamList } from "app/navigator/ProfileNavigator";

const Stack = createNativeStackNavigator();

interface Props {}

const Messages: FC<Props> = (props) => {
  const { authClient } = useClient();
  const chats = useSelector(getLastChats);
  const dispatch = useDispatch();

  const { navigate } =
    useNavigation<NavigationProp<ProfileNavigatorParamList>>();

  const sendSeenRequest = (conversationId: string, peerId: string) => {
    runAxiosAsync(
      authClient.patch(`/conversation/seen/${conversationId}/${peerId}`)
    );
  };

  const onChatPress = (chat: LastChat) => {
    //remove unread chat count
    dispatch(removeUnreadChatCount(chat.id));

    //updated viewed property in db
    sendSeenRequest(chat.id, chat.peerProfile.id);

    //navigate to chat screen
    navigate("ChatWindow", {
      conversationId: chat.id,
      peerProfile: chat.peerProfile,
    });
  };

  if (!chats.length)
    return (
      <>
        <AppHeader backButton={<BackButton />} />
        <EmptyView title="There are no messages." />
      </>
    );

  return (
    <>
      <AppHeader backButton={<BackButton />} />
      <FlatList
        data={chats}
        contentContainerStyle={styles.container}
        renderItem={({ item }) => (
          <Pressable onPress={() => onChatPress(item)}>
            <LastChatComponent
              name={item.peerProfile.name}
              avatar={item.peerProfile.avatar}
              timestamp={item.timestamp}
              lastMessage={item.lastMessage}
              unreadMessageCount={item.unreadChatCounts}
            />
          </Pressable>
        )}
        ItemSeparatorComponent={() => <ListSeperator />}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: { padding: size.padding },
});

export default Messages;
