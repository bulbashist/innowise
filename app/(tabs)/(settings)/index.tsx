import { changeTheme } from "@/store/settings/slice";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { Theme } from "@/types/Theme";
import { StyleSheet, Switch, Text, View } from "react-native";

export default function SettingsScreen() {
  const theme = useAppSelector((state) => state.settings.theme);
  const dispatch = useAppDispatch();

  const themeHandler = () => {
    dispatch(changeTheme(theme === Theme.Dark ? Theme.Light : Theme.Dark));
  };

  return (
    <View style={styles.main}>
      <View style={styles.themeWrapper}>
        <Text style={{ fontSize: 20, fontWeight: 500 }}>Application theme</Text>
        <Switch
          trackColor={{ false: "#8f8f8f", true: "#8f8f8f" }}
          thumbColor={theme ? "white" : "black"}
          onValueChange={themeHandler}
          value={!!theme}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    paddingTop: 50,
    paddingHorizontal: 25,
  },
  themeWrapper: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
