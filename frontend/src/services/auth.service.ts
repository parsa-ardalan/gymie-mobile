import axios from "axios";

// types -------------------------------------------------------------------

type ErrorResponse = {
    success: false;
    message: string;
};

type LoginSuccessResponse = {
    success: true;
    exists: boolean;
    otp: string;
};

type LoginResponse = ErrorResponse | LoginSuccessResponse;

type GetUserSuccessResponse = {
    success: true;
    user: any;
};

type GetUserResponse = ErrorResponse | GetUserSuccessResponse;

// --------------------------------------------------------------------------

const API_URL = "https://gymie-mobile.onrender.com";


// singup

// 📤 ارسال OTP برای ثبت‌نام
export const sendSignupOtp = async (data: {
    name: string;
    bio: string;
    phoneNumber: string;
    age: number;
    height: number;
    weight: number;
}) => {
    try {
        const res = await axios.post(`${API_URL}/auth/signup/send-otp`, data);

        if (!res.data.success) {
            return {
                success: false,
                message: res.data.message,
            };
        }

        return {
            success: true,
            otp: res.data.otp,
        };

    } catch (error) {
        return {
            success: false,
            message: "خطا در ارتباط با سرور",
        };
    }
};


// ✅ تایید OTP و ساخت کاربر
export const verifySignupOtp = async (data: {
    phoneNumber: string;
    otp: string;
}) => {
    try {
        const res = await axios.post(`${API_URL}/auth/signup/verify-otp`, data);

        if (!res.data.success) {
            return {
                success: false,
                message: res.data.message,
            };
        }

        return {
            success: true,
            user: res.data.user,
        };

    } catch (error) {
        return {
            success: false,
            message: "خطا در تایید OTP",
        };
    }
};

//---------------------------------------------------------------------------

// login

// 📤 ارسال OTP برای لاگین
export const sendLoginOtp = async (
    phoneNumber: string
): Promise<LoginResponse> => {

    try {

        const res = await axios.post(
            `${API_URL}/auth/send-otp`,
            {
                phoneNumber,
            }
        );


        return {
            success: true,
            exists: true,
            otp: res.data.otp,
        };


    } catch (error) {

        return {
            success: false,
            message: "خطا در ارتباط با سرور",
        };

    }
};

// 👤 گرفتن کاربر با شماره
export const getUserByPhone = async (phone: string): Promise<GetUserResponse> => {
    try {
        const res = await axios.get(`${API_URL}/users/phone/${phone}`);

        return {
            success: true,
            user: res.data,
        };

    } catch (error) {
        return {
            success: false,
            message: "خطا در دریافت اطلاعات کاربر",
        };
    }
};