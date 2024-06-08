import { useNavigation } from "@react-navigation/native";
import AvatarView from "@ui/AvatarView";
import { AntDesign } from "@expo/vector-icons";
import colours from "@utils/colours";
import { formatDate } from "@utils/date";
import { formatPrice } from "@utils/helper";
import size from "@utils/size";
import { FC, useState } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import ImageSlider from "./ImageSlider";
import { Product } from "app/store/listings";

interface Props {}

const SearchBar: FC<Props> = ({}) => {
  const { goBack, canGoBack } = useNavigation();
  return (
    <View style={styles.container}>
      <AntDesign name="search1" size={20} color={colours.primary} />
      <TextInput placeholder="Search here..." style={styles.textInput} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    borderWidth: 1,
    borderRadius: 5,
    borderColor: colours.primary,
    padding: 10,
  },
  textInput: { paddingLeft: 10, flex: 1, color: colours.primary, fontSize: 18 },
});

export default SearchBar;
