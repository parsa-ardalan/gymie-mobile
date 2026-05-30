import { configureStore } from "@reduxjs/toolkit";

import userSlice from "../profile/profileSlice";
import weekdaySlice from "../weekday/weekdaySlice";

export const store = configureStore({
    reducer: {
        user: userSlice,
        weekday: weekdaySlice
    }
});
