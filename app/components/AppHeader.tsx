import { useNavigation } from "@react-navigation/native";
import colours from "@utils/colours";
import size from "@utils/size";
import { FC, useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";

interface Props {
  backButton?: JSX.Element | null;
  center?: JSX.Element | null;
  right?: JSX.Element | null;
}

const AppHeader: FC<Props> = ({ backButton, center, right }) => {
  const { goBack, canGoBack } = useNavigation();
  return (
    <View>
      {/* back button */}
      {canGoBack() && <Pressable onPress={goBack}>{backButton}</Pressable>}
      {/* center ui  */}
      {center}
      {/* right ui */}
      {right}
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

export default AppHeader;
