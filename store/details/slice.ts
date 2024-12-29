import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CharacterAPI } from "@/services/api/character/CharacterAPI";
import { Character } from "@/types";

type State = {
  data: Character | null;
  loading: boolean;
  error: boolean;
};

const fetchCharacter = createAsyncThunk(
  "fetch-character",
  async (id: number) => {
    return CharacterAPI.getOne(id);
  }
);

const details = createSlice({
  initialState: {
    data: null,
    loading: false,
    error: false,
  } as State,
  name: "details",
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(
        fetchCharacter.fulfilled,
        (state, action: PayloadAction<Character>) => {
          state.data = action.payload;
          state.loading = false;
          state.error = false;
        }
      )
      .addCase(fetchCharacter.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(fetchCharacter.rejected, (state) => {
        state.loading = false;
        state.error = true;
      }),
});

export { fetchCharacter };
export default details.reducer;
