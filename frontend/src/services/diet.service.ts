// services/diet.service.ts

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


export type DietResponse =
    | SuccessResponse<any>
    | ErrorResponse;



// =====================
// GET USER DIET
// =====================

export const getDiet = async (
    user_id: string
): Promise<DietResponse> => {

    try {

        const res = await axios.get(
            `${BASE_URL}/diet`,
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
            message: "خطا در دریافت رژیم",
        };

    }

};



// =====================
// GET DIET BY ID
// =====================

export const getDietById = async (
    dietId: string
): Promise<DietResponse> => {

    try {

        const res = await axios.get(
            `${BASE_URL}/diet/${dietId}`
        );


        return {
            success: true,
            data: res.data,
        };


    } catch (error) {

        return {
            success: false,
            message: "خطا در دریافت رژیم",
        };

    }

};



// =====================
// ADD INGREDIENT
// =====================

export const addIngredient = async (
    dietId: string,
    dayOfWeek: number,
    mealName: string,
    ingredient: string
): Promise<DietResponse> => {

    try {

        const res = await axios.post(
            `${BASE_URL}/diet/${dietId}/day/${dayOfWeek}/meal/${mealName}/ingredient`,
            {
                ingredient,
            }
        );


        return {
            success: true,
            data: res.data,
        };


    } catch (error) {

        return {
            success: false,
            message: "خطا در افزودن ماده غذایی",
        };

    }

};



// =====================
// UPDATE INGREDIENT
// =====================

export const updateIngredient = async (
    dietId: string,
    dayOfWeek: number,
    mealName: string,
    index: number,
    ingredient: string
): Promise<DietResponse> => {

    try {

        const res = await axios.patch(
            `${BASE_URL}/diet/${dietId}/day/${dayOfWeek}/meal/${mealName}/ingredient/${index}`,
            {
                ingredient,
            }
        );


        return {
            success: true,
            data: res.data,
        };


    } catch (error) {

        return {
            success: false,
            message: "خطا در ویرایش ماده غذایی",
        };

    }

};



// =====================
// DELETE INGREDIENT
// =====================

export const removeIngredient = async (
    dietId: string,
    dayOfWeek: number,
    mealName: string,
    index: number
): Promise<DietResponse> => {

    try {

        const res = await axios.delete(
            `${BASE_URL}/diet/${dietId}/day/${dayOfWeek}/meal/${mealName}/ingredient/${index}`
        );


        return {
            success: true,
            data: res.data,
        };


    } catch (error) {

        return {
            success: false,
            message: "خطا در حذف ماده غذایی",
        };

    }

};