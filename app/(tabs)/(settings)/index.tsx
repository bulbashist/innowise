import { useState } from "react";
import { StyleSheet, Switch, Text, View } from "react-native";

enum Theme {
  Dark = 0,
  Light = 1,
}

export default function SettingsScreen() {
  const [theme, setTheme] = useState(Theme.Dark);

  return (
    <View style={styles.main}>
      <View style={styles.themeWrapper}>
        <Text style={{ fontSize: 20, fontWeight: 500 }}>Application theme</Text>
        <Switch
          trackColor={{ false: "#8f8f8f", true: "#8f8f8f" }}
          thumbColor={theme ? "white" : "black"}
          onValueChange={() =>
            setTheme((prev) => (prev === Theme.Dark ? Theme.Light : Theme.Dark))
          }
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
