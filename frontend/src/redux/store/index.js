import AsyncStorage from "@react-native-async-storage/async-storage";
import { combineReducers, configureStore } from "@reduxjs/toolkit";

import { persistReducer, persistStore } from "redux-persist";

// import slices
import userSlice from "../profile/profileSlice";

import dietSlice from "../diet/dietSlice";
import sleepingSlice from "../sleeping/sleepingSlice";
import workoutsSlice from "../workouts/workoutsSlice";


// combine reducers
const rootReducer = combineReducers({
    user: userSlice,
    sleeping: sleepingSlice,
    workouts: workoutsSlice,
    diet: dietSlice
});

// persist config
const persistConfig = {
    key: "root",
    storage: AsyncStorage,

    whitelist: ["sleeping", "user", "workouts", "diet"]
};

// persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// store
export const store = configureStore({
    reducer: persistedReducer,
});

// persistor
export const persistor = persistStore(store);