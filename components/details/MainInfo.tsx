import { Fontisto, MaterialCommunityIcons } from "@expo/vector-icons";
import { FlatList, StyleSheet, View, ViewProps } from "react-native";
import { useThemeColor } from "@/hooks/useThemeColor";
import { ThemedText } from "../ThemedText";
import { Character } from "@/types";

type Props = ViewProps & {
  character: Character;
};

export function MainInfo({ character, style }: Props) {
  const iconColor = useThemeColor({}, "icon");

  return (
    <View style={style}>
      <View style={styles.upperContainer}>
        <View style={styles.upperContainerLeft}>
          <View style={styles.attributeBlock}>
            <Fontisto
              name="intersex"
              size={20}
              color={iconColor}
              style={{ paddingLeft: 2 }}
            />
            <ThemedText>{character.gender}</ThemedText>
          </View>
          <View style={styles.attributeBlock}>
            <MaterialCommunityIcons
              name="home-map-marker"
              size={20}
              color={iconColor}
            />
            <ThemedText>{character.origin.name}</ThemedText>
          </View>
        </View>
        <View style={styles.originWrapper}>
          <ThemedText style={[styles.text, styles.textCentered]}>
            Last Seen
          </ThemedText>
          <ThemedText style={styles.textCentered}>
            {character.location.name}
          </ThemedText>
        </View>
      </View>
      <ThemedText style={styles.text}>Played in episodes</ThemedText>
      <FlatList
        data={character.episode}
        style={{ marginTop: 3 }}
        ItemSeparatorComponent={() => <View style={{ height: 5 }} />}
        renderItem={({ item, index }) => (
          <ThemedText>
            {index + 1}. {item.name}
          </ThemedText>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  upperContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 15,
    marginBottom: 10,
  },
  originWrapper: {
    flexBasis: 150,
    flexShrink: 1,
  },
  attributeBlock: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  upperContainerLeft: {
    display: "flex",
    flexDirection: "column",
    gap: 5,
  },
  textCentered: {
    textAlign: "center",
  },
  text: {
    fontSize: 16,
    fontWeight: 600,
  },
});
