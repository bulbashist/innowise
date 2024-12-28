import { CharacterAPI } from "@/services/api/q/CharacterAPI";
import { Character } from "@/types/Character";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import NetInfo from "@react-native-community/netinfo";

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

type FetchPageArgs = {
  page: number;
  filter: Filter;
  first?: boolean;
};

const fetchPage = createAsyncThunk(
  "fetch-page",
  async ({ page, filter, first }: FetchPageArgs) => {
    const isConnected = await NetInfo.fetch().then((res) => res.isConnected);
    if (isConnected) {
      return CharacterAPI.getMany(page, filter).then((res) => ({
        data: res,
        first,
      }));
    } else {
      return CharacterAPI.getMockedOnes().then((res) => ({
        data: res,
        first,
      }));
    }
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
      .addCase(fetchPage.fulfilled, (state, action) => {
        if (action.payload.first) {
          state.data = action.payload.data;
        } else {
          state.data = state.data.concat(action.payload.data);
        }
        state.loading = false;
        state.error = false;
        state.page += 1;
      })
      .addCase(fetchPage.pending, (state, action) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(fetchPage.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
      }),
});

export { fetchPage };
export const { changeFilter } = list.actions;
export default list.reducer;
