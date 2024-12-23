import { Picker } from "@react-native-picker/picker";
import { View } from "react-native";

export default function ControlView() {
  return (
    <View>
      <Picker
        mode="dropdown"
        selectedValue={null}
        onValueChange={(itemValue, itemIndex) => {}}
      >
        <Picker.Item label="Alien" value="Alien" />
        <Picker.Item label="Human" value="Human" />
      </Picker>
      <Picker
        mode="dropdown"
        selectedValue={null}
        onValueChange={(itemValue, itemIndex) => {}}
      >
        <Picker.Item label="Alive" value="Alive" />
        <Picker.Item label="Dead" value="Dead" />
        <Picker.Item label="Unknown" value="unknown" />
      </Picker>
    </View>
  );
}
