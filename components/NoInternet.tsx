import { refresh } from "@react-native-community/netinfo";
import { ThemedView } from "./ThemedView";
import { ThemedText } from "./ThemedText";
import { Pressable } from "react-native";

export function NoInternet() {
  return (
    <ThemedView>
      <ThemedText>
        Please check your internet connection and try again
      </ThemedText>
      <Pressable onPress={refresh}>
        <ThemedText>Try again</ThemedText>
      </Pressable>
    </ThemedView>
  );
}
