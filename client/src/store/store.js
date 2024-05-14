import {combineReducers, configureStore} from '@reduxjs/toolkit';
import authSlice from "./authSlice";
import taskSlice from "./taskSlice";

const rootReducer = combineReducers({
    auth: authSlice,
    userTasks: taskSlice
})


const store = configureStore({
    reducer: rootReducer,
});

export default store;