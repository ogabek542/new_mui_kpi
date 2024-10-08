// src/store/slice/userSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { REQUESTS } from '../../api/requests'; // Adjust the path if necessary

const initialState = {
  isAuth: false,
  token: null,
  loading: false,
  error: null,
};

// Async thunk for logging in
export const login = createAsyncThunk(
  'user/login',
  async (credentials, thunkAPI) => {
    try {
      const response = await REQUESTS.auth.login(credentials);
      const { token } = response.data;

      // Store the token in localStorage
      localStorage.setItem('token', token);

      return token;
    } catch (error) {
      // Handle errors
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Async thunk for logging out
export const logoutUser = createAsyncThunk(
  'user/logout',
  async (_, thunkAPI) => {
    try {
      await REQUESTS.auth.logout();
      localStorage.removeItem('token');
      return;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // Synchronous actions (if needed elsewhere)
    loginStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.isAuth = true;
      state.token = action.payload;
    },
    loginFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    logout: (state) => {
      state.isAuth = false;
      state.token = null;
    },
  },
  extraReducers: (builder) => {
    // Handle login actions
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuth = true;
        state.token = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Handle logout actions
    builder
      .addCase(logoutUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.loading = false;
        state.isAuth = false;
        state.token = null;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { loginStart, loginSuccess, loginFailure, logout } = userSlice.actions;

export default userSlice.reducer;
