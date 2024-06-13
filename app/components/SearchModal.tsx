import { useNavigation } from "@react-navigation/native";
import AvatarView from "@ui/AvatarView";
import { Ionicons } from "@expo/vector-icons";
import colours from "@utils/colours";
import { formatDate } from "@utils/date";
import { formatPrice } from "@utils/helper";
import size from "@utils/size";
import { FC, useState } from "react";
import {
  Modal,
  Platform,
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import ImageSlider from "./ImageSlider";
import { Product } from "app/store/listings";
import SearchBar from "./SearchBar";
import { SafeAreaView } from "react-native-safe-area-context";

interface Props {
  visible: boolean;
  onClose(visible: boolean): void;
}

const SearchModal: FC<Props> = ({ visible, onClose }) => {
  const handleClose = () => {
    onClose(!visible);
  };

  return (
    <Modal animationType="fade" onRequestClose={handleClose} visible={visible}>
      <SafeAreaView style={styles.container}>
        <View style={styles.innerContainer}>
          <View style={styles.header}>
            <Pressable onPress={handleClose}>
              <Ionicons
                name="arrow-back-outline"
                size={24}
                color={colours.primary}
              />
            </Pressable>

            <View style={styles.searchBar}>
              <SearchBar />
            </View>
          </View>
        </View>
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  innerContainer: { padding: size.padding },
  header: { flexDirection: "row", alignItems: "center" },
  searchBar: { flex: 1, marginLeft: size.padding },
});

export default SearchModal;
