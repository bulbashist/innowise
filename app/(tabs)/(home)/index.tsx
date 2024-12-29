import { Appearance, SafeAreaView, StyleSheet } from "react-native";
import { CharacterList, ControlView } from "@/components/home";
import { useNetInfo } from "@react-native-community/netinfo";
import { NoInternet } from "@/components/NoInternet";
import { useAppSelector } from "@/store/store";
import { useEffect } from "react";

export default function ListScreen() {
  const { offlineMode, theme } = useAppSelector((state) => state.settings);
  const netInfo = useNetInfo();

  useEffect(() => {
    Appearance.setColorScheme(theme);
  }, []);

  if (!offlineMode && !netInfo.isConnected) {
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
