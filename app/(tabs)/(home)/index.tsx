import { useEffect } from "react";
import { Appearance, SafeAreaView, StyleSheet, View } from "react-native";
import { useNetInfo } from "@react-native-community/netinfo";
import ControlView from "@/components/ControlView";
import { useAppSelector } from "@/store/store";
import { NoInternet } from "@/components/NoInternet";
import { CharacterList } from "@/components/List";
import { Mode } from "@/types/Mode";

export default function ListScreen() {
  const mode = useAppSelector((state) => state.settings.mode);
  const netInfo = useNetInfo();

  const theme = useAppSelector((state) => state.settings.theme);

  useEffect(() => {
    Appearance.setColorScheme(theme);
  }, []);

  if (mode === Mode.Online && !netInfo.isConnected) {
    return <NoInternet style={styles.noInternet} />;
  }

  return (
    <SafeAreaView style={styles.main}>
      <ControlView />
      <CharacterList />
    </SafeAreaView>
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
  main: {
    height: "100%",
    paddingTop: 50,
  },
});
