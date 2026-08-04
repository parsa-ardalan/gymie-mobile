import { createSlice } from "@reduxjs/toolkit";

const percentSlice = createSlice({

    name: "percent",

    initialState: [
        {
            day: 0,
            percentage: 0
        },
        {
            day: 1,
            percentage: 0
        },
        {
            day: 2,
            percentage: 0
        },
        {
            day: 3,
            percentage: 0
        },
        {
            day: 4,
            percentage: 0
        },
        {
            day: 5,
            percentage: 0
        },
        {
            day: 6,
            percentage: 0
        },
    ],

    reducers: {

        addPercent: (state, action) => {

            const dayItem = state.find(item => item.day == action.payload.day);

            if (dayItem) {
                dayItem.percentage = action.payload.percentNumber;
            }

        }
    },

});

export const { addPercent } = percentSlice.actions;

export default percentSlice.reducer;