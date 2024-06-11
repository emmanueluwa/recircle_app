import { FC, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Profile from "@views/Profile";
import AppHeader from "@components/AppHeader";
import BackButton from "@ui/BackButton";
import EmptyView from "@ui/EmptyView";
import useClient from "app/hooks/useClient";
import { runAxiosAsync } from "app/api/runAxiosAsync";

const Stack = createNativeStackNavigator();

interface Props {}

const Messages: FC<Props> = (props) => {
  const { authClient } = useClient();
  const chats = [];

  const fetchLastChats = async () => {
    const res = await runAxiosAsync<{
      chats: {
        id: string;
        lastMessage: string;
        timestamp: Date;
        unreadChatCounts: number;
        peerProfile: { id: string; name: string; avatar?: string };
      };
    }>(authClient("/conversation/last-chats"));

    if (res) {
      console.log(res.chats);
    }
  };

  useEffect(() => {
    fetchLastChats();
  }, []);

  if (!chats.length)
    return (
      <>
        <AppHeader backButton={<BackButton />} />
        <EmptyView title="There are no messages." />
      </>
    );

  return (
    <View>
      <AppHeader backButton={<BackButton />} />
      <Text>Messages!</Text>
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
