import { CharacterAPI } from "@/services/api/q/CharacterAPI";
import { Character } from "@/types/Character";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

export type Filter = {
  status: string;
  species: string;
};

type State = {
  page: number;
  data: Character[];
  filter: Filter;
};

const fetchList = createAsyncThunk(
  "fetch-list",
  async ({ page, filter }: { page: number; filter: Filter }) => {
    // return CharacterAPI.getMockedOnes();
    return CharacterAPI.getMany(page, filter);
  }
);

const list = createSlice({
  initialState: {
    page: 1,
    data: [],
    filter: {
      status: "",
      species: "",
    },
  } as State,
  name: "list",
  reducers: {
    changePage: (state: State, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
    changeFilter: (state: State, action: PayloadAction<Partial<Filter>>) => {
      state.filter = { ...state.filter, ...action.payload };
      state.page = 1;
      state.data = [];
    },
  },
  extraReducers: (builder) =>
    builder.addCase(
      fetchList.fulfilled,
      (state, action: PayloadAction<Character[]>) => {
        state.data = state.data.concat(action.payload);
      }
    ),
});

export { fetchList };
export const { changePage, changeFilter } = list.actions;
export default list.reducer;
