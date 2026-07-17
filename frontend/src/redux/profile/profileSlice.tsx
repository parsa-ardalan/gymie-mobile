import { createSlice } from "@reduxjs/toolkit";

export type ProfileState = {
    _id: string;
    name: string;
    bio: string;
    height: number;
    weight: number;
    age: number;
    phone: string;
    dayStreak: number;
    loggedIn: boolean;
};

const initialState: ProfileState = {
    _id: "",
    name: "",
    bio: "",
    height: 0,
    weight: 0,
    age: 0,
    phone: "",
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
            state._id = "";
        },
    },
});

export const { updateProfile, logout } = userSlice.actions;
export default userSlice.reducer;