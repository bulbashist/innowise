import { changeFilter } from "@/store/list/slice";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { Theme } from "@/types/Theme";
import { Picker } from "@react-native-picker/picker";
import { StyleSheet, View } from "react-native";

export default function ControlView() {
  const { species, status } = useAppSelector((state) => state.list.filter);
  const theme = useAppSelector((state) => state.settings.theme);
  const dispatch = useAppDispatch();

  const pickerTheme = theme === Theme.Dark ? styles.darkPicker : null;
  const pickerItemTheme = theme === Theme.Dark ? styles.darkItemPicker : null;

  return (
    <View style={styles.wrapper}>
      <Picker
        dropdownIconColor={theme === Theme.Light ? "black" : "white"}
        style={[styles.picker, pickerTheme]}
        mode="dropdown"
        selectedValue={species}
        onValueChange={(value) =>
          dispatch(changeFilter({ species: value.trim() }))
        }
      >
        <Picker.Item
          style={{ ...pickerItemTheme }}
          label="Any species"
          value=" "
        />
        <Picker.Item
          style={{ ...pickerItemTheme }}
          label="Alien"
          value="Alien"
        />
        <Picker.Item
          style={{ ...pickerItemTheme }}
          label="Human"
          value="Human"
        />
      </Picker>
      <Picker
        dropdownIconColor={theme === Theme.Light ? "black" : "white"}
        style={[styles.picker, pickerTheme]}
        mode="dropdown"
        selectedValue={status}
        onValueChange={(value) => {
          dispatch(changeFilter({ status: value.trim() }));
        }}
      >
        <Picker.Item
          style={{ ...pickerItemTheme }}
          label="Any status"
          value=" "
        />
        <Picker.Item
          style={{ ...pickerItemTheme }}
          label="Alive"
          value="Alive"
        />
        <Picker.Item style={{ ...pickerItemTheme }} label="Dead" value="Dead" />
        <Picker.Item
          style={{ ...pickerItemTheme }}
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
    justifyContent: "space-evenly",
    marginBottom: 5,
  },
  picker: {
    width: 200,
  },
  darkPicker: {
    backgroundColor: "#111111",
    color: "white",
  },
  darkItemPicker: {
    backgroundColor: "#111111",
    color: "white",
  },
});
