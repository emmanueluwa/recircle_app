import { useNavigation } from "@react-navigation/native";
import AvatarView from "@ui/AvatarView";
import colours from "@utils/colours";
import { formatDate } from "@utils/date";
import size from "@utils/size";
import { FC, useState } from "react";
import { Dimensions, Pressable, StyleSheet, Text, View } from "react-native";

interface Props {
  avatar?: string;
  name: string;
  timestamp: string;
}

const { width } = Dimensions.get("window");

const profileImageSize = 50;
const itemWidth = width - size.padding * 2;

const LastChat: FC<Props> = ({ avatar, name, timestamp }) => {
  return (
    <View style={styles.container}>
      <AvatarView uri={avatar} size={profileImageSize} />
      <View style={styles.chatInfo}>
        <Text style={styles.name} numberOfLines={1} ellipsizeMode="tail">
          {name}
        </Text>
        <Text style={styles.name} numberOfLines={1}>
          {formatDate(timestamp)}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flexDirection: "row", alignItems: "center" },
  chatInfo: { paddingLeft: size.padding, width: itemWidth - profileImageSize },
  name: { fontWeight: "bold", fontSize: 16, color: colours.primary },
});

export default LastChat;
