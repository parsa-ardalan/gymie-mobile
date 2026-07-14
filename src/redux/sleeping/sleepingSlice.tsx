import { createSlice } from "@reduxjs/toolkit";

export type SLeepingState = {
    offeredSleepingHour: number,
    userSleepingHour: number
    bedTime: string,
    wakeTime: string
}

const initialState: SLeepingState = {
    offeredSleepingHour: 0,
    bedTime: "23:00",
    wakeTime: "07:00",
    userSleepingHour: 0,
}

const sleepingSlice = createSlice({
    name: "sleeping",
    initialState,
    reducers: {

        changeBedTime: (state, action) => {
            state.bedTime = action.payload;
        },

        changeWakeTime: (state, action) => {
            state.wakeTime = action.payload;
        },

        setSleepingHour: (state, action) => {
            state.offeredSleepingHour = action.payload;
        },

        setUserSleepingHour: (state, action) => {
            state.userSleepingHour = action.payload;
            console.log(action.payload)
        }
    },
});

export const { changeBedTime, changeWakeTime, setSleepingHour, setUserSleepingHour } = sleepingSlice.actions;

export default sleepingSlice.reducer;