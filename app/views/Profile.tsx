import { FC, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import AvatarView from "@ui/AvatarView";
import useAuth from "app/hooks/useAuth";
import colours from "@utils/colours";
import size from "@utils/size";
import FormDivider from "./FormDivider";
import ProfileOptionListItem from "@components/ProfileOptionListItem";

interface Props {}

const Profile: FC<Props> = (props) => {
  const { authState } = useAuth();
  const { profile } = authState;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Profile image and profile info */}
      <View style={styles.profileContainer}>
        <AvatarView uri={authState.profile?.avatar} size={80} />

        <View style={styles.profileInfo}>
          <Text style={styles.name}>{profile?.name}</Text>
          <Text style={styles.email}>{profile?.email}</Text>
        </View>
      </View>

      <FormDivider />

      {/* options for profile */}
      <ProfileOptionListItem
        style={styles.marginBottom}
        antIconName="message1"
        title="Messages"
        active
      />
      <ProfileOptionListItem
        style={styles.marginBottom}
        antIconName="appstore-o"
        title="Your Listings"
      />
      <ProfileOptionListItem antIconName="logout" title="Log out" />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { padding: size.padding },
  profileContainer: { flexDirection: "row", alignItems: "center" },
  profileInfo: { flex: 1, paddingLeft: size.padding },
  name: { color: colours.primary, fontSize: 20, fontWeight: "bold" },
  email: { color: colours.primary, paddingTop: 2 },
  marginBottom: {
    marginBottom: 15,
  },
});

export default Profile;
