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
    <View>
      <AppHeader backButton={<BackButton />} />
      <FlatList
        data={chats}
        renderItem={({ item }) => <Text>{item.lastMessage}</Text>}
      />
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
