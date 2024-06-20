import { useNavigation } from "@react-navigation/native";
import colours from "@utils/colours";
import size from "@utils/size";
import { FC, useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import OptionsModal from "./OptionsModal";
import OptionSelector from "@ui/OptionSelector";
import { deleteItem } from "app/store/listings";
import locations from "@utils/locations";
import LocationOption from "@ui/LocationOption";
import LocationOptionsModal from "./LocationOptionsModal";
import LocationOptionSelector from "@ui/LocationOptionSelector";

interface Props {
  title: string;
  onSelect(location: string): void;
}

const LocationOptions: FC<Props> = ({ title, onSelect }) => {
  const { goBack, canGoBack } = useNavigation();

  const [showLocationModal, setShowLocationModal] = useState(false);
  return (
    <View style={styles.container}>
      <LocationOptionSelector
        onPress={() => setShowLocationModal(true)}
        title={title}
      />

      <LocationOptionsModal
        visible={showLocationModal}
        onRequestClose={setShowLocationModal}
        options={locations}
        renderItem={(item) => {
          return <LocationOption {...item} />;
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

export default LocationOptions;
