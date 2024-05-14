import {createSlice} from "@reduxjs/toolkit";

const taskSlice = createSlice({
    name: "taskSlice",
    initialState: {
        tasks: [

        ]
    },
    reducers:{
        setTasks(state, action){
            state.tasks = action.payload; // setting tasks to the payload received
        },
        addNewTask(state, action){
            state.tasks.push(action.payload); // adding a new task to the tasks array
        },
        updateTask(state, action){
            const data = action.payload;
            const index = state.tasks.findIndex(task => task.id === data.id);

            if (index !== -1) {
                state.tasks[index] = data;
            }
        },
        deleteUserTask(state, action){
            const index = action.payload;
            state.tasks.splice(index, 1); // deleting a task from the tasks array
        }
    }
})

export const {setTasks, addNewTask, updateTask, deleteUserTask} = taskSlice.actions;

export default taskSlice.reducer;