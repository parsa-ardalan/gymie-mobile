import { createSlice } from "@reduxjs/toolkit";

export type ProfileState = {
    name: string;
    bio: string;
    height: number;
    weight: number;
    age: number;
    dayStreak: number;
    loggedIn: boolean;
};

const initialState: ProfileState = {
    name: "",
    bio: "",
    height: 0,
    weight: 0,
    age: 0,
    dayStreak: 0,
    loggedIn: false,
};

const userSlice = createSlice({
    name: "user",
    initialState,

    reducers: {

        updateProfile: (state, action) => {
            Object.assign(state, action.payload);
        },

        logout: (state) => {
            state.loggedIn = false;
            console.log(state.loggedIn)
        },
    },
});

export const { updateProfile, logout } = userSlice.actions;
export default userSlice.reducer;