import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import * as api from "../api";

export const login = createAsyncThunk(
    "auth/login",
    async ({ formValue, navigate }, { rejectWithValue }) => {
        try {
            const response = await api.login(formValue);
            navigate("/lists");
            return response.data;
        } catch (error) {
            toast.error(error.response.data.message, { autoClose: 5500});
            toast.clearWaitingQueue()
            return rejectWithValue(error.response.data); // ????
        }
    }
);

const authSlice = createSlice({
    name: "auth",
    initialState: {
        token: null,
        error: "",
        loading: false,
    },
    reducers: {
        clearToken: (state, action) => {
            document.body.classList.remove("darkTheme");
            localStorage.removeItem("_accessToken")
            state.error = "";
            state.token = ""
        },
    },
    extraReducers: {
        [login.pending]: (state, action) => {
            window.localStorage.removeItem("_accessToken");
            state.error = "";
            state.loading = true;
        },
        [login.fulfilled]: (state, action) => {
            localStorage.setItem("_accessToken", action.payload.token)
            state.token = action.payload.token;
            state.loading = false;
        },
        [login.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload.message;
        },
    }
});

export const { clearToken } = authSlice.actions;

export default authSlice.reducer;