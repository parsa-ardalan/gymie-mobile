import AsyncStorage from "@react-native-async-storage/async-storage";
import { combineReducers, configureStore } from "@reduxjs/toolkit";

import { persistReducer, persistStore } from "redux-persist";

import userSlice from "../profile/profileSlice";
import sleepingSlice from "../sleeping/sleepingSlice";
import weekdaySlice from "../weekday/weekdaySlice";

// combine reducers

const rootReducer = combineReducers({
    user: userSlice,
    weekday: weekdaySlice,
    sleeping: sleepingSlice,
});

// persist config

const persistConfig = {
    key: "root",
    storage: AsyncStorage,

    whitelist: ["sleeping", "user", "weekday"],
};

// persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// store
export const store = configureStore({
    reducer: persistedReducer,
});

// persistor
export const persistor = persistStore(store);