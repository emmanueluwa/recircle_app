import { FC, useState } from "react";
import {
  Pressable,
  RefreshControl,
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
  const [busy, setBusy] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

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

  const getVerificationLink = async () => {
    setBusy(true);
    const res = await runAxiosAsync<{ message: string }>(
      authClient.get("/auth/verify-token")
    );

    setBusy(false);
    if (res) {
      showMessage({ message: res.message, type: "success" });
    }
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

  const fetchProfile = async () => {
    setRefreshing(true);

    const res = await runAxiosAsync<{ profile: ProfileRes }>(
      authClient.get("/auth/profile")
    );
    setRefreshing(false);

    if (res) {
      dispatch(
        updateAuthState({
          profile: { ...profile!, ...res.profile },
          pending: false,
        })
      );
    }
  };

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={fetchProfile} />
      }
      contentContainerStyle={styles.container}
    >
      {!profile?.verified && (
        <View style={styles.verificationLinkContainer}>
          <Text style={styles.verificationTitle}>
            Looks like you still need to verify your account.
          </Text>
          {busy ? (
            <Text onPress={getVerificationLink} style={styles.verificationLink}>
              Please wait...
            </Text>
          ) : (
            <Text onPress={getVerificationLink} style={styles.verificationLink}>
              Tap here for the verification link.
            </Text>
          )}
        </View>
      )}
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
  nameContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  verificationLinkContainer: {
    paddingVertical: 10,
    backgroundColor: colours.inActive,
    marginVertical: 10,
    borderRadius: 5,
  },
  verificationLink: {
    fontWeight: "600",
    color: colours.active,
    textAlign: "center",
    paddingTop: 5,
  },
  name: { color: colours.primary, fontSize: 20, fontWeight: "bold" },
  email: { color: colours.primary, paddingTop: 2 },
  marginBottom: {
    marginBottom: 15,
  },
  verificationTitle: {
    fontWeight: "600",
    color: colours.primary,
    textAlign: "center",
  },
});

export default Profile;
