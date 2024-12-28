import React from "react";
import { StyleSheet, View, ViewProps } from "react-native";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { useAppSelector } from "@/store/store";
import { Character } from "@/types/Character";
import { StatusColor } from "@/types/StatusColor";
import { Theme } from "@/types/Theme";

type Props = ViewProps & {
  character: Character;
};

const speciesIconMap = new Map([
  ["Alien", "alien"],
  ["Human", "human-handsdown"],
]);

export function BottomLine({ character, style }: Props) {
  const theme = useAppSelector((state) => state.settings.theme);
  const iconColor = theme === Theme.Light ? "black" : "white";

  const iconName =
    (speciesIconMap.get(character.species) as never) ?? "account-question";

  return (
    <ThemedView lightColor="#4cd8dc" darkColor="#4848bf" style={style}>
      <View style={styles.attributeBlock}>
        <ThemedText style={{ fontSize: 20 }}>{character.status}</ThemedText>
        <MaterialIcons
          name="circle"
          size={30}
          color={StatusColor[character.status]}
          style={{ marginRight: 2 }}
        />
      </View>
      <ThemedView
        lightColor="#fadf81"
        darkColor="#c86a3d"
        style={styles.speciesRound}
      >
        <MaterialCommunityIcons size={23} name={iconName} color={iconColor} />
        <ThemedText style={styles.speciesText}>{character.species}</ThemedText>
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  attributeBlock: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  speciesRound: {
    display: "flex",
    alignItems: "center",
    height: "90%",
    aspectRatio: 1,
    borderWidth: 1,
    borderRadius: "50%",
    paddingVertical: 10,
  },
  speciesText: {
    lineHeight: 12,
    fontSize: 12,
    fontWeight: 900,
  },
});