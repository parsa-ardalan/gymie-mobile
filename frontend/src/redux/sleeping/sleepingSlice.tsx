import { createSlice } from "@reduxjs/toolkit";


export type SleepingState = {

    _id: string;
    user_id: string;
    bedTime: string;
    wakeTime: string;
    suggestedHour: number;
    sleepDuration: number;
    createdAt: string;
    updatedAt: string;

}


const initialState: SleepingState = {

    _id: "",
    user_id: "",
    bedTime: "",
    wakeTime: "",
    suggestedHour: 7,
    sleepDuration: 0,
    createdAt: "",
    updatedAt: ""

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

        changeSuggestedTime: (state, action) => {
            state.suggestedHour = action.payload;
        },


        updateSleeping: (state, action) => {

            return {
                ...state,
                ...action.payload
            };

        },

    }

});


export const {
    changeBedTime,
    changeWakeTime,
    updateSleeping,
    changeSuggestedTime

} = sleepingSlice.actions;


export default sleepingSlice.reducer;