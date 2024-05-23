import colours from "@utils/colours";
import { FC, useState } from "react";
import { Platform, Pressable, StyleSheet, Text, View } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

interface Props {
  title: string;
  value: Date;
  onChange(value: Date): void;
}

const isIOS = Platform.OS == "ios";

const DatePicker: FC<Props> = ({ title, value, onChange }) => {
  const [showPicker, setShowPicker] = useState(false);

  const visible = isIOS ? true : showPicker;

  const onPress = () => {
    if (isIOS) return;
    setShowPicker(true);
  };
  return (
    <Pressable onPress={onPress} style={styles.container}>
      <Text style={styles.title}>{title}</Text>

      {!isIOS && <Text style={styles.value}>{value.toISOString()}</Text>}

      {visible ? (
        <DateTimePicker
          value={value}
          testID="dateTimePicker"
          onChange={(_, date) => {
            if (date) onChange(date);
          }}
        />
      ) : null}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    marginBottom: 15,
  },
  title: { color: colours.primary },
  value: { color: colours.primary, paddingRight: 10 },
});

export default DatePicker;
