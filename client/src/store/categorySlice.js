import {createSlice} from "@reduxjs/toolkit";

const categorySlice = createSlice({
    name: "categorySlice",
    initialState: {
        categories: [
        ]
    },
    reducers:{
        setCategories(state, action){
            state.categories = action.payload; // setting tasks to the payload received
        },
        addNewCategory(state, action){
            state.categories.push(action.payload); // adding a new task to the tasks array
        },
        updateUserCategory(state, action){
            const data = action.payload;
            const index = state.tasks.findIndex(task => task.id === data.id);

            if (index !== -1) {
                state.tasks[index] = data;
            }
        },
        deleteUserCategory(state, action){
            const index = action.payload;
            state.categories.splice(index, 1); // deleting a task from the tasks array
        }
    }
})

export const {setCategories, addNewCategory, updateUserCategory, deleteUserCategory} = categorySlice.actions;

export default categorySlice.reducer;