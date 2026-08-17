import AsyncStorage from "@react-native-async-storage/async-storage";
import { combineReducers, configureStore } from "@reduxjs/toolkit";

import { persistReducer, persistStore } from "redux-persist";

// import slices
import userSlice from "../profile/profileSlice";

import percentSlice from "@/redux/percent/percentSlice";
import blogsSlice from "../blogs/blogsSlice";
import dietSlice from "../diet/dietSlice";
import sleepingSlice from "../sleeping/sleepingSlice";
import workoutsSlice from "../workouts/workoutsSlice";


// combine reducers
const rootReducer = combineReducers({
    user: userSlice,
    sleeping: sleepingSlice,
    workouts: workoutsSlice,
    percent: percentSlice,
    diet: dietSlice,
    blogs: blogsSlice
});

// persist config
const persistConfig = {
    key: "root",
    storage: AsyncStorage,

    whitelist: ["user", "percent", "blogs"]
};

// persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// store
export const store = configureStore({
    reducer: persistedReducer,
});

// persistor
export const persistor = persistStore(store);