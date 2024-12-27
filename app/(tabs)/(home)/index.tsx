import { CharacterAPI } from "@/services/api/q/CharacterAPI";
import { Character } from "@/types/Character";
import { MaterialIcons } from "@expo/vector-icons";
import { Link, Stack } from "expo-router";
import { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Appearance,
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from "react-native";
import { StatusColor } from "./types";
import ControlView from "@/components/ControlView";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { fetchFirstItems, fetchList } from "@/store/list/slice";
import { useNetInfo } from "@react-native-community/netinfo";
import { NoInternet } from "@/components/NoInternet";
import { ListCard } from "@/components/ListCard";
import { CharacterList } from "@/components/List";

export default function ListScreen() {
  const mode = useAppSelector((state) => state.settings.mode);
  const netInfo = useNetInfo();

  const theme = useAppSelector((state) => state.settings.theme);

  useEffect(() => {
    Appearance.setColorScheme(theme);
  }, []);

  if (mode === "online" && !netInfo.isConnected) {
    return <NoInternet />;
  }

  return (
    <SafeAreaView style={styles.main}>
      <ControlView />
      <CharacterList />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  main: {
    height: "100%",
    paddingTop: 50,
  },
});
