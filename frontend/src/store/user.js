import {createSlice} from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState: {
        isLoggedIn: false,
        name: null,
        role: null,
    },
    reducers: {
        setIsLoggedIn: (state, action) => {
            state.isLoggedIn = action.payload;
        },
        setRole: (state, action) => {
            state.role = action.payload.toLowerCase();
        }
    }
})

export const userActions = userSlice.actions;
export default userSlice.reducer;