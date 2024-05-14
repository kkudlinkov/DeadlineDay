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
        updateCategory(state, action){
            const {index, updatedCategories} = action.payload;
            state.categories[index] = updatedCategories; // updating a task in the tasks array
        },
        deleteCategory(state, action){
            const index = action.payload;
            state.tasks.splice(index, 1); // deleting a task from the tasks array
        }
    }
})

export const {setCategories, addNewCategory, updateCategory, deleteCategory} = categorySlice.actions;

export default categorySlice.reducer;