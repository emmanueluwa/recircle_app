import AppHeader from "@components/AppHeader";
import SingleProduct from "@components/SingleProduct";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { FontAwesome5 } from "@expo/vector-icons";
import BackButton from "@ui/BackButton";
import colours from "@utils/colours";
import useAuth from "app/hooks/useAuth";
import { ProfileNavigatorParamList } from "app/navigator/ProfileNavigator";
import { FC, useState } from "react";
import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import mime from "mime";
import deepEqual from "deep-equal";
import OptionButton from "@ui/OptionButton";
import OptionsModal from "@components/OptionsModal";
import useClient from "app/hooks/useClient";
import { runAxiosAsync } from "app/api/runAxiosAsync";
import { showMessage } from "react-native-flash-message";
import LoadingSpinner from "@ui/LoadingSpinner";
import { useDispatch } from "react-redux";
import { deleteItem } from "app/store/listings";
import size from "@utils/size";
import HorizontalImageList from "@components/HorizontalImageList";
import FormInput from "@ui/FormInput";
import DatePicker from "@ui/DatePicker";
import OptionSelector from "@ui/OptionSelector";
import { selectImages } from "@utils/helper";
import CategoryOptions from "@components/CategoryOptions";
import AppButton from "@ui/AppButton";
import { newProductSchema, yupValidate } from "@utils/validator";

type Props = NativeStackScreenProps<ProfileNavigatorParamList, "EditProduct">;

type ProductInfo = {
  name: string;
  description: string;
  category: string;
  price: string;
  purchasingDate: Date;
};

const imageOptions = [
  { value: "Use as Thumbnail", id: "thumb" },
  { value: "Remove Image", id: "remove" },
];

const EditProduct: FC<Props> = ({ route }) => {
  const { authClient } = useClient();
  const [busy, setBusy] = useState(false);

  const [product, setProduct] = useState({
    ...route.params.product,
    price: route.params.product.price.toString(),
    date: new Date(route.params.product.date),
  });

  const [selectedImage, setSelectedImage] = useState("");
  const [showImageOptions, setShowImageOptions] = useState(false);

  const onLongPress = (image: string) => {
    setSelectedImage(image);
    setShowImageOptions(true);
  };

  const removeSelectedImage = async () => {
    const notLocalImage = selectedImage.startsWith(
      "https://res.cloudinary.com"
    );

    const images = product.image;
    const newImages = images?.filter((img) => img !== selectedImage);
    setProduct({ ...product, image: newImages });

    if (notLocalImage) {
      //https://res.cloudinary.com/dmihglkkd/image/upload/v1717605333/ygause54pinciwo75xgi.jpg
      const splitItems = selectedImage.split("/");
      const imageId = splitItems[splitItems.length - 1].split(".")[0];
      await runAxiosAsync<{ message: string }>(
        authClient.delete(`/product/image/${product.id}/${imageId}`)
      );
    }
  };

  const handleOnImageSelect = async () => {
    const newImages = await selectImages();
    const oldImages = product.image || [];
    const images = oldImages.concat(newImages);
    setProduct({ ...product, image: [...images] });
  };

  const makeSelectedImageThumbnail = async () => {
    if (selectedImage.startsWith("https://res.cloudinary.com")) {
      setProduct({ ...product, thumbnail: selectedImage });
    }
  };

  const handleOnSubmit = async () => {
    const dataToUpdate: ProductInfo = {
      name: product.name,
      category: product.category,
      description: product.description,
      price: product.price,
      purchasingDate: product.date,
      thumbnail: product.thumbnail,
    };

    const { error } = await yupValidate(newProductSchema, dataToUpdate);
    if (error) return showMessage({ message: error, type: "danger" });

    //prepare new updated form
    const formData = new FormData();

    if (product.thumbnail) {
      formData.append("thumbnail", product.thumbnail);
    }

    type productInfoKeys = keyof typeof dataToUpdate;

    for (let key in dataToUpdate) {
      const value = dataToUpdate[key as productInfoKeys];
      if (value instanceof Date) formData.append(key, value.toISOString());
      else formData.append(key, value);
    }

    product.image?.forEach((img, index) => {
      if (!img.startsWith("https://res.cloudinary.com")) {
        formData.append("images", {
          uri: img,
          name: "image_" + index,
          type: mime.getType(img) || "image/jpg",
        } as any);
      }
    });

    //send data to api
    setBusy(true);
    const res = await runAxiosAsync<{ message: string }>(
      authClient.patch("/product/" + product.id, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
    );
    console.log(formData);
    setBusy(false);

    if (res) {
      showMessage({ message: res.message, type: "success" });
    }
  };

  return (
    <>
      <AppHeader backButton={<BackButton />} />
      <View style={styles.container}>
        <ScrollView>
          <Text style={styles.title}>Images</Text>
          <HorizontalImageList
            images={product.image || []}
            onLongPress={onLongPress}
          />

          <Pressable onPress={handleOnImageSelect} style={styles.imageSelector}>
            <FontAwesome5 name="images" size={30} color={colours.primary} />
          </Pressable>

          <FormInput
            placeholder="Product name"
            value={product.name}
            onChangeText={(name) => setProduct({ ...product, name })}
          />
          <FormInput
            placeholder="Price"
            keyboardType="numeric"
            value={product.price.toString()}
            onChangeText={(price) => setProduct({ ...product, price })}
          />

          <DatePicker
            value={product.date}
            title="Purchasing Date: "
            onChange={(date) => setProduct({ ...product, date })}
          />

          <CategoryOptions
            onSelect={(category) => setProduct({ ...product, category })}
            title={product.category || "Category"}
          />

          <FormInput
            placeholder="Description"
            value={product.description}
            onChangeText={(description) =>
              setProduct({ ...product, description })
            }
          />
          <AppButton title="Update Product" onPress={handleOnSubmit} />
        </ScrollView>
      </View>

      <OptionsModal
        options={imageOptions}
        visible={showImageOptions}
        onRequestClose={setShowImageOptions}
        renderItem={(option) => {
          return <Text style={styles.option}>{option.value}</Text>;
        }}
        onPress={({ id }) => {
          if (id == "thumb") makeSelectedImageThumbnail();
          if (id == "remove") removeSelectedImage();
        }}
      />
      <LoadingSpinner visible={busy} />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: size.padding,
  },
  title: {
    fontWeight: "600",
    fontSize: 16,
    color: colours.primary,
    marginBottom: 10,
  },
  imageSelector: {
    height: 70,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 7,
    borderColor: colours.primary,
    marginVertical: 10,
  },
  option: {
    paddingVertical: 10,
    color: colours.primary,
  },
});

export default EditProduct;
