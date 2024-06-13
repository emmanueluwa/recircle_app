import { Ionicons } from "@expo/vector-icons";
import colours from "@utils/colours";
import size from "@utils/size";
import { FC, useState } from "react";
import {
  FlatList,
  Modal,
  Platform,
  Pressable,
  StatusBar,
  StyleSheet,
  Text,
  Keyboard,
  View,
} from "react-native";
import SearchBar from "./SearchBar";
import { SafeAreaView } from "react-native-safe-area-context";

interface Props {
  visible: boolean;
  onClose(visible: boolean): void;
}

const searchResults = [
  { id: 1, name: "Bentley Bentayga" },
  { id: 2, name: "Mercedes-Benz G-Class" },
  { id: 3, name: "Porsche Cayenne" },
  { id: 4, name: "Lamborghini Urus" },
  { id: 5, name: "Audi Q8" },
  { id: 6, name: "BMW X7" },
  { id: 7, name: "Range Rover Velar" },
  { id: 8, name: "Tesla Model X" },
  { id: 9, name: "Maserati Levante" },
  { id: 10, name: "Rolls-Royce Cullinan" },
  { id: 11, name: "Great Dane" },
  { id: 12, name: "Mastiff" },
  { id: 13, name: "Saint Bernard" },
  { id: 14, name: "Bernese Mountain Dog" },
  { id: 15, name: "Newfoundland" },
  { id: 16, name: "Rottweiler" },
  { id: 17, name: "Irish Wolfhound" },
  { id: 18, name: "Leonberger" },
  { id: 19, name: "Great Pyrenees" },
  { id: 20, name: "Anatolian Shepherd" },
];

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

          {/* search suggestions */}
          <FlatList
            data={searchResults}
            renderItem={({ item }) => (
              <Pressable>
                <Text style={styles.suggestionListItem}>{item.name}</Text>
              </Pressable>
            )}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={styles.suggestionList}
          />
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
  suggestionList: { paddingHorizontal: size.padding },
  suggestionListItem: {
    color: colours.primary,
    fontWeight: "600",
    paddingVertical: 7,
    fontSize: 18,
  },
});

export default SearchModal;
