import styles from "@/components/ui/auth-page.styles";
import { updateProfile } from "@/redux/profile/profileSlice";
import axios from "axios";
import { useRouter } from "expo-router";
import { useRef, useState } from "react";
import {
    Image,
    Modal,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from "react-native";
import { useDispatch } from "react-redux";


const API_URL = "http://localhost:3000";


export default function SignUp() {

    const dispatch = useDispatch();
    const router = useRouter();


    const [step, setStep] = useState(1);


    const [form, setForm] = useState({
        name: "",
        bio: "",
        age: "",
        height: "",
        weight: "",
        phone: ""
    });


    const [otp, setOtp] = useState<string[]>([
        "",
        "",
        "",
        "",
        ""
    ]);


    const [serverOtp, setServerOtp] = useState("");

    const [otpValid, setOtpValid] = useState<boolean | null>(null);


    const otpRefs = useRef<TextInput[]>([]);


    const [modalVisible, setModalVisible] = useState(false);
    const [modalText, setModalText] = useState("");


    const showError = (message: string) => {

        setModalText(message);
        setModalVisible(true);

    };

    const updateField = (
        field: keyof typeof form,
        value: string
    ) => {

        setForm(prev => ({
            ...prev,
            [field]: value
        }));

    };

    const saveProfile = (user: any) => {

        console.log("SAVE PROFILE USER:", user);

        dispatch(
            updateProfile({

                _id: user._id,

                name: user.name,

                bio: user.bio,

                age: user.age,

                height: user.height,

                weight: user.weight,

                phone: user.phoneNumber,

                dayStreak: user.dayStreak ?? 0,

                loggedIn: true
            })
        );

    };

    const handleNext = async () => {

        if (step === 1) {


            if (!form.name.trim() || !form.bio.trim()) {

                return showError(
                    "لطفاً همه فیلدها را پر کنید"
                );

            }

            dispatch(
                updateProfile({

                    name: form.name,

                    bio: form.bio

                })
            );

            return setStep(2);
        }


        if (step === 2) {


            if (

                form.age.length !== 2 ||

                form.height.length !== 3 ||

                !form.weight ||

                form.weight.length > 3

            ) {

                return showError(
                    "اطلاعات وارد شده صحیح نیست"
                );

            }


            dispatch(

                updateProfile({

                    age: Number(form.age),

                    height: Number(form.height),

                    weight: Number(form.weight)

                })
            );


            return setStep(3);
        }

        if (step === 3) {


            if (
                !/^09\d{9}$/.test(form.phone)
            ) {

                return showError(
                    "شماره موبایل نامعتبر است"
                );

            }

            try {


                const response = await axios.post(

                    `${API_URL}/auth/signup/send-otp`,

                    {

                        name: form.name,

                        bio: form.bio,

                        phoneNumber: form.phone,

                        age: Number(form.age),

                        height: Number(form.height),

                        weight: Number(form.weight)

                    }

                );

                console.log(
                    response.data
                );

                if (!response.data.success) {

                    return showError(
                        response.data.message
                    );

                }

                setServerOtp(
                    String(response.data.otp)
                );


                setStep(4);

            } catch (error) {

                console.log(error);

                showError(
                    "خطا در ارتباط با سرور"
                );

            }

        }

    };

    const handleOtpChange = (
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

            verifyOtp(code);

        }

    };

    const verifyOtp = async (code: string) => {


        if (code !== serverOtp) {

            setOtpValid(false);

            return showError(
                "کد اشتباه است"
            );

        }

        try {

            const response = await axios.post(

                `${API_URL}/auth/signup/verify-otp`,

                {

                    phoneNumber: form.phone,

                    otp: code

                }

            );

            console.log("VERIFY RESPONSE:", response.data);


            if (!response.data.success) {

                setOtpValid(false);

                return showError(
                    response.data.message
                );
            }


            setOtpValid(true);


            saveProfile(response.data.user);


            setTimeout(() => {

                router.replace("/");

            }, 400);

        } catch (error) {

            console.log(error);

            showError(
                "خطا در تایید OTP"
            );
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

                {
                    step === 1 &&

                    <View style={styles.form}>

                        <TextInput

                            placeholder="نام کاربری"

                            placeholderTextColor="#666"

                            value={form.name}

                            onChangeText={
                                text => updateField(
                                    "name",
                                    text
                                )
                            }

                            style={styles.input}

                        />


                        <TextInput

                            placeholder="بیوگرافی"

                            placeholderTextColor="#666"

                            value={form.bio}

                            onChangeText={
                                text => updateField(
                                    "bio",
                                    text
                                )
                            }

                            style={styles.input}

                        />

                    </View>
                }

                {
                    step === 2 &&

                    <View style={styles.form}>

                        {
                            ["age", "height", "weight"].map(
                                field => (

                                    <TextInput

                                        key={field}

                                        placeholder={field}

                                        placeholderTextColor="#666"

                                        value={
                                            form[field as keyof typeof form]
                                        }

                                        onChangeText={
                                            text => updateField(
                                                field as keyof typeof form,
                                                text
                                            )
                                        }

                                        keyboardType="numeric"

                                        style={styles.input}

                                    />

                                )
                            )
                        }


                    </View>

                }

                {
                    step === 3 &&

                    <View style={styles.form}>

                        <TextInput

                            placeholder="شماره تماس"

                            placeholderTextColor="#666"

                            value={form.phone}

                            onChangeText={
                                text => updateField(
                                    "phone",
                                    text
                                )
                            }

                            maxLength={11}

                            keyboardType="phone-pad"

                            style={styles.input}

                        />

                    </View>

                }

                {
                    step === 4 &&

                    <View style={styles.otpContainer}>

                        {
                            otp.map(
                                (digit, index) => (

                                    <TextInput

                                        key={index}

                                        ref={
                                            ref => {
                                                if (ref)
                                                    otpRefs.current[index] = ref;
                                            }
                                        }

                                        value={digit}

                                        onChangeText={
                                            text => handleOtpChange(
                                                text,
                                                index
                                            )
                                        }

                                        maxLength={1}

                                        keyboardType="numeric"

                                        style={[
                                            styles.otpInput,

                                            digit &&
                                            styles.otpFilled,

                                            otpValid === true &&
                                            styles.otpSuccess,

                                            otpValid === false &&
                                            styles.otpError
                                        ]}

                                    />

                                )
                            )
                        }


                    </View>

                }

                {
                    step < 4 &&

                    <TouchableOpacity

                        style={styles.btn}

                        onPress={handleNext}

                    >

                        <Text style={styles.btnText}>
                            بعدی
                        </Text>

                    </TouchableOpacity>

                }

                <TouchableOpacity
                    onPress={() => router.push("/auth/login")}
                    style={{ marginTop: 16 }}
                >
                    <Text style={{
                        color: "#888",
                        textAlign: "center",
                        fontSize: 12,
                        marginTop: 10
                    }}>
                        حساب داری؟ وارد شو
                    </Text>
                </TouchableOpacity>

            </View>

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

                            onPress={
                                () => setModalVisible(false)
                            }

                        >

                            <Text style={styles.modalBtn}>
                                باشه
                            </Text>


                        </TouchableOpacity>



                    </View>


                </View>


            </Modal>

        </View>

    );

}