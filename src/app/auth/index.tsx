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

export default function Auth() {

    const dispatch = useDispatch();
    const router = useRouter();

    const [step, setStep] = useState(1);

    const [name, setName] = useState("");
    const [bio, setBio] = useState("");
    const [age, setAge] = useState("");
    const [height, setHeight] = useState("");
    const [weight, setWeight] = useState("");
    const [phone, setPhone] = useState("");

    const [otp, setOtp] = useState(["", "", "", "", ""]);
    const [otpValid, setOtpValid] = useState<boolean | null>(null);
    const otpRefs = useRef<TextInput[]>([]);

    const [modalVisible, setModalVisible] = useState(false);
    const [modalText, setModalText] = useState("");

    const showError = (text: string) => {
        setModalText(text);
        setModalVisible(true);
    };

    const handleNext = () => {
        if (step === 1) {
            if (!name || !bio) return showError("لطفاً همه فیلدها را پر کنید");
            dispatch(updateProfile({ name, bio }));
            setStep(2);
        } else if (step === 2) {
            if (age.length !== 2 || height.length !== 3 || weight.length > 3) {
                return showError("اعتبارسنجی نامعتبر");
            }
            dispatch(updateProfile({
                age: Number(age),
                height: Number(height),
                weight: Number(weight)
            }));
            setStep(3);
        } else if (step === 3) {
            if (!/^09\d{9}$/.test(phone)) {
                return showError("شماره موبایل نامعتبر");
            }
            setStep(4);
        }
    };

    const handleOtpChange = (text: string, index: number) => {
        if (!/^\d?$/.test(text)) return;

        const newOtp = [...otp];
        newOtp[index] = text;
        setOtp(newOtp);

        if (text && index < 4) otpRefs.current[index + 1]?.focus();
        if (!text && index > 0) otpRefs.current[index - 1]?.focus();

        const code = newOtp.join("");

        if (code.length === 5) {

            if (code === "12345") {
                setOtpValid(true);

                dispatch(updateProfile({
                    phone,
                    loggedIn: true
                }));

                setTimeout(() => {
                    router.replace("/");
                }, 400);
            }
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.inner}>

                <View style={styles.welcomeContainer}>
                    <View style={styles.logoSection}>
                        <Image
                            source={require("@/assets/icons/logo.png")}
                            style={styles.logo}
                        />
                    </View>

                    <View style={styles.titleSection}>
                        <Text style={styles.title}>سلام! خوش اومدی</Text>
                        <Text style={styles.subtitle}>سریع لاگین کن که کلی کار داریم</Text>
                    </View>
                </View>

                {step === 1 && (
                    <View style={styles.form}>
                        <TextInput
                            placeholder="نام کاربری"
                            placeholderTextColor="#666"
                            value={name}
                            onChangeText={setName}
                            style={styles.input}
                        />
                        <TextInput
                            placeholder="بیوگرافی"
                            placeholderTextColor="#666"
                            value={bio}
                            onChangeText={setBio}
                            style={styles.input}
                        />
                    </View>
                )}

                {step === 2 && (
                    <View style={styles.form}>
                        <TextInput
                            placeholder="سن"
                            placeholderTextColor="#666"
                            value={age}
                            onChangeText={setAge}
                            maxLength={2}
                            keyboardType="numeric"
                            style={styles.input}
                        />
                        <TextInput
                            placeholder="قد"
                            placeholderTextColor="#666"
                            value={height}
                            onChangeText={setHeight}
                            maxLength={3}
                            keyboardType="numeric"
                            style={styles.input}
                        />
                        <TextInput
                            placeholder="وزن"
                            placeholderTextColor="#666"
                            value={weight}
                            onChangeText={setWeight}
                            maxLength={3}
                            keyboardType="numeric"
                            style={styles.input}
                        />
                    </View>
                )}

                {step === 3 && (
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
                                ref={(ref) => (otpRefs.current[index] = ref!)}
                                value={digit}
                                onChangeText={(text) => handleOtpChange(text, index)}
                                maxLength={1}
                                keyboardType="numeric"
                                style={[
                                    styles.otpInput,
                                    digit && styles.otpFilled,
                                    otpValid === true && styles.otpSuccess,
                                    otpValid === false && styles.otpError,
                                ]}
                            />
                        ))}
                    </View>
                )}

                {step < 4 && (
                    <TouchableOpacity style={styles.btn} onPress={handleNext}>
                        <Text style={styles.btnText}>بعدی</Text>
                    </TouchableOpacity>
                )}
            </View>

            {/* MODAL */}
            <Modal transparent visible={modalVisible} animationType="fade">
                <View style={styles.modalBg}>
                    <View style={styles.modalBox}>
                        <Text style={styles.modalText}>{modalText}</Text>
                        <TouchableOpacity onPress={() => setModalVisible(false)}>
                            <Text style={styles.modalBtn}>باشه</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
}