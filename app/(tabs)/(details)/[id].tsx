import { fetchCharacter } from "@/store/details/slice";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { MaterialIcons } from "@expo/vector-icons";
import { Link, useLocalSearchParams } from "expo-router";
import { useEffect } from "react";
import { Image, StyleSheet, Text, View } from "react-native";

export default function CharacterScreen() {
  const { id } = useLocalSearchParams();

  const character = useAppSelector((state) => state.details.data);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchCharacter(+id));
  }, []);

  if (!character) return null;

  return (
    <View>
      <View style={styles.header}>
        <Link href="/">
          <View
            style={{
              borderRadius: "50%",
              borderWidth: 2,
              borderColor: "gray",
            }}
          >
            <MaterialIcons name="arrow-back" size={28} />
          </View>
        </Link>
        <Text style={{ flexGrow: 1, textAlign: "center", fontSize: 28 }}>
          {character.name}
        </Text>
      </View>
      <View>
        <Image height={400} source={{ uri: character.image }} />
        <Text>{character.location.name}</Text>
        <Text>{character.gender}</Text>
        <Text>{character.origin.name}</Text>
        <Text>{character.species}</Text>
        <Text>{character.status}</Text>
        <Text>{character.type}</Text>
        <Text>{character.episode[0]}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    width: "100%",
    paddingTop: 50,
    paddingHorizontal: 25,
    paddingRight: 50,
    paddingBottom: 10,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
});
