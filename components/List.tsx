import { Character } from "@/types/Character";
import { ActivityIndicator, FlatList, Text, View } from "react-native";
import { ListCard } from "./ListCard";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { useEffect, useRef, useState } from "react";
import { fetchPage } from "@/store/list/slice";
import React from "react";
import { CustomIndicator } from "./CustomIndicator";

type Props = {
  loading: boolean;
  error: boolean;
  data: Character[];
};

export function CharacterList() {
  const { page, data, filter, error, loading } = useAppSelector(
    (state) => state.list
  );

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchPage({ page, filter, first: true }));
  }, [filter]);

  const uploadPage = () => {
    if (!loading) {
      dispatch(fetchPage({ page, filter }));
    }
  };

  //change name later
  const t = useRef(false);

  if (!data.length && loading) {
    return (
      <View style={{ position: "relative", width: "100%", height: "100%" }}>
        <View
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexGrow: 1,
          }}
        >
          <CustomIndicator />
        </View>
      </View>
    );
  }

  if (!data.length && error) {
    return (
      <View style={{ position: "absolute", top: "50%", left: "50%" }}>
        <Text>Unable to load data</Text>
      </View>
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
          if (t.current) {
            t.current = false;
            uploadPage();
          }
        }}
        onEndReached={() => (t.current = true)}
        ListFooterComponent={
          loading ? (
            <View
              style={{
                display: "flex",
                alignItems: "center",
                paddingVertical: 10,
              }}
            >
              <CustomIndicator />
            </View>
          ) : null
        }
        keyExtractor={(item, index) => item.id}
        renderItem={({ item }) => <ListCard item={item} />}
      />
      {error ? (
        <View
          style={{
            height: 50,
            width: "100%",
            position: "absolute",
            backgroundColor: "rgba(255, 0, 0, 0.5)",
            bottom: 0,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text>Data can't be loaded</Text>
          <Text>Try again later</Text>
        </View>
      ) : null}
    </>
  );
}
