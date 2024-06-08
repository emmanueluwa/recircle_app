import { useNavigation } from "@react-navigation/native";
import colours from "@utils/colours";
import size from "@utils/size";
import { FC, useState } from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import OptionsModal from "./OptionsModal";
import OptionSelector from "@ui/OptionSelector";
import CategoryOption from "@ui/CategoryOption";
import categories from "@utils/categories";
import { deleteItem } from "app/store/listings";

interface Props {
  onPress(category: string): void;
}

const LIST_ITEM_SIZE = 80;

const CategoryList: FC<Props> = ({ onPress }) => {
  return (
    <View style={styles.container}>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={categories}
        renderItem={({ item }) => {
          return (
            <Pressable
              onPress={() => onPress(item.name)}
              style={styles.listItem}
            >
              <View style={styles.iconContainer}>{item.icon}</View>
              <Text numberOfLines={2} style={styles.categoryName}>
                {item.name}
              </Text>
            </Pressable>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
  },
  listItem: { width: LIST_ITEM_SIZE, marginRight: 20 },
  iconContainer: {
    width: LIST_ITEM_SIZE,
    height: LIST_ITEM_SIZE,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderRadius: 7,
    borderColor: colours.primary,
  },
  categoryName: {
    fontSize: 12,
    textAlign: "center",
    paddingTop: 2,
    color: colours.primary,
  },
});

export default CategoryList;
