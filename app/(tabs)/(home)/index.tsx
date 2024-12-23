import { CharacterAPI } from "@/services/api/q/CharacterAPI";
import { Character } from "@/types/Character";
import { MaterialIcons } from "@expo/vector-icons";
import { Link, Stack } from "expo-router";
import { useEffect, useRef, useState } from "react";
import {
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
import { changePage, fetchList } from "@/store/list/slice";

export default function ListScreen() {
  const { page, data } = useAppSelector((state) => state.list);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchList(page));
  }, []);

  const uploadPage = () => {
    dispatch(fetchList(page));
    dispatch(changePage(page + 1));
  };

  return (
    <SafeAreaView style={styles.main}>
      <ControlView />
      <FlatList
        data={data}
        ItemSeparatorComponent={() => <View style={{ height: 20 }} />}
        onEndReachedThreshold={1000}
        onEndReached={uploadPage}
        renderItem={({ item }) => (
          <Link href="/(details)/1">
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
                  <Text>{item.episode[0]}</Text>
                </View>
              </View>
            </View>
          </Link>
        )}
        keyExtractor={(item) => item.id.toString()}
      ></FlatList>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  main: {
    paddingHorizontal: 20,
    paddingTop: 50,
  },
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
