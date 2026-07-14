import { createSlice } from "@reduxjs/toolkit";

const weekdaySlice = createSlice({

    name: "weekday",

    initialState: [
        {
            id: 0,
            name: "شنبه",
            planfilename: "sat",
            type: "workday",
            activityPercent: 0.1
        },
        {
            id: 1,
            name: "یکشنبه",
            planfilename: "sun",
            type: "workday",
            activityPercent: 0.1
        },
        {
            id: 2,
            name: "دوشنبه",
            planfilename: "mon",
            type: "recovery",
            activityPercent: 0.1
        },
        {
            id: 3,
            name: "سه شنبه",
            planfilename: "tue",
            type: "workday",
            activityPercent: 0.1
        },
        {
            id: 4,
            name: "چهارشنبه",
            planfilename: "wed",
            type: "recovery",
            activityPercent: 0.1
        },
        {
            id: 5,
            name: "پنجشنبه",
            planfilename: "thu",
            type: "workday",
            activityPercent: 0.1
        },
        {
            id: 6,
            name: "جمعه",
            planfilename: "fri",
            type: "recovery",
            activityPercent: 0.1
        }
    ],

    reducers: {

        updateWeekDayPercent: (state, action) => {

            const day: any = state.find((day: any) => day.name == action.payload.dayname)

            day.activityPercent = action.payload.dayPercent

        },

        setRecoveryDay: (state, action) => {

        }
    },
});

export const { updateWeekDayPercent } = weekdaySlice.actions;

export default weekdaySlice.reducer;
