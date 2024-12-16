import {createSlice} from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState: {
        isLoggedIn: false,
        name: null,
        role: null,
        userId: null,
    },
    reducers: {
        setIsLoggedIn: (state, action) => {
            state.isLoggedIn = action.payload;
        },
        setRole: (state, action) => {
            state.role = action.payload.toLowerCase();
        },
        setUserId: (state, action) => {
            state.userId = Number(action.payload);
        },
        setName: (state, action) => {
            state.name = action.payload;
        }
    }
})

export const userActions = userSlice.actions;
export default userSlice.reducer;