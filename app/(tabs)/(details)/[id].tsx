import { useAppDispatch, useAppSelector } from "@/store/store";
import { useNetInfo } from "@react-native-community/netinfo";
import { BottomLine, MainInfo } from "@/components/details";
import { Link, useLocalSearchParams } from "expo-router";
import { fetchCharacter } from "@/store/details/slice";
import { Image, StyleSheet, View } from "react-native";
import { useThemeColor } from "@/hooks/useThemeColor";
import { MaterialIcons } from "@expo/vector-icons";
import { useEffect } from "react";
import {
  CustomIndicator,
  NoInternet,
  ThemedText,
  ThemedView,
} from "@/components";

export default function CharacterScreen() {
  const iconColor = useThemeColor({}, "icon");
  const { id } = useLocalSearchParams();
  const netInfo = useNetInfo();

  const {
    data: character,
    error,
    loading,
  } = useAppSelector((state) => state.details);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchCharacter(+id));
  }, [id]);

  if (!netInfo.isConnected || error) {
    return <NoInternet style={styles.noInternet} />;
  }

  if (loading)
    return (
      <View style={{ position: "relative", width: "100%", height: "100%" }}>
        <CustomIndicator style={styles.indicator} />
      </View>
    );

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
      <Image
        height={1000}
        style={{ maxHeight: "30%" }}
        resizeMode="contain"
        source={{ uri: character.image }}
      />
      <View style={styles.infoBlock}>
        <MainInfo character={character} style={styles.mainInfo} />
        <BottomLine character={character} style={styles.bottomLine} />
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  noInternet: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
  indicator: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexGrow: 1,
  },
  screen: {
    display: "flex",
    flexDirection: "column",
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
  infoBlock: {
    flexShrink: 1,
    position: "relative",
    height: "100%",
    paddingHorizontal: 5,
    marginTop: 10,
  },
  mainInfo: {
    flexShrink: 1,
    marginBottom: 70,
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
