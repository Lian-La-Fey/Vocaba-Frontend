import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import * as api from "../api";

export const getWord = createAsyncThunk(
    "word/getWord",
    async ({id}, { rejectWithValue }) => {
        try {            
            const response = await api.getWord(id);
            return response.data.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const createWord = createAsyncThunk(
    "word/createWord",
    async ({ updatedWordData, userId, navigate }, { rejectWithValue }) => {
        try {
            const response = await api.createWord(updatedWordData, userId);
            toast.success("Word Added Successfully");
            navigate(`/word/${response.data._id}`);
            return response.data;
        } catch (error) {
            toast.error(error.response.data.message, {
                autoClose: 3000,
                position: "bottom-center"
            })
            toast.clearWaitingQueue()
            return rejectWithValue(error.response.data);
        }
    }
);

export const updateWord = createAsyncThunk(
    "word/updateWord",
    async ({ id, updatedWordData, navigate }, { rejectWithValue }) => {
        try {
            const { __v,  _id, ...rest } = updatedWordData
            const response = await api.updateWord(rest, id);
            navigate(`/word/${updatedWordData._id}`);
            toast.success("Word Updated Successfully");
            return response.data;
        } catch (error) {
            toast.error(error.response.data.message, {
                autoClose: 3000,
                position: "bottom-center"
            })
            toast.clearWaitingQueue()
            return rejectWithValue(error.response.data);
        }
    }
);

export const deleteWord = createAsyncThunk(
    "word/deleteWord",
    async ({ id, navigate }, { rejectWithValue }) => {
        try {
            const response = await api.deleteWord(id);
            toast.success("Word Deleted Successfully");
            navigate("/profile")
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const getWords = createAsyncThunk(
    "word/getWords",
    async ( { userId }, { rejectWithValue } ) => {
        try {
            const response = await api.getWords(userId)            
            return response.data;
        } catch (error) {
            toast.error(error.response.data.message)
            toast.clearWaitingQueue()
            return rejectWithValue(error.response.data)
        }
    }
)

export const getWordsByList = createAsyncThunk(
    "word/getWordsByList",
    async ( { list }, { rejectWithValue } ) => {
        try {            
            const response = await api.getWordsByList(list)
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)

const wordSlice = createSlice({
    name: "word",
    initialState: {
        word: null,
        words: [],
        listWords: [],
        error: "",
        loading: false,
    },
    reducers: {
        setListWords: (state, action) => {
            state.listWords = action.payload
        },
        setInitial: (state, action) => {
            state.word = null
            state.words = []
            state.listWords = []
        },
        setWord: (state, action) => {
            state.word = action.payload
        }
    },
    extraReducers: {
        [getWord.pending]: (state, action) => {
            state.loading = true;
        },
        [getWord.fulfilled]: (state, action) => {
            state.word = action.payload;
            state.loading = false;
        },
        [getWord.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload.message;
        },
        [createWord.pending]: (state, action) => {
            state.loading = true;
        },
        [createWord.fulfilled]: (state, action) => {
            state.loading = false;
            state.word = action.payload
            state.words = [ ...state.words, action.payload];
        },
        [createWord.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload.message;
        },
        [updateWord.pending]: (state, action) => {
            state.loading = true;
        },
        [updateWord.fulfilled]: (state, action) => {
            state.loading = false;
            state.word = action.payload
            const { arg: { id } } = action.meta;
            if (id) {
                state.words = state.words.map((item) => item._id === id ? action.payload : item );
                state.listWords = state.words.map((item) => item._id === id ? action.payload : item );
            }
        },
        [updateWord.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload.message;
        },
        [deleteWord.pending]: (state, action) => {
            state.loading = true;
        },
        [deleteWord.fulfilled]: (state, action) => {
            state.loading = false;
            const { arg: { id } } = action.meta;
            if (id) {
                state.words = state.words.filter((item) => item._id !== id );
                state.listWords = state.listWords.filter((item) => item._id !== id );
            }
        },
        [deleteWord.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload.message;
        },
        [getWords.pending]: (state, action) => {
            state.loading = true;
        },
        [getWords.fulfilled]: (state, action) => {
            state.words = [...action.payload]
            state.loading = false;
        },
        [getWords.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload.message;
        },
        [getWordsByList.pending]: (state, action) => {
            state.loading = true;
        },
        [getWordsByList.fulfilled]: (state, action) => {
            state.loading = false;
            state.listWords = action.payload
        },
        [getWordsByList.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload.message;
        },
    },
});

export const { setListWords, setInitial, setWord } = wordSlice.actions;

export default wordSlice.reducer;
