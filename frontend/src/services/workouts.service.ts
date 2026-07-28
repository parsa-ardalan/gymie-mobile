import axios from "axios";

const BASE_URL = "https://gymie-mobile.onrender.com";

type ErrorResponse = {
    success: false;
    message: string;
};

type GetWorkoutsSuccess = {
    success: true;
    data: any;
};

export type GetWorkoutsResponse =
    | GetWorkoutsSuccess
    | ErrorResponse;

// 📥 گرفتن ورک‌اوت‌ها
export const getWorkouts = async (): Promise<GetWorkoutsResponse> => {
    try {
        const res = await axios.get(`${BASE_URL}/workouts`);

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


// ➕ اضافه کردن حرکت جدید
type AddExerciseSuccess = {
    success: true;
};

export type AddExerciseResponse =
    | AddExerciseSuccess
    | ErrorResponse;

export const addExerciseToDay = async (
    workoutId: string,
    day: string,
    exerciseId: string,
    sets: number[]
): Promise<AddExerciseResponse> => {
    try {
        await axios.post(
            `${BASE_URL}/workouts/${workoutId}/day/${day}/exercise`,
            {
                exerciseId,
                sets,
            }
        );

        return { success: true };
    } catch (error) {
        return {
            success: false,
            message: "خطا در افزودن حرکت",
        };
    }
};