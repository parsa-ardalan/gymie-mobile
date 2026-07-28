import axios from "axios";

const BASE_URL = "https://gymie-mobile.onrender.com";


type ErrorResponse = {
    success: false;
    message: string;
};


type SuccessResponse = {
    success: true;
    data: any;
};


export type SleepingResponse =
    | SuccessResponse
    | ErrorResponse;



// 📥 گرفتن اطلاعات خواب
export const getSleeping = async (): Promise<SleepingResponse> => {

    try {

        const res = await axios.get(
            `${BASE_URL}/sleeping`
        );


        const data = Array.isArray(res.data)
            ? res.data[0]
            : res.data;


        return {
            success: true,
            data
        };


    } catch (error) {

        return {
            success: false,
            message: "خطا در دریافت اطلاعات خواب"
        };

    }

};



// ✏️ آپدیت ساعت خواب / بیداری
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
                ...data
            }
        );


        return {
            success: true,
            data: res.data
        };


    } catch (error) {

        return {
            success: false,
            message: "خطا در بروزرسانی خواب"
        };

    }

};