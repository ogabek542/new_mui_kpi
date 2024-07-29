import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isAuth: false,
    token: null,
    loading: false,
    error: null,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
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
});

export const { loginStart, loginSuccess, loginFailure, logout } =
    userSlice.actions;

export default userSlice.reducer;
