import { useNavigation } from "@react-navigation/native";
import colours from "@utils/colours";
import size from "@utils/size";
import { FC, useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import OptionsModal from "./OptionsModal";
import OptionSelector from "@ui/OptionSelector";
import CategoryOption from "@ui/CategoryOption";
import categories from "@utils/categories";
import { deleteItem } from "app/store/listings";

interface Props {
  title: string;
  onSelect(category: string): void;
}

const CategoryOptions: FC<Props> = ({ title, onSelect }) => {
  const { goBack, canGoBack } = useNavigation();

  const [showCategoryModal, setShowCategoryModal] = useState(false);
  return (
    <View style={styles.container}>
      <OptionSelector
        onPress={() => setShowCategoryModal(true)}
        title={title}
      />

      <OptionsModal
        visible={showCategoryModal}
        onRequestClose={setShowCategoryModal}
        options={categories}
        renderItem={(item) => {
          return <CategoryOption {...item} />;
        }}
        onPress={(item) => onSelect(item.name)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: size.padding,
  },
});

export default CategoryOptions;
