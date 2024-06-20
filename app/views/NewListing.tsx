import FormInput from "@ui/FormInput";
import { FC, useState } from "react";
import {
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import CategoryOption from "@ui/CategoryOption";
import { AntDesign } from "@expo/vector-icons";
import AppButton from "@ui/AppButton";
import CustomKeyAvoidingView from "@ui/CustomKeyAvoidingView";
import * as ImagePicker from "expo-image-picker";
import { showMessage } from "react-native-flash-message";
import mime from "mime";

import { newProductSchema, yupValidate } from "@utils/validator";
import HorizontalImageList from "@components/HorizontalImageList";
import colours from "@utils/colours";
import DatePicker from "@ui/DatePicker";
import OptionsModal from "@components/OptionsModal";
import categories from "@utils/categories";
import useClient from "app/hooks/useClient";
import { runAxiosAsync } from "app/api/runAxiosAsync";
import LoadingSpinner from "@ui/LoadingSpinner";
import OptionSelector from "@ui/OptionSelector";
import { selectImages } from "@utils/helper";
import CategoryOptions from "@components/CategoryOptions";
import LocationOptions from "@components/LocationOptions";
import LocationOptionsModal from "@components/LocationOptionsModal";
import locations from "@utils/locations";
import LocationOption from "@ui/LocationOption";

interface Props {}

const defaultInfo = {
  name: "",
  description: "",
  category: "",
  location: "",
  price: "",
  purchasingDate: new Date(),
};

const imageOptions = [{ value: "Remove Image", id: "remove" }];

const NewListing: FC<Props> = ({}) => {
  const [productInfo, setProductInfo] = useState({ ...defaultInfo });
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [showLocationModal, setShowLocationModal] = useState(false);

  const [images, setImages] = useState<string[]>([]);
  const [showImageOptions, setShowImageOptions] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");

  const [busy, setBusy] = useState(false);

  const { authClient } = useClient();

  const { category, location, description, name, price, purchasingDate } =
    productInfo;

  const handleChange = (name: string) => (text: string) => {
    setProductInfo({ ...productInfo, [name]: text });
  };

  const handleSubmit = async () => {
    const { error } = await yupValidate(newProductSchema, productInfo);
    if (error) return showMessage({ message: error, type: "danger" });

    // submit form
    type productInfoKeys = keyof typeof productInfo;

    setBusy(true);

    const formData = new FormData();
    for (let key in productInfo) {
      const value = productInfo[key as productInfoKeys];

      if (value instanceof Date) {
        formData.append(key, value.toISOString());
      } else {
        formData.append(key, value);
      }
    }

    // adding images
    const newImages = images.map((img, index) => ({
      name: "name_" + index,
      type: mime.getType(img),
      uri: img,
    }));

    for (let img of newImages) {
      formData.append("images", img as any);
    }

    const res = await runAxiosAsync<{ message: string }>(
      authClient.post("/product/list", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
    );

    setBusy(false);

    if (res) {
      showMessage({ message: res.message, type: "success" });
      //clear form
      setProductInfo({ ...defaultInfo });
      setImages([]);
    }
  };

  const handleOnImageSelection = async () => {
    const newImages = await selectImages();
    setImages([...images, ...newImages]);
  };

  return (
    <CustomKeyAvoidingView>
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Pressable
            onPress={handleOnImageSelection}
            style={styles.fileSelector}
          >
            <View style={styles.iconContainer}>
              <FontAwesome5 name="images" size={24} color="black" />
            </View>
            <Text style={styles.buttonTitle}>Add Images</Text>
          </Pressable>

          <HorizontalImageList
            images={images}
            onLongPress={(img) => {
              setSelectedImage(img);
              setShowImageOptions(true);
            }}
          />
        </View>

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

        <CategoryOptions
          onSelect={handleChange("category")}
          title={category || "Category"}
        />

        <LocationOptions
          onSelect={handleChange("location")}
          title={location || "Location"}
        />

        <FormInput
          value={description}
          placeholder="Description"
          multiline
          numberOfLines={4}
          onChangeText={handleChange("description")}
        />

        <AppButton title="List Product" onPress={handleSubmit} />

        {/* image options */}
        <OptionsModal
          visible={showImageOptions}
          onRequestClose={setShowImageOptions}
          options={imageOptions}
          renderItem={(item) => {
            return <Text style={styles.imageOptions}>{item.value}</Text>;
          }}
          onPress={(option) => {
            if (option.id === "remove") {
              const newImages = images.filter((img) => img !== selectedImage);
              setImages([...newImages]);
            }
          }}
        />
      </View>
      <LoadingSpinner visible={busy} />
    </CustomKeyAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
    flex: 1,
  },
  imageContainer: { flexDirection: "row" },
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
  selectedImage: {
    width: 70,
    height: 70,
    borderRadius: 7,
    marginLeft: 5,
  },
  buttonTitle: { color: colours.primary, marginTop: 5 },
  imageOptions: {
    fontWeight: "600",
    fontSize: 18,
    color: colours.primary,
    padding: 10,
  },
  location: { color: colours.primary, paddingVertical: 10 },
  locationSelector: {
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
  locationTitle: { color: colours.primary },
});

export default NewListing;
