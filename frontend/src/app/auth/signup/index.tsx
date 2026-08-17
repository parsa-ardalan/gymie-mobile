import styles from "@/components/ui/auth-page.styles";

import {
    sendSignupOtp,
    verifySignupOtp,
} from "@/services/auth.service";

import { updateProfile } from "@/redux/profile/profileSlice";

import { useRouter } from "expo-router";

import {
    useEffect,
    useRef,
    useState,
} from "react";

import {
    Image,
    Modal,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

import { useDispatch } from "react-redux";

import { translations } from "@/localization";

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
        phone: "",
    });

    const [otp, setOtp] = useState<string[]>([
        "",
        "",
        "",
        "",
        "",
    ]);

    const [serverOtp, setServerOtp] = useState("");

    const [otpValid, setOtpValid] = useState<boolean | null>(
        null
    );

    const otpRefs = useRef<TextInput[]>([]);

    const [modalVisible, setModalVisible] = useState(false);
    const [modalText, setModalText] = useState("");

    const [loading, setLoading] = useState(false);

    const [verifyingOtp, setVerifyingOtp] = useState(false);

    const [remainingTime, setRemainingTime] = useState(60);

    /*
     * Show error modal
     */
    const showError = (message: string) => {
        setModalText(message);
        setModalVisible(true);
    };

    /*
     * Update form fields
     */
    const updateField = (
        field: keyof typeof form,
        value: string
    ) => {

        setForm((previousForm) => ({
            ...previousForm,
            [field]: value,
        }));

    };

    /*
     * Save authenticated user to Redux
     */
    const saveProfile = (user: any) => {

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
                loggedIn: true,
            })
        );

    };

    /*
     * OTP countdown
     *
     * Starts when user enters step 4.
     * Stops automatically at 0.
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
     * Move through signup steps
     */
    const handleNext = async () => {

        /*
         * Prevent multiple clicks
         */
        if (loading || verifyingOtp) {
            return;
        }

        /*
         * STEP 1
         */
        if (step === 1) {

            if (
                !form.name.trim() ||
                !form.bio.trim()
            ) {

                return showError(
                    translations.auth.signup.fillAllFields
                );

            }

            dispatch(
                updateProfile({
                    name: form.name,
                    bio: form.bio,
                })
            );

            setStep(2);

            return;
        }

        /*
         * STEP 2
         */
        if (step === 2) {

            if (
                form.age.length !== 2 ||
                form.height.length !== 3 ||
                !form.weight ||
                form.weight.length > 3
            ) {

                return showError(
                    translations.auth.signup.invalidInformation
                );

            }

            dispatch(
                updateProfile({
                    age: Number(form.age),
                    height: Number(form.height),
                    weight: Number(form.weight),
                })
            );

            setStep(3);

            return;
        }

        /*
         * STEP 3
         *
         * Send signup OTP
         */
        if (step === 3) {

            if (!/^09\d{9}$/.test(form.phone)) {

                return showError(
                    translations.auth.signup.invalidPhone
                );

            }

            try {

                setLoading(true);

                const result = await sendSignupOtp({
                    name: form.name,
                    bio: form.bio,
                    phoneNumber: form.phone,
                    age: Number(form.age),
                    height: Number(form.height),
                    weight: Number(form.weight),
                });


                if (!result.success) {
                    showError(result.message);
                    return;
                }

                /*
                 * Keep server OTP because
                 * the current API returns it.
                 */
                setServerOtp(String(result.otp));

                /*
                 * Reset OTP state
                 */
                setOtp([
                    "",
                    "",
                    "",
                    "",
                    "",
                ]);

                setOtpValid(null);

                /*
                 * Start OTP step
                 */
                setRemainingTime(60);

                setStep(4);

                /*
                 * Focus first OTP input
                 */
                setTimeout(() => {
                    otpRefs.current[0]?.focus();
                }, 100);

            } catch (error) {

                console.error(
                    "SEND SIGNUP OTP ERROR:",
                    error
                );

                showError(
                    translations.auth.signup.serverError
                );

            } finally {

                setLoading(false);

            }
        }
    };

    /*
     * Handle OTP input
     */
    const handleOtpChange = (
        text: string,
        index: number
    ) => {

        /*
         * Prevent changes while verifying
         */
        if (verifyingOtp) {
            return;
        }

        /*
         * Only allow one numeric digit
         */
        if (!/^\d?$/.test(text)) {
            return;
        }

        const newOtp = [...otp];

        newOtp[index] = text;

        setOtp(newOtp);

        /*
         * Move to next input
         */
        if (text && index < 4) {
            otpRefs.current[index + 1]?.focus();
        }

        /*
         * Move to previous input
         */
        if (!text && index > 0) {
            otpRefs.current[index - 1]?.focus();
        }

        const code = newOtp.join("");

        /*
         * Wait until all 5 digits are entered
         */
        if (code.length !== 5) {
            return;
        }

        /*
         * Prevent duplicate verification
         */
        if (verifyingOtp) {
            return;
        }

        verifyOtp(code);
    };

    /*
     * Verify signup OTP
     */
    const verifyOtp = async (code: string) => {

        if (verifyingOtp) {
            return;
        }

        try {

            setVerifyingOtp(true);

            setOtpValid(null);

            /*
             * The current backend response contains
             * the OTP, so we keep this local check.
             *
             * Backend verification remains the
             * authoritative verification step.
             */
            if (code !== serverOtp) {

                setOtpValid(false);

                showError(
                    translations.auth.signup.invalidOtp
                );

                /*
                 * Allow user to correct the OTP
                 */
                setOtp([
                    "",
                    "",
                    "",
                    "",
                    "",
                ]);

                setTimeout(() => {
                    otpRefs.current[0]?.focus();
                }, 100);

                return;
            }

            const result = await verifySignupOtp({
                phoneNumber: form.phone,
                otp: code,
            });


            if (!result.success) {

                setOtpValid(false);

                showError(result.message);

                return;
            }

            /*
             * OTP successfully verified
             */
            setOtpValid(true);

            saveProfile(result.user);

            /*
             * Small delay so success state
             * can be displayed before navigation.
             */
            setTimeout(() => {
                router.replace("/");
            }, 400);

        } catch (error) {

            console.error(
                "VERIFY SIGNUP OTP ERROR:",
                error
            );

            setOtpValid(false);

            showError(
                translations.auth.signup.otpVerificationError
            );

        } finally {

            setVerifyingOtp(false);

        }
    };

    /*
     * Return to phone number step
     *
     * This is allowed ONLY after
     * the 60 second cooldown.
     */
    const handleBackToPhone = () => {

        if (remainingTime > 0) {
            return;
        }

        /*
         * Reset OTP state
         */
        setOtp([
            "",
            "",
            "",
            "",
            "",
        ]);

        setServerOtp("");

        setOtpValid(null);

        /*
         * Go back to phone step
         */
        setStep(3);
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
                            {translations.auth.signup.title}
                        </Text>

                        <Text style={styles.subtitle}>
                            {translations.auth.signup.subtitle}
                        </Text>

                    </View>

                </View>

                {step === 1 && (

                    <View style={styles.form}>

                        <TextInput
                            placeholder={
                                translations.auth.signup.username
                            }
                            placeholderTextColor="#666"
                            value={form.name}
                            onChangeText={(text) =>
                                updateField(
                                    "name",
                                    text
                                )
                            }
                            style={styles.input}
                            editable={!loading}
                        />

                        <TextInput
                            placeholder={
                                translations.auth.signup.biography
                            }
                            placeholderTextColor="#666"
                            value={form.bio}
                            onChangeText={(text) =>
                                updateField(
                                    "bio",
                                    text
                                )
                            }
                            style={styles.input}
                            editable={!loading}
                        />

                    </View>

                )}

                {step === 2 && (

                    <View style={styles.form}>

                        <TextInput
                            placeholder={
                                translations.auth.signup.age
                            }
                            placeholderTextColor="#666"
                            value={form.age}
                            onChangeText={(text) =>
                                updateField(
                                    "age",
                                    text
                                )
                            }
                            keyboardType="numeric"
                            style={styles.input}
                            editable={!loading}
                        />

                        <TextInput
                            placeholder={
                                translations.auth.signup.height
                            }
                            placeholderTextColor="#666"
                            value={form.height}
                            onChangeText={(text) =>
                                updateField(
                                    "height",
                                    text
                                )
                            }
                            keyboardType="numeric"
                            style={styles.input}
                            editable={!loading}
                        />

                        <TextInput
                            placeholder={
                                translations.auth.signup.weight
                            }
                            placeholderTextColor="#666"
                            value={form.weight}
                            onChangeText={(text) =>
                                updateField(
                                    "weight",
                                    text
                                )
                            }
                            keyboardType="numeric"
                            style={styles.input}
                            editable={!loading}
                        />

                    </View>

                )}

                {step === 3 && (

                    <View style={styles.form}>

                        <TextInput
                            placeholder={
                                translations.auth.signup.phonePlaceholder
                            }
                            placeholderTextColor="#666"
                            value={form.phone}
                            onChangeText={(text) =>
                                updateField(
                                    "phone",
                                    text
                                )
                            }
                            maxLength={11}
                            keyboardType="phone-pad"
                            style={styles.input}
                            editable={!loading}
                        />

                    </View>

                )}

                {step === 4 && (

                    <View style={styles.otpContainer}>

                        {otp.map(
                            (digit, index) => (

                                <TextInput
                                    key={index}

                                    ref={(ref) => {
                                        if (ref) {
                                            otpRefs.current[index] =
                                                ref;
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

                                    style={[
                                        styles.otpInput,

                                        digit &&
                                        styles.otpFilled,

                                        otpValid === true &&
                                        styles.otpSuccess,

                                        otpValid === false &&
                                        styles.otpError,
                                    ]}

                                    editable={
                                        !verifyingOtp
                                    }
                                />

                            )
                        )}

                    </View>

                )}

                {step < 4 && (

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
                                ? translations.auth.signup.sending
                                : translations.auth.signup.next}
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
                                {translations.auth.signup.resendCountdown}{" "}
                                {remainingTime}{" "}
                                {translations.auth.signup.seconds}
                            </Text>

                        ) : (

                            <TouchableOpacity
                                onPress={
                                    handleBackToPhone
                                }
                                disabled={
                                    verifyingOtp
                                }
                            >

                                <Text
                                    style={{
                                        color: "#888",
                                        textAlign: "center",
                                        fontSize: 13,
                                    }}
                                >
                                    {translations.auth.signup.resendCode}
                                </Text>

                            </TouchableOpacity>

                        )}

                    </View>

                )}

                {step !== 4 && (

                    <TouchableOpacity
                        onPress={() =>
                            router.push(
                                "/auth/login"
                            )
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
                            {translations.auth.signup.haveAccount}
                        </Text>

                    </TouchableOpacity>

                )}

            </View>

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
                                {translations.auth.signup.okay}
                            </Text>

                        </TouchableOpacity>

                    </View>

                </View>

            </Modal>

        </View>
    );
}