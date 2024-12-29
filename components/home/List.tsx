import { FlatList, StyleSheet, Text, View } from "react-native";
import { CustomIndicator } from "@/components/CustomIndicator";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { ThemedView, ThemedText } from "@/components";
import { fetchPage } from "@/store/list/slice";
import { useEffect, useRef } from "react";
import { ListCard } from "./ListCard";
import React from "react";

export function CharacterList() {
  const { page, data, filter, error, loading } = useAppSelector(
    (state) => state.list
  );

  const dispatch = useAppDispatch();
  const lock = useRef(false);

  useEffect(() => {
    if (page) {
      dispatch(fetchPage({ page, filter, first: true }));
    }
  }, [filter]);

  const uploadPage = () => {
    if (!loading && page) {
      dispatch(fetchPage({ page, filter }));
    }
  };

  if (!data.length && loading) {
    return (
      <ThemedView style={styles.alert}>
        <CustomIndicator style={styles.indicator} />
      </ThemedView>
    );
  }

  if (!data.length && error) {
    return (
      <ThemedView style={styles.alert}>
        <ThemedText style={styles.textError}>Unable to load data</ThemedText>
      </ThemedView>
    );
  }

  return (
    <>
      <FlatList
        data={data}
        style={{ paddingHorizontal: 20 }}
        ItemSeparatorComponent={() => <View style={{ height: 20 }} />}
        onEndReachedThreshold={1000}
        onMomentumScrollEnd={() => {
          if (lock.current) {
            lock.current = false;
            uploadPage();
          }
        }}
        onEndReached={() => (lock.current = true)}
        ListFooterComponent={
          loading ? <CustomIndicator style={styles.listIndicator} /> : null
        }
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ListCard item={item} />}
      />
      {error ? (
        <View style={styles.error}>
          <Text>Data can't be loaded</Text>
          <Text>Try again later</Text>
        </View>
      ) : null}
    </>
  );
}

const styles = StyleSheet.create({
  alert: {
    position: "relative",
    width: "100%",
    height: "100%",
  },
  indicator: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexGrow: 1,
  },
  textError: {
    marginTop: 100,
    textAlign: "center",
    fontSize: 18,
    fontWeight: 600,
  },
  listIndicator: {
    display: "flex",
    alignItems: "center",
    paddingVertical: 10,
  },
  error: {
    height: 50,
    width: "100%",
    position: "absolute",
    backgroundColor: "rgba(255, 0, 0, 0.5)",
    bottom: 0,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
});
