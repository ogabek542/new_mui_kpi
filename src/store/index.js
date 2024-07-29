import { configureStore, combineReducers } from '@reduxjs/toolkit';
import userSlice from './slices/userSlice';

const rootReducer = combineReducers({
    auth: userSlice,
});

export const store = configureStore({
    reducer: rootReducer,

});
