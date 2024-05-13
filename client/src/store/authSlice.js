import {createSlice} from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: "authSlice",
    initialState: {
        isAuth: false,
        user: null // assuming user is an object
    },
    reducers:{
        setIsAuth(state, action){
            state.isAuth = action.payload; // setting isAuth to the payload received
        },
        setUser(state, action){
            state.user = action.payload; // setting user to the payload received
        }
    }
})

export const {setIsAuth, setUser} = authSlice.actions;

export default authSlice.reducer;