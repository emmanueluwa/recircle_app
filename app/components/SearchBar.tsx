import { useNavigation } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
import colours from "@utils/colours";
import { FC, useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";

interface Props {
  asButton?: boolean;
  onPress?: void;
}

const SearchBar: FC<Props> = ({ asButton, onPress }) => {
  const { goBack, canGoBack } = useNavigation();
  return (
    <Pressable onPress={onPress} style={styles.container}>
      <AntDesign name="search1" size={20} color={colours.primary} />

      {asButton ? (
        <View style={styles.textInput}>
          <Text style={styles.fakePlaceHolder}>Search here...</Text>
        </View>
      ) : (
        <TextInput
          placeholder="Search here..."
          style={[styles.textInput, styles.textInputText]}
          autoFocus
        />
      )}
    </Pressable>
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
  textInput: { paddingLeft: 10, flex: 1 },
  textInputText: {
    color: colours.primary,
    fontSize: 18,
  },
  fakePlaceHolder: {
    color: colours.primary,
    fontSize: 18,
    opacity: 0.5,
    fontWeight: "200",
  },
});

export default SearchBar;
