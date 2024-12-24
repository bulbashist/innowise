import { CharacterAPI } from "@/services/api/q/CharacterAPI";
import { Character } from "@/types/Character";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { act } from "react";

type State = {
  page: number;
  data: Character[];
};

const fetchList = createAsyncThunk("fetch-list", async (page: number) => {
  return CharacterAPI.getMockedOnes();
});

const list = createSlice({
  initialState: {
    page: 1,
    data: [],
  } as State,
  name: "list",
  reducers: {
    changePage: (state: State, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
  },
  extraReducers: (builder) =>
    builder.addCase(
      fetchList.fulfilled,
      (state, action: PayloadAction<Character[]>) => {
        state.data = action.payload;
        // state.data = state.data.concat(action.payload);
      }
    ),
});

export { fetchList };
export const { changePage } = list.actions;
export default list.reducer;
