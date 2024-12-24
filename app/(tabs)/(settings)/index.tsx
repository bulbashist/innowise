import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { changeMode, changeTheme } from "@/store/settings/slice";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { Theme } from "@/types/Theme";
import { StyleSheet, Switch, Text, View } from "react-native";

export default function SettingsScreen() {
  const { mode, theme } = useAppSelector((state) => state.settings);
  const dispatch = useAppDispatch();

  const themeHandler = (v: boolean) => {
    dispatch(changeTheme(v ? Theme.Dark : Theme.Light));
  };

  const modeHandler = (v: boolean) => {
    dispatch(changeMode(v ? "offline" : "online"));
  };

  return (
    <View style={styles.main}>
      <View style={styles.themeWrapper}>
        <ThemedText style={{ fontSize: 20, fontWeight: 500 }}>
          Dark theme
        </ThemedText>
        <Switch
          trackColor={{ false: "#8f8f8f", true: "#8f8f8f" }}
          thumbColor={theme ? "white" : "black"}
          onValueChange={themeHandler}
          value={theme === Theme.Light ? false : true}
        />
      </View>
      <View style={styles.themeWrapper}>
        <ThemedText style={{ fontSize: 20, fontWeight: 500 }}>
          Offline mode
        </ThemedText>
        <Switch
          trackColor={{ false: "#8f8f8f", true: "#8f8f8f" }}
          thumbColor={theme ? "white" : "black"}
          onValueChange={modeHandler}
          value={mode === "online" ? false : true}
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
