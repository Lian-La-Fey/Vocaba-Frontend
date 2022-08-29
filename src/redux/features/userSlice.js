import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import * as api from "../api";

export const register = createAsyncThunk(
  "user/register",
  async ({ formValue, navigate }, { rejectWithValue }) => {
    try {
      const response = await api.register(formValue);
      toast.success("We send an email. To login verify your email.", {
        autoClose: 6000,
      });
      navigate("/login");
      return response.data;
    } catch (error) {
      toast.error(error.response.data.message, { autoClose: false });
      toast.clearWaitingQueue()
      return rejectWithValue(error.response.data);
    }
  }
);

export const createList = createAsyncThunk(
  "user/createList",
  async ({ id, newList, navigate }, { rejectWithValue }) => {
    try {      
      const response = await api.createList(newList, id);
      toast.success("List Created");
      navigate("/lists");
      return response.data;
    } catch (error) {
      toast.error(error.response.data.message, { autoClose: 3500 });
      toast.clearWaitingQueue()
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteList = createAsyncThunk(
  "user/deleteUserList",
  async ({ id, list, navigate }, { rejectWithValue }) => {
    try {      
      toast.success("List Deleted");
      const response = await api.deleteList(list, id);
      navigate("/lists");
      return response.data;
    } catch (error) {
      toast.error("Failed Deletion");
      toast.clearWaitingQueue()
      return rejectWithValue(error.response.data);
    }
  }
);

export const changeList = createAsyncThunk(
  "user/changeUserList",
  async ({ id, oldName, newName, navigate }, { rejectWithValue }) => {
    try {      
      const response = await api.changeList(oldName, newName, id);
      toast.success("List Changed");
      navigate("/lists");
      return response.data;
    } catch (error) {
      toast.error(error.response.data.message, { autoClose: 5500 });
      toast.clearWaitingQueue()
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateUserInfo = createAsyncThunk(
  "user/updateUserInfo",
  async ({ id, updatedUserData, navigate }, { rejectWithValue }) => {
    try {
      const response = await api.updateUserInfo(updatedUserData, id);
      toast.success("User Info Updated");
      navigate("/profile");
      return response.data;
    } catch (error) {
      toast.error(error.response.data.message, { autoClose: 3500 });
      toast.clearWaitingQueue()
      return rejectWithValue(error.response.data);
    }
  }
);

export const changePassword = createAsyncThunk(
  "user/changePassword",
  async ({ id, userPassword, navigate }, { rejectWithValue }) => {
    try {
      const response = await api.changePassword(userPassword, id);
      toast.success("User Password Changed");
      navigate("/profile");
      return response.data;
    } catch (error) {
      toast.error(error.response.data.message, { autoClose: 3000 });
      toast.clearWaitingQueue()
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteUser = createAsyncThunk(
  "user/deleteUser",
  async ({ id, navigate }, { rejectWithValue }) => {
    try {
      const response = await api.deleteUser(id);
      toast.success("You have been deleted!");
      navigate("/");
      return response.data;
    } catch (error) {
      toast.error(error.response.data.message, { autoClose: 2500 });
      toast.clearWaitingQueue()
      return rejectWithValue(error.response.data);
    }
  }
);

export const getUser = createAsyncThunk(
  "user/getUser",
  async ({ id }, { rejectWithValue }) => {
    try {
      const response = await api.getUser(id);      
      return response.data;
    } catch (error) {
      toast.error(error.response.data.message, { autoClose: 2500 });
      toast.clearWaitingQueue()
      return rejectWithValue(error.response.data);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    error: "",
    loading: false,
  },
  reducers: {
    setLogout: (state, action) => {
      state.user = null;
      state.error = "";
      state.loading = false;
    },
    setError: (state) => {
      state.error = "";
    },
  },
  extraReducers: {
    [getUser.pending]: (state, action) => {
      state.error = "";
      state.loading = true;
    },
    [getUser.fulfilled]: (state, action) => {
      state.user = action.payload;
      state.loading = false;
    },
    [getUser.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [register.pending]: (state, action) => {
      state.loading = true;
      state.error = "";
    },
    [register.fulfilled]: (state, action) => {
      state.loading = false;
      // state.user = action.payload;
    },
    [register.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [createList.pending]: (state, action) => {
      state.loading = true;
    },
    [createList.fulfilled]: (state, action) => {
      state.user = action.payload;
      state.loading = false;
    },
    [createList.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [changeList.pending]: (state, action) => {
      state.loading = true;
    },
    [changeList.fulfilled]: (state, action) => {
      state.user = action.payload;
      state.loading = false;
    },
    [changeList.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [deleteList.pending]: (state, action) => {
      state.loading = true;
    },
    [deleteList.fulfilled]: (state, action) => {
      state.user = action.payload;
      state.loading = false;
    },
    [deleteList.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [updateUserInfo.pending]: (state, action) => {
      state.loading = true;
    },
    [updateUserInfo.fulfilled]: (state, action) => {
      state.user = action.payload;
      state.loading = false;
    },
    [updateUserInfo.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [changePassword.pending]: (state, action) => {
      state.loading = true;
    },
    [changePassword.fulfilled]: (state, action) => {
      state.user = action.payload;
      state.loading = false;
    },
    [changePassword.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [deleteUser.pending]: (state, action) => {
      state.loading = true;
    },
    [deleteUser.fulfilled]: (state, action) => {
      state.user = null;
      state.loading = false;
    },
    [deleteUser.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
  },
});

export const { setUser, setLogout, setError } = userSlice.actions;

export default userSlice.reducer;
