import colours from "@utils/colours";
import { FC, useState } from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import categories from "@utils/categories";

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
    backgroundColor: "red",
  },
  categoryName: {
    fontSize: 12,
    textAlign: "center",
    paddingTop: 2,
    color: colours.primary,
  },
});

export default CategoryList;
