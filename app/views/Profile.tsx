import { FC, useState } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import AvatarView from "@ui/AvatarView";
import useAuth from "app/hooks/useAuth";
import colours from "@utils/colours";
import size from "@utils/size";
import FormDivider from "./FormDivider";
import ProfileOptionListItem from "@components/ProfileOptionListItem";
import { ProfileNavigatorParamList } from "app/navigator/ProfileNavigator";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import useClient from "app/hooks/useClient";
import { runAxiosAsync } from "app/api/runAxiosAsync";
import { ProfileRes } from "app/navigator";
import { useDispatch } from "react-redux";
import { updateAuthState } from "app/store/auth";
import { showMessage } from "react-native-flash-message";

interface Props {}

const Profile: FC<Props> = (props) => {
  const { navigate } =
    useNavigation<NavigationProp<ProfileNavigatorParamList>>();

  const { authClient } = useClient();
  const { authState, signOut } = useAuth();
  const dispatch = useDispatch();

  const { profile } = authState;
  const [userName, setUserName] = useState(profile?.name || "");

  const isNameChanged =
    profile?.name !== userName && userName.trim().length >= 3;

  const onMessagePress = () => {
    navigate("Messages");
  };

  const onListingPress = () => {
    navigate("Listings");
  };

  const updateProfile = async () => {
    const res = await runAxiosAsync<ProfileRes>(
      authClient.patch("/auth/update-profile", { name: userName })
    );

    if (res) {
      dispatch(
        updateAuthState({
          pending: false,
          profile: { ...profile!, ...res.profile },
        })
      );
      showMessage({ message: "Name updated successfully", type: "success" });
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Profile image and profile info */}
      <View style={styles.profileContainer}>
        <AvatarView uri={authState.profile?.avatar} size={80} />

        <View style={styles.profileInfo}>
          <View style={styles.nameContainer}>
            <TextInput
              value={userName}
              onChangeText={(text) => setUserName(text)}
              style={styles.name}
            />

            {isNameChanged && (
              <Pressable onPress={updateProfile}>
                <AntDesign name="check" size={24} color={colours.primary} />
              </Pressable>
            )}
          </View>
          <Text style={styles.email}>{profile?.email}</Text>
        </View>
      </View>

      <FormDivider />

      {/* options for profile */}
      <ProfileOptionListItem
        style={styles.marginBottom}
        antIconName="message1"
        title="Messages"
        onPress={onMessagePress}
      />

      <ProfileOptionListItem
        style={styles.marginBottom}
        antIconName="appstore-o"
        title="Your Listings"
        onPress={onListingPress}
      />

      <ProfileOptionListItem
        antIconName="logout"
        title="Log out"
        onPress={signOut}
      />
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
  nameContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});

export default Profile;
