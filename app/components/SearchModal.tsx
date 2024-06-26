import { Ionicons } from "@expo/vector-icons";
import colours from "@utils/colours";
import size from "@utils/size";
import { FC, useEffect, useState } from "react";
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
  Image,
} from "react-native";
import SearchBar from "./SearchBar";
import { SafeAreaView } from "react-native-safe-area-context";
import EmptyView from "@ui/EmptyView";
import LottieView from "lottie-react-native";
import useClient from "app/hooks/useClient";
import { runAxiosAsync } from "app/api/runAxiosAsync";
import { debounce } from "@utils/helper";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { AppStackParamList } from "app/navigator/AppNavigator";
import KeyboardShift from "./KeyboardShift";

interface Props {
  visible: boolean;
  onClose(visible: boolean): void;
}

type SearchResult = {
  id: string;
  name: string;
  thumbnail?: string;
};

const SearchModal: FC<Props> = ({ visible, onClose }) => {
  const { authClient } = useClient();
  const { navigate } = useNavigation<NavigationProp<AppStackParamList>>();

  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);

  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const [busy, setBusy] = useState(false);
  const [notFound, setNotFound] = useState(false);

  const searchProduct = async (query: string) => {
    if (query.trim().length >= 3) {
      return await runAxiosAsync<{ results: SearchResult[] }>(
        authClient.get("/product/search?name=" + query)
      );
    }
  };

  const handleOnResultPress = (result: SearchResult) => {
    navigate("DetailProduct", { id: result.id });
    handleClose();
  };

  const searchDebounce = debounce(searchProduct, 300);

  const handleChange = async (value: string) => {
    setNotFound(false);
    setQuery(value);
    setBusy(true);

    const res = await searchDebounce(value);
    setBusy(false);
    if (res) {
      if (res.results.length) setResults(res.results);
      else setNotFound(true);
    }
  };

  const handleClose = () => {
    onClose(!visible);
  };

  useEffect(() => {
    const keyShowEvent =
      Platform.OS === "ios" ? "keyboardWillShow" : "keyboardDidShow";
    const keyHideEvent =
      Platform.OS === "ios" ? "keyboardWillHide" : "keyboardDidHide";

    const keyShowListener = Keyboard.addListener(keyShowEvent, (evt) => {
      setKeyboardHeight(evt.endCoordinates.height + 50);
    });

    const keyHideListener = Keyboard.addListener(keyHideEvent, (evt) => {
      setKeyboardHeight(0);
    });

    return () => {
      keyShowListener.remove();
      keyHideListener.remove();
    };
  }, []);

  return (
    <Modal animationType="fade" onRequestClose={handleClose} visible={visible}>
      <SafeAreaView style={styles.container}>
        {/* searchbar */}
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
              <SearchBar onChange={handleChange} value={query} />
            </View>
          </View>

          {/* busy indicator */}
          {busy ? (
            <View style={styles.busyIconContainer}>
              <View style={styles.busyAnimationSize}>
                <LottieView
                  style={styles.flex1}
                  autoPlay
                  loop
                  source={require("../../assets/loading_2.json")}
                />
              </View>
            </View>
          ) : null}

          {/* search suggestions */}
          <KeyboardShift>
            {/* <View style={{ paddingBottom: keyboardHeight }}> */}
            <View>
              <FlatList
                data={!busy ? results : []}
                renderItem={({ item }) => (
                  <Pressable
                    onPress={() => handleOnResultPress(item)}
                    style={styles.searchResultItem}
                  >
                    <Image
                      source={{ uri: item.thumbnail || undefined }}
                      style={styles.thumbnail}
                    />
                    <Text style={styles.suggestionListItem}>{item.name}</Text>
                  </Pressable>
                )}
                keyExtractor={(item) => item.id.toString()}
                contentContainerStyle={styles.suggestionList}
                ListEmptyComponent={
                  notFound ? <EmptyView title="No results found..." /> : null
                }
              />
            </View>
          </KeyboardShift>
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
  searchResultItem: { flexDirection: "row", marginBottom: 7 },
  thumbnail: {
    width: 60,
    height: 40,
    marginRight: 10,
  },
  innerContainer: { padding: size.padding, flex: 1 },
  header: { flexDirection: "row", alignItems: "center" },
  searchBar: { flex: 1, marginLeft: size.padding },
  suggestionList: { padding: size.padding },
  suggestionListItem: {
    color: colours.primary,
    fontWeight: "600",
    paddingVertical: 7,
    fontSize: 18,
  },
  busyIconContainer: {
    flex: 0.3,
    alignItems: "center",
    justifyContent: "center",
    opacity: 0.5,
  },
  busyAnimationSize: { height: 100, width: 100 },
  flex1: { flex: 1 },
});

export default SearchModal;
