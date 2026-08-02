// services/workouts.service.ts

import axios from "axios";


const BASE_URL = "https://gymie-mobile.onrender.com";


// =====================
// Types
// =====================

type ErrorResponse = {
    success: false;
    message: string;
};


type SuccessResponse<T> = {
    success: true;
    data: T;
};


export type WorkoutsResponse =
    | SuccessResponse<any>
    | ErrorResponse;



// =====================
// GET USER WORKOUTS
// =====================

export const getWorkouts = async (
    user_id: string
): Promise<WorkoutsResponse> => {

    try {

        const res = await axios.get(
            `${BASE_URL}/workouts`,
            {
                params: {
                    user_id,
                },
            }
        );


        return {
            success: true,
            data: res.data,
        };


    } catch (error) {

        return {
            success: false,
            message: "خطا در دریافت ورک‌اوت‌ها",
        };

    }

};



// =====================
// GET SINGLE WORKOUT
// =====================

export const getWorkoutById = async (
    workoutId: string
): Promise<WorkoutsResponse> => {

    try {

        const res = await axios.get(
            `${BASE_URL}/workouts/${workoutId}`
        );


        return {
            success: true,
            data: res.data,
        };


    } catch (error) {

        return {
            success: false,
            message: "خطا در دریافت ورک‌اوت",
        };

    }

};



// =====================
// ADD EXERCISE
// =====================

export const addExerciseToDay = async (
    workoutId: string,
    dayOfWeek: number,
    exerciseId: string,
    sets: number[]
): Promise<WorkoutsResponse> => {

    try {

        const res = await axios.post(
            `${BASE_URL}/workouts/${workoutId}/day/${dayOfWeek}/exercise`,
            {
                exerciseId,
                sets,
            }
        );


        return {
            success: true,
            data: res.data,
        };


    } catch (error) {

        return {
            success: false,
            message: "خطا در افزودن حرکت",
        };

    }

};



// =====================
// TOGGLE EXERCISE
// =====================

export const toggleExercise = async (
    workoutId: string,
    dayOfWeek: number,
    index: number
): Promise<WorkoutsResponse> => {

    try {

        const res = await axios.patch(
            `${BASE_URL}/workouts/${workoutId}/day/${dayOfWeek}/exercise/${index}/toggle`
        );


        return {
            success: true,
            data: res.data,
        };


    } catch (error) {

        return {
            success: false,
            message: "خطا در تغییر وضعیت حرکت",
        };

    }

};