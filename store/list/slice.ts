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
  loading: boolean;
  error: boolean;
};

const fetchFirstItems = createAsyncThunk(
  "fetch-list-1",
  async ({ page, filter }: { page: number; filter: Filter }) => {
    // return CharacterAPI.getMockedOnes();
    return CharacterAPI.getMany(page, filter);
  }
);

const fetchList = createAsyncThunk(
  "fetch-list",
  async ({ page, filter }: { page: number; filter: Filter }) => {
    // return CharacterAPI.getMockedOnes();
    console.log(page);
    // return Promise.reject();
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
    loading: false,
    error: false,
  } as State,
  name: "list",
  reducers: {
    changeFilter: (state: State, action: PayloadAction<Partial<Filter>>) => {
      state.filter = { ...state.filter, ...action.payload };
      state.page = 1;
      state.data = [];
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(
        fetchFirstItems.fulfilled,
        (state, action: PayloadAction<Character[]>) => {
          state.data = action.payload;
          state.loading = false;
          state.error = false;
          state.page += 1;
        }
      )
      .addCase(fetchFirstItems.pending, (state, action) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(fetchFirstItems.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
      })
      .addCase(
        fetchList.fulfilled,
        (state, action: PayloadAction<Character[]>) => {
          state.data = state.data.concat(action.payload);
          state.loading = false;
          state.error = false;
          state.page += 1;
        }
      )
      .addCase(fetchList.pending, (state, action) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(fetchList.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
      }),
});

export { fetchList, fetchFirstItems };
export const { changeFilter } = list.actions;
export default list.reducer;
