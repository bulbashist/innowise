import { changeFilter } from "@/store/list/slice";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { Picker } from "@react-native-picker/picker";
import { StyleSheet, View } from "react-native";

export default function ControlView() {
  const { species, status } = useAppSelector((state) => state.list.filter);
  const dispatch = useAppDispatch();

  return (
    <View style={styles.wrapper}>
      <Picker
        mode="dropdown"
        style={styles.picker}
        selectedValue={species}
        onValueChange={(value) =>
          dispatch(changeFilter({ species: value.trim() }))
        }
      >
        <Picker.Item label="Any species" value=" " />
        <Picker.Item label="Alien" value="Alien" />
        <Picker.Item label="Human" value="Human" />
      </Picker>
      <Picker
        style={styles.picker}
        mode="dropdown"
        selectedValue={status}
        onValueChange={(value) => {
          dispatch(changeFilter({ status: value.trim() }));
        }}
      >
        <Picker.Item label="Any status" value=" " />
        <Picker.Item label="Alive" value="Alive" />
        <Picker.Item label="Dead" value="Dead" />
        <Picker.Item label="Unknown" value="unknown" />
      </Picker>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  picker: {
    width: 200,
  },
});
