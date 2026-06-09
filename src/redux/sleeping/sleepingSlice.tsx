import { createSlice } from "@reduxjs/toolkit";

export type SLeepingState = {
    bedTime: string,
    wakeTime: string
}

const initialState: SLeepingState = {
    bedTime: "",
    wakeTime: ""

}

const sleepingSlice = createSlice({

    name: "sleeping",

    initialState,

    reducers: {

        changeBedTime: (state, action) => {

        },

        changeWakeTime: (state, action) => {

        }

    },
});

export const { changeBedTime, changeWakeTime } = sleepingSlice.actions;

export default sleepingSlice.reducer;
