import { configureStore } from "@reduxjs/toolkit";

import userSlice from "../profile/profileSlice";
import sleepingSlice from "../sleeping/sleepingSlice";
import weekdaySlice from "../weekday/weekdaySlice";

export const store = configureStore({
    reducer: {
        user: userSlice,
        weekday: weekdaySlice,
        sleeping: sleepingSlice
    }
});
