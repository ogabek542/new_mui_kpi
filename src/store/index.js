import { configureStore, combineReducers } from '@reduxjs/toolkit';
import userSlice from "./slice/userSlice";

const rootReducer = combineReducers({
    auth: userSlice,
});

export const store = configureStore({
    reducer: rootReducer,
});