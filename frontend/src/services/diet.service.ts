// services/diet.service.ts

import axios from "axios";

const BASE_URL = "https://gymie-mobile.onrender.com";


// 📥 گرفتن رژیم‌ها
export const getDiet = async () => {
  try {

    const res = await axios.get(`${BASE_URL}/diet`);

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


// ➕ اضافه کردن مواد غذایی
export const addIngredient = async (
  dietId: string,
  dayOfWeek: number,
  mealName: string,
  ingredient: string
) => {

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



// ✏️ ویرایش مواد غذایی
export const updateIngredient = async (
  dietId: string,
  dayOfWeek: number,
  mealName: string,
  index: number,
  ingredient: string
) => {

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



// 🗑 حذف مواد غذایی
export const removeIngredient = async (
  dietId: string,
  dayOfWeek: number,
  mealName: string,
  index: number
) => {

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