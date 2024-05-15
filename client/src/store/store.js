import {combineReducers, configureStore} from '@reduxjs/toolkit';
import authSlice from "./authSlice";
import taskSlice from "./taskSlice";
import categorySlice from "./categorySlice";

const rootReducer = combineReducers({
    auth: authSlice,
    userTasks: taskSlice,
    userCategories: categorySlice

})


const store = configureStore({
    reducer: rootReducer,
});

export default store;