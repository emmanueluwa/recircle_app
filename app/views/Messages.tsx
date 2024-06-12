import { FC, useEffect } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Profile from "@views/Profile";
import AppHeader from "@components/AppHeader";
import BackButton from "@ui/BackButton";
import EmptyView from "@ui/EmptyView";
import useClient from "app/hooks/useClient";
import { runAxiosAsync } from "app/api/runAxiosAsync";
import { useSelector } from "react-redux";
import { getLastChats } from "app/store/chats";
import LastChat from "@components/LastChat";
import size from "@utils/size";

const Stack = createNativeStackNavigator();

interface Props {}

const Messages: FC<Props> = (props) => {
  const { authClient } = useClient();
  const chats = useSelector(getLastChats);

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
          <LastChat
            name={item.peerProfile.name}
            avatar={item.peerProfile.avatar}
            timestamp={item.timestamp}
          />
        )}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: { padding: size.padding },
});

export default Messages;
