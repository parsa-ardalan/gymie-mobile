import { createSlice, PayloadAction } from "@reduxjs/toolkit";

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
    name: "پارسا اردلان",
    bio: "بدنسازی، کیک بوکسینگ رو دوست دارم. تمرین کردن صبح ها یه حس دیگه ای داره",
    height: 175,
    weight: 57,
    age: 19,
    dayStreak: 31,
    loggedIn: false,
};

const userSlice = createSlice({

    name: "user",

    initialState,

    reducers: {

        add: (state, action) => {

        },

        updateProfile: (state, action) => {

        },

        logout: (state) => {
            state.loggedIn = false;
        },
    },
});

export const { add, updateProfile, logout } = userSlice.actions;

export default userSlice.reducer;
