import { useEffect, useMemo, useRef, useState } from "react";
import { Animated, Text, TextInput, View } from "react-native";
import Svg, { Circle } from "react-native-svg";

import styles from "@/components/ui/sleeping-page.styles";
import profile from "@/data/profile/profile.json";

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

export default function Sleeping() {
    const [goToBed, setGoToBed] = useState("23:00");
    const [wakeUp, setWakeUp] = useState("07:00");

    const age = profile.age;
    const trainingDaysPerWeek = 4;

    const baseSleepHours = 7;
    const ageAdjustment = age < 25 ? 0.5 : 0;
    const trainingAdjustment = trainingDaysPerWeek * 0.3;

    const totalSleepHours =
        baseSleepHours + ageAdjustment + trainingAdjustment;

    const actualSleepingTime = useMemo(() => {
        const toMin = (t: string) => {
            const [h, m] = t.split(":").map(Number);
            return h * 60 + m;
        };

        const bed = toMin(goToBed);
        const wake = toMin(wakeUp);

        return (wake > bed ? wake - bed : 1440 - bed + wake) / 60;
    }, [goToBed, wakeUp]);

    const percentage = (actualSleepingTime / 24) * 100;

    const radius = 90;
    const circumference = 2 * Math.PI * radius;

    const progressAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.timing(progressAnim, {
            toValue: percentage,
            duration: 700,
            useNativeDriver: false, // 🔥 مهم‌ترین fix
        }).start();
    }, [percentage]);

    const strokeDashoffset = progressAnim.interpolate({
        inputRange: [0, 100],
        outputRange: [circumference, 0],
    });

    return (
        <View style={styles.page}>

            {/* CARD */}
            <View style={styles.card}>
                <Text style={styles.infoText}>
                    تایم خوابت کاملا به فعالیت روزانه، تغذیه و استرس اون روزت بستگی داره...
                </Text>

                <View style={styles.row}>
                    <Text style={styles.label}>تایم خواب پیشنهادی</Text>
                    <Text style={styles.value}>{totalSleepHours} ساعت</Text>
                </View>
            </View>

            {/* INPUTS */}
            <View style={styles.inputs}>

                <View style={styles.inputBox}>
                    <Text style={styles.inputLabel}>تایم خوابیدن</Text>
                    <TextInput
                        value={goToBed}
                        onChangeText={setGoToBed}
                        style={styles.input}
                        textAlign="right"
                    />
                </View>

                <View style={styles.inputBox}>
                    <Text style={styles.inputLabel}>تایم بیداری</Text>
                    <TextInput
                        value={wakeUp}
                        onChangeText={setWakeUp}
                        style={styles.input}
                        textAlign="right"
                    />
                </View>

            </View>

            {/* CIRCLE */}
            <View style={styles.circleWrapper}>

                <Svg width={220} height={220}>

                    {/* BACKGROUND */}
                    <Circle
                        cx="110"
                        cy="110"
                        r={radius}
                        stroke="rgba(255,255,255,0.1)"
                        strokeWidth={10}
                        fill="transparent"
                    />

                    {/* PROGRESS */}
                    <AnimatedCircle
                        cx="110"
                        cy="110"
                        r={radius}
                        stroke="#3b82f6"
                        strokeWidth={10}
                        fill="transparent"
                        strokeDasharray={circumference}
                        strokeDashoffset={strokeDashoffset}
                        strokeLinecap="round"
                        transform="rotate(-90 110 110)"   // ✅ FIX اصلی
                    />

                </Svg>

                {/* CENTER TEXT */}
                <View style={styles.circleText}>
                    <Text style={styles.circleValue}>
                        {actualSleepingTime.toFixed(1)}
                    </Text>
                    <Text style={styles.circleLabel}>ساعت</Text>
                </View>

            </View>

        </View>
    );
}