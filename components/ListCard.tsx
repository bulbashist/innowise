import { StatusColor } from "@/app/(tabs)/(home)/types";
import { Character } from "@/types/Character";
import { MaterialIcons } from "@expo/vector-icons";
import { Link } from "expo-router";
import { Image, StyleSheet, Text, View } from "react-native";

type Props = {
  item: Character;
};

export function ListCard({ item }: Props) {
  return (
    <Link href={`/(details)/${item.id}`}>
      <View style={styles.item}>
        <Image width={100} height={100} source={{ uri: item.image }} />
        <View>
          <View>
            <Text>{item.name}</Text>
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
              <Text>
                {item.status} - {item.species}
              </Text>
            </View>
          </View>
          <View>
            <Text>Last known location:</Text>
            <Text>{item.location.name}</Text>
          </View>
          <View>
            <Text>First seen in:</Text>
            <Text>{item.episode[0].name}</Text>
          </View>
        </View>
      </View>
    </Link>
  );
}

const styles = StyleSheet.create({
  item: {
    display: "flex",
    flexDirection: "row",
    gap: 10,
    width: "100%",
    height: 250,
    backgroundColor: "rgb(119, 119, 121)",
    borderRadius: 10,
  },
});
