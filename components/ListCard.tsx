import { StatusColor } from "@/app/(tabs)/(home)/types";
import { Character } from "@/types/Character";
import { MaterialIcons } from "@expo/vector-icons";
import { Link } from "expo-router";
import { Image, StyleSheet, Text, View } from "react-native";
import { ThemedText } from "./ThemedText";
import { ThemedView } from "./ThemedView";

type Props = {
  item: Character;
};

export function ListCard({ item }: Props) {
  return (
    <Link href={`/(details)/${item.id}`}>
      <ThemedView lightColor="#bec0c6" darkColor="#777779" style={styles.item}>
        <Image width={120} height={120} source={{ uri: item.image }} />
        <View
          style={{
            paddingVertical: 20,
            paddingRight: 10,
            flexShrink: 1,
          }}
        >
          <View style={{ marginBottom: 20 }}>
            <ThemedText style={{ fontWeight: 700 }}>{item.name}</ThemedText>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <MaterialIcons
                name="circle"
                color={StatusColor[item.status]}
                style={{ marginRight: 2 }}
              />
              <ThemedText style={{ fontWeight: 600 }}>
                {item.status} - {item.species}
              </ThemedText>
            </View>
          </View>
          <View style={{ marginBottom: 20 }}>
            <ThemedText lightColor="#3c3e44" darkColor="#3c3e44">
              Last known location:
            </ThemedText>
            <ThemedText>{item.location.name}</ThemedText>
          </View>
          <View>
            <ThemedText lightColor="#3c3e44" darkColor="#3c3e44">
              First seen in:
            </ThemedText>
            <ThemedText>{item.episode[0].name}</ThemedText>
          </View>
        </View>
      </ThemedView>
    </Link>
  );
}

const styles = StyleSheet.create({
  item: {
    display: "flex",
    flexDirection: "row",
    gap: 10,
    width: "100%",
    borderRadius: 10,
  },
});
