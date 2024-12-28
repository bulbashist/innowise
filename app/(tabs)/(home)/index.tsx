import { useEffect } from "react";
import { Appearance, SafeAreaView, StyleSheet } from "react-native";
import { useNetInfo } from "@react-native-community/netinfo";
import ControlView from "@/components/ControlView";
import { useAppSelector } from "@/store/store";
import { NoInternet } from "@/components/NoInternet";
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
