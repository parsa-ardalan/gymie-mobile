import styles from "@/components/ui/auth-page.styles";
import { updateProfile } from "@/redux/profile/profileSlice";
import { useRouter } from "expo-router";
import { useRef, useState } from "react";
import {
    Image,
    Modal,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { useDispatch } from "react-redux";

import axios from "axios";


export default function Login() {

    const dispatch = useDispatch();
    const router = useRouter();


    const [step, setStep] = useState(1);
    const [phone, setPhone] = useState("");

    const [otp, setOtp] = useState([
        "",
        "",
        "",
        "",
        ""
    ]);

    const [serverOtp, setServerOtp] = useState("");

    const otpRefs = useRef<TextInput[]>([]);


    const [modalVisible, setModalVisible] = useState(false);
    const [modalText, setModalText] = useState("");



    const showError = (text: string) => {

        setModalText(text);
        setModalVisible(true);

    };

    const handleNext = async () => {


        if (!/^09\d{9}$/.test(phone)) {

            return showError(
                "شماره موبایل نامعتبر"
            );

        }

        try {

            const res = await fetch(
                "http://localhost:3000/auth/send-otp",
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify({
                        phoneNumber: phone
                    })

                }
            );


            const data = await res.json();


            console.log(
                "AUTH RESPONSE:",
                data
            );


            //user doesn't exist
            if (data.exists === false) {

                router.push("/auth/signup");

                return;

            }


            //user exists
            if (data.exists === true) {


                setServerOtp(
                    String(data.otp)
                );


                setStep(4);


                return;

            }



        } catch (err) {

            console.log(err);

            showError(
                "خطا در ارتباط با سرور"
            );

        }

    };


    const handleOtpChange = async (
        text: string,
        index: number
    ) => {


        if (!/^\d?$/.test(text))
            return;

        const newOtp = [...otp];

        newOtp[index] = text;

        setOtp(newOtp);


        if (text && index < 4) {

            otpRefs.current[index + 1]?.focus();

        }


        if (!text && index > 0) {

            otpRefs.current[index - 1]?.focus();

        }


        const code = newOtp.join("");

        if (code.length === 5) {


            if (code === serverOtp) {

                try {

                    const userResponse = await axios.get(
                        `http://localhost:3000/users/phone/${phone}`
                    );


                    const user = userResponse.data;


                    dispatch(
                        updateProfile({

                            _id: user._id,

                            name: user.name,

                            bio: user.bio,

                            age: user.age,

                            height: user.height,

                            weight: user.weight,

                            phone: user.phoneNumber,

                            dayStreak: user.dayStreak,

                            loggedIn: true

                        })
                    );


                    router.replace("/");


                } catch (error) {

                    console.log(
                        "Get user failed:",
                        error
                    );

                    showError(
                        "خطا در دریافت اطلاعات کاربر"
                    );

                }

            }
        }
    };


    return (

        <View style={styles.container}>

            <View style={styles.inner}>


                <View style={styles.welcomeContainer}>


                    <View style={styles.logoSection}>

                        <Image
                            source={
                                require("@/assets/icons/logo.png")
                            }
                            style={styles.logo}
                        />

                    </View>



                    <View style={styles.titleSection}>

                        <Text style={styles.title}>
                            سلام! خوش اومدی
                        </Text>


                        <Text style={styles.subtitle}>
                            سریع لاگین کن که کلی کار داریم
                        </Text>


                    </View>


                </View>


                {step !== 4 && (

                    <View style={styles.form}>

                        <TextInput

                            placeholder="شماره تماس"

                            placeholderTextColor="#666"

                            value={phone}

                            onChangeText={setPhone}

                            maxLength={11}

                            keyboardType="phone-pad"

                            style={styles.input}

                        />


                    </View>

                )}


                {step === 4 && (

                    <View style={styles.otpContainer}>

                        {otp.map((digit, index) => (

                            <TextInput

                                key={index}


                                ref={(ref) => {

                                    if (ref)
                                        otpRefs.current[index] = ref;

                                }}

                                value={digit}

                                onChangeText={(text) =>
                                    handleOtpChange(
                                        text,
                                        index
                                    )
                                }

                                maxLength={1}

                                keyboardType="numeric"

                                style={styles.otpInput}

                            />

                        ))}


                    </View>

                )}

                {step !== 4 && (

                    <TouchableOpacity

                        style={styles.btn}

                        onPress={handleNext}

                    >

                        <Text style={styles.btnText}>
                            بعدی
                        </Text>


                    </TouchableOpacity>

                )}

                <Modal

                    transparent

                    visible={modalVisible}

                    animationType="fade"

                >

                    <View style={styles.modalBg}>


                        <View style={styles.modalBox}>


                            <Text style={styles.modalText}>
                                {modalText}
                            </Text>



                            <TouchableOpacity

                                onPress={() =>
                                    setModalVisible(false)
                                }

                            >

                                <Text style={styles.modalBtn}>
                                    باشه
                                </Text>


                            </TouchableOpacity>


                        </View>


                    </View>


                </Modal>

                <TouchableOpacity
                    onPress={() => router.push("/auth/signup")}
                    style={{ marginTop: 16 }}
                >
                    <Text style={{
                        color: "#888",
                        textAlign: "center",
                        fontSize: 12,
                        marginTop: 10
                    }}>
                        حساب نداری؟ ثبت‌نام کن
                    </Text>
                </TouchableOpacity>

            </View>

        </View>

    );

}