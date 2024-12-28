import { refresh } from "@react-native-community/netinfo";
import { ThemedView } from "./ThemedView";
import { ThemedText } from "./ThemedText";
import { StyleSheet, TouchableOpacity } from "react-native";

export function NoInternet() {
  return (
    <ThemedView style={styles.wrapper}>
      <ThemedText style={{ textAlign: "center" }}>
        Please check your internet connection and try again
      </ThemedText>
      <TouchableOpacity style={styles.button} onPress={refresh}>
        <ThemedText style={{ textAlign: "center" }}>Try again</ThemedText>
      </TouchableOpacity>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 20,
    paddingVertical: 10,
  },
  button: {
    width: 150,
    borderWidth: 1,
    padding: 10,
  },
});
