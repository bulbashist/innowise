import { CharacterAPI } from "@/services/api/q/CharacterAPI";
import { Character } from "@/types/Character";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

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
      .addCase(fetchCharacter.pending, (state, action) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(fetchCharacter.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
      }),
});

export { fetchCharacter };
export default details.reducer;
