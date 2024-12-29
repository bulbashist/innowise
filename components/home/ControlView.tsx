import { useAppDispatch, useAppSelector } from "@/store/store";
import { useThemeColor } from "@/hooks/useThemeColor";
import { Picker } from "@react-native-picker/picker";
import { changeFilter } from "@/store/list/slice";
import { StyleSheet, View } from "react-native";

export function ControlView() {
  const { species, status } = useAppSelector((state) => state.list.filter);
  const backColor = useThemeColor(
    { dark: "#111111", light: "#ffffff" },
    "background"
  );
  const textColor = useThemeColor(
    { dark: "#ffffff", light: "#111111" },
    "text"
  );
  const iconColor = useThemeColor({}, "icon");
  const dispatch = useAppDispatch();

  return (
    <View style={styles.wrapper}>
      <Picker
        dropdownIconColor={iconColor}
        style={[
          styles.picker,
          { backgroundColor: backColor, color: textColor },
        ]}
        mode="dropdown"
        selectedValue={species}
        onValueChange={(value) =>
          dispatch(changeFilter({ species: value.trim() }))
        }
      >
        <Picker.Item
          style={{ backgroundColor: backColor, color: textColor }}
          label="Any species"
          value=" "
        />
        <Picker.Item
          style={{ backgroundColor: backColor, color: textColor }}
          label="Alien"
          value="Alien"
        />
        <Picker.Item
          style={{ backgroundColor: backColor, color: textColor }}
          label="Human"
          value="Human"
        />
      </Picker>
      <Picker
        dropdownIconColor={iconColor}
        style={[
          styles.picker,
          { backgroundColor: backColor, color: textColor },
        ]}
        mode="dropdown"
        selectedValue={status}
        onValueChange={(value) => {
          dispatch(changeFilter({ status: value.trim() }));
        }}
      >
        <Picker.Item
          style={{ backgroundColor: backColor, color: textColor }}
          label="Any status"
          value=" "
        />
        <Picker.Item
          style={{ backgroundColor: backColor, color: textColor }}
          label="Alive"
          value="Alive"
        />
        <Picker.Item
          style={{ backgroundColor: backColor, color: textColor }}
          label="Dead"
          value="Dead"
        />
        <Picker.Item
          style={{ backgroundColor: backColor, color: textColor }}
          label="Unknown"
          value="unknown"
        />
      </Picker>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-evenly",
    gap: 5,
    marginBottom: 5,
  },
  picker: {
    minWidth: 200,
  },
});
