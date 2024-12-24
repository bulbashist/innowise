import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { changeTheme } from "@/store/settings/slice";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { Theme } from "@/types/Theme";
import { StyleSheet, Switch, Text, View } from "react-native";

export default function SettingsScreen() {
  const theme = useAppSelector((state) => state.settings.theme);
  const dispatch = useAppDispatch();

  const themeHandler = (v: boolean) => {
    dispatch(changeTheme(v ? Theme.Dark : Theme.Light));
  };

  return (
    <View style={styles.main}>
      <View style={styles.themeWrapper}>
        <ThemedText style={{ fontSize: 20, fontWeight: 500 }}>
          Dark mode
        </ThemedText>
        <Switch
          trackColor={{ false: "#8f8f8f", true: "#8f8f8f" }}
          thumbColor={theme ? "white" : "black"}
          onValueChange={themeHandler}
          value={theme === Theme.Light ? false : true}
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
