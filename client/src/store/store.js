import {combineReducers, configureStore} from '@reduxjs/toolkit';
import authSlice from "./authSlice";
import taskSlice from "./taskSlice";
import categorySlice from "./categorySlice";
import remindersSlice from "./remindersSlice";

const rootReducer = combineReducers({
    auth: authSlice,
    userTasks: taskSlice,
    userCategories: categorySlice,
    userReminders: remindersSlice

})


const store = configureStore({
    reducer: rootReducer,
});

export default store;