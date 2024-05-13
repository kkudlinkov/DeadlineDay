import {combineReducers, configureStore} from '@reduxjs/toolkit';
import authSlice from "./authSlice";

const authReducer = combineReducers({
    auth: authSlice
})


const store = configureStore({
    reducer: authReducer,
});

export default store;