import {createSlice} from "@reduxjs/toolkit";

const reminderSlice = createSlice({
    name: "reminderSlice",
    initialState: {
        reminders: [
        ]
    },
    reducers:{
        setReminders(state, action){
            state.reminders = action.payload; // setting tasks to the payload received
        },
        addNewReminder(state, action){
            state.reminders.push(action.payload); // adding a new task to the tasks array
        },
        updateUserReminder(state, action){
            const data = action.payload;
            const index = state.tasks.findIndex(task => task.id === data.id);

            if (index !== -1) {
                state.tasks[index] = data;
            }
        },
        deleteUserReminder(state, action){
            const index = action.payload;
            state.reminders.splice(index, 1); // deleting a task from the tasks array
        }
    }
})

export const {setReminders, addNewReminder, updateUserReminder, deleteUserReminder} = reminderSlice.actions;

export default reminderSlice.reducer;