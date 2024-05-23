import colours from "@utils/colours";
import { FC, useState } from "react";
import {
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

interface Props<T> {
  visible: boolean;
  options: T[];
  renderItem(item: T): JSX.Element;
  onPress(item: T): void;
  onRequestClose(state: boolean): void;
}

const OptionsModal = <T extends unknown>({
  visible,
  onRequestClose,
  options,
  onPress,
  renderItem,
}: Props<T>) => {
  const handleClose = () => onRequestClose(!visible);

  return (
    <Modal transparent visible={visible} onRequestClose={handleClose}>
      <Pressable onPress={handleClose} style={styles.container}>
        <View style={styles.innerContainer}>
          <ScrollView>
            {options.map((item, index) => {
              return (
                <Pressable key={index} onPress={() => onPress(item)}>
                  {renderItem(item)}
                </Pressable>
              );
            })}
          </ScrollView>
        </View>
      </Pressable>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    alignItems: "center",
    justifyContent: "center",
    padding: 15,
    backgroundColor: colours.backDrop,
  },
  innerContainer: {
    width: "100%",
    backgroundColor: colours.inActive,
    padding: 10,
    borderRadius: 7,
    maxHeight: 200,
  },
});

export default OptionsModal;
