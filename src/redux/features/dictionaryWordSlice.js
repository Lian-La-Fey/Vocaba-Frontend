import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import axios from "axios";

const API_URL = "https://api.dictionaryapi.dev/api/v2/entries/en";

export const getWords = createAsyncThunk(
  "dictionaryWord/getWord",
  async ({ wordName, navigate }, { rejectWithValue }) => {
    try {
      const response = await axios.get(API_URL + `/${wordName}`);
      navigate("/");
      return response.data;
    } catch (error) {
      toast.warning("Sorry, no words found");
      toast.clearWaitingQueue()
      return rejectWithValue(error.response.data);
    }
  }
);

const dictionaryWordSlice = createSlice({
  name: "word",
  initialState: {
    word: null,
    addedWord: {},
    words: [],
    error: "",
    loading: false,
  },
  reducers: {
    setWord: (state, action) => {
      state.word = state.words[action.payload];
    },
    setWordMeaningDefinition: (state, action) => {
      state.addedWord = action.payload;
    },
    setEmpty: (state, action) => {
      state.word = null;
      state.addedWord = {};
      state.words = [];
    },
  },
  extraReducers: {
    [getWords.pending]: (state, action) => {
      state.loading = true;
    },
    [getWords.fulfilled]: (state, action) => {
      state.loading = false;
      state.words = action.payload;
      state.word = action.payload[0];
      state.addedWord = { word: action.payload[0].word };
    },
    [getWords.rejected]: (state, action) => {
      state.loading = false;
      state.error = action?.payload?.message;
    },
  },
});

export const { setWord, setWordMeaningDefinition, setEmpty } =
  dictionaryWordSlice.actions;

export default dictionaryWordSlice.reducer;
