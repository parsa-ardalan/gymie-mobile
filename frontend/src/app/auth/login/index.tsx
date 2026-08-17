import styles from "@/components/ui/auth-page.styles";

import { updateProfile } from "@/redux/profile/profileSlice";

import { useRouter } from "expo-router";

import { useEffect, useRef, useState } from "react";

import {
    Image,
    Modal,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

import { useDispatch } from "react-redux";

import {
    getUserByPhone,
    sendLoginOtp,
} from "@/services/auth.service";

import { translations } from "@/localization";

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
        "",
    ]);

    const [serverOtp, setServerOtp] = useState("");

    const otpRefs = useRef<TextInput[]>([]);

    const [modalVisible, setModalVisible] = useState(false);
    const [modalText, setModalText] = useState("");

    const [loading, setLoading] = useState(false);

    const [remainingTime, setRemainingTime] = useState(60);

    const [verifyingOtp, setVerifyingOtp] = useState(false);

    const showError = (text: string) => {
        setModalText(text);
        setModalVisible(true);
    };

    /*
     * OTP countdown
     *
     * Timer starts when user enters OTP step.
     * It automatically stops at 0.
     */
    useEffect(() => {

        if (step !== 4) {
            return;
        }

        setRemainingTime(60);

        const interval = setInterval(() => {

            setRemainingTime((previousTime) => {

                if (previousTime <= 1) {
                    clearInterval(interval);
                    return 0;
                }

                return previousTime - 1;
            });

        }, 1000);

        return () => {
            clearInterval(interval);
        };

    }, [step]);

    /*
     * Send login OTP
     */
    const handleNext = async () => {

        // Prevent multiple requests
        if (loading) {
            return;
        }

        // Validate phone number
        if (!/^09\d{9}$/.test(phone)) {
            return showError(
                translations.auth.login.invalidPhone
            );
        }

        try {

            setLoading(true);

            const result = await sendLoginOtp(phone);

            if (!result.success) {
                showError(result.message);
                return;
            }

            // User doesn't exist
            if (result.exists === false) {
                router.push("/auth/signup");
                return;
            }

            // User exists
            setServerOtp(String(result.otp));

            // Reset OTP
            setOtp([
                "",
                "",
                "",
                "",
                "",
            ]);

            // Reset timer
            setRemainingTime(60);

            // Go to OTP step
            setStep(4);

            // Focus first OTP input after render
            setTimeout(() => {
                otpRefs.current[0]?.focus();
            }, 100);

        } catch (error) {

            console.error("LOGIN ERROR:", error);

            showError(
                translations.auth.login.serverError
            );

        } finally {

            setLoading(false);

        }
    };

    /*
     * Handle OTP input
     */
    const handleOtpChange = async (
        text: string,
        index: number
    ) => {

        // Don't allow OTP changes while verifying
        if (verifyingOtp) {
            return;
        }

        // Only allow one digit
        if (!/^\d?$/.test(text)) {
            return;
        }

        const newOtp = [...otp];

        newOtp[index] = text;

        setOtp(newOtp);

        // Move forward
        if (text && index < 4) {
            otpRefs.current[index + 1]?.focus();
        }

        // Move backward
        if (!text && index > 0) {
            otpRefs.current[index - 1]?.focus();
        }

        const code = newOtp.join("");

        // Wait until all 5 digits are entered
        if (code.length !== 5) {
            return;
        }

        // Prevent duplicate verification
        if (verifyingOtp) {
            return;
        }

        try {

            setVerifyingOtp(true);

            // Check OTP
            if (code !== serverOtp) {

                showError(
                    translations.auth.login.invalidOtp
                );

                return;
            }

            const result = await getUserByPhone(phone);

            if (!result.success) {
                showError(result.message);
                return;
            }

            const user = result.user;

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
                    loggedIn: true,
                })
            );

            router.replace("/");

        } catch (error) {

            console.error("OTP VERIFY ERROR:", error);

            showError(
                translations.auth.login.otpVerificationError
            );

        } finally {

            setVerifyingOtp(false);

        }
    };

    /*
     * Return to phone number step
     *
     * This is only available after
     * the 60 second cooldown is finished.
     */
    const handleBackToPhone = () => {

        if (remainingTime > 0) {
            return;
        }

        setOtp([
            "",
            "",
            "",
            "",
            "",
        ]);

        setServerOtp("");

        setStep(1);
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
                            {translations.auth.login.title}
                        </Text>

                        <Text style={styles.subtitle}>
                            {translations.auth.login.subtitle}
                        </Text>

                    </View>

                </View>

                {step !== 4 && (

                    <View style={styles.form}>

                        <TextInput
                            placeholder={
                                translations.auth.login.phonePlaceholder
                            }
                            placeholderTextColor="#666"
                            value={phone}
                            onChangeText={setPhone}
                            maxLength={11}
                            keyboardType="phone-pad"
                            style={styles.input}
                            editable={!loading}
                        />

                    </View>

                )}

                {step === 4 && (

                    <View style={styles.otpContainer}>

                        {otp.map((digit, index) => (

                            <TextInput
                                key={index}

                                ref={(ref) => {
                                    if (ref) {
                                        otpRefs.current[index] = ref;
                                    }
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

                                editable={!verifyingOtp}
                            />

                        ))}

                    </View>

                )}

                {step !== 4 && (

                    <TouchableOpacity
                        style={[
                            styles.btn,
                            loading && {
                                opacity: 0.5,
                            },
                        ]}
                        onPress={handleNext}
                        disabled={loading}
                    >

                        <Text style={styles.btnText}>
                            {loading
                                ? translations.auth.login.sending
                                : translations.auth.login.next}
                        </Text>

                    </TouchableOpacity>

                )}

                {step === 4 && (

                    <View
                        style={{
                            alignItems: "center",
                            marginTop: 20,
                        }}
                    >

                        {remainingTime > 0 ? (

                            <Text
                                style={{
                                    color: "#888",
                                    fontSize: 13,
                                    textAlign: "center",
                                }}
                            >
                                {translations.auth.login.resendCountdown}{" "}
                                {remainingTime}{" "}
                                {translations.auth.login.seconds}
                            </Text>

                        ) : (

                            <TouchableOpacity
                                onPress={handleBackToPhone}
                            >

                                <Text
                                    style={{
                                        color: "#888",
                                        textAlign: "center",
                                        fontSize: 13,
                                    }}
                                >
                                    {translations.auth.login.resendCode}
                                </Text>

                            </TouchableOpacity>

                        )}

                    </View>

                )}

                <Modal
                    transparent
                    visible={modalVisible}
                    animationType="fade"
                    onRequestClose={() =>
                        setModalVisible(false)
                    }
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
                                    {translations.auth.login.okay}
                                </Text>

                            </TouchableOpacity>

                        </View>

                    </View>

                </Modal>

                {step !== 4 && (

                    <TouchableOpacity
                        onPress={() =>
                            router.push("/auth/signup")
                        }
                        style={{
                            marginTop: 16,
                        }}
                        disabled={loading}
                    >

                        <Text
                            style={{
                                color: "#888",
                                textAlign: "center",
                                fontSize: 12,
                                marginTop: 10,
                            }}
                        >
                            {translations.auth.login.noAccount}
                        </Text>

                    </TouchableOpacity>

                )}

            </View>

        </View>
    );
}
