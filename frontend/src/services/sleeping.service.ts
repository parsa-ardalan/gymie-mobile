// services/sleeping.service.ts

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


export type SleepingResponse =
    | SuccessResponse<any>
    | ErrorResponse;




// =====================
// GET USER SLEEPING
// =====================

export const getSleeping = async (
    user_id: string
): Promise<SleepingResponse> => {

    try {

        const res = await axios.get(
            `${BASE_URL}/sleeping`,
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
            message: "خطا در دریافت اطلاعات خواب",
        };

    }

};




// =====================
// UPDATE SLEEPING
// =====================

export const updateSleeping = async (
    user_id: string,
    data: {
        bedTime?: string;
        wakeTime?: string;
    }
): Promise<SleepingResponse> => {

    try {

        const res = await axios.patch(
            `${BASE_URL}/sleeping`,
            {
                user_id,
                ...data,
            }
        );


        return {
            success: true,
            data: res.data,
        };


    } catch (error) {

        return {
            success: false,
            message: "خطا در بروزرسانی خواب",
        };

    }

};