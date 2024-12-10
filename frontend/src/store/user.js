import {createSlice} from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState: {
        isLoggedIn: false,
        role: null,
    },
    reducers: {
        setIsLoggedInTrue: (state, action) => {
            state.isLoggedIn = true;
            console.log('value is set to true')
        },
        setIsLoggedInFalse: (state, action) => {
            state.isLoggedIn = false;
        },
        setRoleAsStudent: (state, action) => {
            state.role = "Student"
        },
        setRoleAsFaculty: (state, action) => {
            state.role = "Faculty"
        },
        setRoleAsAdmin: (state, action) => {
            state.role = "Admin"
        },
    }
})

export const userActions = userSlice.actions;
export default userSlice.reducer;