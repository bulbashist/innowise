import { fetchCharacter } from "@/store/details/slice";
import { useAppDispatch, useAppSelector } from "@/store/store";
import {
  Fontisto,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { Link, useLocalSearchParams } from "expo-router";
import { useEffect } from "react";
import { FlatList, Image, StyleSheet, Text, View } from "react-native";
import { StatusColor } from "../(home)/types";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useNetInfo } from "@react-native-community/netinfo";
import { NoInternet } from "@/components/NoInternet";
import { Theme } from "@/types/Theme";

const speciesIconMap = new Map([
  ["Alien", "alien"],
  ["Human", "human-handsdown"],
]);

export default function CharacterScreen() {
  const { id } = useLocalSearchParams();
  const netInfo = useNetInfo();

  const character = useAppSelector((state) => state.details.data);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchCharacter(+id));
  }, [id]);

  const theme = useAppSelector((state) => state.settings.theme);
  const iconColor = theme === Theme.Light ? "black" : "white";

  if (!netInfo.isConnected) {
    return <NoInternet />;
  }

  if (!character) return null;

  return (
    <ThemedView darkColor="#363534" lightColor="#89ec8e" style={styles.screen}>
      <ThemedView
        lightColor="#4cd8dc"
        darkColor="#4848bf"
        style={styles.header}
      >
        <Link href="/">
          <MaterialIcons name="arrow-back" size={24} color={iconColor} />
        </Link>
        <ThemedText style={styles.headline}>{character.name}</ThemedText>
      </ThemedView>
      <Image height={400} source={{ uri: character.image }} />
      <View
        style={{
          flex: 1,
          position: "relative",
          paddingHorizontal: 5,
          marginTop: 10,
        }}
      >
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            gap: 15,
          }}
        >
          <View style={{ display: "flex", flexDirection: "column", gap: 5 }}>
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
          <View style={{ flexBasis: 150, flexShrink: 1 }}>
            <ThemedText
              style={{
                textAlign: "center",
                fontWeight: 600,
                fontSize: 16,
              }}
            >
              Last Seen
            </ThemedText>
            <ThemedText style={{ textAlign: "center" }}>
              {character.location.name}
            </ThemedText>
          </View>
        </View>
        <ThemedText
          style={{
            marginTop: 10,
            marginBottom: 3,
            fontSize: 16,
            fontWeight: 600,
          }}
        >
          Played in episodes
        </ThemedText>
        <FlatList
          data={character.episode}
          style={{ marginBottom: 70 }}
          ItemSeparatorComponent={() => <View style={{ height: 5 }} />}
          renderItem={({ item, index }) => (
            <ThemedText>
              {index + 1}. {item}
            </ThemedText>
          )}
        />
        <ThemedView
          lightColor="#4cd8dc"
          darkColor="#4848bf"
          style={styles.bottomLine}
        >
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
            style={{
              display: "flex",
              // backgroundColor: "#fadf81",
              alignItems: "center",
              borderWidth: 1,
              borderRadius: "50%",
              paddingVertical: 10,
              aspectRatio: 1,
              height: "90%",
            }}
          >
            <MaterialCommunityIcons
              size={23}
              name={speciesIconMap.get(character.species) as never}
              color={iconColor}
            />
            <ThemedText style={{ fontSize: 12, fontWeight: 900 }}>
              {character.species}
            </ThemedText>
          </ThemedView>
        </ThemedView>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  screen: {
    height: "100%",
  },
  header: {
    width: "100%",
    paddingTop: 50,
    paddingHorizontal: 25,
    paddingRight: 50,
    paddingBottom: 10,
    display: "flex",
    flexDirection: "row",
    alignItems: "stretch",
  },
  headline: {
    flexGrow: 1,
    fontSize: 28,
    fontWeight: 700,
    lineHeight: 28,
    textAlign: "center",
  },
  attributeBlock: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  bottomLine: {
    position: "absolute",
    right: 0,
    bottom: 0,
    left: 0,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 70,
    paddingHorizontal: 10,
  },
});
