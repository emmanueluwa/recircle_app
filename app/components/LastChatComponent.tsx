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
  lastMessage: string;
  unreadMessageCount: number;
}

const { width } = Dimensions.get("window");

const profileImageSize = 50;
const itemWidth = width - size.padding * 2;
const seperatorWidth = width - profileImageSize - size.padding * 3;

const LastChatComponent: FC<Props> = ({
  avatar,
  name,
  timestamp,
  lastMessage,
  unreadMessageCount,
}) => {
  const showNotification = unreadMessageCount > 0;
  return (
    <View style={styles.container}>
      <AvatarView uri={avatar} size={profileImageSize} />
      <View style={styles.chatInfo}>
        <View style={styles.flexJustifyBetween}>
          <View style={styles.flex1}>
            <Text style={styles.name} numberOfLines={1} ellipsizeMode="tail">
              {name}
            </Text>
          </View>
          <Text
            style={showNotification ? styles.activeText : styles.inActiveText}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {formatDate(timestamp)}
          </Text>
        </View>

        <View style={styles.flexJustifyBetween}>
          <View style={styles.flex1}>
            <Text
              style={styles.commonText}
              numberOfLines={2}
              ellipsizeMode="tail"
            >
              {lastMessage}
            </Text>
          </View>

          {showNotification ? (
            <View style={styles.msgIndicator}>
              <Text style={styles.msgIndicatorCount}>{unreadMessageCount}</Text>
            </View>
          ) : null}
        </View>
      </View>
    </View>
  );
};

export const ListSeperator = () => <View style={styles.seperator} />;

const styles = StyleSheet.create({
  container: { flexDirection: "row", alignItems: "center" },
  chatInfo: { paddingLeft: size.padding, width: itemWidth - profileImageSize },
  name: {
    fontWeight: "bold",
    fontSize: 16,
    color: colours.primary,
    marginRight: size.padding,
  },
  commonText: { fontSize: 12, color: colours.primary },
  activeText: { fontSize: 12, color: colours.active },
  inActiveText: { fontSize: 12, color: colours.primary },
  flexJustifyBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  flex1: { flex: 1 },
  msgIndicatorCount: { fontSize: 12, color: colours.white },
  msgIndicator: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: colours.active,
    alignItems: "center",
    justifyContent: "center",
  },
  seperator: {
    width: seperatorWidth,
    height: 1,
    backgroundColor: colours.inActive,
    alignSelf: "flex-end",
    marginVertical: 15,
  },
});

export default LastChatComponent;
