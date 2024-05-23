import FormInput from "@ui/FormInput";
import { FC, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import colours from "@utils/colours";
import DatePicker from "@ui/DatePicker";
import OptionsModal from "@components/OptionsModal";
import categories from "@utils/categories";
import CategoryOption from "@ui/CategoryOption";
import { AntDesign } from "@expo/vector-icons";

interface Props {}

const NewListing: FC<Props> = ({}) => {
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  return (
    <View style={styles.container}>
      <Pressable style={styles.fileSelector}>
        <View style={styles.iconContainer}>
          <FontAwesome5 name="images" size={24} color="black" />
        </View>
        <Text style={styles.buttonTitle}>Add Images</Text>
      </Pressable>
      <FormInput placeholder="Product name" />
      <FormInput placeholder="Price" />
      <DatePicker
        title="Date purchased: "
        value={new Date()}
        onChange={() => {}}
      />
      <Pressable
        style={styles.categorySelector}
        onPress={() => setShowCategoryModal(true)}
      >
        <Text style={styles.categoryTitle}>Category</Text>
        <AntDesign name="caretdown" color={colours.primary} />
      </Pressable>

      <FormInput placeholder="Description" />

      <OptionsModal
        visible={showCategoryModal}
        onRequestClose={setShowCategoryModal}
        options={categories}
        renderItem={(item) => {
          return <CategoryOption {...item} />;
        }}
        onPress={(item) => {
          console.log(item.name);
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
  },
  fileSelector: {
    marginBottom: 15,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "flex-start",
  },

  iconContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: 70,
    height: 70,
    borderWidth: 2,
    borderColor: colours.primary,
    borderRadius: 7,
  },
  buttonTitle: { color: colours.primary, marginTop: 5 },
  categorySelector: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 15,
    padding: 8,
    borderWidth: 1,
    borderColor: colours.inActive,
    borderRadius: 5,
  },
  categoryTitle: { color: colours.primary },
});

export default NewListing;
