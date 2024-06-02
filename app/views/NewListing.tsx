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
import AppButton from "@ui/AppButton";
import CustomKeyAvoidingView from "@ui/CustomKeyAvoidingView";

interface Props {}

const defaultInfo = {
  name: "",
  description: "",
  category: "",
  price: "",
  purchasingDate: new Date(),
};

const NewListing: FC<Props> = ({}) => {
  const [productInfo, setProductInfo] = useState({ ...defaultInfo });
  const [showCategoryModal, setShowCategoryModal] = useState(false);

  const { category, description, name, price, purchasingDate } = productInfo;

  const handleChange = (name: string) => (text: string) => {
    setProductInfo({ ...productInfo, [name]: text });
  };

  const handleSubmit = () => {
    console.log(productInfo);
  };

  return (
    <CustomKeyAvoidingView>
      <View style={styles.container}>
        <Pressable style={styles.fileSelector}>
          <View style={styles.iconContainer}>
            <FontAwesome5 name="images" size={24} color="black" />
          </View>
          <Text style={styles.buttonTitle}>Add Images</Text>
        </Pressable>
        <FormInput
          value={name}
          placeholder="Product name"
          onChangeText={handleChange("name")}
        />
        <FormInput
          value={price}
          placeholder="Price"
          onChangeText={handleChange("price")}
          keyboardType="numeric"
        />
        <DatePicker
          title="Date purchased: "
          value={purchasingDate}
          onChange={(date) =>
            setProductInfo({ ...productInfo, purchasingDate })
          }
        />
        <Pressable
          style={styles.categorySelector}
          onPress={() => setShowCategoryModal(true)}
        >
          <Text style={styles.categoryTitle}>{category || "Category"}</Text>
          <AntDesign name="caretdown" color={colours.primary} />
        </Pressable>

        <FormInput
          value={description}
          placeholder="Description"
          multiline
          numberOfLines={4}
          onChangeText={handleChange("description")}
        />

        <AppButton title="List Product" onPress={handleSubmit} />

        <OptionsModal
          visible={showCategoryModal}
          onRequestClose={setShowCategoryModal}
          options={categories}
          renderItem={(item) => {
            return <CategoryOption {...item} />;
          }}
          onPress={(item) =>
            setProductInfo({ ...productInfo, category: item.name })
          }
        />
      </View>
    </CustomKeyAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
    flex: 1,
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
